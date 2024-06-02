from datetime import datetime
import json
from fastapi import HTTPException, status
import httpx
from core.redis import redis
from core.config import settings
import pytz
import asyncio

class ErpRequest:

    @staticmethod
    async def save_token_to_redis(token, expiration):
        return await redis.save_string(
            "token_erp", {"token": token, "expiracao": expiration}
        )

    @staticmethod
    async def auth_erp():
        url = f"{settings.url_erp}/v1/auth"
        headers = {
            "Content-Type": "application/json",
            "terminal": settings.terminal,
            "empId": str(settings.emp_id),
        }
        response = httpx.get(url, headers=headers)
        if response.status_code != 200:
            raise Exception(f"Erro ao autenticar no ERP: {response.text}")

        response_dict = response.json()
        token = response_dict.get("token")
        expiration = response_dict.get("expiracao")

        await ErpRequest.save_token_to_redis(token, expiration)

        return {"token": token, "expiration": expiration}

    @staticmethod
    async def verify_token_erp():
        token = await redis.get_string("token_erp")

        if not token:
            return await ErpRequest.auth_erp()

        if token and datetime.strptime(
            token.get("expiracao"), "%Y-%m-%dT%H:%M:%S.%f%z"
        ) < datetime.now().replace(tzinfo=pytz.utc):
            return await ErpRequest.auth_erp()
    
        return token

    @staticmethod
    async def fetch_products_from_erp(page: int):
        token = await ErpRequest.verify_token_erp()
        base_url = f"http://rds.maxdata.com.br:9000/v1/produto/consultar?limit=1000&page={page}"
        headers = {
            "Content-Type": "application/json",
            "empId": str(settings.emp_id),
            "Authorization": f"Bearer {token.get('token')}",
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(base_url, headers=headers)
            response.raise_for_status()
            return response.json()

    @staticmethod
    async def get_all_produtos():
        try:
            product_ids = []
            page = 1
            while True:
                response = await ErpRequest.fetch_products_from_erp(page)
                if not response["docs"]:
                    break
                product_ids.extend(
                    [product.get("proId") for product in response["docs"]]
                )
                page += 1
            breakpoint()
            await ErpRequest.fetch_promotional_products(product_ids)

        except Exception as err:
            breakpoint()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar produtos no ERP: {err}",
            )

        return f"deu certo {len(product_ids)}"

    @staticmethod
    async def fetch_promotional_products(product_ids):
        token = await ErpRequest.verify_token_erp()
        promo_products = []
        base_url = "http://rds.maxdata.com.br:9000/v1/produto/consultar"
        sem = asyncio.Semaphore(30)

        async def fetch_product_details(product_id):
            headers = {
                "Content-Type": "application/json",
                "empId": str(settings.emp_id),
                "Authorization": f"Bearer {token.get('token')}",
            }
            async with sem:
                async with httpx.AsyncClient() as client:
                    url = f"{base_url}/{product_id}"
                    response = await client.get(url, headers=headers)
                    response.raise_for_status()
                    try:
                        product_data = json.loads(response.content.decode("utf-8"))
                    except UnicodeDecodeError:
                        product_data = json.loads(response.content.decode("ISO-8859-1"))
                    except Exception as err:
                        print(f"Erro ao processar a resposta JSON: {err}")
                        return None

                    if product_data.get("vlrPromocao", 0) > 0:
                        return product_data
            return None

        tasks = [fetch_product_details(product_id) for product_id in product_ids]
        results = await asyncio.gather(*tasks)

        promo_products = [result for result in results if result is not None]

    @staticmethod
    async def run_test():
        promo_product_ids = ["30", "9103", "5260"]
        promo_products = []

        try:

            token = await ErpRequest.verify_token_erp()
            headers = {
                "Content-Type": "application/json",
                "empId": str(settings.emp_id),
                "Authorization": f"Bearer {token.get('token')}",
            }

            for product_id in promo_product_ids:
                url = f"http://rds.maxdata.com.br:9000/v1/produto/consultar/{product_id}"
                try:
                    async with httpx.AsyncClient() as client:
                        response = await client.get(url=url, headers=headers)
                        response.raise_for_status()
                    product_data = response.json()

                except UnicodeDecodeError:
                    product_data = response.content.decode(
                        "latin-1", errors="replace"
                    ).encode("utf-8")
                    product_data = json.loads(product_data.decode("utf-8"))
                except Exception as err:
                    raise err

                if product_data.get("vlrPromocao", 0) > 0:
                    promo_products.append(product_data)

            return promo_products
        
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro ao buscar produtos promocionais no ERP, tente novamente mais tarde.",
            )


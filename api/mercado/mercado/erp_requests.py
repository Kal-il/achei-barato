from datetime import datetime
import json
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
    async def sync_produtos_erp(page: int):
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
    async def get_produtos_promocao_erp():
        lista_response = []
        page = 1
        while True:
            response = await ErpRequest.sync_produtos_erp(page)
            if not response["docs"]:
                break
            lista_response.extend(
                [produto.get("proId") for produto in response["docs"]]
            )
            page += 1

        await ErpRequest.get_produtos_promocao_real(lista_response)

        return f"deu certo {len(lista_response)}"

    @staticmethod
    async def get_produtos_promocao_real(lista_response):
        token = await ErpRequest.verify_token_erp()
        dict_produtos_promo = []
        base_url = "http://rds.maxdata.com.br:9000/v1/produto/consultar"

        sem = asyncio.Semaphore(30) 

        async def fetch_product(id_produto):
            print(datetime.now())
            headers = {
                "Content-Type": "application/json",
                "empId": str(settings.emp_id),
                "Authorization": f"Bearer {token.get('token')}",
            }
            print(f"Buscando produto {id_produto}")
            async with sem:
                async with httpx.AsyncClient() as client:
                    url = f"{base_url}/{id_produto}"
                    response = await client.get(url, headers=headers)
                    response.raise_for_status()
                    try:
                        response_value = json.loads(response.content.decode("utf-8"))
                    except UnicodeDecodeError:
                        response_value = json.loads(response.content.decode("ISO-8859-1"))
                    except Exception as err:
                        print(err)
                        print(f"Erro ao processar a resposta JSON: {err}")
                        return None

                    if response_value.get("vlrPromocao", 0) > 0:
                        return response_value

            return None
        tasks = [fetch_product(id_produto) for id_produto in lista_response] 
        breakpoint()

        print("teste")
        results = await asyncio.gather(*tasks)

        dict_produtos_promo = [result for result in results if result is not None]

        print(dict_produtos_promo)

    @staticmethod
    async def get_teste():
        id_produtos_promo = ["30", "9103", "5260"]
        produtos_promocao = []
        asyncio.run(await ErpRequest.get_produtos_promocao_erp())

        print("teste568")
        token = await ErpRequest.verify_token_erp()
        headers = {
            "Content-Type": "application/json",
            "empId": str(settings.emp_id),
            "Authorization": f"Bearer {token.get('token')}",
        }

        for id_produto in id_produtos_promo:
            url = f"http://rds.maxdata.com.br:9000/v1/produto/consultar/{id_produto}"
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.get(url=url, headers=headers)
                    response.raise_for_status()
                response_produto = response.json()

            except UnicodeDecodeError:
                response_produto = response.content.decode(
                    "latin-1", errors="replace"
                ).encode("utf-8")
                response_produto = json.loads(response_produto.decode("utf-8"))
            except Exception as err:
                print(err)
                return err

            if response_produto.get("vlrPromocao", 0) > 0:
                produtos_promocao.append(response_produto)

        return produtos_promocao

# Exemplo de uso
# asyncio.run(ErpRequest.get_produtos_promocao_erp())

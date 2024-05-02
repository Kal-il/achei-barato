from datetime import datetime
import httpx
from core.redis import redis
from core.config import settings
from core.redis import RedisCache
import pytz


class ErpRequest:

    async def save_token_to_redis(token, expiration):
        breakpoint()
        return await redis.save_string(
            "token_erp", {"token": token, "expiracao": expiration}
        )

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

        # salvar token no redis
        response_dict = response.json()
        token = response_dict.get("token")
        expiration = response_dict.get("expiracao")

        await ErpRequest.save_token_to_redis(token, expiration)

        return {"token": token, "expiration": expiration}

    async def verify_token_erp():
        # verifica se o token de acesso ao ERP não está expirado

        token = await redis.get_string("token_erp")

        if not token:
            return await ErpRequest.auth_erp()

        if token and datetime.strptime(
            token.get("expiracao"), "%Y-%m-%dT%H:%M:%S.%f%z"
        ) < datetime.now().replace(tzinfo=pytz.utc):
            return await ErpRequest.auth_erp()
        return token

    async def sync_produtos_erp():
        # sincroniza produtos do ERP com o banco de dados

        token = await ErpRequest.verify_token_erp()

        url = "http://rds.maxdata.com.br:9000/v1/produto/consultar"
        headers = {
            "Content-Type": "application/json",
            "empId": str(settings.emp_id),
            "Authorization": f"Bearer {token.get('token')}",
        }
        response = httpx.get(url, headers=headers)

        if response.status_code != 200:
            raise Exception(f"Erro ao sincronizar produtos do ERP: {response.text}")

        info_produtos = response.json()  # lista de produtos
        redis_1 = RedisCache(db=1)
        pages = info_produtos.get("pages")  
        
        breakpoint()
        await redis_1.save_id_produto("123", id_produtos)
        return response.json()

    # async def get_produtos_promocao_erp():

    @staticmethod
    async def get_produtos_promocao_erp():
        return await ErpRequest.sync_produtos_erp()

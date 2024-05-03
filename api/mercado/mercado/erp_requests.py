from datetime import datetime
import json
import httpx
from core.redis import redis
from core.config import settings
from core.redis import RedisCache, redis_1
import pytz
import asyncio


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


    async def sync_produtos_erp(page: int):
        token = await ErpRequest.verify_token_erp()
        base_url = f"http://rds.maxdata.com.br:9000/v1/produto/consultar?limit=1000&page=195"
        headers = {
            "Content-Type": "application/json",
            "empId": str(settings.emp_id),
            "Authorization": f"Bearer {token.get('token')}",
        }
        print(page)
        async with httpx.AsyncClient() as client:
                
                response = await client.get(base_url, headers=headers)
                response.raise_for_status()
                
        return response.json()
        

     
    # async def get_produtos_promocao_erp():

    @staticmethod
    async def get_produtos_promocao_erp():
            

        lista_response = []
        page = 1
        while True:
            response = await ErpRequest.sync_produtos_erp(page)
            if not response['docs']:
                break
            lista_response.extend([produto.get("proId") for produto in response['docs']])
            page += 1
            break
            
        await ErpRequest.get_produtos_promocao_real(lista_response)

            
        return f"deu certo {len(lista_response)}"
            
            
    async def get_produtos_promocao_real(lista_response: list):
        
        token = await ErpRequest.verify_token_erp()
        dict_produtos_promo = []
        base_url = f"http://rds.maxdata.com.br:9000/v1/produto/consultar"
        try:
            for id_produto in lista_response:
                headers = {
                    "Content-Type": "application/json",
                    "empId": str(settings.emp_id),
                    "Authorization": f"Bearer {token.get('token')}",
                }
            
                async with httpx.AsyncClient() as client:
                    url = f"{base_url}/{id_produto}"
                    response = await client.get(url, headers=headers)
                    response.raise_for_status()
                    print(id_produto)
                    try:
                       
                        response_value = json.loads(response.content.decode("utf-8"))
                    except Exception as err:
                        print(f"Erro ao processar a resposta JSON: {err}")
                    
                        response_value = response.__dict__
                        response_value = response_value.get('_content')
                
                    if response_value.get('vlrPromocao', 0) > 0:
                        dict_produtos_promo.append(response_value)
              
            print(dict_produtos_promo)  
        except Exception as err:
            print(err)
           
            
        
                
        
            

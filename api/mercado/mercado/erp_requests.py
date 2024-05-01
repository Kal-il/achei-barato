from datetime import datetime
import httpx
from core.redis import redis
from core.config import settings
class ErpRequest:

    def __init__(self):
        self.url = settings.url_erp
        self.terminal = settings.terminal
        self.emp_id = settings.emp_id

    @staticmethod
    async def save_token_to_redis(token, expiration):
        redis.save_string("token_erp", {"token": token, "expiracao": expiration})

    @staticmethod
    async def auth_erp(self):
        url = f"{self.url}/v1/auth" 
        headers = {
            'Content-Type': 'application/json',
            "terminal": self.terminal,
            "empId": self.emp_id,   
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
    
    @staticmethod
    async def verify_token_erp():   
        # verifica se o token de acesso ao ERP não está expirado

        token = redis.get_string("token_erp")

        if not token:
            return await ErpRequest.auth_erp()
        
        if token.get("expiracao") < datetime.now().timestamp():
            return await ErpRequest.auth_erp()
        
        return token
    
    @staticmethod   
    async def verify_mercado_erp(self, cnpj: str = None):
        # verificar se o cnpj é válido e existe na base de dados do ERP

        if not cnpj:
            return None
    
        token = await ErpRequest.verify_token_erp()

        if not token:
            return None
        
        url = f"{self.url}/v1/cliente/consultar"  
        headers = {
            'Content-Type': 'application/json',
            "empId": "1",   
            "Authorization": f"Bearer {token.get('token')}"
        }
        params = {
            'cnpj': cnpj    
        }

        response = httpx.get(url, headers=headers, params=params)
        return response.json()
    


        
    




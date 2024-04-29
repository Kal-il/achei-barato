import json
import math
from typing import Any, List

from utils.redis_protocol import RedisProtocol
from .config import settings
from redis import Redis

REDIS_CACHE_URL = settings.redis_cache_url


class RedisCache:
    def __init__(self):
        self.redis_conn = Redis.from_url(url=REDIS_CACHE_URL, decode_responses=True)

    def _get_cod_cnpj(self, cnpj: str):
        return cnpj[:8]

    def _get_cod_produto(self, id_produto: str | int):
        _cod_produto = math.ceil(int(id_produto)/1000)
        if _cod_produto == 0:
            return 1
        return _cod_produto

    async def store_produtos_hash(self, cnpj: str, produtos: List[Any]):
        # Armazena os produtos em massa através do Redis Serialization Protocol
        _cod_cnpj = self._get_cod_cnpj(cnpj)
        try:
            redis_protocol = RedisProtocol()
            for i in range(len(produtos)):
                _cod_produto = self._get_cod_produto(i)

                # Organiza os dados que serão inseridos
                cod_mercado = f"mercado_bucket:{_cod_cnpj}:{_cod_produto}"
                id_produto = f"{i}"
                produto = json.dumps(produtos[i].__dict__)

                # Adiciona o item ao comando do protocolo
                redis_protocol.add_to_protocol("HSET", cod_mercado, id_produto, produto)

            # Roda o protocolo
            redis_protocol.run_protocol()
        except Exception as err:
            raise Exception(f"Erro ao armazenar produtos em cache: {err}")

    async def get_produto(self, cnpj: str, id_produto: str):
        _cod_cnpj = self._get_cod_cnpj(cnpj)

        try:
            _cod_produto = self._get_cod_produto(id_produto)
            _produto = self.redis_conn.hget(
                name=f"mercado_bucket:{_cod_cnpj}:{_cod_produto}", 
                key=id_produto
            )
        except Exception as err:
            raise Exception(f"Erro ao obter produto do cache: {err}")

        if _produto:
            _produto = json.loads(_produto)

        return _produto

    async def get_produtos(self, cnpj: str):
        _cod_cnpj = self._get_cod_cnpj(cnpj)

        try:
            _produtos = []
            for bucket in self.redis_conn.scan_iter(f"mercado_bucket:{_cod_cnpj}:*"):
                keys = self.redis_conn.hkeys(bucket)
                for key in keys:
                    _produto = self.redis_conn.hget(bucket, key)
                    _produto = json.loads(_produto)
                    _produtos.append(_produto)

            return _produtos
        except Exception as err:
            raise Exception(f"Erro ao obter produto do cache: {err}")


    async def flush(self):
        try:
            self.redis_conn.flushdb()
        except: 
            raise Exception("Erro ao limpar banco no redis.")


redis = RedisCache()

from datetime import datetime
import uuid
from fastapi import HTTPException, status
from faker import Faker
from core.database import AsyncDBDependency
from erp.mercado.models import Mercado, Produto, MercadoManager, ProdutoManager
from erp.mercado.schemas import MercadoCreate, ProdutoCreate
import os
from io import StringIO
import re


class MockDados:
    def __init__(self):
        self.fake = Faker("pt_br")
        Faker.seed(10)
        self.qtd_mercados = 10
        self.qtd_produtos = 1

    async def popular_banco_tabela_mercado(self, db: AsyncDBDependency):
        try:
            mercados = []
            breakpoint()
            for _ in range(self.qtd_mercados):
                mercado = MercadoCreate(
                    cnpj=re.sub("\D", "" ,self.fake.cnpj()),
                    razao_social=self.fake.company(),
                    nome_fantasia=self.fake.company(),
                    telefone=self.fake.random_number(11),
                    cep=str(self.fake.random_number(8)),
                    estado=self.fake.state_abbr(),
                    cidade=self.fake.city(),
                    bairro=self.fake.word(),
                    endereco=self.fake.street_name(),
                    numero_endereco=self.fake.building_number(),
                    complemento=self.fake.word(),
                    nome_responsavel=self.fake.name(),
                    cpf_responsavel=re.sub("\D", "", self.fake.cpf()),
                )

                mercados.append(mercado)
                
            breakpoint()
            mercado_manager = MercadoManager(db)
            await mercado_manager.insert_mercado(mercados)
            
            return mercados
        
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=e,
            )     

    async def popular_banco_tabela_produto(self, db: AsyncDBDependency):
        try:
            produtos = []

            breakpoint()
            mercado_manager = MercadoManager(db)
            mercado_id = await mercado_manager.get_mercados()

            breakpoint()
            i = 0
            for _ in range(self.qtd_produtos):
                i = 1 + i
                produto = ProdutoCreate( 
                    nome=self.fake.word(),
                    marca=self.fake.company(),
                    data_validade=self.fake.date_time_this_decade(),
                    ncm_produto=str(self.fake.random_number(10)),
                    gtin_produto=str(self.fake.random_number(14)),
                    mpn_produto=str((self.fake.random_number(30))),
                    descricao=self.fake.text(),
                    preco=self.fake.random_number(2),
                    preco_promocional=self.fake.random_number(2),
                    codigo_produto=str(self.fake.random_number(30)),
                    mercado_id=str(mercado_id[0][0]),
                )
                print(i)
                breakpoint()
                produtos.append(produto)
            breakpoint()
            produro_manager = ProdutoManager(db)
            await produro_manager.insert_produto(produtos)
            return produtos
        
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=e,
            )
            

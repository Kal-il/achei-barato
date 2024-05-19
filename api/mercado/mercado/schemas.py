from ast import List
import datetime
from typing import Optional
import uuid
from fastapi import UploadFile
from pydantic import BaseModel, ConfigDict, Field
from validate_docbr import CNPJ

from mercado.mercado.utils import digitos_doc
from usuario.usuario.schemas import UsuarioBase
from fastapi_storages.integrations.sqlalchemy import ImageType
from mercado.mercado.enums import TipoEmpresaERP

# Schemas relacionados ao Mercado
class MercadoBase(BaseModel):
    razao_social: str = Field(..., description="Razão social")
    nome_fantasia: str = Field(..., description="Nome fantasia")
    telefone: int = Field(..., description="Telefone")
    descricao: Optional[str] = Field(
        ..., max_length=500, description="Descrição do mercado"
    )
    cep: str = Field(..., max_length=9, description="CEP")
    estado: str = Field(..., max_length=255, description="Estado")
    cidade: str = Field(..., max_length=255, description="Cidade")
    bairro: str = Field(..., max_length=255, description="Bairro")
    endereco: str = Field(..., max_length=255, description="Endereço")
    numero_endereco: int = Field(..., description="Número")
    complemento: Optional[str] = Field(..., max_length=255, description="Complemento")

    def validar_campos(self):
        erros = {}

        if erro := self._validar_razao_social():
            erros["razao_social"] = erro

        if erro := self._validar_nome_fantasia():
            erros["nome_fantasia"] = erro

        if erro := self._validar_telefone():
            erros["telefone"] = erro

        if erro := self._validar_cep():
            erros["cep"] = erro

        return erros

    def _validar_razao_social(self):
        if len(self.razao_social) > 30:
            return "A razão social é muito grande."

    def _validar_nome_fantasia(self):
        if len(self.nome_fantasia) > 55:
            return "O nome fantasia é muito grande."

    def _validar_telefone(self):
        if len(str(self.telefone)) > 11:
            return "Este número de telefone é muito grande."

        if len(str(self.telefone)) < 11:
            return "Este número de telefone não é válido."

    def _validar_cep(self):
        _erros = []

        self.cep = digitos_doc(self.cep)
        if len(self.cep) != 8:
            _erros.append("O CEP deve conter 8 dígitos")

        if not self.cep.isdigit():
            _erros.append("O CEP deve conter apenas dígitos")

        return _erros


class Mercado(MercadoBase):
    """Schema acrescenta campos de CNPJ, nome e CPF do responsável."""

    cnpj: str = Field(..., max_length=18, description="CNPJ")
    nome_responsavel: str = Field(
        ..., max_length=255, description="Nome do responsável"
    )
    cpf_responsavel: str = Field(..., max_length=14, description="CPF do responsável")

    def validar_campos(self):
        erros = super().validar_campos()

        if erro := self._validar_cpf_responsavel():
            erros["cpf_responsavel"] = erro

        if erro := self._validar_cnpj():
            erros["cnpj"] = erro

        return erros

    def _validar_cpf_responsavel(self):
        self.cpf_responsavel = digitos_doc(self.cpf_responsavel)
        if not self.cpf_responsavel.isdigit() or len(self.cpf_responsavel) > 11:
            return "Insira um CPF válido."

    def _validar_cnpj(self):
        validador = CNPJ()
        self.cnpj = digitos_doc(self.cnpj)
        if len(self.cnpj) > 14 or not validador.validate(self.cnpj):
            return "Insira um CNPJ válido."


class MercadoOutput(Mercado):
    model_config = ConfigDict(from_attributes=True)

    created_at: Optional[datetime.datetime] = Field(..., description="Data de cadastro")
    pass


class MercadoCreate(Mercado):
    usuario: Optional[UsuarioBase]
    pass


class MercadoUpdate(MercadoBase):
    pass


class ProdutoBase(BaseModel):
    nome: Optional[str] = Field(..., max_length=255, description="Nome")
    marca: Optional[str] = Field(..., max_length=255, description="Marca")
    data_validade: Optional[datetime.datetime] = Field(..., description="Data de validade")
    ncm_produto: Optional[str] = Field(..., max_length=10, description="NCM do produto")
    gtin_produto: Optional[str] = Field(
        ..., max_length=14, description="GTIN do produto"
    )
    mpn_produto: Optional[str] = Field(..., max_length=30, description="MPN do produto")
    id_produto_erp: Optional[str] = Field(
        ..., description="ID do produto no ERP de origem"
    )
    descricao: Optional[str] = Field(..., max_length=500, description="Descrição")
    preco: Optional[float] = Field(..., description="Preço")
    preco_promocional: Optional[float] = Field(..., description="Preço promocional")
    # imagem: Optional[UploadFile] = Field(..., description="Imagem")
    codigo_produto: Optional[str] = Field(
        ..., max_length=30, description="Código do produto"
    )


class ProdutoPromocaoErp(BaseModel):
    #  promocao de produtos de erp

    nome: Optional[str] = Field(..., max_length=255, description="Nome")
    preco: Optional[float] = Field(..., description="Preço")
    preco_promocional: Optional[float] = Field(..., description="Preço promocional")
    codigo_produto: Optional[str] = Field(
        ..., max_length=30, description="Código do produto"
    )
    ncm_produto: Optional[str] = Field(..., max_length=10, description="NCM do produto")
    id_produto_erp: Optional[str] = Field(
        ..., description="ID do produto no ERP de origem"
    )
    marca: Optional[str] = Field(..., max_length=255, description="Marca")


class ApiMercados(BaseModel):
    url_base: Optional[str] = Field(..., description="URL base da API")
    porta: Optional[int] = Field(..., description="Porta de acesso")
    empresa_erp: Optional[TipoEmpresaERP] = Field(..., description="Empresa de origem")
    terminal: Optional[str] = Field(..., description="Terminal de acesso")
    emp_id: Optional[int] = Field(..., description="ID da empresa")


    def validar_campos(self):
        erros = {}

        if erro := self._validar_porta():
            erros["porta"] = erro

        if erro := self._validar_empresa_erp():
            erros["empresa_erp"] = erro

        if erro := self._validar_terminal():
            erros["terminal"] = erro

        if erro := self._validar_url_base():
            erros["url_base"] = erro  

        return erros


    def _validar_porta(self):

        if self.porta is None or self.porta == "":
            return "Porta inválida"
        
        if not 0 <= self.porta <= 65535:
            return "Porta inválida"
        
    
    def _validar_empresa_erp(self):
        if self.empresa_erp == None or self.terminal == "":
            return "Empresa inválida"
        
        if self.empresa_erp not in TipoEmpresaERP:
            return "Empresa inválida"
        
    def _validar_terminal(self):

        if self.terminal == None or self.terminal == " ":
            return "Terminal inválido"
        
    def _validar_url_base(self):
    
        if self.url_base == None or self.url_base == "":
            return "URL base inválida"
        
        if not self.url_base.startswith("http://") or not self.url_base.startswith("https://"):
            return "URL base inválida, precisa começar com http:// ou https://"

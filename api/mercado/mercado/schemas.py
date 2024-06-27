import datetime
from typing import Optional
import uuid
from pydantic import BaseModel, ConfigDict, Field
from validate_docbr import CNPJ

from mercado.utils import digitos_doc
from usuario.usuario.schemas import UsuarioBase


# Schemas relacionados ao Mercado
class MercadoBase(BaseModel):
    razao_social: str = Field(..., description="Razão social")
    nome_fantasia: str = Field(..., description="Nome fantasia")
    telefone: int = Field(..., description="Telefone")
    descricao: Optional[str] = Field(
        default="", max_length=500, description="Descrição do mercado"
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


class MercadoSchema(MercadoBase):
    """Schema acrescenta campos de CNPJ, nome e CPF do responsável."""

    id: uuid.UUID = Field(..., description="ID do mercado")
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


class MercadoOutput(MercadoSchema):
    model_config = ConfigDict(from_attributes=True)
    foto: bytes

    created_at: Optional[datetime.datetime] = Field(..., description="Data de cadastro")
    pass


class MercadoCreate(MercadoSchema):
    usuario: Optional[UsuarioBase]
    pass


class MercadoUpdate(BaseModel):
    razao_social: Optional[str] = Field("", description="Razão social")
    nome_fantasia: Optional[str] = Field("", description="Nome fantasia")
    telefone: Optional[int] = Field(0, description="Telefone")
    descricao: Optional[str] = Field(
        "", max_length=500, description="Descrição do mercado"
    )
    cep: Optional[str] = Field("", max_length=9, description="CEP")
    estado: Optional[str] = Field("", max_length=255, description="Estado")
    cidade: Optional[str] = Field("", max_length=255, description="Cidade")
    bairro: Optional[str] = Field("", max_length=255, description="Bairro")
    endereco: Optional[str] = Field("", max_length=255, description="Endereço")
    numero_endereco: Optional[int] = Field(0, description="Número")
    complemento: Optional[str] = Field("", max_length=255, description="Complemento")

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
        if self.razao_social and len(self.razao_social) > 30:
            return "A razão social é muito grande."

    def _validar_nome_fantasia(self):
        if self.nome_fantasia and len(self.nome_fantasia) > 55:
            return "O nome fantasia é muito grande."

    def _validar_telefone(self):
        if self.telefone and len(str(self.telefone)) != 11:
            return "Este número de telefone não é válido."

    def _validar_cep(self):
        _erros = []

        if self.cep:
            self.cep = digitos_doc(self.cep)
            if len(self.cep) != 8:
                _erros.append("O CEP deve conter 8 dígitos")

            if not self.cep.isdigit():
                _erros.append("O CEP deve conter apenas dígitos")

        return _erros

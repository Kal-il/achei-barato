import re
from typing import Optional
import uuid
from pydantic import ConfigDict, EmailStr, Field
from usuario.usuario.schemas import UsuarioBase, UsuarioAuth
from pydantic import BaseModel
from validate_docbr import CNPJ


class ConsumidorBase(UsuarioBase):
    cep: str = Field(..., max_length=8, description="CEP")
    estado: str = Field(..., max_length=255, description="Estado")
    cidade: str = Field(..., max_length=255, description="Cidade")
    bairro: str = Field(..., max_length=255, description="Bairro")
    endereco: str = Field(..., max_length=255, description="Endereço")
    complemento: str = Field(None, max_length=255, description="Complemento")
    telefone: int = Field(..., description="Telefone")

class ConsumidorSchema(ConsumidorBase):
    model_config = ConfigDict(from_attributes=True)
    pass

class ConsumidorUpdate(BaseModel):
    nome: Optional[str] = Field(default="", max_length=255, description="Nome do usuário")
    email: Optional[str] = Field(default="", description="E-mail do usuário")
    cep: Optional[str] = Field(default="", max_length=8, description="CEP")
    estado: Optional[str] = Field(default="", max_length=255, description="Estado")
    cidade: Optional[str] = Field(default="", max_length=255, description="Cidade")
    bairro: Optional[str] = Field(default="", max_length=255, description="Bairro")
    endereco: Optional[str] = Field(default="", max_length=255, description="Endereço")
    complemento: Optional[str] = Field(default="", max_length=255, description="Complemento")
    telefone: Optional[int] = Field(default=0, description="Telefone")

    def validar_campos(self):
        erros = {}

        if erro := self._validar_telefone():
            erros["telefone"] = erro

        if erro := self._validar_cep():
            erros["cep"] = erro

        if erro := self._validar_endereco():
            erros["endereco"] = erro

        if erro := self._validar_bairro():
            erros["bairro"] = erro

        if erro := self._validar_cidade():
            erros["cidade"] = erro

        if erro := self._validar_complemento():
            erros["complemento"] = erro

        return erros

    def _validar_telefone(self):
        if self.telefone and len(str(self.telefone)) != 11:
            return "Este número de telefone é inválido"

    def _validar_cep(self):
        _erros = []

        if self.cep:
            self.cep = re.sub(r"\D", "", self.cep)
            if len(self.cep) != 8:
                _erros.append("O CEP deve conter 8 caracteres")

            if not self.cep.isdigit():
                _erros.append("O CEP deve conter apenas dígitos")

        return _erros

    def _validar_endereco(self):
        _erros = []

        if self.endereco and len(self.endereco) > 255:
            _erros.append("O endereço deve ter no máximo 255 caracteres")

        return _erros

    def _validar_complemento(self):
        _erros = []

        if self.complemento and len(self.complemento) > 255:
            _erros.append("O complemento deve ter no máximo 255 caracteres")

        return _erros

    def _validar_estado(self):
        _erros = []

        if self.estado and len(self.estado) > 255:
            _erros.append("O estado deve ter no máximo 255 caracteres")

        return _erros

    def _validar_cidade(self):
        _erros = []

        if self.cidade and len(self.cidade) > 255:
            _erros.append("A cidade deve ter no máximo 255 caracteres")

        return _erros

    def _validar_bairro(self):
        _erros = []

        if self.bairro and len(self.bairro) > 255:
            _erros.append("O bairro deve ter no máximo 255 caracteres")

        return _erros

class ConsumidorAuth(UsuarioAuth):

    cep: str = Field(..., max_length=8, description="CEP")
    estado: str = Field(..., max_length=255, description="Estado")
    cidade: str = Field(..., max_length=255, description="Cidade")
    bairro: str = Field(..., max_length=255, description="Bairro")
    endereco: str = Field(..., max_length=255, description="Endereço")
    complemento: Optional[str] = Field(None, max_length=255, description="Complemento")
    numero_endereco: int = Field(..., description="Número do endereço")
    telefone: int = Field(..., description="Telefone")

    def validar_campos(self):
        erros = {}

        if erro := self._validar_telefone():
            erros["telefone"] = erro

        if erro := self._validar_cep():
            erros["cep"] = erro

        return erros

    def _validar_telefone(self):
        if len(str(self.telefone)) > 13:
            return "Este número de telefone é muito grande."

    def _validar_cep(self):
        _erros = []

        self.cep = re.sub(r"\D", "", self.cep)
        if len(self.cep) != 8:
            _erros.append("O CEP deve conter 8 caracteres")

        if not self.cep.isdigit():
            _erros.append("O CEP deve conter apenas dígitos")

        return _erros

    def _validar_endereco(self):
        _erros = []

        if not self.endereco:
            _erros.append("O endereço é obrigatório")

        if len(self.endereco) > 255:
            _erros.append("O endereço deve ter no máximo 255 caracteres")

        return _erros

    def _validar_numero_endereco(self):
        _erros = []

        if not self.numero_endereco:
            _erros.append("O número do endereço é obrigatório")

        if not isinstance(self.numero_endereco, int):
            _erros.append("O número do endereço deve ser um número inteiro")

        return _erros

    def _validar_complemento(self):
        _erros = []

        if self.complemento and len(self.complemento) > 255:
            _erros.append("O complemento deve ter no máximo 255 caracteres")

        return _erros

    def _validar_estado(self):
        _erros = []

        if not self.estado:
            _erros.append("O estado é obrigatório")

        if len(self.estado) > 255:
            _erros.append("O estado deve ter no máximo 255 caracteres")

        return _erros

    def _validar_cidade(self):
        _erros = []

        if not self.cidade:
            _erros.append("A cidade é obrigatória")

        if len(self.cidade) > 255:
            _erros.append("A cidade deve ter no máximo 255 caracteres")

        return _erros

    def _validar_bairro(self):
        _erros = []

        if not self.bairro:
            _erros.append("O bairro é obrigatório")

        if len(self.bairro) > 255:
            _erros.append("O bairro deve ter no máximo 255 caracteres")

        return _erros


class ConsumidorGoogle(BaseModel):

    id_google: str = Field(..., description="ID Google")
    cep: str = Field(..., max_length=8, description="CEP")
    estado: str = Field(..., max_length=255, description="Estado")
    cidade: str = Field(..., max_length=255, description="Cidade")
    bairro: str = Field(..., max_length=255, description="Bairro")
    endereco: str = Field(..., max_length=255, description="Endereço")
    complemento: str = Field(None, max_length=255, description="Complemento")
    numero_endereco: int = Field(..., description="Número do endereço")
    telefone: int = Field(..., description="Telefone")

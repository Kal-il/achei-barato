import re
from typing import Optional
from pydantic import Field
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
        if len(self.cep) > 8:
            _erros.append("O CEP deve ter no máximo 8 caracteres")

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

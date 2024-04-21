from typing import Optional
from pydantic import BaseModel, Field
from validate_docbr import CNPJ

from mercado.mercado.utils import digitos_doc
from usuario.usuario.schemas import UsuarioBase


class MercadoBase(BaseModel):
    cnpj: str = Field(..., max_length=18, description="CNPJ")
    razao_social: str = Field(..., description="Razão social")
    nome_fantasia: str = Field(..., description="Nome fantasia")
    telefone: int = Field(..., description="Telefone")
    cep: str = Field(..., max_length=9, description="CEP")
    estado: str = Field(..., max_length=255, description="Estado")
    cidade: str = Field(..., max_length=255, description="Cidade")
    bairro: str = Field(..., max_length=255, description="Bairro")
    endereco: str = Field(..., max_length=255, description="Endereço")
    numero_endereco: int = Field(..., description="Número")
    complemento: Optional[str] = Field(..., max_length=255, description="Complemento")
    nome_responsavel: str = Field(..., max_length=255, description="Nome do responsável")
    cpf_responsavel: str = Field(..., max_length=14, description="CPF do responsável")

class Mercado(MercadoBase):
    pass

class MercadoCreate(MercadoBase):
    usuario: Optional[UsuarioBase]
    pass

    def validar_campos(self):
        erros = {}

        if erro := self._validar_razao_social():
            erros['razao_social'] = erro

        if erro := self._validar_nome_fantasia():
            erros['nome_fantasia'] = erro

        if erro := self._validar_telefone():
            erros['telefone'] = erro

        if erro := self._validar_cep():
            erros['cep'] = erro

        if erro := self._validar_cpf_responsavel():
            erros['cpf_responsavel'] = erro

        if erro := self._validar_cnpj():
            erros['cnpj'] = erro

        return erros


    def _validar_razao_social(self):
        if len(self.razao_social) > 30:
            return "A razão social é muito grande."

    def _validar_nome_fantasia(self):
        if len(self.nome_fantasia) > 55:
            return "O nome fantasia é muito grande."

    def _validar_telefone(self):
        if len(str(self.telefone)) > 13:
            return "Este número de telefone é muito grande."

    def _validar_cnpj(self):
        validador = CNPJ()
        self.cnpj = digitos_doc(self.cnpj)
        if len(self.cnpj) > 14 or not validador.validate(self.cnpj):
            return "Insira um CNPJ válido."

    def _validar_cpf_responsavel(self):
        self.cpf_responsavel = digitos_doc(self.cpf_responsavel)
        if not self.cpf_responsavel.isdigit() or len(self.cpf_responsavel) > 11:
            return "Insira um CPF válido."

    def _validar_cep(self):
        _erros = []

        self.cep = digitos_doc(self.cep)
        if len(self.cep) > 8:
            _erros.append("O CEP deve ter no máximo 8 caracteres")

        if not self.cep.isdigit():
            _erros.append("O CEP deve conter apenas dígitos")

        return _erros

class MercadoUpdate(MercadoBase):
    pass

import datetime
from typing import Optional
from pydantic import BaseModel, Field, validator

from mercado.enums import TipoEmpresaERP


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

        if not (
            self.url_base.startswith("http://") or self.url_base.startswith("https://")
        ):
            return "URL base inválida, precisa começar com http:// ou https://"

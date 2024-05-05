import re


# Obtém os dígitos do número de um documento
def digitos_doc(doc: str):
    return re.sub(r"\D", "", doc)

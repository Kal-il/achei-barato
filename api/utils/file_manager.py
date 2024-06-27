import base64
import hashlib

import aiofiles
from fastapi import UploadFile


class FileManager:
    @staticmethod
    async def upload_foto(foto: UploadFile):
        conteudo = await foto.read()
        md5 = hashlib.md5(await foto.read()).hexdigest()
        store_name = f"media/{md5 + str(foto.filename)}"
        async with aiofiles.open(store_name, "wb") as nova_foto:
            await nova_foto.write(conteudo)
            return store_name

    @staticmethod
    async def get_foto(url_foto: str):
        if url_foto:
            async with aiofiles.open(url_foto, "rb") as foto:
                foto_consumidor = await foto.read()
                foto_consumidor = base64.b64encode(foto_consumidor)
                return foto_consumidor
        return b""

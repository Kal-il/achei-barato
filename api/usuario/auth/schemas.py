from pydantic import BaseModel


class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class TokenData(BaseModel):
    email: str


class TokenPayload(BaseModel):
    sub: str = None
    exp: int = None

class RefreshTokenSchema(BaseModel):
    refresh_token: str
    
class GoogleAuthSchema(BaseModel):
    token_google: str

class GoogleAuthData(BaseModel):
    id_google: str
    
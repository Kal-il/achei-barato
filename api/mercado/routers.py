from fastapi import APIRouter
from mercado.mercado.routers import router as mercado_router
from mercado.produto.routers import router as produto_router
from mercado.curtidas.routers import router as curtidas_router
from mercado.mercado_seguir.routers import router as mercado_seguir_router
from mercado.promocao.routers import router as promocao_router
from mercado.api_mercados.routers import router as api_mercados_router

router = APIRouter()
router.include_router(mercado_router)
router.include_router(produto_router)
router.include_router(curtidas_router)
router.include_router(mercado_seguir_router)
router.include_router(promocao_router)
router.include_router(api_mercados_router)

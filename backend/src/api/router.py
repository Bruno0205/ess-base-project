from fastapi import APIRouter
from src.api import cadastro
from src.api import login
from src.api import cadastro_reservas
from src.api import autenticacao
from src.api import reviews
from src.api import queries
from src.api import estatisticas

api_router = APIRouter()

api_router.include_router(cadastro.router, prefix="/cadastro", tags=["cadastro"])
api_router.include_router(login.router, prefix="/login", tags=["login"])
api_router.include_router(cadastro_reservas.router, prefix="/cadastro-reservas", tags=["cadastro-reservas"])
api_router.include_router(autenticacao.router, prefix="/autenticacao", tags=["autenticacao"])
api_router.include_router(reviews.router, prefix="/reviews", tags=["reviews"])
api_router.include_router(queries.router, prefix="/queries", tags=["queries"])
api_router.include_router(estatisticas.router, prefix="/estatisticas", tags=["estatisticas"])

from fastapi import APIRouter, HTTPException, Depends, FastAPI
from typing import List
from src.schemas.models import Reserva, UserBase

app = FastAPI()

router = APIRouter()

reservas_db = [
    Reserva(
        titulo="Casa Aconchegante",
        descricao="Casa espaçosa e confortável.",
        imagens="casa1.jpg",
        petfriendly=True,
        endereco="Rua das Flores, 123",
        tipo="Casa",
        disponibilidade="2024-02-01 a 2024-02-10",
        preco=300,
        usuario="anfitriao123",
        avalMedia=4.5,
        qtdAlugado=10,
        destacado=True,
        temporada="Carnaval"
    ),
    Reserva(
        titulo="Casa Aconchegante",
        descricao="Casa bem localizada.",
        imagens="casa2.jpg",
        petfriendly=False,
        endereco="Av. Central, 200",
        tipo="Casa",
        disponibilidade="2024-12-20 a 2024-12-30",
        preco=250,
        usuario="anfitriao123",
        avalMedia=4.8,
        qtdAlugado=15,
        destacado=False,
        temporada="Fim de ano"
    ),
    Reserva(
        titulo="Casa Aconchegante",
        descricao="Casa moderna com piscina.",
        imagens="casa3.jpg",
        petfriendly=True,
        endereco="Rua das Palmeiras, 50",
        tipo="Casa",
        disponibilidade="2024-02-15 a 2024-02-20",
        preco=350,
        usuario="anfitriao123",
        avalMedia=4.7,
        qtdAlugado=12,
        destacado=True,
        temporada="Carnaval"
    ),
    Reserva(
        titulo="Casa Aconchegante",
        descricao="Casa com área externa.",
        imagens="casa4.jpg",
        petfriendly=False,
        endereco="Av. Central, 100",
        tipo="Casa",
        disponibilidade="2024-12-10 a 2024-12-15",
        preco=300,
        usuario="anfitriao123",
        avalMedia=4.6,
        qtdAlugado=20,
        destacado=False,
        temporada="Fim de ano"
    ),
]

# Dependência para validar se o usuário é um anfitrião ou admin
def verificar_usuario(usuario: UserBase):
    if usuario.tipo_pessoa not in ["fisica", "juridica", "admin"]:
        raise HTTPException(status_code=403, detail="Acesso negado. Apenas anfitriões ou administradores podem visualizar estatísticas.")
    return usuario

@router.get("/estatisticas/{imovel}", response_model=List[Reserva])
def obter_estatisticas(imovel: str, usuario: UserBase = Depends(verificar_usuario)):
    # Filtra as reservas do imóvel solicitado
    historico = [reserva for reserva in reservas_db if reserva.titulo == imovel]

    if not historico:
        raise HTTPException(status_code=404, detail="Nenhuma reserva encontrada para este imóvel.")

    return historico

# Rota para visualizar as reservas segmentadas por temporada
@router.get("/estatisticas/{imovel}", response_model=List[Reserva])
def obter_estatisticas_segmentadas(imovel: str, temporada: str, usuario: UserBase = Depends(verificar_usuario)):
    # Filtra as reservas do imóvel solicitado por temporada
    historico = [reserva for reserva in reservas_db if reserva.titulo == imovel and reserva.temporada == temporada]

    if not historico:
        raise HTTPException(status_code=404, detail=f"Nenhuma reserva encontrada para o imóvel '{imovel}' na temporada '{temporada}'.")

    return historico
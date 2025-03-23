import os
import json
from fastapi import APIRouter, FastAPI, HTTPException
from src.schemas.reserva import Reserva, Periodo
from typing import List

app = FastAPI()
router = APIRouter()

# Caminho correto para o JSON
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "..", "db", "db_reservas.json")  # Ajuste conforme necessário

# Função para validar descrição
def is_valid_description(description: str) -> bool:
    return len(description) >= 20

# Função para obter o banco de dados
def getDB():
    if not os.path.exists(DATA_FILE):
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        with open(DATA_FILE, 'w') as dbu:
            json.dump({"reservas": []}, dbu)

    try:
        with open(DATA_FILE, 'r') as dbu:
            return json.load(dbu)
    except json.JSONDecodeError:
        return {"reservas": []}  # Retorna um DB vazio se houver erro

# Função para salvar o banco de dados
def saveDB(db):
    with open(DATA_FILE, 'w') as dbu:
        json.dump(db, dbu, indent=4)

# Função para verificar sobreposição de períodos alugados
def periodo_disponivel(novo_periodo: Periodo, alugados: List[Periodo]) -> bool:
    for periodo in alugados:
        if not (novo_periodo.fim < periodo.inicio or novo_periodo.inicio > periodo.fim):
            return False  # Existe sobreposição
    return True

@router.post("/add_reserva", status_code=201, tags=['cadastro-reservas'])
async def add_reserva(reserva: Reserva):
    # Cria uma nova reserva
    db = getDB()

    # Valida a descrição
    if not is_valid_description(reserva.descricao):
        raise HTTPException(status_code=422, detail='A descrição deve ter no mínimo 20 caracteres.')

    # Verifica se o período de disponibilidade está sendo informado corretamente
    if not reserva.disponibilidade.inicio or not reserva.disponibilidade.fim:
        raise HTTPException(status_code=422, detail="O período de disponibilidade deve ser informado.")

    # Converte a reserva para dicionário antes de salvar
    reserva_dict = reserva.dict()  # Alterado de model_dump() para dict()
    reserva_dict["disponibilidade"] = {
        "inicio": str(reserva.disponibilidade.inicio),
        "fim": str(reserva.disponibilidade.fim)
    }
    reserva_dict["alugado"] = [{"inicio": str(p.inicio), "fim": str(p.fim)} for p in reserva.alugado]

    db['reservas'].append(reserva_dict)
    saveDB(db)

    return {"message": "Reserva publicada com sucesso.", "reserva": reserva_dict}

#-------------------------------------------------------------------------------------------
# Endpoint para buscar todas as reservas
@router.get("/reservas", tags=['cadastro-reservas'])
async def get_reservas():
    db = getDB()
    return db["reservas"]

# Endpoint para buscar reservas por username
@router.get("/reservas/{username}", tags=['cadastro-reservas'])
async def get_reservas_by_username(username: str):
    """
    Retorna as reservas associadas ao username fornecido.
    """
    db = getDB()
    reservas_usuario = [reserva for reserva in db["reservas"] if reserva.get("usuario") == username]

    if not reservas_usuario:
        raise HTTPException(status_code=404, detail="Nenhuma reserva encontrada para este usuário.")

    return reservas_usuario
#-------------------------------------------------------------------------------------------
import os
import json
from fastapi import APIRouter, FastAPI, HTTPException
from src.schemas.reserva import Reserva
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

#Add uma nova reserva
from datetime import date
from fastapi import APIRouter, FastAPI, HTTPException
from src.schemas.reserva import Reserva, Periodo
from typing import List

app = FastAPI()
router = APIRouter()

# Função para verificar sobreposição de períodos alugados
def periodo_disponivel(novo_periodo: Periodo, alugados: List[Periodo]) -> bool:
    for periodo in alugados:
        if not (novo_periodo.fim < periodo.inicio or novo_periodo.inicio > periodo.fim):
            return False  # Existe sobreposição
    return True

@router.post("/add_reserva", status_code=201, tags=['cadastro-reservas'])
async def add_reserva(reserva: Reserva, periodo_alugado: Periodo):
    """Cria uma nova reserva e adiciona o período alugado, caso válido."""
    db = getDB()

    # Valida se o período alugado está dentro da disponibilidade
    if not (reserva.disponibilidade.inicio <= periodo_alugado.inicio <= reserva.disponibilidade.fim and
            reserva.disponibilidade.inicio <= periodo_alugado.fim <= reserva.disponibilidade.fim):
        raise HTTPException(status_code=422, detail="O período alugado deve estar dentro da disponibilidade.")

    # Valida se o período já foi alugado antes
    if not periodo_disponivel(periodo_alugado, reserva.alugado):
        raise HTTPException(status_code=422, detail="O período solicitado já está alugado.")

    # Adiciona o novo período à lista de períodos alugados
    reserva.alugado.append(periodo_alugado)

    # Converte a reserva para dicionário antes de salvar
    reserva_dict = reserva.model_dump()
    reserva_dict["disponibilidade"] = {
        "inicio": str(reserva.disponibilidade.inicio),
        "fim": str(reserva.disponibilidade.fim)
    }
    reserva_dict["alugado"] = [{"inicio": str(p.inicio), "fim": str(p.fim)} for p in reserva.alugado]

    db['reservas'].append(reserva_dict)
    saveDB(db)

    return {"message": "Reserva publicada com sucesso.", "reserva": reserva_dict}


'''
@router.post("/add_reserva", status_code=201, tags=['cadastro-reservas'])
async def add_reserva(reserva: Reserva):
    """Cria uma nova reserva."""
    db = getDB()

    # Verifica se já existe uma reserva com o mesmo título e data
    #if any(r['titulo'] == reserva.titulo and r['data'] == reserva.data for r in db['reservas']):
    #    raise HTTPException(status_code=422, detail='Já existe uma reserva com esse título para esta data.')

    # Valida a descrição
    if not is_valid_description(reserva.descricao):
        raise HTTPException(status_code=422, detail='A descrição deve ter no mínimo 20 caracteres.')

    db['reservas'].append(reserva.model_dump())
    saveDB(db)

    return {"message": "Reserva publicada com sucesso.", "reserva": reserva}
'''
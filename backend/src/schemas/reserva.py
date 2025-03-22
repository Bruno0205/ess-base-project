from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum
import json
from datetime import date

app = FastAPI()
router = APIRouter()

def getDB():
    with open('backend\src\db\db_reservas.json', 'r') as dbu:
        db = json.load(dbu)
    return db

def saveDB(db):
    with open('backend\src\db\db_reservas.json', 'w') as dbu:
        db = json.dump(db, fp=dbu, indent=4)
    return db

#tipos de reserva
class TipoReserva(str, Enum):
    QUARTO = "Quarto"
    CASA = "Casa"
    APARTAMENTO = "Apartamento"
    SALAO = "Salão"

class Periodo(BaseModel):
    inicio: date
    fim: date


class Reserva(BaseModel):
    ativo: bool = True
    titulo: str
    descricao: str
    imagens: List[str] = []
    petfriendly: bool
    endereco: str
    tipo: TipoReserva
    disponibilidade: Periodo 
    alugado: Optional[Periodo] = [] 
    preco: int = 0
    usuario: str #email pois é único
    alugado_por: List[str] = []
    avalMedia: float = 0
    qntdAlugado: int = 0
    destacado: bool = False 
    temporada: Optional[str] = []



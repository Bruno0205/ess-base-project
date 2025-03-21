import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from fastapi import FastAPI
from pydantic import BaseModel
import json

def getDB():
    db_path = os.path.join(os.path.dirname(__file__), '..', 'db', 'db_avaliacoes.json')
    with open(db_path, 'r') as dbu:
        db = json.load(dbu)
    return db

def saveDB(db):
    db_path = os.path.join(os.path.dirname(__file__), '..', 'db', 'db_avaliacoes.json')
    with open(db_path, 'w') as dbu:
        json.dump(db, fp=dbu, indent=4)
    return db

class Avaliacao(BaseModel):
    id: int
    usuario: str
    nota: int
    comentario: str
    endereco: str
    oculto: bool

def print_comments_by_address(address: str):
    db = getDB()
    for avaliacao in db:
        if avaliacao['endereco'] == address:
            print(avaliacao['comentario'])

# Exemplo de uso
print_comments_by_address("Rua das Flores, 123, Praia Grande")
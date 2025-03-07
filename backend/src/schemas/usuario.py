from fastapi import FastAPI
from pydantic import BaseModel, ConfigDict
from typing import Optional
import json
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "db", "db_users.json")

def getDB():
    """Load the database from the JSON file."""
    try:
        with open(DATA_PATH, 'r', encoding='utf-8') as dbu:
            return json.load(dbu)
    except FileNotFoundError:
        print(f"Erro: O arquivo {DATA_PATH} não foi encontrado.")
        return {"usuarios": []}

def saveDB(db):
    """Save the database back to the JSON file."""
    with open(DATA_PATH, 'w', encoding='utf-8') as f:
        json.dump(db, f, default=str, indent=4)

class Dados_Comuns(BaseModel):
    ativo: bool = True
    uf: str | None = None
    email: str
    login: str
    senha: str
    liberado: bool = False
    codigo_verificacao: str | None = None
    codigo_valido_ate: str | None = None
    reset_token: str | None = None
    reset_token_expira: str | None = None

class User_Pessoa_Fisica(Dados_Comuns):
    tipo_pessoa: str = "fisica"
    cpf: str
    nome: str
    nascimento: str

class User_Pessoa_Juridica(Dados_Comuns):
    tipo_pessoa: str = "juridica"
    cnpj: str
    razao_social: str
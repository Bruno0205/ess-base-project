import os
import json
import secrets
import smtplib
import re
from datetime import datetime, timedelta
from fastapi import APIRouter, FastAPI, HTTPException, status
from fastapi.responses import RedirectResponse
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from src.schemas.usuario import User_Pessoa_Fisica, User_Pessoa_Juridica
from typing import List
from pydantic import BaseModel, ConfigDict

app = FastAPI()
router = APIRouter()

# Caminho correto para o JSON
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "..", "db", "db_users.json")  # Ajuste conforme necessário

# Função para validar senha
def is_valid_password(password: str) -> bool:
    return len(password) >= 5 and re.search(r'[A-Z]', password) and re.search(r'[a-z]', password) and re.search(r'\d', password)

# Função para obter o banco de dados
def getDB():
    if not os.path.exists(DATA_FILE):
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        with open(DATA_FILE, 'w') as dbu:
            json.dump({"usuarios": []}, dbu)

    try:
        with open(DATA_FILE, 'r') as dbu:
            return json.load(dbu)
    except json.JSONDecodeError:
        return {"usuarios": []}  # Retorna um DB vazio se houver erro

# Função para salvar o banco de dados
def saveDB(db):
    with open(DATA_FILE, 'w') as dbu:
        json.dump(db, dbu, indent=4)

# Envio de email de confirmação
async def send_confirmation_email(email: str, name: str):
    sender_email = "bruhusopessoal@gmail.com"
    sender_password = "shjx kirg ahdu wygl"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = email
    msg['Subject'] = "Confirmação de Cadastro"
    body = f"Olá {name}, seu cadastro foi realizado com sucesso. Ficamos felizes de te ver em nossa aplicação!"
    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, msg.as_string())
            print("E-mail enviado com sucesso!")
    except Exception as e:
        print(f"Erro ao enviar e-mail: {e}")

# Cadastro de pessoa física
@router.post("/cadastro/pf", tags=['cadastro'])
async def cadastrar_pf(usuario: User_Pessoa_Fisica):
    db = getDB()

    if any(u['email'] == usuario.email for u in db['usuarios']):
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    if not is_valid_password(usuario.senha):
        raise HTTPException(
            status_code=422,
            detail="A senha deve ter no mínimo 5 caracteres, conter pelo menos uma letra maiúscula, uma letra minúscula e um número."
        )

    usuario_dict = usuario.model_dump()
    db['usuarios'].append(usuario_dict)
    saveDB(db)

    await send_confirmation_email(usuario.email, usuario.nome)

    return {"message": "Cadastro realizado com sucesso. Verifique seu email."}

# Cadastro de pessoa jurídica
@router.post("/cadastro/pj", status_code=201, tags=['cadastro'])
async def add_usuario_pj(usuario: User_Pessoa_Juridica):
    db = getDB()

    if any(u.get('cnpj') == usuario.cnpj for u in db['usuarios']):
        raise HTTPException(status_code=400, detail="CNPJ já cadastrado")

    if any(u['email'] == usuario.email for u in db['usuarios']):
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    if not is_valid_password(usuario.senha):
        raise HTTPException(
            status_code=422,
            detail="A senha deve ter no mínimo 5 caracteres, conter pelo menos uma letra maiúscula, uma letra minúscula e um número."
        )

    usuario_dict = usuario.model_dump()
    db['usuarios'].append(usuario_dict)
    saveDB(db)

    await send_confirmation_email(usuario.email, usuario.razao_social)

    return {"message": "Cadastro realizado com sucesso. Verifique seu email."}

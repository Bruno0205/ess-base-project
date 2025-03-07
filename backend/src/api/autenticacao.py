import json
import secrets
from datetime import datetime, timedelta
from fastapi import APIRouter, FastAPI, HTTPException, status
from src.schemas.usuario import User_Pessoa_Fisica, User_Pessoa_Juridica, getDB, saveDB
from typing import List
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = FastAPI()
router = APIRouter()

USERS_FILE = "db_users.json"
DATA_FILE = "ess-base-project\backend\src\db\db_users.json"

@router.post("/solicitar-codigo", tags=['autenticacao'])
async def solicitar_codigo_verificacao(email: str):
    db = getDB()
    
    # Encontra o usuário pelo email
    usuario = next((u for u in db['usuarios'] if u['email'] == email), None)
    
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    
    #Gera código e expiração
    codigo = secrets.token_hex(3).upper()  # Ex: A1B2C3
    expiracao = datetime.now() + timedelta(minutes=15)
    
    #Atualiza o usuário
    usuario['codigo_verificacao'] = codigo
    usuario['codigo_valido_ate'] = expiracao.isoformat()
    saveDB(db)
    
    # Envia o email COM SEU MÉTODO ATUAL
    await send_verification_email(email, codigo)  # Vamos modificar sua função
    
    return {"message": "Código enviado para o e-mail"}

# MODIFIQUE sua função de email para receber o código
async def send_verification_email(email: str, codigo: str):
    sender_email = "bruhusopessoal@gmail.com"
    sender_password = "shjx kirg ahdu wygl"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = email
    msg['Subject'] = "Verificação de Conta"
    
    # Corpo do email com código e link
    body = f"""
    Olá,
    
    Seu código de verificação é: {codigo}. Realize a autenticação na nossa página para que você possa usufruir de todas as funcionalidades da nossa aplicação.
    
    O código é válido por 15 minutos.
    """
    
    msg.attach(MIMEText(body, 'plain'))
    
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, msg.as_string())
            return True
    except Exception as e:
        print(f"Erro ao enviar e-mail: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Falha ao enviar e-mail"
        )

# Endpoint para verificação via link
@router.get("/verificar/{codigo}", tags=['autenticacao'])
async def verificar_via_link(codigo: str):
    db = getDB()
    
    usuario = next((u for u in db['usuarios'] if u.get('codigo_verificacao') == codigo), None)
    
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Código inválido"
        )
    
    if datetime.fromisoformat(usuario['codigo_valido_ate']) < datetime.now():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Código expirado"
        )
    
    #Atualiza o status
    usuario['liberado'] = True
    saveDB(db)
    
    return {"message": "Conta verificada com sucesso!"}
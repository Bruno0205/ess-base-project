# ess-base-project/backend/src/api/login.py

import json
import secrets
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, status
from src.schemas.usuario import getDB, saveDB
from typing import List
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

router = APIRouter()
USERS_FILE = "src/db/db_users.json"

# Authenticate user with login and password
@router.post("/auth", status_code=200, tags=['login'])
async def authenticate_user(login: str, senha: str):
    db = getDB()
    for user in db['usuarios']:
        if user['login'] == login and user['senha'] == senha:
            return {"message": "Login bem-sucedido", "user": user}
    raise HTTPException(status_code=401, detail="Login e/ou senha incorreto(s).")

#Send password reset email
@router.post("/solicitar-reset-senha", tags=['login'])
async def solicitar_reset_senha(email: str):
    db = getDB()
    
    # Find user by email
    usuario = next((u for u in db['usuarios'] if u['email'] == email), None)
    
    if not usuario:
        return {"message": "Se o e-mail existir, enviaremos um código"} 
    
    #Gera o token e sua expiração
    reset_token = secrets.token_urlsafe(16) 
    reset_token_expira = datetime.now() + timedelta(minutes=15)
    
    #Atualiza as flags no user
    usuario['reset_token'] = reset_token
    usuario['reset_token_expira'] = reset_token_expira.isoformat()
    saveDB(db)
    
    #Enviando o email
    await send_password_reset_email(email, reset_token)
    
    return {"message": "Código de recuperação enviado para o e-mail"}

async def send_password_reset_email(email: str, token: str):
    sender_email = "bruhusopessoal@gmail.com"
    sender_password = "shjx kirg ahdu wygl"
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = email
    msg['Subject'] = "Recuperação de Senha"
    
    # Email body with link and code
    body = f"""
    Olá,
    
    Use o seguinte código para redefinir sua senha:
    {token}
    
    O código é válido por 15 minutos.
    """
    
    msg.attach(MIMEText(body, 'plain'))
    
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, msg.as_string())
    except Exception as e:
        print(f"Erro ao enviar e-mail: {e}")
        raise HTTPException(
            status_code=500,
            detail="Erro ao enviar e-mail de recuperação"
        )

# Reset password using token
class ResetSenhaRequest(BaseModel):
    token: str
    nova_senha: str

@router.post("/resetar-senha", tags=['login'])
async def resetar_senha(request: ResetSenhaRequest):
    db = getDB()
    
    #Procura user por token
    usuario = next((u for u in db['usuarios'] if u.get('reset_token') == request.token), None)
    
    if not usuario:
        raise HTTPException(
            status_code=400,
            detail="Código inválido ou expirado"
        )
    
    #Checa a expiração
    if datetime.fromisoformat(usuario['reset_token_expira']) < datetime.now():
        raise HTTPException(
            status_code=400,
            detail="Código expirado"
        )
    
    #Muda a senha
    usuario['senha'] = request.nova_senha
    usuario['reset_token'] = None
    usuario['reset_token_expira'] = None
    saveDB(db)
    
    return {"message": "Senha alterada com sucesso"}
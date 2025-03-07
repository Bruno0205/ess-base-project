import sys
import os
import pytest
import asyncio
from datetime import datetime, timedelta
from pytest_bdd import parsers, given, when, then, scenario
from src.api.login import resetar_senha
from src.schemas.usuario import getDB as load_db, saveDB as save_db, User_Pessoa_Fisica
from fastapi.exceptions import HTTPException
from src.api.login import ResetSenhaRequest  

# Add the project root to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))

# Define the feature file path
FEATURE_FILE = "../features/nPassword.feature"

@pytest.fixture(autouse=True)
def reset_database():
    """Reset the database before each test."""
    db = {
        "usuarios": [
            {
                "ativo": True,
                "uf": "PB",
                "email": "Example@Newpas-s.br",
                "login": "BruhPF",
                "senha": "Senha123",
                "liberado": True,
                "codigo_verificacao": None,
                "codigo_valido_ate": None,
                "reset_token": "AJSU23",  
                "reset_token_expira": (datetime.now() + timedelta(minutes=15)).isoformat(), 
                "tipo_pessoa": "fisica",
                "cpf": "123.123.312-23",
                "nome": "Bruno Carvalho",
                "nascimento": "12/12/2000"
            }
        ]
    }
    save_db(db)

# Scenario: Successful password reset
@scenario(
    scenario_name="Password reset successful",
    feature_name=FEATURE_FILE
)
def test_successful_password_reset():
    """Test successful password reset."""

@given(parsers.cfparse('que existe um usuário com e-mail "{email}", senha "{senha}" e token "{token}"'))
def mock_user_in_database(email: str, senha: str, token: str):

    db = load_db()
    usuario = next((u for u in db['usuarios'] if u['email'] == email), None)
    assert usuario, f"User with email {email} not found in the database"
    assert usuario["senha"] == senha, "Incorrect password for the user"
    assert usuario["reset_token"] == token, "Incorrect token for the user"

@when(parsers.cfparse('o usuário utiliza o token "{token}" para alterar a senha para "{nova_senha}"'))
def reset_password_with_token(context, token: str, nova_senha: str):

    reset_request = ResetSenhaRequest(token=token, nova_senha=nova_senha)
    try:
        response = asyncio.run(resetar_senha(reset_request))
        context["response"] = response
        context["new_password"] = nova_senha 
    except HTTPException as e:
        context["exception"] = e

@then(parsers.cfparse('a resposta deve conter a mensagem "{message}"'))
def check_response_message(context, message: str):
    #Valida a mensagem dada
    if "response" in context:
        assert context["response"]["message"] == message, f"Expected message '{message}', but got '{context['response']['message']}'"
    elif "exception" in context:
        assert context["exception"].detail == message, f"Expected error '{message}', but got '{context['exception'].detail}'"

@then(parsers.cfparse('a senha do usuário deve ser atualizada para "{nova_senha}"'))
def check_password_updated(context, nova_senha: str):
    #Valida a troca de senhas
    db = load_db()
    usuario = next((u for u in db['usuarios'] if u['email'] == "bcs6@cin.ufpe.br"), None)
    assert usuario, "User not found in the database"
    assert usuario["senha"] == nova_senha, f"Expected password '{nova_senha}', but got '{usuario['senha']}'"

#Scenario: Unsuccessful password reset
@scenario(
    scenario_name="Unsuccessful password reset",
    feature_name=FEATURE_FILE
)
def test_unsuccessful_password_reset():
    """Test unsuccessful password reset."""






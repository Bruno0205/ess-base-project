import sys
import os
import pytest
import asyncio
from datetime import datetime, timedelta
from pytest_bdd import parsers, given, when, then, scenario
from src.api.autenticacao import verificar_via_link
from src.schemas.usuario import getDB as load_db, saveDB as save_db
from fastapi.exceptions import HTTPException

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))

FEATURE_FILE = "../features/account_verification.feature"

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
                "liberado": False,              
                "codigo_verificacao": "AJSU23", 
                "codigo_valido_ate": (datetime.now() + timedelta(minutes=15)).isoformat(),
                "reset_token": None,            
                "reset_token_expira": None,    
                "tipo_pessoa": "fisica",        
                "cpf": "123.123.312-23",        
                "nome": "Bruno Carvalho",      
                "nascimento": "12/12/2000"      
            }
        ]
    }
    save_db(db)

@scenario(
    scenario_name="Successful account verification",
    feature_name=FEATURE_FILE
)
def test_successful_account_verification():
    """Test successful account verification."""

@scenario(
    scenario_name="Failed account verification due to invalid code",
    feature_name=FEATURE_FILE
)
def test_failed_account_verification_invalid_code():
    """Test failed account verification due to invalid code."""

@scenario(
    scenario_name="Failed account verification due to expired code",
    feature_name=FEATURE_FILE
)
def test_failed_account_verification_expired_code():
    """Test failed account verification due to expired code."""

@given(parsers.cfparse('que existe um usuário com e-mail "{email}", código "{codigo}" e expiração {validade}'))
def mock_user_in_database(email: str, codigo: str, validade: str):

    db = load_db()
    usuario = next((u for u in db['usuarios'] if u['email'] == email), None)
    assert usuario, f"User with email {email} not found in the database"
    
    if validade == "válida":
        usuario["codigo_verificacao"] = codigo
        usuario["codigo_valido_ate"] = (datetime.now() + timedelta(minutes=15)).isoformat()
    elif validade == "expirada":
        usuario["codigo_verificacao"] = codigo
        usuario["codigo_valido_ate"] = (datetime.now() - timedelta(minutes=15)).isoformat()

    save_db(db)

@when(parsers.cfparse('o usuário acessa o endpoint de verificação com o código "{codigo}"'))
def verify_account_with_code(context, codigo: str):
    # Call the verification endpoint with the provided code
    try:
        response = asyncio.run(verificar_via_link(codigo))
        context["response"] = response
    except HTTPException as e:
        context["exception"] = e

@then(parsers.cfparse('a resposta deve conter a mensagem "{message}"'))
def check_response_message(context, message: str):
    # Validate the response message
    if "response" in context:
        assert context["response"]["message"] == message, f"Expected message '{message}', but got '{context['response']['message']}'"
    elif "exception" in context:
        assert context["exception"].detail == message, f"Expected error '{message}', but got '{context['exception'].detail}'"

@then(parsers.cfparse('o status da conta do usuário deve ser atualizado para "{status}"'))
def check_account_status(context, status: str):
    # Validate that the user's account status has been updated in the database
    db = load_db()
    usuario = next((u for u in db['usuarios'] if u['email'] == "Example@Newpas-s.br"), None)
    assert usuario, "User not found in the database"

    if status == "liberado":
        assert usuario["liberado"] is True, "Account status was not updated to 'liberado'"
    else:
        assert usuario["liberado"] is False, "Account status should remain 'not liberado'"
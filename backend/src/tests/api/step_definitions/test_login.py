import sys
import os
import pytest
import asyncio
from pytest_bdd import parsers, given, when, then, scenario
from src.api.login import authenticate_user
from src.api.cadastro import cadastrar_pf  # Use the registration function
from src.schemas.usuario import getDB as load_db, saveDB as save_db, User_Pessoa_Fisica  # Import necessary classes
from fastapi.exceptions import HTTPException

# Add the project root to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))

# Define the feature file path
FEATURE_FILE = "../features/login.feature"

# Fixture to reset the database before each test
@pytest.fixture(autouse=True)
def reset_database():
    """Reset the database before each test."""
    db = {"usuarios": []}
    save_db(db)

# Helper function to register a PF user using the `cadastrar_pf` function
async def register_test_user_pf(email: str, senha: str):
    test_user = User_Pessoa_Fisica(
        ativo=True,
        uf="PB",
        email=email,
        login="BruhPF",
        senha=senha,
        liberado=False,
        tipo_pessoa="fisica",
        cpf="123.123.312-23",
        nome="Bruno Carvalho",
        nascimento="12/12/2000"
    )
    await cadastrar_pf(test_user)

#Scenario: Successful login with correct credentials
@scenario(
    scenario_name="Successful login with correct credentials",
    feature_name=FEATURE_FILE
)
def test_successful_login():
    """Test successful login with correct credentials."""

@given(parsers.cfparse('que existe um usuário com login "{login}" e senha "{senha}"'))
def mock_user_in_database(login: str, senha: str):
    asyncio.run(register_test_user_pf("bcs6@cin.ufpe.br", senha))

@when(
    parsers.cfparse('o usuário tenta autenticar com login "{login}" e senha "{senha}"'),
    target_fixture="context"
)
def authenticate_user_with_credentials(context, login: str, senha: str):
    try:
        context["response"] = asyncio.run(authenticate_user(login, senha))
    except Exception as e:
        context["exception"] = e
    return context

@then(parsers.cfparse('a resposta deve conter a mensagem "{message}"'))
def check_response_message(context, message: str):
    if "exception" in context:
        assert False, f"Unexpected exception: {context['exception']}"
    else:
        assert context["response"]["message"] == message

@then("os dados do usuário devem ser retornados")
def check_user_data(context):
    assert "user" in context["response"], "User data not found in response"
    assert context["response"]["user"]["login"] == "BruhPF", "Incorrect user login in response"

# Scenario: Failed login with incorrect password
@scenario(
    scenario_name="Failed login with incorrect password",
    feature_name=FEATURE_FILE
)
def test_failed_login():
    """Test failed login with incorrect password."""

@given(parsers.cfparse('que existe um usuário com login "{login}" e senha "{senha}"'))
def mock_user_in_database_for_failed_login(login: str, senha: str):
    # Register the user using the `cadastrar_pf` function
    asyncio.run(register_test_user_pf("bcs6@cin.ufpe.br", senha))

@when(
    parsers.cfparse('o usuário tenta autenticar com login "{login}" e senha incorreta "{senha}"'),
    target_fixture="context"
)
def authenticate_user_with_wrong_password(context, login: str, senha: str):
    try:
        context["response"] = asyncio.run(authenticate_user(login, senha))
    except Exception as e:
        context["exception"] = e
    return context

@then(parsers.cfparse('a resposta deve conter o erro "{error_message}"'))
def check_error_message(context, error_message: str):
    # Ensure the exception is an HTTPException and validate its detail
    assert isinstance(context["exception"], HTTPException), "Expected an HTTPException"
    assert context["exception"].detail == error_message, f"Expected error '{error_message}', but got '{context['exception'].detail}'"
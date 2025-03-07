import sys
import os
import pytest
import asyncio
from pytest_bdd import parsers, given, when, then, scenario
from src.api.cadastro import cadastrar_pf, add_usuario_pj  # Use the registration functions
from src.schemas.usuario import getDB as load_db, saveDB as save_db, User_Pessoa_Fisica, User_Pessoa_Juridica  # Import necessary classes
from fastapi.exceptions import HTTPException

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))

FEATURE_FILE = "../features/cadastro.feature"

#Fixture p/ resetar o banco a cada teste
@pytest.fixture(autouse=True)
def reset_database():
    """Reset the database before and after each test."""
    db = {"usuarios": []}
    save_db(db)
    yield  # Test runs here
    db = {"usuarios": []}
    save_db(db)

#função auxiliar para add novo user
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
    return await cadastrar_pf(test_user)

#helper func para input de user pj
async def register_test_user_pj(email: str, senha: str):
    test_user = User_Pessoa_Juridica(
        ativo=True,
        uf="PB",
        email=email,
        login="BruhPJ",
        senha=senha,
        liberado=False,
        tipo_pessoa="juridica",
        cnpj="12.345.678/0001-90",
        razao_social="Empresa Teste Ltda",
        nome_fantasia="Empresa Teste"
    )
    return await add_usuario_pj(test_user)

#Scenario: Register a PF User
@scenario(
    scenario_name="Test Register PF User",
    feature_name=FEATURE_FILE
)
def test_register_pf_user():
    """Test successful registration of a PF user."""

@given(parsers.cfparse('não existe um usuário com email "{email}"'))
def ensure_no_user_with_email(email: str):
    db = load_db()
    assert not any(u['email'] == email for u in db['usuarios'])

@when(parsers.cfparse('registro um usuário PF com email "{email}" e senha válida "{senha}"'), target_fixture="context")
def register_valid_pf_user(context, email: str, senha: str):
    try:
        context["response"] = asyncio.run(register_test_user_pf(email, senha))
    except Exception as e:
        context["exception"] = e
    return context

@then(parsers.cfparse('a resposta deve conter a mensagem "{message}"'))
def check_response_message(context, message: str):
    if "exception" in context:
        assert False, f"Unexpected exception: {context['exception']}"
    else:
        assert context["response"]["message"] == message

#Scenario: Register a PJ User
@scenario(
    scenario_name="Test Register PJ User",
    feature_name=FEATURE_FILE
)
def test_register_pj_user():
    """Test successful registration of a PJ user."""

@when(parsers.cfparse('registro um usuário PJ com email "{email}" e senha válida "{senha}"'), target_fixture="context")
def register_valid_pj_user(context, email: str, senha: str):
    try:
        context["response"] = asyncio.run(register_test_user_pj(email, senha))
    except Exception as e:
        context["exception"] = e
    return context

#Scenario: Attempt to Register a PF User with Existing Email
@scenario(
    scenario_name="Test Register Existing Email",
    feature_name=FEATURE_FILE
)
def test_register_existing_email():
    """Test failed registration of a PF user with an existing email."""

@given(parsers.cfparse('um usuário PF com email "{email}" já está registrado'))
def register_existing_pf_user(email: str):
    asyncio.run(register_test_user_pf(email, "ValidPwd123"))

@when(parsers.cfparse('tento registrar outro usuário PF com o mesmo email "{email}"'), target_fixture="context")
def register_duplicate_email(context, email: str):
    try:
        context["response"] = asyncio.run(register_test_user_pf(email, "ValidPwd123"))
    except Exception as e:
        context["exception"] = e
    return context

@then(parsers.cfparse('a resposta deve conter o erro "{error_message}"'))
def check_error_message(context, error_message: str):
    assert isinstance(context["exception"], HTTPException), "Expected an HTTPException"
    assert context["exception"].detail == error_message, f"Expected error '{error_message}', but got '{context['exception'].detail}'"

#Scenario: Attempt to Register a PF User with Invalid Password
@scenario(
    scenario_name="Test Register Invalid Password",
    feature_name=FEATURE_FILE
)
def test_register_invalid_password():
    """Test failed registration of a PF user with an invalid password."""

@when(parsers.cfparse('tento registrar um usuário PF com email "{email}" e senha inválida "{senha}"'), target_fixture="context")
def register_invalid_password(context, email: str, senha: str):
    try:
        context["response"] = asyncio.run(register_test_user_pf(email, senha))
    except Exception as e:
        context["exception"] = e
    return context
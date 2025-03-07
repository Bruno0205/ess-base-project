import os
import sys
import pytest
from pytest_bdd import scenario, given, when, then, parsers
from fastapi.testclient import TestClient
from src.api.estatisticas import app
from src.service.impl.estatisticas_service import EstatisticasService

# Adicionar o caminho correto ao sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))

# Definir o caminho do arquivo .feature
FEATURE_FILE = "../features/estatisticas.feature"

# Inicializar o cliente de teste
client = TestClient(app)

# Contexto global para armazenar informações entre steps
context = {}

# Cenário 1: Visualizar estatísticas de um imóvel
@scenario(FEATURE_FILE, "Vizualizar estatísticas de um imóvel")
def test_visualizar_estatisticas():
    """Teste para visualizar estatísticas de um imóvel."""

@given('que o usuário está logado como "anfitrião"')
def given_user_logged_in():
    pass

@given(parsers.cfparse('e que há várias reservas efetuadas no imóvel "{imovel}" do usuário anfitrião no banco de dados'))
def given_reservas(imovel: str):
    pass

@given('que o usuário está na página de estatística')
def given_user_on_stats_page():
    pass

@when(parsers.cfparse('ele seleciona o imóvel "{imovel}"'))
def when_select_imovel(imovel: str):
    context['imovel'] = imovel

@when('clica no botão ver estatísticas')
def when_click_view_stats():
    context['response'] = EstatisticasService.get_estatisticas(context['imovel'])

@then(parsers.cfparse('o sistema exibe um histórico de reservas do imóvel "{imovel}"'))
def then_check_stats_displayed(imovel: str):
    response = context['response']
    assert response.status_code == 200
    assert response.data['imovel'] == imovel
    assert isinstance(response.data['reservas'], list)

# Cenário 2: Visualizar estatísticas segmentadas de um imóvel
@scenario(FEATURE_FILE, "Vizualizar estatísticas segmentadas de um imóvel")
def test_visualizar_estatisticas_segmentadas():
    """Teste para visualizar estatísticas segmentadas de um imóvel."""

@when(parsers.cfparse('clica na opção de "{temporada}"'))
def when_click_temporada(temporada: str):
    context['temporada'] = temporada
    context['response'] = EstatisticasService.get_estatisticas_segmentadas(
        context['imovel'], context['temporada']
    )


@given(parsers.cfparse('que há várias reservas efetuadas no imóvel "{imovel}", onde {quantidade_carnaval:d} foram na temporada de "Carnaval" e {quantidade_fim_ano:d} na temporada "Fim de ano" do usuário anfitrião no banco de dados'))
def given_reservas_segmentadas(imovel: str, quantidade_carnaval: int, quantidade_fim_ano: int):
    # Simule a existência de reservas segmentadas no banco de dados
    context['reservas'] = {
        "imovel": imovel,
        "temporadas": {
            "Carnaval": quantidade_carnaval,
            "Fim de ano": quantidade_fim_ano
        }
    }


@then(parsers.cfparse('o sistema exibe um histórico de reservas do imóvel "{imovel}" segmentado pelo período de "{temporada}"'))
def then_check_segmented_stats(imovel: str, temporada: str):
    response = context['response']
    assert response.status_code == 200
    assert response.data['imovel'] == imovel
    assert response.data['temporada'] == temporada
    assert isinstance(response.data['reservas'], list)

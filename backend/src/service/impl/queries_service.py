import json
import os
from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.query_service_meta import QueryServiceMeta

# Caminho para o arquivo JSON de reservas
DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'db', 'db_reservas.json')

def load_data():

    with open(DATA_FILE_PATH, 'r') as file:
        data = json.load(file)
    # Converter o JSON legado para o formato correto, se necessário
    data = convert_legacy_data(data)
    if not isinstance(data, dict) or "reservas" not in data:
        raise ValueError("O arquivo JSON deve conter uma chave 'reservas' com uma lista de reservas.")
    reservas = data["reservas"]
    if not isinstance(reservas, list):
        raise ValueError("A chave 'reservas' deve conter uma lista de dicionários.")
    for item in reservas:
        if not isinstance(item, dict):
            raise ValueError(f"Item inválido encontrado na lista de reservas: {item}")
    return reservas


def save_data(data):
    """
    Salva os dados no arquivo JSON.
    """
    with open(DATA_FILE_PATH, 'w') as file:
        json.dump({"reservas": data}, file, indent=4)


def convert_legacy_data(data):
    if isinstance(data, list):  
        reservas = []
        for item in data:
            reserva = {
                "ativo": item.get("ativo", True),
                "titulo": item.get("titulo", ""),
                "descricao": item.get("descricao", ""),
                "imagens": [item["imagens"]] if isinstance(item.get("imagens"), str) else item.get("imagens", []),
                "petfriendly": item.get("petfriendly", False),
                "endereco": item.get("endereco", ""),
                "tipo": item.get("tipo", ""),
                "disponibilidade": parse_disponibilidade(item.get("disponibilidade", "")),
                "alugado": [],
                "preco": item.get("preco", 0),
                "usuario": item.get("usuario", ""),
                "alugado_por": [],
                "avalMedia": item.get("avalMedia", 0),
                "qntdAlugado": item.get("qntdAlugado", 0),
                "destacado": item.get("destacado", False),
                "temporada": item.get("temporada", "")
            }
            reservas.append(reserva)
        return {"reservas": reservas}
    return data


def parse_disponibilidade(disponibilidade_str):
    if not disponibilidade_str or " a " not in disponibilidade_str:
        return {"inicio": "", "fim": ""}
    inicio, fim = disponibilidade_str.split(" a ")
    return {"inicio": inicio.strip(), "fim": fim.strip()}


class QueriesService(QueryServiceMeta):
    @staticmethod
    def get_queries(filters: dict) -> HttpResponseModel:
        """Get queries based on filters method implementation"""
        data = load_data()
        queries = [
            item for item in data
            if isinstance(item, dict) and all(
                item.get(key) == value for key, value in filters.items()
            )
        ]

        if not queries:
            return HttpResponseModel(
                message=HTTPResponses.QUERIES_NOT_FOUND().message,
                status_code=HTTPResponses.QUERIES_NOT_FOUND().status_code,
            )
        return HttpResponseModel(
            message=HTTPResponses.QUERIES_FOUND().message,
            status_code=HTTPResponses.QUERIES_FOUND().status_code,
            data=queries,
        )
import json
import os
from threading import Lock

class JSONDatabase:
    def __init__(self, file_name: str):
        self.file_path = os.path.join("src", "db", "data", file_name)
        self.lock = Lock()

        # Cria o arquivo JSON se não existir
        if not os.path.exists(self.file_path):
            with open(self.file_path, "w") as f:
                json.dump([], f)

    def get_all_items(self) -> list:
        """
        Recupera todos os itens do arquivo JSON.

        Retorna:
        - Uma lista contendo os itens armazenados.
        """
        with self.lock:
            with open(self.file_path, "r") as f:
                return json.load(f)

    def add_item(self, item: dict):
        """
        Adiciona um item ao arquivo JSON.

        Parâmetros:
        - item: O dicionário representando o item a ser adicionado.
        """
        with self.lock:
            items = self.get_all_items()
            items.append(item)
            with open(self.file_path, "w") as f:
                json.dump(items, f, indent=4)

    def get_item_by_id(self, item_id: str) -> dict:
        """
        Recupera um item pelo ID.

        Parâmetros:
        - item_id: O ID do item a ser recuperado.

        Retorna:
        - O item correspondente ou `None` se não encontrado.
        """
        items = self.get_all_items()
        for item in items:
            if item.get("id") == item_id:
                return item
        return None

    def update_item(self, item_id: str, updated_item: dict) -> bool:
        """
        Atualiza um item no arquivo JSON.

        Parâmetros:
        - item_id: O ID do item a ser atualizado.
        - updated_item: O dicionário com os dados atualizados.

        Retorna:
        - `True` se o item foi atualizado, `False` caso contrário.
        """
        with self.lock:
            items = self.get_all_items()
            for i, item in enumerate(items):
                if item.get("id") == item_id:
                    items[i] = {**item, **updated_item}  # Atualiza com os novos dados
                    with open(self.file_path, "w") as f:
                        json.dump(items, f, indent=4)
                    return True
            return False

    def delete_item(self, item_id: str) -> bool:
        """
        Remove um item do arquivo JSON.

        Parâmetros:
        - item_id: O ID do item a ser removido.

        Retorna:
        - `True` se o item foi removido, `False` caso contrário.
        """
        with self.lock:
            items = self.get_all_items()
            new_items = [item for item in items if item.get("id") != item_id]
            if len(items) != len(new_items):
                with open(self.file_path, "w") as f:
                    json.dump(new_items, f, indent=4)
                return True
            return False

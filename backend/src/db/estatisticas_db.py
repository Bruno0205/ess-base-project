class EstatisticasDb:
    # Banco de dados simulado
    reservas = [
        {"imovel": "Casa Aconchegante", "temporada": "Carnaval", "preco": 200},
        {"imovel": "Casa Aconchegante", "temporada": "Fim de ano", "preco": 300},
        {"imovel": "Casa Aconchegante", "temporada": "Carnaval", "preco": 250},
        {"imovel": "Casa Aconchegante", "temporada": "Fim de ano", "preco": 350},
    ]
    
    @staticmethod
    def buscar_reservas(imovel):
        # Retorna as reservas filtradas pelo nome do imóvel
        return [reserva for reserva in EstatisticasDb.reservas if reserva['imovel'] == imovel]

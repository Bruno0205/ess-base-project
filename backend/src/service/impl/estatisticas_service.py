from src.schemas.response import HttpResponseModel
from src.db.estatisticas_db import EstatisticasDb  # Alteração para o novo arquivo

class EstatisticasService:

    @staticmethod
    def get_estatisticas(imovel: str) -> HttpResponseModel:
        # Agora usando o novo arquivo de banco de dados
        reservas = EstatisticasDb.buscar_reservas(imovel)
        
        if not reservas:
            return HttpResponseModel(
                message="No reservations found",
                status_code=404,
            )

        return HttpResponseModel(
            message="Reservations found",
            status_code=200,
            data={"imovel": imovel, "reservas": reservas}
        )

    @staticmethod
    def get_estatisticas_segmentadas(imovel: str, temporada: str) -> HttpResponseModel:
        # Filtro de temporada usando o novo arquivo de banco de dados
        reservas_segmentadas = [reserva for reserva in EstatisticasDb.buscar_reservas(imovel) if reserva['temporada'] == temporada]
        
        if not reservas_segmentadas:
            return HttpResponseModel(
                message="No segmented reservations found",
                status_code=404,
            )

        return HttpResponseModel(
            message="Segmented reservations found",
            status_code=200,
            data={"imovel": imovel, "temporada": temporada, "reservas": reservas_segmentadas}
        )

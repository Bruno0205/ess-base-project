from pydantic import BaseModel
from typing import Optional
from enum import Enum

# Enum com os tipos de reserva
class TipoReserva(str,Enum):
    QUARTO = "Quarto"
    CASA = "Casa"
    APARTAMENTO = "Apartamento"
    SALAO = "Salão"

# Modelo de reserva
class Reserva(BaseModel):
    ativo: bool = True
    titulo: str
    descricao: str
    imagens: str
    petfriendly: bool
    endereco: str
    tipo: TipoReserva
    disponibilidade: str
    preco: int = 0
    usuario: str
    avalMedia: float = 0
    qtdAlugado: int = 0
    destacado: bool = False
    temporada: Optional[str] = None 

# Modelo base para usuário
class DadosComuns(BaseModel):
    ativo: bool = True
    uf: Optional[str] = None
    email: str
    login: str
    senha: str
    liberado: bool = False
    codigo_verificacao: Optional[str] = None
    codigo_valido_ate: Optional[str] = None
    reset_token: Optional[str] = None
    reset_token_expira: Optional[str] = None

# Modelos específicos para cada tipo de usuário
class UserPessoaFisica(DadosComuns):
    tipo_pessoa: str = "fisica"
    cpf: str
    nome: str
    nascimento: str

class UserPessoaJuridica(DadosComuns):
    tipo_pessoa: str = "juridica"
    cnpj: str
    razao_social: str

class UserAdmin(DadosComuns):
    tipo_pessoa: str = "admin"
    nome: str

class UserBase(DadosComuns):
    tipo_pessoa: str 
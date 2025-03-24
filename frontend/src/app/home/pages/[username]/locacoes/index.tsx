// frontend/src/app/home/pages/[username]/minhasLocacoes/index.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./index.module.css";

//Definição do tipo para as reservas
interface Reserva {
  id: number;
  titulo: string;
  disponibilidade: {
    inicio: string;
    fim: string;
  };
  preco: number;
  petfriendly: boolean;
}

const MinhasLocacoes = () => {
  const { username } = useParams(); //Captura o parâmetro :username da URL
  const [reservas, setReservas] = useState<Reserva[]>([]); //Estado com tipo explícito
  const navigate = useNavigate(); // Initialize useNavigate

  //Função para buscar as reservas do usuário no backend
  const fetchReservas = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/cadastro-reservas/reservas/${username}`); //Usa o username dinâmico
      if (!response.ok) {
        throw new Error("Erro ao carregar as reservas");
      }

      const data: Reserva[] = await response.json(); //Define o tipo dos dados recebidos
      setReservas(data);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
    }
  };

  //Executa a busca das reservas quando o componente é montado
  useEffect(() => {
    fetchReservas();
  }, [username]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/*Botão Voltar com o username dinâmico*/}
        <Link to={`/usuario/${username}`} className={styles.backButton} data-cy="voltar-button">
          Voltar
        </Link>
        <h1 className={styles.title}>Minhas Locações</h1>
      </div>

      <div className={styles.listContainer}>
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <div key={reserva.id} className={styles.card} data-cy={`reserva-card-${reserva.id}`}>
              <h3>{reserva.titulo}</h3>
              <p>
                <strong>Período:</strong>{" "}
                {new Date(reserva.disponibilidade.inicio).toLocaleDateString()} -{" "}
                {new Date(reserva.disponibilidade.fim).toLocaleDateString()}
              </p>
              <p>
                <strong>Preço:</strong> R$ {reserva.preco.toFixed(2)}
              </p>
              <p>
                <strong>Aceita Pets:</strong> {reserva.petfriendly ? "Sim" : "Não"}
              </p>
              <button
                className={styles.button}
                data-cy={`detalhes-button-${reserva.id}`}
                onClick={() => navigate(`/usuario/${username}/reservas/${reserva.titulo.toLowerCase().replace(/\s+/g, "-")}`)} // Navigate to the details page
              >
                Ver Detalhes
              </button>
            </div>
          ))
        ) : (
          <p data-cy="sem-locações">Você ainda não possui locações.</p>
        )}
      </div>

      {/*Botão flutuante redondo com o símbolo de +*/}
      <Link
        to={`/usuario/${username}/reservas/addReserva`}
        className={styles.floatingButton}
        data-cy="add-reserva-button"
      >
        +
      </Link>
    </div>
  );
};

export default MinhasLocacoes;

// frontend/src/app/home/pages/[username]/index.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./index.module.css";

const ReservaPage = () => {
  const { username, reservaName } = useParams();
  const navigate = useNavigate();
  interface Reserva {
    titulo: string;
    descricao: string;
    // Add other properties of Reserva if needed
  }

  const [reserva, setReserva] = useState<Reserva | null>(null);

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/queries/reservas/${reservaName}`);
        setReserva(response.data);
      } catch (error) {
        console.error("Erro ao buscar reserva:", error);
      }
    };

    fetchReserva();
  }, [reservaName]);

  if (!reserva) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Reserva: {reserva.titulo}</h1>
        <p className={styles.description}>{reserva.descricao}</p>
        <div className={styles.buttonsContainer}>
          <button onClick={() => navigate(`/`)} className={styles.button}>Voltar para Início</button>
          <button onClick={() => navigate(`/usuario/${username}/reservas/${reservaName}/avaliacoes`)} className={styles.button}>Mostrar Avaliações</button>
        </div>
      </div>
    </div>
  );
};

export default ReservaPage;

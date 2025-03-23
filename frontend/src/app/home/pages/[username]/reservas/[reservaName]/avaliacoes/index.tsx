import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./index.module.css";
import StarRating from "../../../../../../shared/components/StarRating/StarRating";

interface Avaliacao {
  id: number;
  usuario: string;
  nota: number;
  comentario: string;
}

const AvaliacoesPage = () => {
  const { reservaName } = useParams();
  const navigate = useNavigate();
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [reservaTitulo, setReservaTitulo] = useState<string>("");

  useEffect(() => {
    const fetchReservaTitulo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/queries/reservas/${reservaName}`);
        setReservaTitulo(response.data.titulo);
      } catch (error) {
        console.error("Erro ao buscar título da reserva:", error);
      }
    };

    const fetchAvaliacoes = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/queries/avaliacoes/${reservaName}`);
        setAvaliacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      }
    };

    fetchReservaTitulo();
    fetchAvaliacoes();
  }, [reservaName]);

  return (
    <div className={styles.container}>
      <h1>Avaliações para {reservaTitulo}</h1>
      <div className={styles.avaliacoesContainer}>
        {avaliacoes.length > 0 ? (
          avaliacoes.map((avaliacao) => (
            <div key={avaliacao.id} className={styles.avaliacao}>
              <p><strong>Usuário:</strong> {avaliacao.usuario}</p>
              <StarRating rating={avaliacao.nota} />
              <p><strong>Comentário:</strong> {avaliacao.comentario}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma avaliação encontrada para essa reserva, ou reserva inexistente.</p>
        )}
      </div>
      <button onClick={() => navigate(-1)} className={styles.button}>Voltar</button>
    </div>
  );
};

export default AvaliacoesPage;
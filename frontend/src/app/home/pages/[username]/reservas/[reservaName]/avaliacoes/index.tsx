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
  endereco: string;
  oculto: boolean;
}

const AvaliacoesPage = () => {
  const { username, reservaName } = useParams();
  const navigate = useNavigate();
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [reservaTitulo, setReservaTitulo] = useState<string>("");
  const [newAvaliacao, setNewAvaliacao] = useState<Avaliacao>({
    id: 0,
    usuario: "",
    nota: 0,
    comentario: "",
    endereco: "",
    oculto: false
  });
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const fetchReservaTitulo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/queries/reservas/${reservaName}`);
        setReservaTitulo(response.data.titulo);
        setNewAvaliacao((prev) => ({ ...prev, endereco: response.data.endereco }));
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAvaliacao({ ...newAvaliacao, [name]: value });
  };

  const handleRatingChange = (rating: number) => {
    setNewAvaliacao({ ...newAvaliacao, nota: rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8000/reviews/avaliacoes/add`, newAvaliacao);
      setAvaliacoes([...avaliacoes, newAvaliacao]);
      setNewAvaliacao({ id: 0, usuario: "", nota: 0, comentario: "", endereco: "", oculto: false });
      setSuccessMessage("Avaliação adicionada com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error("Erro ao adicionar avaliação:", error);
    }
  };

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
          <p>Nenhuma avaliação encontrada para essa reserva.</p>
        )}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Adicionar Avaliação</h2>
        <input
          type="text"
          name="usuario"
          placeholder="Seu nome"
          value={newAvaliacao.usuario}
          onChange={handleInputChange}
          required
        />
        <StarRating rating={newAvaliacao.nota} onRatingChange={handleRatingChange} />
        <textarea
          name="comentario"
          placeholder="Seu comentário"
          value={newAvaliacao.comentario}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className={styles.button}>Enviar Avaliação</button>
      </form>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      <button onClick={() => navigate(`/usuario/${username}/reservas/${reservaName}`)} className={styles.button}>Voltar</button>
    </div>
  );
};

export default AvaliacoesPage;
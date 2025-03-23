import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResultCard.module.css";

interface ResultCardProps {
  title: string;
  description: string;
  state: string;
  reservationType: string;
  price: string;
  petFriendly: boolean;
  highlighted: boolean;
  imageUrl: string;
  username: string; // Adicionado
  reservaName: string; // Adicionado
}

const ResultCard: React.FC<ResultCardProps> = ({
  title,
  description,
  state,
  reservationType,
  price,
  petFriendly,
  highlighted,
  imageUrl,
  username, // Adicionado
  reservaName, // Adicionado
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/usuario/${username}/reservas/${reservaName}`);
  };

  return (
    <div className={styles.resultItem}>
      <div className={styles.resultContent}>
        <h2 className={styles.resultTitle}>{title}</h2>
        <p className={styles.resultDescription}>{description}</p>
        <div className={styles.resultDetailContainer}>
          <p className={styles.resultDetail}><strong>Estado:</strong> {state}</p>
          <p className={styles.resultDetail}><strong>Tipo de Reserva:</strong> {reservationType}</p>
          <p className={styles.resultDetail}><strong>Preço:</strong> {price}</p>
          <p className={styles.resultDetail}><strong>Pet-Friendly:</strong> {petFriendly ? "Sim" : "Não"}</p>
          <p className={styles.resultDetail}><strong>Destacado:</strong> {highlighted ? "Sim" : "Não"}</p>
        </div>
        <button onClick={handleViewDetails} className={styles.button}>
          Ver Detalhes
        </button>
      </div>
      <div className={styles.resultImageContainer}>
        <img src={imageUrl} alt="Imagem da Reserva" className={styles.resultImage} />
      </div>
    </div>
  );
};

export default ResultCard;
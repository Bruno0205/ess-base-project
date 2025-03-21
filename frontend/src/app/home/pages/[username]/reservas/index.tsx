// frontend/src/app/home/pages/[username]/reservas/index.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.css";

const Reservas = () => {
  const { username } = useParams(); // Captura o parâmetro :username da URL
  const reservas = [
    { id: 1, data: "20/10/2023", status: "Ativa" },
    { id: 2, data: "25/10/2023", status: "Cancelada" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* Botão Voltar com o username dinâmico */}
        <Link to={`/usuario/${username}`} className={styles.backButton}>
          Voltar
        </Link>
        <h1 className={styles.title}>Minhas Reservas</h1>
      </div>
      <div className={styles.listContainer}>
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <div key={reserva.id} className={styles.listItem}>
              <div>
                <p>Data: {reserva.data}</p>
                <p>Status: {reserva.status}</p>
              </div>
              <button className={styles.button}>
                {reserva.status === "Ativa" ? "Cancelar" : "Reativar"}
              </button>
            </div>
          ))
        ) : (
          <p>Você ainda não possui reservas.</p>
        )}
      </div>
    </div>
  );
};

export default Reservas;
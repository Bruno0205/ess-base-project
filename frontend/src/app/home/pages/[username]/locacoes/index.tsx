// frontend/src/app/home/pages/[username]/locacoes/index.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.css";

const MinhasLocacoes = () => {
  const { username } = useParams(); // Captura o parâmetro :username da URL
  const locacoes = [
    { id: 1, periodo: "01/11/2023 - 10/11/2023" },
    { id: 2, periodo: "15/11/2023 - 25/11/2023" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* Botão Voltar com o username dinâmico */}
        <Link to={`/usuario/${username}`} className={styles.backButton}>
          Voltar
        </Link>
        <h1 className={styles.title}>Minhas Locações</h1>
      </div>
      <div className={styles.listContainer}>
        {locacoes.length > 0 ? (
          locacoes.map((locacao) => (
            <div key={locacao.id} className={styles.listItem}>
              <p>{locacao.periodo}</p>
              <button className={styles.button}>Ver Detalhes</button>
            </div>
          ))
        ) : (
          <p>Você ainda não possui locações.</p>
        )}
      </div>
    </div>
  );
};

export default MinhasLocacoes;
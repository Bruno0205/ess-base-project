// frontend/src/app/home/pages/[username]/reservas/index.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.css";

const Reservas = () => {
  const { username } = useParams(); //Captura o parâmetro :username da URL

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/*Botão Voltar com o username dinâmico*/}
        <Link to={`/usuario/${username}`} className={styles.backButton}>
          Voltar
        </Link>
        <h1 className={styles.title}>Minhas Reservas</h1>
      </div>

      <div className={styles.listContainer}>
        {/*Mensagem indicando que esta seção será desenvolvida no futuro*/}
        <p className={styles.placeholder}>
          Esta seção está reservada para o futuro desenvolvimento de funções para gerenciar suas reservas.
        </p>
      </div>
    </div>
  );
};

export default Reservas;

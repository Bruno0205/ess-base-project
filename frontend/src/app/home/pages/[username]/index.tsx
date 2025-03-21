// frontend/src/app/home/pages/[username]/index.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.css";

const UserPage = () => {
  const { username } = useParams(); // Captura o parâmetro :username da URL
  const firstName = username?.split(" ")[0]; // Extrai o primeiro nome do username

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo, {firstName}!</h1>
      <div className={styles.buttonsContainer}>
        <Link to={`/usuario/${username}/reservas`}>
          <button className={styles.button}>Minhas Reservas</button>
        </Link>
        <Link to={`/usuario/${username}/locacoes`}>
          <button className={styles.button}>Minhas Locações</button>
        </Link>
      </div>
    </div>
  );
};

export default UserPage;
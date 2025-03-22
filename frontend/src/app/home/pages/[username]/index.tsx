// frontend/src/app/home/pages/[username]/index.tsx
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const UserPage = () => {
  const { username } = useParams(); // Captura o parâmetro :username da URL
  const firstName = username?.split(" ")[0]; // Extrai o primeiro nome do username
  const navigate = useNavigate();

  // Função para lidar com o logout
  const handleLogout = () => {
    // Aqui você pode limpar tokens, estados globais ou cookies, se necessário
    console.log("Usuário deslogado");

    // Redireciona para a tela de login
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo, {firstName}!</h1>
      <div className={styles.buttonsContainer}>
        {/* Botão para Minhas Reservas */}
        <Link to={`/usuario/${username}/reservas`}>
          <button className={styles.button}>Minhas Reservas</button>
        </Link>

        {/* Botão para Minhas Locações */}
        <Link to={`/usuario/${username}/locacoes`}>
          <button className={styles.button}>Minhas Locações</button>
        </Link>

        {/* Botão para Verificação de Conta */}
        <Link to={`/usuario/${username}/liberarConta`}>
          <button className={styles.button}>Verificar Conta</button>
        </Link>

        {/* Botão de Sair */}
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default UserPage;
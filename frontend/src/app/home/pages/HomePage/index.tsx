import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import logo from '../../../Images/logo.png'; 

const HomePage = () => {
  const navigate = useNavigate(); //Hook para navegação

  const handleSearch = () => {
    navigate(`/search`); //Navega para a página de pesquisa
  };

  return (
    <div className={styles.container}>
      {/* Logo do site */}
      {/* Logo do site - substituindo o SVG por uma imagem */}
      <div className={styles.logo}>
        <img
          src={logo} // Usando a imagem importada
          alt="Logo do Nido"
          width="100"
          height="100"
          style={{ mixBlendMode: "normal" }}
        />
      </div>


      {/* Título e Descrição */}
      <h1 className={styles.title}>Bem-vindo ao nido</h1>
      <p className={styles.description}>
        Um lar onde quer que tenhas que estar.
      </p>

      {/* Faixa com Fundo (SVG) */}
      <div className={styles.backgroundStrip}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className={styles.stripSvg}
        >
          <path
            fill="#ff5a5f"
            fillOpacity="1"
            d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,133.3C672,128,768,160,864,165.3C960,171,1056,149,1152,128C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <p className={styles.stripText}>
          Encontre o local perfeito para sentir aconchego e criar boas lembranças.
        </p>
      </div>

      {/* Botão de Busca */}
      <button onClick={handleSearch} className={`${styles.button} ${styles.wideButton}`}>
        Buscar por Reservas
      </button>

      {/* Botões de Navegação */}
      <div className={styles.buttonsContainer}>
        <a href="/login" className={styles.button}>
          Login
        </a>
        <a href="/register" className={styles.button}>
          Cadastro
        </a>
      </div>
    </div>
  );
};

export default HomePage;

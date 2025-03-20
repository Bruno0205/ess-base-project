// src/app/home/pages/Home/index.tsx
import React from "react";
import styles from "./index.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Logo (SVG) */}
      <div className={styles.logo}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0,0,256,256"
          style={{ mixBlendMode: "normal" }} // Corrigido para usar objeto no estilo
        >
          <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
            <g transform="scale(0.5,0.5)">
              <path d="M7.9,256c0,-137 111.1,-248.1 248.1,-248.1c137,0 248.1,111.1 248.1,248.1c0,137 -111.1,248.1 -248.1,248.1c-137,0 -248.1,-111.1 -248.1,-248.1z" fill="#eb808c"></path>
              <path d="M408.1,206.8l-150.1,-74.9c-1.3,-0.6 -2.7,-0.6 -4,0l-150.2,74.9c-1.7,0.8 -2.7,2.4 -2.7,4.3v29.6c0,1.6 0.8,3.1 2.2,4c1.4,0.9 3.1,1 4.5,0.3l148.2,-74l148.1,74c0.6,0.3 1.3,0.5 2,0.5c0.9,0 1.8,-0.2 2.5,-0.7c1.4,-0.9 2.2,-2.4 2.2,-4v-29.8c0,-1.8 -1,-3.5 -2.7,-4.2z" fill="#ffffff"></path>
              <path d="M380.5,245.8l-124.5,-62l-124.5,62v115h69v-88.2h47.5v88.2h132.5z" fill="#ffffff"></path>
              <path d="M263.7,272.6h32v32h-32z" fill="#eb808c"></path>
            </g>
          </g>
        </svg>
      </div>

      {/* Título e Descrição */}
      <h1 className={styles.title}>Bem-vindo ao Nosso Sistema de Hotelaria</h1>
      <p className={styles.description}>
        Alugue seu próximo lar com facilidade e conforto.
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
          Encontre o lugar perfeito para chamar de lar!
        </p>
      </div>

      {/* Barra de Pesquisa */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Encontre Reserva"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.button}>
          Buscar
        </button>
      </div>
      {/* Filters */}
      <div className={styles.filtersContainer}>
      <select className={styles.select}>
          <option value="">Estado</option>
          <option value="AC">Acre</option>
          <option value="AL">Alagoas</option>
          <option value="AP">Amapá</option>
          <option value="AM">Amazonas</option>
          <option value="BA">Bahia</option>
          <option value="CE">Ceará</option>
          <option value="DF">Distrito Federal</option>
          <option value="ES">Espírito Santo</option>
          <option value="GO">Goiás</option>
          <option value="MA">Maranhão</option>
          <option value="MT">Mato Grosso</option>
          <option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option>
          <option value="PA">Pará</option>
          <option value="PB">Paraíba</option>
          <option value="PR">Paraná</option>
          <option value="PE">Pernambuco</option>
          <option value="PI">Piauí</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="RN">Rio Grande do Norte</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="RO">Rondônia</option>
          <option value="RR">Roraima</option>
          <option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option>
          <option value="SE">Sergipe</option>
          <option value="TO">Tocantins</option>
        </select>
        <select className={styles.select}>
          <option value="">Tipo de Reserva</option>
          <option value="AC">Qaurto</option>
          <option value="AL">Casa</option>
          <option value="AP">Apartamento</option>
          <option value="AM">Salão</option>
        </select>
        <input
          type="text"
          placeholder="Preço Máximo"
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Preço Minimo"
          className={styles.input}
        />
        <input
          type="checkbox"
          id="petFriendly"
          className={styles.checkbox}
        />
        <label htmlFor="petFriendly" className={styles.checkboxLabel}>
          Pet-friendly
        </label>
        <input
          type="checkbox"
          id="destacado"
          className={styles.checkbox}
        />
        <label htmlFor="destacado" className={styles.checkboxLabel}>
          Destacado
        </label>
      </div>


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
// src/app/home/pages/Login/index.tsx
import React from "react";
import styles from "./index.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/path/to/logo.png" alt="Logo" className={styles.logo} />
      </div>
      <form className={styles.form}>
        <h1 className={styles.title}>Faça seu Login</h1>
        <input
          type="login"
          placeholder="Login"
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Entrar
        </button>
        <p className={styles.link}>
          Não tem conta? <a href="/register">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
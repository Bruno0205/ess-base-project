// frontend/src/app/home/pages/Login/index.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./index.module.css";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const { login: authLogin } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = `http://localhost:8000/login/auth?login=${encodeURIComponent(login)}&senha=${encodeURIComponent(senha)}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Login ou senha incorretos");
      }

      const data = await response.json();
      const user = data.user;

      // Salva o usuário no contexto
      authLogin(user);

      // Redireciona para a página do usuário
      navigate(`/usuario/${encodeURIComponent(user.login)}`);
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Login</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
              Login:
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className={styles.input}
                required
                data-cy="Login" // Adicionado atributo data-cy
              />
            </label>
            <label className={styles.label}>
              Senha:
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={styles.input}
                required
                data-cy="Senha" // Adicionado atributo data-cy
              />
            </label>
            <button type="submit" className={styles.button} data-cy="Entrar">
              Entrar
            </button>
            <p className={styles.link}>
              Esqueceu sua senha?{" "}
              <a href="/mudar-senha" className={styles.resetLink}>
                Clique aqui
              </a>
            </p>

            {/* Botão de cadastro */}
            <p className={styles.link}>
              Você ainda não tem cadastro?{" "}
              <a href="/register" className={styles.resetLink}>
                Clique aqui.
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export default LoginPage;
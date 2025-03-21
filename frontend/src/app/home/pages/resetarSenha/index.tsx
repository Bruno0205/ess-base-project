// frontend/src/app/home/pages/ResetarSenha/index.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";

const ResetarSenha = () => {
  const [token, setToken] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = "http://127.0.0.1:8000/login/resetar-senha";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, nova_senha: novaSenha }),
      });

      if (!response.ok) {
        throw new Error("Erro ao resetar senha");
      }

      alert("Senha alterada com sucesso!");
      navigate("/login"); // Redireciona para a página de login
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Redefinir Senha</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Token:
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className={styles.input}
              required
            />
          </label>
          <label className={styles.label}>
            Nova Senha:
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className={styles.input}
              required
            />
          </label>
          <button type="submit" className={styles.button}>
            Alterar Senha
          </button>
        </form>
      </div>
    </div>
  );
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export default ResetarSenha;
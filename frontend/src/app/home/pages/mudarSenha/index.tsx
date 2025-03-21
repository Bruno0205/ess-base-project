// frontend/src/app/home/pages/MudarSenha/index.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const MudarSenha = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = `http://127.0.0.1:8000/login/solicitar-reset-senha?email=${encodeURIComponent(email)}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erro ao solicitar reset de senha");
      }

      alert("Um e-mail com instruções foi enviado!");
      navigate("/resetar-senha"); // Redireciona para a página de redefinição de senha
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Mudar Senha</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </label>
          <button type="submit" className={styles.button}>
            Enviar
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

export default MudarSenha;
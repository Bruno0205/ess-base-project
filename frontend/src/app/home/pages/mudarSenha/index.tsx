import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const MudarSenha = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Iniciando solicitação de reset de senha..."); // Log inicial

    try {
      const url = `http://127.0.0.1:8000/login/solicitar-reset-senha?email=${encodeURIComponent(email)}`;
      console.log(`Enviando requisição POST para: ${url}`); // Log da URL da requisição

      const response = await fetch(url, {
        method: "POST",
        headers: { "Accept": "application/json" },
      });

      console.log("Resposta do backend recebida:", response); // Log da resposta completa

      if (!response.ok) {
        console.error("Erro na resposta do backend:", response.status, response.statusText); // Log de erro
        throw new Error("Erro ao solicitar reset de senha");
      }

      const data = await response.json();
      console.log("Dados recebidos:", data); // Log dos dados do backend

      alert("Um e-mail com instruções foi enviado!");
      navigate("/resetar-senha"); // Redireciona para a página de redefinição de senha
      console.log("Redirecionando para /resetar-senha"); // Log do redirecionamento
    } catch (error) {
      console.error("Erro durante o envio:", error); // Log de erro geral
      alert(getErrorMessage(error));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Mudar Senha</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Campo de E-mail */}
          <label className={styles.label}>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
              data-cy="Email" // Adiciona o atributo data-cy
            />
          </label>

          {/* Botão Enviar */}
          <button type="submit" className={styles.button} data-cy="Enviar">
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
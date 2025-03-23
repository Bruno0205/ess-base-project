// frontend/src/app/home/pages/UserAccountVerification/index.tsx
import React, { useState } from "react";
import styles from "./index.module.css";

const UserAccountVerification = () => {
  const [email, setEmail] = useState(""); //Estado para o email
  const [codigo, setCodigo] = useState(""); //Estado para o código de verificação

  //Função para solicitar o código de verificação
  const handleSolicitarCodigo = async () => {
    if (!email) {
      alert("Por favor, insira um email válido.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/autenticacao/solicitar-codigo?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao solicitar código");
      }

      alert("Código enviado para o email!");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Erro ao solicitar código");
    }
  };

  //Função para liberar a conta usando o código de verificação
  const handleLiberarConta = async () => {
    if (!codigo) {
      alert("Por favor, insira o código de verificação.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/autenticacao/verificar/${encodeURIComponent(codigo)}`, {
        method: "GET",
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao liberar conta");
      }

      alert("Conta liberada com sucesso!");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Erro ao liberar conta");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Verificação de Conta</h1>

      {/*Campo para inserir o email*/}
      <div className={styles.inputGroup}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insira seu email"
            className={styles.input}
            required
          />
        </label>
        <button onClick={handleSolicitarCodigo} className={styles.button}>
          Solicitar Código
        </button>
      </div>

      {/*Campo para inserir o código de verificação*/}
      <div className={styles.inputGroup}>
        <label>
          Código de Verificação:
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Insira o código recebido"
            className={styles.input}
            required
          />
        </label>
        <button onClick={handleLiberarConta} className={styles.button}>
          Liberar Conta
        </button>
      </div>
    </div>
  );
};

export default UserAccountVerification;

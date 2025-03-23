import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const MudarSenha = () => {
  const [email, setEmail] = useState(""); //State p/ email
  const navigate = useNavigate(); //Hook p/ navegação

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //Evita reload da pág

    console.log("Iniciando solicitação de reset de senha..."); //Log inicial

    try {
      const url = `http://127.0.0.1:8000/login/solicitar-reset-senha?email=${encodeURIComponent(email)}`; //Endpoint com email
      console.log(`Enviando requisição POST para: ${url}`); //Log da URL usada

      const response = await fetch(url, {
        method: "POST", //Método HTTP
        headers: { "Accept": "application/json" }, //Aceita JSON
      });

      console.log("Resposta do backend recebida:", response); //Log da resp

      if (!response.ok) {
        console.error("Erro na resposta do backend:", response.status, response.statusText); //Log do erro HTTP
        throw new Error("Erro ao solicitar reset de senha"); //Lança erro
      }

      const data = await response.json(); //Pega dados da resp
      console.log("Dados recebidos:", data); //Log dos dados

      alert("Um e-mail com instruções foi enviado!"); //Msg sucesso
      navigate("/resetar-senha"); //Redir p/ resetar senha
      console.log("Redirecionando para /resetar-senha"); //Log do redir
    } catch (error) {
      console.error("Erro durante o envio:", error); //Log do erro
      alert(getErrorMessage(error)); //Mostra erro p/ user
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Mudar Senha</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/*Campo de E-mail*/}
          <label className={styles.label}>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} //Atualiza state email
              className={styles.input}
              required
              data-cy="Email"
            />
          </label>

          {/*Botão Enviar*/}
          <button type="submit" className={styles.button} data-cy="Enviar">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

//Função p/ tratar erro
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message; //Erro conhecido
  return String(error); //Outros erros
}

export default MudarSenha;

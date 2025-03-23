//frontend/src/app/home/pages/ResetarSenha/index.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";

const ResetarSenha = () => {
  const [token, setToken] = useState(""); //State p/ token
  const [novaSenha, setNovaSenha] = useState(""); //State p/ nova senha
  const navigate = useNavigate(); //Hook p/ navegação

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //Evita recarregar pág

    try {
      const url = "http://127.0.0.1:8000/login/resetar-senha"; //Endpoint da API
      const response = await fetch(url, {
        method: "POST", //Método HTTP
        headers: {
          "Accept": "application/json", //Aceita JSON
          "Content-Type": "application/json", //Envia JSON
        },
        body: JSON.stringify({ token, nova_senha: novaSenha }), //Body da req
      });

      if (!response.ok) {
        throw new Error("Erro ao resetar senha"); //Erro se status não OK
      }

      alert("Senha alterada com sucesso!"); //Sucesso
      navigate("/login"); //Redir p/ login
    } catch (error) {
      alert(getErrorMessage(error)); //Mostra erro
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
              onChange={(e) => setToken(e.target.value)} //Atualiza token
              className={styles.input}
              required
            />
          </label>
          <label className={styles.label}>
            Nova Senha:
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)} //Atualiza senha
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

//Função p/ tratar msgs de erro
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message; //Erro conhecido
  return String(error); //Outros erros
}

export default ResetarSenha;

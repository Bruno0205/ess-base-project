import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./index.module.css";

const LoginPage = () => {
  const [login, setLogin] = useState(""); //State p/ login
  const [senha, setSenha] = useState(""); //State p/ senha
  const { login: authLogin } = React.useContext(AuthContext); //Context p/ login do usuário
  const navigate = useNavigate(); //Hook p/ navegação

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //Evita recarregar a página

    try {
      //Envia login e senha como query params
      const url = `http://localhost:8000/login/auth?login=${encodeURIComponent(login)}&senha=${encodeURIComponent(senha)}`;
      const response = await fetch(url, {
        method: "POST", //Método HTTP
        headers: { "Accept": "application/json" }, //Aceita resposta JSON
      });

      if (!response.ok) {
        throw new Error("Login ou senha incorretos"); //Erro se resposta não for ok
      }

      const data = await response.json(); //Pega dados da resposta
      const user = data.user; //Usuário retornado

      //Salva usuário no contexto
      authLogin(user);

      //Redireciona para página do usuário
      navigate(`/usuario/${encodeURIComponent(user.login)}`);
    } catch (error) {
      alert(getErrorMessage(error)); //Mostra erro para o usuário
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Login</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/*Campo Login*/}
            <label className={styles.label}>
              Login:
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)} //Atualiza o estado de login
                className={styles.input}
                required
                data-cy="Login"
              />
            </label>
            {/*Campo Senha*/}
            <label className={styles.label}>
              Senha:
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)} //Atualiza o estado de senha
                className={styles.input}
                required
                data-cy="Senha"
              />
            </label>
            {/*Botão Entrar*/}
            <button type="submit" className={styles.button} data-cy="Entrar">
              Entrar
            </button>
            {/*Links de recuperação e cadastro*/}
            <p className={styles.link}>
              Esqueceu sua senha?{" "}
              <a href="/mudar-senha" className={styles.resetLink}>
                Clique aqui
              </a>
            </p>
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

//Função para tratar erros
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message; //Erro conhecido
  return String(error); //Outro tipo de erro
}

export default LoginPage;

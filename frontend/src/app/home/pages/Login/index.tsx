import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const { login: authLogin } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Constrói a URL com os parâmetros de consulta
      const url = `http://localhost:8000/login/auth?login=${encodeURIComponent(login)}&senha=${encodeURIComponent(senha)}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Accept": "application/json" }, // Adiciona o cabeçalho Accept
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Login:
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export default LoginPage;
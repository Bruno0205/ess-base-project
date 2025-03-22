// frontend/src/app/home/pages/Register/index.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask"; // Importa a biblioteca de máscara
import styles from "./index.module.css";

const Register = () => {
  const [isPessoaFisica, setIsPessoaFisica] = useState(true);
  const navigate = useNavigate();

  const toggleTipoPessoa = () => {
    setIsPessoaFisica((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const url = isPessoaFisica
        ? "http://127.0.0.1:8000/cadastro/cadastro/pf"
        : "http://127.0.0.1:8000/cadastro/cadastro/pj";

      const requestBody = isPessoaFisica
        ? {
            uf: data.uf,
            email: data.email,
            login: data.login,
            senha: data.senha,
            cpf: data.cpf,
            nome: data.nome,
            nascimento: data.nascimento,
          }
        : {
            uf: data.uf,
            email: data.email,
            login: data.login,
            senha: data.senha,
            cnpj: data.cnpj,
            razao_social: data.razao_social,
          };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Captura a mensagem de erro do backend
        throw new Error(errorData.detail || "Erro ao cadastrar usuário");
      }

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      // Verifica se o erro é uma instância de Error
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message); // Exibe a mensagem de erro do backend
      } else {
        console.error("Erro desconhecido:", error);
        alert("Ocorreu um erro desconhecido. Tente novamente.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Cadastro de Usuário</h1>

      {/* Botões para alternar entre Pessoa Física e Jurídica */}
      <div className={styles.tipoPessoaButtons}>
        <button
          onClick={toggleTipoPessoa}
          className={isPessoaFisica ? styles.active : ""}
        >
          Pessoa Física
        </button>
        <button
          onClick={toggleTipoPessoa}
          className={!isPessoaFisica ? styles.active : ""}
        >
          Pessoa Jurídica
        </button>
      </div>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Campos comuns */}
        <label>
          UF:
          <input type="text" name="uf" placeholder="Ex: SP" required />
        </label>

        <label>
          Email:
          <input type="email" name="email" required placeholder="seu@email.com" />
        </label>

        <label>
          Login:
          <input type="text" name="login" required placeholder="Seu login" />
        </label>

        <label>
          Senha:
          <input type="password" name="senha" required placeholder="Sua senha" />
        </label>

        {/* Campos específicos para Pessoa Física */}
        {isPessoaFisica && (
          <>
            <label>
              CPF:
              <InputMask
                mask="999.999.999-99"
                type="text"
                name="cpf"
                required
                placeholder="000.000.000-00"
                className={styles.input}
              />
            </label>

            <label>
              Nome:
              <input type="text" name="nome" required placeholder="Seu nome completo" />
            </label>

            <label>
              Data de Nascimento:
              <input type="date" name="nascimento" required />
            </label>
          </>
        )}

        {/* Campos específicos para Pessoa Jurídica */}
        {!isPessoaFisica && (
          <>
            <label>
              CNPJ:
              <InputMask
                mask="99.999.999/9999-99"
                type="text"
                name="cnpj"
                required
                placeholder="00.000.000/0000-00"
                className={styles.input}
              />
            </label>

            <label>
              Razão Social:
              <input type="text" name="razao_social" required placeholder="Razão social da empresa" />
            </label>
          </>
        )}

        {/* Botão de envio */}
        <button type="submit" className={styles.submitButton}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
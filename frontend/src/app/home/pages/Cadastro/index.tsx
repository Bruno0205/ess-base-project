import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import styles from "./index.module.css";

const Register = () => {
  const [isPessoaFisica, setIsPessoaFisica] = useState(true);
  const navigate = useNavigate();

  const toggleTipoPessoa = (tipo: "PF" | "PJ") => {
    if (tipo === "PF" && !isPessoaFisica) {
      console.log("Alternando para Pessoa Física"); //Alterna para Pessoa Física
      setIsPessoaFisica(true);
    } else if (tipo === "PJ" && isPessoaFisica) {
      console.log("Alternando para Pessoa Jurídica"); //Alterna para Pessoa Jurídica
      setIsPessoaFisica(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Previne o comportamento padrão do form

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const url = isPessoaFisica
        ? "http://127.0.0.1:8000/cadastro/cadastro/pf" //URL para cadastro de Pessoa Física
        : "http://127.0.0.1:8000/cadastro/cadastro/pj"; //URL para cadastro de Pessoa Jurídica

      const requestBody = isPessoaFisica
        ? { //Dados de cadastro para Pessoa Física
            uf: data.uf,
            email: data.email,
            login: data.login,
            senha: data.senha,
            cpf: data.cpf,
            nome: data.nome,
            nascimento: data.nascimento,
          }
        : { //Dados de cadastro para Pessoa Jurídica
            uf: data.uf,
            email: data.email,
            login: data.login,
            senha: data.senha,
            cnpj: data.cnpj,
            razao_social: data.razao_social,
          };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //Cabeçalhos da requisição
        body: JSON.stringify(requestBody), //Corpo da requisição
      });

      if (!response.ok) { //Verifica se a resposta não foi OK
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao cadastrar usuário"); //Lança erro caso o cadastro falhe
      }

      alert("Cadastro realizado com sucesso!"); //Mensagem de sucesso
      navigate("/login"); //Redireciona para a página de login
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message); //Exibe erro no console
        alert(error.message); //Mensagem de erro
      } else {
        console.error("Erro desconhecido:", error); //Exibe erro desconhecido
        alert("Ocorreu um erro desconhecido. Tente novamente."); //Mensagem de erro genérica
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Cadastro de Usuário</h1>

      <div className={styles.tipoPessoaButtons}>
        <button
          onClick={() => toggleTipoPessoa("PF")}
          className={isPessoaFisica ? styles.active : ""}
          data-cy="pessoa-fisica-button"
          data-active={isPessoaFisica} //Novo atributo para teste
        >
          Pessoa Física
        </button>
        <button
          onClick={() => toggleTipoPessoa("PJ")}
          className={!isPessoaFisica ? styles.active : ""}
          data-cy="pessoa-juridica-button"
          data-active={!isPessoaFisica} //Novo atributo para teste
        >
          Pessoa Jurídica
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          UF:
          <input
            type="text"
            name="uf"
            placeholder="Ex: SP"
            required
            data-cy="uf-input"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            required
            placeholder="seu@email.com"
            data-cy="email-input"
          />
        </label>

        <label>
          Login:
          <input
            type="text"
            name="login"
            required
            placeholder="Seu login"
            data-cy="login-input"
          />
        </label>

        <label>
          Senha:
          <input
            type="password"
            name="senha"
            required
            placeholder="Sua senha"
            data-cy="senha-input"
          />
        </label>

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
                data-cy="cpf-input"
              />
            </label>

            <label>
              Nome:
              <input
                type="text"
                name="nome"
                required
                placeholder="Seu nome completo"
                data-cy="nome-input"
              />
            </label>

            <label>
              Data de Nascimento:
              <input
                type="date"
                name="nascimento"
                required
                data-cy="nascimento-input"
              />
            </label>
          </>
        )}

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
                data-cy="cnpj-input"
              />
            </label>

            <label>
              Razão Social:
              <input
                type="text"
                name="razao_social"
                required
                placeholder="Razão social da empresa"
                data-cy="razao-social-input"
              />
            </label>
          </>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          data-cy="cadastrar-button"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;

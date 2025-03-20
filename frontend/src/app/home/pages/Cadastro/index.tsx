// src/app/home/pages/Register/index.tsx
import React, { useState } from "react";
import styles from "./index.module.css";

const Register = () => {
  // Estado para controlar o tipo de pessoa (física ou jurídica)
  const [isPessoaFisica, setIsPessoaFisica] = useState(true);

  // Função para alternar entre Pessoa Física e Jurídica
  const toggleTipoPessoa = () => {
    setIsPessoaFisica((prev) => !prev);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Captura os valores do formulário
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Validação básica (opcional)
    if (!data.email || !data.login || !data.senha) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Exibe os dados no console para teste
    console.log("Dados do formulário:", data);
    alert("Cadastro realizado com sucesso!");
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
          <input type="text" name="uf" placeholder="Ex: SP" />
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
              <input type="text" name="cpf" required placeholder="000.000.000-00" />
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
              <input type="text" name="cnpj" required placeholder="00.000.000/0000-00" />
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
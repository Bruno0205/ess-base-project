// src/app/home/pages/RegisterReservation/index.tsx
import React, { useState } from "react";
import styles from "./index.module.css";

// Tipos de reserva (baseado no Enum TipoReserva)
const TIPO_RESERVA = [
  { value: "Quarto", label: "Quarto" },
  { value: "Casa", label: "Casa" },
  { value: "Apartamento", label: "Apartamento" },
  { value: "Salão", label: "Salão" },
];

const RegisterReservation = () => {
  // Estado para armazenar os dados da reserva
  const [reservationData, setReservationData] = useState({
    titulo: "",
    descricao: "",
    imagens: [] as string[],
    petfriendly: false,
    endereco: "",
    tipo: "Quarto", // Valor padrão
    inicio: "",
    fim: "",
    preco: 0,
  });

  // Função para atualizar os campos do formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;

    // Lógica para checkbox (petfriendly)
    if (type === "checkbox") {
      setReservationData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setReservationData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação básica
    if (!reservationData.titulo || !reservationData.endereco || !reservationData.inicio || !reservationData.fim) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Exibe os dados no console para teste
    console.log("Dados da reserva:", reservationData);
    alert("Reserva realizada com sucesso!");
  };

  return (
    <div className={styles.container}>
      <h1>Cadastro de Reserva</h1>

      {/* Formulário de Cadastro de Reserva */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Título */}
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={reservationData.titulo}
            onChange={handleChange}
            required
            placeholder="Ex: Casa na praia"
          />
        </label>

        {/* Descrição */}
        <label>
          Descrição:
          <textarea
            name="descricao"
            value={reservationData.descricao}
            onChange={handleChange}
            placeholder="Descreva a reserva..."
          />
        </label>

        {/* Imagens */}
        <label>
          URLs das Imagens (separadas por vírgula):
          <input
            type="text"
            name="imagens"
            value={reservationData.imagens.join(",")}
            onChange={(e) => {
              const value = e.target.value;
              setReservationData((prev) => ({
                ...prev,
                imagens: value.split(",").map((url) => url.trim()),
              }));
            }}
            placeholder="https://exemplo.com/imagem1.jpg, https://exemplo.com/imagem2.jpg"
          />
        </label>

        {/* Pet Friendly */}
        <label>
          Aceita Pets:
          <input
            type="checkbox"
            name="petfriendly"
            checked={reservationData.petfriendly}
            onChange={handleChange}
          />
        </label>

        {/* Endereço */}
        <label>
          Endereço:
          <input
            type="text"
            name="endereco"
            value={reservationData.endereco}
            onChange={handleChange}
            required
            placeholder="Rua dos Bobos, nº 0"
          />
        </label>

        {/* Tipo de Reserva */}
        <label>
          Tipo de Reserva:
          <select
            name="tipo"
            value={reservationData.tipo}
            onChange={handleChange}
            required
          >
            {TIPO_RESERVA.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {/* Período de Disponibilidade */}
        <label>
          Data de Início:
          <input
            type="date"
            name="inicio"
            value={reservationData.inicio}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Data de Fim:
          <input
            type="date"
            name="fim"
            value={reservationData.fim}
            onChange={handleChange}
            required
          />
        </label>

        {/* Preço */}
        <label>
          Preço (R$):
          <input
            type="number"
            name="preco"
            value={reservationData.preco}
            onChange={handleChange}
            min="0"
            placeholder="Ex: 500"
          />
        </label>

        {/* Botão de Envio */}
        <button type="submit" className={styles.submitButton}>
          Cadastrar Reserva
        </button>
      </form>
    </div>
  );
};

export default RegisterReservation;
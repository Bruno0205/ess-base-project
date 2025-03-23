import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";

const AddReserva = () => {
  const { username } = useParams(); // Captura o parâmetro :username da URL
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    imagens: [] as string[], // Array para armazenar os links das imagens
    petfriendly: false,
    endereco: "",
    tipo: "Quarto", // Valor padrão
    disponibilidadeInicio: "",
    disponibilidadeFim: "",
    preco: 0,
    usuario: username || "", // Usa o username diretamente como valor inicial (flag)
  });

  const navigate = useNavigate();

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    const fieldValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value;

    // Trata o campo de imagens (divide os links por vírgula)
    if (name === "imagens") {
      setFormData((prev) => ({
        ...prev,
        imagens: value.split(",").map((link) => link.trim()), // Divide os links por vírgula e remove espaços
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação básica
    if (!formData.titulo || !formData.descricao || !formData.disponibilidadeInicio || !formData.disponibilidadeFim) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (formData.descricao.length < 20) {
      alert("A descrição deve ter no mínimo 20 caracteres.");
      return;
    }

    try {
      const requestBody = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        imagens: formData.imagens, // Inclui os links das imagens no corpo da requisição
        petfriendly: formData.petfriendly,
        endereco: formData.endereco,
        tipo: formData.tipo,
        disponibilidade: {
          inicio: formData.disponibilidadeInicio,
          fim: formData.disponibilidadeFim,
        },
        preco: parseFloat(formData.preco.toString()) || 0,
        usuario: formData.usuario, // Usa o login (username) como usuário (flag)
      };

      const response = await fetch("http://127.0.0.1:8000/cadastro-reservas/add_reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao adicionar reserva");
      }

      alert("Reserva publicada com sucesso!");
      navigate(`/usuario/${username}/locacoes`);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Erro ao adicionar reserva");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Adicionar Nova Reserva</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Título */}
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Título da reserva"
            required
            className={styles.input}
            data-cy="Titulo"
          />
        </label>

        {/* Descrição */}
        <label>
          Descrição:
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descreva sua reserva (mínimo 20 caracteres)"
            required
            className={styles.textarea}
            data-cy="Descricao"
          />
        </label>

        {/* Links de imagens */}
        <label>
          Links de Imagens:
          <input
            type="text"
            name="imagens"
            value={formData.imagens.join(", ")} // Exibe os links separados por vírgula
            onChange={handleChange}
            placeholder="Insira links de imagens separados por vírgula"
            className={styles.input}
            data-cy="Imagens"
          />
        </label>

        {/* Endereço */}
        <label>
          Endereço:
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Endereço da reserva"
            required
            className={styles.input}
            data-cy="Endereco"
          />
        </label>

        {/* Tipo */}
        <label>
          Tipo:
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className={styles.select}
            data-cy="Tipo"
          >
            <option value="Quarto">Quarto</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Salão">Salão</option>
          </select>
        </label>

        {/* Período de Disponibilidade */}
        <div className={styles.dateGroup}>
          <label>
            Início da Disponibilidade:
            <input
              type="date"
              name="disponibilidadeInicio"
              value={formData.disponibilidadeInicio}
              onChange={handleChange}
              required
              className={styles.input}
              data-cy="DisponibilidadeInicio"
            />
          </label>
          <label>
            Fim da Disponibilidade:
            <input
              type="date"
              name="disponibilidadeFim"
              value={formData.disponibilidadeFim}
              onChange={handleChange}
              required
              className={styles.input}
              data-cy="DisponibilidadeFim"
            />
          </label>
        </div>

        {/* Preço */}
        <label>
          Preço Diária:
          <input
            type="number"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            placeholder="Preço da reserva"
            min="0"
            step="0.01"
            required
            className={styles.input}
            data-cy="Preco"
          />
        </label>

        {/* Pet Friendly */}
        <div className={styles.petFriendlyContainer}>
          <label className={styles.petFriendlyLabel}>
            <input
              type="checkbox"
              name="petfriendly"
              checked={formData.petfriendly}
              onChange={handleChange}
              className={styles.checkbox}
              data-cy="AceitaPets"
            />
            Aceita Pets?
          </label>
        </div>

        {/* Botão de Envio */}
        <button type="submit" className={styles.button} data-cy="PublicarReserva">
          Publicar Reserva
        </button>
      </form>
    </div>
  );
};

export default AddReserva;
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";

const AddReserva = () => {
  const { username } = useParams(); //Captura :username
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    imagens: [] as string[], //Links das imagens
    petfriendly: false,
    endereco: "",
    tipo: "Quarto", //Valor padrão
    disponibilidadeInicio: "",
    disponibilidadeFim: "",
    preco: 0,
    usuario: username || "", //Usa username como usuário
  });

  const navigate = useNavigate();

  //Lida com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    const fieldValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value;

    //Trata links de imagens
    if (name === "imagens") {
      setFormData((prev) => ({
        ...prev,
        imagens: value.split(",").map((link) => link.trim()), //Divide links
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));
    }
  };

  //Lida com o envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validação básica
    if (!formData.titulo || !formData.descricao || !formData.disponibilidadeInicio || !formData.disponibilidadeFim) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (formData.descricao.length < 20) {
      alert("Descrição mínima de 20 caracteres.");
      return;
    }

    try {
      const requestBody = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        imagens: formData.imagens, //Links das imagens
        petfriendly: formData.petfriendly,
        endereco: formData.endereco,
        tipo: formData.tipo,
        disponibilidade: {
          inicio: formData.disponibilidadeInicio,
          fim: formData.disponibilidadeFim,
        },
        preco: parseFloat(formData.preco.toString()) || 0,
        usuario: formData.usuario, //Usuário (username)
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

      alert("Reserva publicada!");
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
        {/*Título*/}
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Título"
            required
            className={styles.input}
            data-cy="Titulo"
          />
        </label>

        {/*Descrição*/}
        <label>
          Descrição:
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descrição (mínimo 20 caracteres)"
            required
            className={styles.textarea}
            data-cy="Descricao"
          />
        </label>

        {/*Links de Imagens*/}
        <label>
          Links de Imagens:
          <input
            type="text"
            name="imagens"
            value={formData.imagens.join(", ")} //Exibe links separados por vírgula
            onChange={handleChange}
            placeholder="Links de imagens"
            className={styles.input}
            data-cy="Imagens"
          />
        </label>

        {/*Endereço*/}
        <label>
          Endereço:
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Endereço"
            required
            className={styles.input}
            data-cy="Endereco"
          />
        </label>

        {/*Tipo*/}
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

        {/*Período de Disponibilidade*/}
        <div className={styles.dateGroup}>
          <label>
            Início Disponibilidade:
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
            Fim Disponibilidade:
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

        {/*Preço*/}
        <label>
          Preço Diária:
          <input
            type="number"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            placeholder="Preço"
            min="0"
            step="0.01"
            required
            className={styles.input}
            data-cy="Preco"
          />
        </label>

        {/*Aceita Pet*/}
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

        {/*Botão de Envio*/}
        <button type="submit" className={styles.button} data-cy="PublicarReserva">
          Publicar Reserva
        </button>
      </form>
    </div>
  );
};

export default AddReserva;

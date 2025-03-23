import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import ResultCard from "../../../shared/components/ResultCard/ResultCard";
import logo from '../../../Images/logo.png'; 

const SearchResults = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    estado: "",
    tipo: "",
    valmax: "",
    valmin: "",
    petfriendly: false,
    destacado: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSearch = () => {
    const query = new URLSearchParams(
      Object.entries(filters)
        .filter(([key, value]) => value !== "" && value !== false)
        .reduce((acc, [key, value]) => {
          acc[key] = value.toString();
          return acc;
        }, {})
    ).toString();
    navigate(`/search?${query}`);
  };

  interface Reserva {
    titulo: string;
    descricao: string;
    endereco: string;
    tipo: string;
    preco: number;
    petfriendly: boolean;
    destacado: boolean;
    imagens: string[];
    usuario: string; // Adicionado
  }

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const query = new URLSearchParams(location.search).toString();
        const response = await axios.get(`http://127.0.0.1:8000/queries/reservas?${query}`);
        setReservas(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setReservas([]);
          setError("Ops! Nenhuma reserva foi encontrada dentro de seus parâmetros :/");
        } else {
          console.error("Erro ao buscar reservas:", error);
          setError("Erro ao buscar reservas. Tente novamente mais tarde.");
        }
      }
    };

    fetchReservas();
  }, [location.search]);

  const isFiltersEmpty = Object.values(filters).every(value => value === "" || value === false);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img
          src={logo} // Usando a imagem importada
          alt="Logo do Nido"
          width="100"
          height="100"
          style={{ mixBlendMode: "normal" }}
        />
      </div>

      <h1 className={styles.title}>
        {isFiltersEmpty ? "Filtre sua reserva dos sonhos!" : "Filtre sua reserva dos sonhos!"}
      </h1>
      <div className={styles.resultsContainer}>
        {/* Filters */}
        <div className={styles.filtersContainer}>
          <select
            name="estado"
            className={styles.select}
            value={filters.estado}
            onChange={handleInputChange}
          >
            <option value="">Estado</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
          <select
            name="tipo"
            className={styles.select}
            value={filters.tipo}
            onChange={handleInputChange}
          >
            <option value="">Tipo de Reserva</option>
            <option value="Quarto">Quarto</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Salão">Salão</option>
          </select>
          <input
            type="text"
            name="valmax"
            placeholder="Preço Máximo"
            className={styles.input}
            value={filters.valmax}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="valmin"
            placeholder="Preço Minimo"
            className={styles.input}
            value={filters.valmin}
            onChange={handleInputChange}
          />
          <input
            type="checkbox"
            name="petfriendly"
            id="petFriendly"
            className={styles.checkbox}
            checked={filters.petfriendly}
            onChange={handleInputChange}
          />
          <label htmlFor="petFriendly" className={styles.checkboxLabel}>
            Pet-friendly
          </label>
          <input
            type="checkbox"
            name="destacado"
            id="destacado"
            className={styles.checkbox}
            checked={filters.destacado}
            onChange={handleInputChange}
          />
          <label htmlFor="destacado" className={styles.checkboxLabel}>
            Destacado
          </label>
          <button onClick={handleSearch} className={styles.button}>
            Buscar
          </button>
        </div>

        {error ? (
          <p className={styles.noResults}>{error}</p>
        ) : (
          reservas.length > 0 ? (
            reservas.map((reserva) => (
              <ResultCard
                data-testid="result-card"
                key={reserva.titulo}
                title={reserva.titulo}
                description={reserva.descricao}
                state={reserva.endereco.split(", ").pop() || ""}
                reservationType={reserva.tipo}
                price={`R$ ${reserva.preco}`}
                petFriendly={reserva.petfriendly}
                highlighted={reserva.destacado}
                imageUrl={`/path/to/image/${reserva.imagens[0]}`}
                username={reserva.usuario} // Adicionado
                reservaName={reserva.titulo.toLowerCase().replace(/\s+/g, "-")} // Adicionado
              />
            ))
          ) : (
            <p className={styles.noResults}>Ops! Nenhuma reserva foi encontrada dentro de seus parâmetros :/</p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchResults;
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../Components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MoviesGrid.css";

const Search = () => {
  const [searchParamn] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParamn.get("q");

  const getSearchedMovies = async (url) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + apiKey,
      },
    };

    const res = await fetch(url, options)
      .then((res) => res.json())
      .catch((err) => console.error(err));
    setMovies(res.results);
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?query=${query}&language=pt-BR`;

    getSearchedMovies(searchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultado para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length == 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => (
            <p key={movie.id}>
              <MovieCard movie={movie} />
            </p>
          ))}
      </div>
    </div>
  );
};

export default Search;

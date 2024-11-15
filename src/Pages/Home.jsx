import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";

import "./MoviesGrid.css"

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRetedMovies = async (url) => {
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
    setTopMovies(res.results);
  };

  useEffect(() => {
    const topRatedURL = `${moviesURL}top_rated?language=pt-BR`;

    getTopRetedMovies(topRatedURL);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length == 0 && <p>Carregando...</p>}
        {topMovies.length > 0 &&
          topMovies.map((movie) => (
            <p key={movie.id}>
              <MovieCard movie={movie} />
            </p>
          ))}
      </div>
    </div>
  );
};

export default Home;

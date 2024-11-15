import { useParams } from "react-router-dom";
import "./Movie.css";
import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import {
  BsFillFileEarmarkTextFill,
  BsGraphUp,
  BsHourglassSplit,
  BsWallet2,
} from "react-icons/bs";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
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

    setMovie(res);
  };

  useEffect(() => {
    const getMovieURL = `${moviesURL}${id}?language=pt-BR`;

    getMovie(getMovieURL);
  }, [id]);

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview} minutos</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;

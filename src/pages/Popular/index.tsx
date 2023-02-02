import { useEffect, Fragment } from "react";
import { useGetPopularMovieQuery } from "../../redux/services/movieApi";
import { Card, Input } from "../../components";
import Layout from "../layout";

export default function Popular() {
  const {
    data: moviePopular,
    error: errorMoviePopular,
    isLoading: isLoadingMoviePopular,
  } = useGetPopularMovieQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(moviePopular);
    }, 1000);
    return () => clearInterval(interval);
  });

  if (isLoadingMoviePopular) {
    return <h1 className="title">Loading</h1>;
  }

  return (
    <Layout>
      <div className="container">
        <div className="top-section">
          <h1 className="title">Popular</h1>
          <Input />
        </div>
        <div className="movie">
          {moviePopular?.results.map((movie) => (
            <Card key={movie.id}>
              <img
                src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="movie-image"
              />
              <div className="movie-title">
                <h4>{movie.original_title}</h4>
                <p className="release-date">{movie.release_date}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

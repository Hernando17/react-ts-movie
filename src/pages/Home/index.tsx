import { useEffect, Fragment } from "react";
import { useGetPopularMovieQuery } from "../../redux/services/movieApi";
import { Card } from "../../components";

export default function Home() {
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
    <Fragment>
      <div className="container">
        <h1 className="title">Popular</h1>
        <div className="movie">
          {moviePopular?.results.map((movie) => (
            <Card key={movie.id}>
              <img
                src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="movie-image"
              />
              <p>{movie.original_title}</p>
            </Card>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

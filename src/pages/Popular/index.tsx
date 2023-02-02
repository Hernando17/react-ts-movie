import { useEffect, Fragment, useState } from "react";
import { useGetPopularMovieQuery } from "../../redux/services/movieApi";
import { Card, Input, Pagination } from "../../components";
import Layout from "../layout";

export default function Popular() {
  const {
    data: moviePopular,
    error: errorMoviePopular,
    isLoading: isLoadingMoviePopular,
  } = useGetPopularMovieQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [moviePerPage] = useState(10);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(moviePopular);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // });

  if (isLoadingMoviePopular) {
    return <h1 className="title">Loading</h1>;
  }

  const indexOfLastMovie = currentPage * moviePerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviePerPage;
  const currentMovie = moviePopular.results.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const movieTotal = moviePopular.results.length;

  const pageNumber = [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  for (let i = 1; i <= Math.ceil(movieTotal / moviePerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <Layout title="Movie | Popular">
      <div className="container">
        <div className="top-section">
          <h1 className="title">Popular</h1>
          <Input />
        </div>
        <div className="pagination">
          {pageNumber.map((number) => (
            <Pagination number={number} onClick={() => paginate(number)} />
          ))}
        </div>
        <div className="movie">
          {currentMovie.map((movie) => (
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

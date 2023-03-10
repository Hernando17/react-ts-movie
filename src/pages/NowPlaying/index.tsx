import { useEffect, useState } from "react";
import { useGetMovieNowPlayingQuery } from "../../redux/services/movieApi";
import {
  Card,
  Input,
  Pagination,
  Loading,
  Error401,
  Error404,
} from "../../components";
import Layout from "../layout";
import { useNavigate } from "react-router-dom";

export default function NowPlaying() {
  const navigate = useNavigate();

  const {
    data: movieNowPlaying,
    error: errorMovieNowPlaying,
    isLoading: isLoadingMovieNowPlaying,
  } = useGetMovieNowPlayingQuery();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [moviePerPage] = useState(10);

  if (isLoadingMovieNowPlaying) {
    return <Loading />;
  } else if (errorMovieNowPlaying) {
    if (errorMovieNowPlaying?.status == 404) {
      return <Error404 />;
    } else if (errorMovieNowPlaying?.status == 401) {
      return <Error401 />;
    }
  }

  const searchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const filterBySearch = (search: any) => {
    return movieNowPlaying.results.filter((o: any) =>
      Object.keys(o).some((k) =>
        o[k]
          ? o[k]
              .toString()
              .toLowerCase()
              .includes(search.toString().toLowerCase())
          : ""
      )
    );
  };

  const indexOfLastMovie = currentPage * moviePerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviePerPage;
  const currentMovie =
    search != ""
      ? filterBySearch(search).slice(indexOfFirstMovie, indexOfLastMovie)
      : movieNowPlaying.results.slice(indexOfFirstMovie, indexOfLastMovie);

  const movieTotal =
    search != ""
      ? filterBySearch(search).length
      : movieNowPlaying.results.length;

  const pageNumber = [];
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  for (let i = 1; i <= Math.ceil(movieTotal / moviePerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <Layout title="Movie | Now Playing">
      <div className="container">
        <div className="top-section">
          <h1 className="title">Now Playing</h1>
          <Input value={search} onChange={searchChange} name="search" />
        </div>
        <div className="pagination">
          {pageNumber.map((number) => (
            <Pagination
              currentPage={currentPage}
              number={number}
              onClick={() => paginate(number)}
            />
          ))}
        </div>
        <div className="movie">
          {currentMovie.map((movie: any) => (
            <Card
              key={movie.id}
              onClick={() => {
                navigate(`/movie-detail/${movie.id}`);
              }}
            >
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

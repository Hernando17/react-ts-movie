import { useState } from "react";
import Layout from "../layout";
import {
  Input,
  Card,
  Loading,
  Pagination,
  Error401,
  Error404,
} from "../../components";
import {
  useGetDiscoverMovieQuery,
  useGetMovieByKeywordQuery,
} from "../../redux/services/movieApi";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [moviePerPage] = useState(10);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const {
    data: dataDiscoverMovie,
    error: errorDiscoverMovie,
    isLoading: isLoadingDiscoverMovie,
  } = useGetDiscoverMovieQuery();

  const {
    data: dataMovieByKeyword,
    error: errorMovieByKeyword,
    isLoading: isLoadingMovieByKeyword,
  } = useGetMovieByKeywordQuery({
    keyword,
  });

  const searchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const applySearch = (e: any) => {
    e.preventDefault();
    setKeyword(search);
  };

  if (isLoadingDiscoverMovie || isLoadingMovieByKeyword) {
    return <Loading />;
  } else if (errorDiscoverMovie || errorMovieByKeyword) {
    if (
      errorDiscoverMovie?.status == 404 ||
      errorMovieByKeyword?.status == 404
    ) {
      return <Error404 />;
    } else if (
      errorDiscoverMovie?.status == 401 ||
      errorMovieByKeyword?.status == 401
    ) {
      return <Error401 />;
    }
  }

  const indexOfLastMovie = currentPage * moviePerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviePerPage;
  const currentMovie =
    keyword != ""
      ? dataMovieByKeyword.results.slice(indexOfFirstMovie, indexOfLastMovie)
      : dataDiscoverMovie.results.slice(indexOfFirstMovie, indexOfLastMovie);

  const movieTotal =
    keyword != ""
      ? dataMovieByKeyword.results.length
      : dataDiscoverMovie.results.length;

  const pageNumber = [];
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  for (let i = 1; i <= Math.ceil(movieTotal / moviePerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <Layout title="Movie | Discover">
      <div className="container">
        <h1 className="title" style={{ textAlign: "center" }}>
          Discover Movies
        </h1>
        <form className="search-section" onSubmit={applySearch}>
          <Input name="search" value={search} onChange={searchChange} />
          <button type="submit" className="button-basic">
            Search
          </button>
        </form>
        <div className="pagination">
          {pageNumber.map((number) => (
            <Pagination
              key={number}
              currentPage={currentPage}
              number={number}
              onClick={() => paginate(number)}
            />
          ))}
        </div>
        <div className="movie">
          {keyword == ""
            ? currentMovie.map((movie: any) => (
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
              ))
            : dataMovieByKeyword.results.map((movie: any) => (
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

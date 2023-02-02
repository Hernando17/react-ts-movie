import { useState } from "react";
import Layout from "../layout";
import { Input, Card, Loading } from "../../components";
import {
  useGetDiscoverMovieQuery,
  useGetMovieByKeywordQuery,
} from "../../redux/services/movieApi";
import { BarLoader } from "react-spinners";

export default function Landing() {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const {
    data: dataDiscoverMovie,
    error: errorDiscoverMovie,
    isFetching: isFetchingDiscoverMovie,
  } = useGetDiscoverMovieQuery();

  const {
    data: dataMovieByKeyword,
    error: errorMovieByKeyword,
    isFetching: isFetchingMovieByKeyword,
    refetch: refetchMovieByKeyword,
  } = useGetMovieByKeywordQuery({
    keyword,
  });

  const searchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const applySearch = (e: any) => {
    e.preventDefault();
    setKeyword(search);
    refetchMovieByKeyword;
  };

  if (isFetchingDiscoverMovie || isFetchingMovieByKeyword) {
    return <Loading />;
  }

  return (
    <Layout title="Movie | Home">
      <div className="home">
        <h1 className="title">Search Movie</h1>
        <form className="search-section" onSubmit={applySearch}>
          <Input name="search" value={search} onChange={searchChange} />
          <button type="submit" className="pagination-button">
            Search
          </button>
        </form>
      </div>
      <div className="container">
        <div className="movie">
          {keyword == ""
            ? dataDiscoverMovie.results.map((movie: any) => (
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
              ))
            : dataMovieByKeyword.results.map((movie: any) => (
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

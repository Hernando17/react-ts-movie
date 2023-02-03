import { Helmet, HelmetProvider } from "react-helmet-async";
import { useGetMovieDetailQuery } from "../../redux/services/movieApi";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../../components";

export default function MovieDetail() {
  const navigate = useNavigate();
  const { movie_id } = useParams<{ movie_id: string }>();
  const { data, error, isFetching } = useGetMovieDetailQuery({
    movie_id,
  });

  if (isFetching) {
    return <Loading />;
  }

  console.log(data);

  return (
    <div className="container">
      <HelmetProvider>
        <Helmet>
          <title>Movie | Detail</title>
        </Helmet>
      </HelmetProvider>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="movie-detail">
        <img
          src={`http://image.tmdb.org/t/p/w500/${data.poster_path}`}
          className="movie-detail-image"
        />
        <div className="movie-detail-info">
          <h1>{data.original_title}</h1>
          <p>Release Date : {data.release_date}</p>
          <div className="genre">
            {data.genres.map((genre: any) => (
              <p className="genre-item">{genre.name}</p>
            ))}
          </div>
          <p style={{ marginTop: 24 }}>{data.tagline}</p>
          <p style={{ marginTop: 12 }}>{data.overview}</p>
        </div>
      </div>
    </div>
  );
}

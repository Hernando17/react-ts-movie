import { Helmet, HelmetProvider } from "react-helmet-async";
import { useGetMovieDetailQuery } from "../../redux/services/movieApi";
import { useParams, useNavigate } from "react-router-dom";
import { Loading, Error401, Error404 } from "../../components";
import { minuteToHour } from "../../utils";

export default function MovieDetail() {
  const navigate = useNavigate();
  const { movie_id } = useParams<{ movie_id: string }>();
  const { data, error, isLoading } = useGetMovieDetailQuery({
    movie_id,
  });

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    if (error?.status == 404) {
      return <Error404 />;
    } else if (error?.status == 401) {
      return <Error401 />;
    }
  }

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
            <ul style={{ marginLeft: 16 }}>
              <li>{`${minuteToHour(data.runtime).hour}h ${
                minuteToHour(data.runtime).minuteLeft
              }m`}</li>
            </ul>
          </div>
          <p style={{ marginTop: 24 }}>{data.tagline}</p>
          <p style={{ marginTop: 12 }}>{data.overview}</p>
        </div>
      </div>
    </div>
  );
}

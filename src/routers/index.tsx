import { Routes, Route } from "react-router-dom";
import {
  Landing,
  Popular,
  NowPlaying,
  MovieDetail,
  Upcoming,
  TopRated,
} from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/now-playing" element={<NowPlaying />} />
      <Route path="/movie-detail/:movie_id" element={<MovieDetail />} />
      <Route path="/upcoming" element={<Upcoming />} />
      <Route path="/top-rated" element={<TopRated />} />
    </Routes>
  );
}

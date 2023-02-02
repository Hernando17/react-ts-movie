import { createBrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Popular, NowPlaying, MovieDetail } from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/now-playing" element={<NowPlaying />} />
      <Route path="/movie-detail/:id" element={<MovieDetail />} />
    </Routes>
  );
}

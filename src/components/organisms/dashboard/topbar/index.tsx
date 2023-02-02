import { Link, useLocation } from "react-router-dom";

export function TopBar() {
  const location = useLocation();

  return (
    <div className="topbar">
      <ul>
        <li>
          <Link
            to="/"
            className={location.pathname == "/" ? "link active" : "link"}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/popular"
            className={location.pathname == "/popular" ? "link active" : "link"}
          >
            Popular
          </Link>
        </li>
        <li>
          <Link
            to="/now-playing"
            className={
              location.pathname == "/now-playing" ? "link active" : "link"
            }
          >
            Now Playing
          </Link>
        </li>
        <li>Upcoming</li>
        <li>Top Rated</li>
      </ul>
    </div>
  );
}

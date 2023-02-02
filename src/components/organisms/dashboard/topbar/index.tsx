import { Link } from "react-router-dom";

export function TopBar() {
  return (
    <div className="topbar">
      <ul>
        <li>
          <Link to="/popular" className="link">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/now-playing" className="link">
            Now Playing
          </Link>
        </li>
        <li>Upcoming</li>
        <li>Top Rated</li>
      </ul>
    </div>
  );
}

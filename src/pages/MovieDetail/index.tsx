import { Helmet, HelmetProvider } from "react-helmet-async";

export default function MovieDetail() {
  return (
    <div className="container">
      <HelmetProvider>
        <Helmet>
          <title>Movie | Detail</title>
        </Helmet>
      </HelmetProvider>
      <h1 className="title">Movie Detail</h1>
    </div>
  );
}

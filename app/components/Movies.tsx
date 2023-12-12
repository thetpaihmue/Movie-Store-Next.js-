import { MovieListModel } from "@/Types";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/Styles/Movies.css";
import { Card } from "react-bootstrap";
import placeholder from "@/assets/placeholder.jpg";
import Link from "next/link";
import Pagination from "./Pagination";

export default function Movies({ movies }: { movies: MovieListModel }) {
  const card = movies.results.map((movie) => (
    <div className="col-lg-2 col-md-4 col-sm-6 mb-3" key={movie.id}>
      <Card
        style={{ width: "auto", backgroundColor: "#fff", borderRadius: "10%" }}
        className="h-100 border-0"
      >
        <div className="text-center" style={{ width: "100%", height: "100%" }}>
          <Card.Img
            variant="top"
            width={440}
            height={660}
            src={
              movie.poster_path
                ? `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`
                : placeholder.src
            }
          />
        </div>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Text
            className="text-dark"
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {movie.title}
          </Card.Text>

          <Link
            className="btn text-white"
            style={{
              backgroundColor: "#0d253f",
              border: "none",
            }}
            href={`/movies/${movie.id}`}
          >
            View
          </Link>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <>
      <div className="row m-3">{card}</div>
      <Pagination total_pages={movies.total_pages} />
    </>
  );
}

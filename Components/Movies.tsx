"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Movies.css";
import { useEffect, useState } from "react";
import { Button, Card, Alert, Pagination, Spinner } from "react-bootstrap";
import { popularMovies, searchMovie } from "../Services/Apis";
import placeholder from "../assets/placeholder.jpg";
import moviesReducer from "../Reducers/moviesReducer";
import { useReducer } from "react";
import { MovieActionEnum } from "../Types";
import { useRouter, useSearchParams } from "next/navigation";

const Movies = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();
  const searchParam = useSearchParams();
  const visiblePages = 5;

  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const [moviesData, dispatchMovies] = useReducer(moviesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const searchQuery = searchParam.get("search");
    console.log("searchQuery", searchQuery);
    dispatchMovies({ type: MovieActionEnum.MOVIES_FETCH_INIT });

    if (searchQuery) {
      searchMovie(searchQuery)
        .then((response) => {
          dispatchMovies({
            type: MovieActionEnum.MOVIES_FETCH_SUCCESS,
            payload: response.data.results,
          });
          setTotalPages(response.data.total_pages);
        })
        .catch(() =>
          dispatchMovies({ type: MovieActionEnum.MOVIES_FETCH_FAIL })
        );
    } else {
      popularMovies(currentPage.toString())
        .then((response) => {
          dispatchMovies({
            type: MovieActionEnum.MOVIES_FETCH_SUCCESS,
            payload: response.data.results,
          });
          setTotalPages(response.data.total_pages);
        })
        .catch(() =>
          dispatchMovies({ type: MovieActionEnum.MOVIES_FETCH_FAIL })
        );
    }
  }, [currentPage, searchParam]);

  const card = moviesData.data.map((movie) => (
    <div className="col-lg-2 col-md-4 col-sm-6 mb-3" key={movie.id}>
      <Card
        style={{ width: "auto", backgroundColor: "#fff", borderRadius: "10%" }}
        className="h-100 border-0"
      >
        <div className="text-center" style={{ width: "100%", height: "100%" }}>
          <Card.Img
            variant="top"
            src={
              movie.poster_path
                ? `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`
                : placeholder.toString()
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

          <Button
            style={{
              backgroundColor: "#0d253f",
              border: "none",
            }}
            onClick={() => router.push(`/movies/${movie.id}`)}
          >
            View
          </Button>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <>
      {moviesData.isError && <Alert variant="danger">Something worng</Alert>}

      {moviesData.isLoading ? (
        <div className="d-flex justify-content-center mt-5 mb-5">
          <Spinner animation="border" variant="info" />
        </div>
      ) : (
        <div className="row m-3">{card}</div>
      )}
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {startPage > 1 && <Pagination.Ellipsis />}

          {[...Array(endPage - startPage + 1)].map((_, index) => (
            <Pagination.Item
              key={startPage + index}
              active={startPage + index === currentPage}
              onClick={() => handlePageChange(startPage + index)}
            >
              {startPage + index}
            </Pagination.Item>
          ))}

          {endPage < totalPages && <Pagination.Ellipsis />}

          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      </div>
    </>
  );
};

export default Movies;

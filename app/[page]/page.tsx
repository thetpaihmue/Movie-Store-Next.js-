"use client";
import Movies from "../components/Movies";
import { MovieListModel } from "@/Types";
import SearchMovies from "../components/SearchMovies";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

interface Params {
  page: number;
}

const Page = ({ params }: { params: Params }) => {
  const [movies, setMovies] = useState<MovieListModel>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/movies?page=${params.page}`);
        const moviesData = await response.json();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [params.page]);
  return (
    <>
      <SearchMovies getSearchResults={(results: any) => setMovies(results)} />

      {loading ? (
        <div className="d-flex justify-content-center mt-5 mb-5">
          <Spinner animation="border" variant="info" />
        </div>
      ) : (
        movies && <Movies movies={movies} />
      )}
    </>
  );
};

export default Page;

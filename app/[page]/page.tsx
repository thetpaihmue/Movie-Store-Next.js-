"use client";
import Movies from "../components/Movies";
import { MovieListModel } from "@/Types";
import SearchMovies from "../components/SearchMovies";
import { useState, useEffect } from "react";

interface Params {
  page: number;
}
const page = ({ params }: { params: Params }) => {
  const [movies, setMovies] = useState<MovieListModel>();
  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(`/api/movies?page=${params.page}`);
      const movies = await response.json();
      setMovies(movies);
    };

    getMovies();
  }, []);

  return (
    <>
      <SearchMovies getSearchResults={(results: any) => setMovies(results)} />
      {movies && <Movies movies={movies} />}
    </>
  );
};

export default page;

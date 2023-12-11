"use client";

import { useState, useEffect } from "react";
import Movies from "./components/Movies";
import SearchMovies from "./components/SearchMovies";
import { MovieListModel } from "@/Types";
import Navi from "@/app/components/Navi";

export default function Home({ params }: { params: number }) {
  const [movies, setMovies] = useState<MovieListModel>();
  console.log("page", params);
  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch("/api/movies");
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
}

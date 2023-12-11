"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { movieDetail } from "../../Services/Apis";
import "@/Styles/MovieDetail.css";
import { MovieModel } from "@/Types";

const MovieDetail = () => {
  const [movieDetailData, setMovieDetailData] = useState<MovieModel>();
  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch("/api/movies/id?id=${id}");
      const movies = await response.json();
      setMovieDetailData(movies);
    };

    getMovies();
  }, []);

  return (
    <div className="movie-detail-container">
      {movieDetailData && (
        <div
          className="background-image"
          style={{
            backgroundImage: `url('https://www.themoviedb.org/t/p/original/${movieDetailData.backdrop_path}')`,
          }}
        ></div>
      )}

      <div className="content">
        <div className="overlay-image">
          {movieDetailData && (
            <img
              src={`https://www.themoviedb.org/t/p/original/${movieDetailData.backdrop_path}`}
              alt="Movie Backdrop"
            />
          )}
        </div>

        <div className="text-content">
          <h3>{movieDetailData?.original_title}</h3>
          <p>{movieDetailData?.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

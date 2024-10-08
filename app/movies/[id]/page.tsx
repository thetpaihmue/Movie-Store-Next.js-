"use client";
import { MovieModel } from "@/Types";
import { useEffect, useState } from "react";
import "@/app/Styles/MovieDetail.css";

interface Params {
  id: string;
}
const Page = ({ params }: { params: Params }) => {
  const [movieDetailData, setMovieDetailData] = useState<MovieModel>();
  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(`/api/movies/id?id=${params.id}`);
      const movies = await response.json();
      setMovieDetailData(movies);
      window.scrollTo(0, 0);
    };

    getMovies();
  }, []);

  return (
    <>
      <div className='movie-detail-container'>
        {movieDetailData && (
          <div
            className='background-image'
            style={{
              backgroundImage: `url('https://www.themoviedb.org/t/p/original/${movieDetailData.backdrop_path}')`,
            }}
          ></div>
        )}

        <div className='content'>
          <div className='overlay-image'>
            {movieDetailData && (
              <img
                src={`https://www.themoviedb.org/t/p/original/${movieDetailData.backdrop_path}`}
                alt='Movie Backdrop'
              />
            )}
          </div>

          <div className='text-content'>
            <h3>{movieDetailData?.original_title}</h3>
            <p>{movieDetailData?.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

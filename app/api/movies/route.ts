import { NextResponse } from "next/server";
import BaseUrl from "../BaseUrl";

async function fetchMovies() {
  const response = await fetch(
    BaseUrl.baseURL + "/movie/popular?language=en-US&page=1",
    BaseUrl
  );

  const movies = await response.json();
  return movies;
}

export async function GET(request: Request) {
  const movies = await fetchMovies();
  return NextResponse.json(movies);
}

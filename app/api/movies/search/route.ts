import { NextResponse } from "next/server";
import BaseUrl from "../../BaseUrl";

async function fetchMovies(query: string) {
  const response = await fetch(
    `${BaseUrl.baseURL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    BaseUrl
  );

  const movies = await response.json();
  return movies;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const movies = query && (await fetchMovies(query));

  return NextResponse.json(movies);
}

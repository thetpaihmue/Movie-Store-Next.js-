import { NextResponse } from "next/server";
import BaseUrl from "../../BaseUrl";

async function fetchMovies(id: string) {
  const response = await fetch(
    `${BaseUrl.baseURL}/movie/${id}?language=en-US`,
    BaseUrl
  );

  const movies = await response.json();
  return movies;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const movies = id && (await fetchMovies(id));
  return NextResponse.json(movies);
}

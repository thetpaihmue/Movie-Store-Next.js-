import { NextResponse } from "next/server";
import BaseUrl from "../BaseUrl";

async function fetchMovies(page: number) {
  const response = await fetch(
    BaseUrl.baseURL + `/movie/popular?language=en-US&page=${page}`,
    BaseUrl
  );

  const movies = await response.json();
  return movies;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const movies = page && (await fetchMovies(Number(page)));
  return NextResponse.json(movies);
}

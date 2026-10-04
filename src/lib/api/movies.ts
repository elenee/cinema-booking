import { api } from "./client";
import type { ApiResponse, Movie } from "./types";

export async function getFeaturedMovies() {
  const response = await api.get<ApiResponse<Movie[]>>("/movies/featured");
  return response.data.data;
}

export async function getNowPlayingMovies() {
  const response = await api.get<ApiResponse<Movie[]>>("/movies/now-playing");
  return response.data.data;
}
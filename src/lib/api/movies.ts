import { api } from "./client";
import type { ApiResponse, Movie, MovieDetail, VenueSessions } from "./types";

export async function getFeaturedMovies() {
  const response = await api.get<ApiResponse<Movie[]>>("/movies/featured");
  return response.data.data;
}

export async function getNowPlayingMovies() {
  const response = await api.get<ApiResponse<Movie[]>>("/movies/now-playing");
  return response.data.data;
}

export async function getComingSoonMovies() {
  const response = await api.get<ApiResponse<Movie[]>>("/movies/coming-soon");
  return response.data.data;
}

export async function getMovieBySlug(slug: string) {
  const response = await api.get<ApiResponse<MovieDetail>>(`/movies/${slug}`);
  return response.data.data;
}

export async function getMovieSessions(slug: string, date: string) {
  const response = await api.get<ApiResponse<VenueSessions[]>>(
    `/movies/${slug}/sessions`,
    { params: { date } }
  );
  return response.data.data;
}

export async function searchMovies(query: string) {
  const response = await api.get<ApiResponse<Movie[]>>("/search", {
    params: { q: query },
  });

  return response.data.data;
}

"use client";

import { useEffect } from "react";
import type { Movie } from "@/lib/api/types";
import type { RecentlyViewedMovie } from "./RecentlyViewedCard";

const STORAGE_KEY = "kino-xii-recently-viewed";
const MAX_RECENT_MOVIES = 5;

interface TrackRecentlyViewedProps {
  movie: Movie;
}

export function TrackRecentlyViewed({ movie }: TrackRecentlyViewedProps) {
  useEffect(() => {
    const recentlyViewedMovie: RecentlyViewedMovie = {
      id: movie.id,
      slug: movie.slug,
      title: movie.title,
      posterUrl: movie.posterUrl,
      genre: movie.genres[0]?.name ?? "",
      runtimeMinutes: movie.runtimeMinutes,
      ageRating: movie.ageRating.code,
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const previous: RecentlyViewedMovie[] = saved
        ? JSON.parse(saved)
        : [];

      const updated = [
        recentlyViewedMovie,
        ...previous.filter((item) => item.id !== recentlyViewedMovie.id),
      ].slice(0, MAX_RECENT_MOVIES);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save recently viewed movie:", error);
    }
  }, [movie]);

  return null;
}
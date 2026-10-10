"use client";

import { useEffect, useState } from "react";
import {
  RecentlyViewedCard,
  type RecentlyViewedMovie,
} from "@/components/movie/RecentlyViewedCard";

const STORAGE_KEY = "kino-xii-recently-viewed";
const MAX_RECENT_MOVIES = 5;

export function RecentlyViewed() {
  const [movies, setMovies] = useState<RecentlyViewedMovie[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: RecentlyViewedMovie[] = JSON.parse(saved);
        setMovies(parsed.slice(0, MAX_RECENT_MOVIES));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-5 bg-background px-17.5 pt-10 pb-2">
      <h3 className="text-h3 text-white">Recently Viewed</h3>

      <div className="flex gap-4 overflow-x-auto pr-15 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {movies.map((movie) => (
          <RecentlyViewedCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
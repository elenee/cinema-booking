import type { Movie } from "@/lib/api/types";
import { MovieCard } from "./MovieCard";
import Link from "next/link";

interface NowPlayingProps {
    movies: Movie[];
}

export function NowPlaying({ movies }: NowPlayingProps) {
    return (
        <section className="bg-background px-17.5 pt-8 pb-10 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-h1 uppercase text-white">
                    Now Playing
                </h1>
                <Link href="/sessions"
                    className="text-label-m text-primary transition hover:text-primary-hover">
                    See all
                </Link>
            </div>

            <div className="flex gap-4 overflow-x-auto pr-15 scrollbar-none [&::-webkit-scrollbar]:hidden">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
}
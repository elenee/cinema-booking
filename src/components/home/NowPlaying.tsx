import type { Movie } from "@/lib/api/types";
import { MovieCard } from "./MovieCard";
import Link from "next/link";

interface NowPlayingProps {
    movies: Movie[];
}

export function NowPlaying({ movies }: NowPlayingProps) {
    return (
        <section className="bg-[#070C1C] px-17.5 py-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold uppercase text-white">
                    Now Playing
                </h1>
                <Link href="/sessions"
                    className="text-sm font-semibold text-[#EC3013] transition hover:text-[#ff5a3c]">
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
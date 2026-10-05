import type { Movie } from "@/lib/api/types";
import { ComingSoonCard } from "./ComingSoonCard";
import Link from "next/link";

interface ComingSoonProps {
    movies: Movie[];
}

export function ComingSoon({ movies }: ComingSoonProps) {
    return (

        <section className="border-t border-bg-border bg-background px-17.5 py-10 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-h1 uppercase text-white">
                    Coming Soon...
                </h1>
                <Link href="/coming-soon"
                    className="text-label-m text-primary transition hover:text-primary-hover">
                    See all
                </Link>
            </div>

            <div className="-mr-15 flex gap-4 overflow-x-auto pr-15 scrollbar-none [&::-webkit-scrollbar]:hidden">
                {movies.map((movie) => (
                    <ComingSoonCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
}
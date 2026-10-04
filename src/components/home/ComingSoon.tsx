import type { Movie } from "@/lib/api/types";
import { ComingSoonCard } from "./ComingSoonCard";
import Link from "next/link";

interface ComingSoonProps {
    movies: Movie[];
}

export function ComingSoon({ movies }: ComingSoonProps) {
    return (

        <section className="border-t border-[#2A2C3D] bg-[#070C1C] px-17.5 py-10 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold uppercase text-white">
                    Coming Soon...
                </h1>
                <Link href="/coming-soon"
                    className="text-sm font-semibold text-[#EC3013] transition hover:text-[#ff5a3c]">
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
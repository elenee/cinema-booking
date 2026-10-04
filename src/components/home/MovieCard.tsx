import Image from "next/image";
import type { Movie } from "@/lib/api/types";

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    const genre = movie.genres[0]?.name;

    return (
        <article className="w-65 shrink-0 rounded-[20px] bg-[#1E2031] p-3">
            <div className="relative aspect-2/3 overflow-hidden rounded-[14px]">
                <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    fill
                    sizes="220px"
                    className="object-cover"
                />
            </div>

            <div className="flex flex-col gap-1.75 items-start mt-2.5">
                <h3 className="truncate text-lg font-bold text-white">
                    {movie.title}
                </h3>

                <p className="text-xs text-[#A9A9A9]">
                    {genre && `${genre} · `}
                    {movie.runtimeMinutes} min
                </p>

                <span className="inline-flex items-center rounded-full bg-[#EC3013]/15 px-1.75 py-1 text-xs font-bold text-[#EE3A1A]">
                    {movie.ageRating.code}
                </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-white">
                    From ₾ {movie.fromPrice}
                </p>

                <button
                    type="button"
                    className="rounded-full bg-[#EC3013] px-5.5 py-2.5 text-[11px] font-extrabold text-white transition hover:bg-[#d83214]"
                >
                    Buy Ticket
                </button>
            </div>
        </article>
    );
}
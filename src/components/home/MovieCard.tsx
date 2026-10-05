import Image from "next/image";
import type { Movie } from "@/lib/api/types";

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    const genre = movie.genres[0]?.name;

    return (
        <article className="w-65 shrink-0 rounded-[20px] bg-surface p-3">
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
                <h3 className="truncate text-h3 text-white">
                    {movie.title}
                </h3>

                <p className="text-body-s text-text-muted">
                    {genre && `${genre} · `}
                    {movie.runtimeMinutes} min
                </p>

                <span className="inline-flex items-center rounded-full bg-primary/15 px-1.75 py-1 text-label-s text-primary">
                    {movie.ageRating.code}
                </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <p className="text-body-s text-white">
                    From ₾ {movie.fromPrice}
                </p>

                <button
                    type="button"
                    className="rounded-full bg-primary px-5.5 py-2.5 text-button text-white transition hover:bg-primary-hover"
                >
                    Buy Ticket
                </button>
            </div>
        </article>
    );
}
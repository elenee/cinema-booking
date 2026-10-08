import Image from "next/image";
import type { Movie } from "@/lib/api/types";

interface ComingSoonCardProps {
    movie: Movie;
}

function formatReleaseDate(date: string) {
    const d = new Date(date);
    const month = d.toLocaleString("en-US", { month: "long" });
    return `${d.getDate()} ${month}`;
}

export function ComingSoonCard({ movie }: ComingSoonCardProps) {
    const genre = movie.genres[0]?.name;

    return (
        <article className="flex w-117.5 p-3.75 gap-3 shrink-0 items-center overflow-hidden rounded-[20px] bg-surface">
            <div className="relative w-56.25 shrink-0 self-stretch overflow-hidden rounded-[14px]">
                <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    fill
                    sizes="229px"
                    className="object-cover"
                />
            </div>

            <div className="flex items-start min-w-0 flex-col gap-5">
                <div className="flex flex-col items-start gap-1.75">
                    <p className="text-body-s uppercase text-primary">
                        In cinemas {formatReleaseDate(movie.releaseDate)}
                    </p>

                    <h3 className="truncate text-body-s text-white">
                        {movie.title}
                    </h3>

                    <p className="text-body-s text-text-muted">
                        {genre && `${genre} · `}
                        {movie.runtimeMinutes} min
                    </p>

                    <span className="inline-flex text-body-s items-center rounded-full bg-primary/15 px-1.75 py-1 text-primary">
                        {movie.ageRating.code}
                    </span>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full border border-text-muted px-3 py-1.5 text-body-s text-white transition hover:bg-white/10 hover:backdrop-blur-button"
                >
                    <Image
                        src={movie.isNotified ? "/icons/success.svg" : "/icons/bell.svg"}
                        alt=""
                        width={12}
                        height={12}
                    />

                    {movie.isNotified ? "Reminder Set" : "Notify Me"}
                </button>
            </div>
        </article>
    );
}
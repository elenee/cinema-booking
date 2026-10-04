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
        <article className="flex w-117.5 p-3.75 gap-3 shrink-0 items-center overflow-hidden rounded-[20px] bg-[#1E2031]">
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
                    <p className="text-xs font-semibold uppercase text-[#EC3013]">
                        In cinemas {formatReleaseDate(movie.releaseDate)}
                    </p>

                    <h3 className="truncate text-xs font-semibold text-white">
                        {movie.title}
                    </h3>

                    <p className="text-xs text-[#A9A9A9]">
                        {genre && `${genre} · `}
                        {movie.runtimeMinutes} min
                    </p>

                    <span className="inline-flex text-xs items-center rounded-full bg-[#EC3013]/15 px-1.75 py-1 font-semibold text-[#EC3013]">
                        {movie.ageRating.code}
                    </span>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#A9A9A9] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                    <Image
                        src="/icons/bell.svg"
                        alt="Bell icon"
                        width={12}
                        height={12}
                    />
                    {movie.isNotified ? "Notified" : "Notify Me"}
                </button>
            </div>
        </article>
    );
}
import Image from "next/image";
import type { Movie } from "@/lib/api/types";

interface MovieHeroProps {
    movie: Movie;
}

const pill =
    "inline-flex px-2.5 py-1.5 items-center gap-1.5 rounded-full bg-white/10 px-2.5 text-label-s uppercase text-white";

export function MovieHero({ movie }: MovieHeroProps) {
    return (
        <div className="relative">
            <section className="relative h-141 px-15 pb-10.25 overflow-hidden flex gap-8.5">
                <Image
                    src={movie.backdropUrl}
                    alt=""
                    fill
                    priority
                    className="object-cover"
                />
                <div className="relative z-10 flex h-full items-end gap-8">
                    <div className="relative h-90 w-60 shrink-0 overflow-hidden rounded-2xl">
                        <Image
                            src={movie.posterUrl}
                            alt={movie.title}
                            fill
                            priority
                            sizes="240px"
                            className="object-cover"
                        />
                    </div>

                    <div className="max-w-137.5">
                        <h1 className="mb-3 text-4xl font-extrabold uppercase leading-tight text-white">
                            {movie.title}
                        </h1>

                        <p className="mb-4 line-clamp-3 max-w-125 text-xs leading-5 text-white">
                            {movie.synopsis}
                        </p>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex h-6 items-center rounded-full bg-primary/15 px-2.5 text-label-s font-bold text-primary">
                                {movie.ageRating.code}
                            </span>

                            <span className={pill}>
                                <Image
                                    src="/icons/clock.svg"
                                    alt=""
                                    width={12}
                                    height={12}
                                />
                                {movie.runtimeMinutes} min
                            </span>

                            {movie.formats.map((format) => (
                                <span key={format.id} className={pill}>
                                    {format.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
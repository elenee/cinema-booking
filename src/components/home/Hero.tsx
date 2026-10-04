"use client";

import Image from "next/image";
import { useState } from "react";
import type { Movie } from "@/lib/api/types";
import { Navbar } from "@/components/layout/navbar";

interface HeroProps {
    movies: Movie[];
}

function formatPremiereDate(date: string) {
    const premiereDate = new Date(date);
    const day = premiereDate.getDate();
    const month = premiereDate
        .toLocaleString("en-US", { month: "short" })
        .toUpperCase();

    return `${day} ${month}`;
}

const pill =
    "inline-flex h-6 items-center gap-1.5 rounded-full bg-white/10 px-2.5 text-[11px] font-bold uppercase text-white";

export function Hero({ movies }: HeroProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const movie = movies[activeIndex];

    if (!movie) {
        return null;
    }

    function goPrev() {
        setActiveIndex((i) => (i - 1 + movies.length) % movies.length);
    }

    function goNext() {
        setActiveIndex((i) => (i + 1) % movies.length);
    }

    return (
        <div className="relative">
            <section className="relative h-190 overflow-hidden">
                <Image
                    src={movie.backdropUrl}
                    alt=""
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-r from-[#070C1C]/90 via-[#070C1C]/40 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-[#070C1C] via-transparent to-[#070C1C]/60" />

                <div className="relative z-10 flex h-full flex-col justify-end px-16.75 pb-14">
                    <div className="max-w-137.5 flex flex-col gap-5">
                        <div className="flex flex-col gap-3.75 items-start">
                            <span className="inline-flex items-center rounded-full bg-[#EE3A1A]/15 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#EE3A1A]">
                                Premiere · Week of {formatPremiereDate(movie.releaseDate)}
                            </span>

                            <h1 className="text-4xl font-extrabold uppercase leading-tight text-white">
                                {movie.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex h-6 items-center rounded-full bg-[#EE3A1A]/15 px-1.5 py-3 text-[12px] font-bold text-[#EE3A1A]">
                                    {movie.ageRating.code}
                                </span>

                                <span className={`${pill} px-1.5 py-3`}>
                                    <Image
                                        src="/icons/clock.svg"
                                        alt=""
                                        width={12}
                                        height={12}
                                    />
                                    {movie.runtimeMinutes} min
                                </span>

                                {movie.formats.map((format) => (
                                    <span key={format.id} className={`${pill} px-1.5 py-3`}>
                                        {format.name}
                                    </span>
                                ))}
                            </div>

                            <p className="line-clamp-3 max-w-125 text-xs leading-5 text-white">
                                {movie.synopsis}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="appearance-none border-0 outline-none inline-flex h-10 items-center gap-2 rounded-full bg-[#EE3A1A] px-5.5 py-3.25 text-xs font-extrabold text-white transition hover:bg-[#d83214]"
                            >
                                <Image
                                    src="/icons/ticket.svg"
                                    alt=""
                                    width={14}
                                    height={14}
                                />
                                Buy tickets
                            </button>

                            <button
                                type="button"
                                className="appearance-none border-0 outline-none inline-flex h-10 items-center rounded-full bg-white/10 px-5.5 py-3.25 text-xs font-extrabold text-white backdrop-blur transition hover:bg-white/20"
                            >
                                All sessions
                            </button>
                        </div>
                    </div>

                    <div className="mt-[108.5px] flex items-center gap-8.5">
                        <div className="flex flex-1 gap-2">
                            {movies.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`Show movie ${index + 1}`}
                                    className="group flex-1 py-2"
                                >
                                    <span
                                        className={`block h-0.5 w-full rounded-full transition-colors ${index === activeIndex
                                            ? "bg-[#EE3A1A]"
                                            : "bg-white group-hover:bg-white/70"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-2.5">
                            <button
                                type="button"
                                onClick={goPrev}
                                aria-label="Previous movie"
                                className="flex h-13.5 w-13.5 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
                            >
                                <Image
                                    src="/icons/arrow-left.svg"
                                    alt=""
                                    width={8.5}
                                    height={16}
                                />
                            </button>
                            <button
                                type="button"
                                onClick={goNext}
                                aria-label="Next movie"
                                className="flex h-13.5 w-13.5 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
                            >
                                <Image
                                    src="/icons/arrow-right.svg"
                                    alt=""
                                    width={8.5}
                                    height={17}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="absolute top-0 left-0 right-0 z-20">
                <Navbar />
            </div>
        </div>
    );
}
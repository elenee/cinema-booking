"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/api/types";

interface SearchDropdownProps {
    query: string;
    results: Movie[];
    isSearching: boolean;
    hasSearched: boolean;
    onSelect: () => void;
}

export function SearchDropdown({
    query,
    results,
    isSearching,
    hasSearched,
    onSelect,
}: SearchDropdownProps) {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
        return (
            <div className="flex flex-col items-center gap-5 bg-background py-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface">
                    <Image src="/icons/popcorn.svg" alt="" width={18} height={19} />
                </div>

                <div className="flex flex-col items-center gap-1.5">
                    <p className="text-body-m text-white">
                        What do you want to watch?
                    </p>
                    <p className="text-label-m text-text-muted">
                        Search by title, director or cast
                    </p>
                </div>

                <Link
                    href="/sessions"
                    className="rounded-full bg-surface px-5.5 py-3.25 text-button text-white"
                >
                    Browse all sessions
                </Link>
            </div>
        );
    }

    return (
        <div className="p-2.5">
            <div className="flex items-center justify-between px-2.5 py-3">
                <span className="text-label-m text-text-muted">
                    FILMS &amp; EVENTS
                </span>

                {!isSearching && hasSearched && (
                    <span className="text-body-s text-text-muted">
                        {results.length} {results.length === 1 ? "result" : "results"}
                    </span>
                )}
            </div>

            {isSearching && (
                <p className="px-2.5 py-4 text-body-s text-text-muted">
                    Searching...
                </p>
            )}

            {!isSearching && hasSearched && results.length === 0 && (
                <div className="flex flex-col items-center gap-5 px-4 py-10 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface">
                        <Image src="/icons/search-icon.svg" alt="" width={18} height={19} />
                    </div>

                    <p className="text-body-m text-white">
                        No results for “{trimmedQuery}”
                    </p>
                    <p className="text-label-m text-text-muted">
                        Check the spelling or try another film or live event.
                    </p>

                    <Link
                        href="/sessions"
                        className="rounded-full bg-surface px-5.5 py-3.25 text-button text-white"
                    >
                        Browse all sessions
                    </Link>
                </div>
            )}

            {!isSearching && hasSearched && results.map((movie) => (
                <Link
                    key={movie.id}
                    href={`/movies/${movie.slug}`}
                    onClick={onSelect}
                    className="flex items-center justify-between gap-3.5 rounded-[10px] px-2.5 py-2 transition hover:bg-white/10"
                >
                    <div className="flex min-w-0 items-center gap-3.5">
                        <Image
                            src={movie.posterUrl}
                            alt=""
                            width={40}
                            height={56}
                            className="h-14 w-10 shrink-0 rounded object-cover"
                        />

                        <div className="flex min-w-0 flex-col gap-0.75">
                            <span className="line-clamp-2 text-label-m text-white">
                                {movie.title}
                            </span>
                            <p className="text-body-s text-text-muted">
                                {movie.kind.charAt(0).toUpperCase() + movie.kind.slice(1)}
                                {" · "}{movie.ageRating.code}
                                {" · "}{movie.runtimeMinutes} min
                            </p>
                        </div>
                    </div>

                    <p className={`shrink-0 text-label-m ${
                        movie.isComingSoon ? "text-warning" : "text-white"
                    }`}>
                        {movie.isComingSoon
                            ? "Coming Soon"
                            : `From ₾${movie.fromPrice}`}
                    </p>
                </Link>
            ))}
        </div>
    );
}
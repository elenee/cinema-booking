"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Movie } from "@/lib/api/types";
import { searchMovies } from "@/lib/api/movies";
import { SearchDropdown } from "./SearchDropDown";

export function NavbarSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Movie[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const trimmedQuery = query.trim();
        let cancelled = false;

        if (!trimmedQuery) {
            setResults([]);
            setIsSearching(false);
            setHasSearched(false);
            return;
        }

        const timeout = setTimeout(async () => {
            setIsSearching(true);
            setHasSearched(false);

            try {
                const movies = await searchMovies(trimmedQuery);

                if (!cancelled) {
                    setResults(movies);
                    setHasSearched(true);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to search movies:", error);
                    setResults([]);
                    setHasSearched(true);
                }
            } finally {
                if (!cancelled) setIsSearching(false);
            }
        }, 300);

        return () => {
            cancelled = true;
            clearTimeout(timeout);
        };
    }, [query]);

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    function closeSearch() {
        setIsOpen(false);
        setQuery("");
    }

    return (
        <div ref={searchRef} className="relative w-95">
            <div className={`absolute right-0 top-0 z-20 transition-[width] duration-300 ${isOpen ? "w-120" : "w-95"
                }`}>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2.5 hover:border hover:border-white/10 focus-within:border focus-within:border-white/10">
                    <Image
                        src="/icons/search-icon.svg"
                        alt=""
                        width={14}
                        height={14}
                    />

                    <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onFocus={() => setIsOpen(true)}
                        onKeyDown={(event) => {
                            if (event.key === "Escape") {
                                setIsOpen(false);
                                event.currentTarget.blur();
                            }
                        }}
                        placeholder="Search films and live events"
                        aria-label="Search films and live events"
                        aria-expanded={isOpen}
                        className="min-w-0 flex-1 bg-transparent text-body-m text-white outline-none placeholder:text-white/60 focus:placeholder:text-text-disabled"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery("");
                                setIsOpen(true);
                            }}
                            aria-label="Clear search"
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg leading-none text-white/60 transition hover:text-white"
                        >
                            ×
                        </button>
                    )}
                </div>

                {isOpen && (
                    <div className="absolute left-0 top-full mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-background shadow-xl">
                        <SearchDropdown
                            query={query}
                            results={results}
                            isSearching={isSearching}
                            hasSearched={hasSearched}
                            onSelect={closeSearch}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
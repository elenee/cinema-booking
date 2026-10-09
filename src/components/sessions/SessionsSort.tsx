"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SessionsSortProps {
    sort: string;
}

const sortOptions = [
    { value: "time_asc", label: "Showtime: Earliest First" },
    { value: "time_desc", label: "Showtime: Latest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "title_asc", label: "Title: A–Z" },
];

export function SessionsSort({ sort }: SessionsSortProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel = sortOptions.find((o) => o.value === sort)?.label;

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (!dropdownRef.current?.contains(e.target as Node)) setIsOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    function handleSortChange(value: string) {
        const params = new URLSearchParams(searchParams.toString());

        params.set("sort", value);
        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
        setIsOpen(false);
    }

    return (
        <div className="relative flex items-center gap-2">
            <span className="text-body-m text-text-muted">Sort:</span>

            <div ref={dropdownRef} className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    className="flex items-center gap-2 text-button text-white outline-none"
                >
                    <span>{selectedLabel}</span>
                    <Image
                        src="/icons/arrow-down.svg"
                        alt=""
                        width={16}
                        height={16}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>

                {isOpen && (
                    <ul
                        role="listbox"
                        className="absolute right-0 top-full z-50 mt-3 min-w-65 overflow-hidden rounded-xl border border-white/10 bg-surface py-1 shadow-xl"
                    >
                        {sortOptions.map((option) => (
                            <li
                                key={option.value}
                                role="option"
                                aria-selected={option.value === sort}
                                onClick={() => handleSortChange(option.value)}
                                className={`cursor-pointer px-4 py-3 text-button text-white transition-colors hover:bg-white/10 ${option.value === sort ? "bg-white/10" : ""
                                    }`}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
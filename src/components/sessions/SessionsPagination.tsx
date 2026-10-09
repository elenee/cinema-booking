"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SessionsPaginationProps {
    currentPage: number;
    lastPage: number;
}

type PageItem = number | "ellipsis-start" | "ellipsis-end";

function getPageItems(currentPage: number, lastPage: number): PageItem[] {
    if (lastPage <= 5) {
        return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, "ellipsis-end", lastPage];
    }

    if (currentPage >= lastPage - 2) {
        return [1, "ellipsis-start", lastPage - 2, lastPage - 1, lastPage];
    }

    return [
        1,
        "ellipsis-start",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis-end",
        lastPage,
    ];
}

const arrowButtonClass =
    "flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-white/10";

export function SessionsPagination({
    currentPage,
    lastPage,
}: SessionsPaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function goToPage(page: number) {
        if (page < 1 || page > lastPage || page === currentPage) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }

    if (lastPage <= 1) {
        return null;
    }

    const items = getPageItems(currentPage, lastPage);

    return (
        <nav
            aria-label="Sessions pagination"
            className="mt-8 flex items-center justify-center gap-4"
        >
            <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={arrowButtonClass}
            >
                <Image
                    src="/icons/arrow-left.svg"
                    alt=""
                    width={4}
                    height={8}
                />
            </button>

            {items.map((item) => {
                if (typeof item === "string") {
                    return (
                        <span
                            key={item}
                            aria-hidden="true"
                            className="flex h-12 w-12 items-center justify-center text-text-muted"
                        >
                            …
                        </span>
                    );
                }

                const isActive = item === currentPage;

                return (
                    <button
                        key={item}
                        type="button"
                        onClick={() => goToPage(item)}
                        aria-label={`Page ${item}`}
                        aria-current={isActive ? "page" : undefined}
                        disabled={isActive}
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition disabled:cursor-default ${
                            isActive
                                ? "bg-[#F03214] text-white"
                                : "text-text-muted hover:text-white"
                        }`}
                    >
                        {item}
                    </button>
                );
            })}

            <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === lastPage}
                aria-label="Next page"
                className={arrowButtonClass}
            >
                <Image
                    src="/icons/arrow-right.svg"
                    alt=""
                    width={4}
                    height={8}
                />
            </button>
        </nav>
    );
}
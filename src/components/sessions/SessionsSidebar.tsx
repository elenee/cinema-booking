"use client";

import type { FilterOptions } from "@/lib/api/types";
import { SessionsDateSelector } from "./SessionsDateSelector";
import { FilterSection } from "./FilterSection";
import { useRouter, useSearchParams } from "next/navigation";

interface SessionsSidebarProps {
    selectedDate: string;
    filterOptions: FilterOptions;
}

const FILTER_PARAMS = ["venues", "formats", "languages", "bands"] as const;

export function SessionsSidebar({
    selectedDate,
    filterOptions,
}: SessionsSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const activeFilterCount = FILTER_PARAMS.reduce(
        (count, param) => count + searchParams.getAll(param).length,
        0
    );

    function clearAllFilters() {
        const params = new URLSearchParams(searchParams.toString());

        FILTER_PARAMS.forEach((param) => params.delete(param));
        params.delete("search");
        params.delete("sort");
        params.delete("page");

        const query = params.toString();
        router.push(query ? `/sessions?${query}` : "/sessions");
    }

    return (
        <aside className="sticky h-fit w-full rounded-2xl bg-surface p-6 flex flex-col gap-6">
            <h3 className="text-h3 text-white">Filters</h3>


            <FilterSection
                title="Venue"
                options={filterOptions.venues}
                paramName="venues"
            />

            <SessionsDateSelector selectedDate={selectedDate} />

            <FilterSection
                title="Format"
                options={filterOptions.formats}
                paramName="formats"
            />

            <FilterSection
                title="Language"
                options={filterOptions.languages}
                paramName="languages"
            />

            <FilterSection
                title="Time of Day"
                options={filterOptions.timeBands}
                paramName="bands"
            />

            <div className="flex flex-col gap-3">
                <button
                    type="button"
                    onClick={clearAllFilters}
                    hidden={activeFilterCount === 0}
                    className="text-label-s text-white rounded-full border border-text-muted px-3 py-2 cursor-pointer"
                >
                    Clear All Filters
                </button>

                <span className="text-label-s text-text-muted text-center">
                    {activeFilterCount}{" "}
                    {activeFilterCount === 1 ? "Filter" : "Filters"} Active
                </span>
            </div>
        </aside>
    );
}
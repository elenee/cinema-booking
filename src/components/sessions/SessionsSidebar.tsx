import type { FilterOptions } from "@/lib/api/types";
import { SessionsDateSelector } from "./SessionsDateSelector";

interface SessionsSidebarProps {
    selectedDate: string;
    filterOptions: FilterOptions;
}

type FilterItem =
    | FilterOptions["venues"][number]
    | FilterOptions["formats"][number]
    | FilterOptions["languages"][number]
    | FilterOptions["timeBands"][number];

interface FilterSectionProps {
    title: string;
    options: FilterItem[];
    showCity?: boolean;
}

function FilterSection({
    title,
    options,
    showCity = false,
}: FilterSectionProps) {
    return (
        <section className="flex flex-col gap-3 border-b border-border pb-6">
            <h3 className="text-overline text-text-muted">{title}</h3>

            <div className="flex flex-col gap-3">
                {options.map((option) => (
                    <label
                        key={option.id}
                        className="flex cursor-pointer items-center gap-3 text-label-m text-white"
                    >
                        <input type="checkbox" className="peer sr-only" />

                        <input type="checkbox" className="peer sr-only" />

                        <span className="flex size-4 shrink-0 items-center justify-center rounded-sm border border-text-disabled bg-transparent peer-checked:border-primary peer-checked:bg-primary [&_img]:hidden peer-checked:[&_img]:block">
                            <img src="/icons/success.svg" alt="" className="size-3" />
                        </span>

                        <span className="flex flex-wrap items-baseline gap-1.25">
                            {"city" in option ? (
                                <>
                                    <span className="text-label-m">{option.name}</span>
                                    <span>·</span>
                                    <span className="text-body-s text-text-muted">
                                        {option.city}
                                    </span>
                                </>
                            ) : "label" in option ? (
                                <>
                                    <span className="text-label-m">
                                        {option.label.split(" (")[0]}
                                    </span>
                                    <span>·</span>
                                    <span className="text-body-s text-text-muted">
                                        ({option.label.split(" (")[1]}
                                    </span>
                                </>
                            ) : (
                                <span className="text-label-m">{option.name}</span>
                            )}
                        </span>
                    </label>
                ))}
            </div>
        </section>
    );
}

export function SessionsSidebar({
    selectedDate,
    filterOptions,
}: SessionsSidebarProps) {
    return (
        <aside className="sticky h-fit w-full rounded-2xl bg-surface p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-h3 text-white">Filters</h3>

                <button
                    type="button"
                    disabled
                    className="text-xs text-text-muted"
                >
                    Clear All Filters
                </button>
            </div>

            <FilterSection
                title="Venue"
                options={filterOptions.venues}
                showCity
            />

            <section className="py-5">
                <SessionsDateSelector selectedDate={selectedDate} />
            </section>

            <FilterSection
                title="Format"
                options={filterOptions.formats}
            />

            <FilterSection
                title="Language"
                options={filterOptions.languages}
            />

            <FilterSection
                title="Time of Day"
                options={filterOptions.timeBands}
            />


            <span className="text-label-s text-text-muted mt-15.25 text-center">
                0 Filters Active
            </span>
        </aside>
    );
}
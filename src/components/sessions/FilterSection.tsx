"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { FilterOptions } from "@/lib/api/types";

type FilterItem =
    | FilterOptions["venues"][number]
    | FilterOptions["formats"][number]
    | FilterOptions["languages"][number]
    | FilterOptions["timeBands"][number];

interface FilterSectionProps {
    title: string;
    options: FilterItem[];
    paramName: "venues" | "formats" | "languages" | "bands";
}

function getOptionValue(option: FilterItem): string {
    return "slug" in option ? option.slug : String(option.id);
}

export function FilterSection({
    title,
    options,
    paramName,
}: FilterSectionProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function toggleOption(value: string, checked: boolean) {
        const params = new URLSearchParams(searchParams.toString());
        const currentValues = params.getAll(paramName);

        params.delete(paramName);

        const nextValues = checked
            ? [...currentValues, value]
            : currentValues.filter((item) => item !== value);

        nextValues.forEach((item) => params.append(paramName, item));
        params.delete("page");

        router.push(`/sessions?${params.toString()} `);
    }

    return (
        <section className="flex flex-col gap-3 border-b border-border pb-6">
            <h3 className="text-overline text-text-muted">{title}</h3>

            <div className="flex flex-col gap-3">
                {options.map((option) => {
                    const value = getOptionValue(option);
                    const checked = searchParams.getAll(paramName).includes(value);

                    return (
                        <label
                            key={option.id}
                            className="flex cursor-pointer items-center gap-3 text-label-m text-white"
                        >
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={checked}
                                onChange={(event) =>
                                    toggleOption(value, event.target.checked)
                                }
                            />

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
                                            {option.label.split(" (")[1]}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-label-m">{option.name}</span>
                                )}
                            </span>
                        </label>
                    );
                })}
            </div>
        </section>
    );
}
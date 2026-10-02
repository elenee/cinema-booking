import { useQuery } from "@tanstack/react-query";
import { getFilterOptions } from "@/lib/api/filter-options";

export function useFilterOptions() {
    return useQuery({
        queryKey: ["filter-options"],
        queryFn: getFilterOptions,
    });
}
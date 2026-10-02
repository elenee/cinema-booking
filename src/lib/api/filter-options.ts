import { api } from "./client";
import type { ApiResponse, FilterOptions } from "./types";

export async function getFilterOptions() {
  const response = await api.get<ApiResponse<FilterOptions>>(
    "/filter-options",
  );

  return response.data.data;
}
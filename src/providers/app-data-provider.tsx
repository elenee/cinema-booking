"use client";

import { useFilterOptions } from "@/hooks/use-filter-options";

export function AppDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useFilterOptions();

  return children;
}
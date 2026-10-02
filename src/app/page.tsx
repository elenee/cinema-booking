"use client";

import { useFilterOptions } from "@/hooks/use-filter-options";

export default function Home() {
  const { data, isLoading, error } = useFilterOptions();

  if (isLoading) {
    return <main>Loading...</main>;
  }

  if (error) {
    return <main>Failed to load filter options.</main>;
  }

  return (
    <main>
      <h1>{data?.venues.length} venues</h1>
      <p>{data?.formats.length} formats</p>
      <p>{data?.languages.length} languages</p>
      <p>Max seats: {data?.maxSeatsPerOrder}</p>
      <p>Hold: {data?.holdMinutes} minutes</p>
    </main>
  );
}
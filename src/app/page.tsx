import { Hero } from "@/components/home/Hero";
import { Navbar } from "@/components/layout/navbar";
import { getFeaturedMovies } from "@/lib/api/movies";

export default async function Home() {
  const movies = await getFeaturedMovies()

  return (
    <main>
      <Hero movies={movies} />
    </main>
  );
}
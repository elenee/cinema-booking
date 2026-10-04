import { Hero } from "@/components/home/Hero";
import { NowPlaying } from "@/components/home/NowPlaying";
import { Navbar } from "@/components/layout/navbar";
import { getFeaturedMovies, getNowPlayingMovies } from "@/lib/api/movies";

export default async function Home() {
  const [featuredMovies, nowPlayingMovies] = await Promise.all([
    getFeaturedMovies(),
    getNowPlayingMovies(),
  ]);

  return (
    <main>
      <Hero movies={featuredMovies} />
      <NowPlaying movies={nowPlayingMovies} />
    </main>
  );
}
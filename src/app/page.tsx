import { ComingSoon } from "@/components/home/ComingSoon";
import { Hero } from "@/components/home/Hero";
import { NowPlaying } from "@/components/home/NowPlaying";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { getComingSoonMovies, getFeaturedMovies, getNowPlayingMovies } from "@/lib/api/movies";

export default async function Home() {
  const [featuredMovies, nowPlayingMovies, comingSoonMovies] = await Promise.all([
    getFeaturedMovies(),
    getNowPlayingMovies(),
    getComingSoonMovies()
  ]);

  return (
    <main>
      <Hero movies={featuredMovies} />
      <RecentlyViewed />
      <NowPlaying movies={nowPlayingMovies} />
      <ComingSoon movies={comingSoonMovies} />
    </main>
  );
}
import Image from "next/image";
import Link from "next/link";

export interface RecentlyViewedMovie {
  id: string | number;
  slug: string;
  title: string;
  posterUrl: string;
  genre: string;
  runtimeMinutes: number;
  ageRating: string;
}

interface RecentlyViewedCardProps {
  movie: RecentlyViewedMovie;
}

export function RecentlyViewedCard({ movie }: RecentlyViewedCardProps) {
  return (
    <Link
      href={`/movies/${movie.slug}`}
      className="flex items-center h-21.75 w-80 shrink-0 gap-3 overflow-hidden rounded-2xl bg-surface p-2.5 hover:border hover:border-[#242538]"
    >
      <div className="relative h-full w-20.5 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-col items-start gap-1">
        <h3 className="line-clamp-2 text-button text-white">
          {movie.title}
        </h3>

        <p className="text-body-s text-text-muted">
          {movie.genre && `${movie.genre} · `}
          {movie.runtimeMinutes} min
        </p>

        <span className="inline-flex items-center rounded-full bg-primary/15 px-1.75 py-1 text-body-s text-primary">
          {movie.ageRating}
        </span>
      </div>
    </Link>
  );
}
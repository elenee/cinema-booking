import { notFound } from "next/navigation";
import { MovieHero } from "@/components/movie/MovieHero";
import { getMovieBySlug, getMovieSessions } from "@/lib/api/movies";
import { MovieSessions } from "@/components/movie/MovieSessions";
import { MovieDetails } from "@/components/movie/MovieDetails";
import { TrackRecentlyViewed } from "@/components/movie/TrackRecentlyViewed";

interface MoviePageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ date?: string }>;
}

function toDateKey(d: Date) {
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${d.getFullYear()}-${m}-${day}`;
}

function getNextSevenDates() {
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return toDateKey(d);
    });
}

function countSessions(venues: Awaited<ReturnType<typeof getMovieSessions>>) {
    return venues.reduce(
        (total, venue) => total + venue.sessions.length,
        0
    );
}

export default async function MoviePage({
    params,
    searchParams,
}: MoviePageProps) {
    const { slug } = await params;
    const { date } = await searchParams;

    const today = toDateKey(new Date());
    const selectedDate = date ?? today;

    const dates = getNextSevenDates();

    const [movie, selectedDayVenues, sevenDayVenues] = await Promise.all([
        getMovieBySlug(slug).catch(() => null),

        getMovieSessions(slug, selectedDate).catch(() => []),

        Promise.all(
            dates.map((date) =>
                getMovieSessions(slug, date).catch(() => [])
            )
        ),
    ]);

    if (!movie) {
        notFound();
    }

    const totalSessions = sevenDayVenues.reduce(
        (total, venues) => total + countSessions(venues),
        0
    );

    return (
        <main className="bg-background">
            <MovieHero movie={movie} />
            <TrackRecentlyViewed movie={movie} />

            <div className="grid grid-cols-1 gap-10 px-12.75 py-8 lg:grid-cols-[minmax(0,1fr)_350px]">
                <MovieSessions
                    slug={slug}
                    movieTitle={movie.title}
                    venues={selectedDayVenues}
                    selectedDate={selectedDate}
                    totalSessions={totalSessions}
                />

                <MovieDetails movie={movie} />
            </div>
        </main>
    );
}
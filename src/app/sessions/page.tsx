import { getSessions } from "@/lib/api/sessions";
import { SessionMovieRow } from "@/components/sessions/SessionMovieRow";

export default async function SessionsPage() {
    const response = await getSessions();

    return (
        <main className="min-h-screen bg-background px-12.75 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold uppercase text-white">
                    Sessions
                </h1>

                <p className="mt-2 text-sm text-text-muted">
                    Browse showtimes across all venues
                </p>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">
                    Showing {response.meta.totalSessions} sessions
                </span>
            </div>

            <div>
                {response.data.map((group) => (
                    <SessionMovieRow
                        key={group.movie.id}
                        group={group}
                    />
                ))}
            </div>
        </main>
    );
}
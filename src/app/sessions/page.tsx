import { getSessions } from "@/lib/api/sessions";
import { SessionMovieRow } from "@/components/sessions/SessionMovieRow";
import { SessionsSidebar } from "@/components/sessions/SessionsSidebar";
import { getFilterOptions } from "@/lib/api/filter-options";

interface SessionsPageProps {
    searchParams: Promise<{
        date?: string;
        page?: string;
    }>;
}

function getTodayDateKey() {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Tbilisi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(new Date());

    const values = Object.fromEntries(
        parts.map((part) => [part.type, part.value])
    );

    return `${values.year}-${values.month}-${values.day}`;
}

export default async function SessionsPage({
    searchParams,
}: SessionsPageProps) {
    const { date, page } = await searchParams;
    const selectedDate = date ?? getTodayDateKey();

    const [response, filterOptions] = await Promise.all([
        getSessions({
            date: selectedDate,
            page: page ? Number(page) : 1,
        }),
        getFilterOptions(),
    ]);
    return (
        <main className="min-h-screen bg-background px-12.75 py-10 pt-32.5">
            <h1 className="text-2xl font-extrabold uppercase text-white">
                Sessions
            </h1>
            <div className="grid grid-cols-[280px_minmax(0,1fr)] items-start gap-8">
                <SessionsSidebar selectedDate={selectedDate} filterOptions={filterOptions} />

                <section className="min-w-0">
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
                </section>
            </div>
        </main>
    );
}
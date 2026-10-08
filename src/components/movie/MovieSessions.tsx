import Link from "next/link";
import { SessionCard } from "./SessionCard";
import { MovieSession, VenueSessions } from "@/lib/api/types";

interface MovieSessionsProps {
    slug: string;
    venues: VenueSessions[];
    selectedDate: string;
    totalSessions: number;
}

function getNextSevenDays() {
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        return {
            key,
            weekday: d.toLocaleString("en-US", { weekday: "short" }),
            day: d.getDate(),
        };
    });
}

function groupByHall(sessions: MovieSession[]) {
    const halls = new Map<string, MovieSession[]>();

    for (const session of sessions) {
        const list = halls.get(session.hall.name) ?? [];
        list.push(session);
        halls.set(session.hall.name, list);
    }

    return halls;
}


export function MovieSessions({ slug, venues, selectedDate, totalSessions }: MovieSessionsProps) {
    console.log(JSON.stringify(venues[0], null, 2));

    const days = getNextSevenDays();
    const selectedDayTotal = venues.flatMap((v) => v.sessions).length;

    return (
        <section>
            <h2 className="text-h2 text-white">Sessions</h2>
            <p className="mt-1.75 text-body-s text-text-muted">
                {totalSessions} sessions over the next {days.length} days
            </p>

            <div className="mt-3.5 flex gap-2">
                {days.map((d) => (
                    <Link
                        key={d.key}
                        href={`/movies/${slug}?date=${d.key}`}
                        scroll={false}
                        className={`flex h-20 w-20 flex-col items-center justify-center rounded-2xl text-[10px] font-bold transition ${d.key === selectedDate
                            ? "bg-[#EE3A1A] text-white"
                            : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                    >
                        <span className="text-label-s">{d.weekday}</span>
                        <span className="text-h3 mt-1.5">{d.day}</span>
                    </Link>
                ))}
            </div>

            <div className="mt-6.75 flex flex-col gap-6">
                {venues.map(({ venue, sessions }) => (
                    <div key={venue.id}>
                        <h3 className="mb-3 text-button font-bold text-white">
                            {venue.name}
                        </h3>

                        <div className="flex flex-wrap gap-2.5">
                            {[...groupByHall(sessions)].map(([hallName, hallSessions]) => (
                                <div
                                    key={hallName}
                                    className="rounded-2xl bg-white/10 p-3.75"
                                >
                                    <p className="text-label-s mb-2.25 text-white">
                                        Hall {hallName}
                                    </p>
                                    <div className="flex gap-2">
                                        {hallSessions.map((session) => (
                                            <SessionCard
                                                key={session.id}
                                                session={session}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {selectedDayTotal === 0 && (
                    <p className="text-xs text-text-muted">
                        No sessions on this day.
                    </p>
                )}
            </div>
        </section>
    );
}
import type { MovieSession } from "@/lib/api/types";

interface SessionCardProps {
    session: MovieSession;
}

export function SessionCard({ session }: SessionCardProps) {

    const hasStarted = new Date(session.startsAt) <= new Date();
    const isUnavailable = session.isSoldOut || hasStarted;
    return (
        <button
            type="button"
            disabled={isUnavailable}
            className={`flex shrink-0 flex-col gap-3 p-3.75 min-w-65 overflow-hidden rounded-2xl bg-surface text-white ${isUnavailable
                ? "cursor-not-allowed opacity-40"
                : "cursor-pointer"
                }`}
        >
            <div className="flex justify-between">
                <span className="text-h3">
                    {session.time}
                </span>
                <span className="rounded-full bg-border px-2.5 py-1.25 text-label-s text-white">
                    {session.format.name}
                </span>
            </div>

            <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center">
                    <span className="text-body-s text-text-muted">
                        {session.language.code}
                    </span>

                    {hasStarted ? (
                        <span className="text-label-s text-text-muted">
                            Started
                        </span>
                    ) : session.isSoldOut ? (
                        <span className="text-label-s text-primary">
                            Sold out
                        </span>
                    ) : (
                        <span
                            className={`text-label-s ${session.seatsLeft <= 5
                                ? "text-primary"
                                : "text-green-500"
                                }`}
                        >
                            {session.seatsLeft} left
                        </span>
                    )}

                </div>
                <div className="flex justify-between items-center">
                    <span className="text-label-s text-white">
                        {session.venue.name} · Hall {session.hall.name}
                    </span>
                    <span className="text-button text-white">
                        ₾ {session.price}
                    </span>
                </div>
            </div>
        </button>
    );
}
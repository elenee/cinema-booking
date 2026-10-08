import type { MovieSession } from "@/lib/api/types";

interface SessionCardProps {
    session: MovieSession;
}

export function SessionCard({ session }: SessionCardProps) {
    return (
        <button
            type="button"
            disabled={session.isSoldOut}
            className="flex min-w-65 overflow-hidden rounded-xl bg-background text-white transition hover:ring-1 hover:ring-white/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <div className="flex flex-1 flex-col items-start justify-center gap-1 px-5 py-3">
                <span className="text-sm font-bold">
                    {session.time}
                </span>

                <div className="flex items-center gap-1.5 text-[9px] text-text-muted">
                    <span className="uppercase">
                        {session.language.code}
                    </span>

                    <span className="rounded-full bg-white/10 px-2 py-0.5 font-bold uppercase text-white">
                        {session.format.name}
                    </span>
                </div>

                <span className="text-[10px] text-text-muted">
                    {session.venue.name} · Hall {session.hall.name}
                </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 border-l border-dashed border-white/30 px-4">
                <span className="text-sm font-bold text-[#EE3A1A]">
                    ₾ {session.price}
                </span>

                <span className="text-[9px] text-text-muted">
                    {session.isSoldOut
                        ? "Sold out"
                        : `${session.seatsLeft} left`}
                </span>
            </div>
        </button>
    );
}
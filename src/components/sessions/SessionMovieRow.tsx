import Image from "next/image";
import type { SessionsGroup } from "@/lib/api/types";
import { SessionCard } from "./SessionCard";

interface SessionMovieRowProps {
    group: SessionsGroup;
}

export function SessionMovieRow({ group }: SessionMovieRowProps) {
    const { movie, sessions } = group;

    return (
        <section className="flex gap-6 border-b border-white/10 py-6">
            <div className="flex w-65 shrink-0 gap-4">
                <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    width={120}
                    height={180}
                    className="h-45 w-30 rounded-lg object-cover"
                />

                <div className="flex flex-col gap-2">
                    <h2 className="text-base font-bold text-white">
                        {movie.title}
                    </h2>

                    <span className="w-fit rounded bg-white/10 px-2 py-1 text-xs font-bold text-white">
                        {movie.ageRating.code}
                    </span>

                    <span className="text-xs text-text-muted">
                        {movie.runtimeMinutes} min
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-wrap content-start gap-3">
                {sessions.map((session) => (
                    <SessionCard
                        key={session.id}
                        session={session}
                    />
                ))}
            </div>
        </section>
    );
}
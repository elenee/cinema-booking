import Image from "next/image";
import type { Movie, SessionsGroup } from "@/lib/api/types";
import { SessionCard } from "./SessionCard";

interface SessionMovieRowProps {
    group: SessionsGroup;
}

export function SessionMovieRow({ group }: SessionMovieRowProps) {
    const { movie, sessions } = group;

    return (
        <section className="flex flex-col justify-center gap-3.5 py-8 first:pt-0">
            <div className="flex gap-4 items-center">
                <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    width={56}
                    height={80}
                    className="h-20 w-14 rounded-lg object-cover"
                />

                <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                        <h3 className="text-h3 text-white">
                            {movie.title}
                        </h3>

                        <span className="inline-flex h-6 items-center rounded-full bg-primary/15 px-2 py-1 text-label-s text-primary">
                            {movie.ageRating.code}
                        </span>
                    </div>

                    <span className="text-body-m text-text-muted">
                        {movie.runtimeMinutes} min
                    </span>
                </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
                {sessions.map((session) => (
                    <SessionCard
                        key={session.id}
                        session={session}
                        movie={movie}
                    />
                ))}
            </div>
        </section >
    );
}
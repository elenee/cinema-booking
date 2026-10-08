import type { MovieDetail } from "@/lib/api/types";

interface MovieDetailsProps {
    movie: MovieDetail;
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-label-s uppercase text-text-muted">
                {label}
            </p>
            <p className="mt-1 text-label-m text-white">{value}</p>
        </div>
    );
}

export function MovieDetails({ movie }: MovieDetailsProps) {
    console.log(JSON.stringify({ director: movie.director, cast: movie.cast }, null, 2));
    const releaseDate = new Date(movie.releaseDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <aside className="flex flex-col gap-4.25">
            <h2 className="text-h2 text-white">Details</h2>

            <Row label="Director" value={movie.director} />
            <Row label="Main cast" value={movie.cast} />
            <Row label="Duration" value={`${movie.runtimeMinutes} minutes`} />
            <Row label="Release date" value={releaseDate} />
            <Row
                label="Formats"
                value={movie.formats.map((f) => f.name).join(", ")}
            />
            <Row label="From" value={`₾ ${movie.fromPrice}`} />

            <div className="rounded-xl bg-warning/10 py-3 px-3.25 text-warning">
                <p className="mb-1 text-label-s uppercase">Rating note</p>
                <p>
                    <span className="mr-2 text-body-s font-bold">{movie.ageRating.code}</span>
                    {movie.ageRating.description}
                </p>
            </div>
        </aside>
    );
}
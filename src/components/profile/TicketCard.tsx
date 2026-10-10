import type { TicketOrder } from "@/lib/api/types";
import Image from "next/image";

interface TicketCardProps {
    ticket: TicketOrder;
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase text-text-muted">
                {label}
            </span>
            <span className="text-label-s font-bold text-white">{value}</span>
        </div>
    );
}

function formatDate(date: string) {
    const parsed = new Date(date);

    return parsed.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatPrice(price: number) {
    return `${price.toFixed(2)} GEL`;
}


export default function TicketCard({ ticket }: TicketCardProps) {
    return (
        <article
            key={ticket.id}
            className="flex flex-col overflow-hidden rounded-2xl bg-surface md:flex-row"
        >
            <div className="flex flex-1 gap-4 p-4">
                <div className="relative h-20 w-15 shrink-0 overflow-hidden rounded-md bg-border">
                    {ticket.session.movie.posterUrl && (
                        <Image
                            src={ticket.session.movie.posterUrl}
                            alt={ticket.session.movie.title}
                            fill
                            sizes="60px"
                            className="object-cover"
                        />
                    )}
                </div>

                <div className="flex min-w-0 flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <h3 className="text-label-l font-extrabold text-white">
                            {ticket.session.movie.title}
                        </h3>
                        {ticket.refundedAt && (
                            <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                                Refunded
                            </span>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                        <Info
                            label="Date"
                            value={`${formatDate(ticket.session.date)} · ${ticket.session.time}`}
                        />
                        <Info
                            label="Venue"
                            value={`${ticket.session.venue.name} · ${ticket.session.hall.name}`}
                        />
                        <Info
                            label="Format"
                            value={`${ticket.session.format.name} · ${ticket.session.language.name}`}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-text-muted">
                            Seats
                        </span>
                        {ticket.tickets.map((seat) => (
                            <span
                                key={seat.id}
                                className="rounded-md bg-border px-2 py-1 text-[11px] font-semibold text-white"
                            >
                                {seat.seatCode} · {seat.ticketType.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-3 border-t border-white/5 p-4 md:w-65 md:border-l md:border-t-0">
                <div>
                    <p className="text-[10px] font-bold uppercase text-text-muted">Order</p>
                    <p className="text-label-s font-bold text-white">#{ticket.reference}</p>
                </div>

                <div className="flex items-end justify-between">
                    <span className="text-label-s text-text-muted">Total paid</span>
                    <span className="text-[22px] font-extrabold text-white">
                        {formatPrice(ticket.totalPrice)}
                    </span>
                </div>
            </div>
        </article>
    )
}

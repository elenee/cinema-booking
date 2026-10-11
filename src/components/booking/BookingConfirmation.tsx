import Link from "next/link";
import type { createOrder } from "@/lib/api/booking";

type Order = Awaited<ReturnType<typeof createOrder>>;

interface BookingConfirmationProps {
    order: Order;
    onClose: () => void;
}

export function BookingConfirmation({ order, onClose }: BookingConfirmationProps) {
    const { session, tickets } = order;

    const seats = tickets.map((t) => t.seatCode).join(", ");

    const ticketCounts = tickets.reduce<Record<string, number>>((acc, t) => {
        acc[t.ticketType.name] = (acc[t.ticketType.name] ?? 0) + 1;
        return acc;
    }, {});
    const ticketsLabel = Object.entries(ticketCounts)
        .map(([name, count]) => `${count} x ${name}`)
        .join(", ");

    const when = new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
    }).format(new Date(session.startsAt));

    return (
        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 py-4 text-center text-white">
            <div className="flex size-14 items-center justify-center rounded-full bg-green-400 text-2xl text-background">
                ✓
            </div>

            <div className="space-y-2">
                <h2 id="purchase-modal-title" className="text-2xl font-extrabold">
                    Booking confirmed!
                </h2>
                <p className="text-sm text-white/60">
                    Your tickets are ready. We&apos;ve sent the confirmation to your email.
                </p>
            </div>

            <span className="rounded-full bg-white/10 px-6 py-2 text-xs font-semibold uppercase">
                Order #{order.reference}
            </span>

            <div className="w-full space-y-4 rounded-2xl bg-white/5 p-5 text-left">
                <div className="flex gap-4">
                    <img
                        src={session.movie.posterUrl}
                        alt=""
                        className="h-18 w-12 rounded-lg object-cover"
                    />
                    <div>
                        <p className="font-extrabold uppercase">{session.movie.title}</p>
                        <p className="mt-1 text-sm text-white/60">
                            {session.venue.name} · Hall {session.hall.name} · {when} · {session.time}
                        </p>
                    </div>
                </div>

                <dl className="space-y-3 border-t border-white/10 pt-4 text-sm">
                    <div className="flex justify-between gap-4">
                        <dt className="text-white/60">Seats</dt>
                        <dd className="font-semibold">{seats}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt className="text-white/60">Tickets</dt>
                        <dd className="font-semibold">{ticketsLabel}</dd>
                    </div>
                </dl>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-sm uppercase text-white/60">Total paid</span>
                    <span className="text-xl font-extrabold">₾ {order.totalPrice}</span>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                <Link
                    href="/tickets"
                    onClick={onClose}
                    className="rounded-full bg-primary px-8 py-3 font-semibold"
                >
                    View my tickets
                </Link>
                <Link
                    href="/"
                    onClick={onClose}
                    className="rounded-full bg-white/10 px-8 py-3 font-semibold"
                >
                    Back to home
                </Link>
            </div>
        </div>
    );
}
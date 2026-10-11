import type { Seat } from "@/lib/api/booking";
import type { AgeRating, TicketType } from "@/lib/api/types";

interface SelectionSummaryProps {
    selected: Seat[];
    subtotal: number;
    maxSeats: number;
    ticketTypes: TicketType[];
    getTicketTypeForSeat: (seat: Seat) => TicketType | undefined;
    getPriceForSeat: (seat: Seat) => number;
    onTicketTypeChange: (
        seatId: number,
        slug: TicketType["slug"],
    ) => void;
    onRemove: (seat: Seat) => void;
    onNext: () => void;
    selectionMessage: string | null;
    ageRating: AgeRating | null
    isTicketTypeAllowed: (
        blockedFromRatingAge: number | null,
        ageRating: AgeRating | null,
    ) => boolean;
    nextLabel?: string
    nextDisabled?: boolean
}

export function SelectionSummary({
    selected,
    subtotal,
    maxSeats,
    ticketTypes,
    getTicketTypeForSeat,
    getPriceForSeat,
    onTicketTypeChange,
    onRemove,
    onNext,
    selectionMessage,
    ageRating,
    isTicketTypeAllowed,
    nextLabel,
    nextDisabled
}: SelectionSummaryProps) {
    const canContinue = selected.length > 0 && ticketTypes.length > 0;

    return (
        <aside className="flex w-full flex-col border-t border-border pt-6 lg:w-[320px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <h3 className="font-button text-white">
                Your seats · Max {maxSeats}
            </h3>

            <p className="mt-3 text-body-s text-text-muted">
                Pick up to {maxSeats} seats. Choose a ticket type for each seat.
            </p>

            <ul className="mt-4 flex-1 space-y-3">
                {selected.map((seat) => {
                    const ticketType = getTicketTypeForSeat(seat);

                    return (
                        <li
                            key={seat.id}
                            className="rounded-lg bg-[#1A1C2E] px-3 py-3 text-sm text-white"
                        >
                            <div className="flex items-center justify-between">
                                <span>{seat.code}</span>

                                <div className="flex items-center gap-3">
                                    <span>₾{getPriceForSeat(seat).toFixed(2)}</span>

                                    <button
                                        type="button"
                                        aria-label={`Remove seat ${seat.code}`}
                                        onClick={() => onRemove(seat)}
                                        className="text-white/50 hover:text-white"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>

                            <label className="mt-2 block text-xs text-white/60">
                                Ticket type
                                <select
                                    value={ticketType?.slug ?? ""}
                                    onChange={(event) =>
                                        onTicketTypeChange(
                                            seat.id,
                                            event.target.value as TicketType["slug"],
                                        )
                                    }
                                    className="mt-1 w-full rounded-md border border-white/10 bg-[#24263A] px-3 py-2 text-sm text-white"
                                >
                                    {ticketTypes.map((type) => {
                                        const allowed = isTicketTypeAllowed(
                                            type.blockedFromRatingAge,
                                            ageRating,
                                        );
                                        console.log("Ticket restriction check:", {
                                            ticket: type.slug,
                                            blockedFromRatingAge: type.blockedFromRatingAge,
                                            ageRating,
                                        });

                                        return (
                                            <option key={type.id} value={type.slug} disabled={!allowed}>
                                                {type.name}
                                                {!allowed
                                                    ? ageRating === null
                                                        ? " - rating unavailable"
                                                        : " - not allowed for this film"
                                                    : ""}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                        </li>
                    );
                })}
            </ul>

            {selectionMessage && (
                <p role="alert" className="mt-3 text-sm text-red-400">
                    {selectionMessage}
                </p>
            )}

            <div className="mt-6 flex items-center justify-between text-white">
                <span className="text-label-s">SUBTOTAL</span>
                <span className="text-h1">₾{subtotal.toFixed(2)}</span>
            </div>

            <button
                type="button"
                disabled={!canContinue || nextDisabled}
                onClick={onNext}
                className="mt-4 rounded-full bg-primary py-3.25 text-button transition-colors disabled:cursor-not-allowed disabled:bg-[#4A4D5E] disabled:text-white/50"
            >
                {nextLabel}
            </button>
        </aside>
    );
}
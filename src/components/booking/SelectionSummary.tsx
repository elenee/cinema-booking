import { getSeatPrice, MAX_SEATS } from "@/hooks/use-seat-selection";
import { Seat } from "@/lib/api/booking";

interface SelectionSummaryProps {
    selected: Seat[];
    subtotal: number;
    onRemove: (seat: Seat) => void;
    onNext: () => void;
}

export function SelectionSummary({
    selected,
    subtotal,
    onRemove,
    onNext,
}: SelectionSummaryProps) {
    const canContinue = selected.length > 0;

    return (
        <aside className="flex flex-col border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0 w-[320px]">
            <h3 className="text-white font-button">Your seats · Max {MAX_SEATS}</h3>
            <p className="mt-3 text-body-s text-text-muted">
                Pick up to {MAX_SEATS} seats from the map. Each seat can carry its own
                ticket type.
            </p>

            <ul className="mt-4 flex-1 space-y-2">
                {selected.map((seat) => (
                    <li
                        key={seat.id}
                        className="flex items-center justify-between rounded-lg bg-[#1A1C2E] px-3 py-2 text-sm"
                    >
                        <span>{seat.code}</span>
                        <span className="flex items-center gap-3">
                            ₾{getSeatPrice(seat)}
                            <button
                                type="button"
                                aria-label={`Remove seat ${seat.code}`}
                                onClick={() => onRemove(seat)}
                                className="text-white/50 hover:text-white"
                            >
                                &times;
                            </button>
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex items-center justify-between text-white">
                <span className="text-label-s">SUBTOTAL</span>
                <span className="text-h1">₾{subtotal}</span>
            </div>

            <button
                type="button"
                disabled={!canContinue}
                onClick={onNext}
                className="mt-4 rounded-full bg-primary py-3.25 text-button transition-colors disabled:cursor-not-allowed disabled:bg-[#4A4D5E] disabled:text-white/50"
            >
                Next: Checkout
            </button>
        </aside>
    );
}
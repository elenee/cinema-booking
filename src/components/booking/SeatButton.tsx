import { Seat } from "@/lib/api/booking";

const HATCH =
    "repeating-linear-gradient(135deg, rgba(255,255,255,0.14) 0 2px, transparent 2px 6px)";

const STATE_STYLES: Record<SeatVisualState, string> = {
    available:
        "border-[#3A3D55] bg-[#1A1C2E] text-white hover:border-[#EC3013]",
    selected: "border-[#EC3013] bg-[#EC3013] text-white",
    sold: "cursor-not-allowed border-[#1E2033] bg-[#12142A] text-white/20",
    held: "cursor-not-allowed border-[#2A2C3D] bg-[#1A1C2E] text-white/30",
};

interface SeatButtonProps {
    seat: Seat;
    state: SeatVisualState;
    onToggle: (seat: Seat) => void;
}

export type SeatVisualState = "available" | "selected" | "sold" | "held";

export function SeatButton({ seat, state, onToggle }: SeatButtonProps) {
    const interactive = state === "available" || state === "selected";

    return (
        <button
            type="button"
            disabled={!interactive}
            aria-pressed={state === "selected"}
            title={`${seat.code} — ${state}`}
            onClick={() => onToggle(seat)}
            style={state === "held" ? { backgroundImage: HATCH } : undefined}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm font-bold transition-colors sm:h-10 sm:w-10 ${STATE_STYLES[state]} ${seat.aisleAfter ? "mr-3" : ""
                }`}
        >
            {seat.label}
        </button>
    );
}
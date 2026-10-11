import type { ComponentProps } from "react";
import { SeatMap } from "./SeatMap";
import { SeatLegend } from "./SeatLegend";

interface SeatsStepProps {
    seatMap: ComponentProps<typeof SeatMap>["seatMap"] | undefined;
    isPending: boolean;
    isError: boolean;
    onRetry: () => void;
    selectedIds: ComponentProps<typeof SeatMap>["selectedIds"];
    contestedSeatCodes: Set<string>;
    onToggleSeat: ComponentProps<typeof SeatMap>["onToggleSeat"];
    message: string | null;
}

export function SeatsStep({
    seatMap,
    isPending,
    isError,
    onRetry,
    selectedIds,
    contestedSeatCodes,
    onToggleSeat,
    message,
}: SeatsStepProps) {
    return (
        <>
            {isPending && <p className="py-12 text-center text-white/70">Loading seats...</p>}

            {isError && (
                <div className="py-12 text-center">
                    <p className="mb-4 text-red-400">Could not load the seat map.</p>
                    <button
                        type="button"
                        onClick={onRetry}
                        className="rounded-lg bg-primary px-5 py-2 font-semibold"
                    >
                        Try again
                    </button>
                </div>
            )}

            {seatMap && (
                <>
                    <SeatMap
                        seatMap={seatMap}
                        selectedIds={selectedIds}
                        contestedSeatCodes={contestedSeatCodes}
                        onToggleSeat={onToggleSeat}
                    />
                    <SeatLegend />
                </>
            )}

            {message && (
                <p role="alert" className="mt-3 text-sm text-red-400">
                    {message}
                </p>
            )}
        </>
    );
}
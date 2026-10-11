"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSessionSeats } from "@/lib/api/booking";
import { ModalTabs, type Step } from "./ModalTabs";
import { SeatLegend } from "./SeatLegend";
import { SelectionSummary } from "./SelectionSummary";
import { useSeatSelection } from "@/hooks/use-seat-selection";
import { SeatMap } from "./SeatMap";
import { AgeRating, MovieSession } from "@/lib/api/types";
import { getFilterOptions } from "@/lib/api/filter-options";

interface PurchaseModalProps {
    session: MovieSession | null;
    onClose: () => void;
    details?: string;
    title?: string;
    ageRating: AgeRating | null;
}

export function PurchaseModal({ session, ageRating, ...props }: PurchaseModalProps) {
    if (session === null) return null;
    const sessionId = session?.id ?? null;

    return <PurchaseModalContent key={sessionId} session={session} sessionId={sessionId} ageRating={ageRating} {...props} />;
}

function PurchaseModalContent({
    session,
    sessionId,
    onClose,
    details,
    title,
    ageRating
}: Omit<PurchaseModalProps, "session"> & {
    session: MovieSession;
    sessionId: number;
}) {
    const [step, setStep] = useState<Step>("seats");
    const { data: filterOptions } = useQuery({
        queryKey: ["filter-options"],
        queryFn: getFilterOptions,
        staleTime: Infinity,
    });

    const {
        selected,
        selectedIds,
        toggleSeat,
        subtotal,
        getTicketTypeForSeat,
        getPriceForSeat,
        setTicketTypeForSeat,
        selectionMessage,
        isTicketTypeAllowed,
    } = useSeatSelection(
        filterOptions?.ticketTypes ?? [],
        session.price,
        filterOptions?.maxSeatsPerOrder ?? 0,
    );

    const { data: seatMap, isPending, isError, refetch } = useQuery({
        queryKey: ["session-seats", sessionId],
        queryFn: () => getSessionSeats(sessionId),
    });

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(new Date(session.startsAt));

    const subtitle =
        details ??
        (seatMap
            ? `${seatMap.hall.venue.name} · Hall ${seatMap.hall.name} · ${formattedDate} · ${session.time} · ${session.format.name} · ${session.language.name}`
            : undefined);

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm "
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="purchase-modal-title"
                className="relative flex max-h-[90dvh] w-full max-w-286.5 flex-col gap-4 overflow-y-auto rounded-[28px] bg-background p-6 outline-none scrollbar-none"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close booking"
                    className="absolute right-6 top-6 text-2xl text-white/80 hover:text-white"
                >
                    &times;
                </button>

                <header>
                    <h2 id="purchase-modal-title" className="pr-10 text-xl font-semibold uppercase text-white">
                        {title}
                    </h2>
                    {subtitle && <p className="mt-2 text-sm text-white/70">{subtitle}</p>}
                </header>

                <div className="grid min-h-0 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <div>
                        <ModalTabs
                            active={step}
                            checkoutDisabled={selected.length === 0}
                            onChange={setStep}
                        />

                        {step === "seats" && (
                            <>
                                {isPending && (
                                    <p className="py-12 text-center text-white/70">Loading seats...</p>
                                )}

                                {isError && (
                                    <div className="py-12 text-center">
                                        <p className="mb-4 text-red-400">Could not load the seat map.</p>
                                        <button
                                            type="button"
                                            onClick={() => refetch()}
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
                                            onToggleSeat={toggleSeat}
                                        />
                                        <SeatLegend />
                                    </>
                                )}
                            </>
                        )}

                        {step === "checkout" && (
                            <p className="py-12 text-center text-white/70">Checkout.</p>
                        )}
                    </div>

                    <SelectionSummary
                        selected={selected}
                        subtotal={subtotal}
                        maxSeats={filterOptions?.maxSeatsPerOrder ?? 0}
                        ticketTypes={filterOptions?.ticketTypes ?? []}
                        getTicketTypeForSeat={getTicketTypeForSeat}
                        getPriceForSeat={getPriceForSeat}
                        onTicketTypeChange={(seatId, slug) =>
                            setTicketTypeForSeat(seatId, slug, ageRating ?? null)
                        }
                        onRemove={toggleSeat}
                        onNext={() => setStep("checkout")}
                        selectionMessage={selectionMessage}
                        ageRating={ageRating}
                        isTicketTypeAllowed={isTicketTypeAllowed}
                    />
                </div>
            </section>
        </div>
    );
}
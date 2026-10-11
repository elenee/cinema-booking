"use client";

import { useEffect } from "react";
import { usePurchaseFlow } from "@/hooks/use-purchase-flow";
import { ModalTabs } from "./ModalTabs";
import { ModalHeader } from "./ModalHeader";
import { SeatsStep } from "./SeatsStep";
import { CheckoutForm } from "./CheckoutForm";
import { SelectionSummary } from "./SelectionSummary";
import type { AgeRating, MovieSession } from "@/lib/api/types";
import { BookingConfirmation } from "./BookingConfirmation";


interface PurchaseModalProps {
    session: MovieSession | null;
    onClose: () => void;
    details?: string;
    title?: string;
    ageRating: AgeRating | null;
}

export function PurchaseModal({ session, ...props }: PurchaseModalProps) {
    if (session === null) return null;
    return <PurchaseModalContent key={session.id} session={session} {...props} />;
}


function PurchaseModalContent({
    session,
    onClose,
    details,
    title,
    ageRating,
}: Omit<PurchaseModalProps, "session"> & { session: MovieSession }) {
    const flow = usePurchaseFlow(session);
    const { step, setStep, filterOptions, seatQuery, selection, hold, order } = flow;
    const { data: seatMap, isPending, isError, refetch } = seatQuery;

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

    const isCheckout = step === "checkout";

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
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

                {order ? (<BookingConfirmation order={order} onClose={onClose} />) :
                    (
                        <>
                            <ModalHeader
                                title={title}
                                subtitle={subtitle}
                                secondsRemaining={isCheckout && hold ? flow.secondsRemaining : undefined}
                            />

                            <div className="grid min-h-0 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
                                <div>
                                    <ModalTabs
                                        active={step}
                                        checkoutDisabled={selection.selected.length === 0}
                                        onChange={setStep}
                                    />

                                    {step === "seats" && (
                                        <SeatsStep
                                            seatMap={seatMap}
                                            isPending={isPending}
                                            isError={isError}
                                            onRetry={() => refetch()}
                                            selectedIds={selection.selectedIds}
                                            contestedSeatCodes={flow.contestedSeatCodes}
                                            onToggleSeat={selection.toggleSeat}
                                            message={flow.holdMessage}
                                        />
                                    )}

                                    {isCheckout && hold && (
                                        <CheckoutForm
                                            onSubmit={flow.handleCreateOrder}
                                            isSubmitting={flow.orderLoading}
                                            errorMessage={flow.orderMessage}
                                        />
                                    )}
                                </div>

                                <SelectionSummary
                                    selected={selection.selected}
                                    subtotal={selection.subtotal}
                                    maxSeats={filterOptions?.maxSeatsPerOrder ?? 0}
                                    ticketTypes={filterOptions?.ticketTypes ?? []}
                                    getTicketTypeForSeat={selection.getTicketTypeForSeat}
                                    getPriceForSeat={selection.getPriceForSeat}
                                    onTicketTypeChange={(seatId, slug) =>
                                        selection.setTicketTypeForSeat(seatId, slug, ageRating ?? null)
                                    }
                                    onRemove={selection.toggleSeat}
                                    onNext={
                                        isCheckout
                                            ? () =>
                                                (document.getElementById("checkout-form") as HTMLFormElement | null)?.requestSubmit()
                                            : flow.handleCreateHold
                                    }
                                    nextLabel={isCheckout ? "Pay: Complete order" : "Next: Checkout"}
                                    nextDisabled={isCheckout && (flow.orderLoading || flow.secondsRemaining <= 0)}
                                    selectionMessage={selection.selectionMessage}
                                    ageRating={ageRating}
                                    isTicketTypeAllowed={selection.isTicketTypeAllowed}
                                />
                            </div>
                        </>
                    )}
            </section>
        </div>
    );
}
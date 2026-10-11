import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createHold, createOrder, getSessionSeats } from "@/lib/api/booking";
import { getFilterOptions } from "@/lib/api/filter-options";
import { useSeatSelection } from "@/hooks/use-seat-selection";
import type { Step } from "@/components/booking/ModalTabs"; // adjust path
import type { HoldData, MovieSession } from "@/lib/api/types";
import { CheckoutValues } from "@/components/booking/CheckoutForm";

const secondsUntil = (iso: string) =>
    Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 1000));

export function usePurchaseFlow(session: MovieSession) {
    const sessionId = session.id;
    const [step, setStep] = useState<Step>("seats");

    const { data: filterOptions } = useQuery({
        queryKey: ["filter-options"],
        queryFn: getFilterOptions,
        staleTime: Infinity,
    });

    const seatQuery = useQuery({
        queryKey: ["session-seats", sessionId],
        queryFn: () => getSessionSeats(sessionId),
    });
    const { refetch } = seatQuery;

    const selection = useSeatSelection(
        filterOptions?.ticketTypes ?? [],
        session.price,
        filterOptions?.maxSeatsPerOrder ?? 0,
    );
    const { selected, removeSeatsById, getTicketTypeForSeat } = selection;

    const [hold, setHold] = useState<HoldData | null>(null);
    const [holdLoading, setHoldLoading] = useState(false);
    const [holdMessage, setHoldMessage] = useState<string | null>(null);
    const [contestedSeatCodes, setContestedSeatCodes] = useState<Set<string>>(new Set());
    const [secondsRemaining, setSecondsRemaining] = useState(0);

    const [orderLoading, setOrderLoading] = useState(false);
    const [orderMessage, setOrderMessage] = useState<string | null>(null);

    async function handleCreateHold() {
        if (selected.length === 0 || holdLoading) return;

        setHoldLoading(true);
        setHoldMessage(null);

        try {
            const data = await createHold(sessionId, {
                seats: selected.map((seat) => ({
                    seatId: seat.id,
                    ticketType: getTicketTypeForSeat(seat)!.slug,
                })),
            });

            setHold(data);
            setSecondsRemaining(secondsUntil(data.expiresAt));
            setStep("checkout");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                const body = error.response?.data as
                    | { message?: string; contested?: string[]; errors?: unknown }
                    | undefined;

                if (status === 409) {
                    const contested = body?.contested ?? [];
                    const contestedSet = new Set(contested);

                    setContestedSeatCodes((prev) => new Set([...prev, ...contested]));
                    removeSeatsById(
                        selected.filter((s) => contestedSet.has(s.code)).map((s) => s.id),
                    );
                    await refetch();

                    setHoldMessage(
                        contested.length
                            ? `These seats were just taken: ${contested.join(", ")}. Please choose replacements.`
                            : body?.message ?? "Some seats were just taken. Please try again.",
                    );
                } else if (status === 401) {
                    setHoldMessage("Please log in to reserve seats, then try again.");
                } else if (status === 422) {
                    setHoldMessage(body?.message ?? "Your booking could not be completed.");
                } else {
                    setHoldMessage(body?.message ?? "Could not reserve these seats. Please try again.");
                }
            } else {
                setHoldMessage("Something went wrong. Please try again.");
            }
        } finally {
            setHoldLoading(false);
        }
    }

    async function handleCreateOrder(formData: CheckoutValues) {
        if (!hold || orderLoading) return;

        setOrderLoading(true);
        setOrderMessage(null);

        try {
            const order = await createOrder({ holdId: hold.holdId, ...formData });
            console.log("Order created:", order);
            // Next: show the booking confirmation.
        } catch {
            setOrderMessage("Could not complete your booking. Please try again.");
        } finally {
            setOrderLoading(false);
        }
    }

    useEffect(() => {
        if (!hold || step !== "checkout") return;

        let expired = false;

        const tick = () => {
            const remaining = secondsUntil(hold.expiresAt);
            setSecondsRemaining(remaining);

            if (remaining === 0 && !expired) {
                expired = true;
                setHold(null);
                setStep("seats");
                removeSeatsById(selected.map((s) => s.id));
                setHoldMessage("Your seat hold expired. Please select your seats again.");
                void refetch();
            }
        };

        tick();
        const interval = window.setInterval(tick, 1000);
        return () => window.clearInterval(interval);
    }, [hold, step, selected, removeSeatsById, refetch]);

    return {
        step,
        setStep,
        filterOptions,
        seatQuery,
        selection,
        hold,
        holdMessage,
        contestedSeatCodes,
        secondsRemaining,
        handleCreateHold,
        handleCreateOrder,
        orderLoading,
        orderMessage,
    };
}
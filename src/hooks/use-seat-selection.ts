import { Seat } from "@/lib/api/booking";
import type { AgeRating, TicketType } from "@/lib/api/types";
import { useCallback, useMemo, useState } from "react";

function isTicketTypeAllowed(
  blockedFromRatingAge: number | null,
  ageRating: AgeRating | null | undefined,
): boolean {
  if (blockedFromRatingAge === null) return true;
  if (!ageRating) return false;
  console.log({
    "Age Rating":
      blockedFromRatingAge,
    ageRating,
    movieMinAge: ageRating.minAge,
  });

  return ageRating.minAge < blockedFromRatingAge;
}

export function getSeatPrice(
  _seat: Seat,
  ticketType: TicketType,
  basePrice: number,
): number {
  return Math.round(basePrice * ticketType.priceRatio * 100) / 100;
}

export function useSeatSelection(
  ticketTypes: TicketType[],
  basePrice: number,
  maxSeats: number,
) {
  const [selected, setSelected] = useState<Seat[]>([]);
  const [ticketTypeBySeat, setTicketTypeBySeat] = useState<
    Record<number, TicketType["slug"]>
  >({});
  const [selectionMessage, setSelectionMessage] = useState<string | null>(null);

  const defaultTicketType = ticketTypes.find(
    (type) => type.slug === "adult",
  );

  const ticketTypesBySlug = useMemo(
    () => new Map(ticketTypes.map((type) => [type.slug, type])),
    [ticketTypes],
  );

  const selectedIds = useMemo(
    () => new Set(selected.map((seat) => seat.id)),
    [selected],
  );



  const removeSeatsById = useCallback((seatIds: number[]) => {
    const removedIds = new Set(seatIds);

    setSelected(prev =>
      prev.filter(seat => !removedIds.has(seat.id)),
    );

    setTicketTypeBySeat(prev => {
      const next = { ...prev };

      for (const id of removedIds) {
        delete next[id];
      }

      return next;
    });

    setSelectionMessage(null);
  }, []);



  const getTicketTypeForSeat = useCallback(
    (seat: Seat) => {
      const slug = ticketTypeBySeat[seat.id];
      return (
        (slug ? ticketTypesBySlug.get(slug) : undefined) ??
        defaultTicketType
      );
    },
    [ticketTypeBySeat, ticketTypesBySlug, defaultTicketType],
  );


  const getPriceForSeat = useCallback(
    (seat: Seat) => {
      const ticketType = getTicketTypeForSeat(seat);
      return ticketType
        ? getSeatPrice(seat, ticketType, basePrice)
        : 0;
    },
    [getTicketTypeForSeat, basePrice],
  );

  const subtotal = useMemo(
    () =>
      selected.reduce(
        (sum, seat) => sum + getPriceForSeat(seat),
        0,
      ),
    [selected, getPriceForSeat],
  );

  const toggleSeat = useCallback(
    (seat: Seat) => {
      if (selectedIds.has(seat.id)) {
        setSelected((prev) => prev.filter((item) => item.id !== seat.id));
        setTicketTypeBySeat((prev) => {
          const next = { ...prev };
          delete next[seat.id];
          return next;
        });
        setSelectionMessage(null);
        return;
      }

      if (selected.length >= maxSeats) {
        setSelectionMessage(`You can select a maximum of ${maxSeats} seats.`);
        return;
      }

      if (!defaultTicketType) {
        setSelectionMessage("Ticket options are still loading.");
        return;
      }

      setSelected((prev) => [...prev, seat]);
      setTicketTypeBySeat((prev) => ({
        ...prev,
        [seat.id]: defaultTicketType.slug,
      }));
      setSelectionMessage(null);
    },
    [selected, selectedIds, maxSeats, defaultTicketType],
  );

  const setTicketTypeForSeat = useCallback(
    (seatId: number, slug: TicketType["slug"], ageRating: AgeRating | null) => {
      const ticketType = ticketTypesBySlug.get(slug);

      if (!ticketType) return;

      if (!isTicketTypeAllowed(ticketType.blockedFromRatingAge, ageRating)) {
        setSelectionMessage(
          `${ticketType.name} tickets aren't allowed for this movie's age rating.`,
        );
        return;
      }

      setTicketTypeBySeat(prev => ({ ...prev, [seatId]: slug }));
      setSelectionMessage(null);
    },
    [ticketTypesBySlug],
  );


  return {
    selected,
    selectedIds,
    toggleSeat,
    subtotal,
    ticketTypeBySeat,
    getTicketTypeForSeat,
    isTicketTypeAllowed,
    getPriceForSeat,
    setTicketTypeForSeat,
    selectionMessage,
    removeSeatsById,
    clearSelectionMessage: () => setSelectionMessage(null),
  };
}
import { Seat } from "@/lib/api/booking";
import { useCallback, useMemo, useState } from "react";

export const MAX_SEATS = 3;

export const getSeatPrice = (_seat: Seat): number => 0;

export function useSeatSelection() {
  const [selected, setSelected] = useState<Seat[]>([]);

  const toggleSeat = useCallback((seat: Seat) => {
    setSelected((prev) => {
      if (prev.some((s) => s.id === seat.id)) {
        return prev.filter((s) => s.id !== seat.id);
      }
      return prev.length >= MAX_SEATS ? prev : [...prev, seat];
    });
  }, []);

  const selectedIds = useMemo(
    () => new Set(selected.map((s) => s.id)),
    [selected],
  );

  const subtotal = useMemo(
    () => selected.reduce((sum, seat) => sum + getSeatPrice(seat), 0),
    [selected],
  );

  return { selected, selectedIds, toggleSeat, subtotal };
}
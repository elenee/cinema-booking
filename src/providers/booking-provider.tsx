"use client";

import { PurchaseModal } from "@/components/booking/PurchaseModal";
import type { MovieSession } from "@/lib/api/types";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface BookingContextValue {
  session: MovieSession | null;
  openBooking: (session: MovieSession, title: string) => void;
  movieTitle: string | null;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | undefined>(
  undefined,
);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [movieTitle, setMovieTitle] = useState<string | null>(null);
  const [session, setSession] = useState<MovieSession | null>(null);

  const openBooking = useCallback((session: MovieSession, title: string) => {
    setSession(session);
    setMovieTitle(title);
  }, []);

  const closeBooking = useCallback(() => {
    setSession(null);
    setMovieTitle(null);
  }, []);

  return (
    <BookingContext.Provider
      value={{ session, movieTitle, openBooking, closeBooking }}
    >
      {children}
      <PurchaseModal session={session} title={movieTitle ?? undefined} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
}

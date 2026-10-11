"use client";

import { PurchaseModal } from "@/components/booking/PurchaseModal";
import type { AgeRating, MovieSession } from "@/lib/api/types";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface BookingContextValue {
  session: MovieSession | null;
  openBooking: (session: MovieSession, title: string, ageRating: AgeRating | null) => void;
  movieTitle: string | null;
  closeBooking: () => void;
  ageRating: AgeRating | null,
}

const BookingContext = createContext<BookingContextValue | undefined>(
  undefined,
);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [movieTitle, setMovieTitle] = useState<string | null>(null);
  const [session, setSession] = useState<MovieSession | null>(null);
  const [ageRating, setAgeRating] = useState<AgeRating | null>(null);

  const openBooking = useCallback((session: MovieSession, title: string, ageRating: AgeRating | null,) => {
    setSession(session);
    setMovieTitle(title);
    setAgeRating(ageRating);
  }, []);

  const closeBooking = useCallback(() => {
    setSession(null);
    setMovieTitle(null);
    setAgeRating(null);
  }, []);

  return (
    <BookingContext.Provider
      value={{ session, movieTitle, ageRating, openBooking, closeBooking }}
    >
      {children}
      <PurchaseModal session={session} ageRating={ageRating} title={movieTitle ?? undefined} onClose={closeBooking} />
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

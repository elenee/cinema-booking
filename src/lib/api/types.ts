export interface Format {
  id: number;
  slug: string;
  name: string;
  priceUplift: number;
}

export interface Venue {
  id: number;
  slug: string;
  name: string;
  city: string;
  formats: Format[];
}

export interface Language {
  id: number;
  slug: string;
  name: string;
}

export interface TimeBand {
  id: string;
  label: string;
}

export interface SortOption {
  id: string;
  label: string;
}

export type TicketTypeSlug = "adult" | "child" | "student";

export interface TicketType {
  id: number;
  slug: TicketTypeSlug;
  name: string;
  priceRatio: number;
  note: string | null;
  blockedFromRatingAge: number | null;
}

export interface AgeRating {
  code: string;
  minAge: number;
  description: string;
}

export interface FilterOptions {
  venues: Venue[];
  formats: Format[];
  languages: Language[];
  timeBands: TimeBand[];
  sorts: SortOption[];
  ticketTypes: TicketType[];
  ageRatings: AgeRating[];
  maxSeatsPerOrder: number;
  holdMinutes: number;
}

export interface ApiResponse<T> {
  data: T;
}


export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  fullName: string | null;
  mobileNumber: string | null;
  dateOfBirth: string | null;
  age: number | null;
  preferredVenue: Venue | null;
  profileComplete: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}
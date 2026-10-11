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


export interface Genre {
  id: number;
  slug: string;
  name: string;
}

export interface Movie {
  id: number;
  slug: string;
  title: string;
  kind: string;
  runtimeMinutes: number;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  isComingSoon: boolean;
  isNotified: boolean;
  isFeatured: boolean;
  fromPrice: number;
  ageRating: AgeRating;
  genres: Genre[];
  formats: Format[];
  synopsis: string;
}

export interface MovieDetail extends Movie {
  director: string;
  cast: string;
}

export interface Language {
  id: number;
  slug: string;
  name: string;
  code: string;
}

export interface Venue {
  id: number;
  slug: string;
  name: string;
  city: string;
}

export interface MovieSession {
  id: number;
  startsAt: string;
  date: string;
  time: string;
  timeBand: string;
  price: number;
  seatsLeft: number;
  isSoldOut: boolean;
  hall: { id: number; name: string };
  venue: Venue;
  format: Format;
  language: Language;
}

export interface VenueSessions {
  venue: Venue;
  sessions: MovieSession[];
}

export interface SessionsGroup {
  movie: Movie;
  sessions: MovieSession[];
}

export interface SessionsMeta {
  currentPage: number;
  lastPage: number;
  perPage: number;
  totalSessions: number;
  totalMovies: number;
  date: string;
}

export interface SessionsResponse {
  data: SessionsGroup[];
  meta: SessionsMeta;
}

export interface TicketOrder {
  id: number;
  reference: string;
  status: string;
  totalPrice: number;
  paidAt: string | null;
  refundedAt: string | null;
  isUpcoming: boolean;
  isRefundable: boolean;
  cardLastFour: string | null;

  contact: {
    fullName: string;
    email: string;
    mobileNumber: string;
  };

  session: MovieSession & {
    startsAt: string;
    movie: Pick<
      Movie,
      | "id"
      | "slug"
      | "title"
      | "kind"
      | "runtimeMinutes"
      | "posterUrl"
      | "backdropUrl"
      | "releaseDate"
      | "isComingSoon"
      | "isFeatured"
      | "fromPrice"
      | "ageRating"
      | "genres"
      | "formats"
    >;
  };

  tickets: {
    id: number;
    seatCode: string;
    ticketType: {
      slug: string;
      name: string;
    };
    price: number;
  }[];
}


export interface HoldSeatInput {
  seatId: number;
  ticketType: TicketType;
}

export interface CreateHoldInput {
  seats: HoldSeatInput[];
}

export interface HeldSeat {
  seatId: number;
  code: string;
  ticketType: {
    slug: string;
    name: string;
  };
  price: number;
}

export interface HoldData {
  holdId: string;
  sessionId: number;
  expiresAt: string;
  secondsRemaining: number;
  isLive: boolean;
  subtotal: number;
  seats: HeldSeat[];
}

export interface CreateOrderInput {
  holdId: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface OrderTicket {
  id: number;
  seatCode: string;
  ticketType: {
    slug: string;
    name: string;
  };
  price: number;
}

export interface OrderData {
  id: number;
  reference: string;
  status: string;
  totalPrice: number;
  paidAt: string;
  refundedAt: string | null;
  isUpcoming: boolean;
  isRefundable: boolean;
  cardLastFour: string;
  contact: {
    fullName: string;
    email: string;
    mobileNumber: string;
  };
  session: {
    id: number;
    startsAt: string;
    date: string;
    time: string;
    timeBand: string;
    price: number;
    seatsLeft: number;
    isSoldOut: boolean;
    hall: {
      id: number;
      name: string;
    };
    venue: {
      id: number;
      slug: string;
      name: string;
      city: string;
    };
    format: {
      id: number;
      slug: string;
      name: string;
      priceUplift: number;
    };
    language: {
      id: number;
      slug: string;
      name: string;
      code: string;
    };
    movie: {
      id: number;
      slug: string;
      title: string;
      posterUrl: string;
      ageRating: {
        code: string;
        minAge: number;
        description: string;
      };
    };
  };
  tickets: OrderTicket[];
}


export type SeatState =
  | "available"
  | "sold"
  | "held"
  | "unavailable";

export interface HallSeat {
  id: number;
  code: string;
  label: string;
  state: SeatState;
  aisleAfter: boolean;
  isMine: boolean;
}

export interface HallRow {
  label: string;
  seats: HallSeat[];
}

export interface HallSection {
  name: string;
  rows: HallRow[];
}

export interface SeatMapData {
  sessionId: number;
  hall: {
    id: number;
    name: string;
    venue: {
      id: number;
      slug: string;
      name: string;
      city: string;
    };
  };
  sections: HallSection[];
}
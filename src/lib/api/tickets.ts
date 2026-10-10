import { api } from "./client";
import { ApiResponse, TicketOrder } from "./types";
export type TicketFilter = "upcoming" | "past";

export async function getTickets(filter: TicketFilter) {
    const response = await api.get<ApiResponse<TicketOrder[]>>(
        "/tickets",
        { params: { filter } }
    );
    return response.data.data;
}

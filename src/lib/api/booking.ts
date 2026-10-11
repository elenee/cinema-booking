import { api } from "./client";
import { CreateHoldInput, CreateOrderInput, HoldData, OrderData, SeatMapData } from "./types";


export async function createHold(
    sessionId: number,
    input: CreateHoldInput,
): Promise<HoldData> {
    const response = await api.post<{ data: HoldData }>(
        `/sessions/${sessionId}/holds`,
        input,
    );
    return response.data.data;
}

export async function getHold(holdId: string): Promise<HoldData> {
    const response = await api.get<{ data: HoldData }>(
        `/holds/${holdId}`,
    );
    return response.data.data;
}

export async function releaseHold(holdId: string): Promise<void> {
    await api.delete(`/holds/${holdId}`);
}


export async function createOrder(
    input: CreateOrderInput,
): Promise<OrderData> {
    const response = await api.post<{ data: OrderData }>(
        "/orders",
        input,
    );
    return response.data.data;
}


export async function getSessionSeats(
    sessionId: number,
): Promise<SeatMapData> {
    const response = await api.get<{ data: SeatMapData }>(
        `/sessions/${sessionId}/seats`,
    );
    return response.data.data;
}

export type SeatMap = Awaited<ReturnType<typeof getSessionSeats>>;
export type Seat = SeatMap["sections"][number]["rows"][number]["seats"][number];
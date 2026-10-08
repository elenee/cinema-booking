import { api } from "./client";
import type { SessionsResponse } from "./types";

export interface GetSessionsParams {
    date?: string;
    venues?: string[];
    formats?: string[];
    languages?: string[];
    bands?: string[];
    search?: string;
    sort?: string;
    page?: number;
}

export async function getSessions(params: GetSessionsParams = {}) {
    const response = await api.get<SessionsResponse>("/sessions", {
        params,
        paramsSerializer: {
            indexes: true,
        },
    });

    return response.data;
}
import { type IAthlete } from "./IAthlete";

export interface IDefaultResponse{
    success: boolean
}

export interface IAthletesResponse {
    success: boolean,
    data: IAthlete[] | null
}

export interface IAthleteResponse {
    success: boolean,
    data: IAthlete | null
}
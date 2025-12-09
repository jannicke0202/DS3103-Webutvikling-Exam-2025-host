import { type IAthlete } from "./IAthlete";

export interface IDefaultResponse{
    success: boolean
    message: string
}

export interface IAthletesResponse {
    success: boolean,
    data: IAthlete[] | null
}

export interface IAthleteResponse {
    success: boolean,
    data: IAthlete | null
    message: string
}
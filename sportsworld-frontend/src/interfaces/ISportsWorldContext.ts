import { type IAthlete } from "./IAthlete";
import type { IFinance } from "./IFinance";
import type { IVenue } from "./IVenue";
import type { IDefaultResponse } from "./ResponseInterfaces";

export interface ISportsWorldContext{

    // data
    athletes: IAthlete[]
    finance: IFinance | null
    venues: IVenue[]

    // UI status
    loading: boolean,
    error: string | null

    // athlete functions
    saveAthlete: (newAthlete: IAthlete) => Promise<IDefaultResponse>,
    purchaseAthlete: (id: number) => Promise<IDefaultResponse>;
    deleteAthlete: (id: number) => Promise<void>

    // finance
    takeLoan: (amount: number) => Promise<void>;

    // venue
    saveVenue: (data: Omit<IVenue, "id">) => Promise<IDefaultResponse>;

    // helper
    getAthleteQuantity: () => number

} 


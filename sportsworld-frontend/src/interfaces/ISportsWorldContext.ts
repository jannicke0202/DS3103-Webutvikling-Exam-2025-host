import { type IAthlete } from "./IAthlete";
import type { IFinance } from "./IFinance";
import type { IVenue } from "./IVenue";
import type { IDefaultResponse } from "./ResponseInterfaces";

export interface ISportsWorldContext{

    // data
    athletes: IAthlete[],
    finance: IFinance | null,
    venues: IVenue[],

    // athlete functions
    saveAthlete: (newAthlete: IAthlete) => Promise<IDefaultResponse>,
    purchaseAthlete: (id: number) => Promise<IDefaultResponse>;

    // finance
    takeLoan: (amount: number) => Promise<IDefaultResponse>;

    // venue
    saveVenue: (data: Omit<IVenue, "id">) => Promise<IDefaultResponse>;

    // helper
    getAthleteQuantity: () => number

}
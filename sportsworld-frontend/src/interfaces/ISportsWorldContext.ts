import { type IAthlete } from "./IAthlete";
import type { IFinance } from "./IFinance";
import type { IVenue } from "./IVenue";
import type { IDefaultResponse } from "./ResponseInterfaces";

export interface ISportsWorldContext{

    // data
    athletes: IAthlete[],
    finance: IFinance[],
    venues: IVenue[],

    // athlete functions
    getAthleteQuantity: () => number,
    saveAthlete: (newAthlete: IAthlete) => Promise<IDefaultResponse>,

}
import { type IAthlete } from "./IAthlete";
import type { IFinance } from "./IFinance";
import type { IVenue } from "./IVenue";
import type { IDefaultResponse } from "./ResponseInterfaces";

export interface ISportsWorldContext {
  // data
  athletes: IAthlete[];
  finance: IFinance | null;
  venues: IVenue[];

  loading: boolean;
  error: string | null;

  // athlete functions
  // newAthlete uten id, siden backend genererer id
  saveAthlete: (newAthlete: Omit<IAthlete, "id">) => Promise<IDefaultResponse>;
  purchaseAthlete: (id: number) => Promise<void>;
  deleteAthlete: (id: number) => Promise<void>;

  // updateAthlete: (updated: IAthlete) => Promise<void>;

  // finance
  takeLoan: (amount: number) => Promise<void>;

 
  saveVenue: (data: Omit<IVenue, "id">) => Promise<IDefaultResponse>;
  // ikke implementert enda, derfor optional
  deleteVenue?: (id: number) => Promise<void>;

  

  // helper
  getAthleteQuantity: () => number;
}

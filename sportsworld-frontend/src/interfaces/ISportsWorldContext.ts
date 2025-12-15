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

  saveAthlete: (newAthlete: Omit<IAthlete, "id">) => Promise<IDefaultResponse>;
  purchaseAthlete: (id: number) => Promise<void>;
  deleteAthlete: (id: number) => Promise<void>;
  updateAthlete: (updatedAthlete: IAthlete) => Promise<IDefaultResponse>


  // finance
  takeLoan: (amount: number) => Promise<void>;

 
  saveVenue: (data: Omit<IVenue, "id">) => Promise<IDefaultResponse>;
  // ikke implementert enda, derfor optional
  deleteVenue?: (id: number) => Promise<void>;

  

  // helper
  getAthleteQuantity: () => number;
  loadData: () => Promise<void>;
}

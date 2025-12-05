import { useState, createContext, type ReactNode, Children, useEffect, useContext } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import { type ISportsWorldContext } from "../interfaces/ISportsWorldContext";
import AthleteService from "../services/AthleteService";
import { type IDefaultResponse } from "../interfaces/ResponseInterfaces";
import { type IVenue } from "../interfaces/IVenue";
import { type IFinance } from "../interfaces/IFinance";





// Context
export const SportsWorldContext = createContext<ISportsWorldContext | null>(null);


interface Props {children: ReactNode}

export const SportsWorldProvider = ({children} : Props) => {

    const [athletes, setAthletes] = useState<IAthlete[]>([
        {id: 99, name: "Context test athlete 1", purchaseStatus: false, price: 100000},
        {id: 100, name: "Context test athlete 2", purchaseStatus: false, price: 200000}
    ]);

    const [venues, setVenues] = useState<IVenue[]>([
        {id: 1, venueName: "Context test venue 1", venueCapacity: 52000},
        {id: 2, venueName: "Context test venue 2", venueCapacity: 30400}
    ]);

    const [finance, setFinance]     = useState<IFinance | null>(null); 
    
    useEffect(() => {}, []);

    const setAthletesFromService = async () => {
        const response = await AthleteService.getAllAthletes();
        if( response.success === true && response.data != null){
            setAthletes(response.data)
        }
    }


    const getAthleteQuantity = () : number => {
        return athletes.length;
    }

    const saveAthlete = async (newAthlete: IAthlete) : Promise<IDefaultResponse> => {

        const response = await AthleteService.postAthlete(newAthlete);

        if ( response.success === true && response.data != null ){
            const newAthleteWithId : IAthlete = response.data;

            setAthletes (
                prev => [newAthleteWithId, ...prev]
            );
        }

        return response;
    }

    const deleteAthlete = async (id: number): Promise<IDefaultResponse> => {
        console.log("deleteAthlete not ready yet", id);
        return { success: false, message: "Not implemented" };
      };
    
      const purchaseAthlete = async (id: number): Promise<IDefaultResponse> => {
        console.log("purchaseAthlete not ready yet", id);
        return { success: false, message: "Not implemented" };
      };
    
      const takeLoan = async (amount: number): Promise<IDefaultResponse> => {
        console.log("takeLoan not ready yet", amount);
        return { success: false, message: "Not implemented" };
      };
    
      const saveVenue = async (data: Omit<IVenue, "id">): Promise<IDefaultResponse> => {
        console.log("saveVenue not ready yet", data);
        return { success: false, message: "Not implemented" };
      };

    return (
        <SportsWorldContext.Provider value={{
            athletes,
            venues,
            finance,
            
            saveAthlete,
            deleteAthlete,
            purchaseAthlete,
            takeLoan,
            saveVenue,

            getAthleteQuantity,
        } as ISportsWorldContext}>{children}</SportsWorldContext.Provider>
    )

}

export const useSportsWorld = () => {
    const context = useContext(SportsWorldContext);
    if (!context) {
      throw new Error("useSportsWorld must be used within a SportsWorldProvider");
    }
    return context;
  };

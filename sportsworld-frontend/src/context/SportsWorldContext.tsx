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
        {id: 99, name: "Context test athlete 1"},
        {id: 100, name: "Context test athlete 2"}
    ]);
    
    useEffect( () => {
        setAthletesFromService();
    }, [] );

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

    return (
        <SportsWorldContext.Provider value={{
            athletes,
            getAthleteQuantity,
            saveAthlete,
            
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

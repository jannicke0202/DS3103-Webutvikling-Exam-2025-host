import { useState, createContext, type ReactNode, Children, useEffect } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import { type IAthleteContext } from "../interfaces/IAthleteContext";
import AthleteService from "../services/AthleteService";
import { type IDefaultResponse } from "../interfaces/ResponseInterfaces";

export const AthleteContext = createContext<IAthleteContext | null>(null);

interface Props {children: ReactNode}

export const AthleteProvider = ({children} : Props) => {

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
        <AthleteContext.Provider value={{
            athletes,
            getAthleteQuantity,
            saveAthlete
        }}>{children}</AthleteContext.Provider>
    )

}

import axios from "axios";
import type { IAthlete } from "../interfaces/IAthlete";

import type { IDefaultResponse, IAthleteResponse, IAthletesResponse } from "../interfaces/ResponseInterfaces";

const endpoint = "http://localhost:5115/athlete"

const getAllAthletes = async () : Promise<IAthletesResponse> => {
    try{
        const response = await axios.get(endpoint);
        return {
            success: true,
            data: response.data
        };
    }catch{
        return {
            success: false,
            data: null
        }
    }
}

const postAthlete = async (athlete: IAthlete) : Promise <IAthleteResponse> => {
    try{
        const response = await axios.post(endpoint, athlete);

        console.log(response);
        return {
            success: true,
            data: response.data
        }
    }catch{
        return{
            success: false,
            data: null
        }
    }
}

export default {getAllAthletes, postAthlete}
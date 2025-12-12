import axios from "axios";
import type { IAthlete } from "../interfaces/IAthlete";
import type {
  IDefaultResponse,
  IAthleteResponse,
  IAthletesResponse
} from "../interfaces/ResponseInterfaces";

const endpoint = "http://localhost:5115/api";

// GET all
const getAllAthletes = async (): Promise<IAthletesResponse> => {
  try {

    const url = `${endpoint}/Athlete`; // Usikker på URL

    const response = await axios.get(url);

    return {
      success: true,
      data: response.data,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Axios error:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    return {
      success: false,
      data: null,
    };
  }
};

// Ny kode - GET by id
const getAthleteById = async (id: number): Promise<IAthleteResponse> => {
  try {
    const response = await axios.get(`${endpoint}/${id}`);
    return {
      success: true,
      data: response.data,
      message: "",
    };
  } catch {
    return {
      success: false,
      data: null,
      message: "Could not fetch athlete",
    };
  }
};

// SEARCH by name
const searchAthletesByName = async (name: string): Promise<IAthletesResponse> => {
  try {
    const response = await axios.get(`${endpoint}/search`, {
      params: { name },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

// POST create
const postAthlete = async (athlete: IAthlete): Promise<IAthleteResponse> => {
  try {
    const response = await axios.post(`${endpoint}/athlete`, athlete);
    return {
      success: true,
      data: response.data,
      message: "",
    };
  } catch {
    return {
      success: false,
      data: null,
      message: "Could not create athlete",
    };
  }
};

// PUT update
const putAthlete = async (athlete: IAthlete): Promise<IAthleteResponse> => {
  try {
    const response = await axios.put(`${endpoint}/${athlete.id}`, athlete);
    return {
      success: true,
      data: response.data,
      message: "",
    };
  } catch {
    return {
      success: false,
      data: null,
      message: "Could not update athlete",
    };
  }
};

// PATCH purchase toggle
const togglePurchaseStatus = async (id: number): Promise<IAthleteResponse> => {
  try {
    const response = await axios.patch(`${endpoint}/${id}/purchase`);
    return {
      success: true,
      data: response.data,
      message: "",
    };
  } catch {
    return {
      success: false,
      data: null,
      message: "Could not toggle purchase status",
    };
  }
};

// DELETE
const deleteAthlete = async (id: number): Promise<IDefaultResponse> => {
  try {
    await axios.delete(`${endpoint}/athlete/${id}`);
    return {
      success: true,
      message: "",
    };
  } catch {
    return {
      success: false,
      message: "Could not delete athlete",
    };
  }
};

export default {
  getAllAthletes,
  getAthleteById,
  searchAthletesByName,
  postAthlete,
  putAthlete,
  togglePurchaseStatus,
  deleteAthlete,
};
//test

/*import axios from "axios";
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
            data: response.data,
            message: "",
        }
    }catch{
        return{
            success: false,
            data: null,
            message: "",
        }
    }
}

export default {getAllAthletes, postAthlete}*/
import axios from "axios";
import type { IVenue } from "../interfaces/IVenue";
import type {
  IDefaultResponse,
  IVenueResponse,
  IVenuesResponse
} from "../interfaces/ResponseInterfaces";

const endpoint = "http://localhost:5115/api";


// GET all
const getAllVenues = async (): Promise<IVenuesResponse> => {
  try {

    const url = `${endpoint}/Venue`; // Usikker på URL

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

//Post/create venue
const postVenue = async (venue: IVenue): Promise<IVenueResponse> => {
  try {
    const response = await axios.post(`${endpoint}/venue`, venue);
    return {
      success: true,
      data: response.data,
      message: "",
    };
  } catch {
    return {
      success: false,
      data: null,
      message: "Could not create venue",
    };
  }
};

// DELETE
const deleteVenue = async (id: number): Promise<IDefaultResponse> => {
  try {
    await axios.delete(`${endpoint}/venue/${id}`);
    return {
      success: true,
      message: "",
    };
  } catch {
    return {
      success: false,
      message: "Could not delete venue",
    };
  }
};

export default {
  getAllVenues,
  postVenue,
  deleteVenue,
};

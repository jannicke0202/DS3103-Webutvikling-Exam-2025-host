import axios from "axios";

const endpoint = "http://localhost:5115/api/Finance";

const getFinance = async () => {
  try {
    const response = await axios.get(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Failed to load finance:", error);
    return { success: false, data: null };
  }
};

export default { getFinance };
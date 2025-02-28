import axios from 'axios';
import { API_BASE_URL, defaultHeaders } from '../Services/ServiceConfig';

const fetchBeneficiaries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/PaymentInitialise`, {
      headers: defaultHeaders,
      withCredentials: true,
    });

    console.log("Response from API:", response.data);
    return response.data;
  } catch (error) {

    // Try loading local JSON as a fallback
    try {
      const BENEFICIARIES_JSON_URL = require("../../assets/beneficiaries.json");
      return BENEFICIARIES_JSON_URL;
    } catch (jsonError) {
      console.error("Failed to load local JSON:", jsonError.message);
      throw error;
    }
  }
};

export default { fetchBeneficiaries };

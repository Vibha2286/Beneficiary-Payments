
import axios from "axios";
import { API_BASE_URL, defaultHeaders } from '../Services/ServiceConfig';

export const executePayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/PaymentExecute`, {
      instructionIdentifier: paymentData.instructionIdentifier,
      defaultHeaders
    }
    );
    return response.data;
  } catch (err) {
    // Try loading local JSON as a fallback
    try {
      const RESULT_JSON_URL = require("../../assets/result.json");
      return RESULT_JSON_URL;
    } catch (jsonError) {
      console.error("Failed to load local JSON:", jsonError.message);
      throw error;
    }
  }
};



import axios from "axios";
import { API_BASE_URL, defaultHeaders } from '../Services/ServiceConfig';

export const submitPaymentReview = async (beneficiaryId, account, amount) => {

  try {
    const response = await axios.post(`${API_BASE_URL}/PaymentReview`, {
      beneficiaryId,
      accountNumber: account,
      amount,
      defaultHeaders
    });

    return { success: true, data: response.data };
  } catch (err) {
    let errorMessage = "Failed to submit payment review";

    if (err.response) {
      if (err.response.status === 400) {
        errorMessage = "Bad request. Fetching data from JSON";
      } else if (err.response.status === 500) {
        errorMessage = "Internal server error.";
      }
    } else if (err.request) {
      errorMessage = "No response from server.";
    }
    // Try loading local JSON as a fallback
    try {
      const PAYMENTREIVIEW_JSON_URL = require("../../assets/paymentReview.json");
      return PAYMENTREIVIEW_JSON_URL;
    } catch (jsonError) {
      throw jsonError;
    }
  }
};

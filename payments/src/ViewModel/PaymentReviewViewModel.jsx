import { useState } from "react";
import { executePayment } from "../Services/ExecutePayment"; 

export const usePaymentReviewViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Make payment request using the service
  const makePayment = async (paymentData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await executePayment(paymentData);
      setLoading(false);
      return response; 
    } catch (err) {
      setLoading(false);
      setError(err.message || "Payment failed. Please try again.");
      return null;
    }
  };

  return {
    loading,
    error,
    makePayment,
  };
};

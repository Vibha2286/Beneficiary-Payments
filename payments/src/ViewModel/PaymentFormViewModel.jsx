import { useState } from "react";
import { submitPaymentReview } from "../Services/PaymentService"; 

export const usePaymentFormViewModel = () => {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(0);

  // Handling the account input change
  const handleAccountChange = (account, balance) => {
    setAccount(account);
    setBalance(balance);  
  };

  // Handling the amount input change with validation
  const handleAmountChange = (text) => {
    // Convert input to number
    const enteredAmount = parseFloat(text);
    if (enteredAmount <= balance || text === '') {
      setAmount(text); // Allow amount update if it doesn't exceed the balance
      setError(null);   // Reset error if the amount is valid
    } else {
      setError("Amount cannot be more than the available balance");
    }
  };

  // Submit payment review to the service (now uses the external service)
  const handlePaymentReview = async (beneficiaryId) => {
    setLoading(true);
    setError(null);

    try {
      // Call the service to submit payment review
      const response = await submitPaymentReview(beneficiaryId, account, amount);
      setLoading(false);
      return response; 
    } catch (err) {
      setLoading(false);
      setError(err.message); 
    }
  };

  return {
    account,
    amount,
    balance,
    loading,
    error,
    handleAccountChange,
    handleAmountChange,
    handlePaymentReview, 
  };
};

import { useState, useEffect } from "react";
import BeneficiaryService from "../Services/BeneficiaryService"; // Assuming this service fetches both
import Beneficiary from "../Model/Beneficiary";
import Account from "../Model/Account"; // Assuming you have an Account model

export const useBeneficiaryViewModel = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [accountList, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBeneficiariesAndAccounts();
  }, []);

  const fetchBeneficiariesAndAccounts = async () => {
    try {
      const data = await BeneficiaryService.fetchBeneficiaries();
      // Check if data is structured correctly
      if (data && Array.isArray(data.beneficiaries) && Array.isArray(data.accounts)) {
        const beneficiaryList = data.beneficiaries.map(Beneficiary.fromJson);
        const accountList = data.accounts.map(Account.fromJson);

        console.log("accountList", accountList);
        setBeneficiaries(beneficiaryList);
        setAccounts(accountList);
      } else {
        setError("Invalid data structure or empty beneficiaries/accounts");
      }
    } catch (err) {
      console.error("Failed to load beneficiaries and accounts:", err);
      setError("Failed to load beneficiaries and accounts");
    } finally {
      setLoading(false);
    }
  };

  return { beneficiaries, accountList, loading, error };
};

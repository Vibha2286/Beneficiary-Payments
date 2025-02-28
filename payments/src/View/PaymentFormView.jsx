import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { submitPaymentReview } from "../Services/PaymentService"; 

const PaymentFormView = ({ route, navigation }) => {
  const { beneficiary, accountList } = route.params;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null); 

  // Set initial selected account if available
  const initialAccount = accountList && accountList.length > 0 ? accountList[0].number : "";

  const [account, setAccount] = useState(initialAccount);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAccountChange = (accountNumber, accountBalance) => {
    setAccount(accountNumber);
    setBalance(accountBalance);
  };

  // Validate and update amount field
  const handleAmountChange = (text) => {
    // Check if the field is empty
    if (text.trim() === "") {
      setError("Amount cannot be empty");
      setAmount(""); // Clear amount field if it's empty
      return;
    }

    // Allow only numeric input
    const numericText = text.replace(/[^0-9.]/g, '');

    // Check if the amount is greater than the balance or equals zero
    if (parseFloat(numericText) > parseFloat(balance) || parseFloat(numericText) === 0) {
      setError(`Amount cannot be greater than the balance of ${balance}`);
    } else {
      setError(""); // Clear error if valid
    }

    setAmount(numericText); // Update amount with valid value
  };

  const handlePaymentReviewSubmit = async () => {
    if (parseFloat(amount) > parseFloat(balance) ) {
      setError(`Amount cannot be greater than the balance of ${balance}`);
      return;
    }

    const paymentData = await submitPaymentReview(beneficiary.id, account, amount);

    // Check if paymentData contains the expected fields
    if (paymentData) {
      navigation.navigate("PaymentReviewScreen", {
        paymentData: paymentData.data,  // Actual payment data
        beneficiary: beneficiary,        // Pass the beneficiary data
        account: account,                // Pass the selected account number
        amount: amount, 
      });
    } else {
      console.error("No payment data received or payment failed");
      setError("Payment failed. Please try again.");
    }
  };

  // Ensure account list is valid
  if (!Array.isArray(accountList) || accountList.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No accounts available.</Text>
      </View>
    );
  }

  // Handle account selection
  const handleAccountSelect = (account, balance) => {
    setSelectedAccount(account);
    setIsDropdownVisible(false); 
    handleAccountChange(account, balance);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Beneficiary: {beneficiary.name}</Text>
      <Text style={styles.subtitle}>Bank: {beneficiary.bank}</Text>

      {/* Account Dropdown */}
      <Text style={styles.label}>Select Account</Text>

      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setIsDropdownVisible(!isDropdownVisible)} // Toggle dropdown visibility
      >
        <Text style={styles.pickerText}>
          {selectedAccount ? `Account: ${selectedAccount} (Balance: ${balance})` : "Select an Account"}
        </Text>
        <Ionicons
          name={isDropdownVisible ? "chevron-up" : "chevron-down"}
          size={24}
          color="#333"
        />
      </TouchableOpacity>

      {isDropdownVisible && (
        <FlatList
          data={accountList}
          keyExtractor={(item) => item.number}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleAccountSelect(item.number, item.balance)} // Pass account and balance
            >
              <Text style={styles.dropdownItemText}>
                Account: {item.number} (Balance: {item.balance})
              </Text>
            </TouchableOpacity>
          )}
          maxHeight={150}
        />
      )}

      {/* Amount Input */}
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={handleAmountChange}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />

      {error && <Text style={styles.errorText}>{error}</Text>} {/* Display error */}
      {loading && <ActivityIndicator size="large" color="blue" />} {/* Loading indicator */}

      {/* Proceed Button */}
      <TouchableOpacity
        style={[styles.proceedButton, loading && styles.disabledButton]}
        onPress={handlePaymentReviewSubmit} // Submit payment review
        disabled={loading || amount.trim() === ""} // Disable button if amount is empty
      >
        <Text style={styles.proceedButtonText}>Proceed to Payment Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    padding: 12,
    fontSize: 16,
    color: "#333",
    borderRadius: 8,
  },
  pickerContainer: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
    justifyContent: 'center',
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  proceedButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});

export default PaymentFormView;

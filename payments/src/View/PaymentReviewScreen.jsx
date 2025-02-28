import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePaymentReviewViewModel } from "../ViewModel/PaymentReviewViewModel";

const PaymentReviewScreen = ({ route }) => {
  const { paymentData, beneficiary, account, amount } = route.params;
  const navigation = useNavigation();

  // Initialize the view model
  const { loading, error, makePayment } = usePaymentReviewViewModel();
 

  // Handle payment submission
  const handleMakePayment = async () => {
    const result = await makePayment(paymentData);
    if (result) {
      navigation.navigate("ResultScreen", { paymentResult: result });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Payment Review</Text>

      <Text style={styles.label}>Beneficiary Name: {beneficiary.name}</Text>
      <Text style={styles.label}>Account Number: {account} </Text>
      <Text style={styles.label}>Bank: {beneficiary.bank}</Text>
      <Text style={styles.label}>Branch: {beneficiary.branchName}</Text>
      <Text style={styles.label}>Amount: {amount}</Text>
      <Text style={styles.label}>Fee: 0</Text>

      {loading && <ActivityIndicator size="large" color="blue" />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={styles.makePaymentButton}
        onPress={handleMakePayment}
        disabled={loading} // Disable the button if loading is true
      >
        <Text style={styles.buttonText}>Make Payment</Text>
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
    fontSize: 20,
    color: "#555",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  makePaymentButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default PaymentReviewScreen;

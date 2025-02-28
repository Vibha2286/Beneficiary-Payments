import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ResultModel from "../Model/ResultModel";
import { executePayment } from "../Services/ExecutePayment";

const ResultScreen = ({ route }) => {
  const { paymentResult } = route.params;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const performPayment = async () => {
      const response = await executePayment(paymentResult.instructionReference);
      const paymentReference = response?.data?.PaymentReference || paymentResult.instructionReference;
      const resultModel = new ResultModel(paymentReference);
    };

    performPayment();
  }, [paymentResult]);

  const handleDone = () => {
    navigation.navigate("BeneficiaryList");
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              <Text style={styles.title}>Payment Successful!</Text>
              <Text style={styles.paymentReference}>
                Payment Reference: {paymentResult.instructionReference}
              </Text>
            </>
          )}
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  paymentReference: {
    fontSize: 18,
    marginBottom: 40,
    color: "#4CAF50",
    textAlign: "center",
  },
  doneButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
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

export default ResultScreen;

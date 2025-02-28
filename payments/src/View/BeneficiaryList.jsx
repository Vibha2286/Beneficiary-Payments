import React from "react";
import { Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useBeneficiaryViewModel } from "../ViewModel/BeneficiaryViewModel";
import { useNavigation } from "@react-navigation/native";

const BeneficiaryList = () => {
  const { beneficiaries, accountList, loading, error } = useBeneficiaryViewModel();
  const navigation = useNavigation();

  // Handle loading and error states
  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  const handleItemPress = (beneficiary, accountList) => {
    // Navigate to PaymentForm with both beneficiary and selected account list
    navigation.navigate("PaymentForm", { beneficiary, accountList });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={beneficiaries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item, accountList)} style={styles.beneficiaryItem}>
            <Text style={styles.beneficiaryName}>
              {item.name} - {item.bank}
            </Text>
            <Text style={styles.branchText}>
              Branch: {item.branchName} (Code: {item.branchCode})
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fc",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  beneficiaryItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  beneficiaryName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  branchText: {
    color: "#777",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default BeneficiaryList;

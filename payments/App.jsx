import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BeneficiaryList from "./src/View/BeneficiaryList";
import PaymentFormView from "./src/View/PaymentFormView";
import PaymentReviewScreen from "./src/View/PaymentReviewScreen";
import ResultScreen from "./src/View/ResultScreen";  // Import ResultScreen

// Create a Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BeneficiaryList">
        <Stack.Screen name="BeneficiaryList" component={BeneficiaryList} options={{ title: 'Beneficiaries' }}  />
        <Stack.Screen name="PaymentForm" component={PaymentFormView} options={{ title: 'Form' }} />
        <Stack.Screen name="PaymentReviewScreen" component={PaymentReviewScreen} options={{ title: 'Review' }}/>
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ title: 'Payment' }}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

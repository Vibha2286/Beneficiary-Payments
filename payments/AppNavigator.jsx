import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";
import BeneficiaryList from "./src/View/BeneficiaryList";
import PaymentFormView from "./src/View/PaymentFormView";
import PaymentReviewScreen from "./src/View/PaymentReviewScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BeneficiaryList">
        {/* Beneficiary List Screen */}
        <Stack.Screen 
          name="BeneficiaryList" 
          component={BeneficiaryList} />

        {/* Payment Form Screen */}
        <Stack.Screen 
          name="PaymentForm" 
          component={PaymentFormView} />

        {/* Payment Review Screen */}
        <Stack.Screen 
          name="PaymentReviewScreen" 
          component={PaymentReviewScreen}/>

        {/* Add the Result Screen */}
        <Stack.Screen 
          name="ResultScreen" 
          component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

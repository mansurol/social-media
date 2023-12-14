import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screen/AuthScreen/Login";
import SignUp from "../Screen/AuthScreen/SignUp";
import Routes from "../Utility/Routes";
import BottomTab from "../Navigation/BottomTab";
const Stack = createNativeStackNavigator();
export default function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Login}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SignUp}
        component={SignUp}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={Routes.BottomTab}
        component={BottomTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

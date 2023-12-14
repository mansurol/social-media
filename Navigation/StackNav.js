import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screen/AuthScreen/Login";
import SignUp from "../Screen/AuthScreen/SignUp";
import Routes from "../Utility/Routes";
import NewsFeed from "../Screen/NewsFeed";

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
        name={Routes.NewsFeed}
        component={NewsFeed}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNav from "./Navigation/StackNav";
import Login from "./Screen/AuthScreen/Login";
import AuthNavigation from "./Navigation/AuthNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}

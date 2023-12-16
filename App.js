import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNav from "./Navigation/StackNav";
import Login from "./Screen/AuthScreen/Login";
import AuthNavigation from "./Navigation/AuthNavigation";
import ButtomTab from "./Navigation/BottomTab";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </Provider>
  );
}

import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Routes from "../Utility/Routes";

import Profile from "../Screen/Profile";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, StyleSheet } from "react-native";

import NewsFeed from "../Screen/NewsFeed";
import Post from "../Screen/Post";

export default function ButtomTab() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused }) => {
            let IconName;
            if (route.name === Routes.Home_Tab) {
              IconName = focused ? "ios-home-sharp" : "ios-home-outline";
            } else if (route.name === Routes.Post) {
              IconName = focused
                ? "ios-add-circle-sharp"
                : "ios-add-circle-outline";
            } else if (route.name === Routes.PROFILE_Tab) {
              IconName = focused
                ? "ios-person-circle-sharp"
                : "ios-person-circle-outline";
            }
            return <Icon name={IconName} size={22} color={color} />;
          },

          tabBarInactiveTintColor: "gray",

          headerShown: false,
        })}
      >
        <Tab.Screen
          name={Routes.Home_Tab}
          component={NewsFeed}
          options={{ headerShown: true }}
        />
        <Tab.Screen
          name={Routes.Post}
          component={Post}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={Routes.PROFILE_Tab}
          component={Profile}
          options={{ headerShown: true }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9EBEC",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 9,
    marginTop: 4,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: "#000",
    padding: 10,
  },
  shortInput: {
    flex: 0.8,
    fontSize: 18,
    color: "#000",
    padding: 10,
  },
  cancelButton: {
    marginLeft: 5,
  },
  cancelButtonText: {
    color: "#CE916A",
    fontSize: 16,
    fontFamily: "SolamanlipiBold",
  },
});

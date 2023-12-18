import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/UserSlice";
import Routes from "../Utility/Routes";

export default function ProfileHeader({ navigation }) {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userdata);
  // console.log("userData", userData);
  const handleLogout = () => {
    dispatch(setUser(""));
    navigation.navigate(Routes.Login);
  };
  return (
    <View>
      <View>
        <Image
          source={{ uri: userData.photo }}
          style={{ width: "100%", height: 190, resizeMode: "cover" }}
        />
        <View style={styles.headerName}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.HeaderNameStyle}> {userData.name}</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.HeaderNameStyle}>Logout</Text>
            </TouchableOpacity>
          </View>
          <Text>
            <Text style={styles.HeaderStyle}>3.6K</Text>
            <Text style={{ color: "gray" }}> Friends</Text>
          </Text>
        </View>
      </View>
      <View style={{ borderWidth: 3, borderColor: "#c1c1c1" }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerName: {
    padding: 10,
  },
  HeaderNameStyle: {
    marginBottom: 7,
    fontSize: 17,
    fontWeight: "700",
  },
  HeaderStyle: {
    fontSize: 16,
    fontWeight: "500",
  },
});

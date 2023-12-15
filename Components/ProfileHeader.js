import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function ProfileHeader() {
  return (
    <View>
      <View>
        <Image
          source={require("../assets/mansur.jpg")}
          style={{ width: "100%", height: 170, resizeMode: "cover" }}
        />
        <View style={styles.headerName}>
          <Text style={styles.HeaderNameStyle}>Mansurol Islam</Text>
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

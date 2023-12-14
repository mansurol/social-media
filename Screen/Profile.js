import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
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

        <View>
          <Text style={styles.StyleDeailsText}>Details</Text>

          <View style={{ padding: 10 }}>
            <View style={styles.detaisTextStyle}>
              <Icon name="work" color="gray" />

              <Text>
                {" "}
                Work at <Text style={styles.changeTextStyle}>Student</Text>
              </Text>
            </View>
            <View style={styles.detaisTextStyle}>
              <Icon name="location-pin" color="gray" />
              <Text>
                {" "}
                Lives in{" "}
                <Text style={styles.changeTextStyle}>Dhaka, Bangladesh</Text>
              </Text>
            </View>
            <View style={styles.detaisTextStyle}>
              <Icon name="location-city" color="gray" />
              <Text>
                {" "}
                From{" "}
                <Text style={styles.changeTextStyle}>Dhaka, Bangladesh</Text>
              </Text>
            </View>
            <View style={styles.detaisTextStyle}>
              <Icon name="favorite" color="gray" />
              <Text style={styles.changeTextStyle}> Single</Text>
            </View>
            <View style={styles.detaisTextStyle}>
              <Icon name="people" type="material" color="gray" />
              <Text> Followed by 1,2031 people</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.eidtButton}>
            <Text style={{ color: "#3395D6" }}>Edit public details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  StyleDeailsText: {
    fontSize: 18,
    fontWeight: "600",
    padding: 10,
  },
  detaisTextStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  changeTextStyle: {
    fontSize: 15,
    fontWeight: "600",
  },
  eidtButton: {
    backgroundColor: "#CCE8FF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});

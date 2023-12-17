import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import Routes from "../Utility/Routes";
import { useSelector } from "react-redux";

export default function ProfileDetails({ navigation }) {
  const { workAt, livesIn, from, relationshipStatus, follower } = useSelector(
    (state) => state.userdata
  );
  const handdleEdit = () => {
    navigation.navigate(Routes.EditInfoScreen);
  };
  return (
    <View>
      <View>
        <Text style={styles.StyleDeailsText}>Details</Text>

        <View style={{ padding: 10 }}>
          <View style={styles.detaisTextStyle}>
            <Icon name="work" color="gray" />

            <Text>
              {" "}
              Work at <Text style={styles.changeTextStyle}>{workAt}</Text>
            </Text>
          </View>
          <View style={styles.detaisTextStyle}>
            <Icon name="location-pin" color="gray" />
            <Text>
              {" "}
              Lives in <Text style={styles.changeTextStyle}>{livesIn}</Text>
            </Text>
          </View>
          <View style={styles.detaisTextStyle}>
            <Icon name="location-city" color="gray" />
            <Text>
              {" "}
              From <Text style={styles.changeTextStyle}>{from}</Text>
            </Text>
          </View>
          <View style={styles.detaisTextStyle}>
            <Icon name="favorite" color="gray" />
            <Text style={styles.changeTextStyle}> {relationshipStatus}</Text>
          </View>
          <View style={styles.detaisTextStyle}>
            <Icon name="people" type="material" color="gray" />
            <Text> Followed by {follower}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.eidtButton} onPress={handdleEdit}>
          <Text style={{ color: "#3395D6" }}>Edit public details</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderWidth: 0.5,
          borderColor: "#c1c1c1",
          marginTop: 30,
          width: "95%",
          alignSelf: "center",
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
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

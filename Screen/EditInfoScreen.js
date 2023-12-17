import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import Routes from "../Utility/Routes";

export default function EditInfoScreen({ navigation }) {
  const handdleEdit = () => {
    navigation.navigate(Routes.EditInfoScreen);
  };
  return (
    <View>
      <Text style={styles.StyleDeailsText}>Customise your Intro</Text>
      <View style={{ padding: 10 }}>
        <View style={styles.detaisTextStyle}>
          <Text>
            {" "}
            Work at <Text style={styles.changeTextStyle}>Student</Text>
          </Text>
          <TouchableOpacity onPress={handdleEdit}>
            <Icon name="pencil" type="font-awesome" color="#3395D6" size={17} />
          </TouchableOpacity>
        </View>
        <View style={styles.detaisTextStyle}>
          <Text>
            {" "}
            Lives in{" "}
            <Text style={styles.changeTextStyle}>Dhaka, Bangladesh</Text>
          </Text>
          <TouchableOpacity onPress={handdleEdit}>
            <Icon name="pencil" type="font-awesome" color="#3395D6" size={17} />
          </TouchableOpacity>
        </View>
        <View style={styles.detaisTextStyle}>
          <Text>
            {" "}
            From <Text style={styles.changeTextStyle}>Dhaka, Bangladesh</Text>
          </Text>
          <TouchableOpacity onPress={handdleEdit}>
            <Icon name="pencil" type="font-awesome" color="#3395D6" size={17} />
          </TouchableOpacity>
        </View>
        <View style={styles.detaisTextStyle}>
          <Text style={styles.changeTextStyle}> Single</Text>
          <TouchableOpacity onPress={handdleEdit}>
            <Icon name="pencil" type="font-awesome" color="#3395D6" size={17} />
          </TouchableOpacity>
        </View>
        <View style={styles.detaisTextStyle}>
          <Text> Followed by 1,2031 people</Text>
          <TouchableOpacity onPress={handdleEdit}>
            <Icon name="pencil" type="font-awesome" color="#3395D6" size={17} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.eidtButton} onPress={handdleEdit}>
          <Text style={{ color: "#3395D6" }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  StyleDeailsText: {
    fontSize: 20,
    fontWeight: "700",
    padding: 15,
  },
  detaisTextStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
    paddingVertical: 7,
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});

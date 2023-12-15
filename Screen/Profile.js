import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const [postText, setPostText] = useState("");

  const handlePost = () => {
    // Handle the post submission logic here
    console.log("Posting:", postText);
    // Reset the post text after posting
    setPostText("");
  };

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

        <View
          style={{
            borderWidth: 0.5,
            borderColor: "#c1c1c1",
            marginTop: 30,
            width: "95%",
            alignSelf: "center",
          }}
        ></View>

        <View style={styles.postComponentStyle}>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>Your posts</Text>

          <View style={{ flexDirection: "row", paddingTop: 15 }}>
            <Image
              source={require("../assets/mansur.jpg")}
              style={{ width: 45, height: 45, borderRadius: 50 }}
            />

            <Text
              style={{
                marginLeft: 10,
                fontSize: 17,
                fontWeight: "600",
                paddingTop: 15,
              }}
            >
              Mansurol islam
            </Text>
          </View>

          <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
            <TextInput
              placeholder="What's on your mind?"
              multiline
              numberOfLines={10}
              style={{
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginBottom: 15,
                height: 100,
              }}
              value={postText}
              onChangeText={(text) => setPostText(text)}
            />
          </View>
          <TouchableOpacity
            onPress={handlePost}
            style={{
              backgroundColor: "#CCE8FF",
              padding: 9,
              width: 55,
              borderRadius: 5,
              alignSelf: "flex-end",
              marginRight: 10,
            }}
          >
            <Text style={{ color: "black", fontSize: 16 }}>Post</Text>
          </TouchableOpacity>
        </View>

        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: "row", paddingTop: 15 }}>
            <Image
              source={require("../assets/mansur.jpg")}
              style={{ width: 45, height: 45, borderRadius: 50 }}
            />

            <View style={{}}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 17,
                  fontWeight: "600",
                }}
              >
                Mansurol islam
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 11,
                  marginTop: 5,
                }}
              >
                12 Nov
              </Text>
            </View>
          </View>

          <Text style={{ marginTop: 7 }}>
            orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip .
          </Text>
        </View>

        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: "row", paddingTop: 15 }}>
            <Image
              source={require("../assets/mansur.jpg")}
              style={{ width: 45, height: 45, borderRadius: 50 }}
            />

            <View style={{}}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 17,
                  fontWeight: "600",
                }}
              >
                Mansurol islam
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 11,
                  marginTop: 5,
                }}
              >
                12 Nov
              </Text>
            </View>
          </View>

          <Text style={{ marginTop: 7 }}>
            orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip .
          </Text>
        </View>

        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: "row", paddingTop: 15 }}>
            <Image
              source={require("../assets/mansur.jpg")}
              style={{ width: 45, height: 45, borderRadius: 50 }}
            />

            <View style={{}}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 17,
                  fontWeight: "600",
                }}
              >
                Mansurol islam
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 11,
                  marginTop: 5,
                }}
              >
                12 Nov
              </Text>
            </View>
          </View>

          <Text style={{ marginTop: 7 }}>
            orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip .
          </Text>
        </View>

        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: "row", paddingTop: 15 }}>
            <Image
              source={require("../assets/mansur.jpg")}
              style={{ width: 45, height: 45, borderRadius: 50 }}
            />

            <View style={{}}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 17,
                  fontWeight: "600",
                }}
              >
                Mansurol islam
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 11,
                  marginTop: 5,
                }}
              >
                12 Nov
              </Text>
            </View>
          </View>

          <Text style={{ marginTop: 7 }}>
            orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip .
          </Text>
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
  postComponentStyle: {
    padding: 10,
  },
});

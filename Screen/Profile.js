import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import ProfileHeader from "../Components/ProfileHeader";
import ProfileDetails from "../Components/ProfileDetails";
const firebaseConfig = {
  apiKey: "AIzaSyCWlV6jCSdAuwjsE1zwhUCjR-KwF_hTBSM",
  authDomain: "social-media-bcd4c.firebaseapp.com",
  projectId: "social-media-bcd4c",
  storageBucket: "social-media-bcd4c.appspot.com",
  messagingSenderId: "571128660022",
  appId: "1:571128660022:web:b88c387e9b145043cbd897",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default function Profile() {
  const [postText, setPostText] = useState("");
  const [userPosts, setUserPost] = useState([]);
  const userCollectionRef = collection(db, "userpost");

  const handlePost = async () => {
    await addDoc(userCollectionRef, { postText });
    setPostText("");
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUserPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const PostCard = ({ user }) => {
    return (
      <View>
        <View style={{ flexDirection: "row", paddingTop: 15 }}>
          <Image
            source={require("../assets/mansur.jpg")}
            style={{ width: 45, height: 45, borderRadius: 50 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>
              Mansurol islam
            </Text>
            <Text style={{ fontSize: 11, marginTop: 5 }}>Nov 12</Text>
          </View>
        </View>
        <Text>{user.postText}</Text>
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
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <ProfileHeader />

        <ProfileDetails />
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
          {userPosts.map((user) => (
            <PostCard key={user.id} user={user} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  postComponentStyle: {
    padding: 10,
  },
});

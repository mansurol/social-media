import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import ProfileDetails from "../Components/ProfileDetails";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/UserSlice";
import Routes from "../Utility/Routes";
import ProfileHeader from "../Components/ProfileHeader";

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

export default function Profile({ navigation }) {
  const userData = useSelector((state) => state.userdata);
  const dispatch = useDispatch();
  const [postText, setPostText] = useState("");
  const [userPosts, setUserPost] = useState([]);
  const userCollectionRef = collection(db, "userpost");
  const [loading, setLoading] = useState(false);
  const [nameTime, setnameTime] = useState();

  const handlePost = async () => {
    await addDoc(userCollectionRef, {
      postText: postText || "",
      timestamp: serverTimestamp(),
    });
    setPostText("");
  };

  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    setnameTime(auth);

    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      const filteredPosts = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(
          (post) => post.timestamp !== null && post.timestamp !== undefined
        );

      const sortedPosts = filteredPosts.sort((a, b) => {
        const aTimestamp = a.timestamp ? a.timestamp.toMillis() : 0;
        const bTimestamp = b.timestamp ? b.timestamp.toMillis() : 0;
        return bTimestamp - aTimestamp;
      });

      setUserPost(sortedPosts);
      setLoading(false);
    };

    getUsers();

    const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
      getUsers();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const PostCard = ({ user }) => {
    const postDate = user.timestamp ? new Date(user.timestamp.toDate()) : null;

    return (
      <View>
        <View style={{ flexDirection: "row", paddingTop: 15 }}>
          <Image
            source={{ uri: userData.photo }}
            style={{ width: 45, height: 45, borderRadius: 50 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>
              {userData.name}
            </Text>
            <Text style={{ fontSize: 11, marginTop: 5 }}>
              {postDate ? postDate.toDateString() : "Unknown Date"}
            </Text>
            <Text style={{ fontSize: 11 }}>
              {postDate ? postDate.toLocaleTimeString() : ""}
            </Text>
          </View>
        </View>
        <Text>{user.postText}</Text>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: "#c1c1c1",
            marginTop: 30,
            width: "100%",
            alignSelf: "center",
          }}
        ></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <ProfileHeader navigation={navigation} />

          <ProfileDetails navigation={navigation} />

          <View style={styles.postComponentStyle}>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Your posts</Text>

            <View style={{ flexDirection: "row", paddingTop: 15 }}>
              <Image
                source={{ uri: userData.photo }}
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
                {userData.name}
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
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              userPosts.map((user) => <PostCard key={user.id} user={user} />)
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  postComponentStyle: {
    padding: 10,
  },
});

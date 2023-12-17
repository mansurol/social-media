import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
export default function NewsFeed() {
  const [userPosts, setUserPost] = useState([]);
  const userCollectionRef = collection(db, "userpost");
  const [loading, setLoading] = useState(false);
  const [nameTime, setnameTime] = useState();
  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    setnameTime(auth);

    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      const sortedPosts = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()); // Sort by timestamp in descending order

      setUserPost(sortedPosts);
      setLoading(false);
    };

    getUsers(); // Fetch initial data

    const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
      getUsers(); // Update posts on any change in the collection
    });

    return () => {
      unsubscribe(); // Cleanup the listener when the component unmounts
    };
  }, []);

  const PostCard = ({ user }) => {
    const postDate = user.timestamp ? new Date(user.timestamp.toDate()) : null;
    return (
      <View>
        <View style={{ flexDirection: "row", paddingTop: 15 }}>
          <Image
            source={{ uri: nameTime.currentUser.photoURL }}
            style={{ width: 45, height: 45, borderRadius: 50 }}
          />

          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>
              {nameTime.currentUser.displayName}
            </Text>
            <Text style={{ fontSize: 11, marginTop: 5 }}>
              {postDate ? postDate.toDateString() : "Unknown Date"}
            </Text>
            <Text style={{ fontSize: 11 }}>
              {postDate ? postDate.toLocaleTimeString() : ""}
            </Text>
          </View>
        </View>
        <Text style={{ marginTop: 10 }}>{user.postText}</Text>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: "#c1c1c1",
            width: "100%",
            alignSelf: "center",
            marginTop: 5,
          }}
        ></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ padding: 10 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            userPosts.map((user) => <PostCard key={user.id} user={user} />)
          )}
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

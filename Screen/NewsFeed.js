import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "@firebase/firestore";
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

const LoadingIndicator = () => (
  <View style={styles.loading}>
    <ActivityIndicator size="large" color="#000" />
  </View>
);

const PostCard = ({ user, nameTime }) => {
  const postDate = user.timestamp ? new Date(user.timestamp.toDate()) : null;

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: nameTime.currentUser.photoURL }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {nameTime.currentUser.displayName}
          </Text>
          <Text style={styles.postDateTime}>
            {postDate ? postDate.toDateString() : "Unknown Date"}
          </Text>
          <Text style={styles.postDateTime}>
            {postDate ? postDate.toLocaleTimeString() : ""}
          </Text>
        </View>
      </View>
      <Text style={styles.postText}>{user.postText}</Text>
      <View style={styles.separator} />
    </View>
  );
};

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
        .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());

      setUserPost(sortedPosts);
      setLoading(false);
    };

    getUsers();

    const unsubscribe = onSnapshot(userCollectionRef, () => {
      getUsers();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.posts}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            userPosts.map((user) => (
              <PostCard key={user.id} user={user} nameTime={nameTime} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  posts: {
    padding: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postContainer: {
    marginBottom: 15,
  },
  postHeader: {
    flexDirection: "row",
    paddingTop: 15,
    alignItems: "center",
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 17,
    fontWeight: "600",
  },
  postDateTime: {
    fontSize: 11,
    marginTop: 5,
  },
  postText: {
    marginTop: 10,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: "#c1c1c1",
    width: "100%",
    alignSelf: "center",
    marginTop: 5,
  },
});

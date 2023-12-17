import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
} from "react-native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

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

export default function Post() {
  const userData = useSelector((state) => state.userdata);

  const [postText, setPostText] = useState("");
  const [userPosts, setUserPost] = useState([]);
  const userCollectionRef = collection(db, "userpost");
  const [loading, setLoading] = useState(false);
  const [nameTime, setnameTime] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePost = async () => {
    if (!postText.trim()) {
      setErrorMessage("Please enter your post content");
      return;
    }

    try {
      await addDoc(userCollectionRef, {
        postText: postText.trim(),
        timestamp: serverTimestamp(),
      });
      setPostText("");
      setErrorMessage("");
      setSuccessMessage("Post created successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    setnameTime(auth);
    setLoading(true);

    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUserPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.postComponentStyle}>
            <Text style={{ fontSize: width * 0.06, fontWeight: "700" }}>
              Your posts
            </Text>

            <View style={{ flexDirection: "row", paddingTop: height * 0.015 }}>
              <Image
                source={{ uri: userData.photo }}
                style={{
                  width: width * 0.12,
                  height: width * 0.12,
                  borderRadius: width * 0.06,
                }}
              />

              <Text
                style={{
                  marginLeft: width * 0.03,
                  fontSize: width * 0.045,
                  fontWeight: "600",
                  paddingTop: height * 0.015,
                }}
              >
                {userData.name}
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: width * 0.025,
                marginTop: height * 0.01,
              }}
            >
              <TextInput
                placeholder="What's on your mind?"
                multiline
                numberOfLines={10}
                style={{
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: width * 0.03,
                  paddingHorizontal: width * 0.03,
                  paddingVertical: height * 0.005,
                  marginBottom: height * 0.015,
                  height: height * 0.15,
                }}
                value={postText}
                onChangeText={(text) => setPostText(text)}
              />
              {errorMessage ? (
                <Text style={{ color: "red" }}>{errorMessage}</Text>
              ) : successMessage ? (
                <Text style={{ color: "green" }}>{successMessage}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              onPress={handlePost}
              style={{
                backgroundColor: "#CCE8FF",
                padding: width * 0.018,
                width: width * 0.14,
                borderRadius: width * 0.01,
                alignSelf: "flex-end",
                marginRight: width * 0.025,
              }}
            >
              <Text style={{ color: "black", fontSize: width * 0.042 }}>
                Post
              </Text>
            </TouchableOpacity>
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
    padding: width * 0.025,
    marginTop: height * 0.05,
  },
});

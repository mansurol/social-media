import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Routes from "../../Utility/Routes";

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
const auth = getAuth(app);

export default function SignUp({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSignUp = async () => {
    if (
      fullName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      image === ""
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: fullName,
        photoURL: image,
      });

      console.log("User signed up:", user);
      navigation.navigate(Routes.Login);
    } catch (error) {
      setError(error.message);
      console.error("Sign up failed:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView style={styles.innerContainer}>
          <View>
            <Text style={styles.title}>Sign Up</Text>
            {error && <Text style={styles.error}>{error}</Text>}

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Full Name"
                value={fullName}
                onChangeText={(text) => setFullName(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input}
              />
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
                style={styles.input}
              />
            </View>

            <View>
              <Text style={styles.ImgText}>Add Image</Text>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.choosePicture}
              >
                <Feather name="camera" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {image && <Image source={{ uri: image }} style={styles.image} />}
            <TouchableOpacity
              onPress={handleSignUp}
              style={styles.signUpButton}
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>
              Already have an Account?{" "}
              <Text
                style={styles.loginLink}
                onPress={() => navigation.navigate(Routes.Login)}
              >
                Log in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: height * 0.05,
  },
  innerContainer: {
    width: width * 0.9,
    backgroundColor: "#fff",
    padding: width * 0.05,
    borderRadius: width * 0.05,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    width: "100%",
    borderRadius: 5,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    marginVertical: 10,
  },
  choosePicture: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "lightgray",
    borderRadius: 25,
    marginBottom: 10,
  },
  ImgText: {
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  signUpText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomTextContainer: {
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 20,
  },
  bottomText: {
    fontSize: 17,
  },
  loginLink: {
    color: "tomato",
  },
  error: {
    fontSize: 15,
    padding: 10,
    color: "red",
  },
});

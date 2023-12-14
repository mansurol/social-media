import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Routes from "../../Utility/Routes";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCWlV6jCSdAuwjsE1zwhUCjR-KwF_hTBSM",
  authDomain: "social-media-bcd4c.firebaseapp.com",
  projectId: "social-media-bcd4c",
  storageBucket: "social-media-bcd4c.appspot.com",
  messagingSenderId: "571128660022",
  appId: "1:571128660022:web:b88c387e9b145043cbd897",
};
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      navigation.navigate(Routes.BottomTab);
    } catch (error) {
      setError("Login failed:", error);
      // Handle login failure (e.g., show error message)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}

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
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.bottomTextContainer}>
        <Text
          style={{
            fontSize: 17,
          }}
        >
          Don't have an Account yet?
          <Text
            style={{ color: "red" }}
            onPress={() => navigation.navigate(Routes.SignUp)}
          >
            Create one.
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    width: 300,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 300,
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomTextContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
});

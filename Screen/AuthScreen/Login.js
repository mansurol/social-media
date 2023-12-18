import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

import Routes from "../../Utility/Routes";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../Redux/UserSlice";
import { useDispatch } from "react-redux";

const windowWidth = Dimensions.get("window").width;

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  //validate

  const validateForm = () => {
    if (!email.trim()) {
      setError("Please enter your email");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { displayName, photoURL } = userCredential.user;

      dispatch(
        setUser({
          name: displayName || "",
          photo: photoURL || "",
        })
      );

      navigation.navigate(Routes.BottomTab);
    } catch (error) {
      //console.error("Firebase Auth Error:", error);

      let errorMessage = "Login failed";
      if (error.code === "auth/user-not-found") {
        errorMessage = "Invalid email address or user not found.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else {
        errorMessage = "Unexpected error occurred. Please try again later.";
      }

      setError(errorMessage);
    }
  };

  //Ui
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <Text style={styles.title}>Login</Text>
        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError("");
          }}
          style={[styles.input, { width: windowWidth * 0.8 }]}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError("");
          }}
          secureTextEntry
          style={[styles.input, { width: windowWidth * 0.8 }]}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.bottomTextContainer}>
          <Text style={{ fontSize: 17 }}>
            Don't have an Account yet?
            <Text
              style={{ color: "red" }}
              onPress={() => navigation.navigate(Routes.SignUp)}
            >
              Create one.
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
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
  error: {
    fontSize: 15,
    paddingVertical: 10,
    color: "red",
  },
});

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  KeyboardAvoidingView,
} from "react-native";

import Firebase from "../config/Firebase.js";
import { TextInput } from "react-native-paper";
import { Button as RNPButton } from "react-native-paper";
import mainContext from "../context/mainContext.js";
import SignUpScreen from "./SignUpScreen.js";

const LoginScreen = ({ navigation }) => {
  const { handleLogin } = useContext(mainContext); // accessing handleLogin function in App.js
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoid}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email address"
              onChangeText={(email) => setEmail(email)}
              value={email}
              label="Email"
              keyboardType={"email-address"}
              mode="outlined"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
              value={password}
              secureTextEntry={true}
              label="Password"
              mode="outlined"
            />
          </View>
          <RNPButton
            onPress={() => handleLogin(email, password)}
            mode="contained"
            icon="login"
          ></RNPButton>
          <View style={styles.signUpContainer}>
            <Text>Don't have an account?</Text>
            <RNPButton onPress={() => navigation.navigate("SignUpScreen")}>
              Sign up here!
            </RNPButton>
            {/* <View style={styles.socialContainer}></View> */}
          </View>
        </View>
        
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  keyboardAvoid: {
    flex: 1
  },
  socialContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  }
});

export default LoginScreen;

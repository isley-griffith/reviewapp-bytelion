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
import { TextInput, HelperText} from "react-native-paper";
import { Button as RNPButton } from "react-native-paper";
import mainContext from "../context/mainContext.js";
import SignUpScreen from "./SignUpScreen.js";

const LoginScreen = ({ navigation }) => {
  /**
   * Hooks
   */
  const { handleLogin } = useContext(mainContext); // accessing handleLogin function in App.js
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleGLogin } = useContext(mainContext);

  /**
   * Placeholder bad email checking function
   */
  const badEmailChecker = () => {
    if (email != "") {
      return (!email.includes('@') | !email.includes('.'));
    }
    return null;
  }
  /**
   * Placeholder bad password checking function
   */
  const badPasswordChecker = () => {
    if (password.length > 1){
      return !password
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoid}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(email) => setEmail(email)}
              value={email}
              label="Email"
              keyboardType={"email-address"}
              mode="flat"
              // theme={{colors: "#202124"}}
            />
            <HelperText type="error" visible={badEmailChecker()}>
              Email address is invalid.*
            </HelperText>
          </View>
          <View style={styles.inputContainer}>
            <TextInput

              onChangeText={(password) => setPassword(password)}
              value={password}
              secureTextEntry={true}
              label="Password"
              mode="flat"
              // theme={{colors: {primary: "#202124"}}}
            />
            <HelperText type="error" visible={badPasswordChecker()}>
              Password is required.*
            </HelperText>
          </View>
          <RNPButton
            onPress={() => handleLogin(email, password)}
            mode="contained"
            icon="login"
          >Login</RNPButton>
          <View style={styles.signUpContainer}>
            <Text>Don't have an account?</Text>
            <RNPButton onPress={() => navigation.navigate("SignUpScreen")}>
              Sign up here!
            </RNPButton>
            {/* <View style={styles.socialContainer}></View> */}
          </View>
          <RNPButton style={styles.googleButtonStyle} onPress={() => handleGLogin()} mode="contained" icon="google">Login with Google</RNPButton>
        </View>
        
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#35363a"
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
  },
  googleButtonStyle: {
    backgroundColor: '#4285F4',
    marginTop: 20,
  },
});

export default LoginScreen;

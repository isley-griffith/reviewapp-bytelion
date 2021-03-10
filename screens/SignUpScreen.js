import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Firebase from "../config/Firebase.js";
import { TextInput, Button } from "react-native-paper";
import mainContext from "../context/mainContext.js";

const SignUpScreen = ({ navigation }) => {
  const { handleSignup } = useContext(mainContext);
  const [name, setName] = useState("");
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
              placeholder="Name"
              onChangeText={(name) => setName(name)}
              value={name}
              label="Name"
              mode="outlined"
            />
          </View>
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
          <Button
            mode="contained"
            icon="login"
            onPress={() => handleSignup(email, password)}
          ></Button>
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
  keyboardAvoid: {
    flex: 1,
  },
});

export default SignUpScreen;

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Firebase from "../config/Firebase.js";
import { TextInput, HelperText } from "react-native-paper";
import { Button as RNPButton } from "react-native-paper";
import mainContext from "../context/mainContext.js";
import SignUpScreen from "./SignUpScreen.js";

const LoginScreen = ({ navigation }) => {
  /**
   * Hooks
   */
  const { handleGLogin } = useContext(mainContext);

  return (
    <View style={styles.container}>
      <Text>

      </Text>
      <RNPButton
        style={styles.googleButtonStyle}
        onPress={() => handleGLogin()}
        mode="contained"
        icon="google"
      >
        Login with Google
      </RNPButton>
    </View>
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
    backgroundColor: "#35363a",
  },
  googleButtonStyle: {
    backgroundColor: "#4285F4",
    marginTop: 20,
  },
});

export default LoginScreen;

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";


import { Button as RNPButton } from "react-native-paper";
import mainContext from "../context/mainContext.js";

const LoginScreen = ({ navigation }) => {
  /**
   * Hooks
   */
  const { handleGLogin } = useContext(mainContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        You can review review app reviews!
      </Text>
      <Text style={styles.title}> Start by logging in below.</Text>
      <Image style={styles.image} source={require('../assets/images/arrowdown.png')}/>

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
  title: {
    fontSize: 24,
    color: "#bbb",
    letterSpacing: 1,
  },
  image: {
    position: 'absolute',
    width: 65,
    height: 65,
    right: '5%',
    top: '49%'

  }

});

export default LoginScreen;

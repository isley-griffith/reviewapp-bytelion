import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global.js";

const About = () => {
  return (
    <View style={globalStyles.container}>
      <Text>About Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

export default About;

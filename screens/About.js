import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global.js";

export default function About() {
  return (
    <View style={globalStyles.container}>
      <Text>About Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

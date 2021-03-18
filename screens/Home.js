import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global.js";
import Reviews from "../components/Reviews.js";
import Firebase from "../config/Firebase.js";
import mainContext from "../context/mainContext.js";
import { Text, Button, Title, Paragraph, Drawer } from "react-native-paper";
/**
 * Contains the Reviews component
 * Not currently necessary, but could make certain functionalities easier to execute in the future
 * @param {} param0
 */
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Reviews navigation={navigation} />
    </View>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202124",
    height: "100%",
  },

});

export default Home;

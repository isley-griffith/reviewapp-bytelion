import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global.js";
import Reviews from "../components/Reviews.js";

const Home = ({ navigation }) => {
  return (
    // <View style={globalStyles.container}>
    //   <Text style={globalStyles.titleText}>Home Screen</Text>
    //   <Button
    //     title="Review Details"
    //     onPress={() => navigation.navigate("ReviewDetails")}
    //   />
    //   <Reviews/>
    // </View>
    <View style={styles.container}>
      <Reviews />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%"
  },
});

export default Home;

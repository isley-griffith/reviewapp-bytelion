import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global.js";
import Reviews from "../components/Reviews.js";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Button
        title="Review Details"
        onPress={() => navigation.navigate("ReviewDetails")}
      /> */}
      <Reviews />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#35363a",
    backgroundColor: "#202124",
    height: "100%",
  },
});

export default Home;

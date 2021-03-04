import React from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "../styles/global.js";

const Home = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Home Screen</Text>
      <Button
        title="Review Details"
        onPress={() => navigation.navigate("ReviewDetails")}
      />
    </View>
  );
};

export default Home;

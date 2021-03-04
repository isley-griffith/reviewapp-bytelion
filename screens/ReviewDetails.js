import React from "react";
import { View, Text, Button } from "react-native";
import { globalStyles } from "../styles/global.js";

const ReviewDetails = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>ReviewDetails Screen</Text>
      {/* <Button title="Back to home" onPress={() => navigation.goBack()}/> */}
    </View>
  );
};

export default ReviewDetails;

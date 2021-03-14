import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Rating } from "react-native-ratings";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Review from "../components/Review.js";
import { SharedElement } from "react-navigation-shared-element";

const ReviewScreen = ({ navigation, route }) => {
  const { item } = route.params;

  function getColor(value) {
    let hue = ((value / 5) * 120).toString(10);
    return ["hsl(", hue, ",100%, 70%)"].join("");
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <AntDesign
          name="close"
          size={28}
          style={{
            padding: 12,
            position: "absolute",
            top: 30,
            right: 10,
            zIndex: 100,
          }}
          color={"white"}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </SafeAreaView>

      <SharedElement id={item.key} style={styles.reviewContainer}>
        <Review item={item} />
      </SharedElement>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202124",
  },
  reviewContainer: {
    position: 'absolute',
    top: 64,
    margin: 16,
  },
  reviewText: {
    flex: 1,
    fontSize: 18,
  },
  thumbsContainer: {
    flexDirection: "row",
    paddingTop: 10,
  },
  bottomRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rating: {
    position: "absolute",
    left: 65,
    top: 18,
  },
  date: {
    opacity: 0.3,
    position: "absolute",
    right: 128,
    top: 12,
    color: "white",
  },
  read: {
    lineHeight: 21,
    marginTop: 10,
    color: "#3FA7D6",
  },
  commentContainer: {
    // flex: 1,
    position: "absolute",
    right: 0,
    height: "100%",
  },
  comment: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  likes: {
    fontSize: 16,
    color: "white",
  },
});

ReviewScreen.sharedElements = (route) => {
  const { item } = route.params;
  return [item.key];
};

export default ReviewScreen;

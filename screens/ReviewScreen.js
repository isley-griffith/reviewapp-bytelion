import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Review from "../components/Review.js";
import { SharedElement } from "react-navigation-shared-element";
import Comment from "../components/Comment.js";
import firebase from "firebase";
import CommentList from "../components/CommentList.js";


const ReviewScreen = ({ navigation, route }) => {
  const { item } = route.params;

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
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </SafeAreaView>

      <SharedElement id={item.key} style={styles.reviewContainer}>
        <Review item={item} />
        <Comment item={item} />
        <Text style={styles.commentHeader}>Replies: </Text>

        <CommentList item={item}/>
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
    position: "absolute",
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
  commentHeader: {
    fontWeight: 'bold',
    color: 'white'
  }
});

ReviewScreen.sharedElements = (route) => {
  const { item } = route.params;
  return [item.key];
};

export default ReviewScreen;

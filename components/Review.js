import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { Rating } from "react-native-ratings";
import firebase from "firebase";

/**
 * Individual review component
 * @param {} param0
 */
export default function Review({ item, navigation }) {
  // In case I wanted to do more on upvote
  const handleUpvote = () => {
    addCurrentUserToUpvoteList();
  };

  // In case I wanted to do more on downvote
  const handleDownvote = () => {
    addCurrentUserToDownvoteList();
  };

  // Logic of upvotes.
  // Instead of redundant db requests, should have used Redux
  const addCurrentUserToUpvoteList = () => {
    const currUID = firebase.auth().currentUser.uid;
    let upvotedList = firebase
      .database()
      .ref(`reviews/${item.key}/upvoteUserList`);

    let downvotedList = firebase
      .database()
      .ref(`reviews/${item.key}/downvoteUserList`);

    downvotedList.once("value", function (snapshot) {
      let users = snapshot.val() || {};
      if (currUID in users) {
        delete users[currUID];
        firebase
          .database()
          .ref(`reviews/${item.key}/downvoteUserList/${currUID}`)
          .remove();
      }
      firebase
        .database()
        .ref(`reviews/${item.key}`)
        .update({
          downvoteUserList: users,
          downvotes: Object.keys(users).length,
        });
    });
    upvotedList.once("value", function (snapshot) {
      let users = snapshot.val() || {};
      if (!(currUID in users)) {
        users[currUID] = true;
      } else if (currUID in users) {
        delete users[currUID];
      }
      firebase
        .database()
        .ref(`reviews/${item.key}`)
        .update({
          upvoteUserList: users,
          upvotes: Object.keys(users).length,
        });
    });
  };

  // Logic of downvotes.
  // Instead of redundant db requests, should have used Redux
  const addCurrentUserToDownvoteList = () => {
    const currUID = firebase.auth().currentUser.uid;

    let downvotedList = firebase
      .database()
      .ref(`reviews/${item.key}/downvoteUserList`);

    let upvotedList = firebase
      .database()
      .ref(`reviews/${item.key}/upvoteUserList`);

    upvotedList.once("value", function (snapshot) {
      let users = snapshot.val() || {};
      if (currUID in users) {
        delete users[currUID];
        firebase
          .database()
          .ref(`reviews/${item.key}/upvoteUserList/${currUID}`)
          .remove();
      }
      firebase
        .database()
        .ref(`reviews/${item.key}`)
        .update({
          upvotedList: users,
          upvotes: Object.keys(users).length,
        });
    });

    downvotedList.once("value", function (snapshot) {
      // downvoted
      let users = snapshot.val() || {};
      if (!(currUID in users)) {
        users[currUID] = true;
      } else if (currUID in users) {
        delete users[currUID];
      }
      firebase
        .database()
        .ref(`reviews/${item.key}`)
        .update({
          downvoteUserList: users,
          downvotes: Object.keys(users).length,
        });
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View>
          <Avatar.Icon size={42} marginBottom={5} icon="head" />

          <View style={styles.mainContainer}>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        </View>

        <View style={styles.bottomRowContainer}>
          <View style={styles.thumbsContainer}>
            <TouchableOpacity
              onPress={() => handleUpvote()}
              style={styles.likeContainer}
            >
              <MaterialIcons name="thumb-up" color="white" size={16} />
              <Text style={styles.likes}> {item.upvotes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDownvote()}
              style={styles.likeContainer}
            >
              <MaterialIcons
                name="thumb-down"
                color="#bbb"
                size={16}
                style={{ marginLeft: 8 }}
              />
              <Text style={styles.likes}> {item.downvotes}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/** rating */}
      <View style={styles.rating}>
        <Rating
          type="custom"
          ratingColor="#ECDD7B"
          imageSize={20}
          tintColor="#35363a"
          isDisabled
          startingValue={item.rating}
          fractions={1}
        />
      </View>
      <View style={styles.date}>
        <Text style={styles.date}>{item.created_at.split("T")[0]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#35363a",
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
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
    right: "5%",
    bottom: "7.5%",
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
  likeContainer: {
    flexDirection: "row",
    marginRight: 2,
    padding: 4,
  },
  message: {
    lineHeight: 21,
    color: "white",
    paddingRight: 25,
  },
});

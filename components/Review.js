import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { exportReviewsToFirestore } from "../API/firebaseMethods.js";
import firebase from "firebase";

/**
 * Individual review component
 * @param {} param0
 */

export default function Review({ item, navigation }) {
  const [upvote, setUpvote] = useState(0);
  const [user, setUser] = useState("");
  const [upvotedUsers, setUpvotedUsers] = useState([]);
  const handleUpvote = () => {
    // let upvoteCount = Object.keys.length;
    addCurrentUserToUpvoteList();
    setUpvote(upvote + 1);
    firebase
      .database()
      .ref(`reviews/${item.key}`)
      .update({
        upvotes: upvoteCount,
      });
  };

  const handleDownvote = () => {
    setUpvote(upvote - 1);
    firebase
      .database()
      .ref("reviews/" + item.key)
      .update({
        upvotes: upvote,
      });
  };

  const addCurrentUserToUpvoteList = () => {
    const currUID = firebase.auth().currentUser.uid;
    let users = {};
    let upvotedList = firebase.database().ref(`reviews/${item.key}/userList`);

    upvotedList.on("value", function (snapshot) {
      users = snapshot.val() || {};
      if (!(currUID in users)) {
        users[currUID] = true;
        firebase
          .database()
          .ref("reviews/" + item.key)
          .update({ userList: users });
      }
    });
  };

  // length of object with Object.keys.length
  // default upvote count of 0, increment and decrement depending on whether or not line 47 is satisfied

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        {/* message, created_at, avatar */}

        <View>
          <Avatar.Icon size={42} marginBottom={5} icon="head" />

          <View style={styles.mainContainer}>
            <Text
              style={{
                lineHeight: 21,
                color: "white",
                paddingRight: 25,
              }}
            >
              {item.message}
            </Text>
          </View>
        </View>

        <View style={styles.bottomRowContainer}>
          <View style={styles.thumbsContainer}>
            <TouchableOpacity onPress={() => handleUpvote()}>
              <MaterialIcons name="thumb-up" color="white" size={16} />
            </TouchableOpacity>
            <Text style={styles.likes}>{item.upvotes} </Text>

            <TouchableOpacity onPress={() => handleDownvote()}>
              <MaterialIcons
                name="thumb-down"
                color="#bbb"
                size={16}
                style={{ marginLeft: 8 }}
              />
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
    // backgroundColor: "#202124",
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
});

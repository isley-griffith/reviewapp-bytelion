import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import firebase from "firebase";

const Comment = ({ item }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (text) => {
    let commentsObj = {};
    let commentsList = firebase.database().ref(`reviews/${item.key}/comments`);
    const name = firebase.auth().currentUser.displayName;

    commentsList.once("value", function (snapshot) {
      commentsObj = snapshot.val() || {};
      if (commentsObj[name] == null) {
        commentsObj[name] = comment;
        firebase
          .database()
          .ref(`reviews/${item.key}`)
          .update({ comments: commentsObj });
      } else {
        Alert.alert("Sorry, you can only comment on this review once.");
      }
    });

    firebase
      .database()
      .ref("reviews/" + item.key)
      .update({});
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={`What do you think about this review?`}
        onChangeText={(comment) => setComment(comment)}
      />
      <TouchableOpacity onPress={() => handleSubmit(comment)}>
        <Button>Reply</Button>
      </TouchableOpacity>

      {/** TODO: retrieve comments from Firebase and display*/}
      <View>
        {/* <Text>{item.comments}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postedCommentContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 50,
  },
});

export default Comment;

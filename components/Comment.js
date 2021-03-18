import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import firebase from "firebase";

const Comment = ({ item }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    let commentsObj = {};
    let commentsList = firebase.database().ref(`reviews/${item.key}/comments`);
    const name = firebase.auth().currentUser.displayName;
    if (comment) {
      // If comment is not null
      commentsList.once("value", function (snapshot) {
        // assigning comment to current displayName
        commentsObj = snapshot.val() || {};
        if (commentsObj[name] == null) {
          commentsObj[name] = comment;
          firebase
            .database()
            .ref(`reviews/${item.key}`)
            .update({ comments: commentsObj });
        } else {
          Alert.alert("Sorry, you can only reply to this review once.");
        }
      });
    } else {
      // If comment is empty
      Alert.alert("Reply cannot be empty.");
    }
    firebase
      .database()
      .ref("reviews/" + item.key)
      .update({});
  };

  return (
    <View>
      <TextInput
        clearButtonMode="always"
        mode="outlined"
        placeholder={`Tap 'Reply' to submit!`}
        label="Type here to reply..."
        theme={{
          colors: {
            text: "#f5f5f5",
            accent: "#ffffff",
            primary: "#ffffff",
            placeholder: "grey",
            background: "#35363a",
          },
        }}
        underlineColor="#f5f5f5"
        underlineColorAndroid="#f5f5f5"
        onChangeText={(comment) => setComment(comment)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleSubmit(comment)}>
          <Button
            mode="outlined"
            style={styles.button}
            labelStyle={{ fontWeight: "bold", color: "#ffffff" }}
          >
            Reply
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postedCommentContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 50,
  },
  button: {
    flex: 1,
    width: 175,
    fontWeight: "800",
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 50,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export default Comment;

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
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
    <View style={styles.container}>
      <TextInput
        clearButtonMode="always"
        placeholder={`What do you think about this review?`}
        onChangeText={(comment) => setComment(comment)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleSubmit(comment)}>
          <Button mode="outlined" style={styles.button} labelStyle={{fontWeight: 'bold'}}>
            Reply
          </Button>
        </TouchableOpacity>
      </View>

      {/** TODO: retrieve comments from Firebase and display*/}
      <View>{/* <Text>{item.comments}</Text> */}</View>
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
  button: {
    flex: 1,
    width: 100,
    fontWeight: "800",
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 50
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
});

export default Comment;

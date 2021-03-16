import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import firebase from "firebase";
const Comment = ({ item }) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  const ItemView = (item, key) => {
    return (
      <View key={key}>
        <Text>{comment}</Text>
      </View>
    )
  }

  

  const handleSubmit = (text) => {
    setComment(text);
    setCommentList(...commentList, comment);
    firebase
      .database()
      .ref("reviews/" + item.key)
      .update({
        comments: commentList,
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={`What do you think about this review?`}
        onChangeText={(comment) => setComment(comment)}
      />
      <TouchableOpacity onPress={() => handleSubmit(comment)}>
        <Button>Comment</Button>
      </TouchableOpacity>


        {/** TODO: retrieve comments from Firebase and display*/} 
        <Text>{item.comments}</Text>

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

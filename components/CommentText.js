import React from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from 'firebase'

export default function CommentText({ item }) {
  const DISPLAY_NAME = 0;
  const VALUE = 1;
  
  return (
    <View style={styles.overallContainer}>
      <View style={styles.container}>
        <Text style={styles.commentTextStyle}>{item.comments[DISPLAY_NAME]}</Text>
        <Text style={styles.commentTextStyle}>{item.comments[VALUE]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
  },
  container: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
  },
  commentTextStyle: {
    color: "white",
  },
});

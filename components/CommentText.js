import React from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from "firebase";
import { Divider } from "react-native-paper";

export default function CommentText({ item }) {
  const DISPLAY_NAME = 0;
  const VALUE = 1;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.commentNameStyle}>
          {item.comments[DISPLAY_NAME]}:
        </Text>
        {/* <Divider style={styles.divider}/> */}
        <Text style={styles.commentTextStyle}>{item.comments[VALUE]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    // flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    backgroundColor: "#35363a",
    marginTop: 10
  },
  commentTextStyle: {
    color: "white",
  },
  commentNameStyle: {
    color: "white",
    fontWeight: "bold",
    opacity: .5
  },
  divider: {
    backgroundColor: '#bbb',
    marginTop: 3,
    marginBottom: 3,
  }
});

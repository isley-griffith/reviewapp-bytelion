import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Comment from "./Comment.js";
import CommentText from "./CommentText.js";

import firebase from "firebase";

export default function CommentList({ item }) {
  const [data, setData] = useState([]);
  const currUID = firebase.auth().currentUser.uid;
  
  useEffect(() => {
    firebase
      .database()
      .ref(`reviews/${item.key}/comments/`)
      .on("value", (snapshot) => {
        let li = [];
        snapshot.forEach((child) => {
          li.push({
            comments: [child.key, child.val()],
          });
        });
        setData(li);
      });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => {return item.key}}
        contentContainerStyle={{paddingTop: 30, paddingBottom: 200}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.container}>
              <CommentText item={item} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
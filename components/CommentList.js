import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import CommentText from "./CommentText.js";
import firebase from "firebase";

export default function CommentList({ item }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref(`reviews/${item.key}/comments/`)
      .on("value", (snapshot) => {
        let li = [];
        snapshot.forEach((child) => {
          // child.key is displayName. child.val() is the comment associated
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
        keyExtractor={(item) => {
          return item.key;
        }}
        contentContainerStyle={{ paddingTop: 30, paddingBottom: 200 }}
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

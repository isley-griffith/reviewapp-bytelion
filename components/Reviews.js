import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

import Comment from "./Comment.js";
import Review from "./Review.js";
import firebase from "firebase";
import { SharedElement } from "react-navigation-shared-element";

/**
 * Displays all reviews from mock API in a Flatlist component
 */
const Reviews = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = 134.3;

  useEffect(() => {
    firebase
      .database()
      .ref("reviews/")
      .on("value", (snapshot) => {
        let li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            created_at: child.val().created_at,
            message: child.val().message,
            rating: child.val().rating,
            upvotes: child.val().upvotes
          });
        });

        setLoading(false);
        setData(li);
      });
  }, []);

  return (
    <View
      style={{ flex: 1, paddingLeft: 16, paddingRight: 16, height: "100%" }}
    >
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <FlatList
            data={data}
            contentContainerStyle={{
              paddingTop: 80,
              paddingBottom: 80,
            }}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate("Review Details", { item });
                    }}
                  >
                    <SharedElement id={item.key}>
                      <Review item={item} />
                    </SharedElement>
                  </TouchableWithoutFeedback>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Reviews;

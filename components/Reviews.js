import React, { Component, useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

import Header from "./Header.js";
import Review from "./Review.js";
import firebase from "firebase";
import { SharedElement } from "react-navigation-shared-element";
import mainContext from "../context/mainContext.js";
import { Button } from "react-native-paper";
import Sort from "../components/Sort.js";

/**
 * Displays all reviews from mock API in a Flatlist component
 */

const Reviews = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [tapped, setTapped] = useState(false);
  const [filterName, setFilterName] = useState('Oldest')
  const { signOutUser } = useContext(mainContext);

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
            upvotes: child.val().upvotes,
            downvotes: child.val().downvotes,
          });
        });
        setLoading(false);
        setData(li);
      });
  }, []);

  const handleSort = () => {
    firebase
      .database()
      .ref(`reviews/`)
      .on("value", (snapshot) => {
        let li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            created_at: child.val().created_at,
            message: child.val().message,
            rating: child.val().rating,
            upvotes: child.val().upvotes,
            downvotes: child.val().downvotes,
          });
        });
        if (tapped) {
          li.reverse();
          setData(li)
          setTapped(false);
          setFilterName('Newest');
        } else if (!tapped) {
          setData(li);
          setTapped(true);
          setFilterName('Oldest');
        }
      });
  };

  return (
    <View style={styles.flatList}>
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
          <Header />
          <View style={styles.signOutContainer}>
            <Button onPress={() => signOutUser()} icon="logout"></Button>
          </View>

          <View style={styles.filterContainer}>
            <Button onPress={() => handleSort(data)} icon="filter">{filterName}</Button>
          </View>

          <FlatList
            data={data}
            contentContainerStyle={{
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

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    height: "100%",
  },
  signOutContainer: {
    position: "absolute",
    borderRadius: 10,
    top: 40,
    left: 15,
    zIndex: 100,
    backgroundColor: "white",
  },
  filterContainer: {
    position: "absolute",
    borderRadius: 10,
    top: 40,
    right: 15,
    zIndex: 100,

    backgroundColor: "white",
  },
});

export default Reviews;

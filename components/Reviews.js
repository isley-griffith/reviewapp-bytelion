import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaView,
  Button,
} from "react-native";
import Review from "./Review.js";

export default function Reviews() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = 134.3;
  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/bytelion/expo_test_mock_api/reviews"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
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
          <Animated.FlatList
            data={data}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            contentContainerStyle={{
              paddingTop: 60,
            }}
            keyExtractor={({ id }) => id.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const inputRange = [
                -1, // stays same
                0,
                ITEM_SIZE * index, // when reaches top edge
                ITEM_SIZE * (index + 2), // animation finishes after scrolling 2 items
              ];
              const opacityInputRange = [
                -1, // stays same
                0,
                ITEM_SIZE * index, // when reaches top edge
                ITEM_SIZE * (index + 1), // animation finishes after scrolling 1 item
              ];

              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const opacity = scrollY.interpolate({
                inputRange: opacityInputRange,
                outputRange: [1, 1, 1, 0],
              });

              return (
                <Animated.View style={{ transform: [{ scale }], opacity }}>
                  <Review item={item} />
                </Animated.View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

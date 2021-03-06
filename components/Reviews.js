import React, { Component, useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import Review from "./Review.js";

export default function Reviews() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
    <View style={{ flex: 1, paddingLeft: 16, paddingRight: 16 }}>
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
          <Text style={{ fontSize: 18, color: "green", textAlign: "center" }}>
            {data.title}
          </Text>

          <FlatList
            data={data}
            keyExtractor={({ id }) => id.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Review item={item} />}
          />
        </View>
      )}
    </View>
  );
}

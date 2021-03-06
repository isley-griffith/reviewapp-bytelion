import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import globalStyles from "../styles/global.js";
import { MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { Rating } from 'react-native-ratings';

export default function Review({ item }) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  const voteHandler = () => {

  }

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        {/* message, created_at, avatar */}
        <View>
          <Avatar.Text size={42} marginBottom={5} label={"IG"} />
          <Text style={styles.reviewText}>{item.message}</Text>
        </View>
        <View>
          <Text style={{ opacity: 0.4 }}>{item.created_at.split("T")[0]}</Text>
        </View>
        <View style={styles.bottomRowContainer}>
          <View style={styles.thumbsContainer}>
            <TouchableOpacity>
              <MaterialIcons name="thumb-up" color="coral" size={16} />
            </TouchableOpacity>
            <Text style={{ fontSize: 16 }}> 0 </Text>
            <TouchableOpacity>
              <MaterialIcons name="thumb-down" color="teal" size={16} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="comment" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      {/** rating */}
      <View style={styles.rating}>
        <Rating 
            type="star"
            imageSize={20}
            isDisabled
            startingValue={item.rating}
            fractions={1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
    // justifyContent:'flex-start',
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#bbb",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  reviewText: {
    flex: 1,
    fontFamily: "RobotoRegular",
    fontSize: 18,
  },
  thumbsContainer: {
    flexDirection: "row",
    paddingTop: 10,
  },
  bottomRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rating: {
    position: 'absolute',
    left: 65,
    top: 18
  }
});

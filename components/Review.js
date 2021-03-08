import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { Rating } from "react-native-ratings";

export default function Review({ item }) {
  function getColor(value) {
    let hue = ((value / 5) * 120).toString(10);
    return ["hsl(", hue, ",100%, 70%)"].join("");
  }
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const STAR_SIZE = 20;
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length > 1); //to check if text is more than 1 line
    // console.log(e.nativeEvent);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        {/* message, created_at, avatar */}
        <View>
          <Avatar.Icon size={42} marginBottom={5} icon="head" />

          <View style={styles.mainContainer}>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 2}
              style={{
                lineHeight: 21,
                fontFamily: "RobotoRegular",
                color: "white",
              }}
            >
              {item.message}
            </Text>

            {lengthMore ? (
              <Text onPress={toggleNumberOfLines} style={styles.read}>
                {textShown ? "Read less..." : "Read more..."}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.bottomRowContainer}>
          <View style={styles.thumbsContainer}>
            <TouchableOpacity>
              <MaterialIcons name="thumb-up" color="white" size={16} />
            </TouchableOpacity>
            <Text style={styles.likes}> 0 {/** Placeholder */}</Text>
            <TouchableOpacity>
              <MaterialIcons
                name="thumb-down"
                color="#bbb"
                size={16}
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <MaterialIcons
              name="comment"
              size={20}
              color="white"
              style={styles.comment}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/** rating */}
      <View style={styles.rating}>
        <Rating
          type="custom"
          ratingColor={getColor(item.rating)}
          imageSize={20}
          isDisabled
          startingValue={item.rating}
          fractions={1}
        />
      </View>
      <View>
        <Text style={styles.date}>{item.created_at.split("T")[0]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    // backgroundColor: "#202124",
    backgroundColor: "#35363a",
    borderColor: "#bbb",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
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
    position: "absolute",
    left: 65,
    top: 18,
  },
  date: {
    opacity: 0.3,
    position: "absolute",
    right: 128,
    top: 12,
    color: "white",
    fontFamily: "RobotoRegular",
  },
  read: {
    lineHeight: 21,
    marginTop: 10,
    color: "#3FA7D6",
    fontFamily: "RobotoRegular",
  },
  comment: {
    position: "absolute",
    right: 4,
    bottom: 0,
  },
  likes: {
    fontSize: 16,
    fontFamily: "RobotoRegular",
    color: "white",
  },
});

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Rating } from "react-native-ratings";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const ReviewScreen = ({ navigation, route }) => {
  const { item } = route.params;

  function getColor(value) {
    let hue = ((value / 5) * 120).toString(10);
    return ["hsl(", hue, ",100%, 70%)"].join("");
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <AntDesign
          name="close"
          size={28}
          style={{
            padding: 12,
            position: "absolute",
            top: 30,
            right: 10,
            zIndex: 100,
          }}
          color={"white"}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </SafeAreaView>
      <View style={styles.reviewContainer}>
        <View style={{ width: "100%" }}>
          <View>
            <Avatar.Icon size={42} marginBottom={5} icon="head" />

            <View style={styles.mainContainer}>
              <Text
                style={{
                  lineHeight: 21,
                  color: "white",
                  paddingRight: 25,
                }}
              >
                {item.message}
              </Text>
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
          </View>
        </View>
        {/** rating */}

        <View style={styles.rating}>
          <Rating
            type="custom"
            ratingColor={getColor(item.rating)}
            imageSize={20}
            tintColor="#35363a"
            isDisabled
            startingValue={item.rating}
            fractions={1}
          />
        </View>
        <View>
          <Text style={styles.date}>{item.created_at.split("T")[0]}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202124",
  },
  reviewContainer: {
    flexDirection: "row",
    // backgroundColor: "#202124",
    backgroundColor: "#35363a",
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 16,
    marginTop: 32,
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
  },
  read: {
    lineHeight: 21,
    marginTop: 10,
    color: "#3FA7D6",
  },
  commentContainer: {
    // flex: 1,
    position: "absolute",
    right: 0,
    height: "100%",
  },
  comment: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  likes: {
    fontSize: 16,
    color: "white",
  },
});

export default ReviewScreen;

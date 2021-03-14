import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global.js";
import Reviews from "../components/Reviews.js";
import Firebase from "../config/Firebase.js";
import mainContext from "../context/mainContext.js";
import { Text, Button, Title, Paragraph } from "react-native-paper";
import Sort from "../components/Sort.js";
/**
 * Contains the Reviews component and allows for other buttons
 * to overlay on top.
 * @param {} param0
 */
const Home = ({ navigation }) => {
  const { currentUser } = Firebase.auth();
  const { signOutUser } = useContext(mainContext);
  const { inHome } = useContext(mainContext);
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Sort />
      </View>

      <View style={styles.signOutContainer}>
        <Button onPress={() => signOutUser()} icon="logout">
          Logout
        </Button>
      </View>
      <Reviews />
    </View>
  );
};

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#35363a",
    backgroundColor: "#202124",
    height: "100%",
  },
  signOutContainer: {
    position: "absolute",
    borderRadius: 10,
    bottom: 20,
    left: 20,
    zIndex: 100,
    backgroundColor: "white"
  },
  filterContainer: {
    position: "absolute",
    borderRadius: 10,
    top: 40,
    right: 15,
    zIndex: 100,
    
    backgroundColor: 'white'
  },
});

export default Home;

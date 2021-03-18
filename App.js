import React, { useState, useEffect, useMemo } from "react";
import * as Font from "expo-font";
import Home from "./screens/Home.js";
import LoginScreen from "./screens/LoginScreen.js";
import SignUpScreen from "./screens/SignUpScreen.js";
import ReviewScreen from "./screens/ReviewScreen.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator, Alert } from "react-native";
import mainContext from "./context/mainContext";
import Firebase from "./config/Firebase.js";
import Constants from "expo-constants";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Stack = createSharedElementStackNavigator();

const App = ({ navigation }) => {
  const [userLogged, setUserLogged] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  /**
   * Effect hook to listen for logouts/logins and loading screens
   */
  useEffect(() => {
    const authListener = Firebase.auth().onAuthStateChanged((user) => {
      setUserLogged(user ? true : false);
      setIsLoading(false);
      setUserProfile(user);
    });
    return authListener;
  }, []);

  /**
   * Function that handles Google login OAuth2.0 with Firebase auth
   */
  const Glogin = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: Constants.manifest.extra.IOS_KEY,
        androidClientId: Constants.manifest.extra.ANDROID_KEY,
      });
      if (result.type === "success") {
        setIsLoading(true);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        Firebase.auth()
          .signInWithCredential(credential)
          .catch((error) => {
            console.log(error);
          });
      } else {
        // cancel
      }
    } catch ({ message }) {
      alert("login: Error: " + message);
    }
  };

  /**
   * Main context to allow nested components to inherit functions
   */
  const mainC = useMemo(
    () => ({
      userProfile: { userProfile },
      signOutUser: () => {
        Alert.alert("Are you sure?", "This will log you out.", [
          {text: 'Cancel', onPress: () => console.log('Cancel pressed')},
          {text: "Yes, I'm sure.", onPress: () => Firebase.auth().signOut()},
        ],
        {cancelable: false}
        );
      },
      handleGLogin: () => {
        Glogin();
      },
    }),
    []
  );

  /**
   * Loading screen animation
   */
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center ",
          left: "48%",
        }}
      >
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <mainContext.Provider value={mainC}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"LoginScreen"}>
          {userLogged == false ? (
            <>
              <Stack.Screen
                name="LoginScreen"
                options={{ headerShown: false }}
                component={LoginScreen}
              ></Stack.Screen>
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
              ></Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Review Details"
                component={ReviewScreen}
                options={{ headerShown: false, cardStyleInterpolator: forFade }}
              ></Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </mainContext.Provider>
  );
};

export default App;

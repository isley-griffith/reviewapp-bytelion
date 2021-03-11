import React, { useState, useEffect, useMemo } from "react";
import * as Font from "expo-font";
import Home from "./screens/Home.js";
import LoginScreen from "./screens/LoginScreen.js";
import SignUpScreen from "./screens/SignUpScreen.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  StatusBar,
  SafeAreaView,
  Appearance,
  ActivityIndicator,
  Alert
} from "react-native";
import mainContext from "./context/mainContext";
import Firebase from "./config/Firebase.js";
import Constants from "expo-constants";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const [userLogged, setUserLogged] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
   * Function that handles Firebase authentication for login
   * @param {*} email 
   * @param {*} password 
   */

  const doLogin = async (email, password) => {
    setIsLoading(true);
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => console.log(error));
  };

  /**
   * Function that handles Firebase authentication for signup
   * @param {*} email 
   * @param {*} password 
   */
  const doSignup = async (email, password) => {
    setIsLoading(true);
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => console.log(error));
  };

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
        console.log(result);
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
      signOutUser: () => Firebase.auth().signOut(),
      handleLogin: (email, password) => {
        if (!email) {
          Alert.alert("Email field is required.");
        }
        if (!password) {
          Alert.alert("Password field is required.");
        }
        if (email && password) {
         doLogin(email, password);
        }
      },
      handleSignup: (email, password) => {
        if (!email) {
          Alert.alert("Email field is required.");
        }
        if (!password) {
          Alert.alert("Password field is required.");
        }
        if (email && password) {
          doSignup(email, password);
        }
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
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </mainContext.Provider>
  );
};

export default App;

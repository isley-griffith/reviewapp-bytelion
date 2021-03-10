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
} from "react-native";
import mainContext from "./context/mainContext";
import Firebase from "./config/Firebase.js";

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const [userLogged, setUserLogged] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authListener = Firebase.auth().onAuthStateChanged((user) => {
      setUserLogged(user ? true : false);
      setIsLoading(false);
      setUserProfile(user);
    });
    return authListener;
  }, []);

  const doLogin = async (email, password) => {
    setIsLoading(true);
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => console.log(error));
  };

  const doSignup = async (email, password) => {
    setIsLoading(true);
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => console.log(error));
  };

  const mainC = useMemo(
    () => ({
      userProfile: { userProfile },
      signOutUser: () => Firebase.auth().signOut(),
      handleLogin: (email, password) => {
        doLogin(email, password);
      },
      handleSignup: (email, password) => {
        doSignup(email, password);
      },
    }),
    []
  );

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center ", left: "48%" }}
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

import React, { useState } from "react";
import * as Font from "expo-font";
import Home from "./screens/Home.js";
import ReviewDetails from "./screens/ReviewDetails.js";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {View, StatusBar, SafeAreaView } from 'react-native';

function useFonts(fontMap) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  (async () => {
    await Font.loadAsync(fontMap);
    setFontsLoaded(true);
  })();
  return [fontsLoaded];
}

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    "RobotoBold": require("./assets/fonts/Roboto-Bold.ttf"),
    "RobotoRegular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen
    //       name="Home"
    //       component={Home}
    //       options={{ title: "Home" }}
    //     />
    //     <Stack.Screen
    //       name="ReviewDetails"
    //       component={ReviewDetails}
    //       options={{ title: "Reviews" }}
    //     />
    //   </Stack.Navigator>
      
    // </NavigationContainer>

    <SafeAreaView style={{flex: 1, backgroundColor:"#202124",}}>
      <Home />
      <StatusBar hidden />
    </SafeAreaView>
  );
}

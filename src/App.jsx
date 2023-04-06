import React from "react";
import CodePush from "react-native-code-push";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useRecoilValue, useResetRecoilState } from "recoil";
import { settingsAtom } from "@app/utils/atoms";

import Home from "@app/screens/home";
import Settings from "@app/screens/settings";

import moment from "moment";

import SplashScreen from "react-native-splash-screen";
const Stack = createStackNavigator();
const App = () => {
  const settings = useRecoilValue(settingsAtom);
  const resetSettings = useResetRecoilState(settingsAtom);
  let [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!settings) {
      resetSettings();
    }
    setLoaded(true);
  }, []);

  const onReady = () => {
    SplashScreen.hide();
  };
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer
      onReady={onReady}
      theme={{
        dark: true,
        colors: {
          primary: "#000000",
          background: "#000000",
          card: "#000000",
          text: "#ffffff",
          border: "#000000",
          notification: "#000000",
        },
      }}>
      <Stack.Navigator
        initialRouteName={moment(settings.lastUpdated).week() === moment().week() ? "Home" : moment().week() === 0 && moment(settings.lastUpdated).week() + 1 === moment().week() && moment().add(1, "seconds").hours() < 20 ? "Home" : "Settings"}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.ON_NEXT_RESUME,
};

export default CodePush(codePushOptions)(App);

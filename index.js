import React from "react";
import { AppRegistry, StatusBar, Platform } from "react-native";
import App from "@app/App";
import { name as appName } from "./app.json";
import { setCustomText } from "react-native-global-props";

import ReactNativeRecoilPersist, { ReactNativeRecoilPersistGate } from "react-native-recoil-persist";
import { RecoilRoot } from "recoil";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { enableFreeze, enableScreens } from "react-native-screens";
enableFreeze(true);
enableScreens(false);

import "react-native-gesture-handler";
const Root = () => {
  console.log("update root");

  StatusBar.setBarStyle("light-content");
  Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
  Platform.OS === "android" && StatusBar.setTranslucent(true);

  setCustomText({
    style: {
      fontFamily: "Pretendard",
      includeFontPadding: false,
      color: "#ffffff",
    },
  });

  return (
    <RecoilRoot>
      <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </ReactNativeRecoilPersistGate>
    </RecoilRoot>
  );
};

AppRegistry.registerComponent(appName, () => Root);

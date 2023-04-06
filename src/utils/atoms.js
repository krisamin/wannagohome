import { atom } from "recoil";
import ReactNativeRecoilPersist from "react-native-recoil-persist";

export const settingsAtom = atom({
  key: "settingsAtom",
  default: {
    lastUpdated: null,
    gohomeType: null,
  },
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

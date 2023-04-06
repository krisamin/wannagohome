import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItemAsync = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const getItemAsync = async (key) => {
  return await AsyncStorage.getItem(key);
};

export const deleteItemAsync = async (key) => {
  await AsyncStorage.removeItem(key);
};

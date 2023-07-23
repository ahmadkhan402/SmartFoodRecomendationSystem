import AsyncStorage from '@react-native-async-storage/async-storage';



export const setItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  export const getItem = async (key) => {
    try {
      const value =  await AsyncStorage.getItem(key);
      return value
    } catch (e) {
      // saving error
    }
  };
  export const removeItem = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
   
    } catch (e) {
      // saving error
    }
  };
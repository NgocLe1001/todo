import AsyncStorage from '@react-native-async-storage/async-storage';
const utils = {
  saveLocalData: async (data: any, key: string) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  },
};
export default utils;

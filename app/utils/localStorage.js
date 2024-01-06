import AsyncStorage from '@react-native-async-storage/async-storage';
export const LOGGED_SESSION_KEY = '@userSession:key';

export const setLoggedInSessionData = async (data) => {
  try {
    await AsyncStorage.setItem(LOGGED_SESSION_KEY, JSON.stringify(data));
  } catch (error) {}
}

export const getLoggedInUserKey = async (OnSuccess, OnError) => {
  try {
    getsession = await AsyncStorage.getItem(LOGGED_SESSION_KEY);
    OnSuccess(getsession);
  } catch (error) {
    console.log('error', error);
    OnError(error);
  }
}

import * as SecureStore from 'expo-secure-store'

export const setToken = (token) => {
  SecureStore.setItem("jwt-token", token);

};

export const fetchToken = () => {
  return SecureStore.getItem("jwt-token");
};

export const deleteToken = async () => {
  await SecureStore.deleteItemAsync("jwt-token")
}

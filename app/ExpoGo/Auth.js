import * as SecureStore from 'expo-secure-store'

export const setToken = (token, key) => {
  SecureStore.setItem(key, token);

};

export const fetchToken = (key) => {
  return SecureStore.getItem(key);
};

export const deleteToken = async (key) => {
  console.log("deletando usuario")
  await SecureStore.deleteItemAsync(key)
}

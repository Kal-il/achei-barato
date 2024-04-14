import * as SecureStore from 'expo-secure-store'

export const deleteToken = async (key) => {
  await SecureStore.deleteItemAsync(key)
}

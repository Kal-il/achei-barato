import * as SecureStore from 'expo-secure-store'

export const deleteToken = async (key) => {
  console.log("deletando usuario")
  await SecureStore.deleteItemAsync(key)
}

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Erro", "Usuário ou senha inválidos");
      return;
    }
    // Simular um login bem-sucedido
    Alert.alert("Login", "Login realizado com sucesso!");
    setModalVisible(false); // Fechar o modal após o login
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.openButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Abrir Pop-up</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <LinearGradient
          colors={['#A9C6FC', '#F67235']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.modalView}
        >
          <View style={styles.innerContainer}>
            <Image source={require('../assets/logo.png')} />
            <Text style={styles.logo}>
              <Text style={{ color: "#FF5C00" }}>Achei</Text>
              {' '}
              <Text style={{ color: '#7F48CA' }}>Barato</Text>
            </Text>

            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Nome de Usuário"
                placeholderTextColor="#7E48CC"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Senha"
                placeholderTextColor="#7E48CC"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <TouchableOpacity>
              <Text style={styles.loginText} marginTop='1%'>Esqueceu sua Senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.loginText}>Fazer Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.loginText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 24,
    height: '8%',
    marginBottom: '5%',
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#7E48CC',
  },
  loginText: {
    color: "white",
  },
  button: {
    width: '40%',
    height: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: '5%',
    marginBottom: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  openButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

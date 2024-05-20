import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Link, useNavigation } from "expo-router";
import { ApiClient } from "../../api/ApiClient.js";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    const api = new ApiClient();

    data = {
        nome: username,
        email: email,
        password: password
      }

    let erros;
    try {
      await api.createUser(data);
    } catch (err) {
      erros = err.response.data.detail;
    }

  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#A9C6FC', '#F67235']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image
        source={require('../../assets/logo2.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>
        Primeiro, seu cadastro {"\n"}
        <Text style={styles.highlightText}>pessoal</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Link href="/SuperMarkets/RegisterScreen2" asChild>
        <TouchableOpacity style={styles.button} onPress={handleRegister} >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </Link>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  highlightText: {
    color: '#7F48CA',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A6BA9',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#F67235",
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  button: {
    width: '70%',
    height: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    position: 'absolute',
    top: -40,
    right: -50,
    width: 200,
    height: 200,
  },
  goBackButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 10,
  },
  goBackImage: {
    width: 25,
    height: 25,
  },
});

export default RegisterScreen;

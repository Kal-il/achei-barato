import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';

const RegisterScreen = () => {
  const router = useRouter();
  const [cnpj, setCNPJ] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (cnpj === '' || nomeEmpresa === '' || razaoSocial === '' || telefone === '') {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }
    setLoading(true);
    try {
      await SecureStore.setItemAsync("cnpj", cnpj);
      await SecureStore.setItemAsync("nomeEmpresa", nomeEmpresa);
      await SecureStore.setItemAsync("razaoSocial", razaoSocial);
      await SecureStore.setItemAsync("telefone", telefone);

      // Sucesso no registro
      Alert.alert("Sucesso", "Cadastro realizado com sucesso.");
      router.replace("/RegisterScreen3");
    } catch (error) {
      handleErrorResponse(error.response ? error.response.status : 500);
    } finally{
      setLoading(false);
    }
  };

  const handleErrorResponse = (status) => {
    switch (status) {
      case 400:
        Alert.alert("Erro", "Erro nos dados inseridos no formulário.");
        break;
      case 403:
        Alert.alert("Erro", "Você não tem permissão para acessar este recurso.");
        break;
      case 404:
        Alert.alert("Erro", "Recurso não encontrado.");
        break;
      case 409:
        Alert.alert("Erro", "Esta ação já foi realizada.");
        break;
      case 500:
        Alert.alert("Erro", "Erro no servidor. Tente novamente mais tarde.");
        break;
      default:
        Alert.alert("Erro", "Erro inesperado. Tente novamente mais tarde.");
        break;
    }
  };

  return (
    <LinearGradient
      colors={['#A9C6FC', '#F67235']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Botão de voltar no canto superior esquerdo */}
      <Link href = '/RegisterScreen'>
      <TouchableOpacity style={styles.goBackButton}>
        <Image
          source={require('../assets/seta2.png')}
          style={styles.goBackImage}
        />
      </TouchableOpacity>
      </Link>
      {/* Logo no canto superior direito */}
      <Image
        source={require('../assets/logo2.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>
        Agora, faça o cadastro de sua {"\n"}
        <Text style={styles.highlightText}>empresa</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da sua empresa"
        keyboardType="default"
        autoCapitalize="none"
        value={nomeEmpresa}
        onChangeText={setNomeEmpresa}
      />
      <TextInput
        style={styles.input}
        placeholder="Razão Social"
        keyboardType="default"
        autoCapitalize="none"
        value={razaoSocial}
        onChangeText={setRazaoSocial}
      />
      <TextInput
        style={styles.input}
        placeholder="CNPJ"
        keyboardType="numeric"
        autoCapitalize="none"
        value={cnpj}
        onChangeText={setCNPJ}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        autoCapitalize="none"
        value={telefone}
        onChangeText={setTelefone}
      />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}

     
      
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

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Link, useNavigation } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { ApiClient } from '../../api/ApiClient';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [cnpj, setCNPJ] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [endereco, setEndereco] = useState('');

  useEffect(() => {
    const loadSecureStoreData = async () => {
      setCNPJ(await SecureStore.getItemAsync('cnpj') || '');
      setNomeEmpresa(await SecureStore.getItemAsync('nomeEmpresa') || '');
      setRazaoSocial(await SecureStore.getItemAsync('razaoSocial') || '');
      setTelefone(await SecureStore.getItemAsync('telefone') || '');
    };
    loadSecureStoreData();
  }, []);

  const handleRegister = async () => {
    if (cep === '' || estado === '' || cidade === '' || bairro === '' || endereco === '') {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    const data = {
      cnpj,
      razao_social: razaoSocial,
      nome_fantasia: nomeEmpresa,
      telefone,
      cep,
      estado,
      cidade,
      bairro,
      endereco,
      numero_endereco: 1,
      complemento: "string",
      nome_responsavel: "string",
      cpf_responsavel: "09263613176",
      usuario: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        nome: "string",
        email: "user@example.com",
        dono_mercado: true,
        is_active: true,
        is_superuser: false,
        created_at: "2024-04-20T19:05:32.869Z",
        updated_at: "2024-04-20T19:05:32.869Z",
        deleted: false
      }
    };

    const api = new ApiClient();

    try {
      await api.createMercado(data);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso.");
      navigation.navigate("/SuperMarkets/RegisterScreen3");
      await SecureStore.deleteItemAsync("cnpj");
      await SecureStore.deleteItemAsync("nomeEmpresa");
      await SecureStore.deleteItemAsync("razaoSocial");
      await SecureStore.deleteItemAsync("telefone");
    } catch (err) {
      handleErrorResponse(err.response ? err.response.status : 500);
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
      {/* Botão de voltar no canto superior esquerdo */}
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Image
          source={require('../../assets/seta2.png')}
          style={styles.goBackImage}
        />
      </TouchableOpacity>
      {/* Logo no canto superior direito */}
      <Image
        source={require('../../assets/logo2.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>
        Quase lá! Preencha o {"\n"}
        <Text style={styles.highlightText}>endereço</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Cep"
        keyboardType="default"
        autoCapitalize="none"
        value={cep}
        onChangeText={setCep}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        keyboardType="default"
        autoCapitalize="none"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        keyboardType="default"
        autoCapitalize="none"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        keyboardType="default"
        autoCapitalize="none"
        value={bairro}
        onChangeText={setBairro}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereco"
        keyboardType="default"
        autoCapitalize="none"
        value={endereco}
        onChangeText={setEndereco}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
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

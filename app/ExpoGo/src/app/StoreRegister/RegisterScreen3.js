import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Link, useNavigation } from "expo-router";

const RegisterScreen = () => {
    const navigation = useNavigation();


  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleRegister = () => {
    // Lógica para registrar o usuário aqui
    
    console.log('Cep:', cep);
    console.log('Estado', estado);
    console.log('Cidade', cidade);
    console.log('Bairro:', bairro);
    console.log('Endereco:', endereco);
       
  };

  const handleGoBack = () => {
    // Lógica para voltar para a tela anterior
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
        keyboardType="TextInput"
        autoCapitalize="none"
        value={cep}
        onChangeText={setCep}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        keyboardType="TextInput"
        autoCapitalize="none"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        keyboardType="TextInput"
        autoCapitalize="none"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        keyboardType="TextInput"
        autoCapitalize="none"
        value={bairro}
        onChangeText={setBairro}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereco"
        keyboardType="TextInput"
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
    color: '#7F48CA', // Cor diferente apenas para a palavra "empresa"
    fontWeight: 'bold', // Pode adicionar outros estilos necessários
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Define a largura para ocupar 100% da largura do dispositivo
    height: '100%', // Define a altura para ocupar 100% da altura do dispositivo
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
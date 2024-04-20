import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; //Importação dos ícones do google e facebook

const CadastroScreen = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCadastrar = () => {
    // Lógica para cadastrar o usuário aqui
    if (nome === "" || email === "" || telefone === "" || senha === "" || confirmarSenha === "") {
      // Verifica se algum campo está vazio
      return;
    }
    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      // Senhas não coincidem, lógica de tratamento aqui
      return;
    }
    // Lógica para cadastrar o usuário no backend aqui
    // Por exemplo: enviar os dados para um endpoint de cadastro
  };
  
  const formatarTelefone = (input) => {
    // Remove tudo que não é número do input
    let formattedInput = input.replace(/\D/g, '');
  
    // Limita o número de caracteres ao padrão (xx) xxxxx-xxxx
    formattedInput = formattedInput.substring(0, 11);
  
    // Adiciona parênteses, espaço e hífen conforme o padrão (xx) xxxxx-xxxx
    formattedInput = formattedInput.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  
    // Atualiza o estado com o número de telefone formatado
    setTelefone(formattedInput);
  };
  

  return (
    <LinearGradient colors={["#F67235", "#A9C6FC"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('./assets/logo.png')} 
          style={{ width: 85, height: 85, marginTop: '20%' }} // Ajuste o tamanho conforme necessário
        />
        <Text style={styles.logo}>
          <Text style={{ color: "#FF5C00" }}>Achei</Text>
          {' '}
          <Text style={{ color: '#7F48CA' }}>Barato</Text>
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Seu nome"
            placeholderTextColor="#8D8D8D"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Seu email"
            placeholderTextColor="#8D8D8D"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Telefone"
            placeholderTextColor="#8D8D8D"
            value={telefone}
            onChangeText={formatarTelefone}
            keyboardType="phone-pad" // Define o teclado para números
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Senha"
            placeholderTextColor="#8D8D8D"
            secureTextEntry={true}
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Confirmar Senha"
            placeholderTextColor="#8D8D8D"
            secureTextEntry={true}
            value={confirmarSenha}
            onChangeText={(text) => setConfirmarSenha(text)}
          />
        </View>
        
        <TouchableOpacity style={styles.loginBtn} onPress={handleCadastrar}>
          <Text style={styles.loginText}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.line}></View>
          <Text style={styles.orText}>ou</Text>
          <View style={styles.line}></View>
        </View>

        <View style={styles.socialBtnContainer}>
          <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#fff' }]} onPress={() => {}}>
            <FontAwesome name="google" size={24} color="#3b5998" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#3b5998' }]} onPress={() => {}}>
            <FontAwesome name="facebook" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.orContainer2}>
          <View style={styles.line}></View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            É uma empresa?{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('#')}>
              Cadastre-se aqui!
            </Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
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
    height: '6%',
    marginBottom: '5%',
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#8D8D8D',
  },
  loginBtn: {
    width: '65%',
    backgroundColor: '#3672F6',
    borderRadius: 25,
    height: '6%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    marginBottom: '2%',
  },
  socialBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: '1%',
    marginTop:'3%',
  },
  socialBtn: {
    width: '48%', // Ajuste o tamanho dos botões conforme necessário
    borderRadius: 25,
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: "white",
  },
  socialText: {
    color: "white",
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  orContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
    marginTop: -68,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  orText: {
    color: 'white',
    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  link: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  textContainer: {
    marginTop: 1, // ou qualquer outra margem que você queira
    paddingHorizontal: 2, // ou qualquer outra margem horizontal que você queira
  },  
});

export default CadastroScreen;

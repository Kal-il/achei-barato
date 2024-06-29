import React, { useState } from 'react';
import { View, Text, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; 
import Button from "../../components/Button"
import { ApiClient } from '../../api/ApiClient';

export default function RegisterPromotionsPage() {
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [showInicialPicker, setShowInicialPicker] = useState(false);
  const [showFinalPicker, setShowFinalPicker] = useState(false);
  const [percentualDesconto, setPercentualDesconto] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [produtos, setProdutos] = useState(['']);

  const onChangeInicial = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(dataInicial);
    setShowInicialPicker(Platform.OS === 'ios');
    setDataInicial(currentDate.toISOString().split('T')[0]); // formatar a data como YYYY-MM-DD
  };
  
  const onChangeFinal = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(dataFinal);
    setShowFinalPicker(Platform.OS === 'ios');
    setDataFinal(currentDate.toISOString().split('T')[0]); // formatar a data como YYYY-MM-DD
  };


  const api = new ApiClient();

  const handleRegister = () => {
    const productData = {
      data_inicial: dataInicial,
      data_final: dataFinal,
      percentual_desconto: percentualDesconto,
      descricao: descricao,
      produtos: produtos,
    };

    api.createPromotion(productData);
    
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Promoções</Text>
      
      <View style={styles.formField}>
        <Text style={styles.subtitle}>Data Inicial:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Data de início da promoção"
            value={dataInicial}
            onChangeText={setDataInicial}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.calendarButton} onPress={() => setShowInicialPicker(true)}>
            <Ionicons name="calendar" size={24} color="#ff657c" />
          </TouchableOpacity>
        </View>
      </View>

      {showInicialPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(dataInicial)}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeInicial}
        />
      )}

      <View style={styles.formField}>
        <Text style={styles.subtitle}>Data Final:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Data de término da promoção"
            value={dataFinal}
            onChangeText={setDataFinal}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.calendarButton} onPress={() => setShowFinalPicker(true)}>
            <Ionicons name="calendar" size={24} color="#ff657c" />
          </TouchableOpacity>
        </View>
      </View>

      {showFinalPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(dataFinal)}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeFinal}
        />
      )}

      <View style={styles.formField}>
        <Text style={styles.subtitle}>Percentual de Desconto em %:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Percentual de desconto da promoção"
            value={percentualDesconto.toString()}
            onChangeText={(value) => setPercentualDesconto(Number(value))}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.formField}>
        <Text style={styles.subtitle}>Descrição:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Descrição da promoção"
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>
      </View>
      
      <View style={styles.formField}>
        <Text style={styles.subtitle}>Produto:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Produto em promoção"
            value={produtos.join(', ')}
            onChangeText={(value) => setProdutos(value.split(', '))}
          />
        </View>
      </View>

      <View style={styles.btn}>
        <TouchableOpacity onPress={handleRegister}> 
          <Button title="Cadastrar" ButtonColor={"#4d80f1"} />
        </TouchableOpacity> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // cor de fundo suave
  },
  btn: {
    alignItems: 'center',
    marginTop: 20,
  },
  inputText: {
    height: 50,
    flex: 1,
    fontSize: 16,
  },
  formContainer: {
    width: "90%",
    alignSelf: "center",
  },
  formField: {
    gap: 8,
    marginBottom: 15, // aumentar a margem inferior
  },
  buttonField: {
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15, // aumentar o padding horizontal
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  calendarButton: {
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
  },
});

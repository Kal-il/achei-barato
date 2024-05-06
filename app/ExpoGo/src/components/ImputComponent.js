import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import react from 'react';
const {width, height} = Dimensions.get('window');
const ImputContent = ({placeHolder, value, onChangeText, secureTextEntry}) => { // função que retorna um componente de input
    return (
        <View style={styles.TextInput}>
            <TextInput  
            secureTextEntry ={secureTextEntry} //esconde o texto digitado
            placeholder={placeHolder} //texto que aparece antes do usuário digitar
            value={value} //estado
            onChangeText={onChangeText} //função que atualiza o estado
            style={styles.inputText}
            >
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    TextInput: {
        width: width*0.9, //90% da tela
        backgroundColor: '#fff', 
        borderRadius: 50,
        height: height*0.07, //7% da tela
        marginBottom: '5%',
        justifyContent: 'center', //centraliza o texto verticalmente 
        padding: 10, // Adiciona um pouco de espaço ao redor do texto
        shadowColor: "#B3B3B3", // Suaviza a cor da sombra
        shadowOffset: {
            width: 0,
            height: 5, // Reduz a altura da sombra
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10,
    },
    inputText: {
        marginLeft: '7%',
        height: 50,
        color: '#000',
        fontSize: 18, // Aumenta o tamanho da fonte
    },
})

export default ImputContent;
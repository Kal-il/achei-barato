import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const {width, height} = Dimensions.get('window');

const Button = ({title, ButtonColor}) => {
    return (
        <View
            style={[styles.button, {backgroundColor: ButtonColor ? ButtonColor : '#659BFF'}]}
            onPress={() => {
                // Lógica para salvar aqui
            }}
        >
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#659BFF',
        borderRadius: 50,
        width: width * 0.35,
        height: height * 0.06,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Button;
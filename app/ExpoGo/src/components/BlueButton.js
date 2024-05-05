import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const {width, height} = Dimensions.get('window');

const BlueButton = ({title}) => {
    return (
        <View
            style={styles.button}
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
        width: width * 0.4,
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

export default BlueButton;
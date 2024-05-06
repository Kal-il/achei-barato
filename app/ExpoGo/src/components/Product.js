import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Product = ({ ProductInfo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={ProductInfo} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Nome do Produto</Text>
          <Text style={styles.description}>Arroz Branco</Text>
        </View>
        <View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Código do Produto</Text>
          <Text style={styles.description}>PD548.7</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Valor do Produto</Text>
          <Text style={styles.description}>R$ 12,99</Text>
        </View>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 3,
    borderColor: "#DEDEDE",
    width: 400, // Tamanho horizontal fixo
    flex: 1, // Para manter o mesmo tamanho horizontal
  },
  imageContainer: {
    margin: "2%",
  },
  image: {
    width: width / 4.5,
    aspectRatio: 1,
    borderRadius: 16,
  },
  infoContainer: {
    justifyContent: "center",
    marginLeft: "3%",
  },
  rowContainer: {
    flexDirection: "column",
    marginBottom: "2%",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: "1%",
  },
  description: {
    fontSize: 12,
  },
});

export default Product;
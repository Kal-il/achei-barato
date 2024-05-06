import {React, useState} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Link } from "expo-router";

const { width, height } = Dimensions.get('window'); //essa função retorna o tamanho da tela do dispositivo

const ListCard = ({ Description, NotificationImage, NotificationLink }) => {
   
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }
    return (
        <View style={styles.component}>
            <View style={styles.ImageAndDescription}>
                <Image source={NotificationImage} style={styles.image}></Image>
                <View style={styles.descriptionAndButtons}>
                    <Text style={styles.description} numberOfLines={2}>
                        {Description}
                    </Text>
                    <View style={styles.buttons}>
                        <Link href={NotificationLink} asChild>
                            <TouchableOpacity>
                                <View style={styles.CheckButton}>
                                    <Text style={styles.text}>Checar</Text>
                                </View>
                            </TouchableOpacity>
                        </Link>

                        <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>         
                           <View style={styles.DeleteButton}>
                                <Text style={styles.text}>Deletar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    component: {
        borderBottomWidth: 3,
        width: width,// width é o tamanho da tela horizontalmente 
        borderColor: '#DEDEDE',
    },
    ImageAndDescription: {
        marginTop: '5%',
        margin: '2%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: width / 4.5, // width/4.5 é o mesmo que 20% da tela
        aspectRatio: 1,
        borderRadius: 16,
        marginEnd: '3%',
    },
    description: {
        width: width / 1.4,
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: '5%',
        paddingEnd: '3%', // paddingEnd é o padding da direita, pois o texto  estava colado na borda
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    CheckButton: {
        backgroundColor: '#25AD2A',
        padding: '3%',
        borderRadius: 16,
        alignItems: 'center',
        height: height / 25,// height/25 é o mesmo que 4% da tela de altura
        width: width / 4, // width/4 é o mesmo que 25% da tela
        justifyContent: 'center',
    },
    DeleteButton: {
        backgroundColor: '#FF4B40',
        padding: '3%',
        borderRadius: 16,
        height: height / 25,
        width: width / 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
  closeButton: {
    marginLeft: 10,
  },
});


export default ListCard;

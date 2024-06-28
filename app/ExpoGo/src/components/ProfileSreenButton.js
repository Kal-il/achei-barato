import { TouchableOpacity, Animated, Text, View, StyleSheet, Dimensions, TouchableNativeFeedback, Button } from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Link } from "expo-router";

const { width, height } = Dimensions.get('window');


export default function  ProfileScreenButton ({ ButtonText, ButtonIcon, ButtonLink, ButtonIconColor })  {
    return (
            <Link href = {ButtonLink} asChild>
                <TouchableNativeFeedback style={{borderRadius: 24}}>
                    <View style={styles.Button}>
                        <MaterialIcons name= {ButtonIcon} size={32} style = {styles.icons} color = {ButtonIconColor}/>
                        <Text style={{color : ButtonIconColor, fontSize: 16, fontWeight: "bold"}}>{ButtonText}</Text>
                        <AntDesign name= "arrowright" size={24} style = {styles.icons} color = {ButtonIconColor}/>
                    </View>
                </TouchableNativeFeedback>
            </Link>
    );
}
const styles = StyleSheet.create({
    Button: {
        width: width*0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        marginBottom: '5%',
        paddingHorizontal: '5%',
        borderRadius: 24,
        shadowColor: "#B3B3B3", // Suaviza a cor da sombra
        elevation: 5,
    },
});
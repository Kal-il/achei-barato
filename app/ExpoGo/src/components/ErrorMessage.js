import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ErrorMessage = ({mensagem}) => {
    return (
    <View style={styles.errorMessage}>
        <MaterialIcons
            name="error"
            size={24}
            style={styles.icons}
            color={"#d83933"}
        />
        <Text>{mensagem}</Text>
    </View>);
}

const styles = StyleSheet.create({
    errorMessage: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: 20,
        backgroundColor: "white",
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#F9EEEE",
        maxWidth: "90%",
    }
})

export default ErrorMessage;
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateInput({ getDate }) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const showDatePicker = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    getDate(currentDate);
  };

  return (
    <SafeAreaView>
      <TouchableNativeFeedback onPress={showDatePicker}>
        <View style={styles.Button}>
          <Text>{date ? date.toLocaleDateString() : "Selecionar..."}</Text>
        </View>
      </TouchableNativeFeedback>

      {show && <DateTimePicker value={date} mode="date" onChange={onChange} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    elevation: 3,
  },
});

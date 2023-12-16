import React, { useState } from "react";
import { LogicProps } from "react-native-paper-form-builder/dist/Types/Types";
import { Button, Checkbox, List, TextInput } from "react-native-paper";
import { useController, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, View } from "react-native";

function DateTimeInput(props) {
  const {
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    textInputProps,
  } = props;
  const { field } = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    field.onChange(currentDate.toISOString());
    setDate(currentDate);
  };

  return (
    <View
      style={{
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: "grey" }}>{textInputProps.label}</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        is24Hour={false}
        onChange={onChange}
      />
    </View>
  );
}
DateTimeInput.prototype = LogicProps;
export default DateTimeInput;

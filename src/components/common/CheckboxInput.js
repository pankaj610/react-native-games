import React from "react";
import { LogicProps } from "react-native-paper-form-builder/dist/Types/Types";
import { Button, Checkbox, List, TextInput } from "react-native-paper";
import { useController, useForm } from "react-hook-form";

function CheckboxInput(props) {
  const { name, rules, shouldUnregister, defaultValue, control } = props;
  const { field } = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  return (
    <List.Item
      title={"Remember me"}
      left={() => (
        <Checkbox.Android
          status={field.value}
          onPress={() => {
            field.onChange(field.value === "checked" ? "unchecked" : "checked");
          }}
        />
      )}
    />
  );
}
DobInput.prototype = LogicProps;
export default DobInput;

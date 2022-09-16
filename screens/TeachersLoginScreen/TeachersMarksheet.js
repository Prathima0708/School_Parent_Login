import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useRef } from "react";

const TeachersMarksheet = () => {
  const [textValue, setTextValue] = useState("");
  // our number of inputs, we can add the length or decrease the length
  const [numInputs, setNumInputs] = useState(1);
  // all our input fields are tracked with this array
  const refInputs = useRef([textValue]);
  const inputs = [];
  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>{i + 1}.</Text>
        <TextInput
          onChangeText={(value) => setInputValue(i, value)}
          value={refInputs.current[i]}
          placeholder="placeholder"
        />
        <TextInput
          onChangeText={(value) => setInputValue(i, value)}
          value={refInputs.current[i + 1]}
          placeholder="placeholder"
        />

        <Pressable onPress={() => removeInput(i)} style={{ marginLeft: 5 }}>
          <AntDesign name="minuscircleo" size={20} color="red" />
        </Pressable>
      </View>
    );
  }
  const setInputValue = (index, value) => {
    // first, we are storing input value to refInputs array to track them
    const inputs = refInputs.current;
    inputs[index] = value;
    // we are also setting the text value to the input field onChangeText
    setTextValue(value);
  };
  const addInput = () => {
    // add a new element in our refInputs array
    refInputs.current.push("");
    // increase the number of inputs
    setNumInputs((value) => value + 1);
  };
  const removeInput = (i) => {
    // remove from the array by index value
    refInputs.current.splice(i, 1)[0];
    // decrease the number of inputs
    setNumInputs((value) => value - 1);
  };
  return (
    <ScrollView>
      {inputs}
      <Pressable onPress={addInput}>
        <Text style={{ color: "black", fontWeight: "bold" }}>
          + Add a new input
        </Text>
      </Pressable>
      <View style={{ marginTop: 25 }}>
        <Text>You have answered:</Text>
        {refInputs.current.map((value, i) => {
          return <Text key={i}>{`${i + 1} - ${value}`}</Text>;
        })}
      </View>
    </ScrollView>
  );
};

export default TeachersMarksheet;

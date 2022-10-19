import { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TextInput, View } from "react-native";


function Input({
  onChangeText,
  placeholder,
  keyboardType,
  value,
  style,
  blur,
  onFocus,
  onPressIn,
  maxLength,
}) {
  const [isActive, setActive] = useState(false);
  
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        style={[styles.inputStyle, { ...style }]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onBlur={blur}
        onFocus={onFocus}
        onPressIn={onPressIn}
        maxLength={maxLength}
      />
    </View>
  );
}

export default Input;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  inputStyle: {
    color: "black",
    borderBottomWidth: 1.5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomColor: "lightgrey",
    padding: 10,
    margin: deviceHieght < 600 ? "2%" : "4%",
    fontSize: deviceWidth < 370 ? 16 : 20,
    fontFamily: "HindRegular",
  },
});

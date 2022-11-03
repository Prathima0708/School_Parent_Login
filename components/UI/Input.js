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
  onKeyPress,
  ref,
}) {
  const [isActive, setActive] = useState(false);

  return (
    <View>
      <TextInput
        onKeyPress={onKeyPress}
        onChangeText={onChangeText}
        style={[styles.inputStyle, { ...style }]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onBlur={blur}
        onFocus={onFocus}
        onPressIn={onPressIn}
        maxLength={maxLength}
        ref={ref}
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
    borderWidth: 1.5,
  //  backgroundColor: "#FBFCFC",
    // borderBottomWidth: 1.5,
    // borderBottomRightRadius: 5,
    // borderBottomLeftRadius: 5,
    borderRadius: 5,
    borderColor: "#A3A5A5",
    padding: 9,

    margin: deviceHieght < 600 ? "2%" : "4%",
    fontSize: deviceWidth < 370 ? 16 : 18,

    fontFamily: "HindRegular",
    zIndex: -1,
  },
});

import { StyleSheet } from "react-native";
import { TextInput, View } from "react-native";

function Input({
  onChangeText,
  placeholder,
  keyboardType,
  value,
  style,
  blur,
  onPressIn,
  maxLength,
}) {
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        style={[styles.inputStyle, { ...style }]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onBlur={blur}
        onPressIn={onPressIn}
        maxLength={maxLength}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputStyle: {
    color: "black",
    borderBottomWidth: 1.5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomColor: "lightgrey",
    // borderColor: "#C9D4FF",
    // borderColor:'0000FF',
    padding: 10,
    margin: 15,
    // paddingVertical: 5,
    //  backgroundColor:'#B1CDFF',
    // backgroundColor: "#D6EAF8",
    fontSize: 20,
    fontFamily: "HindRegular",
  },
});

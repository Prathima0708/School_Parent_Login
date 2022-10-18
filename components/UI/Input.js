import { Dimensions, StyleSheet } from "react-native";
import { TextInput, View } from "react-native";
import  {Input}  from 'native-base';

function InputComponent({
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
      {/* <TextInput
        onChangeText={onChangeText}
        style={[styles.inputStyle, { ...style }]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onBlur={blur}
        onPressIn={onPressIn}
        maxLength={maxLength}
      /> */}
      <Input 
        variant="underlined"
        onChangeText={onChangeText}
        style={[styles.inputStyle, { ...style }]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onBlur={blur}
        onPressIn={onPressIn}
        maxLength={maxLength} />
    </View>
  );
}

export default InputComponent;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  inputStyle: {
    margin: 10,
    paddingVertical: 2,
    fontSize: deviceWidth < 370 ? 16 : 20,
    fontFamily: "HindRegular",
  },
});

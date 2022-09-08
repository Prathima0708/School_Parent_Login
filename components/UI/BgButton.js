import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";

function BgButton({ children, onPress, style }) {
  return (
    <Pressable style={[styles.button]} onPress={onPress}>
      <View>
        <Text style={[styles.buttonText, style]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default BgButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    // opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    //fontWeight: "bold",
    // textAlign: "center",
  },
});

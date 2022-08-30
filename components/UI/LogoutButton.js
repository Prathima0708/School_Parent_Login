import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";

function LogoutButton({ children, onPress,style }) {

    
  return (
    <Pressable
    style={[styles.button]} onPress={onPress}>
      <View>
        <Text style={[styles.buttonText,style]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor:'red'
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
  },
});

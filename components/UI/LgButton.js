import { Pressable, StyleSheet, Text, View } from "react-native";

function LgButton({ children, onPress,style }) {

  return (
    <Pressable style={[style,styles.button]} onPress={onPress}>
      <View>
        <Text style={[style,styles.buttonText]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default LgButton;

const styles = StyleSheet.create({
  button: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: "50%",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth:1,

  },
  
  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },
});

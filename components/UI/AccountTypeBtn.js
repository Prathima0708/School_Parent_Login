import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";



function AccountTypeBtn({ children, onPress, style }) {
  return (
    <Pressable style={[style, styles.button]} onPress={onPress}>
      <View>
        <Text style={[style, styles.buttonText]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default AccountTypeBtn;
const deviceWidth = Dimensions.get("window").height;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: "50%",
    borderWidth: 1,
  },

  buttonText: {
    fontFamily: "HindSemiBold",
    textAlign: "center",
    fontSize: 24,
  },
});

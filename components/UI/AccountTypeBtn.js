import { Pressable, StyleSheet, Text, View } from "react-native";

import AppLoading from "expo-app-loading";

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

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: "50%",
    borderWidth: 1,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 20,
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";

function LgButton({ children, onPress, style }) {
  let [fontsLoaded] = useFonts({ Montserrat_600SemiBold });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Pressable style={[style, styles.button]} onPress={onPress}>
        <View>
          <Text style={[style, styles.buttonText]}>{children}</Text>
        </View>
      </Pressable>
    );
  }
}

export default LgButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: "50%",
    borderWidth: 2,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
  },
});

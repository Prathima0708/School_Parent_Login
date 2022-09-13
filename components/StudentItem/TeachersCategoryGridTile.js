import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
var Title;
function TeachersCategoryGridTile({ title, color, icon, onPress, txtclr }) {
  Title = title;
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={[styles.gridItem, { backgroundColor: color }]}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [styles.buttton, pressed && styles.pressed]}
          onPress={onPress}
        >
          <Image source={{ uri: icon }} style={styles.icon} />

          <Text style={[styles.title, { color: txtclr }]}>{title}</Text>
          {/* </View> */}
        </Pressable>
      </View>
    );
  }
}
export default TeachersCategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,

    width: 160,

    height: 110,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "black",

    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  icon: {
    width: 50,
    height: 50,
    borderWidth: 3,
    top: 15,
    left: 10,
  },
  pressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  buttton: {
    flex: 1,
  },
  title: {
    top: 20,
    //  fontWeight: "bold",
    fontSize: 20,
    left: 10,
    fontFamily: "Roboto",
  },
});

import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
var Title;
function CategoryGridTile({ title, color, icon, onPress, txtclr }) {
  Title = title;
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [styles.buttton, pressed && styles.pressed]}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Image source={{ uri: icon }} style={styles.icon} />

          {/* <Text style={styles.title}>{title}</Text> */}

          <Text style={[styles.title, { color: txtclr }]}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    //width: Title == "Profile" ? "50% !important" : "70%",
    width: 160,
    right: 20,
    height: 110,
    borderRadius: 11,

    elevation: 11,
    shadowColor: "black",
    backgroundColor: "white",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  icon: {
    height: 50,
    width: 50,
    // borderColor: "black",
    borderWidth: 3,
    right: 40,
  },
  pressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    //padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttton: {
    flex: 1,
  },
  title: {
    marginTop: 3,
    // fontWeight: "bold",
    fontSize: 18,
    fontFamily: "welcomeMsg",
    right: 15,
    letterSpacing: 1,
    //fontFamily: "Roboto",
    // fontWeight: "bold",
    // fontSize: 18,
    //  right: 20,
    // fontFamily: "Roboto",
    // fontWeight: "bold",
    // fontSize: 18,
    // right: 20,
    //  color: "red",
  },
});

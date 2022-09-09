import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
var Title;
function TeachersCategoryGridTile({ title, color, icon, onPress, txtclr }) {
  Title = title;
  return (
    <View style={[styles.gridItem, { backgroundColor: color }]}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [styles.buttton, pressed && styles.pressed]}
        onPress={onPress}
      >
        {/* <View style={[styles.innerContainer, { backgroundColor: color }]}> */}
        <Image source={{ uri: icon }} style={styles.icon} />

        {/* <Text style={styles.title}>{title}</Text> */}

        <Text style={[styles.title, { color: txtclr }]}>{title}</Text>
        {/* </View> */}
      </Pressable>
    </View>
  );
}
export default TeachersCategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,

    //width: Title == "Profile" ? "50% !important" : "70%",
    width: 180,
    height: 120,
    // margin: 16,
    padding: 26,
    marginHorizontal: 33,
    // marginVertical: 15,
    // padding: 16,
    borderRadius: 18,
    elevation: 4,
    shadowColor: "black",
    backgroundColor: "white",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  icon: {
    height: "60%",
    width: "70%",
    // borderColor: "black",
    //borderWidth: 3,
  },
  pressed: {
    opacity: 0.5,
  },
  //   innerContainer: {
  //     flex: 1,
  //     padding: 19,
  //     // justifyContent: "center",
  //     //alignItems: "center",
  //     //borderRadius: 8,
  //   },
  //   buttton: {
  //     flex: 1,
  //   },
  title: {
    marginTop: 13,
    fontWeight: "bold",
    fontSize: 18,
    //  color: "red",
  },
});

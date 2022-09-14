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
  // gridItem: {
  //   flex: 1,
  //   // top:2,
  //   //width: Title == "Profile" ? "50% !important" : "70%",
  //   width: 180,
  //   height: 110,
  //   // margin: 16,
  //   padding: 26,
  //   marginHorizontal: 10,
  //   marginVertical: 10,
  //   // padding: 16,
  //   borderRadius: 18,
  //   elevation: 4,
  //   shadowColor: "black",
  //   backgroundColor: "white",
  //   shadowOpacity: 0.25,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 8,
  //   overflow: Platform.OS === "android" ? "hidden" : "visible",
  // },
  // icon: {
  //   // height: "50%",
  //   // width: "33%",
  //   height:50,
  //   width:50,
  //   right:15,
  //   // borderColor: "black",
  //   //borderWidth: 3,
  // },
  // pressed: {
  //   opacity: 0.5,
  // },
  // //   innerContainer: {
  // //     flex: 1,
  // //     padding: 19,
  // //     // justifyContent: "center",
  // //     //alignItems: "center",
  // //     //borderRadius: 8,
  // //   },
  // //   buttton: {
  // //     flex: 1,
  // //   },
  // title: {
  //   marginTop: 13,
  //   fontWeight: "bold",
  //   fontSize: 18,
  //   right:10,
  //   bottom:10
  //   //  color: "red",
  // },
  gridItem: {
    flex: 1,
    margin: 10,
    //width: Title == "Profile" ? "50% !important" : "70%",
    width: 160,
    // right:20,
    height: 110,
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
    // height: "50%",
    // width: "40%",
    // borderColor: "black",
    width:50,
    height:50,
    borderWidth: 3,
    top:15,
    left:10
    // right:30
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
    top:20,
   // fontWeight: "bold",
    fontSize: 18,
    left:10,
    fontFamily:'welcomeMsg',
    letterSpacing:1
    // right:12,
    //  color: "red",
  },
});

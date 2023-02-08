// import { Pressable, StyleSheet, Text, View } from "react-native";
// import { Colors } from "../constants/styles";

// function BgButton({ children, onPress, style }) {
//   return (
//     <Pressable style={[styles.button]} onPress={onPress}>
//       <View>
//         <Text style={[styles.buttonText, style]}>{children}</Text>
//       </View>
//     </Pressable>
//   );
// }

// export default BgButton;

// const styles = StyleSheet.create({
//   button: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     marginTop: 10,
//     backgroundColor: "#D6EAF8",
//     borderRightColor: "black",
//     margin: 10,
//   },
//   pressed: {
//     // opacity: 0.7,
//   },
//   buttonText: {
//     fontSize: 20,
//     fontFamily: "HindMedium",
//   },
// });

import { Text } from "react-native";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

function BgButton({ children, onPress, style }) {
  return (
    <Pressable style={[style, styles.button]} onPress={onPress}>
      <Text style={[style, styles.buttonText]}>{children}</Text>
    </Pressable>
  );
}

export default BgButton;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  button: {
    //  paddingVertical: 6,
    // paddingHorizontal: 12,
    width: "40%",
    height: "47%",
    // marginTop: 20,
    // marginBottom: 20,
    // marginLeft: 20,
    // padding: 5,
    // backgroundColor: "white",
    marginLeft: 25,
    // margin: 20,
    //borderRadius: 10,
    elevation: 3,
    //  borderWidth:1,
    //marginRight:10,
    //marginHorizontal: 15,
    marginVertical: 20,
    // position: "relative",
    // top: 0,
    // left: 10,
    // right: 10,
  },

  buttonText: {
    //fontFamily: "LunchTypeItalic",
    fontFamily: "HindBold",
    textAlign: "center",
    fontSize: deviceWidth < 370 ? 16 : 20,
  //  top: "5%",
    padding: 5,

    //margin: 15,
  },
});

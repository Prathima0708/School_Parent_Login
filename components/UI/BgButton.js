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

import { Pressable, StyleSheet, Text, View } from "react-native";

function BgButton({ children, onPress, style }) {
  return (
    <Pressable style={[style, styles.button]} onPress={onPress}>
      <View>
        <Text style={[style, styles.buttonText]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default BgButton;

const styles = StyleSheet.create({
  button: {
    //  paddingVertical: 6,
    // paddingHorizontal: 12,
    minWidth: "25%",
    marginTop: 20,
    marginLeft: 20,
    padding: 10,
    borderRadius: 10,
    //  borderWidth:1,
    //marginRight:10,
  },

  buttonText: {
    fontFamily: "HindSemiBold",
    // textAlign: "center",
    fontSize: 20,
  },
});

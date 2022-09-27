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
    <View
      style={{
        backgroundColor: "#F8F9F9",
        height: 80,
        elevation: 3,
        borderRadius: 10,
        marginTop: 10,
        // margin: 10,
        // padding: 10,
      }}
    >
      <Pressable style={[style, styles.button]} onPress={onPress}>
        <View>
          <Text style={[style, styles.buttonText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
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
    padding: 5,
    margin: 20,
    borderRadius: 10,

    //  elevation: 5,
    //  borderWidth:1,
    //marginRight:10,
  },

  buttonText: {
    fontFamily: "HindSemiBold",
    // textAlign: "center",
    fontSize: 20,
  },
});

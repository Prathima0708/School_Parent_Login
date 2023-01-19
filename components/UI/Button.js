import { Text } from "native-base";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

function Button({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text bold style={styles.buttonText}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default Button;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    margin: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    // backgroundColor: "#2E799B",
    backgroundColor: "#1E84A4",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    //width: "30%",
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: deviceWidth < 370 ? 16 : 18,

    fontFamily: "HindSemiBold",
  },
});

// import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
// import { Colors } from "../constants/styles";
// import { Button as NativeButton } from "native-base";

// function Button({ children, onPress }) {
//   return (
//     // <Pressable
//     //   style={({ pressed }) => [styles.button, pressed && styles.pressed]}
//     // >
//     <NativeButton onPress={onPress}>
//       <Text style={styles.buttonText}> {children}</Text>
//     </NativeButton>
//     // </Pressable>
//   );
// }

// export default Button;
// const deviceHieght = Dimensions.get("window").height;
// const deviceWidth = Dimensions.get("window").width;
// const styles = StyleSheet.create({
//   button: {
//     borderRadius: 6,
//     margin: 30,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     //backgroundColor: "#59b8dd",
//     //  elevation: 2,
//     shadowColor: "black",
//     shadowOffset: { width: 1, height: 1 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     //width: "30%",
//   },
//   pressed: {
//     opacity: 0.7,
//   },
//   buttonText: {
//     textAlign: "center",
//     color: "white",
//     fontSize: deviceWidth < 370 ? 16 : 15,

//     fontFamily: "HindMedium",
//   },
// });

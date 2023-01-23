// import {
//   Dimensions,
//   Image,
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// import {
//   useFonts,
//   Roboto_100Thin,
//   Roboto_100Thin_Italic,
//   Roboto_300Light,
//   Roboto_300Light_Italic,
//   Roboto_400Regular,
//   Roboto_400Regular_Italic,
//   Roboto_500Medium,
//   Roboto_500Medium_Italic,
//   Roboto_700Bold,
//   Roboto_700Bold_Italic,
//   Roboto_900Black,
//   Roboto_900Black_Italic,
// } from "@expo-google-fonts/roboto";

// var Title;
// function TeachersCategoryGridTile({
//   title,
//   color,
//   icon,
//   onPress,
//   txtclr,
//   subTitle,
// }) {
//   Title = title;
//   let [fontsLoaded] = useFonts({
//     Roboto_100Thin,
//     Roboto_100Thin_Italic,
//     Roboto_300Light,
//     Roboto_300Light_Italic,
//     Roboto_400Regular,
//     Roboto_400Regular_Italic,
//     Roboto_500Medium,
//     Roboto_500Medium_Italic,
//     Roboto_700Bold,
//     Roboto_700Bold_Italic,
//     Roboto_900Black,
//     Roboto_900Black_Italic,
//   });
//   if (!fontsLoaded) {
//     return null;
//   } else {
//     return (
//       <View style={[styles.gridItem, { backgroundColor: color }]}>
//         <Pressable
//           // android_ripple={{ color: "#ccc" }}
//           style={({ pressed }) => [styles.buttton, pressed && styles.pressed]}
//           onPress={onPress}
//         >
//           <Image source={{ uri: icon }} style={styles.icon} />

//           <Text style={[styles.title, { color: txtclr }]}>{title}</Text>
//         </Pressable>
//       </View>
//     );
//   }
// }
// export default TeachersCategoryGridTile;
// const deviceHieght = Dimensions.get("window").height;
// const deviceWidth = Dimensions.get("window").width;
// const styles = StyleSheet.create({
//   gridItem: {
//     flex: 1,
//     margin: 15,
//     padding: 7,
//     paddingTop: 0,
//     width: 150,
//     // height: deviceWidth < 370 ? 100 : 110,
//     height:  deviceHieght > 800 ? 130:110,
//     borderRadius: 18,
//     elevation: 5,
//     shadowColor: "black",

//     shadowOpacity: 0.75,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     overflow: Platform.OS === "android" ? "hidden" : "visible",
//   },
//   icon: {
//     width: deviceWidth < 370 ? 40 : 50,
//     height: deviceWidth < 370 ? 40 : 50,
//     borderWidth: 3,
//     top: deviceHieght > 800 ? 25 : 15,
//     left: 10,
//   },
//   sub: {
//     fontSize: 18,
//   },
//   pressed: {
//     opacity: 0.5,
//   },
//   innerContainer: {
//     flex: 1,

//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 3,
//   },
//   buttton: {
//     flex: 1,
//   },
//   title: {
//     top: deviceHieght > 800 ? 30 : 15,
//     // fontWeight: "bold",

//     left: 10,
//     fontFamily: "HindMedium",
//     letterSpacing: 0.7,
//     // right:12,
//     //  color: "red",

//     //  fontWeight: "bold",
//     fontSize: deviceWidth < 370 ? 16 : 18,
//     left: 10,
//     // fontFamily: "Roboto",
//   },
// });

import {
  Dimensions,
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
        // android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [styles.buttton, pressed && styles.pressed]}
        onPress={onPress}
      >
        <Image source={{ uri: icon }} style={styles.icon} />

        <Text style={[styles.title, { color: txtclr }]}>{title}</Text>
      </Pressable>
    </View>
  );
}

export default TeachersCategoryGridTile;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    padding: 7,
    paddingTop: 0,
    width: 150,
    marginHorizontal:deviceHieght > 800 ? 20 : 10,
    marginVertical:deviceHieght > 800 ? 20 : 10,
    height: 110,
    borderRadius: 18,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.75,
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
  sub: {
    fontSize: 18,
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
    top: 17,
    // fontWeight: "bold",

    left: 10,
    fontFamily: "HindMedium",
    letterSpacing: 0.7,
    // right:12,
    //  color: "red",

    //  fontWeight: "bold",
    fontSize: deviceWidth < 370 ? 16 : 18,
    left: 10,
    // fontFamily: "Roboto",
  },
});

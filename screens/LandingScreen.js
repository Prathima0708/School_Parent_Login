// import { useNavigation } from "@react-navigation/native";
// import { Image, TouchableHighlight } from "react-native";
// import { StyleSheet } from "react-native";
// import { View, Text } from "react-native";
// import { Button } from "react-native";
// import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
// import { Ionicons } from "@expo/vector-icons";

// function LandingScreen() {
//   useFonts({
//     Inter_900Black,
//   });

//   const navigation = useNavigation();
//   function login() {
//     navigation.navigate("Login");
//   }

//   return (
//     <View style={styles.inner}>
//       <View style={styles.mainContainer}>
//         <Image
//           style={styles.bannerImage}
//           source={require("../assets/bgelement.png")}
//         />
//         <Image style={styles.logo} source={require("../assets/Asset2.png")} />

//         <Text style={{ left: 30, color: "grey", fontSize: 18, top: 10 }}>
//           Welcome to
//         </Text>
//         <Text
//           style={{
//             left: 30,
//             color: "red",
//             fontSize: 23,
//             fontWeight: "800",
//             top: 10,
//           }}
//         >
//           KINARA SCHOOL
//         </Text>

//         <View style={styles.typeText}>
//           <Text style={{ color: "black", fontSize: 15 }}>
//             Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
//             nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
//             volutpat.
//           </Text>
//         </View>
//         <TouchableHighlight
//           style={styles.submit}
//           onPress={login}
//           underlayColor="#002D62"
//         >
//           <Text style={[styles.submitText]}>
//             Login
//             <Ionicons name="log-in" size={18} color="white" />
//           </Text>
//         </TouchableHighlight>
//       </View>
//     </View>
//   );
// }

// export default LandingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   inner: {
//     // padding: 24,
//     // flex: 1,
//     justifyContent: "space-around",
//   },

//   mainContainer: {
//     height: 630,
//   },
//   bannerImage: {
//     width: "100%",
//     height: "38%",
//   },
//   typeText: {
//     justifyContent: "center",
//     alignItems: "center",
//     top: 5,
//     padding: 20,
//   },
//   logo: {
//     width: "30%",
//     height: "20%",
//     marginLeft: 25,
//     position: "absolute",
//     top: 120,
//   },

//   buttons: {
//     top: 15,
//     paddingLeft: 27,
//     paddingRight: 27,
//   },
//   submit: {
//     padding: 15,
//     backgroundColor: "#59b8dd",
//     borderRadius: 10,
//     borderWidth: 1,
//     top: 10,
//     borderColor: "#fff",
//   },
//   submitText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 16,
//     fontFamily: "welcomeMsg",
//   },
// });

// // import React, { useState, useEffect } from 'react';

// // import { Text, View, StyleSheet } from 'react-native';
// // import AppLoading from 'expo-app-loading';
// // import {
// //   useFonts,
// //   Inter_800ExtraBold,
// // } from '@expo-google-fonts/inter';

// // export default () => {
// //   let [fontsLoaded] = useFonts({
// //     Inter_800ExtraBold,
// //   });

// //   if (!fontsLoaded) {
// //     return <AppLoading />;
// //   } else {
// //     return (
// //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

// //         <Text style={{ fontFamily: 'Inter_800ExtraBold' }}>
// //           Inter Black
// //         </Text>

// //       </View>
// //     );
// //   }
// // };

import { useNavigation } from "@react-navigation/native";
import { Image, TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Button } from "react-native";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
function LandingScreen() {
  useFonts({
    Inter_900Black,
  });

  const navigation = useNavigation();
  function signInBtnHandler() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.inner}>
      <View style={styles.mainContainer}>
        <Image
          style={styles.bannerImage}
          source={require("../assets/kinarabg2.png")}
        />
        {/* <Image style={styles.logo} source={require("../assets/Asset2.png")} /> */}
        <View style={{ position: "absolute", top: 250 }}>
          <Text
            style={{
              left: 30,
              color: "#808B96",
              fontSize: 20,
              top: 5,
              fontFamily: "Poppins",
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              left: 30,

              fontSize: 30,

              // top: 10,
              fontFamily: "PoppinsBold",
            }}
          >
            KINARA SCHOOL
          </Text>

          <View style={styles.typeText}>
            <Text
              style={{
                // color: "#273746",
                fontSize: 16,
                // lineHeight: 12,
                margin: 10,
                fontFamily: "Poppins",
              }}
            >
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </Text>
          </View>
          {/* <View style={styles.buttons}>
          <Button title="Sign In ----->" onPress={signInBtnHandler} />
        </View> */}
          <TouchableHighlight
            style={styles.submit}
            onPress={signInBtnHandler}
            underlayColor="#002D62"
          >
            <Text style={styles.submitText}>
              Sign in
              <Ionicons name="log-in-outline" size={32} color="white" />
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    // padding: 24,
    // flex: 1,
    minHeight: "100%",
    backgroundColor: "white",
  },

  mainContainer: {
    height: 630,
  },
  bannerImage: {
    width: "100%",
    height: "48%",
  },
  typeText: {
    justifyContent: "center",
    alignItems: "center",
    top: -15,
    padding: 20,
  },
  logo: {
    width: "30%",
    height: "20%",
    marginLeft: 25,
    position: "absolute",
    top: 120,
  },

  // buttons: {
  //   top: 15,
  //   paddingLeft: 27,
  //   paddingRight: 27,
  // },
  submit: {
    width: "40%",
    marginRight: 50,
    marginLeft: 200,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: -19,
    marginHorizontal: 20,
    // marginTop: 10,
    // paddingTop: 20,
    // paddingBottom: 20,
    //padding: 10,
    backgroundColor: "#002D62",
    borderRadius: 10,
    borderWidth: 1,
    // top: 10,

    borderColor: "#fff",
  },
  submitText: {
    padding: 3,
    fontFamily: "PoppinsRegular",
    // margin: 2,
    color: "#fff",
    // textAlign: "center",
    fontSize: 25,
    // marginRight:10,
    //  fontFamily: "welcomeMsg",
  },
});

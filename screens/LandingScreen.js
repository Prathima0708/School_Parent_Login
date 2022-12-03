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
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { mainURL, subURL } from "../components/utils/URL's";
import axios from "axios";
import {Button as NativeButton, Icon,Text as NativeText}from 'native-base'
function LandingScreen() {

  const [saveImg, setSaveImg] = useState(``);

  useFonts({
    Inter_900Black,
  });

  const navigation = useNavigation();
  function signInBtnHandler() {
    navigation.navigate("Login");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // http://10.0.2.2:8000/school/Calendar/
        const res = await axios.get(`${subURL}/Institute/`);
        setSaveImg(res.data[0].instituteLogo)
      } catch (error) {
        console.log(error);
      }
      // setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <View style={[{flex:1}, {flexDirection: "column"}]}>
        <View style={{ flex: 35, backgroundColor: "white" }} >
          <Image
           style={styles.bannerImage}
          //  source={require("../assets/kinarabg2.png")
           source={{ uri: `http://10.0.2.2:8000${saveImg}`}} 
         />
         <Text
            style={{
              left: 30,
              color: "grey",
              fontSize: deviceWidth < 370 ? 18 : 22,
              top: 5,
              fontFamily: "HindLight",
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              left: 30,
              fontSize: deviceWidth < 370 ? 24 : 32,
              fontWeight: "900",
              fontFamily: "HindBold",
              top:'1%'
             }}
           >
             KINARA SCHOOL
           </Text>

           <View style={styles.typeText}>
             <Text
               style={{
                 fontSize: deviceWidth < 370 ? 16 : 18,
                 margin: 10,
                 fontFamily: "HindRegular",
                 top:'3%'
               }}
             >
               Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
               nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
               erat volutpat.
             </Text>
           </View>
        </View>
        <View style={{ flex: 5,backgroundColor:'white'}} >
          <View style={[{flex:1}, {flexDirection: "row"}]}>
            <View style={{ flex: 2.5 }} >

            </View>
            <View style={{ flex: 0.8,right:'40%',bottom:'12%' }} >
            <NativeButton 
              size='md'
              onPress={signInBtnHandler}
              
              style={{backgroundColor:'#002D62',borderRadius:7}}
              rightIcon={<Icon as={Ionicons} name="log-in-outline" size="md" />}
              ><NativeText 
                fontSize='18' 
                color='white' 
                fontFamily='HindBold'
                top='0.5'
                left='1'
                >Login</NativeText>
            </NativeButton>
            </View>
          </View>
        </View>
      </View>
    </>
    // <View style={styles.inner}>
    //   <View style={styles.mainContainer}>
    //     <Image
    //       style={styles.bannerImage}
    //       //source={require("../assets/kinarabg2.png")
    //       source={{ uri: `http://10.0.2.2:8000${saveImg}` }} 
    //     />
    //     {/* <Image style={styles.logo} source={require("../assets/Asset2.png")} /> */}
    //     <View style={styles.textContainer}>
    //       <Text
    //         style={{
    //           left: 30,
    //           color: "grey",
    //           fontSize: deviceWidth < 370 ? 18 : 22,
    //           top: 5,
    //           fontFamily: "HindLight",
    //         }}
    //       >
    //         Welcome to
    //       </Text>
    //       <Text
    //         style={{
    //           left: 30,

    //           fontSize: deviceWidth < 370 ? 24 : 32,
    //           fontWeight: "900",
    //           // top: 10,
    //           fontFamily: "HindBold",
    //         }}
    //       >
    //         KINARA SCHOOL
    //       </Text>

    //       <View style={styles.typeText}>
    //         <Text
    //           style={{
    //             fontSize: deviceWidth < 370 ? 16 : 18,
    //             margin: 10,
    //             fontFamily: "HindRegular",
    //           }}
    //         >
    //           Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
    //           nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
    //           erat volutpat.
    //         </Text>
    //       </View>

    //       <TouchableHighlight
    //         style={styles.submit}
    //         onPress={signInBtnHandler}
    //         underlayColor="#002D62"
    //       >
    //         <View>
    //           <Text style={styles.submitText}>Login </Text>

    //           <Ionicons
    //             name="log-in"
    //             size={28}
    //             color="white"
    //             style={{
    //               position: "absolute",
    //               top: deviceHieght < 600 ? "17%" : "20%",
    //               left: 79,
    //               bottom: -60,
    //             }}
    //           />
    //         </View>
    //       </TouchableHighlight>
    //     </View>
    //   </View>
    // </View>
  );
}

export default LandingScreen;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: "white",
  },

  mainContainer: {
    height: deviceHieght < 600 ? "105%" : "100%",
  },
  bannerImage: {
    width: "100%",
    height: "48%",
  },
  textContainer: {
    position: "absolute",
    top: deviceHieght < 600 ? "40%" : "40%",
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

  submit: {
    width: deviceWidth < 370 ? "32%" : "30%",
    height: deviceWidth < 370 ? "24%" : "22%",
    left: deviceHieght < 600 ? "60%" : "60%",
    backgroundColor: "#002D62",
    borderRadius: 10,
    borderWidth: 1,
    top: deviceHieght < 600 ? "90%" : "100%",
    position: "absolute",
    borderColor: "#fff",
  },
  submitText: {
    padding: "13%",
    paddingTop: deviceHieght < 600 ? "6%" : "7%",

    color: "#fff",
    fontSize: 24,
    fontFamily: "HindSemiBold",
  },
});

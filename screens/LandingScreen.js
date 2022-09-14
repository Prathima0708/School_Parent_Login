import { useNavigation } from "@react-navigation/native";
import { Image, TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
<<<<<<< HEAD
import { View,Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/UI/IconButton";

function LandingScreen(){

    const navigation = useNavigation();
    function signInBtnHandler(){
        navigation.navigate("Login");
    }
=======
import { View, Text } from "react-native";
import { Button } from "react-native";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

function LandingScreen() {
  useFonts({
    Inter_900Black,
  });

  const navigation = useNavigation();
  function signInBtnHandler() {
    navigation.navigate("Login");
  }
>>>>>>> 9f5f187a0b0291047266019b5cc369e3080cb6dd

  return (
    <View style={styles.inner}>
      <View style={styles.mainContainer}>
        <Image
          style={styles.bannerImage}
          source={require("../assets/bgelement.png")}
        />
        <Image style={styles.logo} source={require("../assets/Asset2.png")} />

<<<<<<< HEAD
                <Text style={{ left: 30, color: "grey", fontSize: 18, top: 20,fontFamily:'welcomeMsg'}}>
                  Welcome to
                </Text>
                <Text
                  style={{
                    left: 30,
                    color: "red",
                    fontSize: 23,
                    top: 25,
                    fontFamily:'MainHeading'
                  }}
                >
                  KINARA SCHOOL
                </Text>

                <View style={styles.typeText}>
                  <Text style={{fontFamily:'welcomeMsg'}}>
                   Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
                   sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                  </Text>
                </View>
                {/* <View style={styles.buttons}>
                    <Button title="Sign In ----->" color='#00308F' onPress={signInBtnHandler}/>
                </View> */}
                <TouchableHighlight
                  style={styles.submit}
                  onPress={signInBtnHandler}
                  underlayColor='#002D62'>
                    <Text style={[styles.submitText]}>Sign In <Ionicons name="log-in" size={18} color="white" /></Text>
                </TouchableHighlight>
            </View>
          </View>
    )
=======
        <Text style={{ left: 30, color: "grey", fontSize: 18, top: 10 }}>
          Welcome to
        </Text>
        <Text
          style={{
            left: 30,
            color: "red",
            fontSize: 23,
            fontWeight: "800",
            top: 10,
          }}
        >
          KINARA SCHOOL
        </Text>

        <View style={styles.typeText}>
          <Text style={{ color: "black", fontSize: 15 }}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat.
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button title="Sign In ----->" onPress={signInBtnHandler} />
        </View>
      </View>
    </View>
  );
>>>>>>> 9f5f187a0b0291047266019b5cc369e3080cb6dd
}

export default LandingScreen;

<<<<<<< HEAD
const styles=StyleSheet.create({
    container: {
        flex: 1,
      },
      inner: {
        // padding: 24,
        // flex: 1,
        justifyContent: "space-around",
      },
    
      mainContainer: {
        height: 630,
      },
      bannerImage: {
        width: "100%",
        height: "38%",
      },
      typeText: {
        justifyContent: "center",
        alignItems: "center",
        top: 10,
        padding:30,
      },
      logo: {
        width: "30%",
        height: "20%",
        marginLeft: 25,
        position: "absolute",
        top: 120,
      },
    
      submit: {
        marginRight: 90,
        marginLeft: 90,
        // marginTop: 10,
        // paddingTop: 20,
        // paddingBottom: 20,
        padding:15,
        backgroundColor: '#00308F',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
      },
      submitText: {
        color: '#fff',
        textAlign: 'center',
        fontSize:16,
        fontFamily:'welcomeMsg'
      }
})
=======
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    // padding: 24,
    // flex: 1,
    justifyContent: "space-around",
  },

  mainContainer: {
    height: 630,
  },
  bannerImage: {
    width: "100%",
    height: "38%",
  },
  typeText: {
    justifyContent: "center",
    alignItems: "center",
    top: 5,
    padding: 20,
  },
  logo: {
    width: "30%",
    height: "20%",
    marginLeft: 25,
    position: "absolute",
    top: 120,
  },

  buttons: {
    top: 15,
    paddingLeft: 27,
    paddingRight: 27,
  },
});

// import React, { useState, useEffect } from 'react';

// import { Text, View, StyleSheet } from 'react-native';
// import AppLoading from 'expo-app-loading';
// import {
//   useFonts,
//   Inter_800ExtraBold,
// } from '@expo-google-fonts/inter';

// export default () => {
//   let [fontsLoaded] = useFonts({
//     Inter_800ExtraBold,
//   });

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   } else {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

//         <Text style={{ fontFamily: 'Inter_800ExtraBold' }}>
//           Inter Black
//         </Text>

//       </View>
//     );
//   }
// };
>>>>>>> 9f5f187a0b0291047266019b5cc369e3080cb6dd

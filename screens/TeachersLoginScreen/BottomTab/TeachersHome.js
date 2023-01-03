// import { View, Text, StyleSheet } from "react-native";
// import React from "react";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";

// const TeachersHome = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.root}>
//       <Ionicons
//         name="grid-outline"
//         size={34}
//         color="white"
//         onPress={() => navigation.navigate("TeachersLogin")}
//       />
//       <Ionicons
//         name="person"
//         size={34}
//         color="white"
//         onPress={() => navigation.navigate("MyClasses")}
//       />
//     </View>
//   );
// };

// export default TeachersHome;

// const styles = StyleSheet.create({
//   root: {
//     backgroundColor: "#0072AF",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     // borderBottomEndRadius: 25,
//     // borderBottomStartRadius: 25,
//     position: "absolute",
//     width: "100%",
//     //top: 5,
//     bottom: 0,
//     paddingHorizontal: 35,
//     paddingVertical: 10,
//     // borderColor: "white",
//     elevation: 2,
//     // borderTopLeftRadius:10,
//     // borderTopRightRadius:10
//     // borderWidth: 1,
//   },
// });

import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const TeachersHome = ({ style }) => {
  const navigation = useNavigation();
  const [changeIconBackground, setChangeIconBackground] = useState(false);

  function myClassesPressedHandler() {
    setChangeIconBackground(true);
    navigation.navigate("MyClasses");
  }
  return (
    <View style={styles.root}>
      <View
        style={[
          { flex: 1 },
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "row",
          },
        ]}
      >
        <View style={{ flex: 0.4 }}>
          <View
            style={[
              { flex: 1 },
              {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "column",
              },
            ]}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Ionicons
                name="grid-outline"
                size={25}
                color="grey"
                onPress={() => navigation.navigate("TeachersLogin")}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.tabText}>Dashboard</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.4 }}>
          <View
            style={[
              { flex: 1 },
              {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "column",
              },
            ]}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Ionicons
                name="grid-outline"
                size={25}
                color="grey"
                onPress={() => navigation.navigate("TeachersAcademics")}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.tabText}>Academics</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.4 }}>
          <View
            style={[
              { flex: 1 },
              {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "column",
                justifyContent: "flex-end",
              },
            ]}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Ionicons
                name="person"
                size={25}
                //color='grey'
                color={changeIconBackground ? "blue" : "grey"}
                onPress={myClassesPressedHandler}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={[
                  styles.tabText,
                  changeIconBackground ? { color: "blue" } : { color: "grey" },
                ]}
              >
                MyClasses
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TeachersHome;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    // borderBottomEndRadius: 25,
    // borderBottomStartRadius: 25,
    borderTopWidth: 1,
    borderTopColor: "darkgrey",
    position: "absolute",
    width: "100%",
    //top: 5,
    bottom: 0,
    // paddingHorizontal: 35,
    // paddingVertical: 10,
    // borderColor: "white",
    elevation: 2,
    // borderTopLeftRadius:10,
    // borderTopRightRadius:10
    // borderWidth: 1,
  },
  tabText: {
    fontFamily: "HindSemiBold",
    color: "grey",
  },
});

// import { TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useEffect, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';

// const TeachersHome = ({ onPress, currentScreen }) => {
//   const navigation = useNavigation();
//   const [bgColor, setBgColor] = useState('red');
// const myClasses=navigation.navigate('MyClasses')
//   useEffect(() => {
//     if (currentScreen === 'TeachersAcademics') {
//       setBgColor('red');
//     } else if (currentScreen === 'MyClasses') {
//       console.log("else part")
//       setBgColor('blue');
//     }
//   }, [currentScreen]);

//   return (
//     <>
//      <TouchableOpacity onPress={()=>navigation.navigate('MyClasses')} style={[styles.iconContainer, { backgroundColor: myClasses?'blue':'red' }]}>
//       <Ionicons name="ios-heart" size={32} color="#fff" />

//       </TouchableOpacity>

//     </>

//   );
// };

// const styles = StyleSheet.create({
//   iconContainer: {
//     borderRadius: 25,
//     padding: 5,
//   },
// });

// export default TeachersHome

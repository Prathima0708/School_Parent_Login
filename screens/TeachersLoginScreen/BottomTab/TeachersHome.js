import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { TouchableNativeFeedback } from "react-native";
import { TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TeachersHome = ({style}) => {
  const navigation = useNavigation();
  const [changeIconBackground,setChangeIconBackground]=useState(false);
  const [textColorDashboard, setTextColorDashboard] = useState('grey');
  const [textColorAcademics, setTextColorAcademics] = useState('grey');
  const [textColorClass, setTextColorClass] = useState('grey');

  function myClassesPressedHandler(){
    setChangeIconBackground(true);
    navigation.navigate("MyClasses")

  }

  const onShowUnderlayDashboard = () => {
    setTextColorDashboard('black');
  };

  const onHideUnderlayDashboard = () => {
    setTextColorDashboard('grey');
  };

  const onShowUnderlayAcademics = () => {
    setTextColorAcademics('black');
  };

  const onHideUnderlayAcademics = () => {
    setTextColorAcademics('grey');
  };

  const onShowUnderlayClass = () => {
    setTextColorClass('black');
  };

  const onHideUnderlayClass = () => {
    setTextColorClass('grey');
  };

  return (
    <View style={styles.root}>
      <View style={[{flex:1}, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "row"
      }]}>
        <View style={{ flex: 0.4,}} >
          <View style={[{flex:1}, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
          }]}>
            {/* <View style={{ flex: 1,alignItems:"center",justifyContent:'flex-end' }} >
              <Ionicons
                name="grid-outline"
                size={25}
                color="grey"
                onPress={() => navigation.navigate("TeachersLogin")}

              />
            </View>
            <View style={{ flex: 1,alignItems:'center', }} >
              <Text style={styles.tabText}>Dashboard</Text>
            </View> */}
            <TouchableHighlight
                onPress={() => navigation.navigate("TeachersLogin")}
                underlayColor="#E5E7E9"
                onShowUnderlay={onShowUnderlayDashboard}
                onHideUnderlay={onHideUnderlayDashboard}
                style={{borderRadius:5}}
              >
                <View style={[{flex:1}, {
                  flexDirection: "column"
                }]}>
                  <View style={{ flex: 1,alignItems:'center' }} >
                    <Ionicons
                      name="home-outline"
                      size={25}
                      color={textColorDashboard}
                    />
                  </View>
                  <View style={{ flex: 1,alignItems:'center' }} >
                    <Text style={[styles.tabText,{color: textColorDashboard}]}>Home</Text>
                  </View>
                </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{ flex: 0.4}} >
          <View style={[{flex:1}, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column",
          }]}>
            {/* <View style={{ flex: 1,alignItems:'center' }} >
              <Ionicons
                name="grid-outline"
                size={25}
                color="grey"
                onPress={() => navigation.navigate("TeachersAcademics")}
              />
            </View>
            <View style={{ flex: 1 ,alignItems:'center'}} >
              <Text style={styles.tabText}>Academics</Text>
            </View> */}
            <TouchableHighlight
                onPress={() => navigation.navigate("TeachersAcademics")}
                underlayColor="#E5E7E9"
                onShowUnderlay={onShowUnderlayAcademics}
                onHideUnderlay={onHideUnderlayAcademics}
                style={{borderRadius:5}}
              >
                <View style={[{flex:1}, {
                  flexDirection: "column"
                }]}>
                  <View style={{ flex: 1,alignItems:'center' }} >
                    <Ionicons
                      name="grid-outline"
                      size={25}
                      color={textColorAcademics}
                    />
                  </View>
                  <View style={{ flex: 1,alignItems:'center' }} >
                    <Text style={[styles.tabText,{color: textColorAcademics }]}>Academics</Text>
                  </View>
                </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{ flex: 0.4}} >
          <View style={[{flex:1}, {
              // Try setting `flexDirection` to `"row"`.
              flexDirection: "column",justifyContent:'flex-end' 
            }]}>
              {/* <View style={{ flex: 1,alignItems:'center' }} >
                <Ionicons
                  name="person"
                  size={25}
                  //color='grey'
                  color= "grey"
                  onPress={myClassesPressedHandler}
                />
              </View>
              <View style={{ flex: 1,alignItems:'center' }} >
                <Text 
                  style={[styles.tabText,]}>MyClasses</Text>
              </View> */}
              <TouchableHighlight
                onPress={myClassesPressedHandler}
                onShowUnderlay={onShowUnderlayClass}
                onHideUnderlay={onHideUnderlayClass}
                underlayColor="#E5E7E9"
                style={{borderRadius:5}}
              >
                <View style={[{flex:1}, {
                  flexDirection: "column"
                }]}>
                  <View style={{ flex: 1,alignItems:'center' }} >
                    <MaterialCommunityIcons name="google-classroom" size={25} color={textColorClass}/>
                  </View>
                  <View style={{ flex: 1,alignItems:'center' }} >
                    <Text style={[styles.tabText,{color: textColorClass }]}>MyClasses</Text>
                  </View>
                </View>
            </TouchableHighlight>
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
    padding:5,
    // borderBottomEndRadius: 25,
    // borderBottomStartRadius: 25,
    borderTopWidth:1,
    borderTopColor:'darkgrey',
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
  tabText:{
    fontFamily:"HindSemiBold",
    color:'grey'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
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


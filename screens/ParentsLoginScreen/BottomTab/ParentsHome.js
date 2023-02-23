import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { TouchableNativeFeedback } from "react-native";
import { TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ParentsHome = ({style}) => {
  const navigation = useNavigation();
  const [changeIconBackground,setChangeIconBackground]=useState(false);
  const [textColorDashboard, setTextColorDashboard] = useState('grey');
  const [textColorAcademics, setTextColorAcademics] = useState('grey');
  const [textColorClass, setTextColorClass] = useState('grey');

  function myClassesPressedHandler(){
    setChangeIconBackground(true);
    navigation.navigate("ParentsProfile")
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
        flexDirection: "row"
      }]}>
        <View style={{ flex: 0.4,}} >
          <View style={[{flex:1}, {
            flexDirection: "column"
          }]}>
            <TouchableHighlight
                onPress={() => navigation.navigate("ParentsLoginScreen")}
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
            flexDirection: "column",
          }]}>
             <TouchableHighlight
                onPress={() => navigation.navigate("Academics")}
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
                    <Text style={[styles.tabText,{color: textColorAcademics}]}>Academics</Text>
                  </View>
                </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{ flex: 0.4}} >
          <View style={[{flex:1}, {
              flexDirection: "column",justifyContent:'flex-end' 
            }]}>
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
                    <Text style={[styles.tabText,{color: textColorClass }]}>Profile</Text>
                  </View>
                </View>
            </TouchableHighlight>
            </View>
        </View>
      </View>
    </View>
  );
};

export default ParentsHome;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    padding:5,
    borderTopWidth:1,
    borderTopColor:'darkgrey',
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  tabText:{
    fontFamily:"HindSemiBold",
    color:'grey'
  },

});
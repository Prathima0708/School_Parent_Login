import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { classData, filteredCT, length } from "./MyClasses";


export var MYCLASS, MYSECTION;
var USERID, CT, ID;

const DisplayClass = ({ class_name, section, id }) => {
  ID = id;
 
  const [userID, setUserID] = useState("");
  const [ctData, setCTData] = useState([]);
  const [bgColor, setBgColor] = useState(false);
 
  const naviagtion = useNavigation();

 

  function navigateHander() {
    naviagtion.navigate("StudentList");
    MYCLASS = class_name;
    MYSECTION = section;
  }
  async function fetchCT() {
    CT = await AsyncStorage.getItem("classteacher");

    if (CT !== null) {
      setCTData(CT);
    }
   
  }
  fetchCT();
  function getBg(ID) {
   
    let result = classData.filter((ele) => ele.id == ID);
    
   
  }
  let result = filteredCT?.filter((ele) => ele.id == ID);

  useEffect(() => {
    if (result.length == 0) {
      setBgColor(false);
  
    } else {
      setBgColor(true);
 
    }
  });
  return (
    <>
      <View style={styles.space} />
      <View style={{ width: "30%" }}>
        <Pressable onPress={navigateHander}>
          <Card
          
            style={{
              marginVertical: 15,
              marginHorizontal: 10,

              elevation: 5,
              borderRadius: 10,
              paddingBottom: 15,

              backgroundColor: bgColor ? "#DE9317" : "#1E84A4",
          
              width: "110%",
            }}
          >
            <Card.Content style={{ margin: 5, marginTop: 0 }}>
              <View style={{ top: 10 }}>
                <Text
                  style={{
                    fontSize: deviceHieght * 0.017,
                    fontFamily: "HindSemiBold",
                    color: "white",
                  }}
                >
                  {class_name} {"-"} {section}
                </Text>
              </View>
            </Card.Content>
          </Card>
        </Pressable>
      </View>
    </>
  );
};

export default DisplayClass;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  space: {
    width: 40,
    height: 40,
  },
});

import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { filteredCT, length } from "./MyClasses";

export var MYCLASS, MYSECTION;
var USERID

const DisplayClass = ({ class_name, section }) => {
  // console.log("array length");
  // console.log(length);
  const [userID, setUserID] = useState("");
  const naviagtion = useNavigation();
//   console.log('**************')
// console.log(filteredCT)
// const found=filteredCT.find(element => element == class_name);
// console.log('found is ',found)





  // async function fetchClassTeacher() {
  //   console.log("userid is-", userID);

  //   try {
  //     const res = await axios.get(
  //       `http://10.0.2.2:8000/school/IsClassteacher/3`
  //     );
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // fetchClassTeacher();
  function navigateHander() {
    naviagtion.navigate("StudentList");
    MYCLASS = class_name;
    MYSECTION = section;
  }
  return (
    <View>
      <Pressable onPress={navigateHander}>
        <Card
          // key={key}
          style={{
            marginVertical: 15,
            marginHorizontal: 20,

            elevation: 5,
            borderRadius: 10,
            paddingBottom: 20,
            // backgroundColor: "darkblue",
            backgroundColor: "darkblue",
            width: "80%",
          }}
        >
          <Card.Content style={{ margin: 5, marginTop: 0 }}>
            <View style={{ top: 10 }}>
              <Text
                style={{
                  fontSize: 15,
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
  );
};

export default DisplayClass;

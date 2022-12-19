import { View, Text, Pressable } from "react-native";
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
  // console.log(length);
  const [userID, setUserID] = useState("");
  const [ctData, setCTData] = useState([]);
  const [bgColor, setBgColor] = useState(false);
  // const [bgColor, setBgColor] = useState({ backgroundColor: "darkblue" });
  const naviagtion = useNavigation();

  //  console.log("filtered CT list is", filteredCT);
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
  async function fetchCT() {
    CT = await AsyncStorage.getItem("classteacher");

    if (CT !== null) {
      setCTData(CT);
    }
    // console.log("from display class");
    // console.log(JSON.parse(CT));
  }
  fetchCT();
  function getBg(ID) {
    // if (id == classData[0].id) {
    //   console.log("true");
    // }
    let result = classData.filter((ele) => ele.id == ID);
    console.log(result);
    // array - check the length
    // if its zero then false else its true
    // return "orange"
    // return "darkblue"
  }
  let result = filteredCT?.filter((ele) => ele.id == ID);
  console.log("length is ", result.length);
  useEffect(() => {
    if (result.length == 0) {
      setBgColor(false);
      // setBgColor({ backgroundColor: "orange" });
      console.log("false");
    } else {
      setBgColor(true);
      // setBgColor({ backgroundColor: "darkblue" });
      console.log("true");
    }
  });
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
            //  backgroundColor: getBg(ID),
            backgroundColor: bgColor ? "orange" : "darkblue",
            // backgroundColor: bgColor,
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

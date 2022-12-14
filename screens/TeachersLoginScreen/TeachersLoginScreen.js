import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import CategoryGridTile from "../../components/StudentItem/CategoryGridTile";

import { TEACHERS } from "../../components/utils/TeachersDashboard";

import { useLayoutEffect } from "react";
import IconButton from "../../components/UI/IconButton";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import { Image } from "react-native";
import TeachersCategoryGridTile from "../../components/StudentItem/TeachersCategoryGridTile";

import { StaffPhoto, Teacher } from "../Login";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { subURL } from "../../components/utils/URL's";
import { Image as NativeImage } from "native-base";
import TeachersHome from "./BottomTab/TeachersHome";
var USERNAME, value, USERID;
let i;
const TeachersLoginScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const route = useRoute();
  async function logoutHandler() {
    try {
      value = await AsyncStorage.removeItem("token");
      if (value == null) {
        console.log("Data removed");
        navigation.navigate("Login");
      } else {
        console.log("Data not removed");
      }

      // if (value == null) {
      //   console.log("Token is removed"+value)
      //   //  AsyncStorage.removeItem("token");
      //   //  console.log(value)
      //   //  navigation.navigate("Login");
      // }
    } catch (error) {
      console.log(error);
    }
  }
  const myRef = useRef(null);

  useEffect(() => {
    if (myRef.current && myRef.current.setNativeProps) {
      const styleObj = {
        borderWidth: 3,
        borderRadius: 100,
        borderColor: "#577AFE",
      };
      myRef.current.setNativeProps({
        style: styleObj,
      });
    }
  }, [myRef]);
  async function fetchUser() {
    USERNAME = await AsyncStorage.getItem("UserName");
    console.log("this is the username from aysnc", USERNAME);
    if (USERNAME !== null) {
      setUser(USERNAME);
    }
  }

  fetchUser();

  // useEffect(() => {
  //   fetchUser();
  // }, []);
  async function fetchUserId() {
    USERID = await AsyncStorage.getItem("key");

    if (USERID !== null) {
      setUserId(USERID);
    }
  }
  fetchUserId();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/IsClassteacher/${userId}`);

        // console.log(res.data);
        // var classes = [];
        // var section = [];
        // for (i = 0; i < res.data.length; i++) {
        //   console.log(res.data[i].class_name);
        //   classes.push(res.data[i].class_name);
        // }
        // for (i = 0; i < res.data.length; i++) {
        //   console.log(res.data[i].section);
        //   section.push(res.data[i].section);
        // }
        // console.log(classes);
        // console.log(section);
        let newArray = res.data.map((item) => {
          return {
            value: item.class_name + " - " + item.section,
          };
        });
        console.log(newArray);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={logoutHandler}
            icon="log-out-outline"
            size={30}
          />
        );
      },
    });
  }, []);

  function renderCategoryItem(itemData) {
    // console.log(itemData)
    function pressHandler() {
      if (itemData.item.id === "c1") {
        navigation.navigate("TeachersTransport");
      }
      if (itemData.item.id === "c2") {
        navigation.navigate("TeachersCalendar");
      }
      if (itemData.item.id === "c3") {
        navigation.navigate("TeachersNoticeBoard");
      }
      if (itemData.item.id === "c4") {
        navigation.navigate("TeachersAcademics");
      }
      if (itemData.item.id === "c5") {
        navigation.navigate("MyClasses");
      }
    }
    return (
      <View style={styles.rootContainer1}>
        <TeachersCategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          icon={itemData.item.icon}
          onPress={pressHandler}
          txtclr={itemData.item.txtclr}
          subTitle={itemData.item.subTitle}
        />
      </View>
    );
  }

  return (
    <>
      <View style={{ backgroundColor: "#ffff", height: "100%" }}>
        <Text style={styles.heading}></Text>
        <View style={styles.studentItem}>
          <View style={styles.studentItem}>
            {/* <Image
              source={{
                uri: `http://10.0.2.2:8000${StaffPhoto}`,
              }}
              style={styles.image}
            /> */}
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/848/848006.png",
              }}
              style={styles.image}
            />
            {/* <NativeImage
              alignSelf="center"
              borderRadius={100}
              top="15%"
              source={{
                uri: `${StaffPhoto}`,
              }}
              alt="Student Image"
              size="lg"
              ref={myRef}
              resizeMode="contain"
            /> */}

            <Text style={[styles.textBase, styles.description]}>
              {user.charAt(0).toUpperCase() + user.slice(1)}
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "white", height: "100%" }}>
          <FlatList
            style={styles.rootContainer}
            data={TEACHERS}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
          />
        </View>
        <TeachersHome />
      </View>
    </>
  );
};

export default TeachersLoginScreen;

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    // padding: 32,
    //padding: 32,
  },

  rootContainer1: {
    //flex: 1,
    top: 3,
    justifyContent: "center",
    alignItems: "center",
    //padding: 32,
  },

  title: {
    fontSize: deviceWidth < 370 ? 16 : 18,
    // fontWeight: "500",
    // marginBottom: '10%',
    fontFamily: "HindRegular",
  },
  heading: {
    textAlign: "center",
    marginTop: "4%",
    fontWeight: "bold",
    color: "gray",
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 16 : 20,
  },
  studentItem: {
    width: "80%",
    marginHorizontal: "10%",
    padding: "3%",
    bottom:'2%',
   // marginVertical: "1%",
    //  backgroundColor: "#3e04c3",
    backgroundColor: "#23215b",
    //   flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 16,
  },
  textBase: {
    color: "#0D98BA",
    fontFamily: "HindRegular",
    // marginRight: 33,
  },
  description: {
    fontSize: deviceWidth < 370 ? 18 : 20,
    fontFamily: "HindRegular",
    marginBottom: "2%",
    fontWeight: "bold",
  },

  image: {
    height: 70,
    width: 70,
  },
});

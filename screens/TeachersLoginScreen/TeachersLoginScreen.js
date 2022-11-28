import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

import CategoryGridTile from "../../components/StudentItem/CategoryGridTile";

import { TEACHERS } from "../../components/utils/TeachersDashboard";

import { useLayoutEffect } from "react";
import IconButton from "../../components/UI/IconButton";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import { Image } from "react-native";
import TeachersCategoryGridTile from "../../components/StudentItem/TeachersCategoryGridTile";

import { Teacher } from "../Login";
var username, value;
const TeachersLoginScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
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

  async function fetchUser() {
    USERNAME = await AsyncStorage.getItem("UserName");
    console.log("this is the username from aysnc", USERNAME);
    if (USERNAME !== null) {
      setUser(USERNAME);
    }
  }

  fetchUser();

  useEffect(() => {
    fetchUser();
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
        navigation.navigate("TeachersProfile");
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
        <Text style={styles.heading}>{USERNAME} Dashboard</Text>
        <View style={styles.studentItem}>
          <View style={styles.studentItem}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/848/848006.png",
              }}
              style={styles.image}
            />

            <Text style={[styles.textBase, styles.description]}>{user}</Text>
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
    flex: 1,
    top: 10,
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
    marginVertical: "3%",
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

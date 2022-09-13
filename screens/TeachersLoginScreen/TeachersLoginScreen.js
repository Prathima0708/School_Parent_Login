import { StyleSheet, FlatList, View } from "react-native";
import React from "react";

import CategoryGridTile from "../../components/StudentItem/CategoryGridTile";

import { TEACHERS } from "../../components/utils/TeachersDashboard";

import { useLayoutEffect } from "react";
import IconButton from "../../components/UI/IconButton";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import { Image } from "react-native";
import TeachersCategoryGridTile from "../../components/StudentItem/TeachersCategoryGridTile";
import TeachersHome from "./TeachersHome";

const TeachersLoginScreen = ({ navigation }) => {
  async function logoutHandler() {
    try {
      const value = await AsyncStorage.removeItem("token");
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
        navigation.navigate("TeachersMarksheet");
      }
      if (itemData.item.id === "c4") {
        navigation.navigate("TeachersAcademics");
      }
      if (itemData.item.id === "c5") {
        navigation.navigate("TeachersLeave");
      }
    }
    return (
      <TeachersCategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        icon={itemData.item.icon}
        onPress={pressHandler}
        txtclr={itemData.item.txtclr}
        subTitle={itemData.item.subTitle}
      />
    );
  }

  return (
    <>
      <View style={{ backgroundColor: "white", height: "100%" }}>
        <Text style={styles.heading}>Teachers Dashboard</Text>
        <View style={styles.studentItem}>
          <View style={styles.studentItem}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/848/848006.png",
              }}
              style={styles.image}
            />

            <Text style={[styles.textBase, styles.description]}>
              Teacher name
            </Text>
          </View>
        </View>

        <FlatList
          style={styles.rootContainer}
          data={TEACHERS}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          numColumns={2}
        />
      </View>
    </>
  );
};

export default TeachersLoginScreen;

const styles = StyleSheet.create({
  rootContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    // padding: 32,
    //padding: 32,
  },
  title: {
    fontSize: 20,
    // fontWeight: "500",
    marginBottom: 8,
  },
  heading: {
    textAlign: "center",
    marginTop: 13,
    fontWeight: "bold",
    color: "gray",
    fontSize: 20,
  },
  studentItem: {
    width: "80%",
    marginHorizontal: 35,
    padding: 11,
    marginVertical: 8,
    //  backgroundColor: "#3e04c3",
    backgroundColor: "#23215b",
    //   flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 16,
  },
  textBase: {
    color: "#0D98BA",
    // marginRight: 33,
  },
  description: {
    fontSize: 20,

    marginBottom: 4,
    fontWeight: "bold",
  },

  image: {
    height: 70,
    width: 70,
  },
});

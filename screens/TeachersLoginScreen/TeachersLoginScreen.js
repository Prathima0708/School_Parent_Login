import { StyleSheet, FlatList, View } from "react-native";
import React from "react";

import CategoryGridTile from "../../components/StudentItem/CategoryGridTile";

import { TEACHERS } from "../../components/utils/TeachersDashboard";

import { useLayoutEffect } from "react";
import IconButton from "../../components/UI/IconButton";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import { Image } from "react-native";

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
      <View style={styles.rootContainer}>
        <CategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          icon={itemData.item.icon}
          onPress={pressHandler}
        />
      </View>
    );
  }

  return (
    <>
      <Text style={styles.heading}>Teachers Dashboard</Text>
      <View style={styles.studentItem}>
        <View style={styles.studentItem}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
              }}
              style={styles.image}
              width="100px"
            />
          </View>
          <Text style={[styles.textBase, styles.description]}>Name</Text>
        </View>
      </View>
      <FlatList
        data={TEACHERS}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </>
  );
};

export default TeachersLoginScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 32,
    //padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
  test: {
    width: "50%",
    display: "flex",
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

    padding: 11,
    marginVertical: 8,
    marginHorizontal: 38,
    backgroundColor: "#23215b",
    //flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 16,
  },
  textBase: {
    color: "#e4d9fd",
    textAlign: "center",
  },
  description: {
    fontSize: 16,

    marginBottom: 4,
    fontWeight: "bold",
  },
  imageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    //minWidth: 80,
  },
  image: {
    height: 80,
    width: 80,
  },
});

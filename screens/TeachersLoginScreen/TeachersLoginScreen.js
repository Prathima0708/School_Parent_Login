import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import React from "react";
import { useState } from "react";
import CategoryGridTile from "../../components/StudentItem/CategoryGridTile";

import { TEACHERS } from "../../components/utils/TeachersDashboard";
<<<<<<< HEAD
=======
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import IconButton from "../../components/UI/IconButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> d36a14c78ceebe4e3407ac030067288406d2ae1f

const TeachersLoginScreen = ({ navigation }) => {
<<<<<<< HEAD

  async function logoutHandler() {
    try {
      // const value = await AsyncStorage.getItem('token');
    const value=  await AsyncStorage.removeItem("token");
    if(value==null){
      console.log('Data removed')
      navigation.navigate("Login");
    }
    else{
      console.log('Data not removed')
    }
      
      // if (value == null) {
      //   console.log("Token is removed"+value)
      //   //  AsyncStorage.removeItem("token");
      //   //  console.log(value)
      //   //  navigation.navigate("Login");
      // }
    } catch (error) {
      // Error retrieving data
    }
  };

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight:()=>{
        return(
          // <LogoutButton onPress={LogoutBtnPressHandler}>Test</LogoutButton>
          <IconButton onPress={logoutHandler} icon="log-out-outline" size={30}/>
        )
      }
    })
  },[])

  function renderCategoryItem(itemData) {   
=======
  function renderCategoryItem(itemData) {
>>>>>>> 061d1a50c8a5d441beb946c249c58b09dccd4677
    function pressHandler() {
      if (itemData.item.id === "c1") {
        navigation.navigate("TeachersTransport");
      }
      if (itemData.item.id === "c2") {
        navigation.navigate("TeachersCalendar");
      }
      if (itemData.item.id === "c4") {
        navigation.navigate("TeachersAcademics");
      }
    }
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        icon={itemData.item.icon}
        onPress={pressHandler}
      />
    );
  }
  return (
    <>
      {/* <View style={styles.rootContainer}>
        <Text style={styles.title}>Welcome</Text> */}

      <FlatList
        data={TEACHERS}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />

      {/* </View> */}
    </>
  );
};

export default TeachersLoginScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
});

import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import React from "react";
import { useState } from "react";
import CategoryGridTile from "../../components/StudentItem/CategoryGridTile";

import { TEACHERS } from "../../components/utils/TeachersDashboard";

const TeachersLoginScreen = ({ navigation }) => {
  function renderCategoryItem(itemData) {
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

import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import React from "react";
import { studentList } from "./WelcomeScreen";
import StudentItem from "../components/StudentItem/StudentItem";

const ParentsLoginScreen = () => {
  //   if (studentList.length == 0) {
  //     Alert.alert("Invalid Input", "Please enter valid credentials");
  //   }
  function renderStudentDetails(itemData) {
    return <StudentItem {...itemData.item} />;
  }
  return (
    <View style={styles.rootContainer}>
      <Text>parents login</Text>
      <FlatList data={studentList} renderItem={renderStudentDetails} />
    </View>
  );
};

export default ParentsLoginScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
});

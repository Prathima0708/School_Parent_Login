import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const TeachersHome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <Ionicons
        name="grid-outline"
        size={34}
        color="white"
        onPress={() => navigation.navigate("TeachersLogin")}
      />
      <Ionicons
        name="person"
        size={34}
        color="white"
        onPress={() => navigation.navigate("TeachersProfile")}
      />
    </View>
  );
};

export default TeachersHome;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#0072AF",
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottomEndRadius: 25,
    // borderBottomStartRadius: 25,
    position: "absolute",
    width: "100%",
    //top: 5,
    bottom: 0,
    paddingHorizontal: 35,
    paddingVertical: 10,
    // borderColor: "white",
    elevation: 2,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
    // borderWidth: 1,
  },
});

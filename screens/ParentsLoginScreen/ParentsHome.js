import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ParentsHome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <Ionicons
        name="grid-outline"
        size={34}
        color="black"
        onPress={() => navigation.navigate("Category")}
      />
      <Ionicons name="globe-outline" size={34} color="black" />
    </View>
  );
};

export default ParentsHome;

const styles = StyleSheet.create({
  root: {
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderColor: "white",
    elevation: 2,
    borderWidth: 1,
  },
});

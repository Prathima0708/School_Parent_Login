import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

const LeaveScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.btn}>
        <Button title="Add Leave Application Form" />
      </View>
      <View style={styles.btn}>
        <Button title="View Leave List" />
      </View>
    </View>
  );
};

export default LeaveScreen;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  btn: {
    marginBottom: 13,
  },
});

import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-web";
import axios from "axios";
import { studentId } from "../../../components/StudentItem/StudentItem";

const LeaveScreen = () => {
  const [showform, setShowForm] = useState(false);
  const [showLeaveList, setShowLeaveList] = useState(false);
  const [leave, setLeave] = useState(false);
  async function formHandler() {
    setShowForm(!showform);
    const res = await axios.get(`http://10.0.2.2:8000/school/Calendar/`);
    console.log(res.data);
  }
  function listHandler() {
    setShowLeaveList(!showLeaveList);
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.btn}>
        <Button title="Add Leave Application Form" onPress={formHandler} />
      </View>
      <View style={styles.btn}>
        <Button title="View Leave List" onPress={listHandler} />
      </View>
      {showform && (
        <View>
          <Text>form</Text>
        </View>
      )}
      {showLeaveList && (
        <View>
          <Text>Leave List</Text>
        </View>
      )}
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

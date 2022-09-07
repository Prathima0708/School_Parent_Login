import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useState } from "react";

import Button from "../../components/UI/Button";
import axios from "axios";

import BgButton from "../../components/UI/BgButton";
import TeachersHome from "./TeachersHome";
const TeachersMarksheet = () => {
  const [studentname, setEnteredStudentName] = useState("");
  const [overallperct, setEnteredOverallPerct] = useState("");
  const [remark, setEnteredRemark] = useState("");

  function studentNameChangeHandler(enteredValue) {
    setEnteredStudentName(enteredValue);
  }
  function percentageChangeHandler(enteredValue) {
    setEnteredOverallPerct(enteredValue);
  }
  function remarkChangeHandler(enteredValue) {
    setEnteredRemark(enteredValue);
  }

  function buttonPressedHandler() {
    // console.log(UserId);
    const FormData = {
      name: studentname,
      value1: overallperct,
      value2: remark,
    };
    console.log(FormData);
    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const resLogin = await axios.post(
          `http://10.0.2.2:8000/school/AddmoreMarksheet_list/`,
          FormData,
          {
            headers: headers,
          }
        );
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
    }
    storeData();
    setEnteredStudentName("");
    setEnteredOverallPerct("");
    setEnteredRemark("");
  }
  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton>Add Marksheet</BgButton>
      </View>

      <ScrollView>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>STUDENT NAME</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={studentNameChangeHandler}
            value={studentname}
          />
          <Text style={styles.labels}>OVERALL PERCENTAGE</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={percentageChangeHandler}
            value={overallperct}
          />
          <Text style={styles.labels}>REMARK</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={remarkChangeHandler}
            value={remark}
          />

          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Marksheet</Button>
          </View>
        </View>
        <View style={styles.home}>
          <TeachersHome />
        </View>
      </ScrollView>
    </>
  );
};

export default TeachersMarksheet;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
  },
  home: {
    marginTop: 330,
  },

  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  inputStyle: {
    color: "black",
    borderWidth: 2,
    borderColor: "grey",
    // paddingHorizontal: 15,
    // paddingVertical: 7,
    borderRadius: 10,
    fontSize: 18,
    // margin:5
  },
  labels: {
    marginTop: 17,
  },
  btnSubmit: {
    marginTop: 17,
  },
});

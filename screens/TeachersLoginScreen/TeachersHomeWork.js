import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/UI/Button";
import axios from "axios";
import { Button as Btn } from "react-native";

import { UserId } from "../Login";
import RNDateTimePicker from "@react-native-community/datetimepicker";
const TeachersHomework = () => {
  const [classname, setEnteredClassName] = useState("");
  const [section, setEnteredSection] = useState("");
  const [subject, setEnteredSubject] = useState("");

  const [remark, setEnteredRemark] = useState();
  const [hw, setHW] = useState("");
  const [date, setDate] = useState(new Date());

  function classNameHandler(enteredValue) {
    setEnteredClassName(enteredValue);
  }
  function sectionHandler(enteredValue) {
    setEnteredSection(enteredValue);
  }
  function subjectChangeHandler(enteredValue) {
    setEnteredSubject(enteredValue);
  }
  function dateChangeHandler(enteredValue) {
    setEnteredDate(enteredValue);
  }
  function remarkChangeHandler(enteredValue) {
    setEnteredRemark(enteredValue);
  }
  function hwChangeHandler(enteredValue) {
    setHW(enteredValue);
  }

  function buttonPressedHandler() {
    console.log(UserId);
    const FormData = {
      classname,
      section,
      subject,
      date,
      remark,
      hw,
    };
    console.log(FormData);
    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const dataForm = FormData;
        const resLogin = await axios.post(
          "http://10.0.2.2:8000/school/Homework/",
          dataForm,
          {
            headers: headers,
          }
        );
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        //console.log(token);
      } catch (error) {
        console.log(error);
      }
    }
    storeData();
  }
  return (
    <>
      <View style={styles.BtnContainer}>
        <Text>Add HomeWork</Text>
      </View>

      <ScrollView horizontal={true}>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>CLASSNAME</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={classNameHandler}
            value={classname}
          />

          <Text style={styles.labels}>SECTION</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={sectionHandler}
            value={section}
          />

          <Text style={styles.labels}>SUBJECT</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={subjectChangeHandler}
            value={subject}
          />

          <Text style={styles.labels}>DATE : {date.toDateString()}</Text>
          <RNDateTimePicker
            mode="date"
            value={date}
            onChange={dateChangeHandler}
          />

          <Text style={styles.labels}>REMARK</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={remarkChangeHandler}
            value={remark}
          />
          <Text style={styles.labels}>HOMEWORK</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={hwChangeHandler}
            value={hw}
          />

          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Homework</Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TeachersHomework;

const styles = StyleSheet.create({
  inputForm: {
    width: "100%",
    padding: 10,
    marginTop: 10,
  },
  inputStyle: {
    marginTop: 10,
    width: "100%",
    borderWidth: 2,
    borderColor: "grey",
  },
  labels: {
    marginTop: 12,
  },
  btnSubmit: {
    marginTop: 15,
  },
});

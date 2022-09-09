import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useState } from "react";

import Button from "../../components/UI/Button";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
import TeachersHome from "./TeachersHome";
const TeachersNoticeboard = () => {
  const [username, setEnteredUserName] = useState("");
  const [title, setEnteredTitle] = useState("");
  const [description, setEnteredDescription] = useState("");
  const [dateOfCreation, setEnteredDateOfCreation] = useState("");
  const [fromShow, setFromShow] = useState(false);
  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());
  const [fromText, setFromText] = useState("");

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };
  const fromDateChangeHandler = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate || fromDate;
    setFromShow(Platform.OS === "ios");
    setFromDate(currentFromDate);

    let tempFromDate = new Date(currentFromDate);
    let fDate =
      tempFromDate.getDate() +
      "/" +
      (tempFromDate.getMonth() + 1) +
      "/" +
      tempFromDate.getFullYear();
    setFromText(fDate);
    //console.log(fDate);
  };
  function userNameChangeHandler(enteredValue) {
    setEnteredUserName(enteredValue);
  }
  function titleChangeHandler(enteredValue) {
    setEnteredTitle(enteredValue);
  }
  function descriptionChangeHandler(enteredValue) {
    setEnteredDescription(enteredValue);
  }
  function dateOfCreationChangeHandler(enteredValue) {
    setEnteredDateOfCreation(enteredValue);
  }

  function buttonPressedHandler() {
    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const resLogin = await axios.post(
          `http://10.0.2.2:8000/school/NoticeBoard/`,
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
        <BgButton>Add Notice</BgButton>
      </View>

      <ScrollView>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>USERNAME</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={userNameChangeHandler}
            value={username}
          />
          <Text style={styles.labels}>TITLE</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={titleChangeHandler}
            value={title}
          />
          <Text style={styles.labels}>DESCRIPTION</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={descriptionChangeHandler}
            value={description}
          />
          {/* <TextInput
            style={styles.inputStyle}
            onChangeText={dateOfCreationChangeHandler}
            value={dateOfCreation}
          /> */}
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "black",
              }}
            >
              DATE OF CREATION:
            </Text>

            <Ionicons
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "right",
              }}
              name="calendar"
              size={24}
              color="black"
              onPress={() => showFromMode("date")}
            />
            {fromShow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={fromDate}
                mode={frommode}
                is24Hour={true}
                display="default"
                onChange={fromDateChangeHandler}
              />
            )}
          </View>
          <TextInput style={styles.inputStyle} value={fromText} />

          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Notice</Button>
          </View>
        </View>
      </ScrollView>
      <TeachersHome />
    </>
  );
};

export default TeachersNoticeboard;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
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
    borderRadius: 5,
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

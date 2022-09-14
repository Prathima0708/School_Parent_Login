import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
=======
import React, { useState } from "react";
import { useFonts } from "expo-font";
>>>>>>> 9f5f187a0b0291047266019b5cc369e3080cb6dd
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

  const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
      console.log(keyboardStatus)
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
      console.log(keyboardStatus)
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add Notice</BgButton>
      </View> */}

      <ScrollView style={styles.root}>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>USERNAME</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={userNameChangeHandler}
            value={username}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.labels}>TITLE</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={titleChangeHandler}
            value={title}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.labels}>DESCRIPTION</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={descriptionChangeHandler}
            value={description}
            onSubmitEditing={Keyboard.dismiss}
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
                fontSize: 18,
                color: "black",
                fontFamily: "Monsterrat",
                marginLeft: -10,
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
          <TextInput style={styles.inputStyle} value={fromText} onSubmitEditing={Keyboard.dismiss} />

          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Notice</Button>
          </View>
        </View>
      </ScrollView>
      {keyboardStatus=='Keyboard Hidden' && <TeachersHome />}
    </>
  );
};

export default TeachersNoticeboard;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
  },
  home: {
    marginTop: 29,
  },
  root: {
    backgroundColor: "#EBECFO",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  inputStyle: {
    color: "black",
    borderWidth: 2,
    borderColor: "lightgrey",
    backgroundColor: "white",
    padding: 10,
    // paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
    //margin: 5,
  },
  labels: {
    margin: 5,
    fontFamily: "Ubuntu",
    fontSize: 18,
    // marginTop: 17,
  },
  btnSubmit: {
    marginTop: 30,
    marginBottom: 30,
  },
});

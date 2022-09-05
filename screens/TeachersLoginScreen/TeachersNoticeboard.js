import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useState } from "react";

import Button from "../../components/UI/Button";
import axios from "axios";

import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
const TeachersNoticeboard = () => {
  const [username, setEnteredUserName] = useState("");
  const [title, setEnteredTitle] = useState("");
  const [description, setEnteredDescription] = useState("");
  const [dateOfCreation, setEnteredDateOfCreation] = useState("");

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
          <Text style={styles.labels}>DATE OF CREATION</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={dateOfCreationChangeHandler}
            value={dateOfCreation}
          />

          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Notice</Button>
          </View>
        </View>
      </ScrollView>
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
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 5,
  },
  labels: {
    marginTop: 17,
  },
  btnSubmit: {
    marginTop: 17,
  },
});

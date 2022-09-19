import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import Button from "../../components/UI/Button";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
import TeachersHome from "./TeachersHome";
import { Keyboard } from "react-native";
import { useEffect } from "react";
import Input from "../../components/UI/Input";
const TeachersNoticeboard = () => {
  const [username, setEnteredUserName] = useState("");
  const [enteredUserNameTouched,setEnteredUserNameTouched]=useState(false)
  const enteredUserNameIsValid=username.trim()!=='';
  const usernameInputIsInValid=!enteredUserNameIsValid && enteredUserNameTouched;

  const [title, setEnteredTitle] = useState("");
  const [enteredTitleTouched,setEnteredTitleTouched]=useState(false)
  const enteredTitleIsValid=title.trim()!=='';
  const titleInputIsInValid=!enteredTitleIsValid && enteredTitleTouched;

  const [description, setEnteredDescription] = useState("");
  const [enteredDescriptionTouched,setEnteredDescriptionTouched]=useState(false)
  const enteredDescriptionIsValid=description.trim()!=='';
  const descriptionInputIsInValid=!enteredDescriptionIsValid && enteredDescriptionTouched;

  const [dateOfCreation, setEnteredDateOfCreation] = useState("");
  const [fromShow, setFromShow] = useState(false);
  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched,setEnteredFromDateTouched]=useState(false)
  const enteredFromDateIsValid=fromText.trim()!=='';
  const fromDateInputIsInValid=!enteredFromDateIsValid && enteredFromDateTouched;

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
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

    setEnteredUserNameTouched(true);
    setEnteredTitleTouched(true);
    setEnteredDescriptionTouched(true);
    setEnteredFromDateTouched(true);

    if(!enteredUserNameIsValid){
      return;
    }
    if(!enteredTitleIsValid){
      return;
    }
    if(!enteredDescriptionIsValid){
      return;
    }
    if(!enteredFromDateIsValid){
      return;
    }
    else{
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
      setEnteredUserNameTouched(false);
      setEnteredTitleTouched(false);
      setEnteredDescriptionTouched(false);
      setEnteredFromDateTouched(false);
    }
  }
  function usernameInputBlur(){
    setEnteredUserNameTouched(true);
  }

  function titleInputBlur(){
    setEnteredTitleTouched(true);
  }

  function descriptionInputBlur(){
    setEnteredDescriptionTouched(true);
  }
  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add Notice</BgButton>
      </View> */}

      <ScrollView style={styles.root}>
        <View style={styles.inputForm}>
          <Input 
            placeholder="Username"
            onChangeText={userNameChangeHandler}
            blur={usernameInputBlur}
            value={username}
            onSubmitEditing={Keyboard.dismiss}
            style={usernameInputIsInValid && styles.errorBorderColor}
          />
          {usernameInputIsInValid && (
            <Text style={{ color: "red",left:20 }}>Enter Username</Text>
          )}

          <Input 
            keyboardType="number-pad"
            placeholder="Title"
            onChangeText={titleChangeHandler}
            blur={titleInputBlur}
            value={title}
            onSubmitEditing={Keyboard.dismiss}
            style={titleInputIsInValid && styles.errorBorderColor}
          />
          {titleInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter title</Text>
            )}

          <Input 
            placeholder="Description"
            onChangeText={descriptionChangeHandler}
            blur={descriptionInputBlur}
            value={description}
            onSubmitEditing={Keyboard.dismiss}
            style={descriptionInputIsInValid && styles.errorBorderColor}
          />
          {descriptionInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter description</Text>
            )}

          <View>
            <Ionicons
              style={{
                position:'absolute',
                top:23,
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
          <Input 
            value={fromText}
            onSubmitEditing={Keyboard.dismiss}
            placeholder=" Date of creation:"
            style={fromDateInputIsInValid && styles.errorBorderColor}
          />
          {fromDateInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter Date</Text>
            )}
          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Notice</Button>
          </View>
        </View>
      </ScrollView>
      {keyboardStatus == "Keyboard Hidden" && <TeachersHome />}
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
  errorBorderColor:{
    color: "black",
    borderBottomWidth: 1,
    borderColor: "red",
    padding: 10,
    margin: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
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

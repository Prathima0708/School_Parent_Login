import { View, StyleSheet, TextInput, Text, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
import { Ionicons } from "@expo/vector-icons";
import TeachersHome from "./TeachersHome";
import Input from "../../components/UI/Input";
import { getMomentsAsync } from "expo-media-library";
const TeachersCalendar = () => {
  const [title, setEnteredTitle] = useState("");
  const [enteredTitleTouched,setEnteredTitleTouched]=useState(false)
  const enteredTitleIsValid=title.trim()!=='';
  const titleInputIsInValid=!enteredTitleIsValid && enteredTitleTouched;

  const [description, setEnteredDescription] = useState("");
  const [enteredDescriptionTouched,setEnteredDescriptionTouched]=useState(false)
  const enteredDescriptionIsValid=description.trim()!=='';
  const descriptionInputIsInValid=!enteredDescriptionIsValid && enteredDescriptionTouched;

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched,setEnteredFromDateTouched]=useState(false);
  let pattern=/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  const enteredFromDateIsValid=fromText.trim()!=='' && pattern;
  const fromDateInputIsInValid=!enteredFromDateIsValid && enteredFromDateTouched;

  const [toText, setToText] = useState("");
  const [enteredtoDateTouched,setEnteredtoDateTouched]=useState(false)
  const enteredtoDateIsValid=toText.trim()!=='';
  const toDateInputIsInValid=!enteredtoDateIsValid && enteredtoDateTouched;

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

  const showToMode = (currentToMode) => {
    setToShow(true);

    setToMode(currentToMode);
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
      if(event.type == "set") {
        setFromText(fDate);
      } else {
          //cancel button clicked
      }

    //console.log(fDate);
  };

  const toDateChangeHandler = (event, selectedToDate) => {
    const currentToDate = selectedToDate || toDate;
    setToShow(Platform.OS === "ios");
    setToDate(currentToDate);

    let tempToDate = new Date(currentToDate);
    let tDate =
      tempToDate.getDate() +
      "/" +
      (tempToDate.getMonth() + 1) +
      "/" +
      tempToDate.getFullYear();
      
      if(event.type == "set") {
        setToText(tDate);
      } else {
          //cancel button clicked
      }
    // console.log(fDate);
  };

  function titleChangeHandler(enteredValue) {
    setEnteredTitle(enteredValue);
  }
  function descriptionChangeHandler(enteredValue) {
    setEnteredDescription(enteredValue);
  }
  function frmDateHandler(enteredValue){
    setFromText(enteredValue);
  }
  function toDateHandler(enteredValue){
    setToText(enteredValue);
  }

  function buttonPressedHandler() {
    const FormData = {
      description: description,
      startdate: fromDate,
      enddate: toDate,
      titlee: title,
    };

    console.log(FormData);

    setEnteredTitleTouched(true);
    setEnteredDescriptionTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    // setCheckFromDateTouched(true);
    // setCheckToDateTouched(true);
    if(!enteredTitleIsValid){
      return;
    }
    if(!enteredDescriptionIsValid){
      return;
    }
    if(!enteredFromDateIsValid){
      return;
    }
    
    if(!enteredtoDateIsValid){
      return;
    }
    // if(!enteredCheckDateFromIsValid){
    //   return;
    // }
    // if(!enteredCheckDateToIsValid){
    //   return;
    // }
    else{
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const dataForm = FormData;
          const resLogin = await axios.post(
            `http://10.0.2.2:8000/school/Calendar/`,
            dataForm,
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
      setEnteredDescription("");
      setEnteredTitle("");
      setFromText("");
      setToText("");
      setEnteredTitleTouched(false);
      setEnteredDescriptionTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
    }
  }

  function titleBlurHandler(){
    setEnteredTitleTouched(true);
  }
  function descriptionBlurHandler(){
    setEnteredDescriptionTouched(true);
  }
  function fromDateBlurHandler(){
    setEnteredFromDateTouched(true);
  }
  function toDateBlurHandler(){
    setEnteredtoDateTouched(true);
  }
  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add Event</BgButton>
      </View> */}

      <ScrollView>
        <View style={styles.inputForm}>
          <Input 
            keyboardType="number-pad"
            placeholder="Title"
            onChangeText={titleChangeHandler}
            blur={titleBlurHandler}
            value={title}
            onSubmitEditing={Keyboard.dismiss}
            style={titleInputIsInValid && styles.errorBorderColor}
          />
          {titleInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter the title</Text>
            )}
          <Input 
            placeholder="Description"
            onChangeText={descriptionChangeHandler}
            blur={descriptionBlurHandler}
            value={description}
            onSubmitEditing={Keyboard.dismiss}
            style={descriptionInputIsInValid && styles.errorBorderColor}
          />
          {descriptionInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter description</Text>
            )}
          <View
            style={[{ flexDirection: "row"}]}>
            <View style={{ flex: 1 }}>
              <View>
                <Ionicons
                  style={{
                    position:'absolute',
                    top:22,
                  }}
                  name="calendar"
                  size={24}
                  color="black"
                  onPress={() => showFromMode("date")}
                />
              </View>
              <Input 
                value={fromText || fromDate} 
                placeholder='Event Start Date:'
                onSubmitEditing={Keyboard.dismiss}
                style={fromDateInputIsInValid && styles.errorBorderColor}
                blur={fromDateBlurHandler}
                onChangeText={frmDateHandler}
                keyboardType="number-pad"
              />
              {fromDateInputIsInValid && (
                <Text style={{ color: "red",left:20 }}>Enter from date</Text>
              )}
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
            <View style={styles.space} />
            <View style={{ flex: 1 }}>
              <View>
                <Ionicons
                  style={{
                    position:'absolute',
                    top:22,
                  }}
                  name="calendar"
                  size={24}
                  color="black"
                  onPress={() => showToMode("date")}
                />
              </View>
              <Input 
                value={toText || toDate}
                placeholder="Event End Date: " 
                onSubmitEditing={Keyboard.dismiss}
                style={toDateInputIsInValid && styles.errorBorderColor}
                blur={toDateBlurHandler}
                onChangeText={toDateHandler}
              />
              {toDateInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter to date</Text>
            )}
              {toShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={toDate}
                  mode={tomode}
                  is24Hour={true}
                  display="default"
                  onChange={toDateChangeHandler}
                  //  minimumDate={fromDate}
                />
              )}
            </View>
          </View>
          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Event</Button>
          </View>
        </View>
      </ScrollView>
      {keyboardStatus == "Keyboard Hidden" && <TeachersHome />}
    </>
  );
};

export default TeachersCalendar;

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

  btnSubmit: {
    marginTop: 217,
  },
  space: {
    width: 20,
    height: 20,
  },
});

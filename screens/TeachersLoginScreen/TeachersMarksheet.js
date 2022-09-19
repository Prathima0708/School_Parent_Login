import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useRef } from "react";

import Button from "../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import BgButton from "../../components/UI/BgButton";
import TeachersHome from "./TeachersHome";
import Input from "../../components/UI/Input";
const TeachersMarksheet = () => {
  const [studentname, setEnteredStudentName] = useState("");
  const [enteredStudentnameTouched,setEnteredStudentnameTouched]=useState(false)
  const enteredStudentnameIsValid=studentname.trim()!=='';
  const studentnameInputIsInValid=!enteredStudentnameIsValid && enteredStudentnameTouched;

  const [overallperct, setEnteredOverallPerct] = useState("");
  const [enteredOverallPercentageTouched,setEnteredOverallPercentageTouched]=useState(false)
  const enteredOverallPercentageIsValid=overallperct.trim()!=='';
  const overallpercentageInputIsInValid=!enteredOverallPercentageIsValid && enteredOverallPercentageTouched;

  const [remark, setEnteredRemark] = useState("");
  const [enteredReamrkTouched,setEnteredReamrkTouched]=useState(false)
  const enteredReamrkIsValid=remark.trim()!=='';
  const remarkInputIsInValid=!enteredReamrkIsValid && enteredReamrkTouched;

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

    setEnteredStudentnameTouched(true);
    setEnteredOverallPercentageTouched(true);
    setEnteredReamrkTouched(true);

    if(!enteredStudentnameIsValid){
      return;
    }
    if(!enteredOverallPercentageIsValid){
      return;
    }
    if(!enteredReamrkIsValid){
      return;
    }
    else{
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
      setEnteredStudentnameTouched(false);
      setEnteredOverallPercentageTouched(false);
      setEnteredReamrkTouched(false);
    }
  }

  function studentnameBlurHandler(){
    setEnteredStudentnameTouched(true);
  }
  function overallpercentageBlurHandler(){
    setEnteredOverallPercentageTouched(true);
  }
  function remarkBlurHandler(){
    setEnteredReamrkTouched(true);
  }

  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add Marksheet</BgButton>
      </View> */}

      <ScrollView>
        <View style={styles.inputForm}>
          <Input 
            placeholder="Student Name"
            onChangeText={studentNameChangeHandler}
            blur={studentnameBlurHandler}
            value={studentname}
            onSubmitEditing={Keyboard.dismiss}
            style={studentnameInputIsInValid && styles.errorBorderColor}
          />
          {studentnameInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter student name</Text>
          )}

          <Input 
             placeholder="Overall Percentage"
             onChangeText={percentageChangeHandler}
             blur={overallpercentageBlurHandler}
             value={overallperct}
             onSubmitEditing={Keyboard.dismiss}
             style={overallpercentageInputIsInValid && styles.errorBorderColor}
          />
          {overallpercentageInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter overall percentage</Text>
          )}

          <Input 
            placeholder="Remark"
            onChangeText={remarkChangeHandler}
            blur={remarkBlurHandler}
            value={remark}
            onSubmitEditing={Keyboard.dismiss}
            style={remarkInputIsInValid && styles.errorBorderColor}
          />
          {remarkInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter remark</Text>
            )}

          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Marksheet</Button>
          </View>
        </View>
      </ScrollView>
      {keyboardStatus == "Keyboard Hidden" && (
        <View style={styles.home}>
          <TeachersHome />
        </View>
      )}
    </>
  )}

export default TeachersMarksheet;

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
    marginTop: 27,
    marginBottom: 39,
  },
});

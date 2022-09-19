import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Platform,
  Button as Btn,
} from "react-native";
import { Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/UI/Button";
import axios from "axios";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";

import { Ionicons } from "@expo/vector-icons";
import TeachersHome from "./TeachersHome";
import Input from "../../components/UI/Input";
const TeachersLeave = () => {
  const [leaveType, setEnteredLeaveType] = useState("");
  const [enteredLeaveTypeTouched,setEnteredLeaveTypeTouched]=useState(false)
  const enteredLeaveTypeIsValid=leaveType.trim()!=='';
  const leavetypeInputIsInValid=!enteredLeaveTypeIsValid && enteredLeaveTypeTouched;

  const [leaveReason, setEnteredLeaveReason] = useState("");
  const [enteredLeaveReasonTouched,setEnteredLeaveReasonTouched]=useState(false)
  const enteredLeaveReasonIsValid=leaveReason.trim()!=='';
  const leavereasonInputIsInValid=!enteredLeaveReasonIsValid && enteredLeaveReasonTouched;

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched,setEnteredFromDateTouched]=useState(false)
  const enteredFromDateIsValid=fromText.trim()!=='';
  const fromDateInputIsInValid=!enteredFromDateIsValid && enteredFromDateTouched;

  const [toText, setToText] = useState("");
  const [enteredtoDateTouched,setEnteredtoDateTouched]=useState(false)
  const enteredtoDateIsValid=toText.trim()!=='';
  const toDateInputIsInValid=!enteredtoDateIsValid && enteredtoDateTouched;

  const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');

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
    setFromText(fDate);
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
    setToText(tDate);
    // console.log(fDate);
  };
  function leaveTypeChangeHandler(enteredValue) {
    setEnteredLeaveType(enteredValue);
  }
  function leaveReasonChangeHandler(enteredValue) {
    setEnteredLeaveReason(enteredValue);
  }

  function buttonPressedHandler() {
    console.log(UserId);
    const FormData = {
      leave_type: leaveType,
      leave_reason: leaveReason,
      leave_form: fromDate,
      leave_to: toDate,
    };
    // console.log(FormData);
    setEnteredLeaveTypeTouched(true);
    setEnteredLeaveReasonTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);

    if(!enteredLeaveTypeIsValid){
      return;
    }
    if(!enteredLeaveReasonIsValid){
      return;
    }
    if(!enteredFromDateIsValid){
      return;
    }
    if(!enteredtoDateIsValid){
      return;
    }
    else{
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const dataForm = FormData;
          const resLogin = await axios.post(
            `http://10.0.2.2:8000/school/Leave/`,
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
      setEnteredLeaveType("");
      setEnteredLeaveReason("");
      setFromText("");
      setToText("");
      setEnteredLeaveTypeTouched(false);
      setEnteredLeaveReasonTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
    }

  }
  function leavetypeBlurHandler(){
    setEnteredLeaveTypeTouched(true);
  }
  function leavereasonBlurHandler(){
    setEnteredLeaveReasonTouched(true);
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
        <BgButton>Add Leave</BgButton>
      </View> */}

      <ScrollView>
        <View style={styles.inputForm}>
          <Input 
             placeholder="LEAVE TYPE"
             onChangeText={leaveTypeChangeHandler}
             blur={leavetypeBlurHandler}
             value={leaveType}
             onSubmitEditing={Keyboard.dismiss}
             style={leavetypeInputIsInValid && styles.errorBorderColor}
          />
          {leavetypeInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter the type</Text>
            )}
          <Input 
            onChangeText={leaveReasonChangeHandler}
            blur={leavereasonBlurHandler}
            placeholder="LEAVE REASON"
            value={leaveReason}
            onSubmitEditing={Keyboard.dismiss}
            style={leavereasonInputIsInValid && styles.errorBorderColor}
          />
          {leavereasonInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter leave reason</Text>
            )}
          {/* <Text style={styles.labels}>LEAVE FROM</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={leaveFromChangeHandler}
            value={leaveFrom}
          />
          <Text style={styles.labels}>LEAVE TO</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={leaveToChangeHandler}
            value={leaveTo}
          />
          <View>
          <DateTimePickerModal isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker} />
          <DateTimePickerModal isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker} />
          </View>
         
      <Button title="Show Date Picker" onPress={showDatePicker} /> */}

        <View style={[{flexDirection: "row"}]}>
          <View style={{ flex: 1}}>
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
          </View>
          <Input 
            value={fromText} 
            placeholder="LEAVE FROM:" 
            onSubmitEditing={Keyboard.dismiss}
            style={fromDateInputIsInValid && styles.errorBorderColor}
          />
          {fromDateInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter leave from</Text>
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
                top:23,
              }}
              name="calendar"
              size={24}
              color="black"
              onPress={() => showToMode("date")}
            />
          </View>
          <Input 
            value={toText}  
            placeholder="LEAVE TO:"
            onSubmitEditing={Keyboard.dismiss}
            style={toDateInputIsInValid && styles.errorBorderColor}
          />
          {toDateInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter to</Text>
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
            <Button onPress={buttonPressedHandler}>Add Leave</Button>
          </View>
        </View>
      </ScrollView>
      {keyboardStatus=='Keyboard Hidden' && <TeachersHome />}
    </>
  );
};

export default TeachersLeave;

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
  // labels: {
  //   margin: 5,
  //   fontFamily: "Ubuntu",
  //   fontSize: 18,
  //   // marginTop: 17,
  // },
  btnSubmit: {
    marginTop: 17,
  },
  dateContainer: {
    width: "10%",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});

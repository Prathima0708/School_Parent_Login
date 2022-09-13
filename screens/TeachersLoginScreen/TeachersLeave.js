import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Platform,
  Button as Btn,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/UI/Button";
import axios from "axios";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";

import { Ionicons } from "@expo/vector-icons";
const TeachersLeave = () => {
  const [leaveType, setEnteredLeaveType] = useState("");
  const [leaveReason, setEnteredLeaveReason] = useState("");

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");

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
  }

  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add Leave</BgButton>
      </View> */}

      <ScrollView>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>LEAVE TYPE</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={leaveTypeChangeHandler}
            value={leaveType}
          />
          <Text style={styles.labels}>LEAVE REASON</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={leaveReasonChangeHandler}
            value={leaveReason}
          />
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

          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: -10,
            }}
          >
            <Text style={styles.labels}>LEAVE FROM:</Text>

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
          </View>
          <TextInput style={styles.inputStyle} value={fromText} />
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

          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: -10,
            }}
          >
            <Text style={styles.labels}>LEAVE TO:</Text>

            <Ionicons
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "right",
              }}
              name="calendar"
              size={24}
              color="black"
              onPress={() => showToMode("date")}
            />
          </View>
          <TextInput style={styles.inputStyle} value={toText} />
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

          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Leave</Button>
          </View>
        </View>
      </ScrollView>
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
    marginTop: 17,
  },
  dateContainer: {
    width: "10%",
  },
});

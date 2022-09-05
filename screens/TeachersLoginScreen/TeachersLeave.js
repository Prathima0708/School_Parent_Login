import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useState } from "react";

import Button from "../../components/UI/Button";
import axios from "axios";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";

const TeachersLeave = () => {
  const [leaveType, setEnteredLeaveType] = useState("");
  const [leaveReason, setEnteredLeaveReason] = useState("");
  const [leaveFrom, setEnteredLeaveFrom] = useState("");
  const [leaveTo, setEnteredLeaveTo] = useState("");


  function leaveTypeChangeHandler(enteredValue) {
    setEnteredLeaveType(enteredValue);
  }
  function leaveReasonChangeHandler(enteredValue) {
    setEnteredLeaveReason(enteredValue);
  }
  function leaveFromChangeHandler(enteredValue) {
    setEnteredLeaveFrom(enteredValue);
  }
  function leaveToChangeHandler(enteredValue) {
    setEnteredLeaveTo(enteredValue);
  }

  function buttonPressedHandler() {
    console.log(UserId);
    const FormData = {
      leaveType,
      leaveReason,
      leaveFrom,
      leaveTo,
    };
    console.log(FormData);
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
        <BgButton>Add Leave</BgButton>
      </View>

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
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={leaveReasonChangeHandler}
            value={leaveReason}
          />
          <Text style={styles.labels}>LEAVE FROM</Text>
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
         
      <Button title="Show Date Picker" onPress={showDatePicker} />
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
  dateContainer:{
    width:'10%'
  }
});

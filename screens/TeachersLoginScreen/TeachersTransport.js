import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useState } from "react";

import Button from "../../components/UI/Button";
import axios from "axios";

import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
const TeachersTransport = () => {
  const [studentID, setEnteredStudentID] = useState("");
  const [vehicleno, setEnteredVehicleNo] = useState("");
  const [type, setEnteredType] = useState("");
  const [drivername, setEnteredDriverName] = useState("");
  const [mobile, setEnteredMobile] = useState();
  const [routename, setEnteredRouteName] = useState("");
  const [stopname, setEnteredStopName] = useState("");

  function studentIDChangeHandler(enteredValue) {
    setEnteredStudentID(enteredValue);
  }
  function vehicleChangeHandler(enteredValue) {
    setEnteredVehicleNo(enteredValue);
  }
  function typeChangeHandler(enteredValue) {
    setEnteredType(enteredValue);
  }
  function driverNameChangeHandler(enteredValue) {
    setEnteredDriverName(enteredValue);
  }
  function mobileChangeHandler(enteredValue) {
    setEnteredMobile(enteredValue);
  }
  function routeNameChangeHandler(enteredValue) {
    setEnteredRouteName(enteredValue);
  }
  function stopNameChangeHandler(enteredValue) {
    setEnteredStopName(enteredValue);
  }

  function buttonPressedHandler() {
    console.log(UserId);
    const FormData = {
      studentID,
      vehicleno,
      type,
      drivername,
      mobile,
      routename,
      stopname,
    };
    console.log(FormData);
    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const dataForm = FormData;
        const resLogin = await axios.post(
          `http://10.0.2.2:8000/school/Transportreport/${UserId}/`,
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
        <BgButton>Add Transport</BgButton>
      </View>

      <ScrollView>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>STUDENT ID</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={studentIDChangeHandler}
            value={studentID}
          />
          <Text style={styles.labels}>VEHICLE NO</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={vehicleChangeHandler}
            value={vehicleno}
          />
          <Text style={styles.labels}>TYPE</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={typeChangeHandler}
            value={type}
          />
          <Text style={styles.labels}>DRIVER NAME</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={driverNameChangeHandler}
            value={drivername}
          />
          <Text style={styles.labels}>MOBILE NO</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={mobileChangeHandler}
            value={mobile}
          />
          <Text style={styles.labels}>ROUTE NAME</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={routeNameChangeHandler}
            value={routename}
          />
          <Text style={styles.labels}>STOP NAME</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={stopNameChangeHandler}
            value={stopname}
          />

          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Transport</Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TeachersTransport;

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

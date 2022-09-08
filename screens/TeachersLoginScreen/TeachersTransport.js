import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useState } from "react";

import Button from "../../components/UI/Button";
import axios from "axios";

import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
import TeachersHome from "./TeachersHome";
const TeachersTransport = () => {
  const [studentID, setEnteredStudentID] = useState("");
  const [vehicleno, setEnteredVehicleNo] = useState("");
  const [type, setEnteredType] = useState("");
  const [drivername, setEnteredDriverName] = useState("");
  const [mobile, setEnteredMobile] = useState();
  const [routename, setEnteredRouteName] = useState("");
  const [stopname, setEnteredStopName] = useState("");
  const [busNumber, setEnteredBusNumber] = useState("");

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
  function busNumberChangeHandler(enteredValue) {
    setEnteredBusNumber(enteredValue);
  }

  function buttonPressedHandler() {
    console.log(UserId);
    const FormData = {
      busnumber: busNumber,
      vehicleno: vehicleno,
      types: type,
      driver_name: drivername,
      emp_mobile: mobile,
      route_name: routename,
      stop_name: stopname,
    };
    console.log(FormData);
    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const resLogin = await axios.post(
          `http://10.0.2.2:8000/school/Transportreport/${UserId}/`,
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
    setEnteredStudentID("");
    setEnteredBusNumber("");
    setEnteredVehicleNo("");
    setEnteredType("");
    setEnteredDriverName("");
    setEnteredMobile("");
    setEnteredRouteName("");
    setEnteredStopName("");
  }
  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton>Add Transport</BgButton>
      </View>

      <ScrollView>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>BUS NUMBER</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={busNumberChangeHandler}
            value={busNumber}
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
            keyboardType="number-pad"
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
      <View style={styles.home}>
        <TeachersHome />
      </View>
    </>
  );
};

export default TeachersTransport;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
  },
  home: {
    marginTop: 29,
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
    fontSize: 18,
    marginTop: 17,
  },
  btnSubmit: {
    marginTop: 30,
    marginBottom: 30,
  },
});

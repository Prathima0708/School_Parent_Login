import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useState } from "react";

import Button from "../../components/UI/Button";
import axios from "axios";

import { UserId } from "../Login";
const TeachersTransport = () => {
  const [creator, setEnteredStudent] = useState("");
  const [vehicleno, setEnteredVehicleNumber] = useState("");
  const [types, setEnteredTypes] = useState("");
  const [driver_name, setEnteredDriverName] = useState("");
  const [emp_mobile, setEnteredEmpMobile] = useState();
  const [route_name, setEnteredRoute] = useState("");
  const [stop_name, setEnteredStopName] = useState("");

  function studentTextChanged(enteredValue) {
    setEnteredStudent(enteredValue);
  }
  function vehicleNumberChanged(enteredValue) {
    setEnteredVehicleNumber(enteredValue);
  }
  function typesChanged(enteredValue) {
    setEnteredTypes(enteredValue);
  }
  function driverNameChanged(enteredValue) {
    setEnteredDriverName(enteredValue);
  }
  function empChnaged(enteredValue) {
    setEnteredEmpMobile(enteredValue);
  }
  function routeChnaged(enteredValue) {
    setEnteredRoute(enteredValue);
  }
  function stopChnaged(enteredValue) {
    setEnteredStopName(enteredValue);
  }

  function buttonPressedHandler() {
    console.log(UserId);
    const FormData = {
      creator,
      vehicleno,
      types,
      driver_name,
      emp_mobile,
      route_name,
      stop_name,
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
        <Text>Add Transport</Text>
      </View>

      <ScrollView horizontal={true}>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>STUDENT</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={studentTextChanged}
            value={creator}
          />

          <Text style={styles.labels}>VEHICLENO</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={vehicleNumberChanged}
            value={vehicleno}
          />

          <Text style={styles.labels}>TYPES</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={typesChanged}
            value={types}
          />

          <Text style={styles.labels}>DRIVERS NAME</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={driverNameChanged}
            value={driver_name}
          />

          <Text style={styles.labels}>EMP MOBILE</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={empChnaged}
            value={emp_mobile}
          />
          <Text style={styles.labels}>ROUTE NAME</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={routeChnaged}
            value={route_name}
          />
          <Text style={styles.labels}>STOP NAME</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={stopChnaged}
            value={stop_name}
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
  inputForm: {
    width: "100%",
    padding: 10,
    marginTop: 10,
  },
  inputStyle: {
    marginTop: 10,
    width: "100%",
    borderWidth: 2,
    borderColor: "grey",
  },
  labels: {
    marginTop: 12,
  },
  btnSubmit: {
    marginTop: 15,
  },
});

import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import Button from "../../components/UI/Button";
import axios from "axios";

import { UserId } from "../Login";
const TeachersTimeTable = () => {
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

  function buttonPressedHandler() {
    setShowTable(true);
    setShowForm(false);
    setForTransportList({ fontWeight: "bold", color: "black" });
    setForAddTransport({ color: "black" });
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
          `http://10.0.2.2:8000/school/Timetable/${UserId}/`,
          dataForm,
          {
            headers: headers,
          }
        );

        console.log(resLogin);
      } catch (error) {
        console.log(error);
      }
    }
    storeData();
  }
  return (
    <>
      <View style={styles.BtnContainer}>
        <Text>Add TimeTable</Text>
      </View>

      <ScrollView horizontal={true}>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>CLASSNAME</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={studentTextChanged}
            value={creator}
          />

          <Text style={styles.labels}>SECTION</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={vehicleNumberChanged}
            value={vehicleno}
          />

          <Text style={styles.labels}>TIMETABLE DATE</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={typesChanged}
            value={types}
          />

          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add TimeTable</Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TeachersTimeTable;

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

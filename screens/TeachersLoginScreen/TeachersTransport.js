import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import Button from "../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
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
  const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
      console.log(keyboardStatus)
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
      console.log(keyboardStatus)
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
          "http://10.0.2.2:8000/school/Transportreport/",
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
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add Transport</BgButton>
      </View> */}

      <ScrollView style={styles.root}>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>Bus Number</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={busNumberChangeHandler}
            value={busNumber}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.labels}>Vehicle Number</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={vehicleChangeHandler}
            value={vehicleno}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.labels}>Type</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={typeChangeHandler}
            value={type}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.labels}>Driver Name</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={driverNameChangeHandler}
            value={drivername}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.labels}>Mobile Number</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={mobileChangeHandler}
            value={mobile}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.labels}>Route Name</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={routeNameChangeHandler}
            value={routename}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.labels}>Stop Name</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={stopNameChangeHandler}
            value={stopname}
            onSubmitEditing={Keyboard.dismiss}
          />

          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Transport</Button>
          </View>
        </View>
      </ScrollView>
      {keyboardStatus=='Keyboard Hidden' && <View style={styles.home}>
        <TeachersHome />
      </View>}
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
    marginTop: 30,
    marginBottom: 30,
  },
});

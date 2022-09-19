import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import Button from "../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
import TeachersHome from "./TeachersHome";
import Input from "../../components/UI/Input";

const TeachersTransport = () => {
  const [studentID, setEnteredStudentID] = useState("");

  const [vehicleno, setEnteredVehicleNo] = useState("");
  const [enteredVehicleNoTouched,setEnteredVehicleNoTouched]=useState(false)
  const enteredVehicleNoIsValid=vehicleno.trim()!=='';
  const vehicleNoInputIsInValid=!enteredVehicleNoIsValid && enteredVehicleNoTouched;

  const [type, setEnteredType] = useState("");
  const [enteredTypeTouched,setEnteredTypeTouched]=useState(false)
  const enteredTypeIsValid=type.trim()!=='';
  const typeInputIsInValid=!enteredTypeIsValid && enteredTypeTouched;
  
  const [drivername, setEnteredDriverName] = useState("");
  const [enteredDrivernameTouched,setEnteredDrivernameTouched]=useState(false)
  const enteredDrivernameIsValid=drivername.trim()!=='';
  const drivernameInputIsInValid=!enteredDrivernameIsValid && enteredDrivernameTouched;

  const [mobile, setEnteredMobile] = useState("");
  const [enteredMobileTouched,setEnteredMobileTouched]=useState(false)
  const enteredMobileIsValid=mobile.trim()!=='';
  const mobileInputIsInValid=!enteredMobileIsValid && enteredMobileTouched;

  const [routename, setEnteredRouteName] = useState("");
  const [enteredRoutenameTouched,setEnteredRoutenameTouched]=useState(false)
  const enteredRoutenameIsValid=routename.trim()!=='';
  const routenameInputIsInValid=!enteredRoutenameIsValid && enteredRoutenameTouched;

  const [stopname, setEnteredStopName] = useState("");
  const [enteredStopnameTouched,setEnteredStopnameTouched]=useState(false)
  const enteredStopnameIsValid=stopname.trim()!=='';
  const stopnameInputIsInValid=!enteredStopnameIsValid && enteredStopnameTouched;

  const [busNumber, setEnteredBusNumber] = useState("");
  const [enteredBusnumberTouched,setEnteredBusnumberTouched]=useState(false)
  const enteredBusnumberIsValid=busNumber.trim()!=='';
  const busnumberInputIsInValid=!enteredBusnumberIsValid && enteredBusnumberTouched;

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

    setEnteredBusnumberTouched(true);
    setEnteredVehicleNoTouched(true);
    setEnteredTypeTouched(true);
    setEnteredDrivernameTouched(true);
    setEnteredMobileTouched(true);
    setEnteredRoutenameTouched(true);
    setEnteredStopnameTouched(true);

    if(!enteredBusnumberIsValid){
      return;
    }
    if(!enteredVehicleNoIsValid){
      return;
    }
    if(!enteredTypeIsValid){
      return;
    }
    if(!enteredDrivernameIsValid){
      return;
    }
    if(!enteredMobileIsValid){
      return;
    }
    if(!enteredRoutenameIsValid){
      return;
    }
    if(!enteredStopnameIsValid){
      return;
    }
    else{
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
      setEnteredBusnumberTouched(false);
      setEnteredVehicleNoTouched(false);
      setEnteredTypeTouched(false);
      setEnteredDrivernameTouched(false);
      setEnteredMobileTouched(false);
      setEnteredRoutenameTouched(false);
      setEnteredStopnameTouched(false);
    }
    
  }

  function busnumberInputBlur(){
    setEnteredBusnumberTouched(true);
  }
  function vehicleInputBlur(){
    setEnteredVehicleNoTouched(true);
  }
  function typeInputBlur(){
    setEnteredTypeTouched(true);
  }
  function drivernameInputBlur(){
    setEnteredDrivernameTouched(true);
  }
  function mobilenumberInputBlur(){
    setEnteredMobileTouched(true);
  }
  function routenameInputBlur(){
    setEnteredRoutenameTouched(true);
  }
  function stopnameInputBlur(){
    setEnteredStopnameTouched(true);
  }
  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add Transport</BgButton>
      </View> */}

      <ScrollView style={styles.root}>
        <View style={styles.inputForm}>
          <Input 
            keyboardType="number-pad"
            placeholder="Bus Number"
            onChangeText={busNumberChangeHandler}
            blur={busnumberInputBlur}
            value={busNumber}
            onSubmitEditing={Keyboard.dismiss}
            style={busnumberInputIsInValid && styles.errorBorderColor}
          />
          {busnumberInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter bus number</Text>
            )}

          <Input 
            keyboardType="number-pad"
            placeholder="Vehicle Number"
            onChangeText={vehicleChangeHandler}
            blur={vehicleInputBlur}
            value={vehicleno}
            onSubmitEditing={Keyboard.dismiss}
            style={vehicleNoInputIsInValid && styles.errorBorderColor}
          />
          {vehicleNoInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter vehicle number</Text>
            )}

          <Input 
            placeholder="Type"
            onChangeText={typeChangeHandler}
            blur={typeInputBlur}
            value={type}
            onSubmitEditing={Keyboard.dismiss}
            style={typeInputIsInValid && styles.errorBorderColor}
          />
          {typeInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter type</Text>
            )}

          <Input 
            placeholder="Driver Name"
            onChangeText={driverNameChangeHandler}
            blur={drivernameInputBlur}
            value={drivername}
            onSubmitEditing={Keyboard.dismiss}
            style={drivernameInputIsInValid && styles.errorBorderColor}
          />
          {drivernameInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter driver name</Text>
            )}

           <Input 
            keyboardType="number-pad"
            // style={styles.inputStyle}
            placeholder="Mobile Number"
            onChangeText={mobileChangeHandler}
            blur={mobilenumberInputBlur}
            value={mobile}
            onSubmitEditing={Keyboard.dismiss}
            style={mobileInputIsInValid && styles.errorBorderColor}
          />
          {mobileInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter mobile number</Text>
            )}

          <Input 
            placeholder="Route Name"
            onChangeText={routeNameChangeHandler}
            blur={routenameInputBlur}
            value={routename}
            onSubmitEditing={Keyboard.dismiss}
            style={routenameInputIsInValid && styles.errorBorderColor}
          />
          {routenameInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter route name</Text>
            )}

          <Input 
            placeholder="Stop Name"
            onChangeText={stopNameChangeHandler}
            blur={stopnameInputBlur}
            value={stopname}
            onSubmitEditing={Keyboard.dismiss}
            style={stopnameInputIsInValid && styles.errorBorderColor}
          />
          {stopnameInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter stop name</Text>
            )}

          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Transport</Button>
          </View>
        </View>
      </ScrollView>
      {keyboardStatus == "Keyboard Hidden" && (
        <View style={styles.home}>
          <TeachersHome />
        </View>
      )}
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
    // backgroundColor:'white'
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
    marginTop: 30,
    marginBottom: 30,
  },
});

import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
import { Ionicons } from "@expo/vector-icons";
import TeachersHome from "./TeachersHome";
const TeachersCalendar = () => {
  const [title, setEnteredTitle] = useState("");
  const [description, setEnteredDescription] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
      console.log(keyboardStatus);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
      console.log(keyboardStatus);
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

  function titleChangeHandler(enteredValue) {
    setEnteredTitle(enteredValue);
  }
  function descriptionChangeHandler(enteredValue) {
    setEnteredDescription(enteredValue);
  }

  function buttonPressedHandler() {
    const FormData = {
      description: description,
      startdate: fromDate,
      enddate: toDate,
      titlee: title,
    };

    console.log(FormData);
    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const dataForm = FormData;
        const resLogin = await axios.post(
          `http://10.0.2.2:8000/school/Calendar/`,
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
    setEnteredDescription("");
    setEnteredTitle("");
    setFromText("");
    setToText("");
  }
  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add Event</BgButton>
      </View> */}

      <ScrollView>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>Title</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.inputStyle}
            onChangeText={titleChangeHandler}
            value={title}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.labels}>Description</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={descriptionChangeHandler}
            value={description}
            onSubmitEditing={Keyboard.dismiss}
          />
          <View
            style={[
              ,
              {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "row",
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  paddingVertical: 15,
                  // paddingHorizontal: 10,
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: -10,
                }}
              >
                <Text style={styles.labels}>Event Start Date:</Text>

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
            </View>
            <View style={styles.space} />
            <View style={{ flex: 1 }}>
              <View
                style={{
                  paddingVertical: 15,
                  //  paddingHorizontal: 10,
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  // marginLeft: -10,
                }}
              >
                <Text style={styles.labels}>Event End Date: </Text>

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
            </View>
          </View>

          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Event</Button>
          </View>
        </View>
      </ScrollView>
      {keyboardStatus == "Keyboard Hidden" && <TeachersHome />}
    </>
  );
};

export default TeachersCalendar;

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
    marginTop: 217,
  },
  space: {
    width: 20,
    height: 20,
  },
});

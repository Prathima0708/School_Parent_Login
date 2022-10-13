import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Platform,
  Button as Btn,
  Alert,
} from "react-native";
import moment from "moment";
import { Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../../components/UI/Button";
import axios from "axios";
import { UserId } from "../../Login";
import BgButton from "../../../components/UI/BgButton";

import { Ionicons } from "@expo/vector-icons";
import TeachersHome from "../BottomTab/TeachersHome";
import Input from "../../../components/UI/Input";

import { Card, DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "react-native-dynamic-search-bar";
export var ID;
const TeachersLeaveScreenBuild = () => {
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [forLeaveList, setForLeaveList] = useState({
    color: "white",
    backgroundColor: "#0C60F4",
    borderRadius: 10,
  });
  const [forLeaveForm, setForLeaveForm] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 10,
  });

  const [leaveType, setEnteredLeaveType] = useState("");
  const [enteredLeaveTypeTouched, setEnteredLeaveTypeTouched] = useState(false);
  const enteredLeaveTypeIsValid = leaveType.trim() !== "";
  const leavetypeInputIsInValid =
    !enteredLeaveTypeIsValid && enteredLeaveTypeTouched;

  const [leaveReason, setEnteredLeaveReason] = useState("");
  const [enteredLeaveReasonTouched, setEnteredLeaveReasonTouched] =
    useState(false);
  const enteredLeaveReasonIsValid = leaveReason.trim() !== "";
  const leavereasonInputIsInValid =
    !enteredLeaveReasonIsValid && enteredLeaveReasonTouched;

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [enteredFromDate, setEnteredFromDate] = useState(new Date());
  const [enteredToDate, setEnteredToDate] = useState(new Date());

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText.trim() !== "";
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;

  const [toText, setToText] = useState("");
  const [enteredtoDateTouched, setEnteredtoDateTouched] = useState(false);
  const enteredtoDateIsValid = toText.trim() !== "";
  const toDateInputIsInValid = !enteredtoDateIsValid && enteredtoDateTouched;

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [deletePressed, setDeletePressed] = useState(false);
  const [isSame, SetIsSame] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [showInitialBtn, setShowInitialBtn] = useState(true);
  let i = 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Leave/`);
        setData(res.data);
        setFilteredData(res.data);
        // console.log(data)
        let test = 0;
        const value = await AsyncStorage.getItem("key");
        for (i = 0; i < res.data.length; i++) {
          if (value == res.data[i].created_by) {
            test = res.data[i].created_by;
          } else {
            // console.log('false')
          }
        }
        if (test == value) {
          // console.log("is same")
          SetIsSame(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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

  function frmDateHandler(enteredValue) {
    setFromDate(enteredValue);
  }
  function toDateHandler(enteredValue) {
    setToDate(enteredValue);
  }

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

    if (event.type == "set") {
      setFromText(fDate);
    } else {
      //cancel button clicked
    }

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

    if (event.type == "set") {
      setToText(tDate);
    } else {
      //cancel button clicked
    }
    // console.log(fDate);
  };
  function leaveTypeChangeHandler(enteredValue) {
    setEnteredLeaveType(enteredValue);
  }
  function leaveReasonChangeHandler(enteredValue) {
    setEnteredLeaveReason(enteredValue);
  }
  function frmDateHandler(enteredValue) {
    setFromDate(enteredValue);
  }
  function toDateHandler(enteredValue) {
    setToText(enteredValue);
  }
  function updateHandler() {
    setShowInitialBtn(true);
    const FormData = {
      leave_type: leaveType,
      leave_reason: leaveReason,
      leave_form: fromDate,
      leave_to: toDate,
    };
    // console.log(FormData);

    // var dateFromValidate = fromText;
    // var isValid = moment(dateFromValidate, "D/M/YYYY", true).isValid();
    // if (!isValid) {
    //   Alert.alert(
    //     "Format Error",
    //     "It seems to be you entered wrong date format please follow D/M/YYYY format ",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]
    //   );
    // }

    // var dateToValidate = toText;
    // var isValid = moment(dateToValidate, "D/M/YYYY", true).isValid();
    // if (!isValid) {
    //   Alert.alert(
    //     "Format Error",
    //     "It seems to be you entered wrong date format please follow D/M/YYYY format",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]
    //   );
    // }

    async function updateData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const dataForm = FormData;
        const resLogin = await axios.put(
          `http://10.0.2.2:8000/school/Leave/${ID}/`,
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
    updateData();

    Alert.alert("Successfully updated", "", [
      { text: "OK", onPress: () => fetchData },
    ]);

    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Leave/`);
        setData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    setEnteredLeaveType("");
    setEnteredLeaveReason("");
    setFromText("");
    setToText("");
    setShowForm(false);
    setShowList(true);
    setForLeaveList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForLeaveForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
  }
  function buttonPressedHandler() {
    console.log(UserId);
    const FormData = {
      student_reg_number: 11,
      user_num: 0,
      user_role: "student",
      username: "prathima",
      email: "priya123@gmail.com",
      leave_type: leaveType,
      leave_form: fromDate,
      leave_to: toDate,
      leave_reason: leaveReason,
      leave_status: "pending",
    };

    const formIsValid = enteredLeaveTypeIsValid && enteredLeaveReasonIsValid;

    if (formIsValid) {
      Alert.alert("Saved Data", "Saved Data successfully", [
        {
          text: "OK",
          onPress: () => {
            setShowForm(false);
            showLeave();
          },
        },
      ]);
    }
    // console.log(FormData);

    // var dateFromValidate = fromText;
    // var isValid = moment(dateFromValidate, "D/M/YYYY", true).isValid();
    // if (!isValid) {
    //   Alert.alert(
    //     "Format Error",
    //     "It seems to be you entered wrong date format please follow D/M/YYYY format ",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]
    //   );
    // }

    // var dateToValidate = toText;
    // var isValid = moment(dateToValidate, "D/M/YYYY", true).isValid();
    // if (!isValid) {
    //   Alert.alert(
    //     "Format Error",
    //     "It seems to be you entered wrong date format please follow D/M/YYYY format",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]
    //   );
    // }
    setEnteredLeaveTypeTouched(true);
    setEnteredLeaveReasonTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);

    if (!enteredLeaveTypeIsValid) {
      return;
    }
    if (!enteredLeaveReasonIsValid) {
      return;
    }
    if (!enteredFromDateIsValid) {
      return;
    }
    if (!enteredtoDateIsValid) {
      return;
    }

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
    setForLeaveList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForLeaveForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    //}
  }
  function leavetypeBlurHandler() {
    setEnteredLeaveTypeTouched(true);
  }
  function leavereasonBlurHandler() {
    setEnteredLeaveReasonTouched(true);
  }
  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
  }
  function toDateBlurHandler() {
    setEnteredtoDateTouched(true);
  }
  function showLeaveForm() {
    setEnteredLeaveType("");
    setEnteredLeaveReason("");
    setFromText("");
    setToText("");
    setForLeaveList({
      backgroundColor: "#0C60F4",
      color: "white",
      borderRadius: 10,
    });
    setForLeaveForm({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
    });
    setShowForm(true);
    setShowList(false);
    setEnteredLeaveTypeTouched(false);
    setEnteredLeaveReasonTouched(false);
    setEnteredFromDateTouched(false);
    setEnteredtoDateTouched(false);
    setIsEdit(false);
  }
  function showLeave() {
    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Leave/`);
        //console.log(res.data);

        setData(res.data);
        setFilteredData(res.data);
        setForLeaveForm({
          color: "white",
          backgroundColor: "#1E8449",
          borderRadius: 10,
        });
        setForLeaveList({
          backgroundColor: "#F4F6F6",
          color: "black",
          borderRadius: 10,
        });
        setShowForm(false);
        setShowList(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }
  function editItem(id) {
    setShowInitialBtn(false);
    ID = id;
    const filteredDummuyData = data.find((data) => data.id == id);
    // console.log(filteredDummuyData);
    setEnteredLeaveType(filteredDummuyData.leave_type);
    setEnteredLeaveReason(filteredDummuyData.leave_type);
    moment(filteredDummuyData.leave_form).format("DD/MM/YYYY");
    setFromText(moment(filteredDummuyData.leave_form).format("DD/MM/YYYY"));
    setToText(moment(filteredDummuyData.leave_to).format("DD/MM/YYYY"));
    setForLeaveList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForLeaveForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    setShowForm(true);
    setShowList(false);
    setIsEdit(true);
  }

  function deleteItem(id) {
    // console.log(id);
    // const newFilteredData=data.filter((data)=>data.id != id);
    Alert.alert("Confirm Deleteion", "Are you sure you want to delete this", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => deleteData() },
    ]);

    async function deleteData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        // const dataForm = FormData;
        const resLogin = await axios.delete(
          `http://10.0.2.2:8000/school/Leave/${id}/`,
          // FormData,
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
      async function fetchData() {
        try {
          const res = await axios.get(`http://10.0.2.2:8000/school/Leave/`);
          // console.log(res.data);
          setData(res.data);
          setFilteredData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }
  const searchFilter = (text) => {
    console.log("search function");
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.leave_type
          ? item.leave_type.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      setFilteredData(data);
      setSearchText(text);
    }
  };
  function cancelHandler() {
    setShowInitialBtn(true);
    setShowList(true);
    setShowForm(false);
  }
  return (
    <>
      {showInitialBtn && (
        <View style={styles.BtnContainer}>
          <BgButton onPress={showLeaveForm} style={forLeaveList}>
            Add Leave
          </BgButton>

          <BgButton onPress={showLeave} style={forLeaveForm}>
            Show Leave
          </BgButton>
        </View>
      )}
      {showForm && (
        <ScrollView>
          <View style={styles.inputForm}>
            <Input
              placeholder="Leave Type"
              onChangeText={leaveTypeChangeHandler}
              blur={leavetypeBlurHandler}
              value={leaveType}
              onSubmitEditing={Keyboard.dismiss}
              style={leavetypeInputIsInValid && styles.errorBorderColor}
            />
            {leavetypeInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>Enter the type</Text>
            )}
            <Input
              onChangeText={leaveReasonChangeHandler}
              blur={leavereasonBlurHandler}
              placeholder="Leave Reason"
              value={leaveReason}
              onSubmitEditing={Keyboard.dismiss}
              style={leavereasonInputIsInValid && styles.errorBorderColor}
            />
            {leavereasonInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter leave reason
              </Text>
            )}

            <View style={[{ flexDirection: "row" }]}>
              <View style={{ flex: 1 }}>
                <View>
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: 23,
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showFromMode("date")}
                  />
                </View>
                <Input
                  value={fromText}
                  placeholder="Leave from"
                  onSubmitEditing={Keyboard.dismiss}
                  style={fromDateInputIsInValid && styles.errorBorderColor}
                  blur={fromDateBlurHandler}
                  onChangeText={frmDateHandler}
                  onPressIn={() => showFromMode("date")}
                />
                {fromDateInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                  >
                    select from date
                  </Text>
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
                      position: "absolute",
                      top: 23,
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showToMode("date")}
                  />
                </View>
                <Input
                  value={toText}
                  placeholder="Leave to:"
                  onSubmitEditing={Keyboard.dismiss}
                  style={toDateInputIsInValid && styles.errorBorderColor}
                  blur={toDateBlurHandler}
                  onChangeText={toDateHandler}
                  onPressIn={() => showToMode("date")}
                />
                {toDateInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                  >
                    select to date
                  </Text>
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
            {!isEdit && (
              <View style={styles.btnSubmit}>
                <Button onPress={buttonPressedHandler}>Add Leave</Button>
              </View>
            )}
            {isEdit && (
              <View style={styles.btnSubmit1}>
                <Button onPress={updateHandler}>Update</Button>
              </View>
            )}
            {isEdit && (
              <View style={styles.cancel}>
                <Button onPress={cancelHandler}>Cancel</Button>
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {showList && (
        <>
          <SearchBar
            onSubmitEditing={Keyboard.dismiss}
            style={styles.searchBar}
            textInputStyle={{ fontFamily: "HindRegular", fontSize: 18 }}
            placeholder="Search here by leave type"
            onChangeText={(text) => searchFilter(text)}
            value={searchText}
          />
          <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
            <View style={{ flex: 8, bottom: 10 }}>
              <ScrollView>
                <View style={styles.root}>
                  {filteredData &&
                    filteredData.map((data, key) => (
                      <>
                        <View>
                          <Card
                            key={key}
                            style={{
                              marginVertical: 15,
                              marginHorizontal: 20,
                              elevation: 5,
                              borderRadius: 10,
                              paddingBottom: 20,
                            }}
                          >
                            <Card.Content>
                              <View style={[{ flexDirection: "row" }]}>
                                <View style={{ flex: 2, marginLeft: 5 }}>
                                  <Ionicons
                                    name="calendar"
                                    size={25}
                                    color="#D4AC0D"
                                    style={{ position: "absolute", left: 5 }}
                                  />
                                  <Text style={styles.cardTextStyle}>
                                    Leave from
                                  </Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                  <View style={{ flex: 2 }}>
                                    <Ionicons
                                      name="calendar"
                                      size={25}
                                      color="#D4AC0D"
                                      style={{ position: "absolute", left: 5 }}
                                    />
                                    <Text style={styles.cardTextStyle}>
                                      Leave to
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View style={[{ flexDirection: "row" }]}>
                                <View style={{ flex: 2, left: 45 }}>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      fontFamily: "HindSemiBold",
                                      color: "grey",
                                    }}
                                  >
                                    {moment(data.leave_form).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </Text>
                                </View>
                                <View style={{ flex: 2, left: 120 }}>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      fontFamily: "HindSemiBold",
                                      color: "grey",
                                    }}
                                  >
                                    {moment(data.leave_to).format("DD/MM/YYYY")}
                                  </Text>
                                </View>
                                <View
                                  style={{ flex: 2, left: 100, bottom: -65 }}
                                >
                                  <Ionicons
                                    name="md-pencil-sharp"
                                    size={24}
                                    color="green"
                                    onPress={() => editItem(data.id)}
                                  />
                                </View>
                                <View
                                  style={{ flex: 2, left: 50, bottom: -65 }}
                                >
                                  <Ionicons
                                    name="trash"
                                    size={24}
                                    color="red"
                                    onPress={() => deleteItem(data.id)}
                                  />
                                </View>
                              </View>
                              <View style={[{ flexDirection: "row", flex: 1 }]}>
                                <View style={{ flex: 2, left: -15, top: 5 }}>
                                  <Text style={styles.cardTextStyle}>
                                    Leave Reason:
                                  </Text>
                                </View>
                                <View style={{ flex: 2, left: -35, top: 5 }}>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      fontFamily: "HindSemiBold",
                                      color: "grey",
                                    }}
                                  >
                                    {data.leave_reason}
                                  </Text>
                                </View>
                              </View>

                              <View style={[{ flexDirection: "row", flex: 1 }]}>
                                <View style={{ flex: 2, left: -15, top: 5 }}>
                                  <Text style={styles.cardTextStyle}>
                                    Leave Type:
                                  </Text>
                                </View>
                                <View style={{ flex: 2, left: -50, top: 5 }}>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      fontFamily: "HindSemiBold",
                                      color: "grey",
                                    }}
                                  >
                                    {data.leave_type}
                                  </Text>
                                </View>
                              </View>
                            </Card.Content>
                          </Card>
                        </View>
                      </>
                    ))}
                </View>
              </ScrollView>
            </View>
            {keyboardStatus == "Keyboard Hidden" && (
              <View style={{ flex: 1 }}>
                <TeachersHome />
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default TeachersLeaveScreenBuild;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",
    width: "49%",
    marginHorizontal: 10,
  },
  searchBar: {
    //top: 10,

    marginTop: 10,
    marginBottom: 20,
  },
  btnSubmit1: {
    marginTop: 90,
    marginBottom: 30,
    marginLeft: 190,
    width: "50%",
  },
  cancel: {
    marginTop: -140,
    marginLeft: -15,
    width: "50%",
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
  errorBorderColor: {
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
    marginTop: 147,
    width: "50%",
    marginLeft: 180,
  },
  dateContainer: {
    width: "10%",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  th: {
    padding: 5,
    marginRight: 13,
    //fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 50,
    fontWeight: "bold",
  },
  tableTitle: {
    // padding: 5,
    margin: 7,
    fontFamily: "MonsterratBold",
    fontSize: 16,
  },
  tableCell: {
    width: 40,
    //  fontFamily: "Montserrat_600SemiBold",
    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
    left: 35,
  },
});

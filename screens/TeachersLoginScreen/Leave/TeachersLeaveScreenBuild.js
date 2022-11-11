import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Platform,
  Button as Btn,
  Alert,
  Dimensions,
  LogBox,
  Animated,
} from "react-native";
import moment from "moment";
import {
Spinner
} from "native-base";
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
import UnderlinedInput from "../../../components/UI/UnderlinedInput";
export var ID;
const TeachersLeaveScreenBuild = () => {

  const [loading,setLoading]=useState(false);

  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, 100);

  const headermax = 100;
  const headermin = 10;

  const animateHeaderBackGround = scrollY.interpolate({
    inputRange: [0, headermax - headermin],
    outputRange: ["white", "white"],
    extrapolate: "clamp",
  });

  const animateHeaderHeight = diffClamp.interpolate({
    inputRange: [0, headermax - headermin],
    outputRange: [headermax, headermin],
    extrapolate: "clamp",
  });

  const [offset, SetOffset] = useState(0);
  const [typeLabel, setTypeLabel] = useState(false);
  const [reasonLabel, setReasonLabel] = useState(false);

  const [isLeavetypeFocused, setIsLeavetypeFocused] = useState(false);
  const [isLeavereasonFocused, setIsLeavereasonFocused] = useState(false);
  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(false);

  const [btn, setBtn] = useState(false);
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
    LogBox.ignoreLogs([
      "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false` ",
    ]);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Leave/`)
        
        setData(res.data);
        setFilteredData(res.data);
        setLoading(true);
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

    if (
      !enteredLeaveReasonIsValid ||
      !enteredLeaveTypeIsValid ||
      !enteredFromDateIsValid ||
      !enteredtoDateIsValid
    ) {
      Alert.alert("Please enter all fields");
    } else {
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
  }
  function buttonPressedHandler() {
    setBtn(true);

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
    setIsLeavetypeFocused(false);
  }
  function onLeavetypeFocusHandler() {
    setIsLeavetypeFocused(true);
    setEnteredLeaveTypeTouched(false);
    setTypeLabel(true);
  }

  function leavereasonBlurHandler() {
    setEnteredLeaveReasonTouched(true);
    setIsLeavereasonFocused(false);
  }
  function onLeavereasonFocusHandler() {
    setIsLeavereasonFocused(true);
    setEnteredLeaveReasonTouched(false);
    setReasonLabel(true);
  }

  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
    setIsFromFocused(false);
  }
  function onFromFocusHandler() {
    setIsFromFocused(true);
    setEnteredFromDateTouched(false);
  }

  function toDateBlurHandler() {
    setEnteredtoDateTouched(true);
    setIsToFocused(false);
  }
  function onToFocusHandler() {
    setIsToFocused(true);
    setEnteredtoDateTouched(false);
  }

  function onScrollHandler(event) {
    setOnScroll(true);
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);

    if (Math.abs(dif) < 3) {
      console.log("unclear");
    } else if (dif > 0) {
      console.log("up");
    } else {
      console.log("down");
    }

    // this.offset = currentOffset;
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

    setTypeLabel(false);
    setReasonLabel(false);
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
    setReasonLabel(true);
    setTypeLabel(true);
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

  // function scrollHandler(event) {
  //   // console.log(event.nativeEvent.contentOffset.y);
  //     let currentOffset = event.nativeEvent.contentOffset.y;
  //     let direction = currentOffset > offset ? 'down' : 'up';
  //     SetOffset(currentOffset);

  //     if(direction=='down'){
  //       setShowInitialBtn(false);
  //     }else{
  //       setShowInitialBtn(true)
  //     }
  // };

  return (
    <>
      {showInitialBtn && (
        <Animated.View
          style={[
            {
              height: animateHeaderHeight,
              backgroundColor: animateHeaderBackGround,
            },
          ]}
        >
          <View style={styles.BtnContainer}>
            <BgButton onPress={showLeaveForm} style={forLeaveList}>
              Add Leave
            </BgButton>

            <BgButton onPress={showLeave} style={forLeaveForm}>
              Show Leave
            </BgButton>
          </View>
          
        </Animated.View>
      )}
      {showForm && (
        <ScrollView style={{ backgroundColor: "white" }}>
          <View style={styles.inputForm}>
            <View>
              <View style={!typeLabel ? styles.normal : styles.up}>
                <Text
                  onPress={onLeavetypeFocusHandler}
                  style={[
                    btn
                      ? styles.normalLabel
                      : leavetypeInputIsInValid
                      ? styles.errorLabel
                      : styles.normalLabel,
                  ]}
                >
                  Leave type
                </Text>
              </View>
              <Input
                // placeholder="leave type"
                onChangeText={leaveTypeChangeHandler}
                blur={leavetypeBlurHandler}
                onFocus={onLeavetypeFocusHandler}
                value={leaveType}
                onSubmitEditing={Keyboard.dismiss}
                style={
                  isLeavetypeFocused
                    ? styles.focusStyle
                    : leavetypeInputIsInValid && styles.errorBorderColor
                }
              />
            </View>
            {leavetypeInputIsInValid && (
              <Text style={styles.errorText}>Enter the type</Text>
            )}
            <View>
              <View
                style={
                  !leavetypeInputIsInValid
                    ? !reasonLabel
                      ? styles.normalRemark
                      : styles.upRemark
                    : !reasonLabel
                    ? styles.normalRemarkExtra
                    : [styles.upRemarkExtra, { top: 3 }]
                }
              >
                <Text
                  style={[
                    btn
                      ? styles.normalLabel
                      : leavereasonInputIsInValid
                      ? [
                          styles.errorLabel,
                          leavetypeInputIsInValid ? { top: 1 } : { top: 13 },
                        ]
                      : styles.normalLabel,
                  ]}
                >
                  Leave reason
                </Text>
              </View>

              {/* <View style={!reasonLabel ? styles.normalRemark : styles.upRemark}>
              <Text style={[leavereasonInputIsInValid ? styles.errorLabel : styles.normalLabel]}>Leave reason</Text>
            </View> */}

              <Input
                onChangeText={leaveReasonChangeHandler}
                blur={leavereasonBlurHandler}
                onFocus={onLeavereasonFocusHandler}
                value={leaveReason}
                onSubmitEditing={Keyboard.dismiss}
                style={
                  isLeavereasonFocused
                    ? styles.focusStyle
                    : leavereasonInputIsInValid && styles.errorBorderColor
                }
              />
            </View>
            {leavereasonInputIsInValid && (
              <Text style={styles.errorText}>Enter leave reason</Text>
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
                <UnderlinedInput
                  value={fromText}
                  placeholder="Leave from"
                  onSubmitEditing={Keyboard.dismiss}
                  style={
                    isFromFocused
                      ? styles.focusStyle
                      : fromDateInputIsInValid && styles.errorBorderColorDate
                  }
                  blur={fromDateBlurHandler}
                  onFocus={onFromFocusHandler}
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
                <UnderlinedInput
                  value={toText}
                  placeholder="Leave to:"
                  onSubmitEditing={Keyboard.dismiss}
                  style={
                    isToFocused
                      ? styles.focusStyle
                      : toDateInputIsInValid && styles.errorBorderColorDate
                  }
                  blur={toDateBlurHandler}
                  onFocus={onToFocusHandler}
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
      {loading ? (
        <Text>1</Text>
      ) :  <Spinner size="lg" />}
      
    </>
  );
};

export default TeachersLeaveScreenBuild;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "#FDFEFE",
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#F0F3F4",
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
    backgroundColor: "white",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
    backgroundColor: "white",
    height: "100%",
  },
  errorBorderColor: {
    borderColor: "red",
  },
  errorBorderColorDate: {
    borderBottomColor: "red",
  },
  // labels: {
  //   margin: 5,
  //   fontFamily: "Ubuntu",
  //   fontSize: 18,
  //   // marginTop: 17,
  // },
  btnSubmit: {
    marginTop: deviceWidth < 370 ? 50 : 70,
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
  focusStyle: {
    borderColor: "blue",
  },
  normal: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },
  up: {
    top: deviceHieght > 800 ? 26 : 21,
    width: deviceWidth > 400 ? 90 : 85,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },
  errorLabel: {
    color: "red",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
    top: deviceHieght > 800 ? -2 : -2,
  },
  normalLabel: {
    color: "grey",
    //color: "#AEB6BF",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
    fontFamily: "HindRegular",
  },

  normalRemark: {
    position: "absolute",
    top: deviceWidth < 370 ? 20 : 25,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upRemark: {
    top: deviceHieght > 800 ? 25 : 28,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 110 : 100,
  },
  normalRemarkExtra: {
    position: "absolute",
    left: deviceWidth < 370 ? 20 : 30,
    top: 26,
  },
  upRemarkExtra: {
    position: "absolute",
    left: deviceWidth < 370 ? 20 : 30,
    top: 5,
  },
  errorText: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: 16,
  },
});
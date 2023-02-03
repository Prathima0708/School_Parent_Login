import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Keyboard,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Badge, Button as NativeButton, Icon, IconButton } from "native-base";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../../../components/UI/Button";
import SelectList from "react-native-dropdown-select-list";
import axios from "axios";

import { Alert, Button as Btn, Image } from "react-native";
import moment from "moment";

import BgButton from "../../../../components/UI/BgButton";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import ParentsHome from "../../BottomTab/ParentsHome";
import Input from "../../../../components/UI/Input";

import { Card, DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "react-native-dynamic-search-bar";
import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
import { StudentRegNo } from "../../../../components/StudentItem/StudentItem";
import { subURL } from "../../../../components/utils/URL's";
var ID;
var FROMDATE, TODATE;

var newArray, USERNAME, USERID, USERROLE, TOKEN;
const LeaveScreen = () => {
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userID, setUserID] = useState("");
  const [token, setToken] = useState("");

  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [btn, setBtn] = useState(false);

  const [forHomeworkList, setForHomeworkList] = useState({
    backgroundColor: "#1E84A4",
    color: "white",
    borderRadius: 5,
  });
  const [forHomeworkForm, setForHomeworkForm] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 5,
  });

  const [data, setData] = useState([]);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [isFromDateFocused, setIsFromDateFocused] = useState(false);
  const [isToDateFocused, setIsToDateFocused] = useState(false);

  const [frmdate, setenteredfrmdate] = useState("");
  const [todate, setenteredtodate] = useState("");

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

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  const [selected, setSelected] = useState("");
  const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
  const enteredSelcetdIsValid = selected.trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [homeworkData, setHomeworkData] = useState([]);
  const [isSame, SetIsSame] = useState(false);
  const [showInitialBtn, setShowInitialBtn] = useState(true);

  const [loading, setLoading] = useState(false);

  const [typeLabel, setTypeLabel] = useState(false);
  const [reasonLabel, setReasonLabel] = useState(false);
  const [emailLabel, setEmailLabel] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isLeavereasonFocused, setIsLeavereasonFocused] = useState(false);
  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(false);

  const [leaveType, setEnteredLeaveType] = useState("");
  const [enteredLeaveTypeTouched, setEnteredLeaveTypeTouched] = useState(false);
  const enteredLeaveTypeIsValid = leaveType.trim() !== "";
  const leavetypeInputIsInValid =
    !enteredLeaveTypeIsValid && enteredLeaveTypeTouched;

  const [email, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [error, setError] = useState(null);
  const enteredEmailIsValid = email.trim() !== "";
  const EmailInputIsInValid = !enteredEmailIsValid && enteredEmailTouched;

  const [leaveReason, setEnteredLeaveReason] = useState("");
  const [enteredLeaveReasonTouched, setEnteredLeaveReasonTouched] =
    useState(false);
  const enteredLeaveReasonIsValid = leaveReason.trim() !== "";
  const leavereasonInputIsInValid =
    !enteredLeaveReasonIsValid && enteredLeaveReasonTouched;

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
  let i = 0;
  const leaveTypeData = [
    { key: "Sick Leave", value: "Sick Leave" },
    { key: "Planned Leave", value: "Planned Leave" },

    { key: "Casual Leave", value: "Casual Leave" },
    { key: "Maternity Leave", value: "Maternity Leave" },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Leave/`);
        setHomeworkData(res.data);
        setFilteredData(res.data);
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
    const timeout = setTimeout(() => {
      setShow(!show);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [show]);

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

  function myLeaveList() {
    console.log("my leave");
    setShowList(true);
    setShowForm(false);

    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/LeaveReg/${StudentRegNo}/`);
        console.log(res.data);

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  async function fetchUser() {
    USERNAME = await AsyncStorage.getItem("UserName");
    USERROLE = await AsyncStorage.getItem("datagroup");
    USERID = await AsyncStorage.getItem("key");
    // console.log("this is the username from aysnc", USERNAME);

    if (USERNAME !== null) {
      setUser(USERNAME);
    }
    if (USERROLE !== null) {
      setUserRole(USERROLE);
    }
    if (USERID !== null) {
      setUserID(USERID);
    }
  }
  fetchUser();

  async function fetchToken() {
    TOKEN = await AsyncStorage.getItem("token");

    if (TOKEN !== null) {
      setToken(TOKEN);
    }
  }
  fetchToken();

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
    setFromDate;
  };

  const showToMode = (currentToMode) => {
    setToShow(true);

    setToMode(currentToMode);
  };

  const fromDateChangeHandler = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate;
    FROMDATE = selectedFromDate;

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
    const currentToDate = selectedToDate;
    TODATE = selectedToDate;
    console.log("to date inside function:", TODATE);
    setToShow(Platform.OS === "ios");
    setToDate(currentToDate);

    let tempToDate = new Date(currentToDate);
    console.log(tempToDate);
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
    TODATE = selectedToDate;
  };

  function frmDateHandler(enteredValue) {
    // setFromText(enteredValue);
    // setEnteredFromDate(enteredValue);
    setFromDate(enteredValue);
    setenteredfrmdate(enteredValue);
  }
  function toDateHandler(enteredValue) {
    // setToText(enteredValue);
    setToDate(enteredValue);
    setenteredtodate(enteredValue);
  }

  function frmDateHandler(enteredValue) {
    // setFromText(enteredValue);
    // setEnteredFromDate(enteredValue);
    setFromDate(enteredValue);
    setenteredfrmdate(enteredValue);
  }
  function toDateHandler(enteredValue) {
    // setToText(enteredValue);
    setToDate(enteredValue);
    setenteredtodate(enteredValue);
  }

  function leaveTypeChangeHandler(enteredValue) {
    setEnteredLeaveType(enteredValue);
  }
  function emailChangeHandler(enteredValue) {
    setEnteredEmail(enteredValue);
  }
  function handleChange(e) {
    if (emailRegex.test(e)) {
      setError(null);
    } else {
      setError("Invalid email");
    }
    setEnteredEmail(e);
  }
  function leaveReasonChangeHandler(enteredValue) {
    setEnteredLeaveReason(enteredValue);
  }

  function updateHandler() {
    setShowInitialBtn(true);
    const FormData = {
      leave_reason: leaveReason,
      leave_form: FROMDATE,
      leave_to: TODATE,
      email: email,
    };

    console.log("edited" + FormData);

    if (
      !enteredLeaveReasonIsValid ||
      !enteredFromDateIsValid ||
      !enteredtoDateIsValid
    ) {
      Alert.alert("Please enter all fields");
    } else {
      async function updateData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Token " + `${token}`,
          };
          const dataForm = FormData;
          const resLogin = await axios.patch(
            `${subURL}/Leave/${ID}/`,
            dataForm,
            {
              headers: headers,
            }
          );

          console.log(resLogin.data);
        } catch (error) {
          console.log(error);
        }
      }
      updateData();

      Alert.alert("Successfully updated", "", [
        { text: "OK", onPress: () => myLeaveList() },
      ]);

      setEnteredLeaveReason("");
      setFromText("");
      setToText("");
      setEnteredEmail("");
      setShowForm(false);

      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
      setEnteredLeaveReasonTouched(false);
      setEnteredEmailTouched(false);
      setEmailLabel(false);

      setForHomeworkList({
        backgroundColor: "#F4F6F6",
        color: "black",
        borderRadius: 5,
      });
      setForHomeworkForm({
        color: "white",
        backgroundColor: "#1E84A4",
        borderRadius: 5,
      });
    }
  }

  function buttonPressedHandler() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    setBtn(true);

    const FormData = {
      student_reg_number: StudentRegNo,

      user_num: userID,
      user_role: userRole,
      username: user,
      email: email,
      leave_type: selected,
      leave_form: FROMDATE,
      leave_to: TODATE,
      leave_reason: leaveReason,
      leave_status: "Pending",
    };

    setEnteredLeaveTypeTouched(true);
    setEnteredLeaveReasonTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredSelectedTouched(true);
    setEnteredEmailTouched(true);

    if (
      !enteredLeaveReasonIsValid ||
      !enteredFromDateIsValid ||
      !enteredtoDateIsValid ||
      !enteredSelcetdIsValid
    ) {
      return;
    } else {
      async function storeData() {
        console.log("post req to /leave");
        console.log(FormData);
        console.log(token);
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Token " + `${token}`,
          };

          const resLogin = await axios.post(`${subURL}/Leave/`, FormData, {
            headers: headers,
          });

          console.log("post req response -", resLogin.data);
        } catch (error) {
          console.log(error);
        }
      }
      storeData();

      Alert.alert("Saved Data", "Saved Data successfully", [
        {
          text: "OK",
          onPress: () => {
            myLeaveList();
          },
        },
      ]);

      setEnteredLeaveType("");
      setEnteredLeaveReason("");
      setFromText("");
      setToText("");
      setEnteredEmail("");
      setEnteredSelectedTouched(false);
      setEnteredLeaveTypeTouched(false);
      setEnteredLeaveReasonTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
      setEnteredEmailTouched(false);
      setForHomeworkList({
        backgroundColor: "#F4F6F6",
        color: "black",
        borderRadius: 5,
      });
      setForHomeworkForm({
        color: "white",
        backgroundColor: "#1E84A4",
        borderRadius: 5,
      });
    }
  }

  function leavereasonBlurHandler() {
    setEnteredLeaveReasonTouched(true);
    setIsLeavereasonFocused(false);
  }
  function eamilBlurHandler() {
    setEnteredEmailTouched(true);
    setIsEmailFocused(false);
  }

  function onEmailFocusHandler() {
    setIsEmailFocused(true);
    setEnteredEmailTouched(false);
    setEmailLabel(true);
  }

  function onLeavereasonFocusHandler() {
    setIsLeavereasonFocused(true);
    setEnteredLeaveReasonTouched(false);
    setReasonLabel(true);
  }

  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
    setIsFromDateFocused(false);
  }
  function onFocusFromHandler() {
    setIsFromDateFocused(true);
    setEnteredFromDateTouched(false);
    setstartDateLabel(true);
  }

  function toDateBlurHandler() {
    setEnteredtoDateTouched(true);
    setIsToDateFocused(false);
  }
  function onFocusToHandler() {
    setIsToDateFocused(true);
    setEnteredtoDateTouched(false);
    setendDateLabel(true);
  }

  function showHomeworkForm() {
    setEnteredLeaveType("");
    setEnteredLeaveReason("");
    setFromText("");
    setToText("");
    setForHomeworkList({
      backgroundColor: "#1E84A4",
      color: "white",
      borderRadius: 5,
    });
    setForHomeworkForm({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 5,
    });
    setShowForm(true);
    setShowList(false);
    //  setEnteredLeaveTypeTouched(false);
    setEnteredLeaveReasonTouched(false);
    setEnteredFromDateTouched(false);
    setEnteredtoDateTouched(false);
    setIsEdit(false);

    setTypeLabel(false);
    setReasonLabel(false);
  }
  function showHomework() {
    console.log("leaves");
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/LeaveReg/${StudentRegNo}`);
        console.log(res.data);
        setData(res.data);
        // setFilteredData(res.data);
        setForHomeworkForm({
          color: "white",
          backgroundColor: "#1E84A4",
          borderRadius: 5,
        });
        setForHomeworkList({
          backgroundColor: "#F4F6F6",
          color: "black",
          borderRadius: 5,
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
    ID = id;
    setShowInitialBtn(false);
    setReasonLabel(true);
    setEmailLabel(true);

    const filteredDummuyData = data.find((data) => data.id == ID);
    setFromText(moment(filteredDummuyData.startdate).format("DD/MM/YYYY"));
    setToText(moment(filteredDummuyData.enddate).format("DD/MM/YYYY"));
    setEnteredLeaveReason(filteredDummuyData.leave_reason);
    setEnteredEmail(filteredDummuyData.email);

    setForHomeworkForm({
      color: "white",
      backgroundColor: "#1E84A4",
      borderRadius: 5,
    });
    setForHomeworkList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 5,
    });

    setShowForm(true);
    setShowList(false);
    setIsEdit(true);
  }

  function deleteItem(id) {
    ID = id;
    Alert.alert("Confirm Deletion", "You are about to delete this row!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes,delete",
        onPress: () => deleteData(),
      },
    ]);
    async function deleteData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        // const dataForm = FormData;
        const resLogin = await axios.delete(
          `${subURL}/Leave/${ID}/`,
          // FormData,
          {
            headers: headers,
          }
        );
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
      } catch (error) {
        console.log(error);
      }
      async function fetchData() {
        try {
          const res = await axios.get(`${subURL}/LeaveReg/${StudentRegNo}/`);
          // console.log(res.data);
          setData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }

  function cancelHandler() {
    setShowInitialBtn(true);
    setShowList(true);
    setShowForm(false);
  }

  const searchFilter = (text) => {
    console.log("search function");
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.class_name
          ? item.class_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      setFilteredData(homeworkData);
      setSearchText(text);
    }
  };

  function linkPressedHandler() {
    setShowForm(true);
    setShowList(false);

    setForHomeworkList({
      color: "white",
      backgroundColor: "#1E84A4",
      borderRadius: 5,
    });
    setForHomeworkForm({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 5,
    });
  }

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
            <BgButton onPress={showHomeworkForm} style={forHomeworkList}>
              Add New
            </BgButton>

            <BgButton onPress={showHomework} style={forHomeworkForm}>
              Show List
            </BgButton>
          </View>
        </Animated.View>
      )}
      {showForm && (
        <>
          <ScrollView style={styles.root}>
            <View style={styles.inputForm}>
              <View
                style={[
                  { flex: 1 },
                  {
                    flexDirection: "column",
                    paddingVertical: 10,
                  },
                ]}
              >
                <View style={{ flex: 1, marginHorizontal: 16 }}>
                  <View
                    style={[
                      { flex: 1 },
                      {
                        flexDirection: "row",
                        marginRight: 6,
                      },
                    ]}
                  >
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Text style={[styles.labelStyle]}>User name</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={[
                          styles.labelStyle,
                          {
                            borderWidth: 1,
                            padding: 7,
                            borderColor: "#A3A5A5",
                          },
                        ]}
                        editable={false}
                        selectTextOnFocus={false}
                        value={user}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.space} />

                <View style={{ flex: 1 }}>
                  <View
                    style={[
                      { flex: 1 },
                      {
                        flexDirection: "row",
                        marginHorizontal: 8,
                        marginRight: 20,
                      },
                    ]}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        marginLeft: "3%",
                      }}
                    >
                      <Text style={styles.labelStyle}>User role</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={[
                          styles.labelStyle,
                          {
                            borderWidth: 1,
                            padding: 7,
                            borderColor: "#A3A5A5",
                          },
                        ]}
                        editable={false}
                        selectTextOnFocus={false}
                        value={userRole}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.space} />

                <View style={{ flex: 1 }}>
                  <View
                    style={[
                      { flex: 1 },
                      {
                        flexDirection: "row",
                        marginHorizontal: 8,
                        marginRight: 20,
                      },
                    ]}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        marginLeft: "3%",
                      }}
                    >
                      <Text style={styles.labelStyle}>Student reg no</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={[
                          styles.labelStyle,
                          {
                            borderWidth: 1,
                            padding: 7,
                            borderColor: "#A3A5A5",
                          },
                        ]}
                        editable={false}
                        selectTextOnFocus={false}
                        value={StudentRegNo.toString()}
                      />
                    </View>
                  </View>
                </View>
              </View>

              {!isEdit && (
                <>
                  <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: "HindRegular",
                          fontSize: 17,
                          marginLeft: "11%",
                          marginTop: "10%",
                        }}
                      >
                        Leave Type
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <SelectList
                        //setSelected={(val) => setSelected(val)}
                        setSelected={setSelected}
                        data={leaveTypeData}
                        save="value"
                        //placeholder="Select Leave Type"
                        boxStyles={[
                          selectInputIsInValid && styles.errorSelectedColor,
                          {},
                          // { marginHorizontal: 15, marginVertical: 10 },
                        ]}
                        dropdownTextStyles={{
                          fontSize: 15,
                          fontFamily: "HindRegular",
                          //marginHorizontal: 25,
                        }}
                        inputStyles={{
                          fontSize: 17,
                          fontFamily: "HindRegular",
                        }}
                      />
                      {selectInputIsInValid && (
                        <Text style={styles.commonErrorMsg}>
                          Select leave type
                        </Text>
                      )}
                    </View>
                  </View>
                </>
              )}

              <View style={[{ flexDirection: "row", marginVertical: 10 }]}>
                <View style={{ flex: 1 }}>
                  <View>
                    <Ionicons
                      style={{
                        position: "absolute",
                        top: 22,
                      }}
                      name="calendar"
                      size={24}
                      color="black"
                      onPress={() => showFromMode("date")}
                    />
                  </View>
                  <UnderlinedInput
                    value={fromText || frmdate}
                    placeholder="   Start date"
                    onSubmitEditing={Keyboard.dismiss}
                    style={
                      isFromDateFocused
                        ? styles.focusStyle
                        : fromDateInputIsInValid && styles.errorBorderColorDate
                    }
                    //   blur={fromDateBlurHandler}
                    //  onFocus={onFocusFromHandler}
                    onChangeText={frmDateHandler}
                    onPressIn={() => showFromMode("date")}
                  />
                  {fromDateInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>Select from date</Text>
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
                        top: 22,
                      }}
                      name="calendar"
                      size={24}
                      color="black"
                      onPress={() => showToMode("date")}
                    />
                  </View>
                  <UnderlinedInput
                    // value={moment(toText).format('DD/MM/YYYY') || moment(toDate).format('DD/MM/YYYY')}
                    value={toText || todate}
                    // value={
                    //   moment(toText).format("DD/MM/YYYY") ||
                    //   moment(todate).format("DD/MM/YYYY")
                    // }
                    placeholder="   End date"
                    onSubmitEditing={Keyboard.dismiss}
                    style={
                      isToDateFocused
                        ? styles.focusStyle
                        : toDateInputIsInValid && styles.errorBorderColorDate
                    }
                    // blur={toDateBlurHandler}
                    //  onFocus={onFocusToHandler}
                    onChangeText={toDateHandler}
                    onPressIn={() => showToMode("date")}
                  />
                  {toDateInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>Select to date</Text>
                  )}
                  {toShow && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={toDate}
                      mode={tomode}
                      is24Hour={true}
                      display="default"
                      onChange={toDateChangeHandler}
                      minimumDate={fromDate}
                    />
                  )}
                </View>
              </View>

              <View>
                <View
                  style={
                    !btn
                      ? reasonLabel
                        ? styles.upRemark
                        : styles.normalRemark
                      : reasonLabel
                      ? styles.upRemarkExtra
                      : styles.normalRemark
                  }
                >
                  <Text
                    style={[
                      btn
                        ? styles.submitLabel
                        : leavetypeInputIsInValid
                        ? styles.errorLabel
                        : styles.normalLabel,
                    ]}
                  >
                    Leave reason
                  </Text>
                </View>
                <Input
                  onChangeText={leaveReasonChangeHandler}
                  blur={leavereasonBlurHandler}
                  onFocus={onLeavereasonFocusHandler}
                  // placeholder="Leave reason"
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
              <View>
                <View
                  style={
                    !btn
                      ? emailLabel
                        ? styles.upEmail
                        : styles.normalEmail
                      : emailLabel
                      ? styles.upEmailExtra
                      : styles.normalEmail
                  }
                >
                  <Text
                    style={[
                      btn
                        ? styles.submitLabel
                        : // : EmailInputIsInValid
                          // styles.errorLabel
                          styles.normalLabel,
                    ]}
                  >
                    Email address
                  </Text>
                </View>
                <Input
                  //  onChangeText={emailChangeHandler}
                  onChangeText={handleChange}
                  blur={eamilBlurHandler}
                  onFocus={onEmailFocusHandler}
                  // placeholder="Leave reason"
                  value={email}
                  onSubmitEditing={Keyboard.dismiss}
                  style={
                    isEmailFocused
                      ? styles.focusStyle
                      : EmailInputIsInValid && styles.errorBorderColor
                  }
                />
              </View>
              {EmailInputIsInValid && (
                <Text style={styles.errorText}>Enter email address</Text>
              )}
              {error && <Text style={styles.errorText}>{error}</Text>}

              {!isEdit && (
                <View style={styles.btnSubmit}>
                  <Button onPress={buttonPressedHandler}>Add Leave</Button>
                </View>
              )}
              {isEdit && (
                <View style={[{ flex: 1, flexDirection: "row" }]}>
                  <View style={{ flex: 1, top: "3%", right: "14%" }}>
                    <Button onPress={cancelHandler}>Cancel</Button>
                  </View>
                  <View style={{ flex: 1, top: "3%", left: "11%" }}>
                    <Button onPress={updateHandler}>Update</Button>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 1 }}>
              <ParentsHome />
            </View>
          )}
        </>
      )}
      {showList && (
        <>
          <View style={{ backgroundColor: "white" }}>
            <SearchBar
              onSubmitEditing={Keyboard.dismiss}
              style={styles.searchBar}
              textInputStyle={{
                fontFamily: "HindRegular",
                fontSize: 18,
              }}
              placeholder="Search here"
              onChangeText={(text) => searchFilter(text)}
              value={searchText}
            />
          </View>
          <View
            style={[
              { flex: 1 },
              { flexDirection: "column", backgroundColor: "white" },
            ]}
          >
            <View style={{ flex: 8, bottom: 10 }}>
              <ScrollView
                scrollEventThrottle={25}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: false }
                )}
              >
                {data.length <= 0 ? (
                  <View style={{ alignItems: "center", marginTop: "5%" }}>
                    <Text style={styles.msgText}>
                      No Leaves are found,
                      <Text
                        style={styles.linkText}
                        onPress={linkPressedHandler}
                      >
                        Start adding here
                      </Text>
                    </Text>
                  </View>
                ) : (
                  <View style={styles.root}>
                    {loading ? (
                      <ActivityIndicator
                        size={40}
                        visible={loading}
                        textContent={"Loading..."}
                        textStyle={styles.spinnerTextStyle}
                      />
                    ) : (
                      data.map((data, key) => (
                        <>
                          <View>
                            <Card
                              style={{
                                marginVertical: 15,
                                marginHorizontal: 20,
                                elevation: 5,
                                borderRadius: 10,
                                paddingBottom: 20,
                              }}
                            >
                              <Card.Content>
                                <View
                                  style={[
                                    { flex: 1 },
                                    {
                                      flexDirection: "row",
                                    },
                                  ]}
                                >
                                  <View style={{ flex: 1 }}>
                                    <View
                                      style={[
                                        { flex: 1 },
                                        {
                                          flexDirection: "row",
                                        },
                                      ]}
                                    >
                                      <View style={{ flex: 0.3 }}>
                                        <Ionicons
                                          name="calendar"
                                          size={25}
                                          color="#D4AC0D"
                                          style={{}}
                                        />
                                      </View>
                                      <View
                                        style={{
                                          flex: 1,
                                          alignItems: "flex-start",
                                          left: "1%",
                                        }}
                                      >
                                        <Text style={styles.cardTextStyle}>
                                          Leave from
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ flex: 1 }}>
                                    <View
                                      style={[
                                        { flex: 1 },
                                        {
                                          flexDirection: "row",
                                        },
                                      ]}
                                    >
                                      <View style={{ flex: 0.3 }}>
                                        <Ionicons
                                          name="calendar"
                                          size={25}
                                          color="#D4AC0D"
                                          style={{}}
                                        />
                                      </View>
                                      <View
                                        style={{
                                          flex: 1,
                                          alignItems: "flex-start",
                                          left: "1%",
                                        }}
                                      >
                                        <Text style={styles.cardTextStyle}>
                                          Leave to
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>

                                <View
                                  style={[
                                    { flex: 1 },
                                    {
                                      flexDirection: "row",
                                    },
                                  ]}
                                >
                                  <View style={{ flex: 1 }}>
                                    <View
                                      style={[
                                        { flex: 1 },
                                        {
                                          flexDirection: "row",
                                        },
                                      ]}
                                    >
                                      <View style={{ flex: 0.3 }}></View>
                                      <View
                                        style={{
                                          flex: 1,
                                          alignItems: "flex-start",
                                          left: "1%",
                                        }}
                                      >
                                        <Text style={styles.textStyle}>
                                          {moment(data.leave_form).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ flex: 1 }}>
                                    <View
                                      style={[
                                        { flex: 1 },
                                        {
                                          flexDirection: "row",
                                        },
                                      ]}
                                    >
                                      <View style={{ flex: 0.3 }}></View>
                                      <View
                                        style={{
                                          flex: 1,
                                          alignItems: "flex-start",
                                          left: "1%",
                                        }}
                                      >
                                        <Text style={styles.textStyle}>
                                          {moment(data.leave_to).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>

                                <View
                                  style={[
                                    { flex: 1, top: "3%" },
                                    {
                                      flexDirection: "row",
                                    },
                                  ]}
                                >
                                  <View style={{ flex: 1 }}>
                                    <View
                                      style={[
                                        { flex: 1 },
                                        {
                                          flexDirection: "column",
                                        },
                                      ]}
                                    >
                                      <View style={{ flex: 1 }}>
                                        <View
                                          style={[
                                            { flex: 1 },
                                            {
                                              flexDirection: "row",
                                            },
                                          ]}
                                        >
                                          <View style={{ flex: 0.5 }}>
                                            <Text style={styles.cardTextStyle}>
                                              Leave reason:
                                            </Text>
                                          </View>
                                          <View style={{ flex: 1 }}>
                                            <Text style={styles.textStyle}>
                                              {data.leave_reason}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                      <View style={{ flex: 1 }}>
                                        <View
                                          style={[
                                            { flex: 1 },
                                            {
                                              flexDirection: "row",
                                            },
                                          ]}
                                        >
                                          <View style={{ flex: 0.4 }}>
                                            <Text style={styles.cardTextStyle}>
                                              Leave type:
                                            </Text>
                                          </View>
                                          <View style={{ flex: 1 }}>
                                            <Text style={styles.textStyle}>
                                              {data.leave_type}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>

                                    <View
                                      style={[
                                        { flex: 1, top: "4%" },
                                        {
                                          flexDirection: "row",
                                        },
                                      ]}
                                    >
                                      <View style={{ flex: 1 }}>
                                        <View
                                          style={[
                                            { flex: 1 },
                                            {
                                              flexDirection: "row",
                                            },
                                          ]}
                                        >
                                          <View style={{ flex: 0.7 }}>
                                            <Text style={styles.cardTextStyle}>
                                              Status:
                                            </Text>
                                          </View>
                                          <View style={{ flex: 1.5 }}>
                                            {data.leave_status == "Approved" ? (
                                              <Badge
                                                colorScheme="success"
                                                style={{ width: "65%" }}
                                              >
                                                {data.leave_status}
                                              </Badge>
                                            ) : data.leave_status ==
                                              "Pending" ? (
                                              <Badge
                                                colorScheme="warning"
                                                style={{ width: "65%" }}
                                              >
                                                {data.leave_status}
                                              </Badge>
                                            ) : (
                                              <Badge
                                                colorScheme="danger"
                                                style={{ width: "65%" }}
                                              >
                                                {data.leave_status}
                                              </Badge>
                                            )}
                                          </View>
                                        </View>
                                      </View>

                                      <View
                                        style={{
                                          flex: 1,
                                          left: "7%",
                                          bottom: "2%",
                                          alignItems: "flex-end",
                                        }}
                                      >
                                        <View
                                          style={[
                                            { flex: 4 },
                                            {
                                              flexDirection: "row",
                                            },
                                          ]}
                                        >
                                          <View style={{ flex: 0.3 }}>
                                            <IconButton
                                              colorScheme="green"
                                              onPress={() => editItem(data.id)}
                                              variant="subtle"
                                              _icon={{
                                                as: Ionicons,
                                                name: "md-pencil-sharp",
                                              }}
                                            />
                                          </View>
                                          <View style={styles.space} />
                                          <View style={{ flex: 0.3 }}>
                                            <IconButton
                                              colorScheme="red"
                                              onPress={() =>
                                                deleteItem(data.id)
                                              }
                                              variant="subtle"
                                              _icon={{
                                                as: Ionicons,
                                                name: "trash",
                                              }}
                                            />
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </Card.Content>
                            </Card>
                          </View>
                        </>
                      ))
                    )}
                  </View>
                )}
              </ScrollView>
            </View>
            {keyboardStatus == "Keyboard Hidden" && (
              <View style={{ flex: 1 }}>
                <ParentsHome />
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default LeaveScreen;

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "#FDFEFE",
  },
  btnSubmit1: {
    marginLeft: "50%",
    width: "50%",
  },
  cancel: {
    marginTop: -110,
    marginBottom: 50,
    marginLeft: -15,
    width: "50%",
  },

  root: {
    backgroundColor: "white",
    height: "100%",
    // marginTop: 10,
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
  errorSelectedColor: {
    borderColor: "red",
  },
  selectStyle: {
    marginRight: deviceWidth < 370 ? "2%" : "5%",
    marginLeft: deviceWidth < 370 ? "2%" : "4%",
  },
  selectStyleSub: {
    marginRight: deviceWidth < 370 ? "2%" : "5%",
    marginLeft: deviceWidth < 370 ? "2%" : "4%",
    marginTop: 20,
  },

  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  leaveSpace: {
    width: 40, // or whatever size you need
    height: 10,
  },
  btnSubmit: {
    width: "50%",
    // marginTop: deviceWidth < 370 ? "3%" : "1%",
    bottom: "4%",
    marginLeft: deviceWidth < 370 ? "35%" : "55%",
  },
  imagePreView: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "lightblue",
  },

  imageError: {
    color: "red",
    position: "absolute",
    left: deviceWidth < 370 ? "120%" : "130%",
    top: "50%",
    fontSize: deviceWidth < 370 ? 14 : 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  normalEmail: {
    position: "absolute",
    top: deviceWidth < 370 ? 20 : 25,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upEmail: {
    top: deviceHieght > 800 ? 25 : 28,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 130 : 130,
  },
  upEmailExtra: {
    top: deviceHieght > 800 ? 25 : 28,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 110 : 115,
  },
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
    // left: 35,
  },
  searchBar: {
    marginTop: 20,
    marginBottom: 20,

    backgroundColor: "#F0F3F4",
  },
  dropText: {
    fontSize: deviceWidth < 370 ? 16 : 18,
    fontFamily: "HindRegular",
  },
  errorText: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: 16,
  },
  uploadImgBtn: {
    marginTop: 13,
    width: deviceWidth < 370 ? "50%" : "40%",
    padding: 10,
    fontFamily: "HindRegular",
    fontSize: 18,
    flexDirection: "row",
  },
  previewText: {
    position: "absolute",
    left: deviceWidth < 370 ? "120%" : "130%",
    top: "50%",
    fontSize: deviceWidth < 370 ? 14 : 16,
  },
  focusStyle: {
    borderColor: "blue",
  },
  textInfo: {
    fontSize: deviceWidth < 370 ? 14 : 16,
    fontFamily: "HindSemiBold",
    color: "grey",
  },
  normal: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
  },
  up: {
    top: deviceWidth < 370 ? 15 : 26,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 70 : 70,
  },
  normalRemark: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upRemark: {
    top: deviceHieght > 800 ? 26 : 25,
    width: deviceWidth > 400 ? 130 : 120,
    left: deviceWidth < 370 ? 20 : 30,
    height: deviceHieght > 800 ? 25 : 25,
  },
  labelStyle: {
    fontFamily: "HindRegular",
    fontSize: 17,
  },
  normalHomework: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upHomework: {
    top: deviceWidth < 370 ? 15 : 24,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 100 : 95,
  },
  errorLabel: {
    color: "red",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
  },
  normalLabel: {
    color: "grey",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 16,
    letterSpacing: 0.5,
  },
  submitLabel: {
    color: "grey",
    color: "#AEB6BF",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
  },

  iconStyle: {
    position: "absolute",
    top: 23,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  textStyle: {
    fontSize: deviceWidth < 370 ? 14 : 16,
    fontFamily: "HindSemiBold",
    color: "grey",
  },
  commonErrorMsg: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 16 : 16,
    top: deviceHieght > 800 ? -3 : 1,
  },
  upRemarkExtra: {
    position: "absolute",
    left: deviceWidth < 370 ? 20 : 30,
    top: 5,
  },
  linkText: {
    fontFamily: "HindSemiBold",
    color: "#02BFC4",
    fontSize: 18,
    textDecorationLine: "underline",
    textDecorationColor: "#02BFC4",
    cursor: "pointer",
  },
  msgText: {
    fontSize: 18,
    fontFamily: "HindSemiBold",
    color: "#6B0000",
  },
});

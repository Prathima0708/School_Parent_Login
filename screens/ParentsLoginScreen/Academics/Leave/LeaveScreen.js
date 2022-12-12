import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Button as Btn,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Badge } from "native-base";
import { Card, DataTable } from "react-native-paper";
import Button from "../../../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import BgButton from "../../../../components/UI/BgButton";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import ParentsHome from "../../BottomTab/ParentsHome";
import Input from "../../../../components/UI/Input";
import moment from "moment";
import {
  StudentName,
  StudentRegNo,
} from "../../../../components/StudentItem/StudentItem";
import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
export var statusData = [];
var USERNAME, GROUP, TOKEN, FROMDATE, TODATE;
const LeaveScreen = () => {
  const [isApproved, setIsApproved] = useState(false);
  let i = 0;
  // const [statusData,setStatusData]=useState([]);
  const [label, setLabel] = useState(false);
  const [descriptionLabel, setDescriptionLabel] = useState(false);
  const [leaveReasonLabel, setLeaveReasonLabel] = useState(false);

  const [isDescFocused, setIsDescFocused] = useState(false);
  const [isLeaveReasonFocused, setIsLeaveReasonFocused] = useState(false);

  const [regno, setEnteredRegno] = useState("");
  const [enteredRegNoTouched, setEnteredRegNoTouched] = useState(false);
  const enteredRegNoIsValid = regno.trim() !== "";
  const regnoInputIsInValid = !enteredRegNoIsValid && enteredRegNoTouched;

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

  const [forLeaveList, setForLeaveList] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 10,
  });
  const [forLeaveForm, setForLeaveForm] = useState({
    color: "white",
    backgroundColor: "#0C60F4",
    borderRadius: 10,
  });
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  // const [data, setData] = useState();
  const [fromShow, setFromShow] = useState(false);
  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText.trim() !== "";
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;

  const [toShow, setToShow] = useState(false);
  const [tomode, setToMode] = useState("date");

  const [toText, setToText] = useState("");
  const [enteredtoDateTouched, setEnteredtoDateTouched] = useState(false);
  const enteredtoDateIsValid = toText.trim() !== "";
  const toDateInputIsInValid = !enteredtoDateIsValid && enteredtoDateTouched;

  const [btn, setBtn] = useState(false);

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [user, setUser] = useState("");
  const [group, setGroup] = useState("");
  const [token, setToken] = useState("");
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

  async function fetchUser() {
    USERNAME = await AsyncStorage.getItem("UserName");

    if (USERNAME !== null) {
      setUser(USERNAME);
    }
  }
  fetchUser();

  async function fetchGroup() {
    GROUP = await AsyncStorage.getItem("datagroup");

    if (GROUP !== null) {
      setGroup(GROUP);
    }
  }
  fetchGroup();

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
  };

  const showToMode = (currentToMode) => {
    setToShow(true);

    setToMode(currentToMode);
  };

  function frmDateHandler(enteredValue) {
    setFromDate(enteredValue);
  }
  function toDateHandler(enteredValue) {
    setToDate(enteredValue);
  }

  const toDateChangeHandler = (event, selectedToDate) => {
    const currentToDate = selectedToDate || toDate;
    TODATE = selectedToDate;
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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/LeaveReg/${StudentRegNo}`
        );

        setData(res.data);
        console.log(res.data);
        for (i = 0; i < res.data.length; i++) {
          statusData[i] = res.data[i].leave_status;
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    statusData.forEach((element) => {
      element == "Denied";
      setIsApproved(false);
    });
  }, [statusData]);

  const fromDateChangeHandler = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate || fromDate;
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

  function regnoChangeHandler(enteredValue) {
    setEnteredRegno(enteredValue);
  }
  function leaveTypeChangeHandler(enteredValue) {
    setEnteredLeaveType(enteredValue);
  }
  function leaveFromChangeHandler(enteredValue) {
    setFromText(enteredValue);
  }
  function leaveToChangeHandler(enteredValue) {
    setToText(enteredValue);
  }
  function leaveReasonChangeHandler(enteredValue) {
    setEnteredLeaveReason(enteredValue);
  }

  function LeaveList() {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/LeaveReg/${StudentRegNo}`
        );
        //console.log(res.data);

        setData(res.data);

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

        setLeaveReasonLabel(false);
        setDescriptionLabel(false);
        setEnteredLeaveTypeTouched(false);
        setEnteredLeaveReasonTouched(false);
        setEnteredFromDateTouched(false);
        setEnteredtoDateTouched(false);
        setShowForm(false);
        setShowList(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  function addLeave() {
    console.log("Group is :", GROUP);
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
    setShowForm(true);
    setShowList(false);
  }

  function updateHandler() {
    const FormData = {
      student_reg_number: regno,
      leave_type: leaveType,
      leave_form: fromDate,
      leave_to: toDate,
      leave_reason: leaveReason,
    };
    console.log(FormData);

    var dateFromValidate = fromText;
    var isValid = moment(dateFromValidate, "D/M/YYYY", true).isValid();
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format ",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    var dateToValidate = toText;
    var isValid = moment(dateToValidate, "D/M/YYYY", true).isValid();
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
    setEnteredRegNoTouched(true);
    setEnteredLeaveTypeTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredLeaveReasonTouched(true);

    if (!enteredRegNoIsValid) {
      return;
    }
    if (!enteredLeaveTypeIsValid) {
      return;
    }
    if (!enteredFromDateIsValid) {
      return;
    }
    if (!enteredtoDateIsValid) {
      return;
    }
    if (!enteredLeaveReasonIsValid) {
      return;
    } else {
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const dataForm = FormData;
          const resLogin = await axios.put(
            `http://10.0.2.2:8000/school/Leave/`,
            dataForm,
            {
              headers: headers,
            }
          );
          const token = resLogin.data.token;
          const userId = resLogin.data.user_id;
          console.log(token);
          // Token = token;
          // UserId = userId;
        } catch (error) {
          console.log(error);
        }
      }
      storeData();
      setEnteredRegno("");
      setEnteredLeaveType("");
      setEnteredLeaveReason("");
      setFromText("");
      setToText("");
      setEnteredRegNoTouched(false);
      setEnteredLeaveTypeTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
      setEnteredLeaveReasonTouched(false);
    }
  }
  function buttonPressedHandler() {
    const FormData = {
      student_reg_number: regno || StudentRegNo,
      user_num: 0,
      user_role: group,
      username: user,
      email: "priya123@gmail.com",
      leave_type: leaveType,
      leave_form: FROMDATE,
      leave_to: TODATE,
      leave_reason: leaveReason,
      leave_status: "Pending",
    };

    const formIsValid = enteredLeaveTypeIsValid && enteredLeaveReasonIsValid;

    if (formIsValid) {
      Alert.alert("Saved Data", "Saved Data successfully", [
        {
          text: "OK",
          onPress: () => {
            setShowForm(false);
            //  setShowList(true);
            LeaveList();
          },
        },
      ]);
    }

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
      console.log("formdata", FormData);
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Token " + `${token}`,
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
        console.log("post re-", resLogin.data);
      } catch (error) {
        console.log(error);
      }
    }
    storeData();
    setEnteredRegno("");
    setEnteredLeaveType("");
    setEnteredLeaveReason("");
    setFromText("");
    setToText("");
    setEnteredRegNoTouched(false);
    setEnteredLeaveTypeTouched(false);
    setEnteredFromDateTouched(false);
    setEnteredtoDateTouched(false);
    setEnteredLeaveReasonTouched(false);
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
  function stdregnoBlurHandler() {
    setEnteredRegNoTouched(true);
  }
  function leavetypeBlurHandler() {
    setEnteredLeaveTypeTouched(true);
    setIsDescFocused(false);
  }

  function onFocusLeaveTypeHandler() {
    setIsDescFocused(true);
    setEnteredLeaveTypeTouched(false);
    setDescriptionLabel(true);
  }

  function onFocusLeaveReasonHandler() {
    setIsLeaveReasonFocused(true);
    setEnteredLeaveReasonTouched(false);
    setLeaveReasonLabel(true);
  }

  function leavereasonBlurHandler() {
    setEnteredLeaveReasonTouched(true);
    setIsLeaveReasonFocused(false);
  }
  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
  }
  function toDateBlurHandler() {
    setEnteredtoDateTouched(true);
  }

  function editItem(id) {
    const filteredDummuyData = data.find((data) => data.id == id);
    // console.log(filteredDummuyData);
    setEnteredLeaveType(filteredDummuyData.leave_type);
    setEnteredLeaveReason(filteredDummuyData.leave_type);
    setFromText(filteredDummuyData.leave_form);
    setToText(filteredDummuyData.leave_to);
    setForLeaveList({ fontWeight: "bold", color: "black" });
    setForLeaveForm({ color: "black" });
    setShowForm(true);
    setShowList(false);
    setIsEdit(true);
  }

  function deleteItem(id) {
    // console.log(id);
    // const newFilteredData=data.filter((data)=>data.id != id);

    async function storeData() {
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
    }
    storeData();
  }
  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton onPress={addLeave} style={forLeaveForm}>
          Apply Leave
        </BgButton>
        <BgButton onPress={LeaveList} style={forLeaveList}>
          Leave List
        </BgButton>
      </View>
      {showList && (
        <View
          style={[
            { flex: 1 },
            { flexDirection: "column", backgroundColor: "white" },
          ]}
        >
          <View style={{ flex: 8, bottom: 10 }}>
            <ScrollView>
              <View style={styles.root}>
                <FlatList
                  data={data}
                  style={{ width: "95%" }}
                  renderItem={({ item }) => {
                    return (
                      <Card style={styles.cardStyle}>
                        <Card.Content style={styles.cardContentStyle}>
                          <View
                            style={[
                              { flex: 1 },
                              { flexDirection: "row" },
                              styles.subDesign,
                            ]}
                          >
                            <View style={{ flex: 5 }}>
                              <Text style={styles.labelStyle}>Leave from</Text>
                            </View>
                            <View style={{ flex: 5 }}>
                              <Text style={styles.textStyle}>Leave to</Text>
                            </View>
                          </View>
                          <View
                            style={[
                              { flex: 1 },
                              { flexDirection: "row", marginVertical: 10 },
                            ]}
                          >
                            <View style={{ flex: 1, alignItems: "center" }}>
                              <Text
                                style={[styles.textStyle, { color: "black" }]}
                              >
                                {moment(item.leave_form).format("DD/MM/YYYY")}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 0.2,
                                alignItems: "center",
                                top: "1%",
                              }}
                            >
                              <Text
                                style={[
                                  {
                                    fontFamily: "HindRegular",
                                    color: "black",
                                    fontSize: 15,
                                    fontWeight: "bold",
                                  },
                                ]}
                              >
                                to
                              </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center" }}>
                              <Text
                                style={[styles.textStyle, { color: "black" }]}
                              >
                                {moment(item.leave_to).format("DD/MM/YYYY")}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[
                              { flex: 1 },
                              { flexDirection: "row", marginHorizontal: 10 },
                            ]}
                          >
                            <View style={{ flex: 2, left: "70%" }}>
                              <Text
                                style={[styles.textStyle, { color: "black" }]}
                              >
                                Leave type :
                              </Text>
                            </View>
                            <View style={{ flex: 2.6 }}>
                              <Text style={[styles.cardText]}>
                                {item.leave_type}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[
                              { flex: 1 },
                              { flexDirection: "row", marginVertical: 10 },
                            ]}
                          >
                            <View style={{ flex: 3.5 }}>
                              <Text
                                style={[styles.textStyle, { color: "black" }]}
                              >
                                Leave reason :
                              </Text>
                            </View>
                            <View style={{ flex: 2.5, left: -40 }}>
                              <Text style={[styles.cardText]}>
                                {item.leave_reason}
                              </Text>
                            </View>
                          </View>
                          <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
                            <View style={{ flex: 3 }}>
                              {/* <Text>Remark</Text> */}
                            </View>
                            <View style={{ flex: 1, right: "100%" }}>
                              <Badge colorScheme="success" variant="solid">
                                Approved
                              </Badge>
                            </View>
                          </View>
                        </Card.Content>
                      </Card>
                    );
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      )}
      {/* {showList && data && 
        data.map((data)=>(
          <>
            
          </>
        ))
      } */}
      {showForm && (
         <View
         style={[
           { flex: 1 },
           { flexDirection: "column", backgroundColor: "white" },
         ]}
       >
         <View style={{ flex: 8, bottom: 15 }}>
         <ScrollView style={styles.root}>
          <View style={[{flex:1}, {
              flexDirection: "column",paddingVertical:25,marginRight:'15%'
            }]}>
              <View style={{ flex: 1,marginHorizontal:20 }} >

                <View style={[{flex:1}, {
                    flexDirection: "row",marginRight:50
                  }]}>
                    <View style={{ flex: 1,alignItems:'center' }} >
                      <Text style={styles.newLabel}>user name</Text>
                    </View>
                    <View style={{ flex: 1 }} >
                      <TextInput 
                        style={[styles.newLabel,{borderWidth:1,paddingLeft:7}]}
                        editable={false} 
                        selectTextOnFocus={false} 
                        value={user}/>
                    </View>
                </View>
              </View>
              <View style={styles.space}/>
              <View style={{ flex: 1}} >
              <View style={[{flex:1}, {
                  flexDirection: "row",marginHorizontal:20,marginRight:70
                }]}>
                  <View style={{ flex: 1,alignItems:'center'}} >
                    <Text style={styles.newLabel}>user role</Text>
                  </View>
                  <View style={{ flex: 1}} >
                    <TextInput 
                      style={[styles.newLabel,{borderWidth:1,paddingLeft:7}]}
                      editable={false} 
                      selectTextOnFocus={false} 
                      value={group}/>
                  </View>
                </View>
              </View>
            </View>
          <View style={styles.inputForm}>
            <View style={!label ? styles.test : styles.testSuccess}>
              <Text
                style={[
                  btn
                    ? styles.submitLabel
                    : regnoInputIsInValid
                    ? styles.errorLabel
                    : styles.normalLabel,
                ]}
              >
                StudentRegNo
              </Text>
            </View>
            <Input
              keyboardType="number-pad"
              // placeholder="Student reg no"
              onChangeText={regnoChangeHandler}
              blur={stdregnoBlurHandler}
              value={StudentRegNo.toString() || regno}
              onSubmitEditing={Keyboard.dismiss}
              style={regnoInputIsInValid && styles.errorBorderColor}
              editable={false}
            />
            {/* {regnoInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter student registration number
              </Text>
            )} */}

            <View
              style={[
                !regnoInputIsInValid
                  ? descriptionLabel
                    ? styles.descriptionUp
                    : styles.descriptionDown
                  : descriptionLabel
                  ? styles.descriptionUpExtra
                  : styles.descriptionDownExtra,
              ]}
            >
              <Text
                style={[
                  btn
                    ? styles.normalLabel
                    : leavetypeInputIsInValid
                    ? styles.errorLabel
                    : styles.normalLabel,
                ]}
              >
                Leave Type
              </Text>
            </View>
            <Input
              // placeholder="Leave Type"
              onChangeText={leaveTypeChangeHandler}
              blur={leavetypeBlurHandler}
              onFocus={onFocusLeaveTypeHandler}
              value={leaveType}
              onSubmitEditing={Keyboard.dismiss}
              style={
                isDescFocused
                  ? styles.focusStyle
                  : leavetypeInputIsInValid && styles.errorBorderColor
              }
            />
            {leavetypeInputIsInValid && (
              <Text style={styles.errStyle}>Enter leave type</Text>
            )}
            <View
              style={[
                !leavetypeInputIsInValid
                  ? leaveReasonLabel
                    ? styles.leaveReasonUp
                    : styles.leaveReasonDown
                  : leaveReasonLabel
                  ? styles.leaveReasonUpExtra
                  : styles.leaveReasonDownExtra,
              ]}
            >
              <Text
                style={[
                  btn
                    ? styles.normalLabel
                    : leavereasonInputIsInValid
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
              onFocus={onFocusLeaveReasonHandler}
              value={leaveReason}
              // placeholder="Leave reason"
              onSubmitEditing={Keyboard.dismiss}
              style={
                isLeaveReasonFocused
                  ? styles.focusStyle
                  : leavereasonInputIsInValid && styles.errorBorderColor
              }
            />
            {leavereasonInputIsInValid && (
              <Text style={styles.errStyle}>Enter leave reason</Text>
            )}
            <View style={[{ flexDirection: "row" }]}>
              <View style={{ flex: 1 }}>
                <View>
                  <Ionicons
                    style={{
                      top: 23,
                      position: "absolute",
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showFromMode("date")}
                  />
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
                <UnderlinedInput
                  value={fromText || fromDate}
                  onSubmitEditing={Keyboard.dismiss}
                  placeholder="Leave from"
                  style={fromDateInputIsInValid && styles.errorBorderColor}
                  blur={fromDateBlurHandler}
                  onChangeText={leaveFromChangeHandler}
                  onPressIn={() => showFromMode("date")}
                />
                {fromDateInputIsInValid && (
                  <Text style={styles.errStyle}>Enter leave from</Text>
                )}
              </View>
              <View style={styles.space} />
              <View style={{ flex: 1 }}>
                <View>
                  <Ionicons
                    style={{
                      top: 23,
                      position: "absolute",
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showToMode("date")}
                  />
                </View>
                <UnderlinedInput
                  value={toText || toDate}
                  onSubmitEditing={Keyboard.dismiss}
                  placeholder="Leave to"
                  style={toDateInputIsInValid && styles.errorBorderColor}
                  blur={toDateBlurHandler}
                  onChangeText={leaveToChangeHandler}
                  onPressIn={() => showToMode("date")}
                />
                {toDateInputIsInValid && (
                  <Text style={styles.errStyle}>Enter leave to</Text>
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



            {!isEdit && (
              <View style={styles.btnSubmit}>
                <Button onPress={buttonPressedHandler}>Add Leave</Button>
              </View>
            )}
            {isEdit && (
              <View style={styles.btnSubmit}>
                <Button onPress={updateHandler}>Update</Button>
              </View>
            )}
          </View>
        </ScrollView>
         </View>

        </View>
        
      )}
      {keyboardStatus == "Keyboard Hidden" && <ParentsHome />}
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

    backgroundColor: "white",
  },
  root: {
    flex: 1,
    flexDirection: "column",
  },
  errStyle: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: 18,
  },
  container: {
    padding: 10,
  },
  type: {
    flexWrap: "wrap",
  },
  th: {
    padding: 3,
    marginRight: 13,
    fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 45,
    fontWeight: "bold",
  },
  tableTitle: {
    margin: 7,
    fontFamily: "HindRegular",
    fontSize: 16,
  },
  tableCell: {
    width: 20,

    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  root: {
    backgroundColor: "white",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  // inputStyle: {
  //   color: "black",
  //   borderBottomWidth: 1,
  //   borderWidthColor: "black",
  //   // backgroundColor: "white",
  //   padding: 10,
  //   // paddingHorizontal: 15,
  //   paddingVertical: 5,
  //   borderRadius: 5,
  //   fontSize: 18,
  //   margin: 10,
  // },
  // labels: {
  //   margin: 5,
  //   fontFamily: "Ubuntu",
  //   fontSize: 18,
  //   // marginTop: 17,
  // },
  errorBorderColor: {
    borderColor: "red",
  },
  btnSubmit: {
   // top: deviceHieght < 600 ? -25 : "7%",
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
    fontFamily: "HindSemiBold",
    fontSize: 18,
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
  //new one
  mainContainer: {
    flex: 1,
    marginHorizontal: 25,
    top: "5%",
    borderRadius: 10,
  },
  status: {
    left: "15%",
    fontSize: deviceWidth < 370 ? 16 : 18,
    fontWeight: "bold",
    top: -15,
    borderRadius: 5,

    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 5,
  },
  dateStyle: {
    fontWeight: "bold",
    fontSize: deviceWidth < 370 ? 16 : 17,
    color: "grey",
    top: "5%",
    left: -13,
  },
  // cardStyle: {
  //   padding: 5,
  //   margin: 10,
  //   backgroundColor: "#E5E8E8",
  //   elevation: 5,
  //   shadowColor: "black",
  //   backgroundColor: "#E5E8E8",
  //   shadowOpacity: 0.75,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 8,
  //   marginRight: "7%",
  //   marginLeft: "7%",
  //   marginTop: "10%",
  //   borderRadius: 5,
  // },
  // new design
  cardStyle: {
    marginVertical: 25,
    marginHorizontal: 20,
    elevation: 5,
    borderRadius: 10,
    left: "2%",
    // paddingBottom: 20,
  },
  cardContentStyle: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  subDesign: {
    backgroundColor: "darkblue",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
  },
  labelStyle: {
    color: "black",
    fontFamily: "HindBold",
    fontSize: 20,
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    fontFamily: "HindBold",
    fontSize: 20,
    textAlign: "center",
  },
  cardText: {
    color: "black",
    fontSize: 17,
    left: "10%",
    top: "10%",
  },
  cardTextStyle: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
  },
  badgeStyle: {
    right: "160%",
  },
  colorBlack: {
    color: "black",
  },
  test: {
    position: "absolute",
    top: deviceWidth < 370 ? 2 : 10,
    left: deviceWidth < 370 ? 40 : 50,
  },
  testSuccess: {
    position: "absolute",
    top: deviceWidth < 370 ? 28 : 32,
    left: 50,
  },
  normalLabel: {
    // color: "#A7ADAD",
    color: "#AEB6BF",
    // backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    // bottom: 0,
    fontSize: deviceWidth < 370 ? 13 : 16,
    letterSpacing: 0.5,
  },
  normalLeaveReasonLabel: {
    // color: "#A7ADAD",
    color: "#AEB6BF",
    // backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    // bottom: 0,
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
  errorLabel: {
    color: "red",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
  },
  descriptionUp: {
    position: "absolute",
    top: deviceWidth < 370 ? 68 : 87,
    left: deviceWidth < 370 ? 40 : 50,
  },
  descriptionDown: {
    position: "absolute",
    top: deviceWidth < 370 ? 93 : 107,
    left: 50,
  },
  descriptionUpExtra: {
    position: "absolute",
    top: deviceWidth < 370 ? 90 : 80,
    left: deviceWidth < 370 ? 40 : 50,
  },
  descriptionDownExtra: {
    position: "absolute",
    top: deviceWidth < 370 ? 115 : 97,
    left: 50,
  },

  leaveReasonUp: {
    position: "absolute",
    top: deviceWidth < 370 ? 68 : 160,
    left: deviceWidth < 370 ? 40 : 50,
  },
  leaveReasonDown: {
    position: "absolute",
    top: deviceWidth < 370 ? 93 : 185,
    left: 50,
  },
  leaveReasonUpExtra: {
    position: "absolute",
    top: deviceWidth < 370 ? 90 : 185,
    left: deviceWidth < 370 ? 40 : 50,
  },
  leaveReasonDownExtra: {
    position: "absolute",
    top: deviceWidth < 370 ? 115 : 210,
    left: 50,
  },
  focusStyle: {
    borderColor: "blue",
  },
  username: {
    fontFamily: "HindRegular",
    fontSize: 18,
  },
  newLabel:{
    fontFamily:'HindRegular',
    fontSize:18,
  },
});

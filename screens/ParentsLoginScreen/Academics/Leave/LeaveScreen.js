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
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import SelectList from "react-native-dropdown-select-list";
import { Badge, IconButton } from "native-base";
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
export var statusData = [],
  EDT_ID;
var FROMDATE, TODATE;
var USERNAME, GROUP, TOKEN, FROMDATE, TODATE;
const LeaveScreen = () => {
  const [isApproved, setIsApproved] = useState(false);
  let i = 0;
  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, 100);
  const headermax = 100;
  const headermin = 10;
  const [loading, setLoading] = useState(false);
  // const [statusData,setStatusData]=useState([]);
  const [label, setLabel] = useState(false);
  const [descriptionLabel, setDescriptionLabel] = useState(false);
  const [leaveReasonLabel, setLeaveReasonLabel] = useState(false);

  const [isDescFocused, setIsDescFocused] = useState(false);
  const [isLeaveReasonFocused, setIsLeaveReasonFocused] = useState(false);

  const [selected, setSelected] = useState("");
  const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
  const enteredSelcetdIsValid = selected.trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

  const leaveTypeData = [
    { key: "Sick Leave", value: "Sick Leave" },
    { key: "National Holiday", value: "National Holiday" },
    { key: "Religious Holiday", value: "Religious Holiday" },
    { key: "Casual Leave", value: "Casual Leave" },
  ];

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [emailLabel, setEmailLabel] = useState(false);
  const [email, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const enteredEmailIsValid = email.includes("@");
  const EmailInputIsInValid = !enteredEmailIsValid && enteredEmailTouched;

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
  const [showInitialBtn, setShowInitialBtn] = useState(true);

  const [forLeaveList, setForLeaveList] = useState({
    backgroundColor: "#0C60F4",
    color: "white",
    borderRadius: 10,
  });
  const [forLeaveForm, setForLeaveForm] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
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
  function emailChangeHandler(enteredValue) {
    setEnteredEmail(enteredValue);
  }
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
          backgroundColor: "#F4F6F6",
          color: "black",
          borderRadius: 10,
        });
        setForLeaveForm({
          color: "white",
          backgroundColor: "#1E8449",
          borderRadius: 10,
        });

        setLeaveReasonLabel(false);
        setDescriptionLabel(false);
        setEnteredSelectedTouched(false);
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
      backgroundColor: "#0C60F4",
      color: "white",
      borderRadius: 10,
    });
    setForLeaveList({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
    });
    setShowForm(true);
    setShowList(false);
  }

  function updateHandler() {
    setShowInitialBtn(true);
    const FormData = {
      student_reg_number: regno || StudentRegNo,
      leave_type: leaveType,
      leave_form: FROMDATE,
      leave_to: TODATE,
      leave_reason: leaveReason,
      email: email,
    };
    console.log(FormData);

    if (!enteredEmailIsValid) {
      return;
    }
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
            Authorization: "Token " + `${token}`,
          };
          const dataForm = FormData;
          const resLogin = await axios.patch(
            `http://10.0.2.2:8000/school/Leave/${EDT_ID}/`,
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

      Alert.alert("Saved Data", "Saved Data successfully", [
        {
          text: "OK",
          onPress: () => {
            LeaveList();
          },
        },
      ]);
      setEnteredRegno("");
      setEnteredLeaveType("");
      setEnteredLeaveReason("");
      setEnteredEmail("");
      setFromText("");
      setToText("");
      setEnteredRegNoTouched(false);
      setEnteredLeaveTypeTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
      setEnteredEmailTouched(false);
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
      setShowList(true);
      setShowForm(false);
    }
  }
  function buttonPressedHandler() {
    setBtn(true);
    const FormData = {
      student_reg_number: regno || StudentRegNo,
      user_num: 0,
      user_role: group,
      username: user,
      email: "priya123@gmail.com",
      leave_type: selected,
      leave_form: FROMDATE,
      leave_to: TODATE,
      leave_reason: leaveReason,
      leave_status: "Pending",
    };

    const formIsValid = enteredLeaveReasonIsValid;

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

    //setEnteredLeaveTypeTouched(true);
    setEnteredLeaveReasonTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredSelectedTouched(true);
    setEnteredEmailTouched(true);
    // if (!enteredLeaveTypeIsValid) {
    //   return;
    // }
    if (
      !enteredSelcetdIsValid ||
      !enteredLeaveReasonIsValid ||
      !enteredFromDateIsValid ||
      !enteredtoDateIsValid ||
      !selected
    ) {
      return;
    } else {
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
      setEnteredEmail("");
      setFromText("");
      setToText("");
      setEnteredRegNoTouched(false);
      setEnteredSelectedTouched(false);
      //setEnteredLeaveTypeTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
      setEnteredLeaveReasonTouched(false);
      setEnteredEmailTouched(false);
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
    //}
  }
  function stdregnoBlurHandler() {
    setEnteredRegNoTouched(true);
  }
  // function leavetypeBlurHandler() {
  //   setEnteredLeaveTypeTouched(true);
  //   setIsDescFocused(false);
  // }

  // function onFocusLeaveTypeHandler() {
  //   setIsDescFocused(true);
  //   setEnteredLeaveTypeTouched(false);
  //   setDescriptionLabel(true);
  // }

  function eamilBlurHandler() {
    setEnteredEmailTouched(true);
    setIsEmailFocused(false);
  }

  function onEmailFocusHandler() {
    setIsEmailFocused(true);
    setEnteredEmailTouched(false);
    setEmailLabel(true);
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
    console.log(id);
    setShowForm(true);
    setShowList(false);
    setEmailLabel(true);
    setLeaveReasonLabel(true);
    setIsEdit(true);

    EDT_ID = id;

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
    const filteredDummuyData = data.find((data) => data.id == id);
    setEnteredLeaveType(filteredDummuyData.leave_type);
    setEnteredLeaveReason(filteredDummuyData.leave_reason);
    setFromText(moment(filteredDummuyData.leave_form).format("DD/MM/YYYY"));
    setEnteredEmail(filteredDummuyData.email);
    setToText(moment(filteredDummuyData.leave_to).format("DD/MM/YYYY"));
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
  function cancelHandler() {
    setShowInitialBtn(true);
    setShowForm(false);
    setShowList(true);
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
        <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
          <View style={{ flex: 2, backgroundColor: "white" }}>
            {data.length <= 0 ? (
              <View style={{ alignItems: "center", top: "2%" }}>
                <NativeText fontSize="xl" bold color="error.900">
                  No Data Found
                </NativeText>
              </View>
            ) : (
              <ScrollView
                scrollEventThrottle={15}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: false }
                )}
              >
                <View style={styles.root}>
                  {/* {!filteredData && <Spinner size="lg" />} */}

                  {loading ? (
                    <ActivityIndicator
                      size={40}
                      visible={loading}
                      textContent={"Loading..."}
                      textStyle={styles.spinnerTextStyle}
                    />
                  ) : (
                    data.map((data) => (
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
                                        <View style={{ flex: 0.5 }}>
                                          <Text style={styles.cardTextStyle}>
                                            Status:
                                          </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                          {data.leave_status == "approved" ? (
                                            <Badge
                                              colorScheme="success"
                                              style={{ width: "65%" }}
                                            >
                                              {data.leave_status}
                                            </Badge>
                                          ) : data.leave_status == "Pending" ? (
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
                                      }}
                                    >
                                      <View
                                        style={[
                                          { flex: 1 },
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
                                            onPress={() => deleteItem(data.id)}
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
              </ScrollView>
            )}
          </View>
          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 0.2, backgroundColor: "white" }}>
              <ParentsHome />
            </View>
          )}
        </View>
      )}
      {showForm && (
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
                styles.inputForm,
                keyboardStatus == "Keyboard Shown" && {},
              ]}
            >
              <ScrollView>
                {keyboardStatus == "Keyboard Hidden" && (
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
                            value={group}
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
                          <Text style={styles.labelStyle}>
                            Student Register number
                          </Text>
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
                            value={StudentRegNo.toString() || regno}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                )}

                {!isEdit && (
                  <View
                    style={{
                      top: "3%",
                      left: "3%",
                      flexDirection: "row",
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindRegular",
                        fontSize: 18,
                        top: "3%",
                        //marginLeft: 10,
                      }}
                    >
                      Leave Type
                    </Text>
                    <View style={styles.leaveSpace} />

                    <SelectList
                      //setSelected={(val) => setSelected(val)}
                      setSelected={setSelected}
                      data={leaveTypeData}
                      save="value"
                      //placeholder="Select Leave Type"
                      boxStyles={[
                        selectInputIsInValid && styles.errorSelectedColor,
                        { bottom: "5%" },
                        // { marginHorizontal: 15, marginVertical: 10 },
                      ]}
                      dropdownTextStyles={{
                        fontSize: 18,
                        fontFamily: "HindRegular",
                        //marginHorizontal: 25,
                      }}
                      inputStyles={{ fontSize: 20, fontFamily: "HindRegular" }}
                    />
                  </View>
                )}
                <View style={[{ flexDirection: "row" }]}>
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
                      value={fromText || fromDate}
                      onSubmitEditing={Keyboard.dismiss}
                      placeholder="Leave from"
                      style={fromDateInputIsInValid && styles.errorBorderColor}
                      blur={fromDateBlurHandler}
                      onChangeText={leaveFromChangeHandler}
                      onPressIn={() => showFromMode("date")}
                    />
                    {fromDateInputIsInValid && (
                      <Text style={styles.commonErrorMsg}>
                        Select from date
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
                          top: 22,
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
                <View style={{ marginVertical: 7 }}>
                  <View
                    style={[
                      leaveReasonLabel
                        ? styles.leaveReasonUp
                        : styles.leaveReasonDown,
                    ]}
                  >
                    <Text style={[styles.normalLabel]}>Leave reason</Text>
                  </View>
                  <Input
                    onChangeText={leaveReasonChangeHandler}
                    blur={leavereasonBlurHandler}
                    onFocus={onFocusLeaveReasonHandler}
                    // placeholder="Leave reason"
                    value={leaveReason}
                    onSubmitEditing={Keyboard.dismiss}
                    style={
                      isLeaveReasonFocused
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
                          : EmailInputIsInValid
                          ? styles.errorLabel
                          : styles.normalLabel,
                      ]}
                    >
                      Email address
                    </Text>
                  </View>
                  <Input
                    onChangeText={emailChangeHandler}
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
              </ScrollView>
            </View>
          </View>
          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 0.1, backgroundColor: "darkorange" }}>
              <ParentsHome />
            </View>
          )}
        </View>
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
    backgroundColor: "white",
  },
  cancel: {
    // marginTop: -,
    bottom: "19%",
    marginLeft: -15,
    width: "50%",
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
    //  marginTop: deviceWidth < 370 ? 50 : 5,
    bottom: "3%",
    width: "50%",
    marginLeft: 180,
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
  btnSubmit1: {
    // marginTop: 90,
    bottom: "4%",
    marginLeft: 190,
    width: "50%",
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
    fontFamily: "HindRegular",
    fontSize: 18,
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
    top: deviceWidth < 370 ? 2 : 10,
    left: 50,
  },
  errorSelectedColor: {
    borderColor: "red",
  },
  normalLabel: {
    // color: "#A7ADAD",
    color: "grey",
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
    top: deviceWidth < 370 ? 68 : 7,
    left: deviceWidth < 370 ? 40 : 30,
  },
  leaveReasonDown: {
    position: "absolute",
    top: deviceWidth < 370 ? 93 : 26,
    left: 30,
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
  newLabel: {
    fontFamily: "HindRegular",
    fontSize: 18,
  },
  leaveSpace: {
    width: 60, // or whatever size you need
    height: 10,
  },
  errorText: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: 16,
  },
  commonErrorMsg: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 16 : 18,
    top: deviceHieght > 800 ? -3 : 1,
  },
  normalEmail: {
    position: "absolute",
    top: deviceWidth < 370 ? 20 : 25,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upEmail: {
    top: deviceHieght > 800 ? 25 : 28,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 110 : 130,
  },
  upEmailExtra: {
    top: deviceHieght > 800 ? 25 : 28,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 110 : 115,
  },
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
  },
  textStyle: {
    fontSize: deviceWidth < 370 ? 14 : 16,
    fontFamily: "HindSemiBold",
    color: "grey",
  },
});

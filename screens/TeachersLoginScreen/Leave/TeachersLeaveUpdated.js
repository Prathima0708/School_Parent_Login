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
  ActivityIndicator,
  Pressable,
} from "react-native";
import moment from "moment";
import SelectList from "react-native-dropdown-select-list";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  HStack,
  Spinner,
  Text as NativeText,
  Badge,
  Box,
  IconButton,
} from "native-base";
import { Keyboard } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../../components/UI/Button";
import axios from "axios";
import { Button as NativeButton } from "native-base";
import { TEST, Token } from "../../Login";
import BgButton from "../../../components/UI/BgButton";
import {
  Section,
  className,
} from "../../../components/StudentItem/StudentItem";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TeachersHome from "../BottomTab/TeachersHome";
import Input from "../../../components/UI/Input";
import { Teacher, UserId } from "../../Login";
import { Card, DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "react-native-dynamic-search-bar";
import UnderlinedInput from "../../../components/UI/UnderlinedInput";
import BackButton from "../../../components/UI/BackButton";
import { subURL } from "../../../components/utils/URL's";
import { MYCLASS, MYSECTION } from "../Profile/MyClasses/DisplayClass";
var ID, EDT_ID;
var FROMDATE, TODATE;
var BADGE;
var USERNAME, TOKEN, USERROLE, USERID, KEY, VALUE;

var firstData,
  KEY,
  VALUE,
  newArray = [],
  checkCT = [];
const TeachersLeaveUpdated = () => {
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userID, setUserID] = useState("");

  const [loading, setLoading] = useState(false);

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

  const [selectedClassSection, setSelectedClassSection] = useState("");
  const [enteredClassSectionTouched, setEnteredClassSectionTouched] =
    useState(false);
  const enteredSelcetdClassSectionIsValid =
    selectedClassSection.toString().trim() !== "";
  const selectClassSectionInputIsInValid =
    !enteredSelcetdClassSectionIsValid && enteredClassSectionTouched;

  const [selected, setSelected] = useState("");
  const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
  const enteredSelcetdIsValid = selected.trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;
  const leaveTypeData = [
    { key: "Sick Leave", value: "Sick Leave" },
    { key: "Planned Leave", value: "Planned Leave" },

    { key: "Casual Leave", value: "Casual Leave" },
    { key: "Maternity Leave", value: "Maternity Leave" },
  ];

  const [offset, SetOffset] = useState(0);
  const [typeLabel, setTypeLabel] = useState(false);
  const [reasonLabel, setReasonLabel] = useState(false);
  const [emailLabel, setEmailLabel] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isLeavereasonFocused, setIsLeavereasonFocused] = useState(false);
  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(false);

  const [btn, setBtn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showTeachersList, setShowTeachersList] = useState(false);

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

  const [email, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [error, setError] = useState(null);
  const enteredEmailIsValid = email;
  const EmailInputIsInValid = !enteredEmailIsValid && enteredEmailTouched;

  const [leaveReason, setEnteredLeaveReason] = useState("");
  const [enteredLeaveReasonTouched, setEnteredLeaveReasonTouched] =
    useState(false);
  const enteredLeaveReasonIsValid = leaveReason.trim() !== "";
  const leavereasonInputIsInValid =
    !enteredLeaveReasonIsValid && enteredLeaveReasonTouched;

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

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

  const [isFromDateFocused, setIsFromDateFocused] = useState(false);
  const [isToDateFocused, setIsToDateFocused] = useState(false);

  const [startDateLabel, setstartDateLabel] = useState(false);
  const [endDateLabel, setendDateLabel] = useState(false);

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [deletePressed, setDeletePressed] = useState(false);
  const [isSame, SetIsSame] = useState(false);

  const [showChoice, setShowChoice] = useState(true);

  const [searchText, setSearchText] = useState("");

  const [showInitialBtn, setShowInitialBtn] = useState(true);
  const navigation = useNavigation();

  const [approvePressed, setApprovePressed] = useState(false);
  const [denyPressed, setDenyPressed] = useState(false);

  const [token, setToken] = useState("");

  const [leaveByUsername, setLeaveByUsername] = useState([]);

  const [leaveByClassSection, setLeaveByClassSection] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [classTeacherData, setClassTeacherData] = useState([]);
  const [bgColor, setBgColor] = useState([]);
  const [showDefault, setShowDefault] = useState(false);

  const [showNotfoundMsg, setShowNotFoundMsg] = useState(false);

  let i = 0;

  useEffect(() => {
    LogBox.ignoreLogs([
      "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false` ",
    ]);
  }, []);

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const res = await axios.get(
  //           `http://10.0.2.2:8000/school/LeaveByUsername/${Teacher}/`
  //         );
  //         //console.log(res.data);

  //         setLeaveByUsername(res.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     fetchData();
  //   }, []);

  // console.log("reg numbers"+StudentRegNo)

  // useEffect(() => {
  //   console.log(userID);
  //   async function fetchStudentClass() {
  //     axios
  //       .get(`http://10.0.2.2:8000/school/IsClassteacher/${userID}/`)
  //       .then((response) => {
  //         console.log(response.data);
  //         newArray = response.data.map((item) => {
  //           return {
  //             key: item.id,
  //             value: item.class_name + " - " + item.section,
  //             classname: item.class_name,
  //             section: item.section,
  //           };
  //         });

  //         setClassTeacherData(newArray);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  //   fetchStudentClass();
  // }, []);

  // classTeacherData &&
  //   classTeacherData.map((data,key)=>(
  //     // CLASSNAME=data.class_name,
  //     // SECTION=data.section
  //     newArray.push({
  //       'CLASSNAME': data.class_name,
  //       'SECTION': data.section
  //     })
  //   ))

  // newArray - dropdown
  // selected clas and sec sen in LeaveCS API
  useEffect(() => {
    async function getUserId() {
      USERID = await AsyncStorage.getItem("key");
      if (USERID !== null) {
        setUserID(USERID);
      }
      //  console.log("this is the userid in useeffect", userID);
      const res = await axios.get(`${subURL}/IsClassteacher/${userID}/`);
      setBgColor(res.data);
    }
    getUserId();

    //  showLeaveList();
  }, [userID]);

  useLayoutEffect(() => {
    if (showForm) {
      setShowForm(true);

      navigation.setOptions({ headerShown: false });
    }
    if (showChoice) {
      navigation.setOptions({ headerShown: true });
    }
    if (showList) {
      navigation.setOptions({ headerShown: false });
    }
    if (showTeachersList) {
      navigation.setOptions({ headerShown: false });
    }
  }, [showForm, showChoice, showList]);

  async function fetchToken() {
    TOKEN = await AsyncStorage.getItem("token");

    if (TOKEN !== null) {
      setToken(TOKEN);
    }
  }
  fetchToken();

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
    USERROLE = await AsyncStorage.getItem("datagroup");
    USERID = await AsyncStorage.getItem("key");
    // console.log("this is the userid from aysnc", USERID);

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
    console.log("inside update", selected);
    let filteredlist = leaveTypeData.filter((ele) => ele.value == selected);
    if (selected.toString() == selected) {
      console.log("true");
    }
    console.log(filteredlist);
    setShowInitialBtn(true);
    const FormData = {
      leave_type: selected,
      leave_reason: leaveReason,
      leave_form: FROMDATE,
      leave_to: TODATE,
      email: email,
    };

    console.log("edited" + FormData);
    // console.log(FormData);

    if (
      !enteredLeaveReasonIsValid ||
      //!enteredLeaveTypeIsValid ||
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
            `${subURL}/Leave/${EDT_ID}/`,
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
        { text: "OK", onPress: () => myLeaveList() },
      ]);

      // async function fetchData() {
      //   try {
      //     const res = await axios.get(`http://10.0.2.2:8000/school/LeaveByUsername/${user}/`);
      //     //setData(res.data);
      //     setLeaveByUsername(res.data);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
      // fetchData();

      // setEnteredLeaveType("");
      setEnteredLeaveReason("");
      setFromText("");
      setToText("");
      setEnteredEmail("");
      setShowForm(false);
      setShowTeachersList(true);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
      setEnteredLeaveReasonTouched(false);
      setEnteredEmailTouched(false);
      setEmailLabel(false);

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
    console.log(email);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    setBtn(true);

    const FormData = {
      student_reg_number: 0,

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
      !enteredSelcetdIsValid ||
      !enteredEmailIsValid
    ) {
      console.log("if part");
      return;
    } else {
      console.log("else part");
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
    //  setEnteredLeaveTypeTouched(false);
    setEnteredLeaveReasonTouched(false);
    setEnteredFromDateTouched(false);
    setEnteredtoDateTouched(false);
    setIsEdit(false);

    setTypeLabel(false);
    setReasonLabel(false);
  }

  function showLeave() {
    async function fetchData() {
      console.log("this is the username -", user);
      try {
        const res = await axios.get(`${subURL}/LeaveByUsername/${user}/`);
        //console.log(res.data);

        setLeaveByUsername(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  function approveHandler(id) {
    setApprovePressed(true);
    setDenyPressed(false);
    ID = id;

    const fetchedData = data.find((data) => data.id == id);
    //console.log(fetchedData.leave_form)

    const FormData = {
      // leave_form: fetchedData.leave_form,
      // leave_to: fetchedData.leave_to,
      // leave_type: fetchedData.leave_type,
      // leave_reason: fetchedData.leave_reason,
      // student_reg_number:11,
      leave_status: "Approved",
    };

    // console.log(FormData);

    async function updateData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Token " + `${token}`,
        };
        const dataForm = FormData;
        const resLogin = await axios.patch(`${subURL}/Leave/${ID}/`, dataForm, {
          headers: headers,
        });
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        // console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
    }
    updateData();

    classsectionSelectHandler();
  }

  function denyHanlder(id) {
    setDenyPressed(true);
    setApprovePressed(false);

    ID = id;

    const FormData = {
      leave_status: "Denied",
    };
    async function updateData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Token " + `${token}`,
        };
        const dataForm = FormData;
        const resLogin = await axios.patch(`${subURL}/Leave/${ID}/`, dataForm, {
          headers: headers,
        });
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
    }
    updateData();

    classsectionSelectHandler();
  }

  const searchFilter = (text) => {
    console.log("search function");
    if (text) {
      const newData = leaveByClassSection.filter((item) => {
        const itemData = item.leave_type
          ? item.leave_type.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      setFilteredData(leaveByClassSection);
      setSearchText(text);
    }
  };
  function cancelHandler() {
    setShowInitialBtn(true);
    setShowTeachersList(true);
    setShowForm(false);
    setIsEdit(false);
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

  function applyLeave() {
    setShowForm(true);
    setShowChoice(false);
    setError(null);
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

    setEmailLabel(false);
    setReasonLabel(false);
  }

  function myLeaveList() {
    setShowTeachersList(true);
    setShowForm(false);
    setShowChoice(false);

    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/LeaveByUsername/${user}/`);

        setLeaveByUsername(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  function showLeaveList() {
    console.log("show leave lisr fun");
    // setShowList(true);
    // setShowForm(false);
    // setShowChoice(false);
    // setLoading(true);
    setShowDefault(false);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    setBtn(true);
    async function fetchStudentClass() {
      console.log("inside fetchstudentclass");
      console.log("user id is", userID);
      axios
        .get(`${subURL}/IsClassteacher/${userID}/`)
        .then((response) => {
          newArray = response.data.map((item) => {
            return {
              key: item.id,
              value: item.class_name + " - " + item.section,
              classname: item.class_name,
              section: item.section,
            };
          });
          console.log(newArray);

          //  console.log("new array length", newArray.length);

          if (bgColor.length >= 1) {
            // setBgColor(true);
            setShowList(true);
            setShowForm(false);
            setShowChoice(false);
            setLoading(true);
          }
          // else if (newArray.length == 0) {
          //   setBgColor(false);
          // }
          firstData = newArray[0];

          KEY = firstData.key;
          VALUE = firstData.value;
          setClassTeacherData(newArray);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchStudentClass();
  }
  // console.log("new array length outside", newArray?.length);

  function backHandler() {
    setShowChoice(true);
    setShowForm(false);
    setTypeLabel(false);
    setIsEdit(false);
    //setEnteredLeaveTypeTouched(false);
    setReasonLabel(false);
    setEmailLabel(false);
    setEnteredSelectedTouched(false);
    setEnteredLeaveReasonTouched(false);
    setIsLeavereasonFocused(false);
    setEnteredFromDateTouched(false);
    setEnteredtoDateTouched(false);

    setEnteredEmailTouched(false);
    setEnteredLeaveReason("");
    setFromText("");
    setToText("");
    setEnteredEmail("");
  }

  function leaveBackHandler() {
    setShowDefault(false);
    setShowChoice(true);
    setShowList(false);
  }

  function teacherLeaveBackHandler() {
    setShowChoice(true);
    setShowTeachersList(false);
  }

  function selecteHandler() {}

  function classsectionSelectHandler() {
    setShowDefault(true);

    let filteredlist = newArray?.filter(
      (ele) => ele.key == selectedClassSection
    );

    let class_name = filteredlist[0]?.classname;
    let section = filteredlist[0]?.section;

    async function fetchData() {
      try {
        const res = await axios.get(
          `${subURL}/LeaveCS/${class_name}/${section}`
        );

        setLeaveByClassSection(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  function editItem(id) {
    console.log(id);
    setIsEdit(true);
    setShowForm(true);
    setShowTeachersList(false);
    setReasonLabel(true);
    setEmailLabel(true);
    EDT_ID = id;

    const filteredDummuyData = leaveByUsername.find((data) => data.id == id);

    let filteredlist = leaveTypeData.filter(
      (ele) => ele.value == filteredDummuyData.leave_type
    );
    console.log(filteredlist[0].value);
    KEY = filteredlist[0].key;
    VALUE = filteredlist[0].value;

    setFromText(moment(filteredDummuyData.startdate).format("DD/MM/YYYY"));
    setToText(moment(filteredDummuyData.enddate).format("DD/MM/YYYY"));
    setEnteredLeaveReason(filteredDummuyData.leave_reason);
    setEnteredEmail(filteredDummuyData.email);
  }

  function filterPending() {
    async function fetchData() {
      let filtered = newArray?.filter((ele) => ele.key == selectedClassSection);

      // console.log(filteredlist[0].classname);
      let class_name = filtered[0].classname;
      let section = filtered[0].section;
      try {
        const res = await axios.get(
          `${subURL}/LeaveCS/${class_name}/${section}`
        );
        const filteredList = res.data.filter(
          (ele) => ele.leave_status == "Pending"
        );
        if (filteredList.length == 0) {
          Alert.alert("No data found");
        }
        setFilteredData(filteredList);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }
  function filterAll() {
    classsectionSelectHandler();
  }
  function filterApproved() {
    async function fetchData() {
      let filtered = newArray?.filter((ele) => ele.key == selectedClassSection);

      // console.log(filteredlist[0].classname);
      let class_name = filtered[0].classname;
      let section = filtered[0].section;
      try {
        const res = await axios.get(
          `${subURL}/LeaveCS/${class_name}/${section}`
        );
        const filteredList = res.data.filter(
          (ele) => ele.leave_status == "Approved"
        );
        if (filteredList.length == 0) {
          Alert.alert("No data found");
        }
        setFilteredData(filteredList);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  function filterDenied() {
    async function fetchData() {
      let filtered = newArray?.filter((ele) => ele.key == selectedClassSection);

      // console.log(filteredlist[0].classname);
      let class_name = filtered[0].classname;
      let section = filtered[0].section;
      try {
        const res = await axios.get(
          `${subURL}/LeaveCS/${class_name}/${section}`
        );
        const filteredList = res.data.filter(
          (ele) => ele.leave_status == "Denied"
        );
        if (filteredList.length == 0) {
          Alert.alert("No data found");
        }
        setFilteredData(filteredList);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  function deleteItem(id) {
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
          `${subURL}/Leave/${id}/`,
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
          const res = await axios.get(`${subURL}/LeaveByUsername/${user}/`);
          // console.log(res.data);
          setLeaveByUsername(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }

  function linkPressedHandler() {
    setShowForm(true);
    setShowTeachersList(false);
  }

  return (
    <>
      {showChoice && (
        <View
          style={[
            { flex: 1 },
            { flexDirection: "column", backgroundColor: "white" },
          ]}
        >
          <View style={{ flex: 1, marginHorizontal: "20%", top: "10%" }}>
            <Pressable onPress={applyLeave}>
              <Card style={styles.cardStyle}>
                <Card.Content style={{ margin: 1, marginTop: 0 }}>
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      Apply Leave
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </Pressable>
          </View>

          <View style={{ flex: 1, marginHorizontal: "20%" }}>
            <Pressable onPress={myLeaveList}>
              <Card style={styles.cardStyle}>
                <Card.Content style={{ margin: 1, marginTop: 0 }}>
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      My Leave
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </Pressable>
          </View>

          <View style={{ flex: 1, marginHorizontal: "20%", bottom: "10%" }}>
            {/* <Pressable onPress={showLeaveList}> */}
            {/* <Card
                style={[
                  styles.cardStyle,
                  // { backgroundColor: bgColor ? "darkblue" : "gray" },
                  {
                    backgroundColor: bgColor.length >= 1 ? "darkblue" : "gray",
                  },
                ]}
              >
                <Card.Content style={{ margin: 1, marginTop: 0 }}>
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      View Student Leave
                    </Text>
                  </View>
                </Card.Content>
              </Card> */}

            {/* <Btn
              title="show leave list"
              disabled={bgColor.length == 0 ? true : false}
              onPress={showLeaveList}
              style={styles.cardStyle}
            /> */}
            <View>
              <NativeButton
                isDisabled={bgColor.length == 0 ? true : false}
                onPress={showLeaveList}
                style={[styles.cardStyle]}
                size="md"
                padding={7}
                // textStyle={{ fontFamily: "HindSemiBold", fontSize: 18 }}

                //  colorScheme="blue"
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "HindSemiBold",
                    color: "white",
                  }}
                >
                  View Student Leaves
                </Text>
              </NativeButton>
            </View>

            {/* </Pressable> */}
          </View>

          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 0.2 }}>
              <TeachersHome />
            </View>
          )}
        </View>
      )}

      {showForm && (
        <View
          style={[
            { flex: 1 },
            { flexDirection: "column", backgroundColor: "white" },
          ]}
        >
          <View style={[{ flex: 0.2 }, { flexDirection: "row", top: "16%" }]}>
            <BackButton onPress={backHandler} />
          </View>

          <View
            style={[
              styles.headingStyleNew,
              keyboardStatus == "Keyboard Shown" && { top: "5%" },
            ]}
          >
            <NativeText bold style={{ fontSize: 17 }}>
              Leave Form
            </NativeText>
          </View>

          <View
            style={[
              styles.inputForm,
              keyboardStatus == "Keyboard Shown" && { top: "5%" },
            ]}
          >
            <ScrollView persistentScrollbar={false}>
              {!isEdit && (
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
                </View>
              )}

              {!isEdit && (
                <View
                  style={[
                    { flex: 1 },
                    { flexDirection: "row", marginVertical: 10 },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.labelStyle, { left: "9%" }]}>
                      Leave Type
                    </Text>
                  </View>
                  <View style={{ flex: 1, paddingRight: 20 }}>
                    <SelectList
                      //setSelected={(val) => setSelected(val)}
                      setSelected={setSelected}
                      data={leaveTypeData}
                      save="value"
                      boxStyles={[
                        selectInputIsInValid && styles.errorSelectedColor,
                      ]}
                      dropdownTextStyles={{
                        fontSize: 15,
                        fontFamily: "HindRegular",
                      }}
                      inputStyles={{ fontSize: 15, fontFamily: "HindRegular" }}
                    />
                    {selectInputIsInValid && (
                      <Text style={styles.commonErrorMsg}>
                        Select leave type
                      </Text>
                    )}
                  </View>
                </View>
              )}

              {isEdit && (
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
                      fontSize: 15,
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
                    defaultOption={{
                      key: String(KEY),
                      value: String(VALUE),
                    }}
                    data={leaveTypeData}
                    save="value"
                    //placeholder="Select Leave Type"
                    boxStyles={[
                      selectInputIsInValid && styles.errorSelectedColor,
                      { bottom: "5%" },
                      // { marginHorizontal: 15, marginVertical: 10 },
                    ]}
                    dropdownTextStyles={{
                      fontSize: 15,
                      fontFamily: "HindRegular",
                      //marginHorizontal: 25,
                    }}
                    inputStyles={{ fontSize: 15, fontFamily: "HindRegular" }}
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
                    value={fromText || frmdate}
                    placeholder="   Start date"
                    onSubmitEditing={Keyboard.dismiss}
                    style={
                      isFromDateFocused
                        ? styles.focusStyle
                        : fromDateInputIsInValid && styles.errorBorderColorDate
                    }
                    blur={fromDateBlurHandler}
                    onFocus={onFocusFromHandler}
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
                    blur={toDateBlurHandler}
                    onFocus={onFocusToHandler}
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
            {/* </View> */}
          </View>

          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 0.2, backgroundColor: "white" }}>
              <TeachersHome />
            </View>
          )}
        </View>
      )}

      {showTeachersList && (
        <View
          style={[
            { flex: 1 },
            {
              flexDirection: "column",
              backgroundColor: "white",
            },
          ]}
        >
          <View style={{ flex: 0.2, top: "10%" }}>
            <BackButton onPress={teacherLeaveBackHandler} />
          </View>
          <View style={styles.headingStyle}>
            <NativeText bold style={{ fontSize: 18 }}>
              Teachers Leave
            </NativeText>
          </View>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <SearchBar
              onSubmitEditing={Keyboard.dismiss}
              style={styles.searchBar}
              textInputStyle={{ fontFamily: "HindRegular", fontSize: 17 }}
              placeholder="Search here by leave type"
              onChangeText={(text) => searchFilter(text)}
              value={searchText}
            />
            {leaveByUsername.length <= 0 ? (
              <View style={{ alignItems: "center", top: "2%" }}>
                <Text style={styles.msgText}>
                  No Leaves are found,
                  <Text style={styles.linkText} onPress={linkPressedHandler}>
                    Start adding here
                  </Text>
                </Text>
              </View>
            ) : (
              <ScrollView
                scrollEventThrottle={15}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: false }
                )}
              >
                <View>
                  {loading ? (
                    <ActivityIndicator
                      size={40}
                      visible={loading}
                      textContent={"Loading..."}
                      textStyle={styles.spinnerTextStyle}
                    />
                  ) : (
                    leaveByUsername.map((data) => (
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
                                    <View style={{ flex: 0.3 }}>
                                      {/* <Ionicons
                                                      name="calendar"
                                                      size={25}
                                                      color="#D4AC0D"
                                                      style={{  }}
                                                    /> */}
                                    </View>
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
                                        <View style={{ flex: 0.3 }}>
                                          <Text style={styles.cardTextStyle}>
                                            Status:
                                          </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                          {data.leave_status == "approved" ? (
                                            <Badge
                                              colorScheme="success"
                                              style={{ width: "55%" }}
                                            >
                                              {data.leave_status}
                                            </Badge>
                                          ) : data.leave_status == "Pending" ? (
                                            <Badge
                                              colorScheme="warning"
                                              style={{ width: "45%" }}
                                            >
                                              {data.leave_status}
                                            </Badge>
                                          ) : (
                                            <Badge
                                              colorScheme="danger"
                                              style={{ width: "50%" }}
                                            >
                                              {data.leave_status}
                                            </Badge>
                                          )}
                                        </View>
                                        <IconButton
                                          colorScheme="green"
                                          onPress={() => editItem(data.id)}
                                          variant="subtle"
                                          _icon={{
                                            as: Ionicons,
                                            name: "md-pencil-sharp",
                                          }}
                                        />
                                        <View style={styles.space} />
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
            <View style={{ flex: 0.2 }}>
              <TeachersHome />
            </View>
          )}
        </View>
      )}

      {showList && (
        <View
          style={[
            {
              flex: 1,
              flexDirection: "column",
              marginTop: "10%",
              backgroundColor: "white",
            },
          ]}
        >
          <View style={{ flex: 0.1, paddingTop: 20 }}>
            <BackButton onPress={leaveBackHandler} />
          </View>
          <View style={{ flex: 1 }}>
            <NativeText
              bold
              style={{ fontSize: 17, marginLeft: "35%", padding: 10 }}
            >
              Leave List
            </NativeText>
            <View style={{ flexDirection: "row", padding: 20 }}>
              <Text
                style={{ fontSize: 16, top: "3%", fontFamily: "HindSemiBold" }}
              >
                Select Class
              </Text>
              <View style={styles.space} />
              <SelectList
                defaultOption={{
                  key: String(KEY),
                  value: String(VALUE),
                }}
                setSelected={setSelectedClassSection}
                data={classTeacherData}
                //dropdownStyles={{ marginTop: "-5%" }}
                onSelect={classsectionSelectHandler}
                placeholder="Select class"
                dropdownTextStyles={{
                  fontSize: 15,
                  fontFamily: "HindRegular",
                }}
                inputStyles={{ fontSize: 15, fontFamily: "HindRegular" }}
                save="key"
              />
            </View>
            {leaveByClassSection.length > 0 && (
              // <SearchBar
              //   onSubmitEditing={Keyboard.dismiss}
              //   style={styles.searchBarNew}
              //   textInputStyle={{ fontFamily: "HindRegular", fontSize: 17 }}
              //   placeholder="Search here by leave type"
              //   onChangeText={(text) => searchFilter(text)}
              //   value={searchText}
              // />
              <View
                style={[
                  {
                    // Try setting `flexDirection` to `"row"`.
                    flex: 0.7,
                    flexDirection: "column",
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <View
                    style={[
                      {
                        // Try setting `flexDirection` to `"row"`.
                        flex: 1,
                        flexDirection: "row",
                        marginHorizontal: 30,
                      },
                    ]}
                  >
                    <View style={{ flex: 1, right: "10%" }}>
                      <NativeText bold style={{ fontSize: 17 }}>
                        Sort by
                      </NativeText>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                      <NativeButton
                        onPress={filterAll}
                        colorScheme="darkBlue"
                        size="sm"
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: "HindSemiBold",
                            color: "white",
                          }}
                        >
                          Reset
                        </Text>
                      </NativeButton>
                    </View>
                    <View style={styles.space} />
                    <View
                      style={{
                        flex: 1,
                        alignItems: "flex-start",
                        right: "80%",
                      }}
                    >
                      <NativeButton
                        onPress={filterApproved}
                        colorScheme="green"
                        size="xs"
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: "HindSemiBold",
                            color: "white",
                          }}
                        >
                          Approved
                        </Text>
                      </NativeButton>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 2, alignItems: "flex-start" }}>
                  <View
                    style={[
                      {
                        // Try setting `flexDirection` to `"row"`.
                        flex: 1,
                        flexDirection: "row",
                        marginHorizontal: 30,
                      },
                    ]}
                  >
                    <View
                      style={{ flex: 1, alignItems: "flex-end", left: "15%" }}
                    >
                      <NativeButton
                        onPress={filterDenied}
                        colorScheme="danger"
                        size="xs"
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: "HindSemiBold",
                            color: "white",
                          }}
                        >
                          Denied
                        </Text>
                      </NativeButton>
                    </View>
                    <View style={styles.space} />
                    <View
                      style={{ flex: 1, alignItems: "flex-start", left: "7%" }}
                    >
                      <NativeButton
                        onPress={filterPending}
                        colorScheme="yellow"
                        size="xs"
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: "HindSemiBold",
                            color: "white",
                          }}
                        >
                          Pending
                        </Text>
                      </NativeButton>
                    </View>
                  </View>
                </View>
              </View>
            )}
            <View style={[{ flex: 1, flexDirection: "column" }]}>
              <View style={{ flex: 1 }}>
                <View
                  style={[
                    { flex: 1 },
                    { flexDirection: "column", backgroundColor: "white" },
                  ]}
                >
                  <View style={{ flex: 8, bottom: 50 }}>
                    {leaveByClassSection.length <= 0 ? (
                      // <View style={{ alignItems: "center", top: "16%" }}>
                      //   <NativeText fontSize="lg" bold color="error.900">
                      //     Select class to view Student leaves
                      //   </NativeText>
                      // </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          //justifyContent: "center",
                          marginTop: "20%",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "HindSemiBold",
                            fontSize: 18,
                            color: "#6B0202",
                          }}
                        >
                          Data not found
                        </Text>
                      </View>
                    ) : (
                      <ScrollView
                        scrollEventThrottle={15}
                        onScroll={Animated.event(
                          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                          { useNativeDriver: false }
                        )}
                      >
                        <View style={[styles.root]}>
                          {/* {!filteredData && <Spinner size="lg" />} */}
                          {/* {!filteredData && <Text>no data founds</Text>} */}
                          {loading ? (
                            <ActivityIndicator
                              size={40}
                              visible={loading}
                              textContent={"Loading..."}
                              textStyle={styles.spinnerTextStyle}
                            />
                          ) : (
                            showDefault &&
                            filteredData.map((data) => (
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
                                            <View style={{ flex: 0.6 }}>
                                              <Text
                                                style={styles.cardTextStyle}
                                              >
                                                Student Name:
                                              </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                              <Text style={styles.textStyle}>
                                                {
                                                  data.student_reg_number
                                                    .student_name
                                                }
                                              </Text>
                                            </View>
                                          </View>
                                        </View>
                                        <View style={styles.spaceHead} />
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
                                              <Text
                                                style={styles.cardTextStyle}
                                              >
                                                Reg No:
                                              </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                              <Text style={styles.textStyle}>
                                                {
                                                  data.student_reg_number
                                                    .reg_number
                                                }
                                              </Text>
                                            </View>
                                          </View>
                                        </View>
                                      </View>
                                      <View style={styles.spaceHead} />
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
                                              <Text
                                                style={styles.cardTextStyle}
                                              >
                                                Leave from
                                              </Text>
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
                                              <Text
                                                style={styles.cardTextStyle}
                                              >
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
                                                  <Text
                                                    style={styles.cardTextStyle}
                                                  >
                                                    Leave reason:
                                                  </Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                  <Text
                                                    style={styles.textStyle}
                                                  >
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
                                                  <Text
                                                    style={styles.cardTextStyle}
                                                  >
                                                    Leave type:
                                                  </Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                  <Text
                                                    style={styles.textStyle}
                                                  >
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
                                                  <Text
                                                    style={styles.cardTextStyle}
                                                  >
                                                    Status:
                                                  </Text>
                                                </View>
                                                <View style={{ flex: 1.5 }}>
                                                  {data.leave_status ==
                                                  "Approved" ? (
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
                                                // left: "7%",
                                                bottom: "2%",
                                                alignItems: "flex-end",
                                              }}
                                            >
                                              <View
                                                style={[
                                                  { flex: 4 },
                                                  {
                                                    flexDirection: "row",
                                                    // left: "12%",
                                                  },
                                                ]}
                                              >
                                                <View style={{ flex: 0.3 }}>
                                                  <IconButton
                                                    colorScheme="success"
                                                    onPress={() =>
                                                      approveHandler(data.id)
                                                    }
                                                    variant="subtle"
                                                    _icon={{
                                                      as: Ionicons,
                                                      name: "md-checkmark-sharp",
                                                    }}
                                                  />
                                                </View>
                                                <View style={styles.space} />
                                                <View style={{ flex: 0.3 }}>
                                                  <IconButton
                                                    colorScheme="danger"
                                                    onPress={() =>
                                                      denyHanlder(data.id)
                                                    }
                                                    variant="subtle"
                                                    _icon={{
                                                      as: Ionicons,
                                                      name: "close",
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
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.1, backgroundColor: "green" }}>
            <TeachersHome />
          </View>
        </View>
      )}
    </>
  );
};

export default TeachersLeaveUpdated;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  btnCont: {
    flexDirection: "row",
    top: "57%",
  },
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "#FDFEFE",
  },
  headingStyleNew: {
    flex: 0.2,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 35,
    justifyContent: "center",
  },
  headingStyle: {
    flex: 0.2,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "2%",
    justifyContent: "center",
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#F0F3F4",
  },
  searchBarNew: {
    //marginTop: 100,
    //marginBottom: 20,
    backgroundColor: "#F0F3F4",
  },
  btnSubmit1: {
    marginTop: 80,
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
    flex: 2,
    paddingHorizontal: 20,
    marginTop: "2%",
    //paddingTop: '5%',
    backgroundColor: "white",
    // height: "100%",
  },
  errorBorderColor: {
    borderColor: "red",
  },
  errorBorderColorDate: {
    borderBottomColor: "red",
  },
  commonErrorMsg: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 16 : 16,
    top: deviceHieght > 800 ? -3 : 1,
  },
  // labels: {
  //   margin: 5,
  //   fontFamily: "Ubuntu",
  //   fontSize: 18,
  //   // marginTop: 17,
  // },
  btnSubmit: {
    marginTop: deviceWidth < 370 ? 40 : 10,
    width: "60%",
    marginLeft: 160,
  },
  dateContainer: {
    width: "10%",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  spaceHead: {
    width: 20, // or whatever size you need
    height: 5,
  },
  leaveSpace: {
    width: 60, // or whatever size you need
    height: 10,
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
    fontSize: deviceWidth < 370 ? 13 : 17,
    fontFamily: "HindRegular",
  },
  errorSelectedColor: {
    borderColor: "red",
  },
  normalRemark: {
    position: "absolute",
    top: deviceWidth < 370 ? 20 : 27,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upRemark: {
    top: deviceHieght > 800 ? 30 : 28,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 120 : 120,
  },

  normalEmail: {
    position: "absolute",
    top: deviceWidth < 370 ? 20 : 25,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upEmail: {
    top: deviceHieght > 800 ? 60 : 28,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 120 : 130,
  },
  upEmailExtra: {
    top: deviceHieght > 800 ? 25 : 28,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 120 : 115,
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
  spinnerTextStyle: {
    color: "#FFF",
  },
  cardStyle: {
    marginVertical: 15,
    marginHorizontal: 27,
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    //backgroundColor: "#2E799B",
    backgroundColor: "#1E84A4",
    width: "80%",
  },
  labelStyle: {
    fontFamily: "HindRegular",
    fontSize: 18,
  },
  textStyle: {
    fontSize: deviceWidth < 370 ? 14 : 16,
    fontFamily: "HindSemiBold",
    color: "grey",
  },
  submitLabel: {
    color: "grey",
    color: "#AEB6BF",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
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
    fontSize: 17,
    fontFamily: "HindSemiBold",
    color: "#6B0000",
  },
});

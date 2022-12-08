import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Alert,
  Button as Btn,
  Dimensions,
  LogBox,
  Pressable,
  ActivityIndicator,
} from "react-native";
import SelectList from "react-native-dropdown-select-list";
import CheckBox from "react-native-check-box";
import React, { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";
import FloatLabelTextInput from "react-native-floating-label-text-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";

import BgButton from "../../../components/UI/BgButton";
import SearchBar from "react-native-dynamic-search-bar";
import { Ionicons } from "@expo/vector-icons";
import TeachersHome from "../BottomTab/TeachersHome";
import Input from "../../../components/UI/Input";
import { getMomentsAsync } from "expo-media-library";
import moment from "moment";

import { Card, DataTable } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import UnderlinedInput from "../../../components/UI/UnderlinedInput";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EditCalendar from "./EditCalendar";
import { HStack, Radio } from "native-base";
import { subURL } from "../../../components/utils/URL's";
import { style } from "@mui/system";
import { Token } from "../../Login";

// import { Label } from "react-native-form-component";
var FloatingLabel = require("react-native-floating-labels");
export var ID;
export var FROMDATE, TODATE;
var USERNAME, TOKEN;
const TeachersCalendar = () => {
  const [checked, setChecked] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [teacherChecked, setTeacherChecked] = useState(false);
  const [parentChecked, setParentChecked] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  const [value, setValue] = useState("");
  const [isSelected, setSelection] = useState(false);

  const [listData, setListData] = useState(["All", "Teacher", "Parent"]);
  const navigation = useNavigation();
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
  const br = "\n";
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);

  const [label, setLabel] = useState(false);
  const [descriptionLabel, setDescriptionLabel] = useState(false);
  const [startDateLabel, setstartDateLabel] = useState(false);
  const [endDateLabel, setendDateLabel] = useState(false);

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescFocused, setIsDescFocused] = useState(false);
  const [isFromDateFocused, setIsFromDateFocused] = useState(false);
  const [isToDateFocused, setIsToDateFocused] = useState(false);

  const [btn, setBtn] = useState(false);

  const [forCalendarList, setForCalendarList] = useState({
    backgroundColor: "#0C60F4",
    color: "white",
    borderRadius: 10,
  });
  const [forCalendarForm, setForCalendarForm] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 10,
  });

  const [selected, setSelected] = useState("");
  const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
  const enteredSelcetdIsValid = selected.trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

  const [title, setEnteredTitle] = useState("");
  const [enteredTitleTouched, setEnteredTitleTouched] = useState(false);
  const enteredTitleIsValid = title.trim() !== "";
  const titleInputIsInValid = !enteredTitleIsValid && enteredTitleTouched;

  const [description, setEnteredDescription] = useState("");
  const [enteredDescriptionTouched, setEnteredDescriptionTouched] =
    useState(false);
  const enteredDescriptionIsValid = description.trim() !== "";
  const descriptionInputIsInValid =
    !enteredDescriptionIsValid && enteredDescriptionTouched;

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

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [dateIsInCorrect, setDateIsInCorrect] = useState(false);
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isSame, SetIsSame] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [showInitialBtn, setShowInitialBtn] = useState(true);

  const [isActive, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [all, setAll] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [parent, setParent] = useState(false);

  let i = 0;

  // async function logoutHandler() {
  //   try {
  //     const value = await AsyncStorage.getItem("key");
  //     if (value == null) {

  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Calendar/`);
        // console.log(res.data);
        // var mapped = res.data.map((item) => ({ [item.key]: item.value }));
        // var newObj = Object.assign({}, ...mapped);
        // console.log(newObj);
        const keys = Object.keys(res.data[0]);
        console.log("keys -", keys);
        setData(res.data);
        setFilteredData(res.data);

        let test = 0;

        for (i = 0; i < res.data.length; i++) {
          // console.log(res.data[i].created_by);
          if (USERNAME == res.data[i].created_by) {
            //  console.log("is same");
            SetIsSame(true);
          } else {
            //  console.log("not same");
          }
        }

        // const value = await AsyncStorage.getItem("key");
        // for (i = 0; i < res.data.length; i++) {
        //   if (value == res.data[i].created_by) {
        //     test = res.data[i].created_by;
        //   } else {
        //     // console.log('false')
        //   }
        // }
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

  // const variable=data.createdby === AsyncStorage.getItem('key')
  // const value=AsyncStorage.getItem('key')
  // try {
  //   const value = await AsyncStorage.getItem("key");

  //   if (value !== null) {
  //     console.log("This is the token :" + value);
  //   }
  // } catch (error) {
  //   // Error retrieving data
  // }

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

  function titleChangeHandler(enteredValue) {
    setEnteredTitle(enteredValue);
  }
  function descriptionChangeHandler(enteredValue) {
    setEnteredDescription(enteredValue);
  }

  function createdByChangeHandler(enteredValue) {
    setEnteredcreatedby(enteredValue);
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

  function updateHandler() {
    setShowInitialBtn(true);
    const FormData = {
      description: description,
      // created_by:createdby,
      startdate: FROMDATE,
      enddate: TODATE,
      titlee: title,
    };
    //console.log(FormData);

    if (!enteredTitleIsValid || !enteredDescriptionIsValid) {
      Alert.alert("Please enter all fields");
    } else {
      async function updateData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const dataForm = FormData;
          const resLogin = await axios.put(
            `${subURL}/Calendar/${ID}/`,
            dataForm,
            {
              headers: headers,
            }
          );
          // const token = resLogin.data.token;
          // const userId = resLogin.data.user_id;
        } catch (error) {
          console.log(error);
        }
      }
      updateData();
      Alert.alert("Successfully updated", "", [
        {
          text: "OK",
          onPress: () => {
            showCalendar();
          },
        },
      ]);

      setEnteredDescription("");
      setEnteredTitle("");
      setFromText("");
      setToText("");
      setShowForm(false);
      setShowList(true);
      setForCalendarList({
        backgroundColor: "#F4F6F6",
        color: "black",
        borderRadius: 10,
      });
      setForCalendarForm({
        color: "white",
        backgroundColor: "#1E8449",
        borderRadius: 10,
      });
    }
  }

  function buttonPressedHandler() {
    console.log(Token);
    console.log(selected);
    console.log(value);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setBtn(true);

    var viewOnlyData = [];
    // if (checked) {
    //   viewOnlyData.push("all");
    // }
    if (adminChecked) {
      viewOnlyData.push("admin");
    }
    if (teacherChecked) {
      viewOnlyData.push("teacher");
    }
    if (parentChecked) {
      viewOnlyData.push("parent");
    }
    // `{[${checked ? "all" : ""},
    // ${adminChecked ? "admin" : ""},
    // ${teacherChecked ? "teacher" : ""},
    // ${parentChecked ? "parentt" : ""} ]}`

    const FormData = {
      description: description,
      created_by: user,
      startdate: FROMDATE,
      enddate: TODATE,
      titlee: title,
      viewOnly: viewOnlyData.toString(),
    };

    console.log(FormData);
    // var dateFromValidate = fromText || frmdate;
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

    // var dateToValidate = toText || todate;
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

    const formIsValid =
      enteredTitleIsValid &&
      enteredDescriptionIsValid &&
      enteredFromDateIsValid &&
      enteredtoDateIsValid;
    //  enteredSelcetdIsValid
    if (formIsValid) {
    }

    //setEnteredSelectedTouched(true)
    setEnteredTitleTouched(true);
    setEnteredDescriptionTouched(true);
    // setEnteredCreatedbyTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    // setCheckFromDateTouched(true);
    // setCheckToDateTouched(true);
    // if(!enteredSelcetdIsValid){
    //   return;
    // }
    if (!enteredTitleIsValid) {
      return;
    }
    if (!enteredDescriptionIsValid) {
      return;
    }
    // if(!enteredCreatedByIsValid){
    //   return;
    // }
    if (!enteredFromDateIsValid) {
      return;
    }

    if (!enteredtoDateIsValid) {
      return;
    }
    async function getData() {
      try {
        const res = await axios.get(`${subURL}/Calendar/`);

        let filteredlist = res.data.filter(
          (ele) => ele.description == description
        );
        if (filteredlist.length > 0) {
          Alert.alert("Data already exists", "please enter a new data", [
            {
              text: "OK",

              style: "cancel",
            },
          ]);
        } else {
          async function storeData() {
            try {
              let headers = {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: "Token " + `${token}`,
              };
              const dataForm = FormData;

              const resLogin = await axios.post(
                `${subURL}/Calendar/`,
                dataForm,
                {
                  headers: headers,
                }
              );
              // const token = resLogin.data.token;
              // const userId = resLogin.data.user_id;
              // console.log(resLogin.data);
            } catch (error) {
              console.log(error);
            }
          }
          storeData();
          Alert.alert("Saved Data", "Saved Data successfully", [
            {
              text: "OK",
              onPress: () => {
                setShowForm(false);
                showCalendar();
              },
            },
          ]);
          setEnteredDescription("");
          setEnteredTitle("");
          setFromText("");
          setToText("");
          setEnteredTitleTouched(false);
          setEnteredDescriptionTouched(false);
          // setEnteredCreatedbyTouched(false);
          setEnteredFromDateTouched(false);
          setEnteredtoDateTouched(false);
          // setEnteredSelectedTouched(false);
          setForCalendarList({
            backgroundColor: "#F4F6F6",
            color: "black",
            borderRadius: 10,
          });
          setForCalendarForm({
            color: "white",
            backgroundColor: "#1E8449",
            borderRadius: 10,
          });

          setShowForm(false);
          setShowList(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }
  function selectedInputBlur() {
    setEnteredSelectedTouched(true);
  }

  function titleBlurHandler() {
    setEnteredTitleTouched(true);
    setIsTitleFocused(false);
    // setLabel(false);
  }
  function onFocusTitleHandler() {
    setIsTitleFocused(true);
    setEnteredTitleTouched(false);
    setLabel(true);
  }

  function descriptionBlurHandler() {
    setEnteredDescriptionTouched(true);
    setIsDescFocused(false);
  }
  function onFocusDescHandler() {
    setIsDescFocused(true);
    setEnteredDescriptionTouched(false);
    setDescriptionLabel(true);
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

  function showCalendarForm() {
    setForCalendarList({
      backgroundColor: "#0C60F4",
      color: "white",
      borderRadius: 10,
    });
    setForCalendarForm({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
    });
    setShowForm(true);
    setShowList(false);
    setEnteredDescriptionTouched(false);
    setEnteredTitleTouched(false);
    setEnteredtoDateTouched(false);
    setEnteredFromDateTouched(false);
    // setEnteredSelectedTouched(false);
    setIsEdit(false);

    setEnteredDescription("");
    setEnteredTitle("");
    setFromText("");
    setToText("");

    setLabel(false);
    setDescriptionLabel(false);
    setIsTitleFocused(false);
    setIsDescFocused(false);
  }
  function showCalendar() {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Calendar/`);
        console.log(res.data);

        setData(res.data);
        setFilteredData(res.data);

        setForCalendarForm({
          color: "white",
          backgroundColor: "#1E8449",
          borderRadius: 10,
        });
        setForCalendarList({
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

  // function editItem(id) {
  //   // setShowInitialBtn(false);

  //   setLabel(true);
  //   setDescriptionLabel(true);
  //   ID = id;
  //   // console.log(id);
  //   const filteredDummuyData = data.find((data) => data.id == id);
  //   navigation.navigate("EditCalendar", {
  //     id: id,
  //     title: filteredDummuyData.titlee,
  //     desc: filteredDummuyData.description,
  //     fromtext: moment(filteredDummuyData.startdate).format("DD/MM/YYYY"),
  //     totext: moment(filteredDummuyData.enddate).format("DD/MM/YYYY"),
  //     cancel: cancelHandler.bind(this),
  //   });

  //   setEnteredDescription(filteredDummuyData.description);
  //   //  setEnteredcreatedby(filteredDummuyData.created_by);
  //   setFromText(moment(filteredDummuyData.startdate).format("DD/MM/YYYY"));
  //   setToText(moment(filteredDummuyData.enddate).format("DD/MM/YYYY"));
  //   setEnteredTitle(filteredDummuyData.titlee);
  //   //  setEnteredMobile(filteredDummuyData.exam_name);
  //   //  setEnteredRouteName(filteredDummuyData.hour);

  //   setForCalendarList({
  //     backgroundColor: "#F4F6F6",
  //     color: "black",
  //     borderRadius: 10,
  //   });
  //   setForCalendarForm({
  //     color: "white",
  //     backgroundColor: "#1E8449",
  //     borderRadius: 10,
  //   });
  //   // setShowForm(true);
  //   // setShowList(false);
  //   setIsEdit(true);
  // }

  function editItem(id) {
    setShowInitialBtn(false);
    setLabel(true);
    setDescriptionLabel(true);
    ID = id;
    console.log(id);
    const filteredDummuyData = data.find((data) => data.id == id);

    setEnteredDescription(filteredDummuyData.description);
    //  setEnteredcreatedby(filteredDummuyData.created_by);
    setFromText(moment(filteredDummuyData.startdate).format("DD/MM/YYYY"));
    setToText(moment(filteredDummuyData.enddate).format("DD/MM/YYYY"));
    setEnteredTitle(filteredDummuyData.titlee);
    // setSelected(filteredDummuyData.)

    setForCalendarList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForCalendarForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    setShowForm(true);
    setShowList(false);
    setIsEdit(true);
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
          `${subURL}/Calendar/${id}/`,
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
          const res = await axios.get(`${subURL}/Calendar/`);
          // console.log(res.data);
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
        const itemData = item.titlee
          ? item.titlee.toUpperCase()
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

  function radioBtnHandler(nextValue) {
    setValue(nextValue);
    console.log(value);
  }
  function onePressed() {
    console.log("one");
  }

  function twoPressed() {
    console.log("two");
  }

  function allCheckedHanlder() {
    //setAll(isChecked:)
    setAll(true);
  }

  function adminCheckedHanlder(event) {
    if (event.target.checked) {
      console.log("checked");
    } else {
      console.log("unchecked");
    }
  }

  function teacherCheckedHanlder() {
    setTeacher(true);
  }

  function parentCheckedHanlder() {
    setParent(true);
  }
  async function fetchUser() {
    USERNAME = await AsyncStorage.getItem("UserName");
    // console.log("this is the username in calendar", USERNAME);
    if (USERNAME !== null) {
      setUser(USERNAME);
    }
  }
  fetchUser();

  async function fetchToken() {
    TOKEN = await AsyncStorage.getItem("token");
    console.log("this is the token in calendar", TOKEN);
    if (TOKEN !== null) {
      setToken(TOKEN);
    }
  }
  fetchToken();

  function allCheckHandler(){
      setChecked(!checked);
      setTeacherChecked(!teacherChecked);
      setAdminChecked(!adminChecked);
      setParentChecked(!parentChecked);
      if (!checked) {
        console.log("check");
      } else {
        console.log("uncheck");
      }
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
            <BgButton onPress={showCalendarForm} style={forCalendarList}>
              Add Event
            </BgButton>

            <BgButton onPress={showCalendar} style={forCalendarForm}>
              Show Event
            </BgButton>
          </View>
        </Animated.View>
      )}
      {showForm && (
        <>
          <ScrollView style={{ backgroundColor: "white" }}>
            <View style={styles.inputForm}>
              <View style={label ? styles.test : styles.testSuccess}>
                <Text
                  style={[
                    btn
                      ? styles.submitLabel
                      : titleInputIsInValid
                      ? styles.errorLabel
                      : styles.normalLabel,
                  ]}
                >
                  Title
                </Text>
              </View>
              <Input
                // keyboardType="number-pad"
                // placeholder="Title"
                onChangeText={titleChangeHandler}
                blur={titleBlurHandler}
                onFocus={onFocusTitleHandler}
                value={title}
                onSubmitEditing={Keyboard.dismiss}
                style={
                  isTitleFocused
                    ? styles.focusStyle
                    : titleInputIsInValid && styles.errorBorderColor
                }
              />
              {titleInputIsInValid && (
                <Text style={styles.commonErrorMsg}>Enter the title</Text>
              )}
              <View
                style={[
                  !titleInputIsInValid
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
                      : descriptionInputIsInValid
                      ? styles.errorLabel
                      : styles.normalLabel,
                  ]}
                >
                  Description
                </Text>
              </View>
              <Input
                // placeholder="Description"
                onChangeText={descriptionChangeHandler}
                blur={descriptionBlurHandler}
                onFocus={onFocusDescHandler}
                value={description}
                onSubmitEditing={Keyboard.dismiss}
                style={
                  isDescFocused
                    ? styles.focusStyle
                    : descriptionInputIsInValid && styles.errorBorderColor
                }
              />
              {descriptionInputIsInValid && (
                <Text style={styles.commonErrorMsg}>Enter description</Text>
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
                      //  minimumDate={fromDate}
                    />
                  )}
                </View>
              </View>
              <View style={styles.selectDropDownStyle}>
                <View style={{ flex: 0.5,left:'3%'}}>
                  <Text style={[styles.labelStyle]}>Send Notification to</Text>
                </View>
                <View style={[{flex:1}, {
                  flexDirection: "row"
                }]}>
                  <View style={{ flex:1 }} >
                  <View style={[{flex:1}, {
                  flexDirection: "row",marginLeft:'10%',marginTop:'3%'
                }]}>
                  <View style={{ flex: 0.3,alignItems:'center' }} >
                    <Text style={[styles.labelStyle,{marginTop:5}]}>All</Text>
                  </View>
                  <View style={{ flex: 0.1 }} >
                    <Checkbox
                        status={checked ? "checked" : "unchecked"}
                        onPress={allCheckHandler}
                        
                        color={"green"}
                        uncheckColor={"red"}
                      />
                  </View>
                </View>

                <View style={[{flex:1}, {
                  flexDirection: "row",marginLeft:'10%',marginTop:'3%'
                }]}>
                  <View style={{ flex: 0.5,alignItems:'center' }} >
                    <Text style={styles.labelStyle}>Admin</Text>
                  </View>
                  <View style={{ flex: 0.1,bottom:'2.3%' }} >
                    <Checkbox
                      status={adminChecked ? "checked" : "unchecked"}
                      onPress={() => {
                        setAdminChecked(!adminChecked);
                        if (!adminChecked) {
                          console.log("check");
                        } else {
                          console.log("uncheck");
                        }
                      }}
                      color={"green"}
                      uncheckColor={"red"}
                    />
                  </View>
                </View>
                  </View>
                  <View style={{ flex: 1 ,marginRight:'30%'}} >
                  <View style={[{flex:1}, {
                  flexDirection: "row",marginTop:'3%'
                }]}>
                  <View style={{ flex: 0.6,alignItems:'center' }} >
                    <Text style={[styles.labelStyle,{marginTop:5}]}>Teacher</Text>
                  </View>
                  <View style={{ flex: 0.1 }} >
                    <Checkbox
                      status={teacherChecked ? "checked" : "unchecked"}
                      onPress={() => {
                        setTeacherChecked(!teacherChecked);
                        if (!teacherChecked) {
                          console.log("check");
                        } else {
                          console.log("uncheck");
                        }
                      }}
                      color={"green"}
                      uncheckColor={"red"}
                    />
                  </View>
                </View>

                <View style={[{flex:1}, {
                  flexDirection: "row",marginTop:'3%'
                }]}>
                  <View style={{ flex: 0.6,alignItems:'center' }} >
                    <Text style={styles.labelStyle}>Parent</Text>
                  </View>
                  <View style={{ flex: 0.1,bottom:'2.3%' }} >
                    <Checkbox
                      status={parentChecked ? "checked" : "unchecked"}
                      onPress={() => {
                        setParentChecked(!parentChecked);
                        if (!parentChecked) {
                          console.log("check");
                        } else {
                          console.log("uncheck");
                        }
                      }}
                      color={"green"}
                      uncheckColor={"red"}
                    />
                  </View>
                </View>
                  </View>
                </View>
                
                
              </View>
              {!isEdit && (
                <View style={styles.btnSubmit}>
                  <Button onPress={buttonPressedHandler}>Add Event</Button>
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
          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 1 }}>
              <TeachersHome />
            </View>
          )}
        </>
      )}

      {showList && (
        <View
          style={[
            { backgroundColor: "white" },
            //    { transform: [{ translateY: translateY }] },
            // { elevation: 4, zIndex: 100 },
          ]}
        >
          <SearchBar
            // style={
            //   keyboardStatus == "Keyboard Shown"
            //     ? styles.upSearch
            //     : styles.searchBar
            // }
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
      )}
      {showList && (
        <View
          style={[
            { flex: 1 },
            { flexDirection: "column", backgroundColor: "white" },
          ]}
        >
          <View style={{ flex: 8, bottom: 10 }}>
            <ScrollView
              // onScroll={(e) => {
              //   scrollY.setValue(e.nativeEvent.contentOffset.y);
              // }}
              scrollEventThrottle={25}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
            >
              <View style={styles.root}>
                {loading ? (
                  <HStack space={8} justifyContent="center" alignItems="center">
                    <ActivityIndicator
                      size={40}
                      visible={loading}
                      textContent={"Loading..."}
                      textStyle={styles.spinnerTextStyle}
                    />
                  </HStack>
                ) : (
                  filteredData.map((filteredData, key) => (
                    <>
                      <View>
                        <Card
                          // key={key}
                          style={{
                            marginVertical: 15,
                            marginHorizontal: 20,
                            elevation: 5,
                            borderRadius: 10,
                            paddingBottom: 20,
                          }}
                        >
                          <Card.Content style={{ margin: 5, marginTop: 0 }}>
                            <Text style={styles.eventName}>
                              {filteredData.titlee}
                            </Text>

                            <View style={[{ flexDirection: "row" }]}>
                              <View style={{ flex: 2, marginLeft: 5 }}>
                                <Ionicons
                                  name="calendar"
                                  size={25}
                                  color="#D4AC0D"
                                  style={{
                                    position: "absolute",
                                    left: 5,
                                  }}
                                />
                                <Text style={styles.cardTextStyle}>
                                  Start Date
                                </Text>
                              </View>
                              <View style={{ flex: 2 }}>
                                <View style={{ flex: 2 }}>
                                  <Ionicons
                                    name="calendar"
                                    size={25}
                                    color="#D4AC0D"
                                    style={{
                                      position: "absolute",
                                      left: 5,
                                    }}
                                  />
                                  <Text style={styles.cardTextStyle}>
                                    End Date
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View style={[{ flexDirection: "row" }]}>
                              <View style={{ flex: 2, left: 45 }}>
                                <Text
                                  style={{
                                    fontSize: deviceWidth < 370 ? 13 : 15,
                                    fontFamily: "HindSemiBold",
                                    color: "grey",
                                  }}
                                >
                                  {moment(filteredData.startdate).format(
                                    "DD/MM/YYYY"
                                  )}
                                </Text>
                              </View>
                              <View 
                                style={{
                                   flex: 2, 
                                   left: filteredData.created_by == USERNAME ? 120 : 36
                                  }}>
                                <Text
                                  style={{
                                    fontSize: deviceWidth < 370 ? 13 : 15,
                                    fontFamily: "HindSemiBold",
                                    color: "grey",
                                  }}
                                >
                                  {moment(filteredData.enddate).format(
                                    "DD/MM/YYYY"
                                  )}
                                </Text>
                              </View>

                              {filteredData.created_by == USERNAME && (
                                <View
                                  style={{
                                    flex: 2,
                                    left: deviceWidth < 370 ? 100 : 110,
                                    bottom: -50,
                                  }}
                                >
                                  <Ionicons
                                    name="md-pencil-sharp"
                                    size={24}
                                    color="green"
                                    onPress={() => editItem(filteredData.id)}
                                  />
                                </View>
                              )}

                              {filteredData.created_by == USERNAME && (
                                <View
                                  style={{
                                    flex: 2,
                                    left: 60,
                                    bottom: -50,
                                  }}
                                >
                                  <Ionicons
                                    name="trash"
                                    size={24}
                                    color="red"
                                    onPress={() => deleteItem(filteredData.id)}
                                  />
                                </View>
                              )}
                            </View>
                            <View style={[{ flexDirection: "row", flex: 1 }]}>
                              <View style={{ flex: 2, left: -20, top: 5 }}>
                                <Text
                                  style={[
                                    styles.cardTextStyle,
                                    { fontWeight: "bold" },
                                  ]}
                                >
                                  Description:
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 2,
                                  left: deviceWidth < 370 ? -20 : -40,
                                  top: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: "HindSemiBold",
                                    color: "grey",
                                  }}
                                >
                                  {filteredData.description}
                                </Text>
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
          </View>
          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 1 }}>
              <TeachersHome />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default TeachersCalendar;
const deviceWidth = Dimensions.get("window").width;
const deviceHieght = Dimensions.get("window").height;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "white",
  },
  labelInput: {
    color: "#673AB7",
    fontSize: 20,
  },
  formInput: {
    borderBottomWidth: 1.5,
    marginLeft: 20,
    borderColor: "#333",
  },
  input: {
    borderWidth: 0,
  },
  eventName: {
    fontFamily: "HindSemiBold",
    fontSize: 18,
    margin: 10,
    marginTop: 0,
  },
  home: {
    marginTop: 29,
  },
  root: {
    // backgroundColor: "#EBECFO",
    backgroundColor: "white",
    height: "100%",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
    backgroundColor: "white",
    height: "200%",
  },
  errorBorderColor: {
    borderColor: "red",
  },
  errorBorderColorDate: {
    borderBottomColor: "red",
  },

  btnSubmit: {
    marginTop: deviceHieght < 600 ? "5%" : "10%",
    width: "50%",
    marginLeft: 180,
  },
  space: {
    width: 20,
    height: 20,
  },
  th: {
    padding: 5,

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
  flexStyleCol: {
    flex: 1,
    flexDirection: "column",
  },
  tableCell: {
    width: 50,
    //  fontFamily: "Montserrat_600SemiBold",
    left: 10,

    maxWidth: 200,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    whiteSpace: "pre-line",
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 20,
    // backgroundColor: "white",
    backgroundColor: "#F0F3F4",

    // height:deviceWidth < 370 ? "6%" : "6%",
  },
  errorLabel: {
    color: "red",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
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
  submitLabel: {
    color: "grey",
    color: "#AEB6BF",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
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
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
    left: 35,
  },
  focusStyle: {
    borderColor: "blue",
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
    top: deviceWidth < 370 ? 90 : 115,
    left: deviceWidth < 370 ? 40 : 50,
  },
  descriptionDownExtra: {
    position: "absolute",
    top: deviceWidth < 370 ? 115 : 137,
    left: 50,
  },
  commonErrorMsg: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 16 : 18,
    top: deviceHieght > 800 ? -3 : 1,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  selectDropDownStyle: {
    width: "100%",
    top: "2%",
    left: "2%",
    flexDirection: "column",
  },
  labelStyle: {
    fontFamily: "HindRegular",
    fontSize: 18,
    // marginTop: 10,
  },
  errorSelectedColor: {
    borderColor: "red",
  },
});

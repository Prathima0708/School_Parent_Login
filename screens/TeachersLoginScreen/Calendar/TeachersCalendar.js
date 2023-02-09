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
  Platform,
} from "react-native";
import SelectList from "react-native-dropdown-select-list";
import * as Notifications from "expo-notifications";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { Checkbox } from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";

import BgButton from "../../../components/UI/BgButton";
import SearchBar from "react-native-dynamic-search-bar";
import { Ionicons } from "@expo/vector-icons";
import TeachersHome from "../BottomTab/TeachersHome";
import Input from "../../../components/UI/Input";

import moment from "moment";

import { Card } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import UnderlinedInput from "../../../components/UI/UnderlinedInput";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  HStack,
  IconButton,
  Radio,
  Button as NativeButton,
  Text as NativeText,
  Icon,
  Modal,
  Badge,
} from "native-base";
import { subURL } from "../../../components/utils/URL's";
import CalendarPicker from "react-native-calendar-picker";
import BackButton from "../../../components/UI/BackButton";

export var ID;
var FROMDATE, TODATE;
var USERNAME, TOKEN;
var Group, NotificationId;
const TeachersCalendar = () => {
  const [checked, setChecked] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [teacherChecked, setTeacherChecked] = useState(false);
  const [parentChecked, setParentChecked] = useState(false);

  const [selectedTouched, setSelectedTouched] = useState(false);
  const checkedIsInvalid =
    !adminChecked && !parentChecked && !teacherChecked && !checked;

  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  const [test, setTest] = useState(false);
  const [value, setValue] = useState("");
  const [isSelected, setSelection] = useState(false);

  const navigation = useNavigation();

  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);

  const [placementCard, setPlacementCard] = useState(undefined);
  const [openCardModal, setOpenCardModal] = useState(false);

  const [listActive, setListActive] = useState(true);
  const [calendarActive, setCalendarActive] = useState(false);

  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, 100);
  const [newData, setnewData] = useState([]);
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
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [label, setLabel] = useState(false);
  const [descriptionLabel, setDescriptionLabel] = useState(false);
  const [startDateLabel, setstartDateLabel] = useState(false);
  const [endDateLabel, setendDateLabel] = useState(false);
  const [showSpeacificData, setShowSpeacificData] = useState(false);

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescFocused, setIsDescFocused] = useState(false);
  const [isFromDateFocused, setIsFromDateFocused] = useState(false);
  const [isToDateFocused, setIsToDateFocused] = useState(false);
  const [calendarViewBtnPressed, setCalendarViewBtnPressed] = useState(false);
  const [btn, setBtn] = useState(false);
  const [receivedNotification, setReceivedNotification] = useState([]);

  const [forCalendarList, setForCalendarList] = useState({
    backgroundColor: "#1E84A4",
    color: "white",
    borderRadius: 5,
  });
  const [forCalendarForm, setForCalendarForm] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 5,
  });
  const [listBtnPressed, setListBtnPressed] = useState(false);
  const [updateBtnPressed, setUpdateBtnPressed] = useState(false);

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
  const [customDatesStyles, setCustomDatesStyles] = useState([]);
  const [specificData, setSpecificData] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [filteredlist, setFilteredList] = useState([]);

  const [showInitialBtn, setShowInitialBtn] = useState(true);
  const [showToggleBtn, setShowToggleBtn] = useState(false);
  const [showListCalOptionBtn, setShowListCalOptionBtn] = useState(false);
  const [backAndSearchBar, setBackAndSearchBar] = useState(false);
  const [loading, setLoading] = useState(false);

  const [anyCheck, setAnyChecked] = useState(true);
  let i = 0;
  const [saveYear, setSaveYear] = useState([]);
  const [group, setGroup] = useState("");
  const [notificationId, setNotificationId] = useState();
  const [viewOnlyGrp, setViewOnlyGrp] = useState("");
  const [badge, setBadge] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Calendar/`);

        // const filtredRes = res.data.filter((event) => {
        //   const viewOnly = event.viewOnly;
        //   return (
        //     viewOnly.includes("staff") &&
        //     (viewOnly === "admin,parents,staff" || viewOnly === "parents,staff")
        //   );
        // });

        const filtredRes = res.data.filter((event) =>
          event.viewOnly.includes("staff")
        );

        console.log(filtredRes);

        const keys = Object.keys(res.data[0]);

        setData(res.data);
        setFilteredData(res.data);
        //console.log(res.data);
        setCustomDatesStyles(
          res.data.map((d) => ({
            date: d.startdate,
            style: { backgroundColor: "#00B8AC" },
            textStyle: { color: "white" },
            containerStyle: [],
          }))
        );
        var newArray = res.data.map((item) => {
          return {
            key: item.id,

            value: moment(res.data.startdate).format("YYYY"),
          };
        });

        setSaveYear(newArray);
        let test = 0;

        if (test == value) {
          SetIsSame(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getGroup() {
      Group = await AsyncStorage.getItem("datagroup");
      // console.log(Group);
      setGroup(Group);
    }
    getGroup();
  }, []);

  async function updateDataTeacher() {
    console.log("notification id is", notificationId);
    try {
      const response = await axios.patch(
        `${subURL}/Calendar/${notificationId}/`,
        {
          isNotified: true,
        }
      );
      console.log(response.data);
      setBadge(true);

      // const getres = await axios.get(`${subURL}/Calendar/${notificationId}/`);
      // setReceivedNotification(getres.data);

      setSpecificData(response.data);
      //  console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateDataParent() {
    console.log("notification id is", notificationId);
    try {
      const response = await axios.patch(
        `${subURL}/Calendar/${notificationId}/`,
        {
          isNotified: true,
        }
      );
      console.log(response.data);
      setBadge(true);

      // const getres = await axios.get(`${subURL}/Calendar/${notificationId}/`);
      // setReceivedNotification(getres.data);

      setSpecificData(response.data);
      //  console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      async (notification) => {
        console.log(notification.request.content.data.id);
        console.log(notification.request.content.data.viewOnly);
        //  NotificationId = notification.request.content.data.id;
        setNotificationId(notification.request.content.data.id);
        setViewOnlyGrp(notification.request.content.data.viewOnly);

        console.log("Notification received");
        setOpenCardModal(false);

        //  console.log("id is", specificData.id);
      }
    );
    updateDataTeacher();
    // if (viewOnlyGrp == "parents") {
    //   updateDataParent();
    // }

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response.notification.request);
        console.log("group is", group);
        if (group == "staff"|| group=='admin') {
          navigation.navigate("TeachersNoticeBoard");
        } else {
          navigation.navigate("NoticeBoard");
        }
      }
    );
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, [notificationId, viewOnlyGrp]);

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

  // useLayoutEffect(() => {

  //   if (showList) {
  //     navigation.setOptions({ headerShown: false });
  //   }else if(calendarViewBtnPressed){
  //     navigation.setOptions({ headerShown: false });
  //   }
  //   else {
  //     navigation.setOptions({ headerShown: true });
  //   }

  // }, [showList,calendarViewBtnPressed]);

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

  function frmDateHandler(enteredValue) {
    setFromDate(enteredValue);
    setenteredfrmdate(enteredValue);
  }
  function toDateHandler(enteredValue) {
    setToDate(enteredValue);
    setenteredtodate(enteredValue);
  }

  function updateHandler() {
    //setShowInitialBtn(true);
    var viewOnlyData = [];

    if (adminChecked) {
      viewOnlyData.push("admin");
    }

    if (teacherChecked) {
      viewOnlyData.push("staff");
    }

    if (parentChecked) {
      viewOnlyData.push("parents");
    }
    setUpdateBtnPressed(true);

    const FormData = {
      description: description,
      viewOnly: viewOnlyData.toString(),
      startdate: FROMDATE,
      enddate: TODATE,
      titlee: title,
      viewOnly: viewOnlyData.toString(),
    };

    if (
      !enteredTitleIsValid ||
      !enteredDescriptionIsValid ||
      checkedIsInvalid
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
            `${subURL}/Calendar/${ID}/`,
            dataForm,
            {
              headers: headers,
            }
          );
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
            setShowListCalOptionBtn(false);
            //setShowInitialBtn(false);
            setShowInitialBtn(true);
            setShowToggleBtn(true);
            setShowList(true);
            setShowForm(false);
            //  setShowList(true);
          },
        },
      ]);

      setEnteredDescription("");
      setEnteredTitle("");
      setFromText("");
      setToText("");
      setShowForm(false);
      setShowList(true);
      setBackAndSearchBar(true);
      setShowInitialBtn(true);
      setForCalendarList({
        backgroundColor: "#F4F6F6",
        color: "black",
        borderRadius: 5,
      });
      setForCalendarForm({
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
    }, 3000);
    setBtn(true);

    var viewOnlyData = [];

    if (adminChecked) {
      viewOnlyData.push("admin");
    }

    if (teacherChecked) {
      viewOnlyData.push("staff");
    }

    if (parentChecked) {
      viewOnlyData.push("parents");
    }

    const FormData = {
      description: description,
      created_by: user,

      startdate: FROMDATE,
      enddate: TODATE,
      titlee: title,
      viewOnly: viewOnlyData.toString(),
    };

    const formIsValid =
      enteredTitleIsValid &&
      enteredDescriptionIsValid &&
      enteredFromDateIsValid &&
      enteredtoDateIsValid;

    setEnteredTitleTouched(true);
    setEnteredDescriptionTouched(true);
    setSelectedTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);

    if (!enteredTitleIsValid) {
      return;
    }
    if (checkedIsInvalid) {
      return;
    }
    if (!enteredDescriptionIsValid) {
      return;
    }

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
        // if (filteredlist.length > 0) {

        //   Alert.alert("Data already exists", "please enter a new data", [
        //     {
        //       text: "OK",

        //       style: "cancel",
        //     },
        //   ]);
        // } else {

        async function storeData() {
          try {
            let headers = {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: "Token " + `${token}`,
            };
            const dataForm = FormData;

            const resLogin = await axios.post(`${subURL}/Calendar/`, dataForm, {
              headers: headers,
            });
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

        setEnteredFromDateTouched(false);
        setEnteredtoDateTouched(false);

        setForCalendarList({
          backgroundColor: "#F4F6F6",
          color: "black",
          borderRadius: 5,
        });
        setForCalendarForm({
          color: "white",
          backgroundColor: "#1E84A4",
          borderRadius: 5,
        });

        setShowForm(false);
        setShowList(true);
        // }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }

  function titleBlurHandler() {
    setEnteredTitleTouched(true);
    setIsTitleFocused(false);
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
      backgroundColor: "#1E84A4",
      color: "white",
      borderRadius: 5,
    });
    setForCalendarForm({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 5,
    });
    setShowForm(true);
    setShowList(false);
    setEnteredDescriptionTouched(false);
    setEnteredTitleTouched(false);
    setEnteredtoDateTouched(false);
    setEnteredFromDateTouched(false);
    setSelectedTouched(false);
    setIsEdit(false);

    setEnteredDescription("");
    setEnteredTitle("");
    setFromText("");
    setToText("");

    setLabel(false);
    setDescriptionLabel(false);
    setIsTitleFocused(false);
    setIsDescFocused(false);
    setShowToggleBtn(false);
    setChecked(false);
    setAdminChecked(false);
    setTeacherChecked(false);
    setParentChecked(false);
    //setCalendarViewBtnPressed(false);
    setShowListCalOptionBtn(false);
    setShowSearchBar(false);
    setCalendarViewBtnPressed(false);
  }
  function showCalendar() {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Calendar/`);

        setData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    setForCalendarForm({
      color: "white",
      backgroundColor: "#1E84A4",
      borderRadius: 5,
    });
    setForCalendarList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 5,
    });
    setShowForm(false);
    setShowList(true);
    setShowToggleBtn(true);
    setCalendarViewBtnPressed(false);
    //setAnyChecked(false);
    setListActive(true);
    setCalendarActive(false);
    // setShowListCalOptionBtn(true);
    //setShowSearchBar(true)
  }

  function editItem(id) {
    setSelectedTouched(false);
    setShowInitialBtn(false);
    setLabel(true);
    setDescriptionLabel(true);
    setCalendarViewBtnPressed(false);
    ID = id;

    const filteredDummuyData = data.find((data) => data.id == id);
    console.log(filteredDummuyData);
    setnewData(filteredDummuyData);
    setEnteredDescription(filteredDummuyData.description);

    setFromText(moment(filteredDummuyData.startdate).format("DD/MM/YYYY"));
    setToText(moment(filteredDummuyData.enddate).format("DD/MM/YYYY"));
    setEnteredTitle(filteredDummuyData.titlee);

    if (filteredDummuyData.viewOnly === "staff") {
      setTeacherChecked(!teacherChecked);
      // setParentChecked(parentChecked);
      // setAdminChecked(adminChecked);
      // setChecked(checked);
    } else if (filteredDummuyData.viewOnly === "parents") {
      setParentChecked(!parentChecked);
      // setTeacherChecked(teacherChecked);

      // setAdminChecked(adminChecked);
      // setChecked(checked);
    } else if (filteredDummuyData.viewOnly === "admin") {
      setAdminChecked(!adminChecked);
      // setTeacherChecked(teacherChecked);
      // setParentChecked(parentChecked);

      // setChecked(checked);
    } else {
      setChecked(!checked);
      setTeacherChecked(!teacherChecked);
      setParentChecked(!parentChecked);
      setAdminChecked(!adminChecked);
    }
    // setAdminChecked(filteredDummuyData.viewOnly === "admin");
    // setTeacherChecked(filteredDummuyData.viewOnly === "teacher");
    // setParentChecked(filteredDummuyData.viewOnly === "parent");

    setForCalendarList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 5,
    });
    setForCalendarForm({
      color: "white",
      backgroundColor: "#1E84A4",
      borderRadius: 5,
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

        const resLogin = await axios.delete(
          `${subURL}/Calendar/${id}/`,

          {
            headers: headers,
          }
        );
      } catch (error) {
        console.log(error);
      }
      async function fetchData() {
        try {
          const res = await axios.get(`${subURL}/Calendar/`);

          setFilteredData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }

  const searchFilter = (text) => {
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
    setShowToggleBtn(true);
    setShowList(true);
    setShowForm(false);
    setAdminChecked(adminChecked);
    setParentChecked(parentChecked);
    setTeacherChecked(teacherChecked);
    setChecked(checked);
  }

  async function fetchUser() {
    USERNAME = await AsyncStorage.getItem("UserName");

    if (USERNAME !== null) {
      setUser(USERNAME);
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

  function allCheckHandler() {
    //setTest(true);

    setChecked(!checked);
    setTeacherChecked(!teacherChecked);
    setAdminChecked(!adminChecked);
    setParentChecked(!parentChecked);
  }

  function linkPressedHandler() {
    setShowForm(true);
    setShowList(false);
    setShowToggleBtn(false);

    setForCalendarList({
      color: "white",
      backgroundColor: "#1E84A4",
      borderRadius: 5,
    });
    setForCalendarForm({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 5,
    });
  }

  function calendarViewPressHandler() {
    setCalendarViewBtnPressed(true);
    setShowList(false);
    setCalendarActive(true);
    setListActive(false);
  }

  function listViewPressHandler() {
    setShowList(true);
    setListActive(true);
    setCalendarActive(false);
    setCalendarViewBtnPressed(false);
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Calendar/`);

        setData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  function handleDayPress(day) {
    // const filteredData = data.
    // filter((data) =>
    //   moment(data.startdate).format("YYYY-MM-DD") == moment(day).format("YYYY-MM-DD")
    // );
    // setFilteredData(filteredData)

    let allHavePropertiesWithValues = data.some(
      (obj) =>
        moment(obj.startdate).format("YYYY-MM-DD") ===
        moment(day).format("YYYY-MM-DD")
    );

    let filteredList = data.filter(
      (obj) =>
        moment(obj.startdate).format("YYYY-MM-DD") ===
        moment(day).format("YYYY-MM-DD")
    );

    if (filteredList === undefined) {
      return;
    } else {
      // setEventTitle(filteredList.titlee);
      // setEventStartDate(filteredList.startdate);
      // setEventEndDate(filteredList.enddate);
      // setEventDescription(filteredList.description);
      setFilteredList(filteredList);
    }

    if (allHavePropertiesWithValues) {
      setOpen(true);
      setPlacement(placement);
    } else {
      setOpen(false);
    }
  }

  function backCalendarBtnHandler() {
    setShowList(false);
    setListBtnPressed(false);
    setShowInitialBtn(true);
    setShowListCalOptionBtn(true);
    setCalendarViewBtnPressed(false);
  }
  function backButtonHandler() {
    setShowList(false);
    setShowInitialBtn(true);
    setListBtnPressed(false);
    setShowListCalOptionBtn(true);
  }

  function cardPressedHandler(filteredData) {
    setSpecificData(filteredData);

    setOpenCardModal(true);
    setPlacementCard(placementCard);
  }

  async function sendPushNotificationHanlder() {
    console.log(specificData.id);
    setNotificationId(specificData.id);

    const today = new Date();
    console.log(today);
    const sendAlert =
      moment(specificData.startdate).format("DD-MM-YYYY") >=
      moment(today).format("DD-MM-YYYY");
    // const sendAlert =
    //   new Date(moment(specificData.startdate).format("DD-MM-YYYY")) >=
    //   moment(today).format("DD-MM-YYYY")
    //    ||
    // new Date(
    //   moment(specificData.startdate).format("DD-MM-YYYY")
    // ).toDateString() === moment(today).format("DD-MM-YYYY").toDateString();
    console.log(sendAlert);

    if (sendAlert == false) {
      Alert.alert("Event already occured");
      return;
    }

    const response = await axios.get(
      `${subURL}/NotificationByGroup/${specificData.viewOnly}`
    );
    console.log("************");

    const filteredData = response.data.filter(
      (item) => item.user_id.groups[0].name === specificData.viewOnly
    );
    const tokens = response.data;
    // console.log(tokens);
    // //  console.log(filteredData[0].user_id.groups[0].name);

    // // Loop through the array of tokens and send a notification to each one
    // // tokens.forEach(async (token) => {
    // //   //  console.log("token", token.notification_token);
    // //   // Send the notification to the current token
    // //   await fetch("https://exp.host/--/api/v2/push/send", {
    // //     method: "POST",
    // //     headers: {
    // //       "Content-Type": "application/json",
    // //     },

    // //     body: JSON.stringify({
    // //       to: token.notification_token,

    // //       title: titlee,
    // //       body: description,
    // //     }),
    // //   });
    // // });

    tokens.forEach(async (token) => {
      // Send the notification to the current token

      //  console.log(filteredData);
      await axios.post(
        "https://exp.host/--/api/v2/push/send",
        {
          to: token.notification_token,
          title: specificData.titlee,
          body: specificData.description,

          data: {
            id: specificData.id || notificationId,
            viewOnly: specificData.viewOnly,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

    // try {
    //   const response = await axios.put(
    //     `${subURL}/Calendar/${specificData.id}/`,
    //     {
    //       isNotified: true,
    //     }
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  }

  return (
    <>
      {showInitialBtn && (
        <>
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
          {showToggleBtn && (
            <View
              style={[
                {
                  // Try setting `flexDirection` to `"row"`.
                  flex: 0.09,
                  flexDirection: "row",
                  backgroundColor: "white",
                  paddingBottom: "5%",
                },
              ]}
            >
              <View style={styles.space} />
              <View style={{ flex: 0.5 }}>
                {/* <IconButton
                    colorScheme="blue"
                    onPress={listViewPressHandler}
                    variant="subtle"
                    _icon={{
                      as: Ionicons,
                      name: "list",
                  }}/> */}
              </View>
              <View style={styles.spaceBetween} />
              <View style={{ flex: 0.5 }}>
                {/* <IconButton
                    colorScheme="blue"
                    onPress={listViewPressHandler}
                    variant="subtle"
                    _icon={{
                      as: Ionicons,
                      name: "list",
                  }}/> */}
              </View>
              <View style={{ flex: 0.5 }}>
                <IconButton
                  colorScheme={listActive ? "blue" : "coolGray"}
                  onPress={listViewPressHandler}
                  variant="subtle"
                  _icon={{
                    as: Ionicons,
                    name: "list",
                  }}
                />
              </View>
              <View style={styles.space} />
              <View style={{ flex: 0.5 }}>
                <IconButton
                  colorScheme={calendarActive ? "blue" : "coolGray"}
                  onPress={calendarViewPressHandler}
                  variant="subtle"
                  _icon={{
                    as: Ionicons,
                    name: "calendar",
                  }}
                />
              </View>
              <View style={styles.space} />
            </View>
          )}
        </>
      )}

      {/* {showListCalOptionBtn && (
        <View
          style={[
            { flex: 1 },
            { flexDirection: "column", backgroundColor: "white" },
          ]}
        >
          <View style={{ flex: 1, marginHorizontal: "20%", top: "10%" }}>
            <Pressable onPress={listViewPressHandler}>
              <Card style={styles.cardStyle}>
                <Card.Content style={{ margin: 1, marginTop: 0 }}>
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      List
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      View
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </Pressable>
          </View>

          <View style={{ flex: 1, marginHorizontal: "20%" }}>
            <Pressable onPress={calendarViewPressHandler}>
              <Card style={styles.cardStyle}>
                <Card.Content style={{ margin: 1, marginTop: 0 }}>
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      Calendar
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      View
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </Pressable>
          </View>
          <View style={{ flex: 0.2 }}>
            <TeachersHome />
          </View>
        </View>
      )} */}
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
                    value={toText || todate}
                    placeholder="  End date"
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
              <View style={styles.selectDropDownStyle}>
                <View style={{ flex: 0.5, left: "3%" }}>
                  <Text style={[styles.labelStyle]}>
                    Send Notification to :
                  </Text>
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
                          marginLeft: "10%",
                          marginTop: "3%",
                        },
                      ]}
                    >
                      <View style={{ flex: 0.3 }}>
                        <Checkbox
                          status={
                            isEdit
                              ? newData.viewOnly === "admin,staff,parents"
                                ? "checked"
                                : "unchecked"
                              : checked
                              ? "checked"
                              : "unchecked"
                          }
                          //status={checked ? "checked" : "unchecked"}
                          onPress={allCheckHandler}
                          color={"green"}
                          uncheckColor={"red"}
                        />
                      </View>
                      <View style={{ flex: 0.3 }}>
                        <Text style={[styles.labelStyle, { marginTop: 5 }]}>
                          All
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        { flex: 1 },
                        {
                          flexDirection: "row",
                          marginLeft: "10%",
                          marginTop: "3%",
                        },
                      ]}
                    >
                      <View style={{ flex: 0.3 }}>
                        <Checkbox
                          //status={adminChecked ? "checked" : "unchecked"}
                          status={
                            isEdit
                              ? newData.viewOnly === "admin" ||
                                newData.viewOnly === "admin,staff,parents"
                                ? "checked"
                                : "unchecked"
                              : adminChecked
                              ? "checked"
                              : "unchecked"
                          }
                          onPress={() => {
                            setAdminChecked(!adminChecked);
                            //  setTest(true);
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
                      <View style={{ flex: 0.5, top: "5%" }}>
                        <Text style={styles.labelStyle}>Admin</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ flex: 1, marginRight: "30%" }}>
                    <View
                      style={[
                        { flex: 1 },
                        {
                          flexDirection: "row",
                          marginTop: "3%",
                        },
                      ]}
                    >
                      <View style={{ flex: 0.3 }}>
                        <Checkbox
                          //status={ teacherChecked ? "checked" : "unchecked"}
                          status={
                            isEdit
                              ? newData.viewOnly === "staff" ||
                                newData.viewOnly === "admin,staff,parents"
                                ? "checked"
                                : "unchecked"
                              : teacherChecked
                              ? "checked"
                              : "unchecked"
                          }
                          onPress={() => {
                            setTeacherChecked(!teacherChecked);
                            // setTest(true);
                          }}
                          color={"green"}
                          uncheckColor={"red"}
                        />
                      </View>
                      <View style={{ flex: 0.6 }}>
                        <Text style={[styles.labelStyle, { marginTop: 5 }]}>
                          Teacher
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        { flex: 1 },
                        {
                          flexDirection: "row",
                          marginTop: "3%",
                        },
                      ]}
                    >
                      <View style={{ flex: 0.3 }}>
                        <Checkbox
                          status={
                            isEdit
                              ? newData.viewOnly === "parents" ||
                                newData.viewOnly === "admin,staff,parents"
                                ? "checked"
                                : "unchecked"
                              : parentChecked
                              ? "checked"
                              : "unchecked"
                          }
                          onPress={() => {
                            setParentChecked(!parentChecked);
                            //  setTest(true);
                          }}
                          color={"green"}
                          uncheckColor={"red"}
                        />
                      </View>
                      <View style={{ flex: 0.6, top: "5%" }}>
                        <Text style={styles.labelStyle}>Parent</Text>
                      </View>
                    </View>
                  </View>
                </View>
                {checkedIsInvalid && selectedTouched && (
                  <Text style={styles.errorLabel}>
                    Please select atleast one
                  </Text>
                )}
              </View>
              {!isEdit && (
                <View style={[btn ? styles.btnSubmitNew : styles.btnSubmit]}>
                  <Button onPress={buttonPressedHandler}>Add Event</Button>
                </View>
              )}
              {isEdit && (
                <View
                  style={[
                    {
                      flex: 1,
                      flexDirection: "row",
                      marginTop: "30%",
                    },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Button onPress={cancelHandler}>Cancel</Button>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Button onPress={updateHandler}>Update</Button>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 0.3 }}>
              <TeachersHome />
            </View>
          )}
        </>
      )}

      {calendarViewBtnPressed && (
        <View
          style={[
            { flex: 1.7, flexDirection: "column", backgroundColor: "white" },
          ]}
        >
          <View style={{ flex: 1 }}>
            <CalendarPicker
              onDateChange={(day) => handleDayPress(day)}
              customDatesStyles={customDatesStyles}
              selectedDayStyle={{}}
              textStyle={{ fontFamily: "HindRegular" }}
            />
            <Modal
              isOpen={open}
              onClose={() => setOpen(false)}
              safeAreaTop={true}
              size="full"
            >
              <Modal.Content maxWidth="90%" minHeight="5%">
                {/* <Modal.Header
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  Events
                </Modal.Header> */}

                <Modal.Body>
                  {filteredlist &&
                    filteredlist.map((data) => (
                      <ScrollView>
                        <View
                          style={[
                            {
                              // Try setting `flexDirection` to `"row"`.
                              flex: 1,
                              flexDirection: "column",
                              borderBottomWidth:
                                filteredlist.length > 1 ? 1 : 0,
                              borderBottomColor: "grey",
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
                                  marginVertical: 10,
                                },
                              ]}
                            >
                              <View style={{ flex: 0.2, left: 0 }}>
                                <Text
                                  style={[styles.cardTextStyle, { left: 0 }]}
                                >
                                  Title :
                                </Text>
                              </View>
                              <View style={{ flex: 1 }}>
                                <Text style={[styles.textStyle, { left: 0 }]}>
                                  {data.titlee}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={{ flex: 1 }}>
                            <View
                              style={[
                                {
                                  // Try setting `flexDirection` to `"row"`.
                                  flex: 1,
                                  flexDirection: "row",
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
                                    },
                                  ]}
                                >
                                  <View style={{ flex: 0.7 }}>
                                    <Text
                                      style={[
                                        styles.cardTextStyle,
                                        { left: 0 },
                                      ]}
                                    >
                                      From :
                                    </Text>
                                  </View>
                                  <View style={{ flex: 1.1 }}>
                                    <Text
                                      style={[styles.textStyle, { left: 0 }]}
                                    >
                                      {moment(data.startdate).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{ flex: 1 }}>
                                <View
                                  style={[
                                    {
                                      // Try setting `flexDirection` to `"row"`.
                                      flex: 1,
                                      flexDirection: "row",
                                    },
                                  ]}
                                >
                                  <View style={{ flex: 0.3 }}>
                                    <Text
                                      style={[
                                        styles.cardTextStyle,
                                        { left: 0 },
                                      ]}
                                    >
                                      To :
                                    </Text>
                                  </View>
                                  <View style={{ flex: 1 }}>
                                    <Text
                                      style={[styles.textStyle, { left: 0 }]}
                                    >
                                      {moment(data.enddate).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View style={{ flex: 1, marginVertical: 10 }}>
                            <View
                              style={[
                                {
                                  // Try setting `flexDirection` to `"row"`.
                                  flex: 1,
                                  flexDirection: "row",
                                },
                              ]}
                            >
                              <View style={{ flex: 0.5 }}>
                                <Text
                                  style={[styles.cardTextStyle, { left: 0 }]}
                                >
                                  Description :
                                </Text>
                              </View>
                              <View style={{ flex: 1 }}>
                                <Text style={[styles.textStyle, { left: 0 }]}>
                                  {[data.description]}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        {/* <View style={styles.space} /> */}
                      </ScrollView>
                    ))}
                </Modal.Body>

                <Modal.Footer>
                  <NativeButton.Group space={2}>
                    <NativeButton
                      onPress={() => {
                        setOpen(false);
                      }}
                    >
                      Okay
                    </NativeButton>
                  </NativeButton.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
            <View style={{ flex: 1 }}>
              <TeachersHome />
            </View>
          </View>
        </View>
      )}

      {showList && (
        <View
          style={[
            { flex: 1, flexDirection: "column", backgroundColor: "white" },
          ]}
        >
          {/* {backAndSearchBar &&
          <View style={{flex: 0.1,paddingTop:20}} >
            <BackButton onPress={backButtonHandler} />
          </View>} */}
          <View style={{ flex: 1 }}>
            <SearchBar
              style={styles.searchBar}
              textInputStyle={{
                fontFamily: "HindRegular",
                fontSize: 18,
              }}
              placeholder="Search here"
              onChangeText={(text) => searchFilter(text)}
              value={searchText}
            />

            <View
              style={[
                { flex: 1 },
                { flexDirection: "column", backgroundColor: "white" },
              ]}
            >
              <View style={{ flex: 8, bottom: 13 }}>
                <ScrollView
                  scrollEventThrottle={25}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                  )}
                >
                  {filteredData.length <= 0 ? (
                    <View style={{ alignItems: "center", marginTop: "15%" }}>
                      <Text style={styles.msgText}>
                        No events found,
                        <Text
                          style={styles.linkText}
                          onPress={linkPressedHandler}
                        >
                          Start adding here
                        </Text>
                      </Text>
                    </View>
                  ) : (
                    <View style={[styles.root]}>
                      {loading ? (
                        <HStack
                          space={8}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <ActivityIndicator
                            size={40}
                            visible={loading}
                            textContent={"Loading..."}
                            textStyle={styles.spinnerTextStyle}
                          />
                        </HStack>
                      ) : (
                        filteredData &&
                        filteredData.map((filteredData, key) => (
                          <>
                            <View>
                              <Pressable
                                onPress={() => cardPressedHandler(filteredData)}
                              >
                                <Card
                                  style={{
                                    marginVertical: 15,
                                    marginHorizontal: 20,
                                    elevation: 5,
                                    borderRadius: 10,
                                    paddingBottom: 20,
                                    shadowColor: "black",
                                    shadowOpacity: 0.1,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 8,
                                    overflow:
                                      Platform.OS === "android"
                                        ? "hidden"
                                        : "visible",
                                  }}
                                >
                                  <Card.Content>
                                    <Text style={styles.eventName}>
                                      {filteredData.titlee}
                                    </Text>
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
                                          <View style={{ flex: 0.2 }}>
                                            <Ionicons
                                              name="calendar"
                                              size={25}
                                              color="#D4AC0D"
                                              style={{}}
                                            />
                                          </View>
                                          <View style={{ flex: 1 }}>
                                            <Text
                                              style={[
                                                styles.cardTextStyle,
                                                { left: 5 },
                                              ]}
                                            >
                                              Start Date
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
                                            <Text
                                              style={[
                                                styles.cardTextStyle,
                                                { left: 5 },
                                              ]}
                                            >
                                              End Date
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
                                              {moment(
                                                filteredData.startdate
                                              ).format("DD/MM/YYYY")}
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
                                              {moment(
                                                filteredData.enddate
                                              ).format("DD/MM/YYYY")}
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
                                              <View style={{ flex: 0.8 }}>
                                                <Text
                                                  style={styles.cardTextStyle}
                                                >
                                                  Description:
                                                </Text>
                                              </View>
                                              <View style={{ flex: 1 }}>
                                                <Text style={styles.textStyle}>
                                                  {filteredData.description.substring(
                                                    0,
                                                    10
                                                  ) + "..."}
                                                </Text>
                                              </View>
                                            </View>
                                          </View>
                                        </View>

                                        <View
                                          style={[
                                            {
                                              flex: 1,
                                              top: "4%",
                                              marginLeft: "70%",
                                            },
                                            {
                                              flexDirection: "row",
                                            },
                                          ]}
                                        >
                                          {filteredData.created_by ==
                                            USERNAME && (
                                            <View
                                              style={{ flex: 1, bottom: "1%" }}
                                            >
                                              <View
                                                style={[
                                                  { flex: 1 },
                                                  {
                                                    flexDirection: "row",
                                                  },
                                                ]}
                                              >
                                                <View style={{ flex: 0.4 }}>
                                                  <IconButton
                                                    colorScheme="success"
                                                    onPress={() =>
                                                      editItem(filteredData.id)
                                                    }
                                                    variant="subtle"
                                                    _icon={{
                                                      as: Ionicons,
                                                      name: "md-pencil-sharp",
                                                    }}
                                                  />
                                                </View>
                                                <View style={styles.space} />
                                                <View style={{ flex: 0.4 }}>
                                                  <IconButton
                                                    colorScheme="danger"
                                                    onPress={() =>
                                                      deleteItem(
                                                        filteredData.id
                                                      )
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
                                          )}
                                        </View>
                                      </View>
                                    </View>
                                  </Card.Content>
                                </Card>
                              </Pressable>
                            </View>
                          </>
                        ))
                      )}
                    </View>
                  )}
                </ScrollView>
                <Modal
                  isOpen={openCardModal}
                  onClose={() => setOpenCardModal(false)}
                  safeAreaTop={true}
                  size="full"
                >
                  <Modal.Content maxWidth="90%" minHeight="5%">
                    {specificData.created_by === USERNAME && (
                      <Modal.Header style={{ height: "20%" }}>
                        <View
                          style={[
                            {
                              // Try setting `flexDirection` to `"row"`.
                              flex: 1,
                              flexDirection: "row",
                            },
                          ]}
                        >
                          <View style={{ flex: 0.5, justifyContent: "center" }}>
                            <Text style={[styles.cardTextStyle, { left: 0 }]}>
                              Notify to:
                            </Text>
                          </View>
                          <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={styles.textStyle}>
                              {" "}
                              {specificData.viewOnly}
                            </Text>
                          </View>
                          <View style={{ flex: 0.5 }}>
                            {specificData.isNotified == false ? (
                              // <NativeButton
                              //   size="md"
                              //   width="20"
                              //   onPress={sendPushNotificationHanlder}
                              //   style={{
                              //     backgroundColor: "#1E84A4",
                              //     //borderRadius: 7,
                              //     left: 15,
                              //   }}
                              //   rightIcon={
                              //     <Icon
                              //       as={Ionicons}
                              //       name="notifications"
                              //       size="md"
                              //     />
                              //   }
                              // >
                              //   Notify
                              // </NativeButton>
                              <NativeButton
                                size="sm"
                                //variant={!isTueActive ? "outline" : "solid"}
                                rightIcon={
                                  <Icon
                                    as={Ionicons}
                                    name="notifications"
                                    size="sm"
                                  />
                                }
                                onPress={sendPushNotificationHanlder}
                              >
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: "HindSemiBold",
                                    color: "white",
                                    //color: !isTueActive ? "black" : "white"
                                  }}
                                >
                                  Notify
                                </Text>
                              </NativeButton>
                            ) : (
                              <Badge colorScheme="success">Notified</Badge>
                            )}
                          </View>
                        </View>
                      </Modal.Header>
                    )}

                    <Modal.Body>
                      <ScrollView>
                        <View
                          style={[
                            {
                              // Try setting `flexDirection` to `"row"`.
                              flex: 1,
                              flexDirection: "column",
                              borderBottomColor: "grey",
                            },
                          ]}
                        >
                          <View style={{ flex: 1, marginVertical: 5 }}>
                            <View
                              style={[
                                {
                                  // Try setting `flexDirection` to `"row"`.
                                  flex: 1,
                                  flexDirection: "row",
                                },
                              ]}
                            >
                              <View style={{ flex: 0.16 }}>
                                <Text
                                  style={[styles.cardTextStyle, { left: 0 }]}
                                >
                                  Title:
                                </Text>
                              </View>
                              <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>
                                  {specificData.titlee}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={{ flex: 1, marginVertical: 5 }}>
                            <View
                              style={[
                                {
                                  // Try setting `flexDirection` to `"row"`.
                                  flex: 1,
                                  flexDirection: "row",
                                },
                              ]}
                            >
                              <View style={{ flex: 1, marginVertical: 5 }}>
                                <View
                                  style={[
                                    {
                                      // Try setting `flexDirection` to `"row"`.
                                      flex: 1,
                                      flexDirection: "row",
                                    },
                                  ]}
                                >
                                  <View style={{ flex: 0.4 }}>
                                    <Text
                                      style={[
                                        styles.cardTextStyle,
                                        { left: 0 },
                                      ]}
                                    >
                                      From:
                                    </Text>
                                  </View>
                                  <View style={{ flex: 1 }}>
                                    <Text
                                      style={[styles.textStyle, { left: 0 }]}
                                    >
                                      {moment(specificData.startdate).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{ flex: 1, marginVertical: 5 }}>
                                <View
                                  style={[
                                    {
                                      // Try setting `flexDirection` to `"row"`.
                                      flex: 1,
                                      flexDirection: "row",
                                    },
                                  ]}
                                >
                                  <View style={{ flex: 0.2 }}>
                                    <Text
                                      style={[
                                        styles.cardTextStyle,
                                        { left: 0 },
                                      ]}
                                    >
                                      To:
                                    </Text>
                                  </View>
                                  <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                      {moment(specificData.enddate).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View style={{ flex: 1, marginVertical: 5 }}>
                            <View
                              style={[
                                {
                                  // Try setting `flexDirection` to `"row"`.
                                  flex: 1,
                                  flexDirection: "row",
                                },
                              ]}
                            >
                              <View style={{ flex: 0.4, left: 0 }}>
                                <Text
                                  style={[styles.cardTextStyle, { left: 0 }]}
                                >
                                  Description:
                                </Text>
                              </View>
                              <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>
                                  {specificData.description}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </ScrollView>
                    </Modal.Body>

                    <Modal.Footer>
                      <NativeButton.Group space={2}>
                        <NativeButton
                          onPress={() => {
                            setOpenCardModal(false);
                          }}
                        >
                          Okay
                        </NativeButton>
                      </NativeButton.Group>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              </View>
              {keyboardStatus == "Keyboard Hidden" && (
                <View style={{ flex: 1 }}>
                  <TeachersHome />
                </View>
              )}
            </View>
          </View>
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
  viewContainer: {
    fontSize: 24,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
  },
  eventName: {
    fontFamily: "HindSemiBold",
    fontSize: 18,
    margin: 10,
    marginTop: 0,
  },

  root: {
    // backgroundColor: "whi",
    height: "100%",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
    backgroundColor: "white",
    height: "220%",
  },
  errorBorderColor: {
    borderColor: "red",
  },
  errorBorderColorDate: {
    borderBottomColor: "red",
  },

  btnSubmit: {
    marginTop: deviceHieght < 600 ? "5%" : "18%",
    width: "60%",
    marginLeft: 175,
    padding: "3%",
  },
  btnSubmitNew: {
    marginTop: deviceHieght < 600 ? "5%" : "5%",
    bottom: "1.5%",
    width: "50%",
    marginLeft: 180,
  },
  space: {
    width: 20,
    height: 20,
  },
  spaceBetween: {
    width: 50,
    height: 20,
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 20,

    backgroundColor: "#F0F3F4",
  },
  errorLabel: {
    color: "red",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
  },
  normalLabel: {
    color: "#AEB6BF",

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
  btnSubmit1: {
    marginTop: 90,
    marginBottom: 30,
    marginLeft: 190,
    width: "50%",
  },
  cancel: {
    marginTop: -130,
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
    zIndex: 100,
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
    zIndex: 100,
  },
  descriptionDown: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: deviceWidth < 370 ? 93 : 110,
      },
      android: {
        top: deviceWidth < 370 ? 93 : 107,
      },
    }),

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
    fontSize: deviceWidth < 370 ? 16 : 16,
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
  textStyle: {
    fontSize: deviceWidth < 370 ? 14 : 16,
    fontFamily: "HindSemiBold",
    color: "grey",
  },
  cardStyle: {
    marginVertical: 15,
    marginHorizontal: 27,
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#1E84A4",
    width: "80%",
  },
});

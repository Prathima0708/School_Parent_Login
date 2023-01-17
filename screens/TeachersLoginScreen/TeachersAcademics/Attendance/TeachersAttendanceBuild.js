import {
  View,
  Text,
  Platform,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Badge,
  Button as NativeButton,
  FormControl,
  Modal,
  Text as NativeText,
  Input as NativeInput,
  HStack,
  Spinner,
} from "native-base";
import axios from "axios";
import TeachersList from "./TeachersList";
import { subURL } from "../../../../components/utils/URL's";
import TeachersHome from "../../BottomTab/TeachersHome";
import SelectList from "react-native-dropdown-select-list";
import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../../components/UI/BackButton";
import { borderColor } from "@mui/system";
import moment from "moment";
import { isLoading } from "expo-font";
import SearchBar from "react-native-dynamic-search-bar";
import { Card } from "react-native-paper";

var USERID,
  TOKEN,
  FROMDATE,
  newArray,
  IDSETARRAY = [];
var filteredArray = [];
// const getButtonColor = (status, title) => {
//   switch (status + title) {
//     case 'presentP':
//       return 'green';
//     case 'absentA':
//       return 'red';
//     default:
//       return changeColorUpdate(data.student.id, status);
//   }
// }

const TeachersAttendanceBuild = () => {
  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());
  const [fromShow, setFromShow] = useState(false);

  const [isFromDateFocused, setIsFromDateFocused] = useState(false);
  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText.trim() !== "";
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;

  const [userID, setUserID] = useState("");

  const [token, setToken] = useState("");

  const [selectedClassSection, setSelectedClassSection] = useState("");
  const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
  const enteredSelcetdIsValid = selectedClassSection.toString().trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

  const [description, setEnteredDescription] = useState("");
  const [enteredDescriptionTouched, setEnteredDescriptionTouched] =
    useState(false);
  const enteredDescriptionIsValid = description.trim() !== "";
  const descriptionInputIsInValid =
    !enteredDescriptionIsValid && enteredDescriptionTouched;

  const [showCalendar, setShowCalendar] = useState(false);

  const [showStudList, setShowStudList] = useState(false);

  const [data, setData] = useState([]);
  const [array, setArray] = useState([]);
  const [classTeacherData, setClassTeacherData] = useState([]);

  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  const [presentPressed, setPresentPressed] = useState(false);
  const [absentPressed, setAbsentPressed] = useState(false);

  const [missedID, setMissedID] = useState(false);
  const [test, setTest] = useState(false);

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const navigation = useNavigation();

  //new states
  const [filteredArray, setFilteredArray] = useState([]);
  const [showDefaultBtns, setShowDefaultBtns] = useState(true);

  const [showFirstStudList, setShowFirstStudList] = useState(true);

  const [showEditBtn, setShowEditBtn] = useState(false);
  const [editBtnPressed, setEditBtnPressed] = useState(false);

  const [saveAttendanceDataByDCS, setSaveAttendanceDataByDCS] = useState([]);
  const [showDCSData, setShowDCSData] = useState(false);

  const [updateArray, setUpdateArray] = useState([]);

  const [loading, setLoading] = useState(false);
  // const [presentButtonColor, setPresentButtonColor] = useState(getButtonColor('present', "P"));
  // const [absentButtonColor, setAbsentButtonColor] = useState(getButtonColor('absent', "A"));

  const [showStartingPage, setShowStartingPage] = useState(true);
  const [showReports, setShowReports] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [showReportList, setShowReportList] = useState(false);

  let IDSet = new Set();
  let i,
    totalIDs = [];

  async function fetchUser() {
    USERID = await AsyncStorage.getItem("key");

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

  useEffect(() => {
    async function fetchStudentClass() {
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
          setClassTeacherData(newArray);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchStudentClass();
  }, [userID]);

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

  useLayoutEffect(() => {
    if(showStartingPage){
      setShowStartingPage(true);
      navigation.setOptions({ headerShown: true });
    }
    if(showReports){
      navigation.setOptions({ headerShown: false });
    }
    if (showCalendar) {
      // setShowCalendar(true);
      navigation.setOptions({ headerShown: false });
    }
    if (showStudList) {
      navigation.setOptions({ headerShown: false });
    }
  }, [showStartingPage,showCalendar,showReports, showStudList]);

  function viewStudentList() {
    setShowReportList(true);

    async function fetchStudents() {
      let filteredlist = newArray.filter(
        (ele) => ele.key == selectedClassSection
      );
      setFilteredArray(filteredlist);
      let class_name = filteredlist[0].classname;
      let section = filteredlist[0].section;

      try {
        const res = await axios.get(`${subURL}/Student/`);

        let filteredclass = res.data.filter(
          (ele) => ele.class_name == class_name
        );

        let filteredsection = res.data.filter((ele) => ele.section == section);

        const filteredList = filteredclass && filteredsection;

        let filteredc = filteredList.filter(
          (ele) => ele.class_name == class_name
        );

        // let filteredc = res.data;

        if (filteredc) {
          setData(filteredc);
          setReportData(filteredc);
        }

        for (i = 0; i < data.length; i++) {
          totalIDs[i] = data[i].id;
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchStudents();
  }

  function descriptionChangeHandler(enteredValue) {
    setEnteredDescription(enteredValue);
  }

  const fromDateChangeHandler = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate;
    FROMDATE = selectedFromDate;

    setFromShow(Platform.OS === "ios");
    // setFromDate(currentFromDate);

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
      // if (event?.type === "dismissed") {
      //   setFromText("");
      //   return;
      // }
    }
  };

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  function frmDateHandler(enteredValue) {
    setFromDate(enteredValue);
  }

  function showAttendance() {
    setShowDCSData(true);
    const request_model = {
      attendance_date: moment(FROMDATE).format("YYYY-MM-DD"),
      class_name: filteredArray[0].classname,
      section: filteredArray[0].section,
    };
    async function getData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Token " + `${token}`,
        };
        const res = await axios.post(
          `${subURL}/AttendanceListByDCS/`,
          request_model,
          {
            headers: headers,
          }
        );

        setSaveAttendanceDataByDCS(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }

  function buttonPressedHandler() {
    // setIsEdit(false)

    setEnteredSelectedTouched(true);
    setEnteredFromDateTouched(true);

    if (!enteredSelcetdIsValid || !enteredFromDateIsValid) {
      return;
    } else {
      setShowCalendar(false);
      setShowStudList(true);
      setShowDefaultBtns(true);
      setShowFirstStudList(true);
      setShowEditBtn(false);
      setShowDCSData(false);
      setEditBtnPressed(false);
    }
    async function getData() {
      try {
        const resAttendance = await axios.get(`${subURL}/Attendance/`);
        const isSameDataPresent = data.some((item1) => {
          return resAttendance.data.some((item2) => {
            return (
              item1.id === item2.student &&
              moment(FROMDATE).format("YYYY-MM-DD") === item2.attendance_date
            );
          });
        });

        if (isSameDataPresent == true) {
          Alert.alert("Attendance has been already marked", "Already marked", [
            {
              text: "OK",
              onPress: () => {
                // setIsEdit(false);
                // setShowEditData(true);
                setShowFirstStudList(false);
                setShowDefaultBtns(false);
                setShowEditBtn(true);
                showAttendance();
                setEditBtnPressed(false);
                // setshowSavedData(false);
                // //showAttendance();
              },
            },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }

  function presentButtonPressed(id) {
    setAbsentPressed(false);
    setPresentPressed(true);

    const object = {
      student: id,
      attendance_date: moment(FROMDATE).format("YYYY-MM-DD"),
      class_name: filteredArray[0].classname,
      section: filteredArray[0].section,
      attendance_status: "present",
      description: "",
    };
    // const object = {
    //   id: id,
    //   leave_status: "present",
    //   holiday_description: "",
    // };

    const existingItem = array.find((item) => item.student === object.student);

    if (existingItem) {
      setArray(
        array.map((item) => (item.student === object.student ? object : item))
      );
    } else {
      setArray((prevArray) => [...prevArray, object]);
      //setItems([...items, updatedItem]);
    }

    if (IDSETARRAY.length > 0) {
      var selectedID = IDSETARRAY.filter((item) => item === id);

      if (selectedID.length > 0) {
        IDSETARRAY = IDSETARRAY.filter((item) => item !== selectedID[0]);
      }
    }
  }

  function absentBtnHandler(id) {
    setAbsentPressed(true);
    setPresentPressed(false);
    //setSelectedStatus("Absent")
    // const object = {
    //   id: id,
    //   leave_status: "absent",
    //   holiday_description: "",
    // };
    const object = {
      student: id,
      attendance_date: moment(FROMDATE).format("YYYY-MM-DD"),
      class_name: filteredArray[0].classname,
      section: filteredArray[0].section,
      attendance_status: "absent",
      description: "",
    };
    const existingItem = array.find((item) => item.student === object.student);

    if (existingItem) {
      setArray(
        array.map((item) => (item.student === object.student ? object : item))
      );
    } else {
      setArray((prevArray) => [...prevArray, object]);
      //setItems([...items, updatedItem]);
    }

    if (IDSETARRAY.length > 0) {
      var selectedID = IDSETARRAY.filter((item) => item === id);

      if (selectedID.length > 0) {
        IDSETARRAY = IDSETARRAY.filter((item) => item !== selectedID[0]);
      }
    }
  }

  function presentAllHandler() {
    array.length = 0;

    for (i = 0; i < data.length; i++) {
      const object = {
        student: data[i].id,
        attendance_date: moment(FROMDATE).format("YYYY-MM-DD"),
        class_name: filteredArray[0].classname,
        section: filteredArray[0].section,
        attendance_status: "present",
        description: "",
      };

      changeColor(data[i].id, "P");
      array.push(object);
    }
    viewStudentList();

    IDSETARRAY = [];
  }

  function absentAllHandler() {
    //setSelectedStatus("Absent");

    // while(array.length > 0) {
    //   array.pop();
    // }
    array.length = 0;
    for (i = 0; i < data.length; i++) {
      // const object = {
      //   id: data[i].id,
      //   leave_status: "absent",
      //   holiday_description: "",
      // };
      const object = {
        student: data[i].id,
        attendance_date: moment(FROMDATE).format("YYYY-MM-DD"),
        class_name: filteredArray[0].classname,
        section: filteredArray[0].section,
        attendance_status: "absent",
        description: "",
      };

      changeColor(data[i].id, "A");
      array.push(object);
    }
    viewStudentList();

    IDSETARRAY = [];
  }

  function holidayForAllHandler(placement) {
    // array.length = 0;
    // IDSETARRAY = [];

    // setHideStudList(true);

    setOpen(true);
    setPlacement(placement);
    setEnteredDescription("");
    setEnteredDescriptionTouched(false);
  }

  function saveAttendance() {
    //  console.log("finalList", array);

    async function getData() {
      try {
        const resAttendance = await axios.get(`${subURL}/Attendance/`);
        const isSameDataPresent = data.some((item1) => {
          return resAttendance.data.some((item2) => {
            return (
              item1.id === item2.student &&
              moment(FROMDATE).format("YYYY-MM-DD") === item2.attendance_date
            );
          });
        });
        // console.log(isSameDataPresent)

        if (isSameDataPresent == true) {
          // Alert.alert("Attendance already marked","",  [
          //   {
          //     text: "OK",
          //     onPress: () => {
          //      // setShowStudList(false);
          //      // showCalendar();
          //     },
          //   },
          // ]);
        } else {
          async function storeData() {
            try {
              let headers = {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: "Token " + `${token}`,
              };

              const resLogin = await axios.post(
                `${subURL}/Attendance/`,
                array,
                {
                  headers: headers,
                }
              );
              //console.log(resLogin.data);
            } catch (error) {
              console.log(error);
            }
          }
          storeData();
          const mainId = new Set(data.map((obj) => obj.id));
          const selectedId = new Set(array.map((obj) => obj.student));

          const eqSet = (mainId, selectedId) =>
            mainId.size === selectedId.size &&
            [...mainId].every((x) => selectedId.has(x));

          if (eqSet(mainId, selectedId)) {
            Alert.alert("Saved Data", "Saved Data successfully", [
              {
                text: "OK",
                onPress: () => {
                  setShowDefaultBtns(false);
                  setShowFirstStudList(false);
                  setShowDCSData(true);
                  showAttendance();
                  setShowEditBtn(true);
                  setEditBtnPressed(false);
                  //setshowSavedData(true);
                  //showAttendance();
                },
              },
            ]);
            console.log("ids  marked");
            setMissedID(false);
          } else {
            Alert.alert("Please mark attendance for all students");
            console.log("ids not  marked");
            setMissedID(true);
          }

          IDSet = [...mainId].filter((x) => !selectedId.has(x));

          IDSETARRAY = IDSet;
          //console.log("IDSETARRAY", IDSETARRAY);
          IDSet.forEach((value, index, set) => {
            if (mainId.has(value)) {
              // console.log('ids  marked')
              setTest(true);
            } else {
              // console.log('ids not marked')
              setTest(false);
            }
          });

          // if(missedID==true){

          //   Alert.alert("Please mark attendance for all students")
          // }
          // if(missedID==false){
          // var selectedID = IDSETARRAY.filter((item) => item === id);

          // if (IDSETARRAY.length > 0) {
          //   if (selectedID.length > 0) {
          //     Alert.alert("please mark attendance for all students")
          //   } else {
          //     Alert.alert("please mark attendance for all students")
          //   }
          // } else {

          //   }

          //}
        }

        // const resStudent = await axios.get(`${subURL}/Student/`);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }

  function changeBorderColor(id) {
    // IDSETARRAY.forEach((element) => {
    var selectedID = IDSETARRAY.filter((item) => item === id);

    if (IDSETARRAY.length > 0) {
      if (selectedID.length > 0) {
        let styleData = {
          borderColor: "red",
          borderWidth: 1,
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#FFBAAF",
          marginVertical: 10,
          marginHorizontal: 20,
        };
        return styleData;
      } else {
        let styleData = {
          borderColor: "black",
          borderWidth: 1,
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#D3D2FF",
          marginVertical: 10,
          marginHorizontal: 20,
        };
        return styleData;
      }
    } else {
      let styleData = {
        borderColor: "black",
        borderWidth: 1,
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#D3D2FF",
        marginVertical: 10,
        marginHorizontal: 20,
      };
      return styleData;
    }
  }

  function changeColor(id, text) {
    if (array.filter((item) => item.student === id)) {
      var selectedData = [];
      selectedData = array.filter((item) => item.student === id);
      if (selectedData.length > 0) {
        var isPresent = false;
        var isAbsent = false;
        isPresent = selectedData.map(
          (data, key) => data.attendance_status === "present"
        )[0];
        isAbsent = selectedData.map(
          (data, key) => data.attendance_status === "absent"
        )[0];

        if (isPresent && text == "P") {
          return "green";
        } else if (isAbsent && text == "A") {
          return "red";
        } else {
          return "grey";
        }
      }
      return "grey";
    }
  }

  function changeColorUpdate(id, text) {
    if (updateArray.filter((item) => item.student === id)) {
      var selectedData = [];
      selectedData = updateArray.filter((item) => item.student === id);
      if (selectedData.length > 0) {
        var isPresent = false;
        var isAbsent = false;
        isPresent = selectedData.map(
          (data, key) => data.attendance_status === "present"
        )[0];
        isAbsent = selectedData.map(
          (data, key) => data.attendance_status === "absent"
        )[0];

        if (isPresent && text == "P") {
          return "green";
        } else if (isAbsent && text == "A") {
          return "red";
        } else {
          return "grey";
        }
      }
      return "grey";
    }
  }

  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
    setIsFromDateFocused(false);
  }

  function onFocusFromHandler() {
    setIsFromDateFocused(true);
    setEnteredFromDateTouched(false);
    //setstartDateLabel(true);
  }

  function backButtonHandler() {
    setShowCalendar(true);
    setShowStudList(false);

    setSelectedClassSection("");
    setEnteredSelectedTouched(false);

    setFromText("");
    setEnteredFromDateTouched(false);

    array.length = 0;
    IDSETARRAY = [];
  }

  function backMarkHandler(){
    setShowCalendar(false);
    setShowStartingPage(true);
  }

  function backReportHandler(){
    setShowReports(false);
    setShowStartingPage(true);
  }

  function donePressedHandler() {
    // setOpen(false);

    setEnteredDescriptionTouched(true);

    if (!enteredDescriptionIsValid) {
      return;
    } else {
      setOpen(false);

      array.length = 0;
      console.log("inside done button");
      for (i = 0; i < data.length; i++) {
        const object = {
          student: data[i].id,
          attendance_date: moment(FROMDATE).format("YYYY-MM-DD"),
          class_name: filteredArray[0].classname,
          section: filteredArray[0].section,
          attendance_status: "holiday",
          description: description,
        };

        changeColor(data[i].id, "H");
        array.push(object);
      }
      viewStudentList();

      console.log(array);

      IDSETARRAY = [];
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Token " + `${token}`,
          };

          const resLogin = await axios.post(`${subURL}/Attendance/`, array, {
            headers: headers,
          });
          //console.log(resLogin.data);
        } catch (error) {
          console.log(error);
        }
      }
      storeData();
      Alert.alert("Saved Data", "Saved Data successfully", [
        {
          text: "OK",
          onPress: () => {
            setShowDefaultBtns(false);
            setShowFirstStudList(false);
            setShowDCSData(true);
            showAttendance();
            setShowEditBtn(true);
            setEditBtnPressed(false);
            //setshowSavedData(true);
            //showAttendance();
          },
        },
      ]);
    }
  }
  function editHandler() {
    setShowDCSData(false);
    setEditBtnPressed(true);
    setShowEditBtn(false);
  }

  function updatePresentButton(data) {
    let updatedStatus = "P";
    // changeColorUpdate(data.student.id, 'P');

    console.log("in update present button");

    const object = {
      student: data.student.id,
      attendance_date: moment(FROMDATE).format("YYYY-MM-DD"),
      class_name: filteredArray[0].classname,
      section: filteredArray[0].section,
      attendance_status: "present",
      description: "",
      id: data.id,
    };
    console.log(object);
    const existingItem = updateArray.find(
      (item) => item.student === object.student
    );

    if (existingItem) {
      setUpdateArray(
        updateArray.map((item) =>
          item.student === object.student ? object : item
        )
      );
    } else {
      setUpdateArray((prevArray) => [...prevArray, object]);
      //setItems([...items, updatedItem]);
    }
  }
  function updateAbsentButton(data) {
    let updatedStatus = "A";
    // changeColorUpdate(data.student.id, 'A');

    console.log("in update absent button");

    const object = {
      student: data.student.id,
      attendance_date: moment(FROMDATE).format("YYYY-MM-DD"),
      class_name: filteredArray[0].classname,
      section: filteredArray[0].section,
      attendance_status: "absent",
      description: "",
      id: data.id,
    };
    console.log(object);
    const existingItem = updateArray.find(
      (item) => item.student === object.student
    );

    if (existingItem) {
      setUpdateArray(
        updateArray.map((item) =>
          item.student === object.student ? object : item
        )
      );
    } else {
      setUpdateArray((prevArray) => [...prevArray, object]);
      //setItems([...items, updatedItem]);
    }
  }
  function updateHandler() {
    console.log("updated array-", updateArray);
    async function updateData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Token " + `${token}`,
        };

        const resLogin = await axios.put(`${subURL}/Attendance/`, updateArray, {
          headers: headers,
        });

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
          showAttendance();
          setShowDCSData(true);
          setEditBtnPressed(false);
          setShowEditBtn(true);

          // showAttendance();
          // setShowEditData(true);
          // setshowSavedData(true);
        },
      },
    ]);
  }

  function cancelHandler() {
    setShowDCSData(true);
    setEditBtnPressed(false);
    setShowEditBtn(true);
  }
  function markAttendance() {
    setShowCalendar(true);
    setShowStartingPage(false);
  }
  function viewReports() {
    setShowReports(true);
    setShowStartingPage(false);
  }

  function pressHandler(id) {
    console.log(id);
    navigation.navigate("AttendanceReport", {
      id: id,
    });
    // const request_model = {
    //   student_id: id,
    //   year: "2023",
    // };
    // async function getData() {
    //   try {
    //     let headers = {
    //       "Content-Type": "application/json; charset=utf-8",
    //       Authorization: "Token " + `${token}`,
    //     };
    //     const res = await axios.post(
    //       `${subURL}/AttendanceDetailByStudentIDYear/`,
    //       request_model,
    //       {
    //         headers: headers,
    //       }
    //     );

    //     console.log(res.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // getData();
  }
  return (
    <>
      {showStartingPage && (
         <View
         style={[
           { flex: 1 },
           { flexDirection: "column", backgroundColor: "white" },
         ]}
       >
         <View style={{ flex: 1, marginHorizontal: "20%", top: "10%" }}>
           <Pressable onPress={markAttendance}>
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
                     Mark Attendance
                   </Text>
                 </View>
               </Card.Content>
             </Card>
           </Pressable>
         </View>

         <View style={{ flex: 1, marginHorizontal: "20%" }}>
           <Pressable onPress={viewReports}>
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
                     View Reports
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
      )}
      {showCalendar && (
        <View
          style={[
            { flex: 1 },
            { flexDirection: "column", backgroundColor: "white" },
          ]}
        >
          <View
            style={[
              { flex: 0.9 },
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <BackButton
              onPress={backMarkHandler}
            />
          </View>
          <View style={[styles.inputForm]}>
            <ScrollView persistentScrollbar={false}>
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
                  Select Class
                </Text>
                <View style={styles.leaveSpace} />
                <View style={{ flexDirection: "column" }}>
                  <SelectList
                    setSelected={setSelectedClassSection}
                    data={classTeacherData}
                    onSelect={viewStudentList}
                    placeholder="Select class"
                    save="key"
                    boxStyles={
                      selectInputIsInValid && styles.errorSelectedColor
                    }
                    dropdownTextStyles={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                    }}
                    inputStyles={{ fontSize: 20, fontFamily: "HindRegular" }}
                  />
                  {selectInputIsInValid && (
                    <Text style={[styles.errorText, { top: 10, left: "2%" }]}>
                      Select class
                    </Text>
                  )}
                </View>
              </View>

              <View style={[{ flexDirection: "column" }]}>
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
                    }}
                  >
                    Select Date
                  </Text>
                  <View style={styles.dateLabelSpace} />

                  <View style={styles.dateContainer}>
                    <UnderlinedInput
                      value={fromText}
                      placeholder="Select Date"
                      style={
                        isFromDateFocused
                          ? styles.focusStyle
                          : fromDateInputIsInValid &&
                            styles.errorBorderColorDate
                      }
                      blur={fromDateBlurHandler}
                      onFocus={onFocusFromHandler}
                      onChangeText={frmDateHandler}
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
                </View>
                <View
                  style={{
                    flex: 1.5,
                    width: "50%",
                    marginLeft: "27%",
                    marginTop: "10%",
                  }}
                >
                  <NativeButton size="md" onPress={buttonPressedHandler}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      Start Attendance
                    </Text>
                  </NativeButton>
                </View>
              </View>
            </ScrollView>
          </View>

          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 0.2, backgroundColor: "white" }}>
              <TeachersHome />
            </View>
          )}
        </View>
      )}

      {showReports && (
        <View
          style={[
            {
              flex: 1,
              flexDirection: "column",
              backgroundColor: "white",
            },
          ]}
        >
          <View
            style={[
              { flex: 0.7 },
              { flexDirection: "row", alignItems: "center"},
            ]}
          >
            <BackButton
              onPress={backReportHandler}
            />
          </View>
          <View
            style={{
              //top: "3%",
              left: "3%",
              flexDirection: "row",
              //marginVertical: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "HindRegular",
                fontSize: 18,
                top: "3%",
              }}
            >
              Select Class
            </Text>
            <View style={styles.leaveSpace} />
            <View style={{ flexDirection: "column" }}>
              <SelectList
                setSelected={setSelectedClassSection}
                data={classTeacherData}
                onSelect={viewStudentList}
                placeholder="Select class"
                save="key"
                boxStyles={selectInputIsInValid && styles.errorSelectedColor}
                dropdownTextStyles={{
                  fontSize: 18,
                  fontFamily: "HindRegular",
                }}
                inputStyles={{ fontSize: 20, fontFamily: "HindRegular" }}
              />
              {selectInputIsInValid && (
                <Text style={[styles.errorText, { top: 10, left: "2%" }]}>
                  Select class
                </Text>
              )}
            </View>
          </View>
          <View style={{ flex: 2 }}>
            {showReportList && (
              <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={styles.title}>
                  <SearchBar
                    style={styles.searchBar}
                    textInputStyle={{
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                    placeholder="Search here"
                    //    onChangeText={(text) => searchFilter(text)}
                    // value={searchText}
                  />
                </View>
                <View style={styles.tableHeader}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.headerText}>Reg no</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.headerText}>Student name</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.headerText}>Class name</Text>
                  </View>
                </View>

                <View
                  style={[
                    { flex: 1 },
                    {
                      flexDirection: "column",
                      top:
                        keyboardStatus == "Keyboard Hidden" ? "11.5%" : "18%",
                      paddingHorizontal: 10,
                      marginHorizontal: 10,
                    },
                  ]}
                >
                  <View style={{ flex: 8, bottom: 10 }}>
                    <ScrollView>
                      {reportData.length > 0 ? (
                        <View style={styles.root}>
                          {reportData &&
                            reportData.map((filteredData, key) => (
                              <>
                                <TouchableHighlight
                                  onPress={pressHandler.bind(
                                    this,
                                    filteredData.id
                                  )}
                                  underlayColor="#D1D4FF"
                                  style={{ cursor: "pointer" }}
                                >
                                  <View style={styles.tableText}>
                                    <View
                                      style={{
                                        flex: 1,
                                        alignItems: "center",
                                        paddingVertical: 20,
                                      }}
                                    >
                                      <Text
                                        style={[
                                          styles.headerText,
                                          { color: "black" },
                                        ]}
                                      >
                                        {filteredData.reg_number}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flex: 1,
                                        alignItems: "center",
                                        paddingVertical: 20,
                                      }}
                                    >
                                      <Text
                                        style={[
                                          styles.headerText,
                                          { color: "black" },
                                        ]}
                                      >
                                        {filteredData.student_name}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flex: 1,
                                        alignItems: "center",
                                        paddingVertical: 20,
                                      }}
                                    >
                                      <Text
                                        style={[
                                          styles.headerText,
                                          { color: "black" },
                                        ]}
                                      >
                                        {filteredData.class_name} -{" "}
                                        {filteredData.section}
                                      </Text>
                                    </View>
                                  </View>
                                </TouchableHighlight>
                              </>
                            ))}
                        </View>
                      ) : (
                        <View
                          style={{
                            alignItems: "center",
                            marginVertical: 10,
                          }}
                        >
                          <NativeText fontSize="xl" bold color="error.900">
                            No data found.
                          </NativeText>
                        </View>
                      )}
                    </ScrollView>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={{ flex: 0.1, backgroundColor: "green" }}>
            <TeachersHome />
          </View>
        </View>
      )}

      {showStudList && (
        <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
          <View
            style={[
              { flex: 0.9 },
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <BackButton
              onPress={editBtnPressed ? cancelHandler : backButtonHandler}
            />
          </View>

          <View
            style={{
              flex: keyboardStatus == "Keyboard Hidden" ? 0.7 : 1,
              bottom: "7%",
            }}
          >
            {showDefaultBtns && (
              <View
                style={[
                  { flex: 1 },
                  {
                    flexDirection: "row",
                    left: "10%",
                    marginHorizontal: 15,
                    marginVertical: 15,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <NativeButton onPress={presentAllHandler} colorScheme="green">
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      Present All
                    </Text>
                  </NativeButton>
                </View>
                <View style={styles.space} />
                <View style={{ flex: 1 }}>
                  <NativeButton onPress={absentAllHandler} colorScheme="red">
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      Absent All
                    </Text>
                  </NativeButton>
                </View>
                <View style={styles.space} />
                <View style={{ flex: 1 }}>
                  <NativeButton
                    onPress={() => holidayForAllHandler("top")}
                    colorScheme="yellow"
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      Holiday All
                    </Text>
                  </NativeButton>
                </View>
                <View style={styles.space} />
              </View>
            )}

            <View style={{ flex: 0.5, bottom: "6%" }}>
              <View
                style={[
                  { flex: 1 },
                  {
                    // Try setting `flexDirection` to `"row"`.
                    flexDirection: "column",
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <View
                    style={[
                      { flex: 1 },
                      {
                        // Try setting `flexDirection` to `"row"`.
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <View style={{ flex: 0.27, alignItems: "center" }}>
                      <Text style={styles.labelStyle}>Class :</Text>
                    </View>
                    <View style={{ flex: 0.27 }}>
                      <Text style={styles.labelStyle}>
                        {filteredArray[0]?.value}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View
                    style={[
                      { flex: 1 },
                      {
                        // Try setting `flexDirection` to `"row"`.
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <View style={{ flex: 0.27, alignItems: "center" }}>
                      <Text style={styles.labelStyle}>Date :</Text>
                    </View>

                    <View style={{ flex: 0.27 }}>
                      <Text style={styles.labelStyle}>{fromText}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {showEditBtn && (
              <View style={{ flex: 1, alignItems: "center", left: "30%" }}>
                <NativeButton size="md" onPress={editHandler}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "HindSemiBold",
                      color: "white",
                    }}
                  >
                    Edit
                  </Text>
                </NativeButton>
              </View>
            )}
          </View>

          <View style={{ flex: 2, bottom: "6%" }}>
            {
              <ScrollView>
                {data &&
                  showFirstStudList &&
                  data.map((data, key) => (
                    <View style={changeBorderColor(data.id)}>
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
                            <View
                              style={{
                                flex: 0.5,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={[styles.textBase, styles.description]}
                              >
                                {data.reg_number}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={[styles.textBase, styles.description]}
                              >
                                {data.student_name}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={{ flex: 0.2 }}>
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
                                    flexDirection: "column",
                                    marginVertical: 10,
                                    marginHorizontal: 10,
                                  },
                                ]}
                              >
                                <View style={{ flex: 1 }}>
                                  <Button
                                    onPress={() =>
                                      presentButtonPressed(data.id)
                                    }
                                    color={changeColor(data.id, "P")}
                                    title="P"
                                  />
                                </View>
                                <View style={styles.space} />
                                <View style={{ flex: 1 }}>
                                  <Button
                                    color={changeColor(data.id, "A")}
                                    onPress={() => absentBtnHandler(data.id)}
                                    title="A"
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}

                {showDCSData &&
                  saveAttendanceDataByDCS.map((data, key) => (
                    <View style={changeBorderColor(data.id)}>
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
                            <View
                              style={{
                                flex: 0.5,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={[styles.textBase, styles.description]}
                              >
                                {data.student.reg_number}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={[styles.textBase, styles.description]}
                              >
                                {data.student.student_name}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flex: 0.5 }}>
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
                                    marginVertical: 10,
                                    marginHorizontal: 10,
                                  },
                                ]}
                              >
                                <View style={{ flex: 1 }}>
                                  <View style={{ flex: 1.5 }}>
                                    {data.attendance_status == "present" ? (
                                      <Badge
                                        colorScheme="success"
                                        style={{ width: "65%" }}
                                      >
                                        {data.attendance_status
                                          .charAt(0)
                                          .toUpperCase() +
                                          data.attendance_status.slice(1)}
                                      </Badge>
                                    ) : data.attendance_status == "absent" ? (
                                      <Badge
                                        colorScheme="danger"
                                        style={{ width: "65%" }}
                                      >
                                        {data.attendance_status
                                          .charAt(0)
                                          .toUpperCase() +
                                          data.attendance_status.slice(1)}
                                      </Badge>
                                    ) : (
                                      <Badge
                                        colorScheme="yellow"
                                        style={{ width: "65%" }}
                                      >
                                        {data.attendance_status
                                          .charAt(0)
                                          .toUpperCase() +
                                          data.attendance_status.slice(1)}
                                      </Badge>
                                    )}
                                  </View>
                                </View>

                                {/* <View style={{ flex: 0.7 }}>
                                  <IconButton
                                    colorScheme="success"
                                    onPress={() =>
                                      editItem(
                                        data.student.id,
                                        data.student.reg_number,
                                        data.student.student_name
                                      )
                                    }
                                    variant="subtle"
                                    _icon={{
                                      as: Ionicons,
                                      name: "md-pencil-sharp",
                                    }}
                                  />
                                </View> */}
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}

                {editBtnPressed &&
                  saveAttendanceDataByDCS.map((data, key) => (
                    <View style={changeBorderColor(data.student.id)}>
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
                            <View
                              style={{
                                flex: 0.5,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={[styles.textBase, styles.description]}
                              >
                                {data.student.reg_number}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={[styles.textBase, styles.description]}
                              >
                                {data.student.student_name}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={{ flex: 0.2 }}>
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
                                    flexDirection: "column",
                                    marginVertical: 10,
                                    marginHorizontal: 10,
                                  },
                                ]}
                              >
                                <View style={{ flex: 1 }}>
                                  <Button
                                    onPress={() => updatePresentButton(data)}
                                    // color={data.attendance_status === 'present' ? 'green' : changeColorUpdate(data.student.id, "P")}
                                    color={changeColorUpdate(
                                      data.student.id,
                                      "P"
                                    )}
                                    title="P"
                                  />
                                </View>
                                <View style={styles.space} />
                                <View style={{ flex: 1 }}>
                                  <Button
                                    onPress={() => updateAbsentButton(data)}
                                    //  color={data.attendance_status === 'absent' ? 'red' : changeColorUpdate(data.student.id, "A")}
                                    color={changeColorUpdate(
                                      data.student.id,
                                      "A"
                                    )}
                                    title="A"
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
              </ScrollView>
            }
            <Modal
              isOpen={open}
              onClose={() => setOpen(false)}
              //safeAreaTop={true}
              size="full"
            >
              <Modal.Content maxWidth="90%" minHeight="5%">
                <Modal.Header
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  Holiday Description
                </Modal.Header>
                <Modal.Body>
                  <FormControl.Label>Description</FormControl.Label>
                  <NativeInput
                    multiline={true}
                    style={[
                      styles.descriptionTextStyle,
                      descriptionInputIsInValid && styles.errorBorderColor,
                    ]}
                    value={description}
                    onChangeText={descriptionChangeHandler}
                  />
                  {descriptionInputIsInValid && (
                    <Text style={[styles.errorText, { left: 0 }]}>
                      Enter the description
                    </Text>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <NativeButton.Group space={2}>
                    <NativeButton onPress={donePressedHandler}>
                      Done
                    </NativeButton>
                    <NativeButton
                      onPress={() => {
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </NativeButton>
                  </NativeButton.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </View>
          {!showDCSData && (
            <View
              style={{
                flex: 0.3,
                marginHorizontal: 60,
                bottom: "3%",
                left: "10%",
              }}
            >
              <NativeButton
                size="md"
                onPress={editBtnPressed ? updateHandler : saveAttendance}
                w={editBtnPressed ? "1/3" : "3/4"}
                left={editBtnPressed ? "155" : "0"}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "HindSemiBold",
                    color: "white",
                  }}
                >
                  {editBtnPressed ? "Update" : "Save"}
                </Text>
              </NativeButton>
              {editBtnPressed && (
                <NativeButton
                  size="md"
                  onPress={cancelHandler}
                  w="1/3"
                  right="20"
                  bottom="10"
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "HindSemiBold",
                      color: "white",
                    }}
                  >
                    Cancel
                  </Text>
                </NativeButton>
              )}
            </View>
          )}
          <View style={{ flex: 0.2 }}>
            <TeachersHome />
          </View>
        </View>
      )}
    </>
  );
};

export default TeachersAttendanceBuild;

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  descriptionTextStyle: {
    fontSize: 18,
  },
  errorBorderColor: {
    borderColor: "red",
  },
  viewStyle: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#D3D2FF",
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
  },
  overallContainer: {
    flex: 1,
    flexDirection: "row",
    top: "10%",
  },
  iconContainer: {
    flex: 0.3,
    justifyContent: "center",
    bottom: "1%",
    alignItems: "flex-start",
  },
  dateContainer: {
    flex: 2,
    //right: "5%",
  },
  studentItem: {
    // width: "90%",

    padding: 11,
    marginVertical: 8,
    // //  backgroundColor: "#3e04c3",
    backgroundColor: "#f0f0fc",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 6,
  },
  textBase: {
    color: "black",
    marginRight: 33,
  },
  leaveSpace: {
    width: 60, // or whatever size you need
    height: 10,
  },
  dateLabelSpace: {
    width: 40, // or whatever size you need
    height: 10,
  },
  inputForm: {
    flex: 2,
    paddingHorizontal: 20,
    //marginTop: "6%",
    //paddingTop: '5%',
    backgroundColor: "white",
    // height: "100%",
  },
  description: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: "bold",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  errorBorderColorDate: {
    borderBottomColor: "red",
  },
  commonErrorMsg: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 16 : 18,
    top: deviceHieght > 800 ? -3 : 1,
  },
  errorSelectedColor: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: 16,
  },
  labelStyle: {
    fontFamily: "HindBold",
    fontSize: 16,
  },
  title: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    top: "5%",
  },
  tableHeader: {
    flex: 0.2,
    flexDirection: "row",
    top: "17%",
    borderWidth: 1,
    marginHorizontal: 20,
    backgroundColor: "darkblue",
  },
  tableText: {
    flex: 1,
    flexDirection: "row",
    // paddingHorizontal:10,
    // marginHorizontal:10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  headerText: {
    fontFamily: "HindBold",
    fontSize: 16,
    color: "white",
  },
  th: {
    padding: 5,
    marginRight: 13,
    //fontSize: 24,
  },

  tableTitle: {
    // padding: 5,
    margin: 7,
    fontFamily: "HindMedium",
    fontSize: 20,
  },
  tableCell: {
    width: 110,

    marginLeft: 35,
  },

  tableMarks: {
    width: 10,

    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  searchBar: {
    //top: 10,
    backgroundColor: "#F0F3F4",
    marginTop: 10,
    marginBottom: 20,
  },
  root: {
    // backgroundColor: "#EBECFO",
    backgroundColor: "white",
    height: "100%",
  },
  cardStyle: {
    marginVertical: 15,
    marginHorizontal: 27,
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#2E799B",
    width: "80%",
  },
});

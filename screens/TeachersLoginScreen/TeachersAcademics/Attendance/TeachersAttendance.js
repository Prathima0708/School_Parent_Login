

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
  Heading,
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

var USERID,
  TOKEN,
  newArray,
  IDSETARRAY = [],FROMDATE;
var filteredArray = [];

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

  const [showCalendar, setShowCalendar] = useState(true);
  const [showStudList, setShowStudList] = useState(false);
  const [showAttendeesList,setShowAttendessList]=useState(false);

  const [data, setData] = useState([]);
  const [array, setArray] = useState([]);
  const [classTeacherData, setClassTeacherData] = useState([]);
  const [showSavedAttendance,setShowSavedAttendance] = useState([]);
  const [updateArray,setUpdateArray]=useState([])
  const [showUpdatedSavedAttendance,setShowUpdatedSavedAttendance]=useState([])
  
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);

  const [presentPressed, setPresentPressed] = useState(false);
  const [absentPressed, setAbsentPressed] = useState(false);
  const [editBtnPressed, setEditBtnPressed] = useState(false);

  const [missedID, setMissedID] = useState(false);
  const [test, setTest] = useState(false);

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const navigation = useNavigation();

  

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
    if (showCalendar) {
      setShowCalendar(true);
      navigation.setOptions({ headerShown: true });
    }
    if (showStudList) {
      navigation.setOptions({ headerShown: false });
    }
    if (showAttendeesList) {
      navigation.setOptions({ headerShown: false });
    }
  }, [showCalendar, showStudList,showAttendeesList]);

  function viewStudentList() {
    async function fetchStudents() {
      let filteredlist = newArray.filter(
        (ele) => ele.key == selectedClassSection
      );
      filteredArray = filteredlist;
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

  function buttonPressedHandler() {
    setEnteredSelectedTouched(true);
    setEnteredFromDateTouched(true);

    if (!enteredSelcetdIsValid || !enteredFromDateIsValid) {
      return;
    } else {

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
          
          let result = res.data.map((
            {
              attendance_date, 
              class_name,
              section
            }) => ({attendance_date, class_name,section}));
           
            let found = result.find(
              x => x.attendance_date === request_model.attendance_date && 
              x.class_name === request_model.class_name &&
              x.section === request_model.section);
            
            if(found) {
              console.log("object found")
              setShowCalendar(false);
              setShowAttendessList(true);  
              showList();
            } else {
              console.log("object not found")
              setShowCalendar(false);
              setShowStudList(true);
            }
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }
  }

  function updatedPresentButtonPressed(data){
    setAbsentPressed(false);
    setPresentPressed(true);

    const object = {
      student: data.student.id,
      attendance_date: moment(fromDate).format("YYYY-MM-DD"),
      class_name: filteredArray[0].classname,
      section: filteredArray[0].section,
      attendance_status: "present",
      description: "",
      id: data.id
    };
  
    const existingItem = updateArray.find((item) => item.student === object.student);

    if (existingItem) {
      setUpdateArray(
        updateArray.map((item) => (item.student === object.student ? object : item))
      );
    } else {
      setUpdateArray((prevArray) => [...prevArray, object]);
      //setItems([...items, updatedItem]);
    }

    if (IDSETARRAY.length > 0) {
      var selectedID = IDSETARRAY.filter((item) => item === id);

      if (selectedID.length > 0) {
        IDSETARRAY = IDSETARRAY.filter((item) => item !== selectedID[0]);
      }
    }
  }

  function updateAbsentBtnHandler(data) {
    setAbsentPressed(true);
    setPresentPressed(false);

    const object = {
      student: data.student.id,
      attendance_date: moment(fromDate).format("YYYY-MM-DD"),
      class_name: filteredArray[0].classname,
      section: filteredArray[0].section,
      attendance_status: "absent",
      description: "",
      id: data.id
    };
    const existingItem = updateArray.find((item) => item.student === object.student);

    if (existingItem) {
      setUpdateArray(
        updateArray.map((item) => (item.student === object.student ? object : item))
      );
    } else {
      setUpdateArray((prevArray) => [...prevArray, object]);
      //setItems([...items, updatedItem]);
    }

    if (IDSETARRAY.length > 0) {
      var selectedID = IDSETARRAY.filter((item) => item === id);

      if (selectedID.length > 0) {
        IDSETARRAY = IDSETARRAY.filter((item) => item !== selectedID[0]);
      }
    }
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
    console.log(object)
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
    //setSelectedStatus("Present");

    // while(array.length > 0) {
    //   array.pop();
    // }
    array.length = 0;

    for (i = 0; i < data.length; i++) {
      // const object = {
      //   id: data[i].id,
      //   leave_status: "present",
      //   holiday_description: "",
      // };
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
    array.length = 0;
    IDSETARRAY = [];

    // setHideStudList(true);

    setOpen(true);
    setPlacement(placement);
    setEnteredDescription("");
    setEnteredDescriptionTouched(false);
  }

  function saveAttendance() {
  //  console.log("finalList", array);
   
    async function storeData() {
      
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Token " + `${token}`,
        };

        const resData = await axios.post(`${subURL}/Attendance/`, array, {
          headers: headers,
        });
        console.log(resData.data)
        setShowStudList(false);
        setShowAttendessList(true);
        showList();
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
      setMissedID(false);
    } else {
      setMissedID(true);
    }

    IDSet = [...mainId].filter((x) => !selectedId.has(x));

    IDSETARRAY = IDSet;

    IDSet.forEach((value, index, set) => {
      if (mainId.has(value)) {
        setTest(true);
      } else {
        setTest(false);
      }
    });
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

  function changeUpdateColor(id, text) {

    if (updateArray.filter((item) => item.id === id)) {
      var selectedData = [];
      selectedData = updateArray.filter((item) => item.id === id);
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
    setShowAttendessList(false);
    setSelectedClassSection("");
    setEnteredSelectedTouched(false);
    setEditBtnPressed(false)
    setFromText("");
    setEnteredFromDateTouched(false);
    setShowUpdatedSavedAttendance(false)
    array.length = 0;
    IDSETARRAY = [];
  }

  function donePressedHandler() {
    // setOpen(false);
    for (i = 0; i < data.length; i++) {
      const object = {
        id: data[i].id,
        leave_status: "holiday",
        holiday_description: description,
      };

      array.push(object);
    }

    viewStudentList();
    setEnteredDescriptionTouched(true);

    if (!enteredDescriptionIsValid) {
      return;
    } else {
      setOpen(false);
    }
  }

  const editAttendance = (text) => {
    setEditBtnPressed(true);

    if(text==='Update'){
      setEditBtnPressed(false);
    }
    async function getData() {
      try {

        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Token " + `${token}`,
        };
        const res = await axios.put(
          `${subURL}/Attendance/`,
          updateArray,
          {
            headers: headers,
          }
        ); 
        
        setShowAttendessList(true);
        showList();
        
      } catch (error) {
        console.log(error);
      }
    }
    getData();

  }

  function showList(){

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
        setShowSavedAttendance(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }

  return (
    <>
      {showCalendar && (
        <View
          style={[
            { flex: 1 },
            { flexDirection: "column", backgroundColor: "white" },
          ]}
        >
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
                      //marginLeft: 10,
                    }}
                  >
                    Select Date
                  </Text>
                  <View style={styles.dateLabelSpace} />

                  <View style={styles.dateContainer}>
                    <UnderlinedInput
                      value={fromText}
                      placeholder="Select Date"
                      // onSubmitEditing={Keyboard.dismiss}
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

      {showStudList && (
        <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
          <View
            style={[
              { flex: 0.9 },
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <BackButton onPress={backButtonHandler} />
          </View>

          <View
            style={{
              flex: keyboardStatus == "Keyboard Hidden" ? 0.7 : 1,
              bottom: "7%",
            }}
          >
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

            <View
              style={[
                { flex: 1 },
                {
                  flexDirection: "column",
                  marginLeft: "7%",
                },
              ]}
            >
              <View style={{ flex: 0.8 }}>
                <View
                  style={[
                    { flex: 1 },
                    {
                      flexDirection: "row",
                    },
                  ]}
                >
                  <View style={{ flex: 0.2, justifyContent: "center" }}>
                    <Text style={styles.labelStyle}>Class :</Text>
                  </View>
                  <View style={{ flex: 1 }}>
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
                      flexDirection: "row",
                    },
                  ]}
                >
                  <View style={{ flex: 0.2, justifyContent: "center" }}>
                    <Text style={styles.labelStyle}>Date :</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.labelStyle}>{fromText}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 2, bottom: "6%" }}>
            {
              <>
                <ScrollView>
                {
                  data &&
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
                                  flex: 0.5,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={[styles.textBase, styles.description]}
                                >
                                  {data.id}
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
                              {/* <View style={{ flex: 0.9 }} >
                            
                          </View> */}
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
              </ScrollView>
              </>
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
          <View
            style={{
              flex: 0.3,
              marginHorizontal: 60,
              bottom: "3%",
              left: "10%",
            }}
          >
            <NativeButton size="md" onPress={saveAttendance} w="3/4">
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "HindSemiBold",
                  color: "white",
                }}
              >
                Save
              </Text>
            </NativeButton>
          </View>
          <View style={{ flex: 0.2 }}>
            <TeachersHome />
          </View>
        </View>
      )}


      {showAttendeesList && (
        <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
          <View
            style={[
              { flex: 0.9 },
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <BackButton onPress={backButtonHandler} />
          </View>

          <View style={{ flex: 2, bottom: "6%" }}>
            {
              <ScrollView>
                {showSavedAttendance.length<=0 
                ? <Spinner accessibilityLabel="Loading posts" /> :
                showSavedAttendance &&
                    showSavedAttendance.map((data, key) => (
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
                                  flex: 0.5,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={[styles.textBase, styles.description]}
                                >
                                  {data.student.id}
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

                          {editBtnPressed ?
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
                                      updatedPresentButtonPressed(data)
                                    }
                                    color={changeUpdateColor(data.id, "P")}
                                    title="P"
                                  />
                                </View>
                                <View style={styles.space} />
                                <View style={{ flex: 1 }}>
                                  <Button
                                    onPress={() => updateAbsentBtnHandler(data)}
                                    color={changeUpdateColor(data.id, "A")}
                                    title="A"
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        </View> 
                          : 
                          <View style={{ flex: 0.4 }}>
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
                                    {data.attendance_status == "present" ? (
                                      <Badge
                                        colorScheme="success"
                                        style={{ width: "100%" }}
                                      >
                                        {data.attendance_status}
                                      </Badge>
                                    ) : (
                                      <Badge
                                        colorScheme="danger"
                                        style={{ width: "100%" }}
                                      >
                                        {data.attendance_status}
                                      </Badge>
                                    )}
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>}
                        </View>
                      </View>
                    ))}
                
              </ScrollView>
            }
            
          </View>
          <View
            style={{
              flex: 0.3,
              marginHorizontal: 60,
              bottom: "3%",
              left: "2%",
            }}
          >
            <Button 
              onPress={() => editAttendance(editBtnPressed ? "Update" : "Edit attendance")}
              title={editBtnPressed ? "Update" : "Edit attendance"}/>
          </View>
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
    marginTop: "30%",
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
  checkBoxContainer: {},
});

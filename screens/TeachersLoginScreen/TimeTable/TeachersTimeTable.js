// import {
//   View,
//   StyleSheet,
//   Text,
//   ScrollView,
//   TextInput,
//   Button as Btn,
//   TouchableOpacity,
//   Pressable,
//   Alert,
//   Dimensions,
//   LogBox,
//   Animated,
//   ActivityIndicator,
// } from "react-native";
// import React, { useRef, useState } from "react";
// import axios from "axios";
// import { Keyboard } from "react-native";
// import BgButton from "../../../components/UI/BgButton";
// import VerticalLine from "../../../components/UI/VerticalLine";
// import Button from "../../../components/UI/Button";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import SelectList from "react-native-dropdown-select-list";
// import TeachersHome from "../BottomTab/TeachersHome";
// import { AntDesign, Ionicons } from "@expo/vector-icons";
// import { useEffect } from "react";
// import TecahersExamTimeTable from "./TecahersExamTimeTable";
// import { DataTable } from "react-native-paper";
// import Input from "../../../components/UI/Input";
// import moment from "moment";
// import TimeSlots from "./TimeSlots";
// import UnderlinedInput from "../../../components/UI/UnderlinedInput";
// import { IconButton, Button as NativeButton } from "native-base";

// export var CLASSNAME, SECTION, ID;
// export var idTimeTab = [];
// export var TimeTabID;
// export var FROMTIME, TOTIME;

// const TeachersTimetable = () => {
//   const [isMonActive, setIsMonActive] = useState(true);
//   const [isTueActive, setIsTueActive] = useState(false);
//   const [isWedActive, setIsWedActive] = useState(false);
//   const [isThuActive, setIsThuActive] = useState(false);
//   const [isFriActive, setIsFriActive] = useState(false);
//   const [isSatActive, setIsSatActive] = useState(false);

//   const [mondayTimeTable, setMondayTimeTable] = useState(true);
//   const [tuesdayTimeTable, setTuesdayTimeTable] = useState(false);
//   const [wednesdayTimeTable, setWednesdayTimeTable] = useState(false);
//   const [thursdayTimeTable, setThursdayTimeTable] = useState(false);
//   const [fridayTimeTable, setFridayTimeTable] = useState(false);
//   const [saturdayTimeTable, setSaturdayTimeTable] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const scrollY = new Animated.Value(0);

//   const headermax = 80;
//   const headermin = 10;

//   const animateHeaderBackGround = scrollY.interpolate({
//     inputRange: [0, headermax - headermin],
//     outputRange: ["white", "white"],
//     extrapolate: "clamp",
//   });

//   const animateHeaderHeight = scrollY.interpolate({
//     inputRange: [0, headermax - headermin],
//     outputRange: [headermax, headermin],
//     extrapolate: "clamp",
//   });
//   const [isCreateDateFocused, setIsCreateDateFocused] = useState(false);
//   const [isFromFocused, setIsFromFocused] = useState(false);
//   const [isToFocused, setIsToFocused] = useState(false);
//   const [isMondayFocused, setIsMondayFocused] = useState(false);
//   const [isTuesdayFocused, setIsTuesdayFocused] = useState(false);
//   const [isWednesdayFocused, setIsWednesdayFocused] = useState(false);
//   const [isThurdayFocused, setIsThursdayFocused] = useState(false);
//   const [isFridayFocused, setIsFridayFocused] = useState(false);
//   const [isSaturdayFocused, setIsSaturdayFocused] = useState(false);

//   const [monLabel, setMonLabel] = useState(false);
//   const [tueLabel, setTueLabel] = useState(false);
//   const [wedLable, setWedLabel] = useState(false);
//   const [thurLabel, setTHurLabel] = useState(false);
//   const [friLabel, setFriLabel] = useState(false);
//   const [satLabel, setSatLabel] = useState(false);

//   const [btn, setBtn] = useState(false);

//   const [showForm, setShowForm] = useState(false);
//   const [showExamList, setShowExamList] = useState(false);
//   const [year, setYear] = useState("");

//   const [studClassData, setStudentClassData] = useState([]);
//   const [tdata, settdata] = useState([]);

//   const [selectedClass, setSelectedClass] = useState("");

//   const [monday, setMonday] = useState("");
//   const [enteredMondayTouched, setEnteredMondayTouched] = useState(false);
//   const enteredMondayIsValid = monday.trim() !== "";
//   const mondayInputIsInValid = !enteredMondayIsValid && enteredMondayTouched;

//   const [tuesday, setTuesday] = useState("");
//   const [enteredTuesdayTouched, setEnteredTuesdayTouched] = useState(false);
//   const enteredTuesdayIsValid = tuesday.trim() !== "";
//   const tuesdayInputIsInValid = !enteredTuesdayIsValid && enteredTuesdayTouched;

//   const [wednesday, setWednesday] = useState("");
//   const [enteredWednesdayTouched, setEnteredWednesdayTouched] = useState(false);
//   const enteredWednesdayIsValid = wednesday.trim() !== "";
//   const wednesdayInputIsInValid =
//     !enteredWednesdayIsValid && enteredWednesdayTouched;

//   const [thursday, setThursday] = useState("");
//   const [enteredThursdayTouched, setEnteredThursdayTouched] = useState(false);
//   const enteredThursdayIsValid = thursday.trim() !== "";
//   const thursdayInputIsInValid =
//     !enteredThursdayIsValid && enteredThursdayTouched;

//   const [friday, setFriday] = useState("");
//   const [enteredFridayTouched, setEnteredFridayTouched] = useState(false);
//   const enteredFridayIsValid = friday.trim() !== "";
//   const fridayInputIsInValid = !enteredFridayIsValid && enteredFridayTouched;

//   const [saturday, setSaturday] = useState("");
//   const [enteredSaturdayTouched, setEnteredSaturdayTouched] = useState(false);
//   const enteredSaturdayIsValid = saturday.trim() !== "";
//   const saturdayInputIsInValid =
//     !enteredSaturdayIsValid && enteredSaturdayTouched;

//   const [showTimeTableList, setShowTimeTableList] = useState(true);
//   const [showTimeTableData, setShowTimeTableData] = useState([]);

//   const [showTable, setShowTable] = useState(false);
//   const [forTimeTableList, setForTimeTableList] = useState({
//     // color: "#3d4590",

//     // backgroundColor: "#D6EAF8",
//     color: "white",
//     backgroundColor: "#0C60F4",
//     borderRadius: 10,
//     // borderTopColor: "#3d4590",
//     borderBottomWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     fontFamily: "HindSemiBold",
//   });
//   const [forExamTimeTable, setForExamTimeTable] = useState({
//     // color: "#d9dffc",
//     color: "black",
//     // borderTopColor: "#d9dffc",
//     backgroundColor: "#F4F6F6",
//     borderBottomWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     fontFamily: "HindSemiBold",
//   });
//   const [TimeTableData, setTimeTableData] = useState([]);

//   const [selectedTimeTable, setSelectedTimeTable] = useState("");
//   const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
//   const enteredSelcetdIsValid = selectedTimeTable.trim() !== "";
//   const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

//   const [fromTime, setFromTime] = useState(new Date());
//   const [toTime, setToTime] = useState(new Date());

//   const [fromTimemode, setFromTimeMode] = useState("time");
//   const [toTimemode, setToTimeMode] = useState("time");

//   const [fromTimeShow, setFromTimeShow] = useState(false);
//   const [toTimeShow, setToTimeShow] = useState(false);

//   const [fromTimeText, setFromTimeText] = useState("");
//   const [enteredFromTimeTouched, setEnteredFromTimeTouched] = useState(false);
//   const enteredFromTimeIsValid = fromTimeText;
//   const fromtimeInputIsInValid =
//     !enteredFromTimeIsValid && enteredFromTimeTouched;

//   const [toTimeText, setToTimeText] = useState("");
//   const [enteredToTimeTouched, setEnteredToTimeTouched] = useState(false);
//   const enteredToTimeIsValid = toTimeText;
//   const TotimeInputIsInValid = !enteredToTimeIsValid && enteredToTimeTouched;

//   const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
//   const [isEdit, setIsEdit] = useState(false);
//   useEffect(() => {
//     LogBox.ignoreLogs(["Each child in a list should have a unique "]);
//   }, []);
//   let i;
//   useEffect(() => {
//     const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
//       setKeyboardStatus("Keyboard Shown");
//     });
//     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
//       setKeyboardStatus("Keyboard Hidden");
//     });

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   const showTimeFromMode = (currentFromTimeMode) => {
//     setFromTimeShow(true);

//     setFromTimeMode(currentFromTimeMode);
//   };

//   const showTimeToMode = (currentTimeToMode) => {
//     setToTimeShow(true);

//     setToTimeMode(currentTimeToMode);
//   };

//   const [createdDate, setEnteredCreatedDate] = useState(new Date());

//   const [dateShow, setDateShow] = useState(false);

//   const [dateText, setDateText] = useState("");
//   const [enteredDateTextTouched, setEnteredDateTextTouched] = useState(false);
//   const enteredDateTextIsValid = dateText.trim() !== "";
//   const dateTextInputIsInValid =
//     !enteredDateTextIsValid && enteredDateTextTouched;

//   const [datemode, setDateMode] = useState("date");

//   const [frommode, setFromMode] = useState("date");
//   const [tomode, setToMode] = useState("date");
//   const [timeData, setTimeData] = useState([]);

//   const [showaddBtn, setShowAddBtn] = useState(true);
//   const [showBtn, setShowBtn] = useState(true);
//   const [inputs, setInputs] = useState([
//     {
//       fromTime: FROMTIME,
//       toTime: TOTIME,
//       // fromTimeText: "",
//       // toTimeText: "",
//       monday: "",
//       tuesday: "",
//       wednesday: "",
//       thursday: "",
//       friday: "",
//       saturday: "",
//     },
//   ]);

//   useEffect(() => {
//     async function fetchClass() {
//       try {
//         const res = await axios.get(
//           `http://10.0.2.2:8000/school/Studentclass/`
//         );
//         let newArray = res.data.map((item) => {
//           return {
//             value: item.class_name + " - " + item.section,
//           };
//         });
//         setTimeTableData(newArray);

//         setStudentClassData(newArray);
//         let selectedData = selectedClass.split(" - ");
//         // console.log(selectedData);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchClass();
//   }, [selectedClass]);

//   useEffect(() => {
//     async function fetchTimeTable() {
//       try {
//         const res = await axios.get(
//           `http://10.0.2.2:8000/school/AddmoreTimetable_list/`
//         );
//         let newArray = res.data.map((item) => {
//           return {
//             value: item.from_time + " - " + item.to_time,
//           };
//         });

//         settdata(newArray);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchTimeTable();
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, []);

//   function createdDateChangeHandler(enteredValue) {
//     setEnteredCreatedDate(enteredValue);
//   }

//   const fromTimeChangeHandler = (event, selectedFromTime) => {
//     const currentFromTime = selectedFromTime;
//     FROMTIME = selectedFromTime;
//     setFromTimeShow(Platform.OS === "ios");
//     setFromTime(currentFromTime);

//     let tempFromTime = new Date(currentFromTime);
//     let fTime =
//       tempFromTime.getHours() +
//       ":" +
//       tempFromTime.getMinutes() +
//       ":" +
//       tempFromTime.getSeconds();
//     if (event.type == "set") {
//       setFromTimeText(fTime);
//     } else {
//     }
//   };

//   const toTimeChangeHandler = (event, selectedToTime) => {
//     TOTIME = selectedToTime;
//     const currentToTime = selectedToTime;
//     setToTimeShow(Platform.OS === "ios");
//     setToTime(currentToTime);

//     let tempToTime = new Date(currentToTime);

//     let tTime =
//       tempToTime.getHours() +
//       ":" +
//       tempToTime.getMinutes() +
//       ":" +
//       tempToTime.getSeconds();
//     if (event.type == "set") {
//       setToTimeText(tTime);
//     } else {
//       //cancel button clicked
//     }

//     // console.log(fDate);
//   };

//   const DateChangeHandler = (event, selectedToDate) => {
//     const currentToDate = selectedToDate || toDate;
//     setDateShow(Platform.OS === "ios");
//     setEnteredCreatedDate(currentToDate);

//     let tempToDate = new Date(currentToDate);
//     let tDate =
//       tempToDate.getDate() +
//       "/" +
//       (tempToDate.getMonth() + 1) +
//       "/" +
//       tempToDate.getFullYear();
//     setDateText(tDate);
//     // console.log(fDate);
//     if (event.type == "set") {
//       setDateText(tDate);
//     }
//   };

//   const showDateMode = (currentToMode) => {
//     setDateShow(true);

//     setToMode(currentToMode);
//   };

//   function viewExam() {
//     setForTimeTableList({
//       backgroundColor: "#F4F6F6",
//       color: "black",
//       borderRadius: 10,
//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//     });

//     setForExamTimeTable({
//       color: "white",
//       backgroundColor: "#1E8449",
//       borderRadius: 10,
//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//     });
//     setShowForm(true);
//     setShowTable(false);
//     setShowTimeTableList(false);
//     setShowExamList(true);
//     setShowAddBtn(false);
//   }
//   function timeTableList() {
//     async function fetchDailyTimeTable() {
//       try {
//         const res = await axios.get(
//           `http://10.0.2.2:8000/school/AddmoreTimetable_list/`
//         );
//         setShowTimeTableData(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//       setForExamTimeTable({
//         color: "black",
//         backgroundColor: "#F4F6F6",
//         borderRadius: 10,
//         borderTopColor: "#d9dffc",
//         borderBottomWidth: 0,
//         borderLeftWidth: 0,
//         borderRightWidth: 0,
//       });
//       setForTimeTableList({
//         backgroundColor: "#0C60F4",
//         color: "white",
//         borderRadius: 10,
//         borderBottomWidth: 0,
//         borderLeftWidth: 0,
//         borderRightWidth: 0,
//       });
//       setShowAddBtn(true);
//       setShowTimeTableList(true);
//       setShowForm(false);
//       setShowTable(false);
//     }
//     fetchDailyTimeTable();
//   }

//   function addPeriodsHandler() {
//     console.log("from picker" + fromTime, "from text" + fromTimeText);
//     setFromTimeText("");
//     console.log(fromTimeText);
//     const _inputs = [...inputs];
//     _inputs.push({
//       fromTime: "",
//       toTime: "",
//       monday: "",
//       tuesday: "",
//       wednesday: "",
//       thursday: "",
//       friday: "",
//       saturday: "",
//     });
//     setInputs(_inputs);
//     setEnteredSelectedTouched(false);
//     setEnteredDateTextTouched(false);
//     setEnteredFromTimeTouched(false);
//     setEnteredToTimeTouched(false);
//     setEnteredMondayTouched(false);
//     setEnteredTuesdayTouched(false);
//     setEnteredWednesdayTouched(false);
//     setEnteredThursdayTouched(false);
//     setEnteredFridayTouched(false);
//     setEnteredSaturdayTouched(false);
//     setMonday("");
//     setTuesday("");
//     setWednesday("");
//     setThursday("");
//     setFriday("");
//     setSaturday("");
//   }

//   function addDailyTimeTableHandler() {
//     setBtn(true);
//     //  console.log(inputs);
//     console.log("-----------------------------------------------");
//     let selectedData = selectedTimeTable.split(" - ");
//     let class_name = selectedData[0];
//     let section = selectedData[1];

//     const sendtoTimeTable = {
//       class_name: class_name,
//       section: section,
//       timetable_date: createdDate,
//     };

//     setEnteredSelectedTouched(true);
//     setEnteredDateTextTouched(true);
//     setEnteredFromTimeTouched(true);
//     setEnteredToTimeTouched(true);
//     setEnteredMondayTouched(true);
//     setEnteredTuesdayTouched(true);
//     setEnteredWednesdayTouched(true);
//     setEnteredThursdayTouched(true);
//     setEnteredFridayTouched(true);
//     setEnteredSaturdayTouched(true);

//     if (!enteredSelcetdIsValid) {
//       return;
//     }
//     if (!enteredDateTextIsValid) {
//       return;
//     }
//     if (!enteredFromTimeIsValid) {
//       return;
//     }
//     if (!enteredToTimeIsValid) {
//       return;
//     }
//     if (!enteredMondayIsValid) {
//       return;
//     }
//     if (!enteredTuesdayIsValid) {
//       return;
//     }
//     if (!enteredWednesdayTouched) {
//       return;
//     }
//     if (!enteredThursdayTouched) {
//       return;
//     }
//     if (!enteredFridayTouched) {
//       return;
//     }
//     if (!enteredSaturdayTouched) {
//       return;
//     }
//     // else {
//     async function storeTimeTable() {
//       //  console.log(inputs);
//       let headers = {
//         "Content-Type": "application/json; charset=utf-8",
//       };

//       const resLoginTimeTable = await axios.post(
//         `http://10.0.2.2:8000/school/Timetable/`,
//         sendtoTimeTable,
//         {
//           headers: headers,
//         }
//       );
//       const getTimeTableData = await axios.get(
//         `http://10.0.2.2:8000/school/Timetable/`,

//         {
//           headers: headers,
//         }
//       );
//       setTimeData(getTimeTableData.data);

//       for (i = 0; i < getTimeTableData.data.length; i++) {
//         idTimeTab[i] = getTimeTableData.data[i].id;
//       }
//       for (let i = 0; i < inputs.length; i++) {
//         const FormData = {
//           timetab: idTimeTab[0],

//           // from_time: fromTimeText,
//           // to_time: toTimeText,
//           from_time: inputs[i].fromTime,
//           to_time: inputs[i].toTime,
//           monday: inputs[i].monday,
//           Tuesday: inputs[i].tuesday,
//           wednesday: inputs[i].wednesday,
//           thursday: inputs[i].thursday,
//           friday: inputs[i].friday,
//           saturday: inputs[i].saturday,
//           createdDate: "",
//           modifiedDate: "",
//         };
//         console.log(FormData);
//         async function storeData() {
//           try {
//             let headers = {
//               "Content-Type": "application/json; charset=utf-8",
//             };
//             const dataForm = FormData;
//             const resLogin = await axios.post(
//               `http://10.0.2.2:8000/school/AddmoreTimetable_list/`,
//               dataForm,
//               {
//                 headers: headers,
//               }
//             );

//             const token = resLogin.data.token;
//           } catch (error) {
//             console.log(error);
//           }
//         }

//         storeData();
//       }
//     }

//     storeTimeTable();

//     const formIsValid =
//       enteredDateTextIsValid &&
//       enteredSelcetdIsValid &&
//       enteredMondayIsValid &&
//       enteredTuesdayIsValid &&
//       enteredWednesdayIsValid &&
//       enteredThursdayIsValid &&
//       enteredFridayIsValid &&
//       enteredSaturdayIsValid;
//     // if (formIsValid) {
//     Alert.alert("Saved Data", "Saved Data successfully", [
//       {
//         text: "OK",
//         onPress: () => {
//           setShowForm(false);
//           timeTableList();
//         },
//       },
//     ]);
//     // }

//     setEnteredSelectedTouched(false);
//     setEnteredDateTextTouched(false);
//     setEnteredFromTimeTouched(false);
//     setEnteredToTimeTouched(false);
//     setEnteredMondayTouched(false);
//     setEnteredTuesdayTouched(false);
//     setEnteredWednesdayTouched(false);
//     setEnteredThursdayTouched(false);
//     setEnteredFridayTouched(false);
//     setEnteredSaturdayTouched(false);
//     setShowTimeTableList(true);
//     setShowTable(false);
//     //   }

//     setFromTimeText("");
//     setToTimeText("");
//     setToTime("");

//     setDateText("");
//   }

//   const deleteHandler = (key) => {
//     const _inputs = inputs.filter((input, index) => index != key);
//     setInputs(_inputs);
//   };

//   const inputHandlerMonday = (text, key) => {
//     const _inputs = [...inputs];

//     _inputs[key].monday = text;

//     setInputs(_inputs);
//     setMonday(text);
//   };

//   const inputHandlerTuesday = (text, key) => {
//     const _inputs = [...inputs];
//     _inputs[key].tuesday = text;

//     setInputs(_inputs);
//     setTuesday(text);
//   };

//   const inputHandlerWed = (text, key) => {
//     const _inputs = [...inputs];
//     _inputs[key].wednesday = text;

//     setInputs(_inputs);
//     setWednesday(text);
//   };

//   const inputHandlerThur = (text, key) => {
//     const _inputs = [...inputs];
//     _inputs[key].thursday = text;

//     setInputs(_inputs);
//     setThursday(text);
//   };

//   const inputHandlerFri = (text, key) => {
//     const _inputs = [...inputs];
//     _inputs[key].friday = text;

//     setInputs(_inputs);
//     setFriday(text);
//   };

//   const inputHandlerSat = (text, key) => {
//     const _inputs = [...inputs];
//     _inputs[key].saturday = text;

//     setInputs(_inputs);
//     setSaturday(text);
//   };

//   function viewTimeTableform() {
//     setShowTable(true);
//     setShowAddBtn(false);
//     setShowTimeTableList(false);
//     setIsEdit(false);
//     setFromTimeText("");
//     setToTimeText("");
//     setDateText("");
//     setMonday("");
//     setTuesday("");
//     setWednesday("");
//     setThursday("");
//     setFriday("");
//     setSaturday("");

//     setMonLabel(true);
//     setTueLabel(true);
//     setWedLabel(true);
//     setTHurLabel(true);
//     setFriLabel(true);
//     setSatLabel(true);

//     setEnteredMondayTouched(false);
//     setEnteredTuesdayTouched(false);
//     setEnteredWednesdayTouched(false);
//     setEnteredThursdayTouched(false);
//     setEnteredFridayTouched(false);
//     setEnteredSaturdayTouched(false);
//     setEnteredDateTextTouched(false);
//     setEnteredFromTimeTouched(false);
//     setEnteredToTimeTouched(false);
//     setEnteredSelectedTouched(false);

//     setIsMondayFocused(false);
//     setIsTuesdayFocused(false);
//     setIsWednesdayFocused(false);
//     setIsThursdayFocused(false);
//     setIsFridayFocused(false);
//     setIsSaturdayFocused(false);
//   }
//   const skip = (num) => new Array(num);
//   useEffect(() => {
//     async function viewDailyTimeTableList() {
//       try {
//         const res = await axios.get(
//           `http://10.0.2.2:8000/school/AddmoreTimetable_list/`
//         );

//         setShowTimeTableData(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     viewDailyTimeTableList();
//   }, []);

//   function dateTextBlur() {
//     setEnteredDateTextTouched(true);
//     setIsCreateDateFocused(false);
//   }
//   function onCreateFocusHandler() {
//     setIsCreateDateFocused(true);
//     setEnteredDateTextTouched(false);
//   }

//   function fromTextBlur() {
//     setEnteredFromTimeTouched(true);
//     setIsFromFocused(false);
//   }
//   function onFromFocusHandler() {
//     setIsFromFocused(true);
//     setEnteredFromTimeTouched(false);
//   }

//   function toTextBlur() {
//     setEnteredToTimeTouched(true);
//     setIsToFocused(false);
//   }
//   function onToFocusHandler() {
//     setIsToFocused(true);
//     setEnteredToTimeTouched(false);
//   }

//   function mondayTextBlur() {
//     setEnteredMondayTouched(true);
//     setIsMondayFocused(false);
//   }
//   function onMondayFocusHandler() {
//     setIsMondayFocused(true);
//     setEnteredMondayTouched(false);
//     setMonLabel(true);
//   }

//   function tuesdayTextBlur() {
//     setEnteredTuesdayTouched(true);
//     setIsTuesdayFocused(false);
//   }
//   function onTuesdayFocusHandler() {
//     setIsTuesdayFocused(true);
//     setEnteredTuesdayTouched(false);
//     setTueLabel(true);
//   }

//   function wednesdayTextBlur() {
//     setEnteredWednesdayTouched(true);
//     setIsWednesdayFocused(false);
//   }
//   function onWednesdayFocusHandler() {
//     setIsWednesdayFocused(true);
//     setEnteredWednesdayTouched(false);
//     setWedLabel(true);
//   }

//   function thursdayTextBlur() {
//     setEnteredThursdayTouched(true);
//     setIsThursdayFocused(false);
//   }
//   function onThursdayFocusHandler() {
//     setIsThursdayFocused(true);
//     setEnteredThursdayTouched(false);
//     setTHurLabel(true);
//   }

//   function fridayTextBlur() {
//     setEnteredFridayTouched(true);
//     setIsFridayFocused(false);
//   }
//   function onFridayFocusHandler() {
//     setIsFridayFocused(true);
//     setEnteredFridayTouched(false);
//     setFriLabel(true);
//   }

//   function saturdayTextBlur() {
//     setEnteredSaturdayTouched(true);
//     setIsSaturdayFocused(false);
//   }
//   function onSaturdayFocusHandler() {
//     setIsSaturdayFocused(true);
//     setEnteredSaturdayTouched(false);
//     setSatLabel(true);
//   }

//   function editItem(id) {
//     setMonLabel(true);
//     setTueLabel(true);
//     setWedLabel(true);
//     setTHurLabel(true);
//     setFriLabel(true);
//     setSatLabel(true);

//     setShowTimeTableList(false);

//     const filteredDummuyData = showTimeTableData.find((data) => data.id == id);

//     setDateText(moment(filteredDummuyData.createdDate).format("DD/MM/YYYY"));
//     setFromTime(filteredDummuyData.from_time);
//     setToTime(filteredDummuyData.to_time);
//     setMonday(filteredDummuyData.monday);
//     setTuesday(filteredDummuyData.Tuesday);
//     setWednesday(filteredDummuyData.wednesday);
//     setThursday(filteredDummuyData.thursday);
//     setFriday(filteredDummuyData.friday);
//     setSaturday(filteredDummuyData.saturday);
//     setForTimeTableList({
//       backgroundColor: "#0C60F4",
//       color: "white",
//       borderRadius: 10,
//     });
//     setForExamTimeTable({
//       color: "black",
//       backgroundColor: "#F4F6F6",
//       borderRadius: 10,
//     });
//     setShowTable(true);
//     setShowTimeTableList(false);
//     setIsEdit(true);
//   }
//   function deleteItem(id) {
//     console.log(id);

//     Alert.alert("Confirm Deletion", "You are about to delete this row!", [
//       {
//         text: "Cancel",
//         onPress: () => console.log("Cancel Pressed"),
//         style: "cancel",
//       },
//       {
//         text: "Yes,delete",
//         onPress: () => deleteData(),
//       },
//     ]);
//     async function deleteData() {
//       try {
//         let headers = {
//           "Content-Type": "application/json; charset=utf-8",
//         };
//         // const dataForm = FormData;
//         const resLogin = await axios.delete(
//           `http://10.0.2.2:8000/school/AddmoreTimetable_list/${id}/`,
//           // FormData,
//           {
//             headers: headers,
//           }
//         );
//         // const token = resLogin.data.token;
//         // const userId = resLogin.data.user_id;
//         console.log(resLogin.data);
//       } catch (error) {
//         console.log(error);
//       }
//       async function fetchData() {
//         try {
//           const res = await axios.get(
//             `http://10.0.2.2:8000/school/AddmoreTimetable_list/`
//           );
//           // console.log(res.data);
//           setShowTimeTableData(res.data);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       fetchData();
//     }
//   }

//   function updateHandler() {
//     console.log(ID);
//     console.log("pressed");

//     const FormData = {};

//     async function updateData() {
//       try {
//         let headers = {
//           "Content-Type": "application/json; charset=utf-8",
//         };
//         const resLogin = await axios.put(
//           `http://10.0.2.2:8000/school/AddmoreTimetable_list/${ID}/`,
//           FormData,
//           {
//             headers: headers,
//           }
//         );
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     updateData();

//     if (
//       !enteredMondayIsValid ||
//       !enteredTuesdayIsValid ||
//       !enteredWednesdayIsValid ||
//       !enteredThursdayIsValid ||
//       !enteredFridayIsValid ||
//       !enteredSaturdayIsValid ||
//       !enteredFromTimeIsValid ||
//       !enteredToTimeIsValid
//     ) {
//       Alert.alert("Please enter all fields");
//     } else {
//       setShowTable(false);
//       setShowTimeTableList(true);
//       Alert.alert("Successfully updated", "", [
//         {
//           text: "OK",
//           onPress: () => {
//             fetchData();
//           },
//         },
//       ]);
//     }

//     async function fetchData() {
//       try {
//         const res = await axios.get(
//           `http://10.0.2.2:8000/school/AddmoreTimetable_list/`
//         );
//         setTimeTableData(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }

//   function cancelHandler() {
//     setShowTimeTableList(true);
//     setShowTable(false);
//   }

//   function mondayPressedHandler() {
//     setMondayTimeTable(true);
//     setIsMonActive(true);
//     setIsTueActive(false);
//     setIsWedActive(false);
//     setIsThuActive(false);
//     setIsFriActive(false);
//     setIsSatActive(false);
//     setTuesdayTimeTable(false);
//     setWednesdayTimeTable(false);
//     setThursdayTimeTable(false);
//     setFridayTimeTable(false);
//     setSaturdayTimeTable(false);
//   }

//   function tuesdayPressedHandler() {
//     setTuesdayTimeTable(true);
//     setIsTueActive(true);
//     setIsMonActive(false);
//     setIsWedActive(false);
//     setIsThuActive(false);
//     setIsFriActive(false);
//     setIsSatActive(false);
//     setMondayTimeTable(false);
//     setWednesdayTimeTable(false);
//     setThursdayTimeTable(false);
//     setFridayTimeTable(false);
//     setSaturdayTimeTable(false);
//   }

//   function wednesdayPressedHandler() {
//     setWednesdayTimeTable(true);
//     setIsMonActive(false);
//     setIsTueActive(false);
//     setIsWedActive(true);
//     setIsThuActive(false);
//     setIsFriActive(false);
//     setIsSatActive(false);
//     setMondayTimeTable(false);
//     setTuesdayTimeTable(false);
//     setThursdayTimeTable(false);
//     setFridayTimeTable(false);
//     setSaturdayTimeTable(false);
//   }

//   function thursdayPressedHandler() {
//     setThursdayTimeTable(true);
//     setIsMonActive(false);
//     setIsTueActive(false);
//     setIsWedActive(false);
//     setIsThuActive(true);
//     setIsFriActive(false);
//     setIsSatActive(false);
//     setMondayTimeTable(false);
//     setTuesdayTimeTable(false);
//     setWednesdayTimeTable(false);
//     setFridayTimeTable(false);
//     setSaturdayTimeTable(false);
//   }

//   function fridayPressedHandler() {
//     setFridayTimeTable(true);
//     setIsMonActive(false);
//     setIsTueActive(false);
//     setIsWedActive(false);
//     setIsThuActive(false);
//     setIsFriActive(true);
//     setIsSatActive(false);
//     setMondayTimeTable(false);
//     setTuesdayTimeTable(false);
//     setWednesdayTimeTable(false);
//     setThursdayTimeTable(false);
//     setSaturdayTimeTable(false);
//   }

//   function saturdayPressedHandler() {
//     setSaturdayTimeTable(true);
//     setIsMonActive(false);
//     setIsTueActive(false);
//     setIsWedActive(false);
//     setIsThuActive(false);
//     setIsFriActive(false);
//     setIsSatActive(true);
//     setMondayTimeTable(false);
//     setTuesdayTimeTable(false);
//     setWednesdayTimeTable(false);
//     setThursdayTimeTable(false);
//     setFridayTimeTable(false);
//   }

//   return (
//     <>
//       <View style={{ height: "100%", backgroundColor: "white" }}>
//         <View style={styles.BtnContainer}>
//           <BgButton onPress={timeTableList} style={forTimeTableList}>
//             Regular
//           </BgButton>
//           <View style={styles.space} />
//           <BgButton onPress={viewExam} style={forExamTimeTable}>
//             Exam
//           </BgButton>
//         </View>

//         {showaddBtn && (
//           <Animated.View
//             style={[
//               {
//                 height: animateHeaderHeight,
//                 backgroundColor: animateHeaderBackGround,
//               },
//             ]}
//           >
//             <View style={styles.timetablebtnIcon}>
//               <IconButton
//                 colorScheme="blue"
//                 onPress={viewTimeTableform}
//                 variant="solid"
//                 _icon={{
//                   as: Ionicons,
//                   name: "add",
//                 }}
//               />
//             </View>
//           </Animated.View>
//         )}

//         {/* {showBtn && (
//           <>
//             <View
//               style={{
//                 width: 170,
//                 fontSize: 20,
//                 marginTop: 13,
//                 margin: 10,
//               }}
//             >
//               <SelectList
//                 //  defaultOption={{ key: "1", value: "Second-A" }}
//                 //setSelected={setSelected}
//                 //  data={studData}
//                 placeholder="Select class"
//                 boxStyles={{ borderRadius: 0 }}
//                 dropdownTextStyles={{ fontSize: 18, fontFamily: "HindRegular" }}
//                 inputStyles={{ fontSize: 20, fontFamily: "HindRegular" }}
//               />
//             </View>
//             <View
//               style={{
//                 width: "50%",
//                 marginTop: -93,
//                 marginLeft: 200,
//                 position: "absolute",
//                 top: 230,
//               }}
//             >
//               <Button>View List</Button>
//             </View>
//           </>
//         )} */}
//         {showTimeTableList && (
//           <>
//             {/* <Animated.View style={{transform:[
//               {translateY:translateY}
//             ]}}> */}

//             <View
//               style={{
//                 width: 170,
//                 fontSize: 20,
//                 marginTop: 13,
//                 margin: 10,
//               }}
//             >
//               <SelectList
//                 setSelected={setSelectedClass}
//                 data={studClassData}
//                 placeholder="Select class"
//                 boxStyles={{ borderRadius: 0 }}
//                 dropdownTextStyles={{
//                   fontSize: deviceWidth < 370 ? 16 : 18,
//                   fontFamily: "HindRegular",
//                 }}
//                 inputStyles={{
//                   fontSize: deviceWidth < 370 ? 16 : 18,
//                   fontFamily: "HindRegular",
//                 }}
//               />
//             </View>
//             <View
//               style={{
//                 width: "50%",
//                 marginTop: -93,
//                 marginLeft: 200,
//                 position: "absolute",
//                 top: 230,
//               }}
//             >
//               <Button>
//                 {/* <Ionicons
//                   name="add"
//                   size={deviceWidth < 370 ? 35 : 38}
//                   color="black"
//                 /> */}
//                 View List
//               </Button>
//             </View>
//             {/* <View style={{width:'50%',top:'12%',left:'3%'}}>

//             </View>

//             <View style={styles.timetablebtn}>

//             </View> */}

//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-around",
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 20,
//                   fontFamily: "HindRegular",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {selectedClass}
//               </Text>
//             </View>

//             <View
//               style={[
//                 { flex: 1 },
//                 { flexDirection: "column", backgroundColor: "white" },
//               ]}
//             >
//               {loading ? (
//                 <ActivityIndicator
//                   size={40}
//                   visible={loading}
//                   textContent={"Loading..."}
//                   // textStyle={styles.spinnerTextStyle}
//                 />
//               ) : (
//                 <View style={{ flex: 8, bottom: 10 }}>
//                   <View style={[styles.root]}>
//                     <ScrollView>
//                       <ScrollView horizontal={true}>
//                         <View style={styles.flex}>
//                           <View
//                             style={[
//                               { flex: 0.2 },
//                               {
//                                 flexDirection: "row",
//                                 borderWidth: 1,
//                                 backgroundColor: "#EFFFFD",
//                               },
//                             ]}
//                           >
//                             <View style={styles.tableHead}>
//                               <Text
//                                 style={[styles.headingFont, { color: "black" }]}
//                               >
//                                 Timing
//                               </Text>
//                             </View>
//                             <View style={styles.tableHead}>
//                               <Text
//                                 style={[styles.headingFont, { color: "black" }]}
//                               >
//                                 MON
//                               </Text>
//                             </View>
//                             <View style={styles.tableHead}>
//                               <Text
//                                 style={[styles.headingFont, { color: "black" }]}
//                               >
//                                 TUE
//                               </Text>
//                             </View>
//                             <View style={styles.tableHead}>
//                               <Text
//                                 style={[styles.headingFont, { color: "black" }]}
//                               >
//                                 WED
//                               </Text>
//                             </View>
//                             <View style={styles.tableHead}>
//                               <Text
//                                 style={[styles.headingFont, { color: "black" }]}
//                               >
//                                 THU
//                               </Text>
//                             </View>
//                             <View style={styles.tableHead}>
//                               <Text
//                                 style={[styles.headingFont, { color: "black" }]}
//                               >
//                                 FRI
//                               </Text>
//                             </View>
//                             <View style={styles.tableHead}>
//                               <Text
//                                 style={[styles.headingFont, { color: "black" }]}
//                               >
//                                 SAT
//                               </Text>
//                             </View>
//                             <View style={styles.tableHead}>
//                               <Text
//                                 style={[styles.headingFont, { color: "black" }]}
//                               >
//                                 ACTIONS
//                               </Text>
//                             </View>
//                           </View>

//                           <View style={[styles.flexrow, { borderWidth: 1 }]}>
//                             <View
//                               style={[{ flex: 1 }, { flexDirection: "row" }]}
//                             >
//                               <View style={{ flex: 1, marginHorizontal: 10 }}>
//                                 {showTimeTableData &&
//                                   showTimeTableData.map((data) => (
//                                     <View style={[styles.root]}>
//                                       <View style={[styles.firstCol]}>
//                                         <Text style={styles.headingFirstCol}>
//                                           {moment(
//                                             data.from_time,
//                                             "HH:mm"
//                                           ).format("hh:mm ")}{" "}
//                                           {"-"} {""}
//                                           {moment(data.to_time, "HH:mm").format(
//                                             "hh:mm "
//                                           )}
//                                         </Text>
//                                       </View>
//                                     </View>
//                                   ))}
//                               </View>
//                               <View
//                                 style={{
//                                   flex: 1,
//                                   marginHorizontal: 10,
//                                   left: "4%",
//                                 }}
//                               >
//                                 {showTimeTableData &&
//                                   showTimeTableData.map((data) => (
//                                     <View style={styles.root}>
//                                       <View
//                                         style={[
//                                           styles.firstCol,
//                                           { alignItems: "center", width: 100 },
//                                         ]}
//                                       >
//                                         <Text style={styles.headingFirstCol}>
//                                           {data.monday}
//                                         </Text>
//                                       </View>
//                                     </View>
//                                   ))}
//                               </View>
//                               <View
//                                 style={{
//                                   flex: 1,
//                                   marginHorizontal: 10,
//                                   left: "1%",
//                                 }}
//                               >
//                                 {showTimeTableData &&
//                                   showTimeTableData.map((data) => (
//                                     <View style={styles.root}>
//                                       <View
//                                         style={[
//                                           styles.firstCol,
//                                           { alignItems: "center", width: 100 },
//                                         ]}
//                                       >
//                                         <Text style={[styles.headingFirstCol]}>
//                                           {data.Tuesday}
//                                         </Text>
//                                       </View>
//                                     </View>
//                                   ))}
//                               </View>
//                               <View
//                                 style={{
//                                   flex: 1,
//                                   marginHorizontal: 10,
//                                   right: "2%",
//                                 }}
//                               >
//                                 {showTimeTableData &&
//                                   showTimeTableData.map((data) => (
//                                     <View style={styles.root}>
//                                       <View
//                                         style={[
//                                           styles.firstCol,
//                                           { alignItems: "center", width: 100 },
//                                         ]}
//                                       >
//                                         <Text style={styles.headingFirstCol}>
//                                           {data.wednesday}
//                                         </Text>
//                                       </View>
//                                     </View>
//                                   ))}
//                               </View>
//                               <View
//                                 style={{
//                                   flex: 1,
//                                   marginHorizontal: 10,
//                                   right: "4%",
//                                 }}
//                               >
//                                 {showTimeTableData &&
//                                   showTimeTableData.map((data) => (
//                                     <View style={styles.root}>
//                                       <View
//                                         style={[
//                                           styles.firstCol,
//                                           { alignItems: "center", width: 100 },
//                                         ]}
//                                       >
//                                         <Text style={[styles.headingFirstCol]}>
//                                           {/* {data.thursday} */}

//                                           {data.thursday}
//                                         </Text>
//                                       </View>
//                                     </View>
//                                   ))}
//                               </View>
//                               <View
//                                 style={{
//                                   flex: 1,
//                                   marginHorizontal: 10,
//                                   right: "10%",
//                                 }}
//                               >
//                                 {showTimeTableData &&
//                                   showTimeTableData.map((data) => (
//                                     <View style={styles.root}>
//                                       <View
//                                         style={[
//                                           styles.firstCol,
//                                           { alignItems: "center", width: 100 },
//                                         ]}
//                                       >
//                                         <Text style={styles.headingFirstCol}>
//                                           {data.friday}
//                                         </Text>
//                                       </View>
//                                     </View>
//                                   ))}
//                               </View>
//                               <View
//                                 style={{
//                                   flex: 1,
//                                   marginHorizontal: 10,
//                                   right: "14%",
//                                 }}
//                               >
//                                 {showTimeTableData &&
//                                   showTimeTableData.map((data) => (
//                                     <View style={styles.root}>
//                                       <View
//                                         style={[
//                                           styles.firstCol,
//                                           { alignItems: "center", width: 100 },
//                                         ]}
//                                       >
//                                         <Text style={styles.headingFirstCol}>
//                                           {data.saturday}
//                                         </Text>
//                                       </View>
//                                     </View>
//                                   ))}
//                               </View>
//                               <View
//                                 style={{
//                                   flex: 1,
//                                   marginHorizontal: 10,
//                                   right: "5%",
//                                 }}
//                               >
//                                 {showTimeTableData &&
//                                   showTimeTableData.map((data) => (
//                                     <View style={styles.root}>
//                                       <View
//                                         style={[
//                                           styles.firstCol,
//                                           { alignItems: "center" },
//                                         ]}
//                                       >
//                                         {/*
//                                          */}
//                                         <View
//                                           style={[
//                                             { flex: 1 },
//                                             { flexDirection: "row" },
//                                           ]}
//                                         >
//                                           <View style={{ flex: 1 }}>
//                                             <Ionicons
//                                               name="md-pencil-sharp"
//                                               size={24}
//                                               color="green"
//                                               onPress={() => editItem(data.id)}
//                                             />
//                                           </View>
//                                           <View style={styles.space} />
//                                           <View style={styles.space} />
//                                           <View style={{ flex: 1 }}>
//                                             <Ionicons
//                                               name="trash"
//                                               size={24}
//                                               color="red"
//                                               onPress={() =>
//                                                 deleteItem(data.id)
//                                               }
//                                             />
//                                           </View>
//                                         </View>
//                                       </View>
//                                     </View>
//                                   ))}
//                               </View>
//                             </View>
//                           </View>
//                         </View>
//                       </ScrollView>
//                     </ScrollView>
//                   </View>
//                 </View>
//               )}
//               {keyboardStatus == "Keyboard Hidden" && (
//                 <View style={{ flex: 1 }}>
//                   <TeachersHome />
//                 </View>
//               )}
//             </View>
//           </>
//         )}
//         {showTable && (
//           <>
//             <ScrollView style={styles.root}>
//               <View style={styles.inputForm}>
//                 <View style={{ flexDirection: "row" }}>
//                   {!isEdit && (
//                     <View style={{ flex: 1 }}>
//                       {!isEdit && (
//                         <View style={styles.title}>
//                           <Text style={styles.labels}>Class name</Text>
//                         </View>
//                       )}

//                       {!isEdit && (
//                         <View
//                           style={{
//                             borderWidth: 2,
//                             borderColor: "lightgrey",

//                             borderRadius: 13,
//                             marginTop: -5,
//                           }}
//                         >
//                           <SelectList
//                             setSelected={setSelectedTimeTable}
//                             data={TimeTableData}
//                             placeholder="select class"
//                             dropdownTextStyles={{
//                               fontSize: deviceWidth < 370 ? 15 : 18,
//                               fontFamily: "HindRegular",
//                             }}
//                             inputStyles={{
//                               fontSize: deviceWidth < 370 ? 15 : 18,
//                               fontFamily: "HindRegular",
//                             }}
//                             boxStyles={
//                               selectInputIsInValid && styles.errorSelectedColor
//                             }
//                           />
//                         </View>
//                       )}
//                       {selectInputIsInValid && (
//                         <Text style={styles.commonErrorMsg}>select class</Text>
//                       )}
//                     </View>
//                   )}

//                   <View style={styles.space} />

//                   <View style={{ flex: 1 }}>
//                     <View>
//                       <Ionicons
//                         style={{
//                           position: "absolute",
//                           top: 25,
//                         }}
//                         name="calendar"
//                         size={24}
//                         color="black"
//                         onPress={() => showDateMode("date")}
//                       />
//                     </View>
//                     <UnderlinedInput
//                       placeholder="Created Date"
//                       onChangeText={createdDateChangeHandler}
//                       value={dateText}
//                       blur={dateTextBlur}
//                       onFocus={onCreateFocusHandler}
//                       style={
//                         isCreateDateFocused
//                           ? styles.focusStyle
//                           : dateTextInputIsInValid &&
//                             styles.errorBorderColorDate
//                       }
//                       onPressIn={() => showDateMode("date")}
//                     />
//                     {dateTextInputIsInValid && (
//                       <Text style={styles.commonErrorMsg}>
//                         Enter creation date
//                       </Text>
//                     )}
//                     {dateShow && (
//                       <DateTimePicker
//                         testID="dateTimePicker"
//                         value={createdDate}
//                         mode={datemode}
//                         is24Hour={true}
//                         display="default"
//                         onChange={DateChangeHandler}

//                         //  minimumDate={fromDate}
//                       />
//                     )}
//                   </View>
//                 </View>

//                 {inputs.map((input, key) => (
//                   <View>
//                     <View
//                       style={{
//                         flexDirection: "row",
//                       }}
//                     >
//                       <View style={{ flex: 1 }}>
//                         <View>
//                           <Ionicons
//                             style={{
//                               position: "absolute",
//                               top: 26,
//                             }}
//                             name="timer-sharp"
//                             size={24}
//                             color="black"
//                             onPress={() => showTimeFromMode("time")}
//                           />
//                         </View>
//                         <UnderlinedInput
//                           value={fromTimeText}
//                           placeholder="From Time:"
//                           blur={fromTextBlur}
//                           onFocus={onFromFocusHandler}
//                           onPressIn={() => showTimeFromMode("time")}
//                           style={
//                             isFromFocused
//                               ? styles.focusStyle
//                               : fromtimeInputIsInValid &&
//                                 styles.errorBorderColorDate
//                           }
//                           onSubmitEditing={Keyboard.dismiss}
//                         />
//                         {fromtimeInputIsInValid && (
//                           <Text style={styles.commonErrorMsg}>
//                             Enter from time
//                           </Text>
//                         )}
//                         {fromTimeShow && (
//                           <DateTimePicker
//                             testID="dateTimePicker"
//                             value={fromTime}
//                             mode={fromTimemode}
//                             is24Hour={true}
//                             display="default"
//                             onChange={fromTimeChangeHandler}
//                           />
//                         )}
//                       </View>
//                       <View style={styles.space} />
//                       <View style={{ flex: 1 }}>
//                         <View>
//                           <Ionicons
//                             style={{
//                               position: "absolute",
//                               top: 26,
//                             }}
//                             name="timer-sharp"
//                             size={24}
//                             color="black"
//                             onPress={() => showTimeToMode("time")}
//                           />
//                         </View>

//                         <UnderlinedInput
//                           value={toTimeText}
//                           onSubmitEditing={Keyboard.dismiss}
//                           onChangeText={toTimeChangeHandler}
//                           placeholder="To Time:"
//                           blur={toTextBlur}
//                           onFocus={onToFocusHandler}
//                           style={
//                             isToFocused
//                               ? styles.focusStyle
//                               : TotimeInputIsInValid &&
//                                 styles.errorBorderColorDate
//                           }
//                           onPressIn={() => showTimeToMode("time")}
//                         />
//                         {TotimeInputIsInValid && (
//                           <Text style={styles.commonErrorMsg}>
//                             Enter to time
//                           </Text>
//                         )}
//                         {toTimeShow && (
//                           <DateTimePicker
//                             testID="dateTimePicker"
//                             value={toTime}
//                             // value={input.toTime}
//                             mode={toTimemode}
//                             is24Hour={true}
//                             display="default"
//                             onChange={toTimeChangeHandler}

//                             // onChange={(text) => toTimeChangeHandler(text, key)}
//                             //  minimumDate={fromDate}
//                           />
//                         )}
//                       </View>
//                     </View>

//                     <View style={{ flexDirection: "row" }}>
//                       <View style={{ flex: 1, marginTop: 30 }}>
//                         <View style={!monLabel ? styles.normal : styles.up}>
//                           <Text
//                             style={[
//                               btn
//                                 ? styles.normalLabel
//                                 : mondayInputIsInValid
//                                 ? styles.errorLabel
//                                 : styles.normalLabel,
//                             ]}
//                           >
//                             Monday
//                           </Text>
//                         </View>

//                         <Input
//                           value={input.monday || monday}
//                           onChangeText={(text) => inputHandlerMonday(text, key)}
//                           onSubmitEditing={Keyboard.dismiss}
//                           style={
//                             isMondayFocused
//                               ? styles.focusStyle
//                               : mondayInputIsInValid && styles.errorBorderColor
//                           }
//                           blur={mondayTextBlur}
//                           onFocus={onMondayFocusHandler}
//                         />

//                         {mondayInputIsInValid && (
//                           <Text style={styles.commonErrorMsg}>
//                             Enter monday subject
//                           </Text>
//                         )}
//                       </View>

//                       <View style={styles.space} />

//                       <View style={{ flex: 1, marginTop: 30 }}>
//                         <View style={!tueLabel ? styles.normal : styles.up}>
//                           <Text
//                             style={[
//                               btn
//                                 ? styles.normalLabel
//                                 : tuesdayInputIsInValid
//                                 ? styles.errorLabel
//                                 : styles.normalLabel,
//                             ]}
//                           >
//                             Tuesday
//                           </Text>
//                         </View>

//                         <Input
//                           value={input.tuesday || tuesday}
//                           onChangeText={(text) =>
//                             inputHandlerTuesday(text, key)
//                           }
//                           onSubmitEditing={Keyboard.dismiss}
//                           blur={tuesdayTextBlur}
//                           onFocus={onTuesdayFocusHandler}
//                           style={
//                             isTuesdayFocused
//                               ? styles.focusStyle
//                               : tuesdayInputIsInValid && styles.errorBorderColor
//                           }
//                         />
//                         {tuesdayInputIsInValid && (
//                           <Text style={styles.commonErrorMsg}>
//                             Enter tuesday subject
//                           </Text>
//                         )}
//                       </View>
//                     </View>

//                     <View style={{ flexDirection: "row" }}>
//                       <View style={{ flex: 1, marginTop: 30 }}>
//                         <View style={!wedLable ? styles.normal : styles.up}>
//                           <Text
//                             style={[
//                               btn
//                                 ? styles.normalLabel
//                                 : wednesdayInputIsInValid
//                                 ? styles.errorLabel
//                                 : styles.normalLabel,
//                             ]}
//                           >
//                             Wednesday
//                           </Text>
//                         </View>

//                         <Input
//                           value={input.wednesday || wednesday}
//                           onChangeText={(text) => inputHandlerWed(text, key)}
//                           onSubmitEditing={Keyboard.dismiss}
//                           style={
//                             isWednesdayFocused
//                               ? styles.focusStyle
//                               : wednesdayInputIsInValid &&
//                                 styles.errorBorderColor
//                           }
//                           blur={wednesdayTextBlur}
//                           onFocus={onWednesdayFocusHandler}
//                         />
//                         {wednesdayInputIsInValid && (
//                           <Text style={styles.commonErrorMsg}>
//                             Enter wednesday subject
//                           </Text>
//                         )}
//                       </View>

//                       <View style={styles.space} />

//                       <View style={{ flex: 1, marginTop: 30 }}>
//                         <View style={!thurLabel ? styles.normal : styles.up}>
//                           <Text
//                             style={[
//                               btn
//                                 ? styles.normalLabel
//                                 : thursdayInputIsInValid
//                                 ? styles.errorLabel
//                                 : styles.normalLabel,
//                             ]}
//                           >
//                             Thursday
//                           </Text>
//                         </View>
//                         <Input
//                           value={input.thursday || thursday}
//                           onChangeText={(text) => inputHandlerThur(text, key)}
//                           onSubmitEditing={Keyboard.dismiss}
//                           style={
//                             isThurdayFocused
//                               ? styles.focusStyle
//                               : thursdayInputIsInValid &&
//                                 styles.errorBorderColor
//                           }
//                           blur={thursdayTextBlur}
//                           onFocus={onThursdayFocusHandler}
//                         />
//                         {thursdayInputIsInValid && (
//                           <Text style={styles.commonErrorMsg}>
//                             Enter thursday subject
//                           </Text>
//                         )}
//                       </View>
//                     </View>

//                     <View style={{ flexDirection: "row" }}>
//                       <View style={{ flex: 1, marginTop: 30 }}>
//                         <View style={!friLabel ? styles.normal : styles.up}>
//                           <Text
//                             style={[
//                               btn
//                                 ? styles.normalLabel
//                                 : fridayInputIsInValid
//                                 ? styles.errorLabel
//                                 : styles.normalLabel,
//                             ]}
//                           >
//                             Friday
//                           </Text>
//                         </View>
//                         <Input
//                           value={input.friday || friday}
//                           onChangeText={(text) => inputHandlerFri(text, key)}
//                           onSubmitEditing={Keyboard.dismiss}
//                           style={
//                             isFridayFocused
//                               ? styles.focusStyle
//                               : fridayInputIsInValid && styles.errorBorderColor
//                           }
//                           blur={fridayTextBlur}
//                           onFocus={onFridayFocusHandler}
//                         />
//                         {fridayInputIsInValid && (
//                           <Text style={styles.commonErrorMsg}>
//                             Enter friday subject
//                           </Text>
//                         )}
//                       </View>

//                       <View style={styles.space} />

//                       <View style={{ flex: 1, marginTop: 30 }}>
//                         <View style={!satLabel ? styles.normal : styles.up}>
//                           <Text
//                             style={[
//                               btn
//                                 ? styles.normalLabel
//                                 : saturdayInputIsInValid
//                                 ? styles.errorLabel
//                                 : styles.normalLabel,
//                             ]}
//                           >
//                             Saturday
//                           </Text>
//                         </View>
//                         <Input
//                           value={input.saturday || saturday}
//                           onChangeText={(text) => inputHandlerSat(text, key)}
//                           onSubmitEditing={Keyboard.dismiss}
//                           blur={saturdayTextBlur}
//                           onFocus={onSaturdayFocusHandler}
//                           style={
//                             isSaturdayFocused
//                               ? styles.focusStyle
//                               : saturdayInputIsInValid &&
//                                 styles.errorBorderColor
//                           }
//                         />
//                         {saturdayInputIsInValid && (
//                           <Text style={styles.commonErrorMsg}>
//                             Enter saturday subject
//                           </Text>
//                         )}
//                       </View>
//                     </View>

//                     <TouchableOpacity onPress={() => deleteHandler(key)}>
//                       <Text style={styles.deleteBtn}>Delete</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ))}

//                 {!isEdit && (
//                   <View style={styles.btnSubmit}>
//                     <Button onPress={addPeriodsHandler}>
//                       Add more Periods
//                     </Button>
//                   </View>
//                 )}
//                 {isEdit && (
//                   <View style={styles.edit}>
//                     <Button onPress={cancelHandler}>Cancel</Button>
//                   </View>
//                 )}
//                 {isEdit && (
//                   <View style={styles.edit1}>
//                     <Button onPress={updateHandler}>Update</Button>
//                   </View>
//                 )}
//                 {!isEdit && (
//                   <View style={styles.btnSubmit1}>
//                     <Button onPress={addDailyTimeTableHandler}>Submit</Button>
//                   </View>
//                 )}
//               </View>
//             </ScrollView>

//             {keyboardStatus == "Keyboard Hidden" && (
//               <View style={styles.home}>
//                 <TeachersHome />
//               </View>
//             )}
//           </>
//         )}
//         {showForm && (
//           <>
//             <TecahersExamTimeTable />
//           </>
//         )}
//       </View>
//     </>
//   );
// };

// export default TeachersTimetable;
// const deviceHieght = Dimensions.get("window").height;
// const deviceWidth = Dimensions.get("window").width;
// const styles = StyleSheet.create({
//   BtnContainer: {
//     fontSize: 24,
//     flexDirection: "row",

//     width: "100%",
//     marginHorizontal: deviceWidth > 400 ? -5 : -5,
//     backgroundColor: "#FDFEFE",
//   },
//   deleteBtn: {
//     width: deviceWidth < 370 ? "20%" : "22%",
//     padding: 9,
//     fontFamily: "HindMedium",
//     borderRadius: 10,
//     marginLeft: deviceWidth < 370 ? 240 : 265,
//     color: "red",
//     fontSize: deviceWidth < 370 ? 16 : 20,
//     backgroundColor: "pink",
//     top: 20,
//   },
//   year: {
//     width: 70,
//     position: "absolute",
//     top: -80,
//   },
//   title: {
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginLeft: -10,
//   },
//   // root: {
//   //   backgroundColor: "#EBECFO",
//   // },

//   inputForm: {
//     padding: 20,
//     paddingTop: 5,
//   },
//   errorBorderColor: {
//     borderColor: "red",
//   },
//   errorBorderColorDate: {
//     borderBottomColor: "red",
//   },
//   errorSelectedColor: {
//     borderColor: "red",
//   },
//   inputStyle: {
//     color: "black",
//     borderWidth: 2,
//     borderColor: "lightgrey",
//     backgroundColor: "white",
//     padding: 10,
//     // paddingHorizontal: 15,
//     paddingVertical: 5,
//     borderRadius: 5,
//     fontSize: 18,
//     //margin: 5,
//   },
//   labels: {
//     margin: 5,
//     fontFamily: "HindRegular",
//     fontSize: 18,
//   },
//   btnSubmit: {
//     flexDirection: "row",
//     marginTop: 27,
//     marginRight: 10,
//     marginBottom: 19,
//   },
//   btnSubmit1: {
//     width: "50%",
//     flexDirection: "row",
//     marginTop: deviceWidth < 370 ? -118 : -123,
//     marginLeft: deviceWidth < 370 ? 205 : 230,
//     marginBottom: 69,
//   },
//   space: {
//     width: 10, // or whatever size you need
//     height: 20,
//   },

//   edit: {
//     flexDirection: "row",
//     marginTop: 27,
//     marginRight: 10,
//     marginBottom: 19,
//   },
//   timetablebtnIcon: {
//     width: "15%",
//     marginLeft: deviceWidth < 370 ? 260 : 310,
//     marginTop: 10,
//   },
//   edit1: {
//     width: "50%",
//     flexDirection: "row",
//     marginTop: -128,
//     marginLeft: 230,
//     marginBottom: 69,
//   },
//   tableRow: {
//     height: "5%",
//     borderBottomColor: "black",
//     borderBottomWidth: 2,
//   },
//   focusStyle: {
//     borderColor: "blue",
//   },
//   normal: {
//     position: "absolute",
//     top: 20,
//     left: 10,
//   },
//   up: {
//     position: "absolute",
//     top: -5,
//     left: 15,
//   },
//   errorLabel: {
//     color: "red",
//     backgroundColor: "#F2F2F2",
//     backgroundColor: "white",
//     paddingHorizontal: 5,
//     fontSize: deviceWidth < 370 ? 13 : 15,
//   },
//   normalLabel: {
//     color: "grey",
//     backgroundColor: "#F2F2F2",
//     backgroundColor: "white",
//     paddingHorizontal: 7,
//     fontSize: deviceWidth < 370 ? 13 : 17,
//     fontFamily: "HindRegular",
//   },
//   commonErrorMsg: {
//     color: "red",
//     left: deviceWidth < 370 ? 5 : 20,
//     fontFamily: "HindRegular",
//     fontSize: deviceWidth < 370 ? 16 : 18,
//   },

//   //new design table
//   root: {
//     flex: 1,
//     flexDirection: "column",
//     marginVertical: 10,
//     // backgroundColor: "red",
//     // borderRadius: 1,
//   },
//   tableHead: {
//     flex: 1,
//     // borderRightColor: "grey",
//     borderRightWidth: 1.5,
//     justifyContent: "center",
//     alignItems: "center",
//     // backgroundColor: "#00B8AC",
//     // backgroundColor: "#02196E",
//     // marginHorizontal:10
//   },
//   headingFont: {
//     // fontFamily: "Hind-SemiBold",
//     fontWeight: "bold",
//     fontSize: deviceWidth < 370 ? 14 : 14,
//   },
//   flex: {
//     flex: 1,
//     padding: 10,
//   },
// });
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button as Btn,
  TouchableOpacity,
  Pressable,
  Alert,
  Dimensions,
  LogBox,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import axios from "axios";
import { Keyboard } from "react-native";
import BgButton from "../../../components/UI/BgButton";
import VerticalLine from "../../../components/UI/VerticalLine";
import Button from "../../../components/UI/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import TeachersHome from "../BottomTab/TeachersHome";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import TecahersExamTimeTable from "./TecahersExamTimeTable";
import { DataTable } from "react-native-paper";
import Input from "../../../components/UI/Input";
import moment from "moment";
import TimeSlots from "./TimeSlots";
import UnderlinedInput from "../../../components/UI/UnderlinedInput";
import { IconButton, Button as NativeButton } from "native-base";
import { subURL } from "../../../components/utils/URL's";

export var CLASSNAME, SECTION, ID;
export var idTimeTab = [];
export var TimeTabID;
export var FROMTIME, TOTIME;
export var arr = [];

const TeachersTimetable = () => {
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [showExamList, setShowExamList] = useState(false);

  const [studClassData, setStudentClassData] = useState([]);
  const [tdata, settdata] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");

  const [showTimeTableList, setShowTimeTableList] = useState(true);
  const [showTimeTableData, setShowTimeTableData] = useState([]);

  const [showTable, setShowTable] = useState(false);
  const [forTimeTableList, setForTimeTableList] = useState({
    // color: "#3d4590",

    // backgroundColor: "#D6EAF8",
    color: "white",
    backgroundColor: "#0C60F4",
    borderRadius: 10,
    // borderTopColor: "#3d4590",
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontFamily: "HindSemiBold",
  });
  const [forExamTimeTable, setForExamTimeTable] = useState({
    // color: "#d9dffc",
    color: "black",
    // borderTopColor: "#d9dffc",
    backgroundColor: "#F4F6F6",
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontFamily: "HindSemiBold",
  });
  const [TimeTableData, setTimeTableData] = useState([]);

  const [selectedTimeTable, setSelectedTimeTable] = useState("");
  const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
  const enteredSelcetdIsValid = selectedTimeTable.trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  const [filteredTimeTable, setFilteredTimeTable] = useState([]);
  const [showDefaultList, setShowDefaultList] = useState(true);
  const [showSelected, setShowSelected] = useState(false);
  useEffect(() => {
    LogBox.ignoreLogs(["Each child in a list should have a unique "]);
  }, []);
  let i;
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

  const [showaddBtn, setShowAddBtn] = useState(true);

  useEffect(() => {
    async function fetchClass() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Studentclass/`
        );
        let newArray = res.data.map((item) => {
          return {
            value: item.class_name + " - " + item.section,
          };
        });
        setTimeTableData(newArray);

        setStudentClassData(newArray);
        let selectedData = selectedClass.split(" - ");
        // console.log(selectedData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchClass();
  }, [selectedClass]);

  useEffect(() => {
    async function fetchTimeTable() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/AddmoreTimetable_list/`
        );
        let newArray = res.data.map((item) => {
          return {
            value: item.from_time + " - " + item.to_time,
          };
        });

        settdata(newArray);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTimeTable();
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  function viewExam() {
    setForTimeTableList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });

    setForExamTimeTable({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });
    setShowForm(true);
    setShowTable(false);
    setShowTimeTableList(false);
    setShowExamList(true);
    setShowAddBtn(false);
  }
  function timeTableList() {
    async function fetchDailyTimeTable() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/AddmoreTimetable_list/`
        );
        setShowTimeTableData(res.data);
      } catch (error) {
        console.log(error);
      }
      setForExamTimeTable({
        color: "black",
        backgroundColor: "#F4F6F6",
        borderRadius: 10,
        borderTopColor: "#d9dffc",
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
      });
      setForTimeTableList({
        backgroundColor: "#0C60F4",
        color: "white",
        borderRadius: 10,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
      });
      setShowAddBtn(true);
      setShowTimeTableList(true);
      setShowForm(false);
      setShowTable(false);
    }
    fetchDailyTimeTable();
  }

  useEffect(() => {
    async function viewDailyTimeTableList() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/AddmoreTimetable_list/`
        );

        setShowTimeTableData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    viewDailyTimeTableList();
  }, []);

  function viewTimeTableList() {
    setShowDefaultList(false);
    setShowSelected(true);
    async function login() {
      let selectedData = selectedClass.split(" - ");
      let class_name = selectedData[0];
      let section = selectedData[1];
      console.log(class_name);
      try {
        const res = await axios.get(
          `${subURL}/Timetable_by_sec/${class_name}/${section}`
        );
        console.log("*****");
        console.log(res.data[0].id);
        TimeTabID = res.data[0].id;

        const timetableres = await axios.get(
          `${subURL}/AddmoreTimetable_list_by_timetab/${TimeTabID}`
        );
        arr = timetableres.data;
        console.log("before sorting");
        console.log(arr);

        console.log("after sorting");
        arr.reverse();
        console.log(arr);
        //  console.log(timetableres.data);
        setFilteredTimeTable(arr);
        if (TimeTabID == undefined) {
          Alert.alert("No data found", "No data found for respective search");
        }
      } catch (error) {
        console.log(error);
      }
    }

    login();
  }

  return (
    <>
      <View style={{ height: "100%", backgroundColor: "white" }}>
        <View style={styles.BtnContainer}>
          <BgButton onPress={timeTableList} style={forTimeTableList}>
            Regular
          </BgButton>
          <View style={styles.space} />
          <BgButton onPress={viewExam} style={forExamTimeTable}>
            Exam
          </BgButton>
        </View>

        {showTimeTableList && (
          <>
            {/* <Animated.View style={{transform:[
              {translateY:translateY}
            ]}}> */}

            <View
              style={{
                width: 170,
                fontSize: 20,
                marginTop: 13,
                margin: 10,
              }}
            >
              <SelectList
                setSelected={setSelectedClass}
                data={studClassData}
                placeholder="Select class."
                boxStyles={{ borderRadius: 0 }}
                dropdownTextStyles={{
                  fontSize: deviceWidth < 370 ? 16 : 18,
                  fontFamily: "HindRegular",
                }}
                inputStyles={{
                  fontSize: deviceWidth < 370 ? 16 : 18,
                  fontFamily: "HindRegular",
                }}
                onSelect={viewTimeTableList}
              />
            </View>
            {/* <View
              style={{
                width: "50%",
                marginTop: -93,
                marginLeft: 200,
                position: "absolute",
                top: 150,
              }}
            >
              <Button onPress={viewTimeTableList}>View List</Button>
            </View> */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            ></View>

            <View
              style={[
                { flex: 1 },
                { flexDirection: "column", backgroundColor: "white" },
              ]}
            >
              {loading ? (
                <ActivityIndicator
                  size={40}
                  visible={loading}
                  textContent={"Loading..."}
                />
              ) : (
                <>
                  {showDefaultList && (
                    <>
                      <ScrollView horizontal={true}>
                        <DataTable style={styles.container}>
                          <DataTable.Header style={styles.tableHeader}>
                            <View style={styles.th}>
                              <Text style={styles.tableTitle}> MON</Text>
                            </View>
                            <View style={styles.th}>
                              <Text style={styles.tableTitle}>TUE</Text>
                            </View>
                            <View style={styles.th}>
                              <Text style={styles.tableTitle}> WED</Text>
                            </View>
                            <View style={styles.th}>
                              <Text style={styles.tableTitle}>THUR</Text>
                            </View>

                            <View style={styles.th}>
                              <Text style={styles.tableTitle}> FRI</Text>
                            </View>
                            <View style={styles.th}>
                              <Text style={styles.tableTitle}> SAT</Text>
                            </View>
                          </DataTable.Header>

                          <View style={styles.th}>
                            <Text style={styles.tableTitle}>
                              {" "}
                              Default student list goes here...
                            </Text>
                          </View>

                          {filteredTimeTable &&
                            filteredTimeTable.map((data, key) => (
                              <DataTable.Row style={styles.tableRow} key={key}>
                                <DataTable.Cell
                                  textStyle={{
                                    fontSize: 18,
                                    fontFamily: "HindRegular",
                                    marginLeft: 50,
                                  }}
                                >
                                  {data.monday}
                                </DataTable.Cell>
                                <DataTable.Cell
                                  textStyle={{
                                    fontSize: 18,
                                    fontFamily: "HindRegular",
                                    marginLeft: 80,
                                  }}
                                >
                                  {data.Tuesday}
                                </DataTable.Cell>
                                <DataTable.Cell
                                  textStyle={{
                                    fontSize: 18,
                                    fontFamily: "HindRegular",
                                    marginLeft: 90,
                                  }}
                                >
                                  {data.wednesday}
                                </DataTable.Cell>
                                <DataTable.Cell
                                  textStyle={{
                                    fontSize: 18,
                                    fontFamily: "HindRegular",
                                    marginLeft: 70,
                                  }}
                                >
                                  {data.thursday}
                                </DataTable.Cell>
                                <DataTable.Cell
                                  textStyle={{
                                    fontSize: 18,
                                    fontFamily: "HindRegular",
                                    marginLeft: 70,
                                  }}
                                >
                                  {data.friday}
                                </DataTable.Cell>
                                <DataTable.Cell
                                  textStyle={{
                                    fontSize: 18,
                                    fontFamily: "HindRegular",
                                    marginLeft: 70,
                                  }}
                                >
                                  {data.saturday}
                                </DataTable.Cell>
                              </DataTable.Row>
                            ))}
                        </DataTable>
                      </ScrollView>
                    </>
                  )}

                  {showSelected && (
                    <>


                <View style={{ flex: 8, bottom: 10 }}>
                  <View style={[styles.root]}>
                    <ScrollView>
                      <ScrollView horizontal={true}>
                        <View style={styles.flex}>
                          <View
                            style={[
                              { flex: 0.2 },
                              {
                                flexDirection: "row",
                                borderWidth: 1,
                                backgroundColor: "#EFFFFD",
                              },
                            ]}
                          >
                            <View style={styles.tableHead}>
                              <Text
                                style={[styles.headingFont, { color: "black" }]}
                              >
                                Timing
                              </Text>
                            </View>
                            <View style={styles.tableHead}>
                              <Text
                                style={[styles.headingFont, { color: "black" }]}
                              >
                                MON
                              </Text>
                            </View>
                            <View style={styles.tableHead}>
                              <Text
                                style={[styles.headingFont, { color: "black" }]}
                              >
                                TUE
                              </Text>
                            </View>
                            <View style={styles.tableHead}>
                              <Text
                                style={[styles.headingFont, { color: "black" }]}
                              >
                                WED
                              </Text>
                            </View>
                            <View style={styles.tableHead}>
                              <Text
                                style={[styles.headingFont, { color: "black" }]}
                              >
                                THU
                              </Text>
                            </View>
                            <View style={styles.tableHead}>
                              <Text
                                style={[styles.headingFont, { color: "black" }]}
                              >
                                FRI
                              </Text>
                            </View>
                            <View style={styles.tableHead}>
                              <Text
                                style={[styles.headingFont, { color: "black" }]}
                              >
                                SAT
                              </Text>
                            </View>
                            {/* <View style={styles.tableHead}>
                              <Text
                                style={[styles.headingFont, { color: "black" }]}
                              >
                                ACTIONS
                              </Text>
                            </View> */}
                          </View>

                          <View style={[styles.flexrow, { borderWidth: 1 }]}>
                            <View
                              style={[{ flex: 1 }, { flexDirection: "row" }]}
                            >
                              <View style={{ flex: 1, marginHorizontal: 10 }}>
                                {filteredTimeTable &&
                                  filteredTimeTable.map((data) => (
                                    <View style={[styles.root]}>
                                      <View style={[styles.firstCol]}>
                                        <Text style={styles.headingFirstCol}>
                                          {moment(
                                            data.from_time,
                                            "HH:mm"
                                          ).format("hh:mm ")}{" "}
                                          {"-"} {""}
                                          {moment(data.to_time, "HH:mm").format(
                                            "hh:mm "
                                          )}
                                        </Text>
                                      </View>
                                    </View>
                                  ))}
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginHorizontal: 10,
                                  left: "5%",
                                }}
                              >
                                {filteredTimeTable &&
                                  filteredTimeTable.map((data) => (
                                    <View style={styles.root}>
                                      <View
                                        style={[
                                          styles.firstCol,
                                          { alignItems: "center", width: 100 },
                                        ]}
                                      >
                                        <Text style={styles.headingFirstCol}>
                                          {data.monday}
                                        </Text>
                                      </View>
                                    </View>
                                  ))}
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginHorizontal: 10,
                                  left: "3%",
                                }}
                              >
                                {filteredTimeTable &&
                                  filteredTimeTable.map((data) => (
                                    <View style={styles.root}>
                                      <View
                                        style={[
                                          styles.firstCol,
                                          { alignItems: "center", width: 100 },
                                        ]}
                                      >
                                        <Text style={[styles.headingFirstCol]}>
                                          {data.Tuesday}
                                        </Text>
                                      </View>
                                    </View>
                                  ))}
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginHorizontal: 10,
                                  right: "1%",
                                }}
                              >
                                {filteredTimeTable &&
                                  filteredTimeTable.map((data) => (
                                    <View style={styles.root}>
                                      <View
                                        style={[
                                          styles.firstCol,
                                          { alignItems: "center", width: 100 },
                                        ]}
                                      >
                                        <Text style={styles.headingFirstCol}>
                                          {data.wednesday}
                                        </Text>
                                      </View>
                                    </View>
                                  ))}
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginHorizontal: 10,
                                  right: "5%",
                                }}
                              >
                                {filteredTimeTable &&
                                  filteredTimeTable.map((data) => (
                                    <View style={styles.root}>
                                      <View
                                        style={[
                                          styles.firstCol,
                                          { alignItems: "center", width: 100 },
                                        ]}
                                      >
                                        <Text style={[styles.headingFirstCol]}>
                                          {/* {data.thursday} */}

                                          {data.thursday}
                                        </Text>
                                      </View>
                                    </View>
                                  ))}
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginHorizontal: 10,
                                  right: "8%",
                                }}
                              >
                                {filteredTimeTable &&
                                  filteredTimeTable.map((data) => (
                                    <View style={styles.root}>
                                      <View
                                        style={[
                                          styles.firstCol,
                                          { alignItems: "center", width: 100 },
                                        ]}
                                      >
                                        <Text style={styles.headingFirstCol}>
                                          {data.friday}
                                        </Text>
                                      </View>
                                    </View>
                                  ))}
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginHorizontal: 10,
                                  right: "12%",
                                }}
                              >
                                {filteredTimeTable &&
                                  filteredTimeTable.map((data) => (
                                    <View style={styles.root}>
                                      <View
                                        style={[
                                          styles.firstCol,
                                          { alignItems: "center", width: 100 },
                                        ]}
                                      >
                                        <Text style={styles.headingFirstCol}>
                                          {data.saturday}
                                        </Text>
                                      </View>
                                    </View>
                                  ))}
                              </View>
                             
                            </View>
                          </View>
                        </View>
                      </ScrollView>
                    </ScrollView>
                  </View>
                </View>


                    </>
                  )}
                </>
              )}
              {keyboardStatus == "Keyboard Hidden" && (
                <View style={{ flex: 1 }}>
                  <TeachersHome />
                </View>
              )}
            </View>
          </>
        )}

        {showForm && (
          <>
            <TecahersExamTimeTable />
          </>
        )}
      </View>
    </>
  );
};

export default TeachersTimetable;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",
    marginHorizontal: deviceWidth > 400 ? -5 : -5,
    backgroundColor: "#FDFEFE",
  },
  container:{
    marginHorizontal:10,
    top:'3%'
  },
  deleteBtn: {
    width: deviceWidth < 370 ? "20%" : "22%",
    padding: 9,
    fontFamily: "HindMedium",
    borderRadius: 10,
    marginLeft: deviceWidth < 370 ? 240 : 265,
    color: "red",
    fontSize: deviceWidth < 370 ? 16 : 20,
    backgroundColor: "pink",
    top: 20,
  },
  year: {
    width: 70,
    position: "absolute",
    top: -80,
  },
  title: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: -10,
  },
  // root: {
  //   backgroundColor: "#EBECFO",
  // },

  inputForm: {
    padding: 20,
    paddingTop: 5,
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
  inputStyle: {
    color: "black",
    borderWidth: 2,
    borderColor: "lightgrey",
    backgroundColor: "white",
    padding: 10,
    // paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
    //margin: 5,
  },
  labels: {
    margin: 5,
    fontFamily: "HindRegular",
    fontSize: 18,
  },
  btnSubmit: {
    flexDirection: "row",
    marginTop: 27,
    marginRight: 10,
    marginBottom: 19,
  },
  btnSubmit1: {
    width: "50%",
    flexDirection: "row",
    marginTop: deviceWidth < 370 ? -118 : -123,
    marginLeft: deviceWidth < 370 ? 205 : 230,
    marginBottom: 69,
  },
  space: {
    width: 10, // or whatever size you need
    height: 20,
  },

  edit: {
    flexDirection: "row",
    marginTop: 27,
    marginRight: 10,
    marginBottom: 19,
  },
  timetablebtnIcon: {
    width: "15%",
    marginLeft: deviceWidth < 370 ? 260 : 310,
    marginTop: 10,
  },
  edit1: {
    width: "50%",
    flexDirection: "row",
    marginTop: -128,
    marginLeft: 230,
    marginBottom: 69,
  },
  tableRow: {
    height: "5%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  focusStyle: {
    borderColor: "blue",
  },
  normal: {
    position: "absolute",
    top: 20,
    left: 10,
  },
  up: {
    position: "absolute",
    top: -5,
    left: 15,
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
    paddingHorizontal: 7,
    fontSize: deviceWidth < 370 ? 13 : 17,
    fontFamily: "HindRegular",
  },
  commonErrorMsg: {
    color: "red",
    left: deviceWidth < 370 ? 5 : 20,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 16 : 18,
  },

  //new design table
  root: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 10,
    // backgroundColor: "red",
    // borderRadius: 1,
  },
  tableHead: {
    flex: 1,
    // borderRightColor: "grey",
    borderRightWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#00B8AC",
    // backgroundColor: "#02196E",
    // marginHorizontal:10
  },
  headingFont: {
    // fontFamily: "Hind-SemiBold",
    fontWeight: "bold",
    fontSize: deviceWidth < 370 ? 14 : 14,
  },
  flex: {
    flex: 1,
    padding: 10,
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
    fontFamily: "HindMedium",
    fontSize: deviceWidth < 370 ? 16 : 20,
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
});

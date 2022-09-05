import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import BgButton from "../../components/UI/BgButton";
import VerticalLine from "../../components/UI/VerticalLine";
import Button from "../../components/UI/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import TeachersLoginScreen from "./TeachersLoginScreen";
import TeachersCalendar from "./TeachersCalendar";
import TeachersHome from "./TeachersHome";
import { Ionicons } from "@expo/vector-icons";

const TeachersTimetable = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [forTimeTableList, setForTimeTableList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forExamTimeTable, setForExamTimeTable] = useState({ color: "black" });

  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());

  const [fromTimemode, setFromTimeMode] = useState("time");
  const [toTimemode, setToTimeMode] = useState("time");

  const [fromTimeShow, setFromTimeShow] = useState(false);
  const [toTimeShow, setToTimeShow] = useState(false);

  const [fromTimeText, setFromTimeText] = useState("");
  const [toTimeText, setToTimeText] = useState("");

  const showTimeFromMode = (currentFromTimeMode) => {
    setFromTimeShow(true);

    setFromTimeMode(currentFromTimeMode);
  };

  const showTimeToMode = (currentTimeToMode) => {
    setToTimeShow(true);

    setToTimeMode(currentTimeToMode);
  };

  const [studentID, setEnteredStudentID] = useState("");
  const [timeTab, setEnteredTimeTab] = useState("");

  const [days, setEnteredDays] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
  });
  const [createdDate, setEnteredCreatedDate] = useState();

  const [examName, setEnteredExamName] = useState("");

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");

  const [totalMarks, setEnteredTotalMarks] = useState("");
  const [hour, setEnteredHour] = useState("");
  const [className, setEnteredClassName] = useState("");

  function studentIDChangeHandler(enteredValue) {
    setEnteredStudentID(enteredValue);
  }
  function timeTabChangeHandler(enteredValue) {
    setEnteredTimeTab(enteredValue);
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
    setFromText(fDate);
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
    setToText(tDate);
    // console.log(fDate);
  };

  const fromTimeChangeHandler = (event, selectedFromTime) => {
    const currentFromTime = selectedFromTime || fromTime;
    setFromTimeShow(Platform.OS === "ios");
    setFromTime(currentFromTime);

    let tempFromTime = new Date(currentFromTime);
    let fTime =
      tempFromTime.getHours() +
      ":" +
      tempFromTime.getMinutes() +
      ":" +
      tempFromTime.getSeconds();
    setFromTimeText(fTime);
    //console.log(fDate);
  };

  const toTimeChangeHandler = (event, selectedToTime) => {
    const currentToTime = selectedToTime || toTime;
    setToTimeShow(Platform.OS === "ios");
    setToTime(currentToTime);

    let tempToTime = new Date(currentToTime);
    let tTime =
      tempToTime.getHours() +
      ":" +
      tempToTime.getMinutes() +
      ":" +
      tempToTime.getSeconds();
    setToTimeText(tTime);
    // console.log(fDate);
  };
  function daysChangeHandler(enteredValue) {
    setEnteredDays(enteredValue);
  }
  function createdDateChangeHandler(enteredValue) {
    setEnteredCreatedDate(enteredValue);
  }

  function examNameChangeHandler(enteredValue) {
    setEnteredExamName(enteredValue);
  }
  function startDateChangeHandler(enteredValue) {
    setEnteredStartDate(enteredValue);
  }
  function endDateChangeHandler(enteredValue) {
    setEnteredEndDate(enteredValue);
  }
  function totalMarksChangeHandler(enteredValue) {
    setEnteredTotalMarks(enteredValue);
  }
  function hourChangeHandler(enteredValue) {
    setEnteredHour(enteredValue);
  }
  function classNameChangeHandler(enteredValue) {
    setEnteredClassName(enteredValue);
  }

  function viewExam() {
    setForExamTimeTable({ fontWeight: "bold", color: "black" });
    setForTimeTableList({ color: "black" });
    setShowForm(true);
    setShowTable(false);
  }
  function timeTableList() {
    setForTimeTableList({ fontWeight: "bold", color: "black" });
    setForExamTimeTable({ color: "black" });
    setShowForm(false);
    setShowTable(true);
  }
  function addDailyTimeTableHandler() {
    const FormData = {
      studentID,
      timeTab,
      fromTime,
      toTime,
      days,
      createdDate,
    };
    console.log(FormData);
    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const dataForm = FormData;
        const resLogin = await axios.post(
          `http://10.0.2.2:8000/school/AddmoreTimetable_list`,
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
    setEnteredStudentID("");
    setEnteredTimeTab("");
    setEnteredFromTime("");
    setEnteredToTime("");
    setEnteredDays("");
    setEnteredCreatedDate("");
  }

  function addExamTimeTableHandler() {
    const FormData = {
      examName,
      startDate,
      endDate,
      totalMarks,
      hour,
      className,
    };
    console.log(FormData);
    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const dataForm = FormData;
        const resLogin = await axios.post(
          `http://10.0.2.2:8000/school/Exam`,
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
  }

  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton onPress={timeTableList} style={forTimeTableList}>
          Add Daily TimeTable
        </BgButton>
        <VerticalLine>|</VerticalLine>
        <BgButton onPress={viewExam} style={forExamTimeTable}>
          Add Exam TimeTable
        </BgButton>
      </View>
      {showTable && (
        <ScrollView>
          <View style={styles.inputForm}>
            <Text style={styles.labels}>STUDENT ID</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={studentIDChangeHandler}
              value={studentID}
            />
            <Text style={styles.labels}>TIME TAB</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.inputStyle}
              onChangeText={timeTabChangeHandler}
              value={timeTab}
            />
            {/* <Text style={styles.labels}>FROM TIME</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={fromTimeChangeHandler}
              value={fromTime}
            />
            <Text style={styles.labels}>TO TIME</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={toTimeChangeHandler}
              value={toTime}
            /> */}
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                }}
              >
                FROM TIME: {fromTimeText}
              </Text>

              <Ionicons
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "right",
                }}
                name="timer-sharp"
                size={24}
                color="black"
                onPress={() => showTimeFromMode("time")}
              />
            </View>

            {fromTimeShow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={fromTime}
                mode={fromTimemode}
                is24Hour={true}
                display="default"
                onChange={fromTimeChangeHandler}
              />
            )}

            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                }}
              >
                TO TIME: {toTimeText}
              </Text>

              <Ionicons
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "right",
                }}
                name="timer-sharp"
                size={24}
                color="black"
                onPress={() => showTimeToMode("time")}
              />
            </View>
            {toTimeShow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={toTime}
                mode={toTimemode}
                is24Hour={true}
                display="default"
                onChange={toTimeChangeHandler}
                //  minimumDate={fromDate}
              />
            )}
            <Text style={styles.labels}>DAYS</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={daysChangeHandler}
              value={
                (days.monday,
                days.tuesday,
                days.wednesday,
                days.thursday,
                days.friday,
                days.saturday)
              }
            />
            <Text style={styles.labels}>CREATED DATE</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={createdDateChangeHandler}
              value={createdDate}
            />

            <View style={styles.btnSubmit}>
              <Button onPress={addDailyTimeTableHandler}>Add TimeTable</Button>
            </View>
          </View>
          <View style={styles.home}>
            <TeachersHome />
          </View>
        </ScrollView>
      )}
      {showForm && (
        <ScrollView>
          <View style={styles.inputForm}>
            <Text style={styles.labels}>EXAM NAME</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={examNameChangeHandler}
              value={examName}
            />
            {/* <Text style={styles.labels}>START DATE</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.inputStyle}
              onChangeText={startDateChangeHandler}
              value={startDate}
            />
            <Text style={styles.labels}>END DATE</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={endDateChangeHandler}
              value={endDate}
            /> */}

            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                }}
              >
                EXAM START DATE: {fromText}
              </Text>

              <Ionicons
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "right",
                }}
                name="calendar"
                size={24}
                color="black"
                onPress={() => showFromMode("date")}
              />
            </View>

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

            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                }}
              >
                EXAM END DATE: {toText}
              </Text>

              <Ionicons
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "right",
                }}
                name="calendar"
                size={24}
                color="black"
                onPress={() => showToMode("date")}
              />
            </View>
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
            <Text style={styles.labels}>TOTAL MARKS</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={totalMarksChangeHandler}
              value={totalMarks}
            />
            <Text style={styles.labels}>HOUR</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={hourChangeHandler}
              value={hour}
            />
            <Text style={styles.labels}>CLASS NAME</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={classNameChangeHandler}
              value={className}
            />

            <View style={styles.btnSubmit}>
              <Button onPress={addExamTimeTableHandler}>
                Add Exam TimeTable
              </Button>
            </View>
          </View>
          <View style={styles.home}>
            <TeachersHome />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default TeachersTimetable;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
  },
  home: {
    marginTop: 150,
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 5,
  },
  labels: {
    marginTop: 17,
  },
  btnSubmit: {
    marginTop: 17,
  },
});

// import React, { useState } from "react";
// import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import DatePicker from "react-native-datepicker";

// const TeachersTimetable = () => {
//   const [date, setDate] = useState("09-10-2021");

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         <Text style={styles.text}>Birth Date :</Text>
//         <DatePicker
//           style={styles.datePickerStyle}
//           date={date}
//           mode="date"
//           placeholder="select date"
//           format="DD/MM/YYYY"
//           minDate="01-01-1900"
//           maxDate="01-01-2000"
//           confirmBtnText="Confirm"
//           cancelBtnText="Cancel"
//           customStyles={{
//             dateIcon: {
//               position: "absolute",
//               right: -5,
//               top: 4,
//               marginLeft: 0,
//             },
//             dateInput: {
//               borderColor: "gray",
//               alignItems: "flex-start",
//               borderWidth: 0,
//               borderBottomWidth: 1,
//             },
//             placeholderText: {
//               fontSize: 17,
//               color: "gray",
//             },
//             dateText: {
//               fontSize: 17,
//             },
//           }}
//           onDateChange={(date) => {
//             setDate(date);
//           }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default TeachersTimetable;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#A8E9CA",
//   },
//   title: {
//     textAlign: "left",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   datePickerStyle: {
//     width: 230,
//   },
//   text: {
//     textAlign: "left",
//     width: 230,
//     fontSize: 16,
//     color: "#000",
//   },
// });

import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import BgButton from "../../components/UI/BgButton";
import VerticalLine from "../../components/UI/VerticalLine";
import Button from "../../components/UI/Button";

import TeachersLoginScreen from "./TeachersLoginScreen";
import TeachersCalendar from "./TeachersCalendar";
import TeachersHome from "./TeachersHome";

const TeachersTimetable = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [forTimeTableList, setForTimeTableList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forExamTimeTable, setForExamTimeTable] = useState({ color: "black" });

  const [studentID, setEnteredStudentID] = useState("");
  const [timeTab, setEnteredTimeTab] = useState("");
  const [fromTime, setEnteredFromTime] = useState("");
  const [toTime, setEnteredToTime] = useState("");
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
  const [startDate, setEnteredStartDate] = useState("");
  const [endDate, setEnteredEndDate] = useState("");
  const [totalMarks, setEnteredTotalMarks] = useState("");
  const [hour, setEnteredHour] = useState("");
  const [className, setEnteredClassName] = useState("");

  function studentIDChangeHandler(enteredValue) {
    setEnteredStudentID(enteredValue);
  }
  function timeTabChangeHandler(enteredValue) {
    setEnteredTimeTab(enteredValue);
  }
  function fromTimeChangeHandler(enteredValue) {
    setEnteredFromTime(enteredValue);
  }
  function toTimeChangeHandler(enteredValue) {
    setEnteredToTime(enteredValue);
  }
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
            <Text style={styles.labels}>FROM TIME</Text>
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
            />
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
            <Text style={styles.labels}>START DATE</Text>
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
            />
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
          <View>
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
    marginTop: 120,
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

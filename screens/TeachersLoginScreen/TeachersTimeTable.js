import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { Keyboard } from "react-native";
import BgButton from "../../components/UI/BgButton";
import VerticalLine from "../../components/UI/VerticalLine";
import Button from "../../components/UI/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import TeachersHome from "./TeachersHome";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

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

  const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
      console.log(keyboardStatus)
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
      console.log(keyboardStatus)
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const showTimeFromMode = (currentFromTimeMode) => {
    setFromTimeShow(true);

    setFromTimeMode(currentFromTimeMode);
  };

  const showTimeToMode = (currentTimeToMode) => {
    setToTimeShow(true);

    setToTimeMode(currentTimeToMode);
  };

  const [selectedTimeTable, setSelectedTimeTable] = useState("");
  const [TimeTableData, setTimeTableData] = useState([]);

  const [selectedExamTimeTable, setSelectedExamTimeTable] = useState("");
  const [ExamTimeTableData, setExamTimeTableData] = useState([]);

  const [monday, setEnteredMonday] = useState();
  const [tuesday, setEnteredTuesday] = useState();
  const [wednesday, setEnteredWednesday] = useState();
  const [thursday, setEnteredThursday] = useState();
  const [friday, setEnteredFriday] = useState();
  const [saturday, setEnteredSaturday] = useState();

  const [createdDate, setEnteredCreatedDate] = useState(new Date());
  const [dateShow, setDateShow] = useState(false);
  const [dateText, setDateText] = useState("");
  const [datemode, setDateMode] = useState("date");

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

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8000/school/Studentclass/")
      .then((response) => {
        let newArray = response.data.map((item) => {
          return {
            value: item.class_name + " - " + item.section,
          };
        });

        setTimeTableData(newArray);
        setExamTimeTableData(newArray);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  function timeTabChangeHandler(enteredValue) {
    setEnteredTimeTab(enteredValue);
  }
  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  const showToMode = (currentToMode) => {
    setToShow(true);

    setDateMode(currentToMode);
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

  const DateChangeHandler = (event, selectedToDate) => {
    const currentToDate = selectedToDate || toDate;
    setDateShow(Platform.OS === "ios");
    setEnteredCreatedDate(currentToDate);

    let tempToDate = new Date(currentToDate);
    let tDate =
      tempToDate.getDate() +
      "/" +
      (tempToDate.getMonth() + 1) +
      "/" +
      tempToDate.getFullYear();
    setDateText(tDate);
    // console.log(fDate);
  };

  const showDateMode = (currentToMode) => {
    setDateShow(true);

    setToMode(currentToMode);
  };

  function examNameChangeHandler(enteredValue) {
    setEnteredExamName(enteredValue);
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
    let selectedData = selectedTimeTable.split(" - ");
    let class_name = selectedData[0];
    let section = selectedData[1];
    const FormData = {
      class_name: class_name,
      section: section,
      from_time: fromTime,
      to_time: toTime,
      monday: monday,
      Tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      createdDate: createdDate,
    };
    console.log(FormData);
    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const dataForm = FormData;
        const resLogin = await axios.post(
          `http://10.0.2.2:8000/school/AddmoreTimetable_list/`,
          dataForm,
          {
            headers: headers,
          }
        );
        const token = resLogin.data.token;

        // Token = token;
        // UserId = userId;
      } catch (error) {
        console.log(error);
      }
    }
    storeData();

    setFromTimeText("");
    setToTimeText("");
    setToTime("");
    setEnteredMonday("");
    setEnteredTuesday("");
    setEnteredWednesday("");
    setEnteredThursday("");
    setEnteredFriday("");
    setEnteredSaturday("");
    setDateText("");
  }

  function addExamTimeTableHandler() {
    let selectedData = selectedExamTimeTable.split(" - ");
    let class_name = selectedData[0];
    let section = selectedData[1];
    const FormData = {
      exam_name: examName,
      start_date: fromDate,
      end_date: toDate,
      Total_marks: totalMarks,
      hour: hour,
      class_name: class_name,
    };
    console.log(FormData);
    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const dataForm = FormData;
        const resLogin = await axios.post(
          "http://10.0.2.2:8000/school/Exam/",
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

    setEnteredExamName("");
    setFromText("");
    setToText("");
    setEnteredTotalMarks("");
    setEnteredHour("");
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
        <>
          <ScrollView style={styles.root}>
            <View style={styles.inputForm}>
              <Text style={styles.labels}>CLASS NAME</Text>

              <View style={{ width: 350, fontSize: 18, marginTop: 3 }}>
                <SelectList
                  setSelected={setSelectedTimeTable}
                  data={TimeTableData}
                  placeholder="select class"
                  style={{ fontSize: 16 }}
                />
              </View>
              <View style={[ {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "row"
              }]}>
                <View style={{ flex: 1 }} >
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
                  FROM TIME:
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
              <TextInput style={styles.inputStyle} value={fromTimeText} onSubmitEditing={Keyboard.dismiss}/>
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
                </View>
                <View style={styles.space} />
                <View style={{ flex: 1 }} >
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
                >TO TIME:
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
              
              <TextInput style={styles.inputStyle} value={toTimeText} onSubmitEditing={Keyboard.dismiss} />
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
                </View>
              </View>
              

             
              <Text style={styles.labels}>MONDAY SUBJECT</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setEnteredMonday}
                value={monday}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={styles.labels}>TUESDAY SUBJECT</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setEnteredTuesday}
                value={tuesday}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={styles.labels}>WEDNESDAY SUBJECT</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setEnteredWednesday}
                value={wednesday}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={styles.labels}>THURSDAY SUBJECT</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setEnteredThursday}
                value={thursday}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={styles.labels}>FRIDAY SUBJECT</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setEnteredFriday}
                value={friday}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={styles.labels}>SATURDAY SUBJECT</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={setEnteredSaturday}
                value={saturday}
                onSubmitEditing={Keyboard.dismiss}
              />
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
                  CREATED DATE:
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
                  onPress={() => showDateMode("date")}
                />
              </View>
              <TextInput style={styles.inputStyle} value={dateText} />
              {dateShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={createdDate}
                  mode={datemode}
                  is24Hour={true}
                  display="default"
                  onChange={DateChangeHandler}
                  //  minimumDate={fromDate}
                />
              )}

              <View style={styles.btnSubmit}>
                <Button onPress={addDailyTimeTableHandler}>
                  Add TimeTable
                </Button>
              </View>
            </View>
          </ScrollView>
          {keyboardStatus=='Keyboard Hidden' && <View style={styles.home}>
            <TeachersHome />
          </View>}
        </>
      )}
      {showForm && (
        <>
          <ScrollView>
            <View style={styles.inputForm}>
              <Text style={styles.labels}>EXAM NAME</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={examNameChangeHandler}
                value={examName}
                onSubmitEditing={Keyboard.dismiss}
              />

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
                  EXAM START DATE:
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
              <TextInput style={styles.inputStyle} value={fromText} />
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
                  EXAM END DATE:
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
              <TextInput style={styles.inputStyle} value={toText} />
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
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={styles.labels}>HOUR</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={hourChangeHandler}
                value={hour}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={styles.labels}>CLASS NAME</Text>

              <View style={{ width: 350, fontSize: 18, marginTop: 3 }}>
                <SelectList
                  setSelected={setSelectedExamTimeTable}
                  data={ExamTimeTableData}
                  placeholder="select class"
                  style={{ fontSize: 16 }}
                />
              </View>
              <View style={styles.btnSubmit}>
                <Button onPress={addExamTimeTableHandler}>
                  Add Exam TimeTable
                </Button>
              </View>
            </View>
          </ScrollView>
          {keyboardStatus=='Keyboard Hidden' && <View style={styles.home}>
            <TeachersHome />
          </View>}
        </>
      )}
    </>
  );
};

export default TeachersTimetable;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
    fontSize: 24,
  },
  home: {
    marginTop: 29,
  },
  root: {
    backgroundColor: "#EBECFO",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
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
    fontFamily: "Ubuntu",
    fontSize: 18,
    // marginTop: 17,
  },
  btnSubmit: {
    marginTop: 27,
    marginBottom: 69,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});

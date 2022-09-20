import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button as Btn,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import axios from "axios";
import { Keyboard } from "react-native";
import BgButton from "../../components/UI/BgButton";
import VerticalLine from "../../components/UI/VerticalLine";
import Button from "../../components/UI/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import TeachersHome from "./TeachersHome";
import { AntDesign, Ionicons } from "@expo/vector-icons";
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

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
      // console.log(keyboardStatus);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
      //  console.log(keyboardStatus);
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

  const [showPeriods, setShowPeriods] = useState(false);

  const [inputs, setInputs] = useState([{ key: "", value: "" }]);

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

  function createdDateChangeHandler(enteredValue) {
    setEnteredCreatedDate(enteredValue);
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
    if(event.type == "set") {
      setFromTimeText(fTime);
      } else {
          //cancel button clicked
      }

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
    if(event.type == "set") {
      setToTimeText(tTime);
      } else {
          //cancel button clicked
      }

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

    const sendtoTimeTable = {
      class_name: class_name,
      section: section,
    };
    //console.log(sendtoTimeTable);

    async function storeTimeTable() {
      let headers = {
        "Content-Type": "application/json; charset=utf-8",
      };
      const resLoginTimeTable = await axios.post(
        `http://10.0.2.2:8000/school/Timetable/`,
        sendtoTimeTable,
        {
          headers: headers,
        }
      );
    }

    storeTimeTable();

    const FormData = {
      from_time: fromTime,
      to_time: toTime,
      monday: inputs[i].monday,
      Tuesday: inputs[i].tuesday,
      wednesday: inputs[i].wednesday,
      thursday: inputs[i].thursday,
      friday: inputs[i].friday,
      saturday: inputs[i].saturday,
      createdDate: createdDate,
    };
    console.log(FormData);
    async function storeData() {
      // try {
      //   let headers = {
      //     "Content-Type": "application/json; charset=utf-8",
      //   };
      //   const dataForm = FormData;
      //   const resLogin = await axios.post(
      //     `http://10.0.2.2:8000/school/AddmoreTimetable_list/`,
      //     dataForm,
      //     {
      //       headers: headers,
      //     }
      //   );
      //   console.log(resLoginTimeTable);
      //   const token = resLogin.data.token;
      //   // Token = token;
      //   // UserId = userId;
      // } catch (error) {
      //   console.log(error);
      // }
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

  function addPeriodsHandler() {
    const _inputs = [...inputs];
    // console.log(_inputs);
    console.log("after pushing");
    _inputs.push({ ..._inputs, key: inputs.key, value: inputs.value });
    console.log(_inputs);
    setInputs(_inputs);
    // setEnteredMonday(_inputs);
    // setEnteredTuesday(_inputs);
  }

  const deleteHandler = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };
  // const inputHandler = (text, key) => {
  //   const _inputs = [...inputs];
  //   _inputs[key].value = text;
  //   _inputs[key].key = key;
  //   setInputs(_inputs);
  // };

  const inputHandlerMonday = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setEnteredMonday(_inputs);
  };

  const inputHandlerTuesday = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setEnteredTuesday(_inputs);
  };

  const inputHandlerWed = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setEnteredWednesday(_inputs);
  };

  const inputHandlerThur = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setEnteredThursday(_inputs);
    // console.log("______________________");
    // console.log(_inputs);
    // console.log("______________________");
    // console.log(inputs);
    // console.log("______________________");
  };

  const inputHandlerFri = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setEnteredFriday(_inputs);
  };

  const inputHandlerSat = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setEnteredSaturday(_inputs);
  };
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
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={styles.title}>
                    <Text style={styles.labels}>Class name</Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "lightgrey",
                      backgroundColor: "white",
                      borderRadius: 13,
                      marginTop: -5,
                    }}
                  >
                    <SelectList
                      setSelected={setSelectedTimeTable}
                      data={TimeTableData}
                      placeholder="select class"
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 54,
                        fontFamily: "HindRegular",
                      }}
                    />
                  </View>
                </View>

                <View style={styles.space} />

                <View style={{ flex: 1 }}>
                  <View style={styles.title}>
                    <View
                      style={{
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        // marginLeft: -10,
                      }}
                    >
                      <Text
                        style={{
                          position: "absolute",
                          top: 1,
                          margin: 5,
                          fontFamily: "HindRegular",
                          fontSize: 18,
                        }}
                      >
                        Created Date
                      </Text>
                      <Ionicons
                        style={{
                          position: "absolute",
                          left: 140,
                        }}
                        name="calendar"
                        size={24}
                        color="black"
                        onPress={() => showDateMode("date")}
                      />
                    </View>
                    <TextInput
                      style={{
                        position: "absolute",
                        top: 60,
                        left: 20,
                        color: "black",
                        borderWidth: 2,
                        borderColor: "lightgrey",
                        backgroundColor: "white",
                        width: "100%",
                        paddingHorizontal: 10,
                        paddingVertical: 9,
                        borderRadius: 5,
                        fontSize: 18,
                      }}
                      placeholder="DD/MM/YYYY"
                      onChangeText={createdDateChangeHandler}
                      value={dateText || createdDate}
                    />
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
                  </View>
                </View>
              </View>

              {inputs.map((input, key) => (
                <View>
                  <View
                    style={[
                      {
                        // Try setting `flexDirection` to `"row"`.
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <View style={{ flex: 1 }}>
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
                          From Time:
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
                      <TextInput
                        style={styles.inputStyle}
                        value={fromTimeText}
                        onSubmitEditing={Keyboard.dismiss}
                      />
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
                    <View style={{ flex: 1 }}>
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
                          To Time:
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

                      <TextInput
                        style={styles.inputStyle}
                        value={toTimeText}
                        onSubmitEditing={Keyboard.dismiss}
                      />
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

                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <View style={styles.title}>
                        <Text style={styles.labels}>Monday Subject</Text>
                      </View>
                      <TextInput
                        style={styles.inputStyle}
                        // onChangeText={setEnteredMonday}
                        value={monday}
                        onChangeText={(text) => inputHandlerMonday(text, key)}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    </View>

                    <View style={styles.space} />

                    <View style={{ flex: 1 }}>
                      <View style={styles.title}>
                        <Text style={styles.labels}>Tuesday Subject</Text>
                      </View>
                      <TextInput
                        style={styles.inputStyle}
                        // onChangeText={setEnteredTuesday}
                        value={tuesday}
                        //value={input.value}
                        onChangeText={(text) => inputHandlerTuesday(text, key)}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <View style={styles.title}>
                        <Text style={styles.labels}>Wed Subject</Text>
                      </View>
                      <TextInput
                        style={styles.inputStyle}
                        //  onChangeText={setEnteredWednesday}
                        value={wednesday}
                        // value={input.value}
                        onChangeText={(text) => inputHandlerWed(text, key)}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    </View>

                    <View style={styles.space} />

                    <View style={{ flex: 1 }}>
                      <View style={styles.title}>
                        <Text style={styles.labels}>Thursday Subject</Text>
                      </View>
                      <TextInput
                        style={styles.inputStyle}
                        // onChangeText={setEnteredThursday}
                        value={thursday}
                        //  value={input.value}
                        onChangeText={(text) => inputHandlerThur(text, key)}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <View style={styles.title}>
                        <Text style={styles.labels}>Friday Subject</Text>
                      </View>
                      <TextInput
                        style={styles.inputStyle}
                        // onChangeText={setEnteredFriday}
                        value={friday}
                        //  value={input.value}
                        onChangeText={(text) => inputHandlerFri(text, key)}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    </View>

                    <View style={styles.space} />

                    <View style={{ flex: 1 }}>
                      <View style={styles.title}>
                        <Text style={styles.labels}>Saturday Subject</Text>
                      </View>
                      <TextInput
                        style={styles.inputStyle}
                        //    onChangeText={setEnteredSaturday}
                        value={saturday}
                        //  value={input.value}
                        onChangeText={(text) => inputHandlerSat(text, key)}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    </View>
                  </View>

                  <TouchableOpacity onPress={() => deleteHandler(key)}>
                    <Text style={{ color: "red", fontSize: 13 }}>delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
              {/* <View style={styles.btnSubmit}>
                <Button onPress={addDailyTimeTableHandler}>
                  Add TimeTable
                </Button>
              </View> */}

              <View style={styles.btnSubmit}>
                <Button onPress={addPeriodsHandler}>Add Periods</Button>

                <Button onPress={addDailyTimeTableHandler}>Submit</Button>
              </View>
            </View>
          </ScrollView>

          {/* <Btn title="Add periods" onPress={addPeriodsHandler} /> */}

          {keyboardStatus == "Keyboard Hidden" && (
            <View style={styles.home}>
              <TeachersHome />
            </View>
          )}
        </>
      )}
      {showForm && (
        <>
          <ScrollView>
            <View style={styles.inputForm}>
              <Text style={styles.labels}>Exam Name</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={examNameChangeHandler}
                value={examName}
                onSubmitEditing={Keyboard.dismiss}
              />
              <View
                style={[
                  styles.container,
                  {
                    // Try setting `flexDirection` to `"row"`.
                    flexDirection: "row",
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
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
                      Exam Start Date:
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
                </View>
                <View style={styles.space} />

                <View style={{ flex: 1 }}>
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
                      Exam End Date:
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
                </View>
              </View>

              <Text style={styles.labels}>Total Marks</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={totalMarksChangeHandler}
                value={totalMarks}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={styles.labels}>Hour</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={hourChangeHandler}
                value={hour}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={styles.labels}>Class Name</Text>

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
          {keyboardStatus == "Keyboard Hidden" && (
            <View style={styles.home}>
              <TeachersHome />
            </View>
          )}
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
  title: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: -10,
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
    fontFamily: "HindRegular",
    fontSize: 18,
    // marginTop: 17,
  },
  btnSubmit: {
    flexDirection: "row",
    marginTop: 27,
    marginBottom: 69,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});

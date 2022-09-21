import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import TeachersHome from "../TeachersHome";
import Button from "../../../components/UI/Button";
import { DataTable } from "react-native-paper";
const TecahersExamTimeTable = () => {
  const [selectedExamTimeTable, setSelectedExamTimeTable] = useState("");
  const [datemode, setDateMode] = useState("date");
  const [ExamTimeTableData, setExamTimeTableData] = useState([]);

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

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  const [showform, setShowForm] = useState(false);
  const [showExamList, setShowExamList] = useState(true);
  const [showExamData, setShowExamData] = useState([]);

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

  useEffect(() => {
    async function viewExamList() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Exam/`);
        console.log(res.data);

        setShowExamData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    viewExamList();
  }, []);

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8000/school/Studentclass/")
      .then((response) => {
        let newArray = response.data.map((item) => {
          return {
            value: item.class_name + " - " + item.section,
          };
        });

        setExamTimeTableData(newArray);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function addExamTimeTableHandler() {
    setShowExamList(true);
    setShowForm(false);
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
    if (event.type == "set") {
      setFromText(fDate);
    }

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
    if (event.type == "set") {
      setToText(tDate);
    }

    // console.log(fDate);
  };

  function viewExam() {
    setShowForm(true);
    setShowExamList(false);
  }
  return (
    <>
      {showExamList && (
        <>
          <View style={styles.timetablebtn}>
            <Button onPress={viewExam}>Add new</Button>
          </View>
          <ScrollView horizontal={true}>
            <DataTable style={styles.container}>
              <DataTable.Header style={styles.tableHeader}>
                <View style={styles.th}>
                  <Text style={styles.tableTitle}> EXAM NAME</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.tableTitle}> START DATE</Text>
                </View>
                <View style={styles.th}>
                  <Text style={styles.tableTitle}> END DATE</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}>TOTAL MARKS</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}>HOUR</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}> CLASSNAME</Text>
                </View>
              </DataTable.Header>
              {showExamData.map((data, key) => (
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.exam_name}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.start_date}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.end_date}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.Total_marks}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.hour}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.class_name}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
        </>
      )}
      {showform && (
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
      )}
      {keyboardStatus == "Keyboard Hidden" && (
        <View style={styles.home}>
          <TeachersHome />
        </View>
      )}
    </>
  );
};

export default TecahersExamTimeTable;
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
  timetablebtn: {
    width: "40%",

    paddingVertical: 20,
    paddingHorizontal: 0,

    marginLeft: 230,
  },
  BtnContainer: {
    flexDirection: "row",
    width: 220,
  },
  container: {
    padding: 10,
  },
  type: {
    marginLeft: 10,
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
});

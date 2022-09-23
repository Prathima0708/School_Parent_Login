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
import BgButton from "../../../components/UI/BgButton";
import VerticalLine from "../../../components/UI/VerticalLine";
import Button from "../../../components/UI/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import TeachersHome from "../TeachersHome";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import TecahersExamTimeTable from "./TecahersExamTimeTable";
import { DataTable } from "react-native-paper";
import Input from "../../../components/UI/Input";

const TeachersTimetable = () => {
  const [showForm, setShowForm] = useState(false);
  const [showExamList, setShowExamList] = useState(false);

  const [showTimeTableList, setShowTimeTableList] = useState(true);
  const [showTimeTableData, setShowTimeTableData] = useState([]);

  const [showTable, setShowTable] = useState(false);
  const [forTimeTableList, setForTimeTableList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forExamTimeTable, setForExamTimeTable] = useState({ color: "black" });
  const [TimeTableData, setTimeTableData] = useState([]);

  const [selectedTimeTable, setSelectedTimeTable] = useState("");
  const [enteredSelectedTouched,setEnteredSelectedTouched]=useState(false)
  const enteredSelcetdIsValid=selectedTimeTable.trim()!=='';
  const selectInputIsInValid=!enteredSelcetdIsValid && enteredSelectedTouched;

  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());

  const [fromTimemode, setFromTimeMode] = useState("time");
  const [toTimemode, setToTimeMode] = useState("time");

  const [fromTimeShow, setFromTimeShow] = useState(false);
  const [toTimeShow, setToTimeShow] = useState(false);

  const [fromTimeText, setFromTimeText] = useState("");
  const [enteredFromTimeTouched,setEnteredFromTimeTouched]=useState(false)
  const enteredFromTimeIsValid=fromTimeText.trim()!=='';
  const fromtimeInputIsInValid=!enteredFromTimeIsValid && enteredFromTimeTouched;

  const [toTimeText, setToTimeText] = useState("");
  const [enteredToTimeTouched,setEnteredToTimeTouched]=useState(false)
  const enteredToTimeIsValid=toTimeText.trim()!=='';
  const TotimeInputIsInValid=!enteredToTimeIsValid && enteredToTimeTouched;

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

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

  const showTimeFromMode = (currentFromTimeMode) => {
    setFromTimeShow(true);

    setFromTimeMode(currentFromTimeMode);
  };

  const showTimeToMode = (currentTimeToMode) => {
    setToTimeShow(true);

    setToTimeMode(currentTimeToMode);
  };

  const [createdDate, setEnteredCreatedDate] = useState(new Date());

  const [dateShow, setDateShow] = useState(false);

  const [dateText, setDateText] = useState("");
  const [enteredDateTextTouched,setEnteredDateTextTouched]=useState(false)
  const enteredDateTextIsValid=dateText.trim()!=='';
  const dateTextInputIsInValid=!enteredDateTextIsValid && enteredDateTextTouched;

  const [datemode, setDateMode] = useState("date");

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [inputs, setInputs] = useState([
    {
      fromTime: new Date(),
      toTime: new Date(),
      fromTimeText: "",
      toTimeText: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
    },
  ]);

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
        // setExamTimeTableData(newArray);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  function createdDateChangeHandler(enteredValue) {
    setEnteredCreatedDate(enteredValue);
    setDateText(enteredValue)
  }

  function fromTimeHandler(enteredValue) {
    setFromTime(enteredValue);
  }
  // const inputHandlerMonday = (text, key) => {
  //   const _inputs = [...inputs];
  //   _inputs[key].monday = text;

  //   setInputs(_inputs);
  // };

  function fromTimeChangeHandler(event, selectedFromTime, key) {
    // const _inputs = [...inputs];
    // _inputs[key].fromTime = event;
    // setInputs(_inputs);

    // console.log("text -142", text);
    console.log("key -143", key);

    const currentFromTime = selectedFromTime || fromTime;

    setFromTimeShow(Platform.OS === "ios");

    setFromTime(currentFromTime);
    //setInputs(currentFromTime);

    // currentFromTime - save this to inputs array
    // show - call from inputs array -- fromTime

    let tempFromTime = new Date(currentFromTime);
    let fTime =
      tempFromTime.getHours() +
      ":" +
      tempFromTime.getMinutes() +
      ":" +
      tempFromTime.getSeconds();

    if (event.type == "set") {
      console.log("-------------------");

      console.log("currentfromtime :", currentFromTime);

      //console.log(_inputs["fromTime"].fromTime);
      console.log("formatted time :", fTime);
      const _inputs = [...inputs];

      _inputs[key].fromTime = currentFromTime;

      setFromTimeText(fTime);
      setInputs(_inputs);

      //const _inputs = [...inputs];

      // _inputs[key].fromTime = text;

      // console.log("176", _inputs[key].fromTime);
      // setInputs(_inputs);
      // console.log("178", _inputs);
    } else {
      //cancel button clicked
    }

    //  console.log(fTime);
  }

  const toTimeChangeHandler = (event, selectedToTime) => {
    const currentToTime = selectedToTime;
    setToTimeShow(Platform.OS === "ios");
    setToTime(currentToTime);
    // setInputs(currentToTime);

    let tempToTime = new Date(currentToTime);
    let tTime =
      tempToTime.getHours() +
      ":" +
      tempToTime.getMinutes() +
      ":" +
      tempToTime.getSeconds();
    if (event.type == "set") {
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

  function viewExam() {
    setForExamTimeTable({ fontWeight: "bold", color: "black" });
    setForTimeTableList({ color: "black" });
    setShowForm(true);
    setShowTable(false);
    setShowTimeTableList(false);
    setShowExamList(true);
  }
  function timeTableList() {
    setForTimeTableList({ fontWeight: "bold", color: "black" });
    setForExamTimeTable({ color: "black" });
    setShowTimeTableList(true);
    setShowForm(false);
    setShowTable(false);
  }

  function addPeriodsHandler() {
    const _inputs = [...inputs];

    _inputs.push({
      fromTime: "",
      toTime: "",
      fromTimeText: "",
      toTimeText: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
    });
    setInputs(_inputs);

    //console.log(_inputs);
  }

  function addDailyTimeTableHandler() {

    console.log(inputs);

    let selectedData = selectedTimeTable.split(" - ");
    let class_name = selectedData[0];
    let section = selectedData[1];

    const sendtoTimeTable = {
      class_name: class_name,
      section: section,
    };

    console.log(sendtoTimeTable);
    console.log(createdDate);

    setEnteredSelectedTouched(true);
    setEnteredDateTextTouched(true);
    setEnteredFromTimeTouched(true);
    setEnteredToTimeTouched(true);
    if(!enteredSelcetdIsValid){
      return;
    }
    if(!enteredDateTextIsValid){
      return;
    }
    if(!enteredFromTimeIsValid){
      return;
    }
    if(!enteredToTimeIsValid){
      return;
    }
    else{
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
      setEnteredSelectedTouched(false);
      setEnteredDateTextTouched(false);
      setEnteredFromTimeTouched(false);
      setEnteredToTimeTouched(false);
      setShowTimeTableList(true);
      setShowTable(false);
    }


    // const FormData = {
    //   from_time: fromTime,
    //   to_time: toTime,
    //   monday: inputs.monday,
    //   Tuesday: inputs.tuesday,
    //   wednesday: inputs.wednesday,
    //   thursday: inputs.thursday,
    //   friday: inputs.friday,
    //   saturday: inputs.saturday,
    //   createdDate: createdDate,
    // };
    // console.log(FormData);
    // async function storeData() {
    //   try {
    //     let headers = {
    //       "Content-Type": "application/json; charset=utf-8",
    //     };
    //     const dataForm = FormData;
    //     const resLogin = await axios.post(
    //       `http://10.0.2.2:8000/school/AddmoreTimetable_list/`,
    //       dataForm,
    //       {
    //         headers: headers,
    //       }
    //     );
    //     console.log(resLoginTimeTable);
    //     const token = resLogin.data.token;
    //     // Token = token;
    //     // UserId = userId;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // storeData();
    // setFromTimeText("");
    // setToTimeText("");
    // setToTime("");
    // setEnteredMonday("");
    // setEnteredTuesday("");
    // setEnteredWednesday("");
    // setEnteredThursday("");
    // setEnteredFriday("");
    // setEnteredSaturday("");
    // setDateText("");
  }

  const deleteHandler = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  const inputHandlerMonday = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].monday = text;

    setInputs(_inputs);
  };

  const inputHandlerFromDate = (text, key) => {
    //  fromTimeChangeHandler();

    const _inputs = [...inputs];
    _inputs[key].fromTime = text;

    setInputs(_inputs);
  };

  const inputHandlerToDate = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].toTime = text;

    setInputs(_inputs);
  };

  const inputHandlerTuesday = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].tuesday = text;

    setInputs(_inputs);
  };

  const inputHandlerWed = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].wednesday = text;

    setInputs(_inputs);
  };

  const inputHandlerThur = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].thursday = text;

    setInputs(_inputs);
  };

  const inputHandlerFri = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].friday = text;

    setInputs(_inputs);
  };

  const inputHandlerSat = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].saturday = text;

    setInputs(_inputs);
  };

  function viewTimeTableform() {
    setShowTable(true);
    setShowTimeTableList(false);
  }
  const skip = (num) => new Array(num);
  useEffect(() => {
    async function viewDailyTimeTableList() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/AddmoreTimetable_list/`
        );
        // console.log(res.data);

        setShowTimeTableData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    viewDailyTimeTableList();
  }, []);

  function dateTextBlur(){
    setEnteredDateTextTouched(true);
  }
  function fromTextBlur(){
    setEnteredFromTimeTouched(true);
  }
  function toTextBlur(){
    setEnteredToTimeTouched(true);
  }
  return (
    <>
      <View style={{ backgroundColor: "white", height: "100%" }}>
        <View style={styles.BtnContainer}>
          <BgButton onPress={timeTableList} style={forTimeTableList}>
            Daily TimeTable
          </BgButton>
          <VerticalLine>|</VerticalLine>
          <BgButton onPress={viewExam} style={forExamTimeTable}>
            Exam TimeTable
          </BgButton>
        </View>

        {showTimeTableList && (
          <>
            <View style={styles.timetablebtn}>
              <Button onPress={viewTimeTableform}>Add new</Button>
            </View>
            <ScrollView horizontal={true}>
              <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> MONDAY</Text>
                  </View>
                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> TUESDAY</Text>
                  </View>
                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> WEDNESDAY</Text>
                  </View>

                  <View style={styles.th}>
                    <Text style={styles.tableTitle}>THURSDAY</Text>
                  </View>

                  <View style={styles.th}>
                    <Text style={styles.tableTitle}>FRIDAY</Text>
                  </View>

                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> SATURDAY</Text>
                  </View>
                </DataTable.Header>
                {showTimeTableData.map((data, key) => (
                  <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell style={styles.tableCell}>
                      {data.monday}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>
                      {data.Tuesday}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>
                      {data.wednesday}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>
                      {data.thursday}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>
                      {data.friday}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>
                      {data.saturday}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </ScrollView>
          </>
        )}

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
                          color: "red !important",
                          fontWeight: "bold",
                          fontSize: 54,
                          fontFamily: "HindRegular",
                        }}
                        boxStyles={selectInputIsInValid && styles.errorSelectedColor}
                      />
                    </View>
                  </View>

                  <View style={styles.space} />

                  <View style={{ flex: 1 }}>
                      <View>
                        <Ionicons
                          style={{
                            position: "absolute",
                            top:25
                          }}
                          name="calendar"
                          size={24}
                          color="black"
                          onPress={() => showDateMode("date")}
                        />
                      </View>
                      <Input
                        placeholder="Created Date"
                        onChangeText={createdDateChangeHandler}
                        value={dateText || createdDate}
                        blur={dateTextBlur}
                        style={dateTextInputIsInValid && styles.errorBorderColor}
                      />
                      {dateTextInputIsInValid && (
                        <Text style={{ color: "red",left:20 }}>Enter creation date</Text>
                      )}
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
                        <View>
                          <Ionicons
                            style={{
                              position:'absolute',
                              top:26
                            }}
                            name="timer-sharp"
                            size={24}
                            color="black"
                            onPress={() => showTimeFromMode("time")}
                          />
                        </View>
                        <Input
                          value={fromTimeText}
                          placeholder="From Time:"
                          blur={fromTextBlur}
                          //onChangeText={fromTimeHandler}
                          //  value={input.fromTime || fromTimeText}
                          // onChangeText={(text) =>
                          //   inputHandlerFromDate(text, key)
                          // }
                          style={fromtimeInputIsInValid && styles.errorBorderColor}
                          onSubmitEditing={Keyboard.dismiss}
                        />
                        {fromtimeInputIsInValid && (
                         <Text style={{ color: "red",left:20 }}>Enter from time</Text>
                        )}
                        {fromTimeShow && (
                          // <View key={key}>
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={fromTime}
                            // value={input.fromTime}

                            mode={fromTimemode}
                            is24Hour={true}
                            display="default"
                            onChange={fromTimeChangeHandler}

                            //  onChange={() => fromTimeChangeHandler(key)}
                            // onChange={fromTimeChangeHandler(key)}
                          />
                          // </View>
                        )}
                      </View>
                      <View style={styles.space} />
                      <View style={{ flex: 1 }}>
                        <View>
                          <Ionicons
                            style={{
                              position:'absolute',
                              top:26
                            }}
                            name="timer-sharp"
                            size={24}
                            color="black"
                            onPress={() => showTimeToMode("time")}
                          />
                        </View>

                        <Input
                          value={toTimeText || toTime}
                          onSubmitEditing={Keyboard.dismiss}
                          onChangeText={toTimeChangeHandler}
                          placeholder="To Time:"
                          blur={toTextBlur}
                          style={TotimeInputIsInValid && styles.errorBorderColor}
                        />
                        {TotimeInputIsInValid && (
                         <Text style={{ color: "red",left:20 }}>Enter to time</Text>
                        )}
                        {toTimeShow && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={toTime}
                            // value={input.toTime}
                            mode={toTimemode}
                            is24Hour={true}
                            display="default"
                            onChange={toTimeChangeHandler}
                            onChangeText={(text) =>
                              inputHandlerToDate(text, key)
                            }
                            // onChange={(text) => toTimeChangeHandler(text, key)}
                            //  minimumDate={fromDate}
                          />
                        )}
                      </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1 }}>
                        <View style={styles.title}>
                          {/* <Text style={styles.labels}>Monday </Text> */}
                        </View>

                        <Input
                          placeholder="Monday"
                          // style={styles.inputStyle}
                          // onChangeText={setEnteredMonday}
                          value={input.monday}
                          onChangeText={(text) => inputHandlerMonday(text, key)}
                          // onChangeText={(text) => inputHandler(text, key)}
                          onSubmitEditing={Keyboard.dismiss}
                        />
                      </View>

                      <View style={styles.space} />

                      <View style={{ flex: 1 }}>
                        <View style={styles.title}></View>

                        <Input
                          placeholder="Tuesday"
                          //style={styles.inputStyle}
                          // onChangeText={setEnteredTuesday}
                          value={input.tuesday}
                          //value={input.value}
                          onChangeText={(text) =>
                            inputHandlerTuesday(text, key)
                          }
                          //  onChangeText={(text) => inputHandler(text, key)}
                          onSubmitEditing={Keyboard.dismiss}
                        />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1 }}>
                        <View style={styles.title}>
                          {/* <Text style={styles.labels}>Wednesday </Text> */}
                        </View>

                        <Input
                          placeholder="Wednesday"
                          value={input.wednesday}
                          onChangeText={(text) => inputHandlerWed(text, key)}
                          onSubmitEditing={Keyboard.dismiss}
                        />
                      </View>

                      <View style={styles.space} />

                      <View style={{ flex: 1 }}>
                        <View style={styles.title}></View>
                        <Input
                          placeholder="Thursday"
                          value={input.thursday}
                          onChangeText={(text) => inputHandlerThur(text, key)}
                          onSubmitEditing={Keyboard.dismiss}
                        />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1 }}>
                        <View style={styles.title}></View>
                        <Input
                          placeholder="Friday"
                          value={input.friday}
                          onChangeText={(text) => inputHandlerFri(text, key)}
                          onSubmitEditing={Keyboard.dismiss}
                        />
                      </View>

                      <View style={styles.space} />

                      <View style={{ flex: 1 }}>
                        <View style={styles.title}></View>
                        <Input
                          placeholder="Saturday"
                          value={input.saturday}
                          onChangeText={(text) => inputHandlerSat(text, key)}
                          onSubmitEditing={Keyboard.dismiss}
                        />
                      </View>
                    </View>

                    <TouchableOpacity onPress={() => deleteHandler(key)}>
                      <Text
                        style={{
                          width: "25%",
                          padding: 9,
                          fontFamily: "HindMedium",
                          borderRadius: 10,
                          marginLeft: 240,
                          color: "red",
                          fontSize: 22,
                          backgroundColor: "pink",
                        }}
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={styles.btnSubmit}>
                  <Button onPress={addPeriodsHandler}>Add more Periods</Button>
                </View>
                <View style={styles.btnSubmit1}>
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
            <TecahersExamTimeTable />
          </>
        )}
      </View>
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
  errorBorderColor:{
    color: "black",
    borderBottomWidth: 1,
    borderColor: "red",
    padding: 10,
    margin: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
  },
  errorSelectedColor:{
    borderColor:'red'
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
  btnSubmit1: {
    flexDirection: "row",
    marginTop: -118,
    marginLeft: 230,
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
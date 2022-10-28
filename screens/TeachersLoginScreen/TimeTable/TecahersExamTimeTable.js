import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Button as Btn,
  Alert,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Input from "../../../components/UI/Input";
import { Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import TeachersHome from "../BottomTab/TeachersHome";
import Button from "../../../components/UI/Button";
import { Card, DataTable } from "react-native-paper";
import moment from "moment";
import SearchBar from "react-native-dynamic-search-bar";
export var ID;
const TecahersExamTimeTable = () => {

  const [examLabel,setExamLabel]=useState(false);
  const [totalLabel,setTotalLabel]=useState(false);
  const [hourLabel,setHourLabel]=useState(false);
  const [btn,subBtn]=useState(false);
  const [isExamnameFocused,setIsExamnameFocused]=useState(false);
  const [isFromFocused,setIsFromFocused]=useState(false);
  const [isToFocused,setIsToFocused]=useState(false);
  const [isTotalmarkFocused,setIsTotalmarkFocused]=useState(false);
  const [isHourFocused,setIsHourFocused]=useState(false);

  const [selectedExamTimeTable, setSelectedExamTimeTable] = useState("");
  const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
  const enteredSelcetdIsValid = selectedExamTimeTable.trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

  const [datemode, setDateMode] = useState("date");
  const [ExamTimeTableData, setExamTimeTableData] = useState([]);

  const [examName, setEnteredExamName] = useState("");
  const [enteredExamNameTouched, setEnteredExamNameTouched] = useState(false);
  const enteredExamNameIsValid = examName.trim() !== "";
  const selectExamNameIsInValid =
    !enteredExamNameIsValid && enteredExamNameTouched;

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

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

  const [totalMarks, setEnteredTotalMarks] = useState("");
  const [enteredMarksTouched, setEnteredMarksTouched] = useState(false);
  const enteredMarksIsValid = totalMarks;
  const marksInputIsInValid = !enteredMarksIsValid && enteredMarksTouched;

  const [hour, setEnteredHour] = useState("");
  const [enteredHourTouched, setEnteredHourTouched] = useState(false);
  const enteredHourIsValid = hour.trim() !== "";
  const hourInputIsInValid = !enteredHourIsValid && enteredHourTouched;

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  const [showform, setShowForm] = useState(false);
  const [showExamList, setShowExamList] = useState(true);
  const [showExamData, setShowExamData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showaddBtn, setShowAddBtn] = useState(true);

  const [showInitialBtn, setShowInitialBtn] = useState(true);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

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
        setFilteredData(res.data);
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

  function updateHandler() {
    setShowAddBtn(true);
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
        const resLogin = await axios.put(
          `http://10.0.2.2:8000/school/Exam/${ID}/`,
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
    Alert.alert("Successfully updated", "", [
      { text: "OK", onPress: () => fetchData() },
    ]);

    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Exam/`);
        setShowExamData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    setEnteredExamName("");
    setFromText("");
    setToText("");
    setEnteredTotalMarks("");
    setEnteredHour("");
    setShowExamList(true);
    setShowForm(false);
  }
  function addExamTimeTableHandler() {
    subBtn(true);

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

    setEnteredExamNameTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredMarksTouched(true);
    setEnteredHourTouched(true);
    setEnteredSelectedTouched(true);

    const formIsValid =
      enteredExamNameIsValid &&
      enteredFromDateIsValid &&
      enteredtoDateIsValid &&
      enteredHourIsValid;

    if (formIsValid) {
      Alert.alert("Saved Data", "Saved Data successfully", [
        {
          text: "OK",
          onPress: () => {
            setShowForm(false);
            viewExamList();
          },
        },
      ]);
    }

    if (!enteredExamNameTouched) {
      return;
    }
    if (!enteredFromDateIsValid) {
      return;
    }
    if (!enteredtoDateIsValid) {
      return;
    }
    if (!enteredHourIsValid) {
      return;
    }
    if (!enteredMarksIsValid) {
      return;
    }
    if (!enteredSelcetdIsValid) {
      return;
    } else {
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
      setEnteredExamNameTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
      setEnteredMarksTouched(false);
      setEnteredHourTouched(false);
      setEnteredSelectedTouched(false);
      setShowExamList(true);
      setShowForm(false);
    }
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
    setShowAddBtn(false);
    setShowForm(true);
    setShowExamList(false);
    setEnteredExamName("");
    setFromText("");
    setToText("");
    setEnteredTotalMarks("");
    setEnteredHour("");
    setEnteredExamNameTouched(false);
    setEnteredFromDateTouched(false);
    setEnteredtoDateTouched(false);
    setEnteredMarksTouched(false);
    setEnteredHourTouched(false);
    setEnteredSelectedTouched(false);
    setIsEdit(false);
  }

  function viewExamList() {
    async function viewExamList() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Exam/`);
        console.log(res.data);

        setShowExamData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    viewExamList();
    setShowForm(false);
    setShowExamList(true);
  }

  function examBlurHandler() {
    setEnteredExamNameTouched(true);
    setIsExamnameFocused(false);
  }
  function onExamnameFocusHandler(){
    setIsExamnameFocused(true);
    setEnteredExamNameTouched(false);
    setExamLabel(true);
  }

  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
    setIsFromFocused(false);
  }
  function onFromFocusHandler(){
    setIsFromFocused(true);
    setEnteredFromDateTouched(false);
  }

  function toDateBlurHanlder() {
    setEnteredtoDateTouched(true);
  }
  function onToFocusHandler(){
    setIsToFocused(true);
    setEnteredtoDateTouched(false);
  }

  function markBlurHanlder() {
    setEnteredMarksTouched(true);
    setIsTotalmarkFocused(false);
  }
  function onMarkFocusHandler(){
    setIsTotalmarkFocused(true);
    setEnteredMarksTouched(false);
    setTotalLabel(true);
  }

  function hourBlurHanlder() {
    setEnteredHourTouched(true);
    setIsHourFocused(false);
  }
  function onHourFocusHandler(){
    setIsHourFocused(true);
    setEnteredHourTouched(false);
    setHourLabel(true);
  }

  function editItem(id) {
    setShowAddBtn(false);
    setExamLabel(true);
    setTotalLabel(true);
    setHourLabel(true);
    ID = id;
    console.log(id);
    const filteredDummuyData = showExamData.find((data) => data.id == id);

    setEnteredExamName(filteredDummuyData.exam_name);
    //  setEnteredcreatedby(filteredDummuyData.created_by);
    setFromText(moment(filteredDummuyData.start_date).format("DD/MM/YYYY"));
    setToText(moment(filteredDummuyData.end_date).format("DD/MM/YYYY"));
    setEnteredTotalMarks(filteredDummuyData.Total_marks);
    setEnteredHour(filteredDummuyData.hour);
    //  setEnteredMobile(filteredDummuyData.exam_name);
    //  setEnteredRouteName(filteredDummuyData.hour);
    // setForCalendarList({ fontWeight: "bold", color: "black" });
    // setForCalendarForm({ color: "black" });
    setShowForm(true);
    setShowExamList(false);
    setIsEdit(true);
  }
  function deleteItem(id) {
    console.log(id);
    // const newFilteredData=data.filter((data)=>data.id != id);
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
        // const dataForm = FormData;
        const resLogin = await axios.delete(
          `http://10.0.2.2:8000/school/Exam/${id}/`,
          // FormData,
          {
            headers: headers,
          }
        );
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
      async function fetchData() {
        try {
          const res = await axios.get(`http://10.0.2.2:8000/school/Exam/`);
          // console.log(res.data);
          setShowExamData(res.data);
          setFilteredData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }

  function cancelHandler() {
    setShowAddBtn(true);
    setShowExamList(true);
    setShowForm(false);
  }

  const searchFilter = (text) => {
    console.log("search function");
    if (text) {
      const newData = showExamData.filter((item) => {
        const itemData = item.exam_name
          ? item.exam_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      setFilteredData(showExamData);
      setSearchText(text);
    }
  };
  return (
    <>
      {showaddBtn && (
        <View style={styles.timetablebtn}>
          <Button onPress={viewExam}>
            <Ionicons 
              name="add" 
              size={deviceWidth < 370 ? 35 : 38} 
              color="black"
               />
          </Button>
        </View>
      )}
      <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
        {/* <View style={{ flex: 8, bottom: 5 }}> */}
        <ScrollView>
          {showaddBtn && (
            <SearchBar
              onSubmitEditing={Keyboard.dismiss}
              style={styles.searchBar}
              textInputStyle={{
                fontFamily: "HindRegular",
                fontSize: 18,
              }}
              placeholder="Search here"
              onChangeText={(text) => searchFilter(text)}
              value={searchText}
            />
          )}
          {showExamList &&
            filteredData &&
            filteredData.map((data, key) => (
              <>
                <Card
                  style={{
                    marginTop: 20,
                    marginVertical: 1,
                    marginHorizontal: 20,
                    elevation: 5,
                    borderRadius: 10,
                  }}
                  key={key}
                >
                  <Card.Content>
                    <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
                      <View style={{ flex: 2 }}>
                        <View
                          style={[
                            { flex: 1 },
                            { flexDirection: "column", top: "10%" },
                          ]}
                        >
                          <View style={{ flex: 2 }}>
                            <Text
                              style={[
                                styles.cardTextStyle,
                                {
                                  color: "black",
                                  fontSize: deviceWidth < 370 ? 14 : 16,
                                },
                              ]}
                            >
                              {moment(data.start_date).format("DD/MM/YYYY")}
                            </Text>
                          </View>
                          <View
                            style={{
                              left: "30%",
                              position: "absolute",
                              top: "25%",
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "HindRegular",
                                fontSize: 18,
                                color: "grey",
                                fontWeight: "bold",
                              }}
                            >
                              to
                            </Text>
                          </View>
                          <View style={{ flex: 2 }}>
                            <Text
                              style={[
                                styles.cardTextStyle,
                                {
                                  color: "black",
                                  fontSize: deviceWidth < 370 ? 14 : 16,
                                },
                              ]}
                            >
                              {moment(data.end_date).format("DD/MM/YYYY")}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ flex: 2 }}>
                        <Text style={styles.cardTextStyle}>Class name</Text>
                        <Text style={styles.cardTextStyle}>Exam name</Text>
                        <Text style={styles.cardTextStyle}>Total marks</Text>
                        <Text style={styles.cardTextStyle}>Hour</Text>
                      </View>
                      <View style={{ flex: 2 }}>
                        <Text
                          style={[
                            styles.cardTextStyle,
                            {
                              color: "grey",
                              fontSize: deviceWidth < 370 ? 14 : 16,
                            },
                          ]}
                        >
                          {data.class_name}
                        </Text>
                        <Text
                          style={[
                            styles.cardTextStyle,
                            {
                              width: "120%",
                              color: "grey",
                              fontSize: deviceWidth < 370 ? 14 : 16,
                            },
                          ]}
                        >
                          {data.exam_name}
                        </Text>
                        <Text
                          style={[
                            styles.cardTextStyle,
                            {
                              color: "grey",
                              fontSize: deviceWidth < 370 ? 14 : 16,
                            },
                          ]}
                        >
                          {data.Total_marks}
                        </Text>
                        <Text
                          style={[
                            styles.cardTextStyle,
                            {
                              color: "grey",
                              fontSize: deviceWidth < 370 ? 14 : 16,
                            },
                          ]}
                        >
                          {data.hour}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        { flex: 1 },
                        {
                          flexDirection: "row",
                          left: "100%",
                          //  top: "2%",
                        },
                      ]}
                    >
                      <View style={{ flex: 2, left:  deviceWidth < 370 ? '400%' : '450%' }}>
                        <Ionicons
                          name="md-pencil-sharp"
                          size={24}
                          color="green"
                          onPress={() => editItem(data.id)}
                        />
                      </View>
                      <View style={{ flex: 2, left: -10 }}>
                        <Ionicons
                          name="trash"
                          size={24}
                          color="red"
                          onPress={() => deleteItem(data.id)}
                        />
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </>
            ))}
        </ScrollView>
        {/* </View> */}
      </View>

      {showform && (
        <ScrollView>
          <View style={styles.inputForm}>
            {!isEdit && (
              <Text style={[styles.labels, { marginLeft: 20 }]}>
                Class Name
              </Text>
            )}
            {!isEdit && (
              <View
                style={{
                  width: 250,
                  fontSize: 18,
                  marginTop: 3,
                  marginLeft: 20,
                }}
              >
                <SelectList
                  setSelected={setSelectedExamTimeTable}
                  data={ExamTimeTableData}
                  placeholder="select class"
                  style={{ fontSize:  deviceWidth < 370 ? 14 : 18, }}
                  boxStyles={[
                    selectInputIsInValid && styles.errorSelectedColor,
                    { borderRadius: 0 },
                  ]}
                  inputStyles={{ fontSize: 20, fontFamily: "HindRegular" }}
                  dropdownTextStyles={{
                    fontSize:  deviceWidth < 370 ? 14 : 18,
                    fontFamily: "HindRegular",
                  }}
                />
                {selectInputIsInValid && (
                  <Text style={{ color: "red", left: 20 }}>Enter class</Text>
                )}
              </View>
            )}
            <View>
            <View style={!examLabel ? styles.normal : styles.up}>
              <Text 
              style={[selectExamNameIsInValid ? styles.errorLabel : styles.normalLabel]}
              onPress={onExamnameFocusHandler}>Exam name</Text>
            </View>
            <Input
              style={isExamnameFocused ? styles.focusStyle : selectExamNameIsInValid && styles.errorBorderColor}
              onChangeText={examNameChangeHandler}
              value={examName}
              blur={examBlurHandler}
              onFocus={onExamnameFocusHandler}
              onSubmitEditing={Keyboard.dismiss}
            />
            </View>
            {selectExamNameIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: deviceWidth < 370 ? 14 : 18,
                }}
              >
                Enter exam name
              </Text>
            )}
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
                    flexDirection: "row",
                  }}
                >
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: 15,
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showFromMode("date")}
                  />
                </View>
                <Input
                  value={fromText}
                  placeholder="From Date"
                  blur={fromDateBlurHandler}
                  onFocus={onFromFocusHandler}
                  style={isFromFocused ? styles.focusStyle : fromDateInputIsInValid && styles.errorBorderColor}
                  onChangeText={fromDateChangeHandler}
                  onPressIn={() => showFromMode("date")}
                />
                {fromDateInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: deviceWidth < 370 ? 14 : 18,
                    }}
                  >
                    Enter from date
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
              <View style={styles.space} />

              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: 20,
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showToMode("date")}
                  />
                </View>
                <Input
                  value={toText}
                  placeholder="To Date"
                  blur={toDateBlurHanlder}
                  onFocus={onToFocusHandler}
                  style={isToFocused ? styles.focusStyle : toDateInputIsInValid && styles.errorBorderColor}
                  onPressIn={() => showToMode("date")}
                />
                {toDateInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: deviceWidth < 370 ? 14 : 18,
                    }}
                  >
                    Enter to date
                  </Text>
                )}
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
            <View>
            <View style={btn ? styles.topLabelExtra :(!totalLabel ? styles.normalTotal : styles.upTotal)}>
              <Text 
              style={[marksInputIsInValid ? styles.errorLabel : styles.normalLabel]}
              onPress={onMarkFocusHandler}>Total marks</Text>
            </View>
            <Input
              onChangeText={totalMarksChangeHandler}
              value={totalMarks.toString()}
              style={isTotalmarkFocused ? styles.focusStyle : marksInputIsInValid && styles.errorBorderColor}
              onSubmitEditing={Keyboard.dismiss}
              blur={markBlurHanlder}
              onFocus={onMarkFocusHandler}
            />
            </View>
            {marksInputIsInValid && (
              <Text
                style={[btn ? styles.topExtra : (styles.errorText,{bottom:10,color:'red',left:30})]}>
                Enter total marks
              </Text>
            )}
            <View>
            <View style={!hourLabel ? styles.normalHour : styles.upHour}>
              <Text 
                style={[hourInputIsInValid ? styles.errorLabel : styles.normalLabel]}
                
              onPress={onHourFocusHandler}>Hour</Text>
            </View>
            <Input
              onChangeText={hourChangeHandler}
              value={hour}
              style={isHourFocused ? styles.focusStyle : hourInputIsInValid && styles.errorBorderColor}
              onSubmitEditing={Keyboard.dismiss}
              blur={hourBlurHanlder}
              onFocus={onHourFocusHandler}
            />
            </View>
            {hourInputIsInValid && (
              <Text
                style={[btn ? styles.topExtra :(styles.errorText,marksInputIsInValid ? {bottom:10,left:30,color:'red'} : {top:430})]}>
                Enter hour
              </Text>
            )}

            {!isEdit && (
              <View style={styles.btnSubmit}>
                <Button onPress={addExamTimeTableHandler}>Add</Button>
              </View>
            )}
            {!isEdit && (
              <View style={styles.cancel}>
                <Button onPress={cancelHandler}>Cancel</Button>
              </View>
            )}
            {isEdit && (
              <View style={styles.btnSubmit1}>
                <Button onPress={updateHandler}>Update</Button>
              </View>
            )}

            {isEdit && (
              <View style={styles.cancel}>
                <Button onPress={cancelHandler}>Cancel</Button>
              </View>
            )}
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

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
    fontSize: 24,
    marginHorizontal: 10,
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
    marginTop: 27,
    marginBottom: 59,
    width: "50%",
    marginLeft: 190,
  },
  btnSubmit1: {
    marginTop: 29,
    marginBottom: 59,
    width: "50%",
    marginLeft: 200,
  },
  cancel: {
    marginTop: -165,
    marginBottom: 40,
    marginLeft: -15,
    width: "50%",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  timetablebtn: {
    width: "30%",

    //paddingVertical: 20,
    //paddingHorizontal: 0,
    marginTop: -30,
    marginLeft:  deviceWidth < 370 ? 260 :280,
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
  errorBorderColor: {
    borderColor:'red'
  },
  errorSelectedColor: {
    borderColor: "red",
  },
  headingStyle: {
    left: "20%",
    color: "purple",
  },
  stopStyle: {
    fontWeight: "bold",
    fontSize: deviceWidth < 370 ? 18 : 20,
    left: "20%",
  },
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: deviceWidth < 370 ? 14 : 16,
  },
  submit: {
    padding: "3%",
    backgroundColor: "#00B8AC",
    borderRadius: 10,
    borderWidth: 1,
    top: "10%",
    borderColor: "#fff",
    // left:'10%',
    width: deviceWidth < 370 ? "50%" : "50%",
  },
  delete: {
    padding: "3%",
    backgroundColor: "red",
    borderRadius: 10,
    borderWidth: 1,
    top: "10%",
    borderColor: "#fff",
    width: deviceWidth < 370 ? "50%" : "50%",
  },
  focusStyle:{
    borderColor:'blue'
  },

  normal:{
    position:'absolute',
    top:30,
    left:30,
  },
  up:{
    top:25,
    width:90,
    left:30,
  },

  normalTotal:{
    position:'absolute',
    top:27,
    left:30,
  },
  upTotal:{
    top:25,
    width:92,
    left:30,
  },

  normalHour:{
    position:'absolute',
    top:27,
    left:30,
  },
  upHour:{
    top:24,
    width:44,
    left:30,
  },


  errorLabel:{
    color:'red',
    backgroundColor:'#F2F2F2',
    paddingHorizontal:5,
    fontSize: deviceWidth < 370 ? 13 : 15,
  },
  normalLabel:{
    color:'grey',
    backgroundColor:'#F2F2F2',
    paddingHorizontal:5,
    fontSize: deviceWidth < 370 ? 13 : 15,
  },
  errorText:{
    color: "red",
    left: 40,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 14 : 18,
    position:'absolute',
  },
  topLabelExtra:{
    top:25,
    left:30,
    width:100
  },
  topExtra:{
    bottom:10,
    left:30,
    color:'red'
  }
});

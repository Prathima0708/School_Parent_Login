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
import {
  IconButton,
  Button as NativeButton,
  Text as NativeText,
  Heading,
} from "native-base";
import { subURL } from "../../../components/utils/URL's";
import AsyncStorage from "@react-native-async-storage/async-storage";

export var CLASSNAME, SECTION, ID;
export var idTimeTab = [];
export var TimeTabID;
export var FROMTIME, TOTIME;
export var arr = [];
var newArray, firstData, DISPLAYFIRST, KEY, VALUE, USERNAME;

const TeachersTimetable = () => {
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [showExamList, setShowExamList] = useState(false);

  const [studClassData, setStudentClassData] = useState([]);
  const [tdata, settdata] = useState([]);

  const [selected, setSelected] = useState("");

  const [showTimeTableList, setShowTimeTableList] = useState(true);
  const [showTimeTableData, setShowTimeTableData] = useState([]);

  const [isUndefined, setIsUndefined] = useState(false);
  const [isIdThere, setIsIdThere] = useState(false);
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
  const [defaultClass, setDefaultClass] = useState(true);
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
        newArray = res.data.map((item) => {
          return {
            key: item.id,
            value: item.class_name + " - " + item.section,
            classname: item.class_name,
            section: item.section,
          };
        });

        // setTimeTableData(newArray);

        newArray.sort(function (obj1, obj2) {
          return obj1.value.localeCompare(obj2.value);
        });
        // console.log(details);

        //console.log(newArray[0]);

        firstData = newArray[0];
        //console.log("key -", firstData.key);
        KEY = firstData.key;
        VALUE = firstData.value;
        // if (firstData == undefined) {
        //   setDefaultClass(false);
        // } else {
        //   setDefaultClass(true);
        //   firstData = newArray[0];
        // }

        //let selectedData = selectedClass.split(" - ");
        // console.log(selectedData);

        // try {
        //   await AsyncStorage.setItem("defaultoption", firstData);
        // } catch (error) {
        //   // Error saving data
        // }
        setStudentClassData(newArray);
      } catch (error) {
        console.log(error);
      }
    }
    fetchClass();
  }, []);

  console.log("default option outside -", firstData);
  console.log("KEY -", KEY);
  console.log("VALUE -", VALUE);

  // if (KEY == undefined) {
  //   console.log("undefined key");
  // }
  // if (VALUE == undefined) {
  //   console.log("undefined value");
  // }
  // async function fetchDefaultOption() {
  //   DISPLAYFIRST = await AsyncStorage.getItem("defaultoption");
  //   console.log("this is the default option from aysnc", DISPLAYFIRST);
  //   if (DISPLAYFIRST !== null) {
  //     setDefaultClass(DISPLAYFIRST);
  //   }
  // }

  // fetchDefaultOption();

  useEffect(() => {
    async function fetchTimeTable() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/AddmoreTimetable_list/`
        );
        let newArray1 = res.data.map((item) => {
          return {
            value: item.from_time + " - " + item.to_time,
          };
        });

        settdata(newArray1);
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
    // console.log(newArray[0][1]);
    //  console.log(selected);
    setShowDefaultList(false);
    setShowSelected(true);
    async function login() {
      console.log("***********");
      // console.log(selected);
      console.log("new array is -", newArray);
      let filteredlist = newArray?.filter((ele) => ele.key == selected);
      console.log("filteredlist", filteredlist);
      // let selectedData = selected.split(" - ");
      // console.log(selectedData);
      let class_name = filteredlist[0].classname;
      let section = filteredlist[0].section;

      try {
        const res = await axios.get(
          `${subURL}/Timetable_by_sec/${class_name}/${section}`
        );
        console.log("*****");
        //console.log(res.data[0].id);
        console.log(res.data[0]);

        if (res.data[0] == undefined) {
          setIsUndefined(true);
        } else {
          TimeTabID = res.data[0].id;
          setIsUndefined(false);
          const timetableres = await axios.get(
            `${subURL}/AddmoreTimetable_list_by_timetab/${TimeTabID}`
          );
          arr = timetableres.data;
          console.log(timetableres.data[0]);
          console.log("before sorting");
          // console.log(arr);

          console.log("after sorting");
          arr.reverse();
          // console.log(arr);
          //  console.log(timetableres.data);
          if (timetableres.data[0] == undefined) {
            setIsIdThere(false);
          } else {
            setFilteredTimeTable(arr);
            setIsIdThere(true);
          }
        }

        // if (isUndefined) {
        //   Alert.alert("No data found", "No data found for respective search");
        // }
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
            {/* <View style={[{flex:0.5}, {
                flexDirection: "row",marginHorizontal:20,top:'10%'
              }]}>
                <View style={{ flex: 1 }} >
                  <Text style={{fontFamily:'HindBold',fontSize:18,marginTop:10}}>
                    Select Class
                  </Text>
                </View>
                <View style={{ flex: 1,width:'30%',right:'12%' ,backgroundColor:'red'}} >
                  <SelectList
                    //defaultOption={firstData}
                    defaultOption={{
                      key: KEY,
                      value: VALUE,
                    }}
                    //  defaultOption={{ key: "1", value: "abc" }}
                    setSelected={setSelected}
                    data={studClassData}
                    // placeholder="Select class."
                    boxStyles={{ borderRadius: 10 }}
                    dropdownTextStyles={{
                      fontSize: deviceWidth < 370 ? 16 : 18,
                      fontFamily: "HindRegular",
                    
                    }}
                    inputStyles={{
                      fontSize: deviceWidth < 370 ? 16 : 18,
                      fontFamily: "HindRegular",
                      
                    }}
                    onSelect={viewTimeTableList}
                    save="key"
                  />
                </View>
              </View> */}

            <View
              style={{
                // width: 170,
                fontSize: 20,
                marginTop: "10%",
                margin: 10,
                left: "2%",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontFamily: "HindBold",
                  fontSize: 20,
                  top: "3%",
                  marginLeft: 10,
                }}
              >
                Select class
              </Text>
              <View style={styles.space} />
              <View style={styles.space} />
              <Text style={{fontFamily:'HindBold',fontSize:20,top: "3%"}}>-</Text>
              <View style={styles.space} />
              <View style={styles.space} />
              <SelectList
                //defaultOption={firstData}
                defaultOption={{
                  key: String(KEY),
                  value: String(VALUE),
                }}
                //  defaultOption={{ key: "1", value: "abc" }}
                setSelected={setSelected}
                data={studClassData}
                // placeholder="Select class."
                boxStyles={{ borderRadius: 10 }}
                dropdownTextStyles={{
                  fontSize: deviceWidth < 370 ? 16 : 18,
                  fontFamily: "HindRegular",
                }}
                inputStyles={{
                  fontSize: deviceWidth < 370 ? 16 : 18,
                  fontFamily: "HindRegular",
                }}
                onSelect={viewTimeTableList}
                save="key"
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
              style={[
                { flex: 1 },
                {
                  flexDirection: "column",
                  backgroundColor: "white",
                  top: "3%",
                },
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
                  {showSelected && (isUndefined || !isIdThere) && (
                    <View style={{ alignItems: "center", top: "2%" }}>
                      <NativeText fontSize="xl" bold color="error.900">
                        No Timetable found
                      </NativeText>
                    </View>
                  )}

                  {showSelected && !isUndefined && isIdThere && (
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
                                      style={[
                                        styles.headingFont,
                                        { color: "black" },
                                      ]}
                                    >
                                      Timing
                                    </Text>
                                  </View>
                                  <View style={styles.tableHead}>
                                    <Text
                                      style={[
                                        styles.headingFont,
                                        { color: "black" },
                                      ]}
                                    >
                                      MON
                                    </Text>
                                  </View>
                                  <View style={styles.tableHead}>
                                    <Text
                                      style={[
                                        styles.headingFont,
                                        { color: "black" },
                                      ]}
                                    >
                                      TUE
                                    </Text>
                                  </View>
                                  <View style={styles.tableHead}>
                                    <Text
                                      style={[
                                        styles.headingFont,
                                        { color: "black" },
                                      ]}
                                    >
                                      WED
                                    </Text>
                                  </View>
                                  <View style={styles.tableHead}>
                                    <Text
                                      style={[
                                        styles.headingFont,
                                        { color: "black" },
                                      ]}
                                    >
                                      THU
                                    </Text>
                                  </View>
                                  <View style={styles.tableHead}>
                                    <Text
                                      style={[
                                        styles.headingFont,
                                        { color: "black" },
                                      ]}
                                    >
                                      FRI
                                    </Text>
                                  </View>
                                  <View style={styles.tableHead}>
                                    <Text
                                      style={[
                                        styles.headingFont,
                                        { color: "black" },
                                      ]}
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

                                <View
                                  style={[styles.flexrow, { borderWidth: 1 }]}
                                >
                                  <View
                                    style={[
                                      { flex: 1 },
                                      { flexDirection: "row" },
                                    ]}
                                  >
                                    <View
                                      style={{ flex: 1, marginHorizontal: 10 }}
                                    >
                                      {filteredTimeTable &&
                                        filteredTimeTable.map((data) => (
                                          <View style={[styles.root]}>
                                            <View style={[styles.firstCol]}>
                                              <Text
                                                style={styles.headingFirstCol}
                                              >
                                                {moment(
                                                  data.from_time,
                                                  "HH:mm"
                                                ).format("hh:mm ")}{" "}
                                                {"-"} {""}
                                                {moment(
                                                  data.to_time,
                                                  "HH:mm"
                                                ).format("hh:mm ")}
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
                                                {
                                                  alignItems: "center",
                                                  width: 100,
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={styles.headingFirstCol}
                                              >
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
                                                {
                                                  alignItems: "center",
                                                  width: 100,
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[styles.headingFirstCol]}
                                              >
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
                                                {
                                                  alignItems: "center",
                                                  width: 100,
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={styles.headingFirstCol}
                                              >
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
                                                {
                                                  alignItems: "center",
                                                  width: 100,
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={[styles.headingFirstCol]}
                                              >
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
                                                {
                                                  alignItems: "center",
                                                  width: 100,
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={styles.headingFirstCol}
                                              >
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
                                                {
                                                  alignItems: "center",
                                                  width: 100,
                                                },
                                              ]}
                                            >
                                              <Text
                                                style={styles.headingFirstCol}
                                              >
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
            </View>
            {keyboardStatus == "Keyboard Hidden" && (
              <View style={{ flex: 1 }}>
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
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",
    marginHorizontal: deviceWidth > 400 ? -5 : -10,
    backgroundColor: "#FDFEFE",
  },
  container: {
    marginHorizontal: 10,
    top: "3%",
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
    fontFamily: "Hind-SemiBold",
    // fontWeight: "bold",
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

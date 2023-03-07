import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  LogBox,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { Keyboard } from "react-native";
import BgButton from "../../../components/UI/BgButton";

import SelectList from "react-native-dropdown-select-list";
import TeachersHome from "../BottomTab/TeachersHome";

import { useEffect } from "react";
import TecahersExamTimeTable from "./TecahersExamTimeTable";

import moment from "moment";

import { subURL } from "../../../components/utils/URL's";

export var CLASSNAME, SECTION, ID;
export var idTimeTab = [];
export var TimeTabID;
export var FROMTIME, TOTIME;
export var arr = [];
var newArray, firstData, KEY, VALUE;

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
    color: "white",
    backgroundColor: "#1E84A4",
    borderRadius: 5,

    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontFamily: "HindSemiBold",
  });
  const [forExamTimeTable, setForExamTimeTable] = useState({
    color: "black",

    backgroundColor: "#F4F6F6",
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontFamily: "HindSemiBold",
  });

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
        const res = await axios.get(`${subURL}/Studentclass/`);
        newArray = res.data.map((item) => {
          return {
            key: item.id,
            value: item.class_name + " - " + item.section,
            classname: item.class_name,
            section: item.section,
          };
        });

        newArray.sort(function (obj1, obj2) {
          return obj1.value.localeCompare(obj2.value);
        });

        firstData = newArray[0];

        KEY = firstData.key;
        VALUE = firstData.value;

        setStudentClassData(newArray);
      } catch (error) {
        console.log(error);
      }
    }
    fetchClass();
  }, []);

  useEffect(() => {
    async function fetchTimeTable() {
      try {
        const res = await axios.get(`${subURL}/AddmoreTimetable_list/`);
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

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  function viewExam() {
    setForTimeTableList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 5,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });

    setForExamTimeTable({
      color: "white",
      backgroundColor: "#1E84A4",
      borderRadius: 5,
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
    setLoading(true);
    async function fetchDailyTimeTable() {
      try {
        const res = await axios.get(`${subURL}/AddmoreTimetable_list/`);
        setShowTimeTableData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDailyTimeTable();
    setForExamTimeTable({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 5,
      borderTopColor: "#d9dffc",
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });
    setForTimeTableList({
      backgroundColor: "#1E84A4",
      color: "white",
      borderRadius: 5,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });
    setShowAddBtn(true);
    setShowTimeTableList(true);
    setShowForm(false);
    setShowTable(false);
  }

  useEffect(() => {
    async function viewDailyTimeTableList() {
      try {
        const res = await axios.get(`${subURL}/AddmoreTimetable_list/`);

        setShowTimeTableData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    viewDailyTimeTableList();
  }, []);

  function viewTimeTableList() {
    setLoading(true);
    setShowDefaultList(false);
    setShowSelected(true);
    async function login() {
      let filteredlist = newArray?.filter((ele) => ele.key == selected);

      let class_name = filteredlist[0].classname;
      let section = filteredlist[0].section;

      try {
        const res = await axios.get(
          `${subURL}/Timetable_by_sec/${class_name}/${section}`
        );

        if (res.data[0] == undefined) {
          setIsUndefined(true);
        } else {
          TimeTabID = res.data[0].id;
          setIsUndefined(false);
          const timetableres = await axios.get(
            `${subURL}/AddmoreTimetable_list_by_timetab/${TimeTabID}`
          );
          arr = timetableres.data;

          arr.reverse();

          if (timetableres.data[0] == undefined) {
            setIsIdThere(false);
          } else {
            setFilteredTimeTable(arr);
            setIsIdThere(true);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
            <View
              style={{
                fontSize: 20,
                marginTop: "10%",
                margin: 10,
                left: "2%",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontFamily: "HindSemiBold",
                  fontSize: 17,
                  top: "3%",
                  marginLeft: 10,
                }}
              >
                Select class
              </Text>
              <View style={styles.space} />
              <View style={styles.space} />
              <Text style={{ fontFamily: "HindBold", fontSize: 20, top: "3%" }}>
                -
              </Text>
              <View style={styles.space} />
              <View style={styles.space} />
              <SelectList
                defaultOption={{
                  key: String(KEY),
                  value: String(VALUE),
                }}
                setSelected={setSelected}
                data={studClassData}
                boxStyles={{ borderRadius: 10 }}
                dropdownTextStyles={{
                  fontSize: deviceWidth < 370 ? 16 : 15,
                  fontFamily: "HindRegular",
                }}
                inputStyles={{
                  fontSize: deviceWidth < 370 ? 16 : 15,
                  fontFamily: "HindRegular",
                }}
                onSelect={viewTimeTableList}
                save="key"
              />
            </View>

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
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",

                        marginTop: "2%",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "HindSemiBold",
                          fontSize: 18,
                          color: "#6B0202",
                        }}
                      >
                        No timetable found
                      </Text>
                    </View>
                  )}

                  {showSelected && !isUndefined && isIdThere && (
                    <>
                      <View
                        style={{
                          bottom: 10,
                          height: "170%",
                        }}
                      >
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
                                                ).format("LT")}{" "}
                                                {"-"} {""}{" "}
                                                {moment(
                                                  data.to_time,
                                                  "HH:mm"
                                                ).format("LT")}
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
                                        left: "5%",
                                      }}
                                    >
                                      {filteredTimeTable &&
                                        filteredTimeTable.map((data) => (
                                          <View style={styles.root}>
                                            <View
                                              style={{
                                                alignItems: "center",
                                                width: 100,
                                              }}
                                            >
                                              <Text
                                                style={[styles.headingFirstCol]}
                                              >
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

  inputStyle: {
    color: "black",
    borderWidth: 2,
    borderColor: "lightgrey",
    backgroundColor: "white",
    padding: 10,

    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
  },

  space: {
    width: 10, // or whatever size you need
    height: 20,
  },

  tableRow: {
    height: "5%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },

  root: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 10,
  },
  tableHead: {
    flex: 1,

    borderRightWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  headingFont: {
    fontFamily: "HindSemiBold",

    fontSize: deviceWidth < 370 ? 14 : 15,
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

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  headingFirstCol: {
    fontFamily: "HindRegular",
    fontSize: 15,
  },
});

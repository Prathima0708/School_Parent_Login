import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import { DataTable } from "react-native-paper";

import axios from "axios";
import BgButton from "../../../../components/UI/BgButton";
import VerticalLine from "../../../../components/UI/VerticalLine";
import { Text } from "react-native";
import ParentsHome from "../../BottomTab/ParentsHome";
import { Image } from "react-native";
import { FlatList } from "react-native";
import {
  className,
  Section,
} from "../../../../components/StudentItem/StudentItem";
import moment from "moment";
import { Button, Divider, VStack, Text as NativeText } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { subURL } from "../../../../components/utils/URL's";
export var ID;
const TimeTable = () => {
  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);

  const [isMonActive, setIsMonActive] = useState(true);
  const [isTueActive, setIsTueActive] = useState(false);
  const [isWedActive, setIsWedActive] = useState(false);
  const [isThuActive, setIsThuActive] = useState(false);
  const [isFriActive, setIsFriActive] = useState(false);
  const [isSatActive, setIsSatActive] = useState(false);

  const [mondayTimeTable, setMondayTimeTable] = useState(true);
  const [tuesdayTimeTable, setTuesdayTimeTable] = useState(false);
  const [wednesdayTimeTable, setWednesdayTimeTable] = useState(false);
  const [thursdayTimeTable, setThursdayTimeTable] = useState(false);
  const [fridayTimeTable, setFridayTimeTable] = useState(false);
  const [saturdayTimeTable, setSaturdayTimeTable] = useState(false);
  // const [data, setData] = useState();

  const [examData, setExamData] = useState([]);

  const [timeTable, setTimeTable] = useState([]);
  const [forTimeTableList, setForTimeTableList] = useState({
    color: "white",
    backgroundColor: "#0C60F4",
    borderRadius: 10,
  });
  const [forExamTimeTable, setForExamTimeTable] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 10,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${subURL}/AddmoreTimetable_list/${className}`
        );
        console.log(res.data);

        setTimeTable(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  async function viewExam() {
    setForExamTimeTable({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    setForTimeTableList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setShowTable(false);
    setShowForm(true);
    try {
      const res = await axios.get(
        `http://10.0.2.2:8000/school/ExamByClass/${className}/`
      );
      console.log(res.data);

      setExamData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function timeTableList() {
    setForTimeTableList({
      backgroundColor: "#0C60F4",
      color: "white",
      borderRadius: 10,
    });
    setForExamTimeTable({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
    });
    setShowForm(false);
    setShowTable(true);

    try {
      const res = await axios.get(
        `${subURL}/AddmoreTimetable_list/${className}`
      );
      console.log(res.data);

      setTimeTable(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  function mondayPressedHandler() {
    setMondayTimeTable(true);
    setIsMonActive(true);
    setIsTueActive(false);
    setIsWedActive(false);
    setIsThuActive(false);
    setIsFriActive(false);
    setIsSatActive(false);
    setTuesdayTimeTable(false);
    setWednesdayTimeTable(false);
    setThursdayTimeTable(false);
    setFridayTimeTable(false);
    setSaturdayTimeTable(false);
  }

  function tuesdayPressedHandler() {
    setTuesdayTimeTable(true);
    setIsTueActive(true);
    setIsMonActive(false);
    setIsWedActive(false);
    setIsThuActive(false);
    setIsFriActive(false);
    setIsSatActive(false);
    setMondayTimeTable(false);
    setWednesdayTimeTable(false);
    setThursdayTimeTable(false);
    setFridayTimeTable(false);
    setSaturdayTimeTable(false);
  }

  function wednesdayPressedHandler() {
    setWednesdayTimeTable(true);
    setIsMonActive(false);
    setIsTueActive(false);
    setIsWedActive(true);
    setIsThuActive(false);
    setIsFriActive(false);
    setIsSatActive(false);
    setMondayTimeTable(false);
    setTuesdayTimeTable(false);
    setThursdayTimeTable(false);
    setFridayTimeTable(false);
    setSaturdayTimeTable(false);
  }

  function thursdayPressedHandler() {
    setThursdayTimeTable(true);
    setIsMonActive(false);
    setIsTueActive(false);
    setIsWedActive(false);
    setIsThuActive(true);
    setIsFriActive(false);
    setIsSatActive(false);
    setMondayTimeTable(false);
    setTuesdayTimeTable(false);
    setWednesdayTimeTable(false);
    setFridayTimeTable(false);
    setSaturdayTimeTable(false);
  }

  function fridayPressedHandler() {
    setFridayTimeTable(true);
    setIsMonActive(false);
    setIsTueActive(false);
    setIsWedActive(false);
    setIsThuActive(false);
    setIsFriActive(true);
    setIsSatActive(false);
    setMondayTimeTable(false);
    setTuesdayTimeTable(false);
    setWednesdayTimeTable(false);
    setThursdayTimeTable(false);
    setSaturdayTimeTable(false);
  }

  function saturdayPressedHandler() {
    setSaturdayTimeTable(true);
    setIsMonActive(false);
    setIsTueActive(false);
    setIsWedActive(false);
    setIsThuActive(false);
    setIsFriActive(false);
    setIsSatActive(true);
    setMondayTimeTable(false);
    setTuesdayTimeTable(false);
    setWednesdayTimeTable(false);
    setThursdayTimeTable(false);
    setFridayTimeTable(false);
  }

  function navigateHandler(id) {
    ID = id;
    console.log(id);
    navigation.navigate("ExamTimeTable");
  }
  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton onPress={timeTableList} style={forTimeTableList}>
          Daily
        </BgButton>

        <BgButton onPress={viewExam} style={forExamTimeTable}>
          Exam
        </BgButton>
      </View>
      {showTable && (
        <>
          <View style={styles.root}>
            <View style={styles.flex}>
              <View style={[styles.studInfo, styles.studInfoTopLeftStyle1]}>
                <View style={styles.flexrow}>
                  <View style={{ flex: 0.5 }}>
                    <Text
                      style={[
                        styles.description,
                        styles.bottomLine,
                        { justifyContent: "center", alignItems: "center" },
                      ]}
                    >
                      Class: <Text style={styles.textInfo}>{className}</Text>
                    </Text>
                  </View>
                  <View style={styles.space} />
                  <View style={{ flex: 0.5, marginRight: "5%" }}>
                    <Text style={[styles.description, styles.bottomLine]}>
                      Section: <Text style={styles.textInfo}>{Section}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[
                mondayTimeTable ||
                tuesdayTimeTable ||
                wednesdayTimeTable ||
                thursdayTimeTable ||
                fridayTimeTable ||
                saturdayTimeTable
                  ? styles.buttonGroup
                  : styles.NotButtonGroup,
              ]}
            >
              <View style={{ flex: 1 }}>
                <Button
                  size="sm"
                  variant={!isMonActive ? "outline" : "solid"}
                  onPress={mondayPressedHandler}
                >
                  MON
                </Button>
              </View>
              <View style={styles.space} />
              <View style={{ flex: 1 }}>
                <Button
                  size="sm"
                  variant={!isTueActive ? "outline" : "solid"}
                  onPress={tuesdayPressedHandler}
                >
                  TUE
                </Button>
              </View>
              <View style={styles.space} />
              <View style={{ flex: 1 }}>
                <Button
                  size="sm"
                  variant={!isWedActive ? "outline" : "solid"}
                  onPress={wednesdayPressedHandler}
                >
                  WED
                </Button>
              </View>
              <View style={styles.space} />
              <View style={{ flex: 1 }}>
                <Button
                  size="sm"
                  variant={!isThuActive ? "outline" : "solid"}
                  onPress={thursdayPressedHandler}
                >
                  THU
                </Button>
              </View>
              <View style={styles.space} />
              <View style={{ flex: 1 }}>
                <Button
                  size="sm"
                  variant={!isFriActive ? "outline" : "solid"}
                  onPress={fridayPressedHandler}
                >
                  FRI
                </Button>
              </View>
              <View style={styles.space} />
              <View style={{ flex: 1 }}>
                <Button
                  size="sm"
                  variant={!isSatActive ? "outline" : "solid"}
                  onPress={saturdayPressedHandler}
                >
                  SAT
                </Button>
              </View>
            </View>
            {mondayTimeTable && (
              <View style={[styles.tableTopStyle]}>
                <>
                  <View style={[{ flexDirection: "row" }]}>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text style={styles.headingFont}>Time</Text>
                    </View>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text style={styles.headingFont}>Subject</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      { flex: 1 },
                      { flexDirection: "column", backgroundColor: "white" },
                    ]}
                  >
                    <View style={{ flex: 8, bottom: 1 }}>
                      <ScrollView>
                        {timeTable.length > 0 ? (
                          <View style={[styles.flexrow]}>
                            <View style={[styles.root]}>
                              {timeTable &&
                                timeTable.map((data) => (
                                  <>
                                    <View
                                      style={[
                                        styles.container,
                                        { flexDirection: "row" },
                                      ]}
                                    >
                                      <View style={[styles.colStyle]}>
                                        <Text
                                          style={[
                                            styles.tableTitle,
                                            { left: "35%" },
                                          ]}
                                        >
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
                                  </>
                                ))}
                            </View>
                            <View style={[styles.root, {}]}>
                              {timeTable &&
                                timeTable.map((data) => (
                                  <>
                                    <View
                                      style={[
                                        styles.container,
                                        { flexDirection: "row" },
                                      ]}
                                    >
                                      <View
                                        style={[
                                          styles.colStyle,
                                          { left: "80%" },
                                        ]}
                                      >
                                        <Text style={[styles.tableTitle]}>
                                          {data.monday}
                                        </Text>
                                      </View>
                                    </View>
                                  </>
                                ))}
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{ alignItems: "center", marginVertical: 10 }}
                          >
                            <NativeText fontSize="xl" bold color="error.900">
                              No data found.
                            </NativeText>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  </View>
                </>
              </View>
            )}
            {tuesdayTimeTable && (
              <View style={[styles.tableTopStyle]}>
                <>
                  <View style={[{ flexDirection: "row" }]}>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text style={styles.headingFont}>Time</Text>
                    </View>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text style={styles.headingFont}>Subject</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      { flex: 1 },
                      { flexDirection: "column", backgroundColor: "white" },
                    ]}
                  >
                    <View style={{ flex: 8, bottom: 1 }}>
                      <ScrollView>
                        {timeTable.length > 0 ? (
                          <View style={[styles.flexrow]}>
                            <View style={[styles.root]}>
                              {timeTable &&
                                timeTable.map((data) => (
                                  <>
                                    <View
                                      style={[
                                        styles.container,
                                        { flexDirection: "row" },
                                      ]}
                                    >
                                      <View style={[styles.colStyle]}>
                                        <Text
                                          style={[
                                            styles.tableTitle,
                                            { left: "35%" },
                                          ]}
                                        >
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
                                  </>
                                ))}
                            </View>
                            <View style={[styles.root, {}]}>
                              {timeTable &&
                                timeTable.map((data) => (
                                  <>
                                    <View
                                      style={[
                                        styles.container,
                                        { flexDirection: "row" },
                                      ]}
                                    >
                                      <View
                                        style={[
                                          styles.colStyle,
                                          { left: "80%" },
                                        ]}
                                      >
                                        <Text style={[styles.tableTitle]}>
                                          {data.Tuesday}
                                        </Text>
                                      </View>
                                    </View>
                                  </>
                                ))}
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{ alignItems: "center", marginVertical: 10 }}
                          >
                            <NativeText fontSize="xl" bold color="error.900">
                              No data found.
                            </NativeText>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  </View>
                </>
              </View>
            )}
            {wednesdayTimeTable && (
              <View style={[styles.tableTopStyle]}>
                <>
                  <View style={[{ flexDirection: "row" }]}>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text style={styles.headingFont}>Time</Text>
                    </View>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text style={styles.headingFont}>Subject</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      { flex: 1 },
                      { flexDirection: "column", backgroundColor: "white" },
                    ]}
                  >
                    <View style={{ flex: 8, bottom: 1 }}>
                      <ScrollView>
                        {timeTable.length > 0 ? (
                          <View style={[styles.flexrow]}>
                            <View style={[styles.root]}>
                              {timeTable &&
                                timeTable.map((data) => (
                                  <>
                                    <View
                                      style={[
                                        styles.container,
                                        { flexDirection: "row" },
                                      ]}
                                    >
                                      <View style={[styles.colStyle]}>
                                        <Text
                                          style={[
                                            styles.tableTitle,
                                            { left: "35%" },
                                          ]}
                                        >
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
                                  </>
                                ))}
                            </View>
                            <View style={[styles.root, {}]}>
                              {timeTable &&
                                timeTable.map((data) => (
                                  <>
                                    <View
                                      style={[
                                        styles.container,
                                        { flexDirection: "row" },
                                      ]}
                                    >
                                      <View
                                        style={[
                                          styles.colStyle,
                                          { left: "80%" },
                                        ]}
                                      >
                                        <Text style={[styles.tableTitle]}>
                                          {data.wednesday}
                                        </Text>
                                      </View>
                                    </View>
                                  </>
                                ))}
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{ alignItems: "center", marginVertical: 10 }}
                          >
                            <NativeText fontSize="xl" bold color="error.900">
                              No data found.
                            </NativeText>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  </View>
                </>
              </View>
            )}
            {thursdayTimeTable && (
              <View style={[styles.tableTopStyle]}>
                <>
                  <View style={[{ flexDirection: "row" }]}>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text style={styles.headingFont}>Time</Text>
                    </View>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text style={styles.headingFont}>Subject</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      { flex: 1 },
                      { flexDirection: "column", backgroundColor: "white" },
                    ]}
                  >
                    <View style={{ flex: 8, bottom: 1 }}>
                      <ScrollView>
                        {timeTable.length > 0 ? (
                          <View style={[styles.flexrow]}>
                            <View style={[styles.root]}>
                              {timeTable &&
                                timeTable.map((data) => (
                                  <>
                                    <View
                                      style={[
                                        styles.container,
                                        { flexDirection: "row" },
                                      ]}
                                    >
                                      <View style={[styles.colStyle]}>
                                        <Text
                                          style={[
                                            styles.tableTitle,
                                            { left: "35%" },
                                          ]}
                                        >
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
                                  </>
                                ))}
                            </View>
                            <View style={[styles.root, {}]}>
                              {timeTable &&
                                timeTable.map((data) => (
                                  <>
                                    <View
                                      style={[
                                        styles.container,
                                        { flexDirection: "row" },
                                      ]}
                                    >
                                      <View
                                        style={[
                                          styles.colStyle,
                                          { left: "80%" },
                                        ]}
                                      >
                                        <Text style={[styles.tableTitle]}>
                                          {data.thursday}
                                        </Text>
                                      </View>
                                    </View>
                                  </>
                                ))}
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{ alignItems: "center", marginVertical: 10 }}
                          >
                            <NativeText fontSize="xl" bold color="error.900">
                              No data found.
                            </NativeText>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  </View>
                </>
              </View>
            )}
            {fridayTimeTable && (
              <View style={[styles.tableTopStyle]}>
                <>
                  <View style={[{ flexDirection: "row" }]}>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text style={styles.headingFont}>Time</Text>
                    </View>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text style={styles.headingFont}>Subject</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      { flex: 1 },
                      { flexDirection: "column", backgroundColor: "white" },
                    ]}
                  >
                    <View style={{ flex: 8, bottom: 1 }}>
                      <ScrollView>
                        {timeTable.length > 0 ? (
                          <View style={[styles.flexrow]}>
                            <View style={[styles.root]}>
                              {timeTable &&
                                timeTable.map((data) => (
                                  <>
                                    <View
                                      style={[
                                        styles.container,
                                        { flexDirection: "row" },
                                      ]}
                                    >
                                      <View style={[styles.colStyle]}>
                                        <Text
                                          style={[
                                            styles.tableTitle,
                                            { left: "35%" },
                                          ]}
                                        >
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
                                  </>
                                ))}
                            </View>
                            <View style={[styles.root, {}]}>
                              {timeTable &&
                                timeTable.map((data) => (
                                  <>
                                    <View
                                      style={[
                                        styles.container,
                                        { flexDirection: "row" },
                                      ]}
                                    >
                                      <View
                                        style={[
                                          styles.colStyle,
                                          { left: "80%" },
                                        ]}
                                      >
                                        <Text style={[styles.tableTitle]}>
                                          {data.friday}
                                        </Text>
                                      </View>
                                    </View>
                                  </>
                                ))}
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{ alignItems: "center", marginVertical: 10 }}
                          >
                            <NativeText fontSize="xl" bold color="error.900">
                              No data found.
                            </NativeText>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  </View>
                </>
              </View>
            )}
            {saturdayTimeTable && (
              <View style={[styles.tableTopStyle]}>
                <>
                  <View style={[{ flexDirection: "row" }]}>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text style={styles.headingFont}>Time</Text>
                    </View>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text style={styles.headingFont}>Subject</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      { flex: 1 },
                      { flexDirection: "column", backgroundColor: "white" },
                    ]}
                  >
                    <View style={{ flex: 8, bottom: 1 }}>
                      <ScrollView>
                        {timeTable.length > 0 ? (
                          <View style={[styles.flexrow]}>
                            <View style={[styles.root]}>
                              {timeTable &&
                                timeTable.map((data) => (
                                  <>
                                    <View
                                      style={[
                                        styles.container,
                                        { flexDirection: "row" },
                                      ]}
                                    >
                                      <View style={[styles.colStyle]}>
                                        <Text
                                          style={[
                                            styles.tableTitle,
                                            { left: "35%" },
                                          ]}
                                        >
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
                                  </>
                                ))}
                            </View>
                            <View style={[styles.root, {}]}>
                              {timeTable &&
                                timeTable.map((data) => (
                                  <>
                                    <View
                                      style={[
                                        styles.container,
                                        { flexDirection: "row" },
                                      ]}
                                    >
                                      <View
                                        style={[
                                          styles.colStyle,
                                          { left: "80%" },
                                        ]}
                                      >
                                        <Text style={[styles.tableTitle]}>
                                          {data.saturday}
                                        </Text>
                                      </View>
                                    </View>
                                  </>
                                ))}
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{ alignItems: "center", marginVertical: 10 }}
                          >
                            <NativeText fontSize="xl" bold color="error.900">
                              No data found.
                            </NativeText>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  </View>
                </>
              </View>
            )}
          </View>
          <View style={{ flex: 0.1 }}>
            <ParentsHome />
          </View>
        </>
      )}

      {showForm && (
        <>
          <View
            style={[
              { flex: 1 },
              { flexDirection: "column", backgroundColor: "white" },
            ]}
          >
            <View style={{ flex: 8, bottom: 10 }}>
              <ScrollView style={{ backgroundColor: "white" }}>
                {examData.length > 0 ? (
                  examData.map((data) => (
                    <Pressable onPress={navigateHandler.bind(this, data.id)}>
                      <View style={[styles.mainView]}>
                        <View style={{ flex: 1 }}>
                          <Divider
                            bg="#04007A"
                            thickness="2"
                            orientation="vertical"
                            style={{ left: "40%", borderRadius: 10 }}
                          />
                        </View>
                        <View style={styles.cardStyle}>
                          <View
                            style={[{ flex: 1 }, { flexDirection: "column" }]}
                          >
                            <View
                              style={[
                                { flex: 2 },
                                { flexDirection: "row", padding: 5, top: "2%" },
                              ]}
                            >
                              <View
                                style={{
                                  flex: 1,
                                  alignItems: "flex-start",
                                  left: "100%",
                                }}
                              >
                                <Text style={[styles.labelStyle]}>
                                  Exam Name
                                </Text>
                              </View>
                              <View style={{ flex: 1 }}>
                                <Text style={[styles.cardText]}>
                                  {data.exam_name}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                top: "1%",
                                padding: 10,
                              }}
                            >
                              <View
                                style={[
                                  { flex: 2 },
                                  { flexDirection: "column" },
                                ]}
                              >
                                <View
                                  style={{
                                    flex: 1,
                                    alignItems: "flex-start",
                                    left: "10%",
                                  }}
                                >
                                  <Text style={[styles.labelStyle]}>
                                    Start Date
                                  </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                  <Text
                                    style={[styles.cardText, { left: "10%" }]}
                                  >
                                    {moment(data.startdate).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={[
                                  { flex: 1 },
                                  { flexDirection: "column" },
                                ]}
                              >
                                <View
                                  style={{
                                    flex: 1,
                                    alignItems: "flex-start",
                                    right: "35%",
                                  }}
                                >
                                  <Text style={[styles.labelStyle]}>
                                    End Date
                                  </Text>
                                </View>
                                <View style={{ flex: 1, right: "45%" }}>
                                  <Text style={[styles.cardText]}>
                                    {moment(data.end_date).format("DD/MM/YYYY")}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View style={{ flexDirection: "row", padding: 10 }}>
                              <View
                                style={[
                                  { flex: 2 },
                                  { flexDirection: "row", left: "6%" },
                                ]}
                              >
                                <View style={{ flex: 1.7 }}>
                                  <Text style={[styles.labelStyle]}>
                                    Total marks :
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    bottom: "1%",
                                    right: "30%",
                                  }}
                                >
                                  <Text style={[styles.cardText]}>
                                    {data.Total_marks}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={[
                                  { flex: 2 },
                                  { flexDirection: "row", left: "5%" },
                                ]}
                              >
                                <View style={{ flex: 1 }}>
                                  <Text style={[styles.labelStyle]}>
                                    Hour :
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flex: 2,
                                    bottom: "1%",
                                    right: "50%",
                                  }}
                                >
                                  <Text style={[styles.cardText]}>
                                    {data.hour}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  ))
                ) : (
                  <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <NativeText fontSize="xl" bold color="error.900">
                      No data found.
                    </NativeText>
                  </View>
                )}
              </ScrollView>
            </View>

            <View style={{ flex: 1 }}>
              <ParentsHome />
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default TimeTable;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "white",
  },
  studentItem: {
    width: "90%",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    alignItems: "center",
    // paddingTop: 0,
    paddingBottom: 9,
    flexDirection: "row",
    //backgroundColor: "skyblue",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  textBase: {
    color: "black",
    //textAlign: "center",
  },
  description: {
    fontSize: deviceWidth < 370 ? 16 : 20,

    marginBottom: 4,
    fontFamily: "HindRegular",
  },
  imageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    //minWidth: 80,
  },
  image: {
    height: 80,
    width: 80,
  },
  container: {
    padding: 10,
    borderWidth: 1,
  },
  type: {
    marginLeft: 10,
  },
  th: {
    padding: 3,
    marginRight: 13,
    fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 45,
    fontWeight: "bold",
  },
  tableTitle: {
    fontFamily: "HindSemiBold",
    fontSize: deviceWidth < 370 ? 16 : 16,
  },
  tableCell: {
    width: 20,

    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    // borderBottomWidth: 2,
  },
  inputForm: {
    padding: 20,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  labels: {
    marginTop: 2,
  },
  btnSubmit: {
    marginTop: 5,
  },
  //new one
  root: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 1,
  },
  flex: {
    flex: 1,
  },
  studInfo: {
    flex: 1,
    flexDirection: "row",
  },
  studInfoTopLeftStyle1: {
    marginLeft: "5%",
    top: "5%",
  },
  studInfoTopLeftStyle2: {
    marginLeft: "5%",
    top: "1%",
  },
  flexrow: {
    flex: 1,
    flexDirection: "row",
  },
  colStyle: {
    padding: deviceHieght < 600 ? "5%" : "3%",
  },
  description: {
    fontSize: deviceWidth < 370 ? 18 : 20,
    fontFamily: "HindRegular",
    marginBottom: 4,
    fontWeight: "bold",
    // fontWeight: "bold",
  },
  bottomLine: {
    borderBottomColor: "#130BF0",
    borderBottomWidth: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // borderRadius:5,
    // backgroundColor: "#CEE7FF",
    alignSelf: "center",
    paddingHorizontal: "12%",
  },
  textInfo: {
    fontSize: deviceWidth < 370 ? 18 : 20,
    fontFamily: "HindRegular",
    color: "black",
    fontWeight: "normal",

    // left: 10,
  },
  tableTopStyle: {
    flex: 4,
    padding: 10,
    bottom: 30,
  },
  tableHead: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "#3F96B8",
  },
  headingFont: {
    // fontFamily: "Hind-SemiBold",
    fontWeight: "bold",
    color: "white",
    fontSize: deviceWidth < 370 ? 14 : 14,
  },
  mainView: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  labelStyle: {
    color: "black",
    fontFamily: "HindBold",
    fontSize: 16,
    textAlign: "center",
  },
  cardText: {
    color: "black",
    fontSize: 16,
    left: "10%",
    top: "10%",
  },
  cardStyle: {
    flex: 20,
    backgroundColor: "#D6EAFF",
    elevation: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },
  space: {
    width: 10, // or whatever size you need
    height: 20,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  NotButtonGroup: {
    flex: 5,
    flexDirection: "row",
    padding: 10,
  },
});

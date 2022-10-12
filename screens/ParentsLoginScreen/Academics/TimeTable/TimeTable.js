import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
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

const TimeTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);

  // const [data, setData] = useState();

  const [examData, setExamData] = useState();

  const [timeTable, setTimeTable] = useState();
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
          `http://10.0.2.2:8000/school/AddmoreTimetable_list/${className}`
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
        `http://10.0.2.2:8000/school/AddmoreTimetable_list/${className}`
      );
      console.log(res.data);

      setTimeTable(res.data);
    } catch (error) {
      console.log(error);
    }
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
          <View style={styles.studentItem}>
            <View style={styles.studentItem}>
              <Text style={[styles.textBase, styles.description]}>
                Class: {className}
              </Text>
              <Text style={[styles.textBase, styles.description]}>
                Section: {Section}
              </Text>
            </View>
          </View>
          <ScrollView horizontal={true}>
            <DataTable style={styles.container}>
              <DataTable.Header style={styles.tableHeader}>
                <View style={styles.th}>
                  <Text style={styles.tableTitle}> TIMINGS</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}> MON</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}> TUE</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}> WED</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}>THUR</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}> FRI</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}> SAT</Text>
                </View>
              </DataTable.Header>
              {timeTable &&
                timeTable.map((data, key) => (
                  <DataTable.Row style={styles.tableRow} key={key}>
                    <DataTable.Cell
                      textStyle={{
                        fontSize: deviceWidth < 370 ? 16 : 18,
                        fontFamily: "HindRegular",
                        marginLeft: 10,
                      }}
                    >
                      {moment(data.from_time, "HH:mm").format("hh:mm ")} {"-"}{" "}
                      {""}
                      {moment(data.to_time, "HH:mm").format("hh:mm ")}
                    </DataTable.Cell>
                    <DataTable.Cell
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "HindRegular",
                        marginLeft: 5,
                      }}
                    >
                      {data.monday}
                    </DataTable.Cell>
                    <DataTable.Cell
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "HindRegular",
                        marginLeft: 10,
                      }}
                    >
                      {data.Tuesday}
                    </DataTable.Cell>
                    <DataTable.Cell
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "HindRegular",
                        marginLeft: 10,
                      }}
                    >
                      {data.wednesday}
                    </DataTable.Cell>
                    <DataTable.Cell
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "HindRegular",
                        marginLeft: 10,
                      }}
                    >
                      {data.thursday}
                    </DataTable.Cell>
                    <DataTable.Cell
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "HindRegular",
                        marginLeft: 10,
                      }}
                    >
                      {data.friday}
                    </DataTable.Cell>
                    <DataTable.Cell
                      textStyle={{
                        fontSize: 18,
                        fontFamily: "HindRegular",
                        marginLeft: 25,
                      }}
                    >
                      {data.saturday}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
            </DataTable>
          </ScrollView>
        </>
      )}
      {showForm && (
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
                <Text style={styles.tableTitle}> TOTAL MARKS</Text>
              </View>

              <View style={styles.th}>
                <Text style={styles.tableTitle}> HOUR</Text>
              </View>

              <View style={styles.th}>
                <Text style={styles.tableTitle}> CLASS NAME</Text>
              </View>
            </DataTable.Header>
            {examData &&
              examData.map((data, key) => (
                <DataTable.Row style={styles.tableRow} key={key}>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: deviceWidth < 370 ? 16 : 18,
                      fontFamily: "HindRegular",
                      marginLeft: 10,
                    }}
                  >
                    {data.exam_name}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: deviceWidth < 370 ? 16 : 18,
                      fontFamily: "HindRegular",
                      marginLeft: 10,
                    }}
                  >
                    {moment(data.startdate).format("DD/MM/YYYY")}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: deviceWidth < 370 ? 16 : 18,
                      fontFamily: "HindRegular",
                      marginLeft: 5,
                    }}
                  >
                    {moment(data.end_date).format("DD/MM/YYYY")}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: deviceWidth < 370 ? 16 : 18,
                      fontFamily: "HindRegular",
                      marginLeft: 10,
                    }}
                  >
                    {data.Total_marks}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: deviceWidth < 370 ? 16 : 18,
                      fontFamily: "HindRegular",
                      marginLeft: 60,
                    }}
                  >
                    {data.hour}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: deviceWidth < 370 ? 16 : 18,
                      fontFamily: "HindRegular",
                      marginLeft: 30,
                    }}
                  >
                    {data.class_name}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      )}

      <ParentsHome />
    </>
  );
};

export default TimeTable;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
    width: "50%",
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
    // backgroundColor: "skyblue",
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
    margin: 7,
    fontFamily: "HindSemiBold",
    fontSize: deviceWidth < 370 ? 16 : 20,
  },
  tableCell: {
    width: 20,

    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
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
});

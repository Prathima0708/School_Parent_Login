import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { DataTable } from "react-native-paper";

import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import VerticalLine from "../../../components/UI/VerticalLine";
import { Text } from "react-native";
import ParentsHome from "../ParentsHome";
import { Image } from "react-native";
import { FlatList } from "react-native";
import {
  className,
  Section,
} from "../../../components/StudentItem/StudentItem";

const TimeTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);

  // const [data, setData] = useState();

  const [examData, setExamData] = useState();

  const [timeTable, setTimeTable] = useState();
  const [forTimeTableList, setForTimeTableList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forExamTimeTable, setForExamTimeTable] = useState({ color: "black" });

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
    setForExamTimeTable({ fontWeight: "bold", color: "black" });
    setForTimeTableList({ color: "black" });
    setShowTable(false);
    setShowForm(true);
    try {
      const res = await axios.get(
        `http://10.0.2.2:8000/school/Exam/${className}/`
      );
      console.log(res.data);

      setExamData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function timeTableList() {
    setForTimeTableList({ fontWeight: "bold", color: "black" });
    setForExamTimeTable({ color: "black" });
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
          TimeTable List
        </BgButton>
        <VerticalLine>|</VerticalLine>
        <BgButton onPress={viewExam} style={forExamTimeTable}>
          View Exam TimeTable
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
                  <Text style={styles.tableTitle}> FRIDAY</Text>
                </View>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}> SATURDAY</Text>
                </View>
              </DataTable.Header>
              {timeTable &&
                timeTable.map((data, key) => (
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
      )}

      <ParentsHome />
    </>
  );
};

export default TimeTable;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
    width: 220,
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
    backgroundColor: "skyblue",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  textBase: {
    color: "black",
    //textAlign: "center",
  },
  description: {
    fontSize: 16,

    marginBottom: 4,
    fontWeight: "bold",
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
    fontFamily: "MonsterratBold",
    fontSize: 16,
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

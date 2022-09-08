import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { DataTable } from "react-native-paper";

import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import VerticalLine from "../../../components/UI/VerticalLine";
import { Text } from "react-native";
import ParentsHome from "../ParentsHome";

const TimeTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [data, setData] = useState();
  const [forTimeTableList, setForTimeTableList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forExamTimeTable, setForExamTimeTable] = useState({ color: "black" });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "http://10.0.2.2:8000/school/AddmoreTimetable_list/"
        );
        console.log(res.data);

        setData(res.data);
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
      const res = await axios.get("http://10.0.2.2:8000/school/Exam/");
      console.log(res.data);

      setData(res.data);
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
        "http://10.0.2.2:8000/school/AddmoreTimetable_list/"
      );
      console.log(res.data);

      setData(res.data);
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
            {data &&
              data.map((data, key) => (
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
            {data &&
              data.map((data, key) => (
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
  container: {
    padding: 10,
  },
  type: {
    marginLeft: 10,
  },
  th: {
    padding: 5,
    marginRight: 13,
    fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 50,
    fontWeight: "bold",
  },
  tableTitle: {
    padding: 5,
    margin: 7,
    fontWeight: "bold",
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

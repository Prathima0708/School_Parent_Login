import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { DataTable } from "react-native-paper";

import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import ParentsHome from "../ParentsHome";

const ReportCard = () => {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://10.0.2.2:8000/school/Marksheet/");
        console.log(res.data);

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Marksheet</BgButton>
      </View> */}

      <ScrollView horizontal={true}>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> STUDENT NAME</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> CLASS NAME</Text>
            </View>

            <View style={styles.th}>
              <Text style={styles.tableTitle}> MATHS MARKS</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> ENGLISH MARKS</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> SCIENCE MARKS</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> HINDI MARKS</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> SOCIAL MARKS</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> KANNADA MARKS</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> COMPUTER MARKS</Text>
            </View>
          </DataTable.Header>
          {data &&
            data.map((data, key) => (
              <DataTable.Row style={styles.tableRow}>
                <DataTable.Cell style={styles.tableCell}>
                  {data.student_name}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.class_name}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.maths_obt_mark}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.english_obt_mark}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.science_obt_mark}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.hindi_obt_mark}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.social_obt_mark}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.kannada_obt_mark}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.computer_obt_mark}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
      </ScrollView>
      <ParentsHome />
    </>
  );
};

export default ReportCard;

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

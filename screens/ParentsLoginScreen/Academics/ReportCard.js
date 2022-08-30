import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { DataTable } from "react-native-paper";

import axios from "axios";
import BgButton from "../../../components/UI/BgButton";

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
      <View style={styles.BtnContainer}>
        <BgButton>Marksheet</BgButton>
      </View>

      <ScrollView horizontal={true}>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={styles.tableTitle}>ID</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>
              STUDENT NAME
            </DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>
              CLASSNAME
            </DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>ROLL NO</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>MATHS</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>ENGLISH</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>SCIENCE</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>HINDI</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>SOCIAL</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>KANNADA</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>
              COMPUTER
            </DataTable.Title>
          </DataTable.Header>
          {data &&
            data.map((data, key) => (
              <DataTable.Row style={styles.tableRow}>
                <DataTable.Cell style={styles.tableCell}>
                  {data.id}
                </DataTable.Cell>
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
    </>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
  },
  container: {
    padding: 10,
  },
  tableHeader: {
    backgroundColor: "skyblue",
    height: 60,
  },
  tableTitle: {
    padding: 5,
    margin: 5,
    fontWeight: "bold",
  },
  tableCell: {
    padding: 5,
    margin: 9,
  },
  tableRow: {
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

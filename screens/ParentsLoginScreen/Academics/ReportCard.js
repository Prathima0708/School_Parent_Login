import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { DataTable } from "react-native-paper";

import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import ParentsHome from "../ParentsHome";
import { Image } from "react-native";
import {
  className,
  studentId,
  StudentName,
  StudentRegNo,
} from "../../../components/StudentItem/StudentItem";

const ReportCard = () => {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Marksheet/${StudentRegNo}`
        );
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
      <View style={{ height: "100%", marginTop: 20 }}>
        <View style={styles.studentItem}>
          <Text style={[styles.textBase, styles.description]}>
            Student Name: {StudentName}
          </Text>
          <Text style={[styles.textBase, styles.description]}>
            Student Class: {className}
          </Text>
        </View>

        <ScrollView horizontal={true}>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> MATHS </Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> ENGLISH </Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> SCIENCE </Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> HINDI </Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> SOCIAL </Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> KANNADA </Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> COMPUTER </Text>
              </View>
            </DataTable.Header>
            {data &&
              data.map((data, key) => (
                <DataTable.Row style={styles.tableRow}>
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
      </View>
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
  studentItem: {
    width: "80%",
    marginHorizontal: 35,
    padding: 19,
    marginVertical: 8,

    backgroundColor: "#23215b",

    borderRadius: 16,
  },
  textBase: {
    color: "#0D98BA",
    fontFamily: "HindRegular",
    // marginRight: 33,
  },
  description: {
    fontSize: 20,
    fontFamily: "HindRegular",
    marginBottom: 4,
    // fontWeight: "bold",
  },
});

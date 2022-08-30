import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { DataTable } from "react-native-paper";

import axios from "axios";
import BgButton from "../../../components/UI/BgButton";

const ReportCard = () => {
  const [forTransportList, setForTransportList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forAddTransport, setForAddTransport] = useState({ color: "black" });
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [data, setData] = useState();
  const [formData, setFormData] = useState();

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

  function transportList() {
    setForTransportList({ fontWeight: "bold", color: "black" });
    setForAddTransport({ color: "black" });
    setShowForm(false);
    setShowTable(true);
  }

  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton onPress={transportList} style={forTransportList}>
          Marksheet
        </BgButton>
      </View>
      {showTable && (
        <ScrollView horizontal={true}>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>ID</DataTable.Title>
              <DataTable.Title>STUDENT NAME</DataTable.Title>
              <DataTable.Title>CLASSNAME</DataTable.Title>
              <DataTable.Title>ROLL NO</DataTable.Title>
              <DataTable.Title>MATHS</DataTable.Title>
              <DataTable.Title>ENGLISH</DataTable.Title>
              <DataTable.Title>SCIENCE</DataTable.Title>
              <DataTable.Title>HINDI</DataTable.Title>
              <DataTable.Title>SOCIAL</DataTable.Title>
              <DataTable.Title>KANNADA</DataTable.Title>
              <DataTable.Title>COMPUTER</DataTable.Title>
            </DataTable.Header>
            {data &&
              data.map((data, key) => (
                <DataTable.Row>
                  <DataTable.Cell>{data.id}</DataTable.Cell>
                  <DataTable.Cell>{data.student_name}</DataTable.Cell>
                  <DataTable.Cell>{data.class_name}</DataTable.Cell>
                  <DataTable.Cell>{data.maths_obt_mark}</DataTable.Cell>
                  <DataTable.Cell>{data.english_obt_mark}</DataTable.Cell>
                  <DataTable.Cell>{data.science_obt_mark}</DataTable.Cell>
                  <DataTable.Cell>{data.hindi_obt_mark}</DataTable.Cell>
                  <DataTable.Cell>{data.social_obt_mark}</DataTable.Cell>
                  <DataTable.Cell>{data.kannada_obt_mark}</DataTable.Cell>
                  <DataTable.Cell>{data.computer_obt_mark}</DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      )}
    </>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
  },
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
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

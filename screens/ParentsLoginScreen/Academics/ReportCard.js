import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Card, DataTable, Paragraph, Title } from "react-native-paper";

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
          `http://10.0.2.2:8000/school/MarksheetReg/${StudentRegNo}`
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
            Name : {StudentName}
          </Text>
          <Text style={[styles.textBase, styles.description]}>
            Class: {className}
          </Text>
          <Text style={[styles.textBase, styles.description]}>
            RegNo: {StudentRegNo}
          </Text>
        </View>

        {/* <ScrollView horizontal={true}>
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
                <DataTable.Row style={styles.tableRow} key={key}>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 30,
                    }}
                  >
                    {data.maths_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 10,
                    }}
                  >
                    {data.english_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 10,
                    }}
                  >
                    {data.science_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 10,
                    }}
                  >
                    {data.hindi_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 10,
                    }}
                  >
                    {data.social_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 10,
                    }}
                  >
                    {data.kannada_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 10,
                    }}
                  >
                    {data.computer_obt_mark}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView> */}

        <ScrollView>
          <ScrollView horizontal={true}>
            {data &&
              data.map((data, key) => (
                <>
                  <View style={styles.space} key={key} />

                  <Card style={styles.cardStyle}>
                    <Card.Title title="Subjects" />

                    <Card.Content>
                      <View style={styles.cardView}>
                        <View style={{ flex: 1, left: 10 }}>
                          <Text style={styles.textStyle}>Maths</Text>
                          <Text style={styles.textStyle}>English</Text>
                          <Text style={styles.textStyle}>Science</Text>
                          <Text style={styles.textStyle}>Hindi</Text>
                          <Text style={styles.textStyle}>Social</Text>
                          <Text style={styles.textStyle}>Kannada</Text>
                          <Text style={styles.textStyle}>Computer</Text>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            left: -10,
                            top: -50,
                          }}
                        >
                          <Card.Title
                            title="Max Marks"
                            style={{ fontSize: 10 }}
                          />

                          <Text style={[styles.textStyle, { marginLeft: 30 }]}>
                            {data.maths_tot_mark}
                          </Text>

                          <Text style={[styles.textStyle, { marginLeft: 30 }]}>
                            {data.english_tot_mark}
                          </Text>
                          <Text style={[styles.textStyle, { marginLeft: 30 }]}>
                            {data.science_tot_mark}
                          </Text>
                          <Text style={[styles.textStyle, { marginLeft: 30 }]}>
                            {data.hindi_tot_mark}
                          </Text>

                          <Text style={[styles.textStyle, { marginLeft: 30 }]}>
                            {data.social_tot_mark}
                          </Text>
                          <Text style={[styles.textStyle, { marginLeft: 30 }]}>
                            {data.kannada_tot_mark}
                          </Text>
                          <Text style={[styles.textStyle, { marginLeft: 30 }]}>
                            {data.computer_tot_mark}
                          </Text>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            left: -10,
                            top: -50,
                          }}
                        >
                          <Card.Title title=" Marks" />

                          <Text style={[styles.textStyle, { marginLeft: 20 }]}>
                            {data.maths_obt_mark}
                          </Text>

                          <Text style={[styles.textStyle, { marginLeft: 20 }]}>
                            {data.english_obt_mark}
                          </Text>
                          <Text style={[styles.textStyle, { marginLeft: 20 }]}>
                            {data.science_obt_mark}
                          </Text>
                          <Text style={[styles.textStyle, { marginLeft: 20 }]}>
                            {data.hindi_obt_mark}
                          </Text>

                          <Text style={[styles.textStyle, { marginLeft: 20 }]}>
                            {data.social_obt_mark}
                          </Text>
                          <Text style={[styles.textStyle, { marginLeft: 20 }]}>
                            {data.kannada_obt_mark}
                          </Text>
                          <Text style={[styles.textStyle, { marginLeft: 20 }]}>
                            {data.computer_obt_mark}
                          </Text>
                        </View>
                      </View>
                      <Card.Title title="Total :" style={{ marginTop: -40 }} />
                      <Text
                        style={[
                          styles.textStyle,
                          { marginLeft: 100, top: -44, fontSize: 24 },
                        ]}
                      >
                        {data.maths_obt_mark +
                          data.english_obt_mark +
                          data.science_obt_mark +
                          data.hindi_obt_mark +
                          data.social_obt_mark +
                          data.kannada_obt_mark +
                          data.computer_obt_mark}
                      </Text>
                      <Card.Title
                        title="Percentage :"
                        style={{ marginTop: -40 }}
                      />
                      <Text
                        style={[
                          styles.textStyle,
                          { marginLeft: 150, top: -44, fontSize: 24 },
                        ]}
                      >
                        {(
                          (data.maths_obt_mark +
                            data.english_obt_mark +
                            data.science_obt_mark +
                            data.hindi_obt_mark +
                            data.social_obt_mark +
                            data.kannada_obt_mark +
                            data.computer_obt_mark) /
                          7
                        ).toFixed(2)}{" "}
                        {"%"}
                      </Text>
                    </Card.Content>
                  </Card>
                </>
              ))}
          </ScrollView>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#23215b",

    borderRadius: 16,
  },
  textBase: {
    color: "#0D98BA",
    fontFamily: "HindRegular",

    marginRight: 33,
  },
  description: {
    fontSize: 20,

    fontFamily: "HindRegular",
    marginBottom: 4,
    marginRight: 33,
    alignItems: "center",
    justifyContent: "center",
    // fontWeight: "bold",
  },

  cardStyle: {
    width: "100%",
    height: "80%",
    top: 10,
    //marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    marginBottom: 75,
    backgroundColor: "skyblue",
  },
  cardView: {
    flexDirection: "row",
  },
  space: {
    width: 10,
    height: 10,
  },
  textStyle: {
    padding: 5,
    // marginTop: 20,
    fontFamily: "HindRegular",
    fontSize: 20,
  },
  heading: {
    fontFamily: "HindRegular",
    fontSize: 20,
    position: "absolute",
    top: -10,
    left: 15,
  },
  heading1: {
    padding: 5,
    fontFamily: "HindRegular",
    fontSize: 20,
    position: "absolute",
    top: -15,
    left: 95,
  },
});
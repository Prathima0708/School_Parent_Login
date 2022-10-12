import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Card, DataTable, Paragraph, Title } from "react-native-paper";
import { Divider } from "react-native-paper";
import axios from "axios";

import ParentsHome from "../../BottomTab/ParentsHome";
import { Image } from "react-native";
import {
  className,
  studentId,
  StudentName,
  StudentRegNo,
  Section,
} from "../../../../components/StudentItem/StudentItem";

const ReportCard = () => {
  const [data, setData] = useState([]);

  const [maxMarks, setMaxMarks] = useState([]);
  const [obtMarks, setObtMarks] = useState([]);
  let i;
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
      <View>
        <View style={{ width: "100%", height: "30%" }}>
          {/* <Text style={styles.mainHeading}>Report Card</Text> */}
          <View
            style={[
              { flex: 1 },
              { flexDirection: "column", left: "10%", top: "3%" },
            ]}
          >
            <View style={[{ flex: 1 }, { flexDirection: "row", top: 10 }]}>
              <View style={{ flex: 1, height: "100%" }}>
                <Text style={[styles.textBase, styles.description]}>
                  Name :<Text style={styles.textInfo}>{StudentName}</Text>
                </Text>
              </View>
              <View style={{ flex: 1, height: "100%" }}>
                <Text style={[styles.textBase, styles.description]}>
                  Class: <Text style={styles.textInfo}>{className}</Text>
                </Text>
              </View>
            </View>
            <View
              style={[
                { flex: 1 },
                { flexDirection: "row", position: "absolute", top: 65 },
              ]}
            >
              <View style={{ flex: 1, height: "100%" }}>
                <Text style={[styles.textBase, styles.description]}>
                  RegNo: <Text style={styles.textInfo}>{StudentRegNo}</Text>
                </Text>
              </View>
              <View style={{ flex: 1, height: "100%" }}>
                <Text style={[styles.textBase, styles.description]}>
                  Section: <Text style={styles.textInfo}>{Section}</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", height: "50%" }}>
          <ScrollView>
            {data &&
              data.map((data, key) => (
                <>
                  <View style={[{ flexDirection: "row", left: 10 }]} key={key}>
                    <View>
                      <Text style={styles.textStyle}>Subject</Text>
                    </View>
                    <View style={styles.space} />
                    <View>
                      <Text style={styles.textStyle}>Max. Mark</Text>
                    </View>
                    <View style={styles.space} />
                    <View>
                      <Text style={styles.textStyle}>Obtained {"\n"} Mark</Text>
                    </View>
                    <View style={styles.space} />
                    <View>
                      <Text style={styles.textStyle}>Min Mark</Text>
                    </View>
                  </View>
                  <View style={[{ flexDirection: "row", left: 10 }]}>
                    <View>
                      <View style={{ padding: 5 }}>
                        <Text style={styles.subStyle}>Maths</Text>
                      </View>
                      <View style={{ padding: 5 }}>
                        <Text style={styles.subStyle}>English</Text>
                      </View>
                      <View style={{ padding: 5 }}>
                        <Text style={styles.subStyle}>Science</Text>
                      </View>
                      <View style={{ padding: 5 }}>
                        <Text style={styles.subStyle}>Hindi</Text>
                      </View>
                      <View style={{ padding: 5 }}>
                        <Text style={styles.subStyle}>Social</Text>
                      </View>
                      <View style={{ padding: 5 }}>
                        <Text style={styles.subStyle}>Kannada</Text>
                      </View>
                      <View style={{ padding: 5 }}>
                        <Text style={styles.subStyle}>Computer</Text>
                      </View>
                      <View style={{ padding: 5 }}>
                        <Text style={styles.subStyle}>Total</Text>
                      </View>
                      <View style={{ padding: 5 }}>
                        <Text style={styles.subStyle}>Percentage</Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.maths_max_marks}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.english_max_marks}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.science_max_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.hindi_max_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.social_max_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.kannada_max_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.computer_max_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.maths_max_marks +
                            data.english_max_marks +
                            data.science_max_mark +
                            data.hindi_max_mark +
                            data.social_max_mark +
                            data.kannada_max_mark +
                            data.computer_max_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {(
                            ((data.maths_obt_mark +
                              data.english_obt_mark +
                              data.science_obt_mark +
                              data.hindi_obt_mark +
                              data.social_obt_mark +
                              data.kannada_obt_mark +
                              data.computer_obt_mark) /
                              (data.maths_max_marks +
                                data.english_max_marks +
                                data.science_max_mark +
                                data.hindi_max_mark +
                                data.social_max_mark +
                                data.kannada_max_mark +
                                data.computer_max_mark)) *
                            100
                          ).toFixed(2)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.space} />
                    <View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.maths_obt_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.english_obt_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.science_obt_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.hindi_obt_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.social_obt_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.kannada_obt_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.computer_obt_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.maths_obt_mark +
                            data.english_obt_mark +
                            data.science_obt_mark +
                            data.hindi_obt_mark +
                            data.social_obt_mark +
                            data.kannada_obt_mark +
                            data.computer_obt_mark}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.space} />
                    <View style={styles.space} />
                    <View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.maths_min_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.english_min_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.science_min_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.hindi_min_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.social_min_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.kannada_min_mark}
                        </Text>
                      </View>
                      <View style={styles.markStyleView}>
                        <Text style={styles.markStyle}>
                          {data.computer_min_mark}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              ))}
          </ScrollView>
        </View>
        <View style={{ width: "100%", height: "20%" }}>
          <ParentsHome />
        </View>
      </View>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Marksheet</BgButton>
      </View> */}
      {/* <View style={{ height: "100%", marginTop: 20 }}>
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
         <View style={styles.BtnContainer}>
        <BgButton>Marksheet</BgButton>
      </View> */}

      {/* <View style={{ backgroundColor:'white' }}>
        <Text style={styles.mainHeading}>Report Card</Text>
        <View style={[{flex:1},{flexDirection:'column',left:'10%',top:'3%'}]}>
          <View style={[{flex:1}, {flexDirection: "row"}]}>
            <View style={{ flex: 1,height:'10%' }} >
              <Text style={[styles.textBase, styles.description]}>
                Name :<Text style={styles.textInfo}>{StudentName}</Text> 
              </Text>
            </View>
            <View style={{ flex: 1,height:'10%'}}>
              <Text style={[styles.textBase, styles.description]}>
                Class: <Text style={styles.textInfo}>{className}</Text>
              </Text>
            </View>
          </View>
          <View style={[{flex:1}, {flexDirection: "row",position:'absolute',top:65}]}>
            <View style={{ flex: 1,height:'100%' }} >
            <Text style={[styles.textBase, styles.description]}>
              RegNo: <Text style={styles.textInfo}>{StudentRegNo}</Text>
            </Text>
            </View>
            <View style={{ flex: 1,height:'100%'}}>
            <Text style={[styles.textBase, styles.description]}>
              Section: <Text style={styles.textInfo}>{Section}</Text>
            </Text>
            </View>
          </View>
        </View>
        </View>
      <ParentsHome />
        {data &&
            data.map((data, key) => ( */}

      <>
        {/* <View style={{flex:3}}>
              <ScrollView >
                <View style={[ { flexDirection: "row",left:10}]}>
                    <View>
                      <Text style={styles.textStyle}>Subject</Text>
                    </View>
                    <View style={styles.space} />
                    <View>
                      <Text style={styles.textStyle}>Max. Mark</Text>
                    </View>
                    <View style={styles.space} />
                    <View>
                      <Text style={styles.textStyle}>Obtained {"\n"}   Mark</Text>
                    </View>
                    <View style={styles.space} />
                    <View>
                      <Text style={styles.textStyle}>Min Mark</Text>
                    </View>
                </View>
                <View style={[ { flexDirection: "row",left:10 }]}>
                  <View>
                    <View style={{padding:5}}><Text style={styles.subStyle}>Maths</Text></View>
                    <View style={{padding:5}}><Text style={styles.subStyle}>English</Text></View>
                    <View style={{padding:5}}><Text style={styles.subStyle}>Science</Text></View>
                    <View style={{padding:5}}><Text style={styles.subStyle}>Hindi</Text></View>
                    <View style={{padding:5}}><Text style={styles.subStyle}>Social</Text></View>
                    <View style={{padding:5}}><Text style={styles.subStyle}>Kannada</Text></View>
                    <View style={{padding:5}}><Text style={styles.subStyle}>Computer</Text></View>
                    <View style={{padding:5}}><Text style={styles.subStyle}>Total</Text></View>
                    <View style={{padding:5}}><Text style={styles.subStyle}>Percentage</Text></View>

                  </View>
                  
                  <View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.maths_max_marks}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.english_max_marks}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.science_max_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.hindi_max_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.social_max_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.kannada_max_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.computer_max_mark}</Text></View>
                    <View style={styles.markStyleView}>
                      <Text style={styles.markStyle}>
                      {data.maths_max_marks +
                          data.english_max_marks +
                          data.science_max_mark +
                          data.hindi_max_mark +
                          data.social_max_mark +
                          data.kannada_max_mark +
                          data.computer_max_mark}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.space} />
                  <View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.maths_obt_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.english_obt_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.science_obt_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.hindi_obt_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.social_obt_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.kannada_obt_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.computer_obt_mark}</Text></View>
                    <View style={styles.markStyleView}>
                      <Text style={styles.markStyle}>
                      {data.maths_obt_mark +
                          data.english_obt_mark +
                          data.science_obt_mark +
                          data.hindi_obt_mark +
                          data.social_obt_mark +
                          data.kannada_obt_mark +
                          data.computer_obt_mark}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.space} />
                  <View style={styles.space} />
                  <View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.maths_min_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.english_min_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.science_min_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.hindi_min_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.social_min_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.kannada_min_mark}</Text></View>
                    <View style={styles.markStyleView}><Text style={styles.markStyle}>{data.computer_min_mark}</Text></View>
                  </View> 
                  <View>

                  </View>
                </View>
              </ScrollView>
              </View>
               */}
      </>
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

      {/* <ScrollView>
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
        </ScrollView> */}
    </>
  );
};

export default ReportCard;
const deviceWidth = Dimensions.get("window").width;
const deviceHieght = Dimensions.get("window").height;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
    width: 220,
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: "bold",
    left: "33%",
    top: "1%",
    textDecorationLine: "underline",
  },
  textInfo: {
    fontSize: deviceWidth < 370 ? 16 : 20,
    color: "black",
    textDecorationLine: "underline",
    fontWeight: "normal",
    left: 10,
  },
  space: {
    width: 20,
    height: 20,
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
    marginHorizontal: 35,
    padding: 19,
    marginVertical: 8,
    // alignItems: "center",
    // justifyContent: "center",
  },
  textBase: {
    color: "black",
    fontFamily: "HindRegular",
  },
  description: {
    fontSize: 20,
    fontFamily: "HindRegular",
    marginBottom: 4,
    fontWeight: "bold",
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
  space: {
    width: 20,
    height: 20,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "HindRegular",
  },
  subStyle: {
    fontSize: 16,
    fontFamily: "HindRegular",
    padding: 5,
  },
  markStyle: {
    fontSize: 16,
    backgroundColor: "grey",
    fontFamily: "HindRegular",
    padding: 5,
    paddingRight: 20,
    paddingLeft: 20,
    color: "white",
    fontWeight: "500",
  },
  markStyleView: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

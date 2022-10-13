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
              { flexDirection: "column", left: "10%", top: "10%" },
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
        <View style={{ width: "100%", height: "50%",padding:10,bottom:'5%' }}>
          <ScrollView>
            {/* <ScrollView horizontal={true}> */}
            {data &&
              data.map((data, key) => (
                <>
                  <View style={[{flex:1}, {flexDirection: "row",borderWidth:1}]}>
                    <View style={styles.tableHead} >
                      <Text style={styles.headingFont}>Subjects</Text>
                    </View>
                    <View style={styles.tableHead} >
                      <Text style={styles.headingFont}>Max Marks</Text>
                    </View>
                    <View style={styles.tableHead} >
                      <Text style={styles.headingFont}>Min Marks</Text>
                    </View>
                    <View style={styles.tableHead} >
                      <Text style={styles.headingFont}>Obtained Marks</Text>
                    </View>
                  </View>
                  <View style={[{flex:1}, {flexDirection: "row"}]}>
                    <View style={[{flex:1}, {flexDirection: "column"}]}>
                      <View style={[styles.colStyle]}>
                        <Text style={styles.headingFont}>Maths</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text style={styles.headingFont}>English</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text style={styles.headingFont}>Science</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text style={styles.headingFont}>Hindi</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text style={styles.headingFont}>Social</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text style={styles.headingFont}>Kannada</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text style={styles.headingFont}>Computer</Text>
                      </View>
                    </View>
                    <View style={[{flex:1}, {flexDirection: "column"}]}>
                      <View style={styles.colStyle}>
                        <Text>{data.maths_max_marks}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.english_max_marks}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.science_max_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.hindi_max_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.social_max_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.kannada_max_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.computer_max_mark}</Text>
                      </View>
                    </View>
                    <View style={[{flex:1}, {flexDirection: "column"}]}>
                      <View style={styles.colStyle}>
                        <Text>{data.maths_min_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.english_min_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.science_min_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.hindi_min_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.social_min_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.kannada_min_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.computer_min_mark}</Text>
                      </View>
                    </View>
                    <View style={[{flex:1}, {flexDirection: "column"}]}>
                      <View style={styles.colStyle}>
                        <Text>{data.maths_min_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.english_obt_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.science_obt_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.hindi_obt_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.social_obt_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.kannada_obt_mark}</Text>
                      </View>
                      <View style={styles.colStyle}>
                        <Text>{data.computer_obt_mark}</Text>
                      </View>
                    </View>
                  </View>
                </>
              ))}
            {/* </ScrollView> */}
          </ScrollView>
        </View>
        <View style={[ { width: "100%", height: "10%",flexDirection:'row',left:'5%' }]}>
          <View style={{ flex: 2 }} >
            <Text style={styles.headingFont}>Total : {data &&
              data.map((data, key) => (
                <Text>{data.maths_max_marks +
                  data.english_max_marks +
                  data.science_max_mark +
                  data.hindi_max_mark +
                  data.social_max_mark +
                  data.kannada_max_mark +
                  data.computer_max_mark}
              </Text>
              ))}
            </Text>
          </View>
          <View style={{ flex: 2 }} >
          <Text  style={styles.headingFont}>Percentage : {data &&
              data.map((data, key) => (
                <Text>{(
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
              ))}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", height: "10%" }}>
          <ParentsHome />
        </View>
      </View>
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
    borderBottomWidth:1,
    borderLeftWidth:1,
    borderTopWidth:1,

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
    borderRightWidth:1
  },

  //new one
  tableHead:{
    flex: 1,
    borderRightWidth:1,
    justifyContent:'center',
    alignItems:'center',
  },
  colStyle:{
    borderRightWidth:1,
    borderLeftWidth:1,
    borderBottomWidth:1,
    justifyContent:'center',
    alignItems:'center',
    padding:10
  },
  headingFont:{
    fontWeight:'bold'
  }
});

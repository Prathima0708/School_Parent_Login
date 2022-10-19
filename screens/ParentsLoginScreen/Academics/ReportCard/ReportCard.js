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
var obtMarks = [];
const ReportCard = () => {
  const [data, setData] = useState([]);
  const [isFail, setIsFail] = useState(false);
  const [maxMarks, setMaxMarks] = useState([]);
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

  useEffect(() => {
    for (i = 0; i < data.length; i++) {
      if (data[i].maths_obt_mark < 35) {
        setIsFail(true);
      }
      if (data[i].english_obt_mark < 35) {
        setIsFail(true);
      }
      if (data[i].science_obt_mark < 35) {
        setIsFail(true);
      }
      if (data[i].hindi_obt_mark < 35) {
        setIsFail(true);
      }
      if (data[i].social_obt_mark < 35) {
        setIsFail(true);
      }
      if (data[i].kannada_obt_mark < 35) {
        setIsFail(true);
      }
      if (data[i].computer_obt_mark < 35) {
        setIsFail(true);
      }
    }
  }, []);

  return (
    <>
      <View style={styles.root}>
        <View style={styles.flex}>
          <View style={[styles.studInfo, styles.studInfoTopLeftStyle1]}>
            <View style={styles.flexrow}>
              <View style={{ flex: 0.5 }}>
                <Text
                  style={[
                    styles.description,
                    styles.bottomLine,
                    { justifyContent: "center", alignItems: "center" },
                  ]}
                >
                  Name : <Text style={styles.textInfo}>{StudentName}</Text>
                </Text>
              </View>
              <View style={styles.space} />
              <View style={{ flex: 0.5, marginRight: "5%" }}>
                <Text style={[styles.description, styles.bottomLine]}>
                  Class: <Text style={styles.textInfo}>{className}</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.studInfo, styles.studInfoTopLeftStyle2]}>
            <View style={styles.root}>
              <View style={styles.flex}>
                <Text style={[styles.description, styles.bottomLine]}>
                  RegNo: <Text style={styles.textInfo}>{StudentRegNo}</Text>
                </Text>
              </View>
              <View style={styles.space} />
              <View style={{ flex: 1, marginRight: "5%" }}>
                <Text style={[styles.description, styles.bottomLine]}>
                  Section: <Text style={styles.textInfo}>{Section}</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.tableTopStyle}>
          {/* <ScrollView> */}
          {data &&
            data.map((data, key) => (
              <>
                <View style={styles.root} key={key}>
                  <View style={{ flex: 8, bottom: 25 }}>
                    <ScrollView>
                      <View
                        style={[styles.container, { flexDirection: "column" }]}
                      >
                        <View style={styles.flex}>
                          <View
                            style={[
                              { flex: 0.2 },
                              {
                                flexDirection: "row",
                                borderWidth: 1,
                                backgroundColor: "#EFFFFD",
                              },
                            ]}
                          >
                            <View style={styles.tableHead}>
                              <Text
                                style={[styles.headingFont, { color: "white" }]}
                              >
                                Subjects
                              </Text>
                            </View>
                            <View style={styles.tableHead}>
                              <Text
                                style={[styles.headingFont, { color: "white" }]}
                              >
                                Max Marks
                              </Text>
                            </View>
                            <View style={styles.tableHead}>
                              <Text
                                style={[styles.headingFont, { color: "white" }]}
                              >
                                Min Marks
                              </Text>
                            </View>
                            <View style={styles.tableHead}>
                              <Text
                                style={[styles.headingFont, { color: "white" }]}
                              >
                                Obtained Marks
                              </Text>
                            </View>
                          </View>
                          <View style={styles.flexrow}>
                            <View style={styles.root}>
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
                              <View style={styles.colStyle}>
                                <Text style={styles.headingFont}>Total</Text>
                              </View>
                              {/* <View style={styles.colStyle}>
                                  <Text style={styles.headingFont}>Percentage</Text>
                                </View> */}
                            </View>
                            <View style={styles.root}>
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
                              <View style={styles.colStyle}>
                                <Text>
                                  {data.maths_max_marks +
                                    data.english_max_marks +
                                    data.science_max_mark +
                                    data.hindi_max_mark +
                                    data.social_max_mark +
                                    data.kannada_max_mark +
                                    data.computer_max_mark}
                                </Text>
                              </View>
                              {/* <View style={styles.colStyle}>
                                  <Text>
                                  </Text>
                                </View> */}
                            </View>
                            <View style={styles.root}>
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
                              <View style={styles.colStyle}>
                                <Text>
                                  {data.maths_min_mark +
                                    data.english_min_mark +
                                    data.science_min_mark +
                                    data.hindi_min_mark +
                                    data.social_min_mark +
                                    data.kannada_min_mark +
                                    data.computer_min_mark}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.root}>
                              <View style={[styles.colStyle]}>
                                <Text style={isFail && styles.textColor}>
                                  {data.maths_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text style={isFail && styles.textColor}>
                                  {data.english_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text style={isFail && styles.textColor}>
                                  {data.science_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text style={isFail && styles.textColor}>
                                  {data.hindi_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text style={isFail && styles.textColor}>
                                  {data.social_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text style={isFail && styles.textColor}>
                                  {data.kannada_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text style={isFail && styles.textColor}>
                                  {data.computer_obt_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text>
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
                          </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                          <Text
                            style={[
                              styles.headingFont,
                              { fontSize: 16, top: 10 },
                            ]}
                          >
                            Percentage :{" "}
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
                          <Text
                            style={[
                              styles.headingFont,
                              { fontSize: 16, top: 10, left: "400%" },
                            ]}
                          >
                            Result :
                            <Text
                              style={[
                                isFail
                                  ? styles.textColor
                                  : styles.textPassColor,
                              ]}
                            >
                              {isFail ? "Fail" : " Pass"}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </>
            ))}
          {/* </ScrollView> */}
        </View>
        <View style={{ flex: 0.2, backgroundColor: "green" }}>
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
  root: {
    flex: 1,
    flexDirection: "column",
  },
  flexrow: {
    flex: 1,
    flexDirection: "row",
  },
  flex: {
    flex: 1,
  },
  container: {
    padding: 10,
  },
  tableHead: {
    flex: 1,
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00B8AC",
  },
  studInfo: {
    flex: 1,
    flexDirection: "row",
  },
  studInfoTopLeftStyle1: {
    marginLeft: "5%",
    top: "5%",
  },
  studInfoTopLeftStyle2: {
    marginLeft: "5%",
    top: "1%",
  },
  colStyle: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: deviceHieght < 600 ? "5%" : "10%",
  },
  headingFont: {
    // fontFamily: "Hind-SemiBold",
    fontWeight: "bold",
    fontSize: deviceWidth < 370 ? 14 : 14,
  },
  tableTopStyle: {
    flex: 2.2,
    padding: 10,
    // bottom: deviceHieght < 600 ? "10%" : "1%",
    // top: deviceHieght < 600 ? "1%" : "1%",
  },
  textInfo: {
    fontSize: deviceWidth < 370 ? 18 : 20,
    fontFamily: "HindRegular",
    color: "black",
    fontWeight: "normal",

    // left: 10,
  },
  description: {
    fontSize: deviceWidth < 370 ? 18 : 20,
    fontFamily: "HindRegular",
    marginBottom: 4,
    fontWeight: "bold",
    // fontWeight: "bold",
  },
  textColor: {
    color: "red",
  },
  textPassColor: {
    color: "green",
  },
  space: {
    width: 20,
    height: 20,
  },
  bottomLine: {
    borderBottomColor: "#130BF0",
    borderBottomWidth: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // borderRadius:5,
    backgroundColor: "#CEE7FF",
    alignSelf: "center",
    paddingHorizontal: "12%",
  },
});

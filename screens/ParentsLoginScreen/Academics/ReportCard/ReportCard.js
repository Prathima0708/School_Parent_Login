import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image as NativeImage } from "native-base";
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
  StudentPhoto,
} from "../../../../components/StudentItem/StudentItem";
import { mainURL, subURL } from "../../../../components/utils/URL's";
var obtMarks = [];
const ReportCard = () => {
  const [data, setData] = useState([]);
  const [isFail, setIsFail] = useState(false);
  const [maxMarks, setMaxMarks] = useState([]);
  let i;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/MarksheetReg/${StudentRegNo}`);
        console.log(res.data);

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const myRef = useRef(null);

  useEffect(() => {
    if (myRef.current && myRef.current.setNativeProps) {
      const styleObj = {
        borderWidth: 2,
        //borderRadius: 4,
        borderColor: "white",
      };
      myRef.current.setNativeProps({
        style: styleObj,
      });
    }
  }, [myRef]);

  // useEffect(() => {
  //   for (i = 0; i < data.length; i++) {
  //     if (data[i].maths_obt_mark < 35) {
  //       setIsFail(true);
  //     }
  //     if (data[i].english_obt_mark < 35) {
  //       setIsFail(true);
  //     }
  //     if (data[i].science_obt_mark < 35) {
  //       setIsFail(true);
  //     }
  //     if (data[i].hindi_obt_mark < 35) {
  //       setIsFail(true);
  //     }
  //     if (data[i].social_obt_mark < 35) {
  //       setIsFail(true);
  //     }
  //     if (data[i].kannada_obt_mark < 35) {
  //       setIsFail(true);
  //     }
  //     if (data[i].computer_obt_mark < 35) {
  //       setIsFail(true);
  //     }
  //   }
  // }, []);

  return (
    <>
      <View style={styles.root}>
        {/* <View style={styles.flex}>
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
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={styles.flex}>
                <Text style={[styles.description, styles.bottomLine]}>
                  Class: <Text style={styles.textInfo}>{className}</Text>
                </Text>
              </View>
              <View style={styles.space} />
              <View style={{ flex: 1, marginRight: "5%" }}>
                <View style={styles.flex}>
                  <Text style={[styles.description, styles.bottomLine]}>
                    Section: <Text style={styles.textInfo}>{Section}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View> */}

        <View style={styles.studentItem}>
          {/* <View style={styles.studentItem}> */}
          <View style={{ flex: 0.53 }}>
            {/* <Image
                source={{
                  uri: `http://10.0.2.2:8000${StudentPhoto}`,
                }}
                style={styles.image}
                width="100px"
              /> */}
            <NativeImage
              source={{
                uri: `${mainURL}${StudentPhoto}`,
              }}
              alt="Student Image"
              size="lg"
              resizeMode="contain"
              ref={myRef}
            />
          </View>

          <View style={[{ flex: 1 }, { flexDirection: "column", left: 30 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.textBase, styles.description]}>Name</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.textBase, styles.description]}>Class</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.textBase, styles.description]}>Reg No</Text>
            </View>
          </View>
          <View
            style={[{ flex: 1 }, { flexDirection: "column", left: 10, top: 2 }]}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.textBase, styles.textStyleStudInfo]}>
                {StudentName}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.textBase, styles.textStyleStudInfo]}>
                {className} - {Section}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.textBase, styles.textStyleStudInfo]}>
                {StudentRegNo}
              </Text>
            </View>
            {/* </View> */}
          </View>
        </View>
        <View style={styles.tableTopStyle}>
          {/* <ScrollView> */}
          {data &&
            data.map((data, key) => (
              <>
                <View style={styles.root}>
                  <View style={{ flex: 8, bottom: 25 }}>
                    <ScrollView key={key}>
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
                              <View style={styles.firstCol}>
                                <Text style={styles.headingFirstCol}>
                                  Maths
                                </Text>
                              </View>
                              <View style={styles.firstCol}>
                                <Text style={styles.headingFirstCol}>
                                  English
                                </Text>
                              </View>
                              <View style={styles.firstCol}>
                                <Text style={styles.headingFirstCol}>
                                  Science
                                </Text>
                              </View>
                              <View style={styles.firstCol}>
                                <Text style={styles.headingFirstCol}>
                                  Hindi
                                </Text>
                              </View>
                              <View style={styles.firstCol}>
                                <Text style={styles.headingFirstCol}>
                                  Social
                                </Text>
                              </View>
                              <View style={styles.firstCol}>
                                <Text style={styles.headingFirstCol}>
                                  Kannada
                                </Text>
                              </View>
                              <View style={styles.firstCol}>
                                <Text style={styles.headingFirstCol}>
                                  Computer
                                </Text>
                              </View>
                              <View style={styles.firstCol}>
                                <Text style={styles.headingFirstCol}>
                                  Total
                                </Text>
                              </View>
                              {/* <View style={styles.colStyle}>
                                  <Text style={styles.headingFont}>Percentage</Text>
                                </View> */}
                            </View>
                            <View style={styles.root}>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.maths_max_marks}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.english_max_marks}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.science_max_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.hindi_max_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.social_max_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.kannada_max_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.computer_max_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
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
                                <Text style={styles.marksStyle}>
                                  {data.maths_min_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.english_min_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.science_min_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.hindi_min_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.social_min_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.kannada_min_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
                                  {data.computer_min_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
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
                                <Text
                                  style={
                                    isFail
                                      ? styles.textColor
                                      : styles.textPassTableColor
                                  }
                                >
                                  {data.maths_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text
                                  style={
                                    isFail
                                      ? styles.textColor
                                      : styles.textPassTableColor
                                  }
                                >
                                  {data.english_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text
                                  style={
                                    isFail
                                      ? styles.textColor
                                      : styles.textPassTableColor
                                  }
                                >
                                  {data.science_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text
                                  style={
                                    isFail
                                      ? styles.textColor
                                      : styles.textPassTableColor
                                  }
                                >
                                  {data.hindi_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text
                                  style={
                                    isFail
                                      ? styles.textColor
                                      : styles.textPassTableColor
                                  }
                                >
                                  {data.social_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text
                                  style={
                                    isFail
                                      ? styles.textColor
                                      : styles.textPassTableColor
                                  }
                                >
                                  {data.kannada_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text
                                  style={
                                    isFail
                                      ? styles.textColor
                                      : styles.textPassTableColor
                                  }
                                >
                                  {data.computer_obt_mark}
                                </Text>
                              </View>
                              <View style={styles.colStyle}>
                                <Text style={styles.marksStyle}>
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
                            ).toFixed(2) + "%"}
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
                              {data.maths_obt_mark < 35 ||
                              data.english_obt_mark < 35 ||
                              data.science_obt_mark < 35 ||
                              data.hindi_obt_mark < 35 ||
                              data.social_obt_mark < 35 ||
                              data.kannada_obt_mark < 35 ||
                              data.computer_obt_mark < 35
                                ? "Fail"
                                : "Pass"}
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
    backgroundColor: "white",
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
    borderRightColor: "grey",
    borderRightWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#00B8AC",
    backgroundColor: "#02196E",
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
    backgroundColor: "#FFFFE4",
    borderLeftWidth: 1,
    borderBottomWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    padding: deviceHieght < 600 ? "5%" : "10%",
  },
  firstCol: {
    borderRightWidth: 1,
    backgroundColor: "#FFFFE4",
    //borderRightColor: "white",
    borderLeftWidth: 1,
    borderBottomWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    padding: deviceHieght < 600 ? "5%" : "10%",
  },
  headingFirstCol: {
    fontFamily: "HindSemiBold",
    fontSize: deviceWidth < 370 ? 14 : 14,
    // color: "white",
  },
  headingFont: {
    // fontFamily: "Hind-SemiBold",
    fontFamily: "HindSemiBold",
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
    fontSize: deviceWidth < 370 ? 18 : 17,
    fontFamily: "HindSemiBold",
    marginBottom: 4,

    // fontWeight: "bold",
  },
  marksStyle: {
    fontFamily: "HindSemiBold",
  },
  textColor: {
    color: "black",
    fontFamily: "HindSemiBold",
  },
  textPassTableColor: {
    color: "black",
    fontFamily: "HindSemiBold",
  },
  textPassColor: {
    color: "black",
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
  studentItem: {
    width: "90%",
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    //  backgroundColor: "#3e04c3",
    backgroundColor: "darkblue",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 10,
  },
  textBase: {
    color: "white",
    // color: "#0D98BA",
    marginRight: 10,
  },

  textStyleStudInfo: {
    fontSize: deviceWidth < 370 ? 20 : 17,

    marginBottom: 4,
    // fontWeight: "bold",
    fontFamily: "HindMedium",
  },
  imageContainer: {
    padding: 1,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",

    //minWidth: 80,
  },
  image: {
    height: 85,
    width: 75,
  },
});

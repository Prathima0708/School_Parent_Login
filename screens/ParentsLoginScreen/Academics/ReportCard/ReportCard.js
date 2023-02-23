import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image as NativeImage } from "native-base";
import axios from "axios";
import ParentsHome from "../../BottomTab/ParentsHome";
import {
  className,
  studentId,
  StudentName,
  StudentRegNo,
  Section,
  StudentPhoto,
} from "../../../../components/StudentItem/StudentItem";
import { mainURL, subURL } from "../../../../components/utils/URL's";

const ReportCard = () => {
  const [data, setData] = useState([]);
  const [isFail, setIsFail] = useState(false);

  let i;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/MarksheetReg/${StudentRegNo}`);
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
        borderWidth: 3,
        borderColor: "white",
      };
      myRef.current.setNativeProps({
        style: styleObj,
      });
    }
  }, [myRef]);

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
  }, [data]);

  return (
    <>
      <View style={styles.root}>
        <View style={styles.studentItem}>
          <View style={{ flex: 0.53 }}>
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
          </View>
        </View>
        <View style={styles.tableTopStyle}>
          {data.length <= 0 ? (
            <View
              style={{
                alignItems: "center",

                marginTop: "15%",
              }}
            >
              <Text style={styles.msgText}>No report card found</Text>
            </View>
          ) : (
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
                                <Text
                                  style={
                                    data.maths_obt_mark < 35 && styles.textColor
                                  }
                                >
                                  {data.maths_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text
                                  style={
                                    data.english_obt_mark < 35 &&
                                    styles.textColor
                                  }
                                >
                                  {data.english_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text
                                  style={
                                    data.science_obt_mark < 35 &&
                                    styles.textColor
                                  }
                                >
                                  {data.science_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text
                                  style={
                                    data.hindi_obt_mark < 35 && styles.textColor
                                  }
                                >
                                  {data.hindi_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text
                                  style={
                                    data.social_obt_mark < 35 &&
                                    styles.textColor
                                  }
                                >
                                  {data.social_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text
                                  style={
                                    data.kannada_obt_mark < 35 &&
                                    styles.textColor
                                  }
                                >
                                  {data.kannada_obt_mark}
                                </Text>
                              </View>
                              <View style={[styles.colStyle]}>
                                <Text
                                  style={
                                    data.computer_obt_mark < 35 &&
                                    styles.textColor
                                  }
                                >
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
                              {isFail ? "Fail" : " Pass"}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </>
            ))
          )}
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
    backgroundColor: "#02196E",
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
    borderLeftWidth: 1,
    borderBottomWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    padding: deviceHieght < 600 ? "5%" : "10%",
  },
  headingFirstCol: {
    fontWeight: "bold",
    fontSize: deviceWidth < 370 ? 14 : 14,
  },
  headingFont: {
    fontWeight: "bold",
    fontSize: deviceWidth < 370 ? 14 : 14,
  },
  tableTopStyle: {
    flex: 2.2,
    padding: 10,
  },
  textColor: {
    color: "red",
  },
  textPassColor: {
    color: "green",
  },
 
  studentItem: {
    width: "90%",
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: "#02196E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  textBase: {
    color: "white",
    marginRight: 10,
  },
  description: {
    fontSize: deviceWidth < 370 ? 20 : 17,
    marginBottom: 4,
    fontFamily: "HindSemiBold",
  },
  textStyleStudInfo: {
    fontSize: deviceWidth < 370 ? 20 : 17,
    marginBottom: 4,
    fontFamily: "HindMedium",
  },
  msgText: {
    fontSize: 18,
    fontFamily: "HindSemiBold",
    color: "#6B0000",
  },
});

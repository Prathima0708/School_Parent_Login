import axios from "axios";
import moment from "moment";
import {
  Text as NativeText,
  Heading,
} from "native-base";
import { useEffect, useState } from "react";
import { Dimensions, Text } from "react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { subURL } from "../../../../components/utils/URL's";
import ParentsHome from "../../BottomTab/ParentsHome";
import { ID } from "./TimeTable";

function ExamTimeTable() {
  const [data, setData] = useState([]);
  const [dataIsThere, setDataIsThere] = useState(false);

  useEffect(() => {
    async function viewExamList() {
      try {
        const res = await axios.get(`${subURL}/AddmoreExam_list_by_exam/${ID}`);

        setData(res.data);
        if (res.data.length > 0) {
          setDataIsThere(true);
        } else {
          setDataIsThere(false);
        }
      } catch {
        console.log(error);
      }
    }
    viewExamList();
  }, []);

  return (
    <>
      <View style={styles.root}>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Heading fontSize={20}>Exam Time Table</Heading>
        </View>
        <View style={[styles.tableTopStyle]}>
          <>
            <View style={[{ flexDirection: "row", marginVertical: 20 }]}>
              <View style={[styles.tableHead, { alignItems: "center" }]}>
                <Text style={styles.headingFont}>Time</Text>
              </View>
              <View style={[styles.tableHead, { alignItems: "center" }]}>
                <Text style={styles.headingFont}>Subject</Text>
              </View>
            </View>
            <View
              style={[
                { flex: 1 },
                { flexDirection: "column", backgroundColor: "white" },
              ]}
            >
              <View style={{ flex: 8, bottom: 20 }}>
                <ScrollView>
                  {data.length > 0 ? (
                    <View style={[styles.flexrow]}>
                      <View style={[styles.root, {}]}>
                        {data &&
                          data.map((data) => (
                            <>
                              <View
                                style={[
                                  styles.container,
                                  {
                                    flexDirection: "row",
                                    justifyContent: "center",
                                  },
                                ]}
                              >
                                <View style={[styles.colStyle]}>
                                  <Text
                                    style={[
                                      styles.tableTitle,
                                      { justifyContent: "center" },
                                    ]}
                                  >
                                    {moment(data.exam_time, "HH:mm").format(
                                      "LT"
                                    )}
                                  </Text>
                                </View>
                              </View>
                            </>
                          ))}
                      </View>
                      <View style={[styles.root, {}]}>
                        {data &&
                          data.map((data) => (
                            <>
                              <View
                                style={[
                                  styles.container,
                                  {
                                    flexDirection: "row",
                                    justifyContent: "center",
                                  },
                                ]}
                              >
                                <View
                                  style={[
                                    styles.colStyle,
                                  ]}
                                >
                                  <Text style={[styles.tableTitle]}>
                                    {data.subject}
                                  </Text>
                                </View>
                              </View>
                            </>
                          ))}
                      </View>
                    </View>
                  ) : (
                    <View style={{ alignItems: "center", marginVertical: 10 }}>
                      <Text style={styles.errText}>No data found.</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            </View>
          </>
        </View>
      </View>
      <View style={{ flex: 0.1 }}>
        <ParentsHome />
      </View>
    </>
  );
}

export default ExamTimeTable;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({

  tableTopStyle: {
    flex: 4,
    padding: 10,
    bottom: 20,
  },
  tableHead: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "#1E84A4",
  },
  headingFont: {
    fontFamily: "HindSemiBold",
    color: "white",
    fontSize: deviceWidth < 370 ? 14 : 16,
  },
  flexrow: {
    flex: 1,
    flexDirection: "row",
  },
  root: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 1,
  },
  colStyle: {
    padding: deviceHieght < 600 ? "5%" : "3%",
  },
  container: {
    padding: 10,
    borderWidth: 1,
  },
  errText: {
    fontFamily: "HindSemiBold",
    fontSize: 18,
    color: "#6B0202",
  },
});

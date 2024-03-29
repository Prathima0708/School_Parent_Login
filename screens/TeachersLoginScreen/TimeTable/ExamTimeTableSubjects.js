import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { subURL } from "../../../components/utils/URL's";
import { Card } from "react-native-paper";
import { ID } from "./TecahersExamTimeTable";
import {
  Alert,
  Badge,
  Box,
  CloseIcon,
  Heading,
  HStack,
  IconButton,
  Text as NativeText,
  VStack,
} from "native-base";
import moment from "moment";
import TeachersHome from "../BottomTab/TeachersHome";
import { useRoute } from "@react-navigation/native";

const ExamTimeTableSubjects = () => {
  const [data, setData] = useState([]);
  const [dataIsThere, setDataIsThere] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRoute();

  useEffect(() => {
    setLoading(true);
    async function viewExamList() {
      try {
        const res = await axios.get(`${subURL}/AddmoreExam_list_by_exam/${ID}`);

        setData(res.data);

        if (res.data.length > 0) {
          setDataIsThere(true);
        } else {
          setDataIsThere(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    viewExamList();
  }, []);

  return (
    <>
      <View style={styles.root}>
        <View
          style={[
            {
              flex: 1,
              flexDirection: "column",
              padding: 10,
              marginTop: "10%",
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <View
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                },
              ]}
            >
              <View
                style={{ flex: 1, alignItems: "center", marginLeft: "20%" }}
              >
                <Text style={styles.labelFont}>Class name </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.labelFontValue, {}]}>
                  {route.params.className}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                },
              ]}
            >
              <View
                style={{ flex: 1, alignItems: "center", marginLeft: "20%" }}
              >
                <Text style={styles.labelFont}>Exam name</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.labelFontValue, {}]}>
                  {route.params.examName}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                },
              ]}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  marginLeft: "28%",
                }}
              >
                <Text style={styles.labelFont}>Hour</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.labelFontValue, {}]}>
                  {route.params.hour}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.tableTopStyle]}>
          <>
            <View style={[{ flexDirection: "row", marginVertical: 20 }]}>
              <View style={styles.tableHead}>
                <Text style={styles.headingFont}>Exam date</Text>
              </View>
              <View style={styles.tableHead}>
                <Text style={styles.headingFont}>Time</Text>
              </View>

              <View style={[styles.tableHead, { right: "1%" }]}>
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
                  <View style={[styles.flexrow]}>
                    <View style={[styles.root, {}]}>
                      {data && loading ? (
                        <HStack
                          space={8}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <ActivityIndicator
                            size={40}
                            visible={loading}
                            textContent={"Loading..."}
                          />
                        </HStack>
                      ) : (
                        data.map((data) => (
                          <>
                            <View
                              style={[
                                styles.container,
                                { flexDirection: "row" },
                              ]}
                            >
                              <View style={[styles.colStyle]}>
                                <Text style={[styles.tableTitle]}>
                                  {moment(data.exam_date).format("DD-MM-YYYY")}
                                </Text>
                              </View>
                            </View>
                          </>
                        ))
                      )}
                    </View>
                    <View style={[styles.root, {}]}>
                      {data && loading ? (
                        <HStack
                          space={8}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <ActivityIndicator
                            size={40}
                            visible={loading}
                            textContent={"Loading..."}
                          />
                        </HStack>
                      ) : (
                        data.map((data) => (
                          <>
                            <View
                              style={[
                                styles.container,
                                { flexDirection: "row" },
                              ]}
                            >
                              <View style={[styles.colStyle, { left: "95%" }]}>
                                <Text style={[styles.tableTitle]}>
                                  {moment(data.exam_time, "HH:mm").format("LT")}
                                </Text>
                              </View>
                            </View>
                          </>
                        ))
                      )}
                    </View>

                    <View style={[styles.root, { right: "1%" }]}>
                      {data && loading ? (
                        <HStack
                          space={8}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <ActivityIndicator
                            size={40}
                            visible={loading}
                            textContent={"Loading..."}
                          />
                        </HStack>
                      ) : (
                        data.map((data) => (
                          <>
                            <View
                              style={[
                                styles.container,
                                { flexDirection: "row" },
                              ]}
                            >
                              <View style={[styles.colStyle, { left: "80%" }]}>
                                <Text style={[styles.tableTitle]}>
                                  {data.subject}
                                </Text>
                              </View>
                            </View>
                          </>
                        ))
                      )}
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </>
        </View>
      </View>

      <View style={{ flex: 0.1 }}>
        <TeachersHome />
      </View>
    </>
  );
};

export default ExamTimeTableSubjects;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  containerView: {
    flex: 2,
    flexDirection: "column",
    // backgroundColor:'#5578E3',
    marginHorizontal: 10,
    marginRight: "25%",
    marginVertical: 20,
    top: "1%",
  },
  alertStyle: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
  },
  tableTopStyle: {
    flex: 4,
    padding: 10,
    bottom: 35,
    marginVertical: 10,
  },
  tableHead: {
    flex: 1,
    padding: 10,
    paddingBottom: 15,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E84A4",
  },
  labelFont: {
    fontFamily: "HindSemiBold",
    color: "black",
    fontSize: deviceWidth < 370 ? 14 : 17,
  },
  labelFontValue: {
    fontFamily: "HindMedium",
    color: "black",
    fontSize: deviceWidth < 370 ? 14 : 17,
  },
  headingFont: {
    // fontFamily: "Hind-SemiBold",
    fontFamily: "HindBold",
    //right:'15%',
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
    left: "40%",
    // marginVertical:10
  },
  container: {
    padding: 10,
    borderWidth: 1,
  },
  tableTitle: {
    fontFamily: "HindRegular",
    fontSize: 16,
  },
});

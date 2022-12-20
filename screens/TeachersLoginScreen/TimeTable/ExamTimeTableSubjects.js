import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { subURL } from "../../../components/utils/URL's";
import { Card } from "react-native-paper";
import { ID } from "./TecahersExamTimeTable";
import { Alert, Box, CloseIcon, Heading,HStack,IconButton,Text as NativeText, VStack } from 'native-base';
import moment from "moment";
import TeachersHome from "../BottomTab/TeachersHome";

const ExamTimeTableSubjects = () => {
  const [data, setData] = useState([]);
  const [dataIsThere,setDataIsThere]=useState(false);

 //console.log("id -", ID);
  useEffect(() => {
    async function viewExamList() {
      try {
        const res = await axios.get(`${subURL}/AddmoreExam_list_by_exam/${ID}`);
      //  console.log(res.data);

        setData(res.data);

        if(res.data.length > 0){
          console.log('if part')
          setDataIsThere(true);
        }else{
          console.log('else part')
          setDataIsThere(false);
        }

      } catch (error) {
        console.log(error);
      }
    }
    viewExamList();
  }, []);

  return (
    <>
    {dataIsThere ? <View style={styles.root}>
            <View style={{alignItems:'center',marginVertical:20}}>
                <Heading fontSize={20}>Exam Time Table</Heading>
            </View>
              <View style={[styles.tableTopStyle]}>
                <>
                  <View style={[{ flexDirection: "row",marginVertical:20 }]}>
                    <View style={styles.tableHead}>
                      <Text style={styles.headingFont}>Time</Text>
                    </View>
                    <View style={styles.tableHead}>
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
                          <View style={[styles.root,{}]}>
                            {data &&
                              data.map((data) => (
                                <>
                                  <View
                                    style={[
                                      styles.container,
                                      { flexDirection: "row" },
                                    ]}
                                  >
                                    <View style={[styles.colStyle]}>
                                      <Text
                                        style={[
                                          styles.tableTitle,
                                          { left: "35%" },
                                        ]}
                                      >
                                        {data.exam_time}
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
                                      { flexDirection: "row" },
                                    ]}
                                  >
                                    <View
                                      style={[
                                        styles.colStyle,
                                        { left: "80%" },
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
                      </ScrollView>
                    </View>
                  </View>
                </>
              </View>
          </View> :
          <View style={styles.alertStyle}>
          <Alert maxW="1300" status="error" top='30%'>
            <VStack space={1} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                <HStack flexShrink={1} space={2} alignItems="center">
                  {/* <Alert.Icon /> */}
                  <NativeText fontSize="md" fontWeight="medium" _dark={{
                  color: "coolGray.800"
                }}>
                    Data not found
                  </NativeText>
                </HStack>
              </HStack>
              <Box  _dark={{
              _text: {
                color: "coolGray.600"
              }
              }}>
                There is no exam time table for selected class
              </Box>
            </VStack>
          </Alert>
        </View>
        }
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
  alertStyle:{
    backgroundColor:'white',
    flex:1,
    paddingHorizontal:20,
  },
  tableTopStyle: {
    flex:4,
    padding: 10,
     bottom: 20,
  },
  tableHead: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkblue",
  },
  headingFont: {
    // fontFamily: "Hind-SemiBold",
    fontWeight: "bold",
    right:'15%',
    color: "white",
    fontSize: deviceWidth < 370 ? 14 : 14,
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
});

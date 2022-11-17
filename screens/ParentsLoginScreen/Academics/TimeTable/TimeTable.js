import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

import { DataTable } from "react-native-paper";

import axios from "axios";
import BgButton from "../../../../components/UI/BgButton";
import VerticalLine from "../../../../components/UI/VerticalLine";
import { Text } from "react-native";
import ParentsHome from "../../BottomTab/ParentsHome";
import { Image } from "react-native";
import { FlatList } from "react-native";
import {
  className,
  Section,
} from "../../../../components/StudentItem/StudentItem";
import moment from "moment";
import { Divider } from "native-base";

const TimeTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);

  // const [data, setData] = useState();

  const [examData, setExamData] = useState();

  const [timeTable, setTimeTable] = useState();
  const [forTimeTableList, setForTimeTableList] = useState({
    color: "white",
    backgroundColor: "#0C60F4",
    borderRadius: 10,
  });
  const [forExamTimeTable, setForExamTimeTable] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 10,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/AddmoreTimetable_list/${className}`
        );
        console.log(res.data);

        setTimeTable(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  async function viewExam() {
    setForExamTimeTable({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    setForTimeTableList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setShowTable(false);
    setShowForm(true);
    try {
      const res = await axios.get(
        `http://10.0.2.2:8000/school/ExamByClass/${className}/`
      );
      console.log(res.data);

      setExamData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function timeTableList() {
    setForTimeTableList({
      backgroundColor: "#0C60F4",
      color: "white",
      borderRadius: 10,
    });
    setForExamTimeTable({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
    });
    setShowForm(false);
    setShowTable(true);

    try {
      const res = await axios.get(
        `http://10.0.2.2:8000/school/AddmoreTimetable_list/${className}`
      );
      console.log(res.data);

      setTimeTable(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton onPress={timeTableList} style={forTimeTableList}>
          Daily
        </BgButton>

        <BgButton onPress={viewExam} style={forExamTimeTable}>
          Exam
        </BgButton>
      </View>
      {showTable && (
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
                    Class:  <Text style={styles.textInfo}>{className}</Text>
                  </Text>
                </View>
                <View style={styles.space} />
                <View style={{ flex: 0.5, marginRight: "5%" }}>
                  <Text style={[styles.description, styles.bottomLine]}>
                    Section: <Text style={styles.textInfo}>{Section}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.tableTopStyle}>
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
                                  <Text></Text>
                                </View>
                                <View style={styles.colStyle}>
                                  <Text></Text>
                                </View>
                                <View style={styles.colStyle}>
                                  <Text></Text>
                                </View>
                                <View style={styles.colStyle}>
                                  <Text></Text>
                                </View>
                                <View style={styles.colStyle}>
                                  <Text></Text>
                                </View>
                                <View style={styles.colStyle}>
                                  <Text></Text>
                                </View>
                                <View style={styles.colStyle}>
                                  <Text></Text>
                                </View>
                                <View style={styles.colStyle}>
                                  <Text></Text>
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
          </View>
        </View>
        </>
      )}
      {/* <ParentsHome /> */}
      {showForm && (
            <>

              <View
                style={[
                  { flex: 1 },
                  { flexDirection: "column", backgroundColor: "white" },
                ]}
              >
                <View style={{ flex: 8, bottom: 10 }}>
                  <ScrollView style={{backgroundColor:'white'}}>
                    {examData && 
                      examData.map((data)=>(
                        <View style={[styles.mainView]}>
                          <View style={{ flex: 1}} >
                            <Divider bg="#04007A" thickness="2" orientation="vertical" style={{left:'40%',borderRadius:10}} />
                          </View>
                          <View style={styles.cardStyle}>
                            <View style={[{flex:1}, {flexDirection: "column"}]}>
                              <View style={[{flex:2}, {flexDirection: "row",padding:5,top:'2%'}]}>
                                <View style={{ flex: 1,alignItems:'flex-start',left:'100%'}}>
                                  <Text style={[styles.labelStyle]}>Exam Name</Text>
                                </View>
                                <View style={{ flex: 1}} >
                                  <Text style={[styles.cardText]}>{data.exam_name}</Text>
                                </View>
                              </View>
                              <View style={{flexDirection:'row',top:'1%',padding:10}}>
                                <View style={[{flex:2}, {flexDirection: "column"}]}>
                                  <View style={{ flex: 1,alignItems:'flex-start',left:'10%'}} >
                                    <Text style={[styles.labelStyle]}>Start Date</Text>
                                  </View>
                                  <View style={{ flex: 1 }} >
                                    <Text style={[styles.cardText,{left:'10%'}]}>{moment(data.startdate).format("DD/MM/YYYY")}</Text>
                                  </View>
                                </View>
                                <View style={[{flex:1}, {flexDirection: "column"}]}>
                                  <View style={{ flex: 1,alignItems:'flex-start',right:'35%'}} >
                                    <Text style={[styles.labelStyle]}>End Date</Text>
                                  </View>
                                  <View style={{ flex: 1,right:'45%' }} >
                                    <Text style={[styles.cardText]}>{moment(data.end_date).format("DD/MM/YYYY")}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{flexDirection:"row",padding:10}}>
                                <View style={[{flex:2}, {flexDirection: "row",left:'6%'}]}>
                                  <View style={{ flex: 1.7}} >
                                    <Text style={[styles.labelStyle]}>Total marks :</Text>
                                  </View>
                                  <View style={{ flex: 1,bottom:'1%',right:'30%' }} >
                                    <Text style={[styles.cardText]}>{data.Total_marks}</Text>
                                  </View>
                                </View>
                                <View style={[{flex:2}, {flexDirection: "row",left:'5%'}]}>
                                  <View style={{ flex: 1}} >
                                    <Text style={[styles.labelStyle]}>Hour :</Text>
                                  </View>
                                  <View style={{ flex: 2,bottom:'1%',right:'50%' }} >
                                    <Text style={[styles.cardText]}>{data.hour}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      ))}
                  </ScrollView>
                  </View>

                  <View style={{ flex: 1 }}>
                    <ParentsHome />
                  </View>

              </View>
            </>
          )}
    </>
  );
};

export default TimeTable;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "white",
  },
  studentItem: {
    width: "90%",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    alignItems: "center",
    // paddingTop: 0,
    paddingBottom: 9,
    flexDirection: "row",
    //backgroundColor: "skyblue",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  textBase: {
    color: "black",
    //textAlign: "center",
  },
  description: {
    fontSize: deviceWidth < 370 ? 16 : 20,

    marginBottom: 4,
    fontFamily: "HindRegular",
  },
  imageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    //minWidth: 80,
  },
  image: {
    height: 80,
    width: 80,
  },
  container: {
    padding: 10,
  },
  type: {
    marginLeft: 10,
  },
  th: {
    padding: 3,
    marginRight: 13,
    fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 45,
    fontWeight: "bold",
  },
  tableTitle: {
    margin: 7,
    fontFamily: "HindSemiBold",
    fontSize: deviceWidth < 370 ? 16 : 20,
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
  //new one
  root: {
    flex: 1,
    flexDirection: "column",
    backgroundColor:'white'
  },
  flex: {
    flex: 1,
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
  flexrow: {
    flex: 1,
    flexDirection: "row",
  },
  colStyle: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: deviceHieght < 600 ? "5%" : "10%",
  },
  description: {
    fontSize: deviceWidth < 370 ? 18 : 20,
    fontFamily: "HindRegular",
    marginBottom: 4,
    fontWeight: "bold",
    // fontWeight: "bold",
  },
  bottomLine: {
    borderBottomColor: "#130BF0",
    borderBottomWidth: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // borderRadius:5,
    // backgroundColor: "#CEE7FF",
    alignSelf: "center",
    paddingHorizontal: "12%",
  },
  textInfo: {
    fontSize: deviceWidth < 370 ? 18 : 20,
    fontFamily: "HindRegular",
    color: "black",
    fontWeight: "normal",

    // left: 10,
  },
  tableTopStyle:{
    flex: 3.2,
    padding: 10,
  },
  tableHead: {
    flex: 1,
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00B8AC",
  },
  headingFont: {
    // fontFamily: "Hind-SemiBold",
    fontWeight: "bold",
    fontSize: deviceWidth < 370 ? 14 : 14,
  },
  mainView:{
    flex:1,
    flexDirection: "row",
    marginHorizontal:20,
    marginVertical:10,
  },
  labelStyle:{
    color:'black',
    fontFamily: "HindBold",
    fontSize:16,
    textAlign:'center'
  },
  cardText:{
    color:'black',
    fontSize:16,
    left:'10%',
    top:'10%'
  },
  cardStyle:{
    flex: 20,
    backgroundColor:'#D6EAFF',
    elevation:5,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:10
  }
});

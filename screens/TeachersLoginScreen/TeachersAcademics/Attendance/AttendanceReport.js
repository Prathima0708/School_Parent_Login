import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { subURL } from "../../../../components/utils/URL's";
import { Button as NativeButton, Text as NativeText } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import moment from "moment";
import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
var TOKEN, FROMDATE;
const AttendanceReport = () => {
  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());
  const [fromShow, setFromShow] = useState(false);

  const [isFromDateFocused, setIsFromDateFocused] = useState(false);
  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText.trim() !== "";
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;

  const route = useRoute();
  const [token, setToken] = useState("");
  const [yearReport, setYearReport] = useState([]);
  const [monthlyCount, setMonthlyCount] = useState({});

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May"];

  async function fetchToken() {
    TOKEN = await AsyncStorage.getItem("token");

    if (TOKEN !== null) {
      setToken(TOKEN);
    }
  }
  fetchToken();
  useEffect(() => {
    const request_model = {
      student_id: route.params.id,
      year: "2023",
    };

    async function getData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          //   Authorization: "Token " + `${token}`,
        };
        const res = await axios.post(
          `${subURL}/AttendanceDetailByStudentIDYear/`,
          request_model,
          {
            headers: headers,
          }
        );

        setYearReport(res.data);
        let counts = {};
        res.data.map((item) => {
          const date = new Date(item.attendance_date);
          const month = date.getMonth();
          if (!counts[month]) {
            counts[month] = { present: 0, absent: 0 };
          }
          if (item.attendance_status === "present") {
            counts[month].present++;
          } else {
            counts[month].absent++;
          }
        });
        setMonthlyCount(counts);
        console.log(monthlyCount);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
    setIsFromDateFocused(false);
  }

  function onFocusFromHandler() {
    setIsFromDateFocused(true);
    setEnteredFromDateTouched(false);
    //setstartDateLabel(true);
  }
  const fromDateChangeHandler = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate;
    FROMDATE = selectedFromDate;

    setFromShow(Platform.OS === "ios");
    // setFromDate(currentFromDate);

    let tempFromDate = new Date(currentFromDate);
    let fDate =
      tempFromDate.getDate() +
      "/" +
      (tempFromDate.getMonth() + 1) +
      "/" +
      tempFromDate.getFullYear();

    if (event.type == "set") {
      setFromText(fDate);
    } else {
      // if (event?.type === "dismissed") {
      //   setFromText("");
      //   return;
      // }
    }
  };

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  function frmDateHandler(enteredValue) {
    setFromDate(enteredValue);
  }
  return (
    <>
      <View style={[{ flexDirection: "column" }]}>
        <View
          style={{
            top: "3%",
            left: "3%",
            flexDirection: "row",
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "HindRegular",
              fontSize: 18,
              top: "3%",
            }}
          >
            Select Year
          </Text>
          <View style={styles.dateLabelSpace} />

          <View style={styles.dateContainer}>
            <UnderlinedInput
              value={fromText}
              placeholder="Select Year"
              style={
                isFromDateFocused
                  ? styles.focusStyle
                  : fromDateInputIsInValid && styles.errorBorderColorDate
              }
              blur={fromDateBlurHandler}
              onFocus={onFocusFromHandler}
              onChangeText={frmDateHandler}
              onPressIn={() => showFromMode("date")}
            />
            {fromDateInputIsInValid && (
              <Text style={styles.commonErrorMsg}>Select from date</Text>
            )}
            {fromShow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={fromDate}
                mode={frommode}
                is24Hour={true}
                display="default"
                onChange={fromDateChangeHandler}
              />
            )}
          </View>
        </View>
      </View>
      {/* <Text>AttendanceReport {route.params.id}</Text> */}
      <View style={{ flex: 1, backgroundColor: "white", marginTop: "9%" }}>
        <View style={[styles.tableHeader]}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.headerText}>Month</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.headerText}>Present</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.headerText}>Absent</Text>
          </View>
        </View>

        <View
          style={[
            { flex: 1 },
            {
              flexDirection: "column",
              // top: keyboardStatus == "Keyboard Hidden" ? "11.5%" : "18%",
              paddingHorizontal: 10,
              marginHorizontal: 10,
            },
          ]}
        >
          <View style={{ flex: 8, bottom: 10, top: 7 }}>
            <ScrollView>
              {Object.entries(monthlyCount).map(([month, counts]) => (
                <View
                  style={[
                    { flex: 1 },
                    {
                      // Try setting `flexDirection` to `"row"`.
                      flexDirection: "row",
                      borderWidth: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      flex: 1,

                      alignItems: "center",
                    }}
                  >
                    <Text>{monthNames[month]}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,

                      alignItems: "center",
                    }}
                  >
                    <Text> {counts.present}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,

                      alignItems: "center",
                    }}
                  >
                    <Text> {counts.absent}</Text>
                  </View>
                </View>
              ))}
              {/* <View>
                {Object.entries(monthlyCount).map(([month, counts]) => (
                  <View key={month}>
                    <Text>{monthNames[month]}</Text>
                    <Text>Present: {counts.present}</Text>
                    <Text>Absent: {counts.absent}</Text>
                  </View>
                ))}
              </View> */}
            </ScrollView>
          </View>
        </View>
      </View>
    </>
  );
};

export default AttendanceReport;

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  descriptionTextStyle: {
    fontSize: 18,
  },
  errorBorderColor: {
    borderColor: "red",
  },
  viewStyle: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#D3D2FF",
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
  },
  overallContainer: {
    flex: 1,
    flexDirection: "row",
    top: "10%",
  },
  iconContainer: {
    flex: 0.3,
    justifyContent: "center",
    bottom: "1%",
    alignItems: "flex-start",
  },
  dateContainer: {
    flex: 2,
    //right: "5%",
  },
  studentItem: {
    // width: "90%",

    padding: 11,
    marginVertical: 8,
    // //  backgroundColor: "#3e04c3",
    backgroundColor: "#f0f0fc",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 6,
  },
  textBase: {
    color: "black",
    marginRight: 33,
  },
  leaveSpace: {
    width: 60, // or whatever size you need
    height: 10,
  },
  dateLabelSpace: {
    width: 40, // or whatever size you need
    height: 10,
  },
  inputForm: {
    flex: 2,
    paddingHorizontal: 20,
    marginTop: "30%",
    //paddingTop: '5%',
    backgroundColor: "white",
    // height: "100%",
  },
  description: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: "bold",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  errorBorderColorDate: {
    borderBottomColor: "red",
  },
  commonErrorMsg: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 16 : 18,
    top: deviceHieght > 800 ? -3 : 1,
  },
  errorSelectedColor: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: 16,
  },
  labelStyle: {
    fontFamily: "HindBold",
    fontSize: 16,
  },
  title: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    top: "5%",
  },
  tableHeader: {
    flex: 0.1,
    flexDirection: "row",
    borderWidth: 1,
    marginHorizontal: 20,
    backgroundColor: "darkblue",
  },
  tableText: {
    flex: 1,
    flexDirection: "row",
    // paddingHorizontal:10,
    // marginHorizontal:10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  headerText: {
    fontFamily: "HindBold",
    fontSize: 16,
    color: "white",
  },
  th: {
    padding: 5,
    marginRight: 13,
    //fontSize: 24,
  },

  tableTitle: {
    // padding: 5,
    margin: 7,
    fontFamily: "HindMedium",
    fontSize: 20,
  },
  tableCell: {
    width: 110,

    marginLeft: 35,
  },

  tableMarks: {
    width: 10,

    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  searchBar: {
    //top: 10,
    backgroundColor: "#F0F3F4",
    marginTop: 10,
    marginBottom: 20,
  },
  root: {
    // backgroundColor: "#EBECFO",
    backgroundColor: "white",
    height: "100%",
  },
});

// import { useState, useEffect } from 'react';

// function AttendanceCounter() {
//   const [attendance, setAttendance] = useState([]);
//   const [monthlyCount, setMonthlyCount] = useState({});

//   useEffect(() => {
//     // fetch attendance data from the backend
//     fetch('https://your-backend-url.com/attendance')
//       .then(response => response.json())
//       .then(data => {
//         setAttendance(data);

//         // count the number of attendance for each month
//         const counts = data.reduce((counts, item) => {
//           const date = new Date(item.date);
//           const month = date.getMonth();
//           if (!counts[month]) {
//             counts[month] = { present: 0, absent: 0 };
//           }
//           if (item.status === 'present') {
//             counts[month].present++;
//           } else {
//             counts[month].absent++;
//           }
//           return counts;
//         }, {});
//         setMonthlyCount(counts);
//       });
//   }, []);

//   return (
//     <View>
//       {Object.entries(monthlyCount).map(([month, counts]) => (
//         <View key={month}>
//           <Text>
//             {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2000, month))}
//           </Text>
//           <Text>Present: {counts.present}</Text>
//           <Text>Absent: {counts.absent}</Text>
//         </View>
//       ))}
//     </View>
//   );
// }

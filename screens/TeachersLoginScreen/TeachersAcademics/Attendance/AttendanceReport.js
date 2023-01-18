import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { subURL } from "../../../../components/utils/URL's";
import { Button as NativeButton, Text as NativeText } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import moment from "moment";
import SelectList from "react-native-dropdown-select-list";
import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
import BgButton from "../../../../components/UI/BgButton";
import TeachersHome from "../../BottomTab/TeachersHome";
var TOKEN, FROMDATE, SELECTEDYEAR, firstData, KEY, VALUE;
const AttendanceReport = () => {
  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());
  const [fromShow, setFromShow] = useState(false);

  const [isFromDateFocused, setIsFromDateFocused] = useState(false);
  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText !== "";
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;

  const [forYearlyReport, setForYearlyReport] = useState({
    color: "white",
    backgroundColor: "#0C60F4",
    borderRadius: 10,
  });
  const [forMonthlyReport, setForMonthlyReport] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 10,
  });
  const route = useRoute();
  const [token, setToken] = useState("");
  const [yearReport, setYearReport] = useState([]);
  const [yearMonthReport, setYearMonthReport] = useState([]);
  const [monthlyCount, setMonthlyCount] = useState({});
  const [dailyAttendance, setDailyAttendance] = useState({});

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const months = [
    // { key: "Month", value: "Month" },
    { key: "01", value: "January" },
    { key: "02", value: "Feburary" },

    { key: "03", value: "March" },
    { key: "04", value: "April" },
    { key: "05", value: "May" },
    { key: "06", value: "June" },

    { key: "07", value: "July" },
    { key: "08", value: "August" },
    { key: "09", value: "September" },
    { key: "10", value: "October" },

    { key: "11", value: "Novembar" },
    { key: "12", value: "Decembar" },
  ];

  const [showYearReport, setShowYearReport] = useState(true);
  const [showMonthReport, setShowMonthReport] = useState(false);
  firstData = months[0];
  KEY = firstData.key;
  VALUE = firstData.value;

  const [selected, setSelected] = useState("");
  const [listSelected, setListSelected] = useState([]);
  const [showFirstOption, setShowFirstOption] = useState(false);

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
      year: moment(FROMDATE).format("YYYY"),
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
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  function viewList() {
    const request_model = {
      student_id: route.params.id,
      year: moment(FROMDATE).format("YYYY"),
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
        //console.log(monthlyCount);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }

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
    console.log(tempFromDate.getFullYear());
    SELECTEDYEAR = tempFromDate.getFullYear();
    let year = moment(tempFromDate).format("YYYY");
    console.log("year is ", year);
    let fDate =
      tempFromDate.getDate() +
      "/" +
      (tempFromDate.getMonth() + 1) +
      "/" +
      tempFromDate.getFullYear();

    if (event.type == "set") {
      setFromText(year);
      viewList();
    } else {
      // if (event?.type === "dismissed") {
      //   setFromText("");
      //   return;
      // }
    }
    console.log("fromtext", fromText);
  };

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  function frmDateHandler(enteredValue) {
    setFromDate(enteredValue);
  }
  function yearlyReport() {
    setShowYearReport(true);
    setShowMonthReport(false);
    setForYearlyReport({
      backgroundColor: "#0C60F4",
      color: "white",
      borderRadius: 10,
    });
    setForMonthlyReport({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
    });
  }
  function monthlyReport() {
    setShowYearReport(false);
    setShowMonthReport(true);
    setForMonthlyReport({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    setForYearlyReport({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
  }
  function viewYearMonthReport() {
    setShowYearReport(true);
    setShowYearReport(false);
    const request_model = {
      student_id: route.params.id,
      yearMonth: moment(FROMDATE).format("YYYY") + "-" + selected,
    };
    async function getData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Token " + `${token}`,
        };
        const res = await axios.post(
          `${subURL}/AttendanceDetailByStudentIDMonthYear/`,
          request_model,
          {
            headers: headers,
          }
        );
        console.log(res.data);
        //setYearMonthReport(res.data);
        console.log("selected value is", selected);
        // const filteredAttendance = res.data.filter(
        //   (item) => new Date(item.attendance_date).getMonth() === selected
        // );
        const filteredAttendance = res.data.filter((item) => {
          const date = new Date(item.attendance_date);
          return date.getMonth() + 1 === parseInt(selected);
        });
        let counts = {};
        filteredAttendance.map((item) => {
          const date = new Date(item.attendance_date);
          const day = date.getDate();
          console.log("day is", day);
          if (!counts[day]) {
            counts[day] = item.attendance_status;
          }
        });
        setDailyAttendance(counts);
        console.log(dailyAttendance);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }
  function showSingleReport(month) {
    console.log(month);
    //setShowMonthReport(true);
  }
  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton onPress={yearlyReport} style={forYearlyReport}>
          Yearly Report
        </BgButton>

        <BgButton onPress={monthlyReport} style={forMonthlyReport}>
          Monthly Report
        </BgButton>
      </View>

      {showYearReport && (
        <View
          style={[
            {
              // Try setting `flexDirection` to `"row"`.
              flex: 0.5,
              flexDirection: "column",
              backgroundColor:'white'
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <View
              style={[
                {
                  // Try setting `flexDirection` to `"row"`.
                  flexDirection: "row",
                  flex: 1,
                },
              ]}
            >
              <View
                style={{
                  flex: 0.4,

                  alignItems: "flex-start",
                  justifyContent: "center",
                  //right: 12,
                  left: 29,
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
              </View>
              <View
                style={{
                  flex: 0.3,

                  justifyContent: "center",
                }}
              >
                <UnderlinedInput
                  value={fromText || moment(FROMDATE).format("YYYY")}
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
          <View style={{ flex: 1 }}>
            <View
              style={[
                {
                  // Try setting `flexDirection` to `"row"`.
                  flexDirection: "row",
                  flex: 1,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={[
                    {
                      // Try setting `flexDirection` to `"row"`.
                      flexDirection: "row",
                      flex: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      flex: 1,

                      alignItems: "flex-start",
                      justifyContent: "center",
                      //right: 12,
                      left: 29,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindRegular",
                        fontSize: 18,
                      }}
                    >
                      Name
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,

                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindRegular",
                        fontSize: 18,
                      }}
                    >
                      {route.params.name}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={[
                    {
                      // Try setting `flexDirection` to `"row"`.
                      flexDirection: "row",
                      flex: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      flex: 1,

                      alignItems: "flex-start",
                      justifyContent: "center",
                      //right: 12,
                      left: 29,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindRegular",
                        fontSize: 18,
                      }}
                    >
                      Reg No
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,

                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindRegular",
                        fontSize: 18,
                      }}
                    >
                      {route.params.regno}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}

      {showYearReport && (
        <View style={{ flex: 1, backgroundColor: "white" }}>
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
        <View
          style={[
            { flex: 1 },
            {
              flexDirection: "column",
             // top:  "18%",
              // paddingHorizontal: 10,
              // marginHorizontal: 10,
            },
          ]}
        >
          <View style={{ flex: 8, bottom: 2 }}>
            <ScrollView>
               {Object.entries(monthlyCount).map(([month, counts]) => (
                  <Pressable onPress={showSingleReport.bind(this, month)}>
                    <View
                      style={[
                        { flex: 1 },
                        {
                          // Try setting `flexDirection` to `"row"`.
                          flexDirection: "row",
                          borderWidth: 1,
                          paddingVertical: 7,
                        },
                      ]}
                    >
                      <View
                        style={{
                          flex: 1,

                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: "HindSemiBold",
                          }}
                        >
                          {monthNames[month]}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,

                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "green",
                            fontSize: 15,
                            fontFamily: "HindSemiBold",
                          }}
                        >
                          {counts.present}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,

                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "red",
                            fontSize: 15,
                            fontFamily: "HindSemiBold",
                          }}
                        >
                          {counts.absent}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
            </ScrollView>
          </View>
        </View>
          </View>
          <View style={{ flex: 0.2 }}>
            <TeachersHome />
          </View>
        </View>
      )}

      {showMonthReport && (
        <View style={[{ flexDirection: "column",backgroundColor:'white' }]}>
          <View style={{}}>
            <View
              style={[
                {
                  // Try setting `flexDirection` to `"row"`.
                  flexDirection: "row",
                  
                },
              ]}
            >
              <View
                style={{
                  flex: 0.4,

                  alignItems: "flex-start",
                  justifyContent: "center",
                  //right: 12,
                  left: 29,
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
              </View>
              <View
                style={{
                  flex: 0.3,

                  justifyContent: "center",
                }}
              >
                <UnderlinedInput
                  value={fromText || moment(FROMDATE).format("YYYY")}
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

          <View
            style={[
                  { flexDirection: "row", marginVertical: 10 },
                  ]}
                >
                  <View style={{ flex: 0.9,left:29,justifyContent:'center' }}>
                    <Text
                      style={{
                        fontFamily: "HindRegular",
                        fontSize: 18,
                       // marginLeft: "11%",
                       // marginTop: "10%",
                      }}
                    >
                      Select Month
                    </Text>
                  </View>
                  <View style={{ flex: 1 ,paddingRight:27}}>
                  <SelectList
               
                      defaultOption={{
                        key: KEY,
                        value: VALUE,
                      }}
                      setSelected={setSelected}
                      data={months}
                      onSelect={viewYearMonthReport}
                      placeholder="Month"
                      save="key"
                      // boxStyles={{backgroundColor:'yellow'}}
                      // dropdownItemStyles={{backgroundColor:'black'}}
                      // dropdownStyles={{backgroundColor:'cyan'}}
                      // dropdownShown={false}
                      dropdownTextStyles={{
                        fontSize: 15,
                        fontFamily: "HindRegular",
                        //backgroundColor:'purple'
                      }}
                      inputStyles={{ fontSize:15, fontFamily: "HindRegular"}}
                    />
                  </View>
                </View>
          {/* <View style={{ left: "7%", top: "15%" }}>
            <Text
              style={{
                fontFamily: "HindRegular",
                fontSize: 18,
              }}
            >
              Name : {""} {""}
              {""} {""} {""} {""}
              {route.params.name}
            </Text>
            <Text
              style={{
                fontFamily: "HindRegular",
                fontSize: 18,
              }}
            >
              Reg No : {""} {""}
              {""} {""}
              {""} {""}
              {route.params.regno}
            </Text>
          </View> */}
          <View style={{marginTop:'10%' }}>
            <View
              style={[
                {
                  // Try setting `flexDirection` to `"row"`.
                  flexDirection: "row",
                  // flex: 1,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={[
                    {
                      // Try setting `flexDirection` to `"row"`.
                      flexDirection: "row",
                     // flex: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      flex: 1,

                      alignItems: "flex-start",
                      justifyContent: "center",
                      //right: 12,
                      left: 29,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindRegular",
                        fontSize: 18,
                      }}
                    >
                      Name
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,

                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindRegular",
                        fontSize: 18,
                      }}
                    >
                      {route.params.name}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={[
                    {
                      // Try setting `flexDirection` to `"row"`.
                      flexDirection: "row",
                      flex: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      flex: 1,

                      alignItems: "flex-start",
                      justifyContent: "center",
                      //right: 12,
                      left: 29,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindRegular",
                        fontSize: 18,
                      }}
                    >
                      Reg No
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,

                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindRegular",
                        fontSize: 18,
                      }}
                    >
                      {route.params.regno}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {showMonthReport && (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View style={[styles.tableHeader,{marginTop:20}]}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.headerText}>Date</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.headerText}>Status</Text>
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
            <View style={{ flex: 8, bottom: 2 }}>
              <ScrollView>
                {Object.entries(dailyAttendance).map(([day, status]) => (
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
                        marginVertical: 7,
                      }}
                    >
                      <Text
                        style={{ fontSize: 15, fontFamily: "HindSemiBold" }}
                      >
                        {day}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,

                        alignItems: "center",
                        marginVertical: 7,
                      }}
                    >
                      <Text
                        style={{
                          color: status === "present" ? "green" : "red",
                          fontSize: 15,
                          fontFamily: "HindSemiBold",
                        }}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
          <View style={{ flex: 0.3 }}>
            <TeachersHome />
          </View>
        </View>
      )}
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
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "#FDFEFE",
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
    width: 50, // or whatever size you need
    height: 10,
  },
  dateLabelSpace: {
    width: 30, // or whatever size you need
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

// function AttendanceReport() {
//   const [attendance, setAttendance] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [dailyAttendance, setDailyAttendance] = useState({});

//   useEffect(() => {
//     // fetch attendance data from the backend
//     fetch('https://your-backend-url.com/attendance')
//       .then(response => response.json())
//       .then(data => setAttendance(data));
//   }, []);

//   const handleMonthSelection = month => {
//     setSelectedMonth(month);

//     // filter the attendance data for the selected month
//     const filteredAttendance = attendance.filter(
//       item => new Date(item.attendance_date).getMonth() === month
//     );

//     //create an object for each day of the month
//     let counts = {};
//     filteredAttendance.map(item => {
//       const date = new Date(item.attendance_date);
//       const day = date.getDate();
//       if (!counts[day]) {
//         counts[day] = item.attendance_status;
//       }
//     });
//     setDailyAttendance(counts);
//   };

//   return (
//     <View>
//       <Picker
//         selectedValue={selectedMonth}
//         onValueChange={month => handleMonthSelection(month)}
//       >
//         {monthNames.map((month, index) => (
//           <Picker.Item key={index} label={month} value={index} />
//         ))}
//       </Picker>
//       <View>
//         {Object.entries(dailyAttendance).map(([day, status]) => (
//             <View key={day}>
//                 <Text>{day}</Text>
//                 <Text>{status}</Text>
//             </View>
//         ))}
//       </View>
//     </View>
//   );
// }
// const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
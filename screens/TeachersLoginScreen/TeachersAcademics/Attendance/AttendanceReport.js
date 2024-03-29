import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { subURL } from "../../../../components/utils/URL's";

import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import moment from "moment";
import SelectList from "react-native-dropdown-select-list";
import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
import BgButton from "../../../../components/UI/BgButton";
import TeachersHome from "../../BottomTab/TeachersHome";
var TOKEN, FROMDATE, firstData, singleReportKey, singleReportValue;
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
  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [forYearlyReport, setForYearlyReport] = useState({
    color: "white",
    backgroundColor: "#1E84A4",
    borderRadius: 5,
  });
  const [forMonthlyReport, setForMonthlyReport] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 5,
  });
  const route = useRoute();
  const [token, setToken] = useState("");
  const [yearReport, setYearReport] = useState([]);
  const [yearMonthReport, setYearMonthReport] = useState([]);
  const [monthlyCount, setMonthlyCount] = useState({});
  const [dailyAttendance, setDailyAttendance] = useState({});
  const [viewSingleReport, setViewSingleReport] = useState(false);

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

  const [showFirstOption, setShowFirstOption] = useState(false);

  async function fetchToken() {
    TOKEN = await AsyncStorage.getItem("token");

    if (TOKEN !== null) {
      setToken(TOKEN);
    }
  }
  fetchToken();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    viewList();
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
            counts[month] = { present: 0, absent: 0, holiday: 0 };
          }
          if (item.attendance_status === "present") {
            counts[month].present++;
          }
          if (item.attendance_status === "absent") {
            counts[month].absent++;
          }
          if (item.attendance_status === "holiday") {
            counts[month].holiday++;
          }
        });
        setMonthlyCount(counts);
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
  }
  const fromDateChangeHandler = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate;
    FROMDATE = selectedFromDate;

    setFromShow(Platform.OS === "ios");

    let tempFromDate = new Date(currentFromDate);

    let year = moment(tempFromDate).format("YYYY");

    let fDate =
      tempFromDate.getDate() +
      "/" +
      (tempFromDate.getMonth() + 1) +
      "/" +
      tempFromDate.getFullYear();

    if (event.type == "set") {
      setFromText(year);
      setShowFirstOption(true);
      viewList();
    } else {
    }
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
      backgroundColor: "#1E84A4",
      color: "white",
      borderRadius: 5,
    });
    setForMonthlyReport({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 5,
    });
  }
  function monthlyReport() {
    setShowYearReport(false);
    setShowMonthReport(true);

    setForMonthlyReport({
      color: "white",
      backgroundColor: "#1E84A4",
      borderRadius: 5,
    });
    setForYearlyReport({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 5,
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

        const filteredAttendance = res.data.filter((item) => {
          const date = new Date(item.attendance_date);
          return date.getMonth() + 1 === parseInt(selected);
        });
        let counts = {};
        filteredAttendance.map((item) => {
          const date = new Date(item.attendance_date);
          const day = date.getDate();

          if (!counts[day]) {
            counts[day] = item.attendance_status;
          }
        });
        setDailyAttendance(counts);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }
  function showSingleReport(month) {
    var parsedResult = (parseInt(month) + 1).toString().padStart(2, "0");
    let filteredlist = months.filter((ele) => ele.key == parsedResult);

    singleReportKey = filteredlist[0].key;
    singleReportValue = filteredlist[0].value;

    setViewSingleReport(true);
    setShowMonthReport(true);
    setShowYearReport(false);
    setForMonthlyReport({
      color: "white",
      backgroundColor: "#1E84A4",
      borderRadius: 5,
    });
    setForYearlyReport({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 5,
    });

    const request_model = {
      student_id: route.params.id,
      yearMonth: moment(FROMDATE).format("YYYY") + "-" + parsedResult,
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

        const filteredAttendance = res.data.filter((item) => {
          const date = new Date(item.attendance_date);
          return date.getMonth() + 1 === parseInt(month) + 1;
        });
        let counts = {};
        filteredAttendance.map((item) => {
          const date = new Date(item.attendance_date);
          const day = date.getDate();

          if (!counts[day]) {
            counts[day] = item.attendance_status;
          }
        });
        setDailyAttendance(counts);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }
  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton onPress={yearlyReport} style={forYearlyReport}>
          Yearly report
        </BgButton>

        <BgButton onPress={monthlyReport} style={forMonthlyReport}>
          Monthly report
        </BgButton>
      </View>

      {showYearReport && (
        <View
          style={[
            {
              flex: 0.5,
              flexDirection: "column",
              backgroundColor: "white",
            },
          ]}
        >
          <View style={styles.flexOne}>
            <View
              style={[
                {
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

                  left: 29,
                }}
              >
                <Text style={styles.heading}>Select Year -</Text>
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
                  blur={fromDateBlurHandler}
                  onSubmitEditing={Keyboard.dismiss}
                  onFocus={onFocusFromHandler}
                  onChangeText={frmDateHandler}
                  onPressIn={() => showFromMode("date")}
                />

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
          <View style={styles.flexOne}>
            <View
              style={[
                {
                  flexDirection: "row",
                  flex: 1,
                },
              ]}
            >
              <View style={styles.flexOne}>
                <View
                  style={[
                    {
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

                      left: 29,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindSemiBold",
                        fontSize: 17,
                      }}
                    >
                      Name :
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
                        fontFamily: "HindMedium",
                        fontSize: 17,
                      }}
                    >
                      {route.params.name}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flexOne}>
                <View
                  style={[
                    {
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

                      left: 29,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindSemiBold",
                        fontSize: 17,
                      }}
                    >
                      Reg No :
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
                        fontFamily: "HindMedium",
                        fontSize: 17,
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
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.headerText}>Holiday</Text>
            </View>
          </View>

          <View
            style={[
              { flex: 1 },
              {
                flexDirection: "column",

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
                },
              ]}
            >
              <View style={{ flex: 8, bottom: 2 }}>
                {Object.entries(monthlyCount).length <= 0 && (
                  <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <Text style={styles.errText}>No Data found</Text>
                  </View>
                )}
                <ScrollView>
                  {Object.entries(monthlyCount).map(([month, counts]) => (
                    <TouchableHighlight
                      onPress={showSingleReport.bind(this, month)}
                      underlayColor="#E5E7E9"
                    >
                      <View
                        style={[
                          { flex: 1 },
                          {
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
                              fontSize: 17,
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
                              fontSize: 17,
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
                              fontSize: 17,
                              fontFamily: "HindSemiBold",
                            }}
                          >
                            {counts.absent}
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
                              color: "#D4AC0D",
                              fontSize: 17,
                              fontFamily: "HindSemiBold",
                            }}
                          >
                            {counts.holiday}
                          </Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 0.3 }}>
              <TeachersHome />
            </View>
          )}
        </View>
      )}

      {showMonthReport && (
        <View style={[{ flexDirection: "column", backgroundColor: "white" }]}>
          <View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 0.4,

                  alignItems: "flex-start",
                  justifyContent: "center",

                  left: 29,
                }}
              >
                <Text style={styles.heading}>Select Year</Text>
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
                  blur={fromDateBlurHandler}
                  onFocus={onFocusFromHandler}
                  onSubmitEditing={Keyboard.dismiss}
                  onChangeText={frmDateHandler}
                  onPressIn={() => showFromMode("date")}
                />

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

          {!viewSingleReport && (
            <View style={[{ flexDirection: "row", marginVertical: 10 }]}>
              <View style={{ flex: 0.9, left: 29, justifyContent: "center" }}>
                <Text
                  style={{
                    fontFamily: "HindSemiBold",
                    fontSize: 17,
                  }}
                >
                  Select Month
                </Text>
              </View>
              <View style={{ flex: 1, paddingRight: 27 }}>
                <SelectList
                  setSelected={setSelected}
                  data={months}
                  onSelect={viewYearMonthReport}
                  placeholder="Month"
                  save="key"
                  dropdownTextStyles={{
                    fontSize: 15,
                    fontFamily: "HindMedium",
                  }}
                  inputStyles={{ fontSize: 15, fontFamily: "HindMedium" }}
                />
              </View>
            </View>
          )}

          {viewSingleReport && (
            <View style={[{ flexDirection: "row", marginVertical: 10 }]}>
              <View style={{ flex: 0.9, left: 29, justifyContent: "center" }}>
                <Text
                  style={{
                    fontFamily: "HindSemiBold",
                    fontSize: 18,
                  }}
                >
                  Select Month
                </Text>
              </View>
              <View style={{ flex: 1, paddingRight: 27 }}>
                <SelectList
                  defaultOption={
                    !showFirstOption
                      ? {
                          key: singleReportKey,
                          value: singleReportValue,
                        }
                      : {
                          key: "",
                          value: "",
                        }
                  }
                  setSelected={setSelected}
                  data={months}
                  onSelect={viewYearMonthReport}
                  placeholder="Month"
                  dropdownTextStyles={{
                    fontSize: 15,
                    fontFamily: "HindMedium",
                  }}
                  inputStyles={{ fontSize: 15, fontFamily: "HindMedium" }}
                />
              </View>
            </View>
          )}

          <View style={{ marginTop: "10%" }}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={styles.flexOne}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 1,

                      alignItems: "flex-start",
                      justifyContent: "center",

                      left: 29,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindSemiBold",
                        fontSize: 17,
                      }}
                    >
                      Name :
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
                        fontFamily: "HindMedium",
                        fontSize: 17,
                      }}
                    >
                      {route.params.name}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      flex: 1,

                      alignItems: "flex-start",
                      justifyContent: "center",

                      left: 29,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindSemiBold",
                        fontSize: 17,
                      }}
                    >
                      Reg No :
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
                        fontFamily: "HindMedium",
                        fontSize: 17,
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
          <View
            style={[
              styles.tableHeader,
              {
                marginTop: 20,
                flex: keyboardStatus == "Keyboard Hidden" ? 0.1 : 0.2,
              },
            ]}
          >
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

                paddingHorizontal: 10,
                marginHorizontal: 10,
              },
            ]}
          >
            <View style={{ flex: 8, bottom: 2 }}>
              {Object.entries(dailyAttendance).length <= 0 && (
                <View style={{ alignItems: "center", marginVertical: 10 }}>
                  <Text style={styles.errText}>No Data found</Text>
                </View>
              )}
              <ScrollView>
                {Object.entries(dailyAttendance).map(([day, status]) => (
                  <View
                    style={[
                      { flex: 1 },
                      {
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
                        style={{ fontSize: 17, fontFamily: "HindSemiBold" }}
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
                          color:
                            status === "present"
                              ? "green"
                              : status === "absent"
                              ? "red"
                              : "#D4AC0D",
                          fontSize: 17,
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
          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 0.3 }}>
              <TeachersHome />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default AttendanceReport;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "#FDFEFE",
  },
  errText: {
    fontFamily: "HindSemiBold",
    fontSize: 18,
    color: "#6B0202",
  },
  tableHeader: {
    flex: 0.1,
    flexDirection: "row",
    borderWidth: 1,
    marginHorizontal: 20,
    backgroundColor: "#1E84A4",
  },

  headerText: {
    fontFamily: "HindBold",
    fontSize: 16,
    color: "white",
  },
  flexOne: {
    flex: 1,
  },
  heading: {
    fontFamily: "HindSemiBold",
    fontSize: 17,
    top: "3%",
  },
});

import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Button as Btn,
  Alert,
  Dimensions,
  TouchableHighlight,
  Animated,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Input from "../../../components/UI/Input";
import { Keyboard } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";
import TeachersHome from "../BottomTab/TeachersHome";
import Button from "../../../components/UI/Button";
import { Card, DataTable } from "react-native-paper";
import moment from "moment";
import SearchBar from "react-native-dynamic-search-bar";
import UnderlinedInput from "../../../components/UI/UnderlinedInput";
import { Badge, Button as NativeBtn, HStack, IconButton } from "native-base";
import { subURL } from "../../../components/utils/URL's";
import { useNavigation } from "@react-navigation/native";
import { Text as NativeText } from "native-base";
export var ID;
export var FROMDATE, TODATE;
const TecahersExamTimeTable = () => {
  const navigation = useNavigation();
  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, 80);

  const headermax = 80;
  const headermin = 10;

  const animateHeaderBackGround = scrollY.interpolate({
    inputRange: [0, headermax - headermin],
    outputRange: ["white", "white"],
    extrapolate: "clamp",
  });

  const animateHeaderHeight = diffClamp.interpolate({
    inputRange: [0, headermax - headermin],
    outputRange: [headermax, headermin],
    extrapolate: "clamp",
  });
  const [examLabel, setExamLabel] = useState(false);
  const [totalLabel, setTotalLabel] = useState(false);
  const [hourLabel, setHourLabel] = useState(false);

  const [btn, subBtn] = useState(false);
  const [isExamnameFocused, setIsExamnameFocused] = useState(false);
  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(false);
  const [isTotalmarkFocused, setIsTotalmarkFocused] = useState(false);
  const [isHourFocused, setIsHourFocused] = useState(false);

  const [selectedExamTimeTable, setSelectedExamTimeTable] = useState("");
  const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
  const enteredSelcetdIsValid = selectedExamTimeTable.trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

  const [datemode, setDateMode] = useState("date");
  const [ExamTimeTableData, setExamTimeTableData] = useState([]);

  const [examName, setEnteredExamName] = useState("");
  const [enteredExamNameTouched, setEnteredExamNameTouched] = useState(false);
  const enteredExamNameIsValid = examName.trim() !== "";
  const selectExamNameIsInValid =
    !enteredExamNameIsValid && enteredExamNameTouched;

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText.trim() !== "";
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;

  const [toText, setToText] = useState("");
  const [enteredtoDateTouched, setEnteredtoDateTouched] = useState(false);
  const enteredtoDateIsValid = toText.trim() !== "";
  const toDateInputIsInValid = !enteredtoDateIsValid && enteredtoDateTouched;

  const [totalMarks, setEnteredTotalMarks] = useState("");
  const [enteredMarksTouched, setEnteredMarksTouched] = useState(false);
  const enteredMarksIsValid = totalMarks;
  const marksInputIsInValid = !enteredMarksIsValid && enteredMarksTouched;

  const [hour, setEnteredHour] = useState("");
  const [enteredHourTouched, setEnteredHourTouched] = useState(false);
  const enteredHourIsValid = hour.trim() !== "";
  const hourInputIsInValid = !enteredHourIsValid && enteredHourTouched;

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  const [showform, setShowForm] = useState(false);
  const [showExamList, setShowExamList] = useState(true);
  const [showExamData, setShowExamData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showaddBtn, setShowAddBtn] = useState(true);

  const [showInitialBtn, setShowInitialBtn] = useState(true);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const [showBtn, setShowBtn] = useState(true);
  const [selected, setSelected] = useState("");
  const [studData, setStudData] = useState([]);

  const [studList, setStudList] = useState([]);

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
    axios
      .get(`${subURL}/Studentclass/`)
      .then((response) => {
        let newArray = response.data.map((item) => {
          return {
            value: item.class_name,
          };
        });

        setStudData(newArray);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    async function viewExamList() {
      try {
        const res = await axios.get(`${subURL}/Exam/`);

        setShowExamData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    viewExamList();
  }, []);

  useEffect(() => {
    axios
      .get(`${subURL}/Studentclass/`)
      .then((response) => {
        let newArray = response.data.map((item) => {
          return {
            value: item.class_name + " - " + item.section,
          };
        });

        setExamTimeTableData(newArray);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function updateHandler() {
    let selectedData = selectedExamTimeTable.split(" - ");
    let class_name = selectedData[0];
    let section = selectedData[1];
    const FormData = {
      exam_name: examName,
      start_date: FROMDATE,
      end_date: TODATE,
      Total_marks: totalMarks,
      hour: hour,
      //class_name: class_name,
    };

    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const dataForm = FormData;
        const resLogin = await axios.put(`${subURL}/Exam/${ID}/`, dataForm, {
          headers: headers,
        });
        const token = resLogin.data.token;
        const userId = resLogin.data.user_id;

        // Token = token;
        // UserId = userId;
      } catch (error) {
        console.log(error);
      }
    }
    storeData();

    // if (
    //   !enteredExamNameIsValid ||
    //   !enteredMarksIsValid ||
    //   !enteredHourIsValid
    // ) {
    //   Alert.alert("Please enter all fields", "", [{ text: "OK" ,
    //   onPress:()=>{
    //     // setShowExamList(false);
    //     // setShowForm(true);
    //     return;
    //   }
    // }]);

    if (
      !enteredExamNameIsValid ||
      !enteredMarksIsValid ||
      !enteredHourIsValid
    ) {
      Alert.alert("Please enter all fields");
    } else {
      setShowExamList(true);
      setShowForm(false);
      setShowAddBtn(true);
      Alert.alert("Successfully updated", "", [
        {
          text: "OK",
          onPress: () => {
            fetchData();
          },
        },
      ]);
    }

    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Exam/`);
        setShowExamData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    // setEnteredExamName("");
    // setFromText("");
    // setToText("");
    // setEnteredTotalMarks("");
    // setEnteredHour("");
    // setShowExamList(false);
    // setShowForm(true);
    // setShowAddBtn(true)
  }
  function addExamTimeTableHandler() {
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
    subBtn(true);

    let selectedData = selectedExamTimeTable.split(" - ");
    let class_name = selectedData[0];
    let section = selectedData[1];
    const FormData = {
      exam_name: examName,
      start_date: FROMDATE,
      end_date: TODATE,
      Total_marks: totalMarks,
      hour: hour,
      class_name: class_name,
    };

    setEnteredExamNameTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredMarksTouched(true);
    setEnteredHourTouched(true);
    setEnteredSelectedTouched(true);

    const formIsValid =
      enteredExamNameIsValid &&
      enteredFromDateIsValid &&
      enteredtoDateIsValid &&
      enteredHourIsValid;

    if (formIsValid) {
      Alert.alert("Saved Data", "Saved Data successfully", [
        {
          text: "OK",
          onPress: () => {
            setShowForm(false);
            viewExamList();
          },
        },
      ]);
    }

    if (!enteredExamNameTouched) {
      return;
    }
    if (!enteredFromDateIsValid) {
      return;
    }
    if (!enteredtoDateIsValid) {
      return;
    }
    if (!enteredHourIsValid) {
      return;
    }
    if (!enteredMarksIsValid) {
      return;
    }
    if (!enteredSelcetdIsValid) {
      return;
    } else {
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const dataForm = FormData;
          const resLogin = await axios.post(`${subURL}/Exam/`, dataForm, {
            headers: headers,
          });
          const token = resLogin.data.token;
          const userId = resLogin.data.user_id;

          // Token = token;
          // UserId = userId;
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      storeData();

      setEnteredExamName("");
      setFromText("");
      setToText("");
      setEnteredTotalMarks("");
      setEnteredHour("");
      setEnteredExamNameTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
      setEnteredMarksTouched(false);
      setEnteredHourTouched(false);
      setEnteredSelectedTouched(false);
      setShowExamList(true);
      setShowForm(false);
      setShowAddBtn(true);
    }
  }
  function examNameChangeHandler(enteredValue) {
    setEnteredExamName(enteredValue);
  }

  function totalMarksChangeHandler(enteredValue) {
    setEnteredTotalMarks(enteredValue);
  }
  function hourChangeHandler(enteredValue) {
    setEnteredHour(enteredValue);
  }
  function classNameChangeHandler(enteredValue) {
    setEnteredClassName(enteredValue);
  }

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  const showToMode = (currentToMode) => {
    setToShow(true);

    setDateMode(currentToMode);
  };
  const fromDateChangeHandler = (event, selectedFromDate) => {
    FROMDATE = selectedFromDate;
    const currentFromDate = selectedFromDate;
    setFromShow(Platform.OS === "ios");
    setFromDate(currentFromDate);

    let tempFromDate = new Date(currentFromDate);
    let fDate =
      tempFromDate.getDate() +
      "/" +
      (tempFromDate.getMonth() + 1) +
      "/" +
      tempFromDate.getFullYear();
    if (event.type == "set") {
      setFromText(fDate);
    }
  };

  const toDateChangeHandler = (event, selectedToDate) => {
    const currentToDate = selectedToDate;
    TODATE = selectedToDate;
    setToShow(Platform.OS === "ios");
    setToDate(currentToDate);

    let tempToDate = new Date(currentToDate);
    let tDate =
      tempToDate.getDate() +
      "/" +
      (tempToDate.getMonth() + 1) +
      "/" +
      tempToDate.getFullYear();
    if (event.type == "set") {
      setToText(tDate);
    }
  };

  function viewExam() {
    setShowBtn(false);
    setExamLabel(false);
    setTotalLabel(false);
    setHourLabel(false);
    setShowAddBtn(false);
    setShowForm(true);
    setShowExamList(false);
    setEnteredExamName("");
    setFromText("");
    setToText("");
    setEnteredTotalMarks("");
    setEnteredHour("");
    setEnteredExamNameTouched(false);
    setEnteredFromDateTouched(false);
    setEnteredtoDateTouched(false);
    setEnteredMarksTouched(false);
    setEnteredHourTouched(false);
    setEnteredSelectedTouched(false);
    setIsEdit(false);
  }

  function viewExamList() {
    setLoading(true);
    async function viewExamList() {
      try {
        const res = await axios.get(`${subURL}/Exam/`);

        setShowExamData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    viewExamList();
    setShowForm(false);
    setShowExamList(true);
  }

  function examBlurHandler() {
    setEnteredExamNameTouched(true);
    setIsExamnameFocused(false);
  }
  function onExamnameFocusHandler() {
    setIsExamnameFocused(true);
    setEnteredExamNameTouched(false);
    setExamLabel(true);
  }

  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
    setIsFromFocused(false);
  }
  function onFromFocusHandler() {
    setIsFromFocused(true);
    setEnteredFromDateTouched(false);
  }

  function toDateBlurHanlder() {
    setEnteredtoDateTouched(true);
  }
  function onToFocusHandler() {
    setIsToFocused(true);
    setEnteredtoDateTouched(false);
  }

  function markBlurHanlder() {
    setEnteredMarksTouched(true);
    setIsTotalmarkFocused(false);
  }
  function onMarkFocusHandler() {
    setIsTotalmarkFocused(true);
    setEnteredMarksTouched(false);
    setTotalLabel(true);
  }

  function hourBlurHanlder() {
    setEnteredHourTouched(true);
    setIsHourFocused(false);
  }
  function onHourFocusHandler() {
    setIsHourFocused(true);
    setEnteredHourTouched(false);
    setHourLabel(true);
  }

  function cancelHandler() {
    setShowAddBtn(true);
    setShowExamList(true);
    setShowForm(false);
    setShowBtn(true);
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = showExamData.filter((item) => {
        const itemData = item.exam_name
          ? item.exam_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      setFilteredData(showExamData);
      setSearchText(text);
    }
  };

  function viewExamList() {
    async function login() {
      let selectedData = selected.split(" - ");
      let class_name = selectedData[0];
      let section = selectedData[1];
      try {
        const res = await axios.get(`${subURL}/Exam/`);

        let filteredclass = res.data.filter(
          (ele) => ele.class_name == class_name
        );

        let filteredsection = res.data.filter((ele) => ele.section == section);

        const filteredList = filteredclass;

        let filteredc = filteredList.filter(
          (ele) => ele.class_name == class_name
        );

        if (filteredc) {
          setStudList(filteredc);
          setFilteredData(filteredc);
        }
      } catch (error) {
        console.log(error);
      }
    }
    login();
  }

  function navigateHandler(id) {
    ID = id;

    let fetchedData = [];
    const fetchData = filteredData.find((data) => data.id == id);

    async function viewExamList() {
      try {
        const res = await axios.get(`${subURL}/AddmoreExam_list_by_exam/${ID}`);
        fetchedData = res.data;

        if (fetchedData.length > 0) {
          navigation.navigate("ExamSubjects", {
            className: fetchData.class_name,
            examName: fetchData.exam_name,
            hour: fetchData.hour,
          });
        } else {
          Alert.alert("No exam timetable scheduled for selected class");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    viewExamList();
  }
  return (
    <>
      {/* {showaddBtn && (
        <Animated.View
          style={[
            {
              height: animateHeaderHeight,
              backgroundColor: animateHeaderBackGround,
            },
          ]}
        >
          <View style={styles.timetablebtn}>
            <IconButton
              colorScheme="blue"
              onPress={viewExam}
              variant="solid"
              _icon={{
                as: Ionicons,
                name: "add",
              }}
            />
          </View>
        </Animated.View>
      )} */}

      {showBtn && (
        <>
          <View
            style={[
              {
                //width: 170,
                fontSize: 20,
                // marginTop: 13,
                margin: 10,
                left: 20,
                marginTop: "4%",
                flexDirection: "row",
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "HindSemiBold",
                fontSize: 17,
                top: "3%",
                marginLeft: 10,
              }}
            >
              Select class
            </Text>
            <View style={styles.space} />
            <View style={styles.space} />
            <Text
              style={{
                fontFamily: "HindBold",
                fontSize: 20,
                top: "3%",
                right: "2%",
              }}
            >
              -
            </Text>
            <View style={styles.space} />
            <SelectList
              //  defaultOption={{ key: "1", value: "Second-A" }}
              setSelected={setSelected}
              data={studData}
              placeholder="Select class"
              onSelect={viewExamList}
              boxStyles={{ borderRadius: 10 }}
              dropdownTextStyles={{ fontSize: 15, fontFamily: "HindRegular" }}
              inputStyles={{ fontSize: 15, fontFamily: "HindRegular" }}
              //  dropdownStyles={{width:'120%'}}
            />
          </View>
          {/* <View
            style={{
              width: "45%",
              //  marginTop: -93,
              marginLeft: 200,
              position: "absolute",
              top: 65,
            }}
          >
            <Button onPress={viewExamList}>View List</Button>
          </View> */}
        </>
      )}
      {showExamList && (
        <>
          {filteredData.length > 0 && (
            <View style={{ backgroundColor: "white", marginVertical: 10 }}>
              <SearchBar
                onSubmitEditing={Keyboard.dismiss}
                style={styles.searchBar}
                textInputStyle={{
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
                placeholder="Search here"
                onChangeText={(text) => searchFilter(text)}
                value={searchText}
              />
            </View>
          )}
          <View
            style={[
              { flex: 1 },
              { flexDirection: "column", backgroundColor: "white" },
            ]}
          >
            <View style={{ flex: 8, bottom: 10 }}>
              <ScrollView
                scrollEventThrottle={15}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: false }
                )}
              >
                {filteredData.length > 0 ? (
                  <View style={styles.root}>
                    {loading ? (
                      <HStack
                        space={8}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <ActivityIndicator
                          size="large"
                          visible={loading}
                          textContent={"Loading..."}
                        />
                      </HStack>
                    ) : (
                      filteredData.map((data, key) => (
                        <>
                          <Pressable
                            onPress={navigateHandler.bind(this, data.id)}
                          >
                            <Card
                              style={{
                                marginTop: 20,
                                marginVertical: 1,
                                marginHorizontal: 20,
                                elevation: 5,
                                borderRadius: 10,
                              }}
                              key={key}
                            >
                              <Card.Content>
                                <View
                                  style={[
                                    { flex: 1 },
                                    { flexDirection: "row" },
                                  ]}
                                >
                                  <View style={{ flex: 2 }}>
                                    <View
                                      style={[
                                        { flex: 1 },
                                        { flexDirection: "column", top: "10%" },
                                      ]}
                                    >
                                      <View
                                        style={{
                                          flex: 2,
                                          paddingHorizontal: 10,
                                          right: "4%",
                                        }}
                                      >
                                        <Text
                                          style={[
                                            styles.cardTextStyle,
                                            {
                                              color: "black",
                                              fontFamily: "HindBold",
                                              fontSize:
                                                deviceWidth < 370 ? 14 : 16,
                                            },
                                          ]}
                                        >
                                          {moment(data.start_date).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          left: "36%",
                                          position: "absolute",
                                          top: "24%",
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontFamily: "HindRegular",
                                            fontSize: 18,
                                            color: "grey",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          to
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flex: 2,
                                          paddingHorizontal: 10,
                                          right: "4%",
                                        }}
                                      >
                                        <Text
                                          style={[
                                            styles.cardTextStyle,
                                            {
                                              color: "black",
                                              fontSize:
                                                deviceWidth < 370 ? 14 : 16,
                                            },
                                          ]}
                                        >
                                          {moment(data.end_date).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ flex: 2 }}>
                                    <Text
                                      style={[
                                        styles.cardTextStyle,
                                        { marginVertical: 5 },
                                      ]}
                                    >
                                      Class name
                                    </Text>
                                    <Text
                                      style={[
                                        styles.cardTextStyle,
                                        { marginVertical: 5 },
                                      ]}
                                    >
                                      Exam name
                                    </Text>
                                    <Text
                                      style={[
                                        styles.cardTextStyle,
                                        { marginVertical: 5 },
                                      ]}
                                    >
                                      Total marks
                                    </Text>
                                    <Text
                                      style={[
                                        styles.cardTextStyle,
                                        { marginVertical: 5 },
                                      ]}
                                    >
                                      Hour
                                    </Text>
                                  </View>
                                  <View style={{ flex: 2 }}>
                                    <Text
                                      style={[
                                        [
                                          styles.cardTextStyle,
                                          { marginVertical: 5 },
                                        ],
                                        {
                                          color: "grey",
                                          fontSize: deviceWidth < 370 ? 14 : 16,
                                        },
                                      ]}
                                    >
                                      {data.class_name}
                                    </Text>
                                    <Text
                                      style={[
                                        [
                                          styles.cardTextStyle,
                                          { marginVertical: 5 },
                                        ],
                                        {
                                          width: "120%",
                                          color: "grey",
                                          fontSize: deviceWidth < 370 ? 14 : 16,
                                        },
                                      ]}
                                    >
                                      {data.exam_name}
                                    </Text>
                                    <Text
                                      style={[
                                        [
                                          styles.cardTextStyle,
                                          { marginVertical: 5 },
                                        ],
                                        {
                                          color: "grey",
                                          fontSize: deviceWidth < 370 ? 14 : 16,
                                        },
                                      ]}
                                    >
                                      {data.Total_marks}
                                    </Text>

                                    <Text
                                      style={[
                                        [
                                          styles.cardTextStyle,
                                          { marginVertical: 5 },
                                        ],
                                        {
                                          color: "grey",
                                          fontSize: deviceWidth < 370 ? 14 : 16,
                                        },
                                      ]}
                                    >
                                      {data.hour}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={[
                                    { flex: 1 },
                                    {
                                      flexDirection: "row",
                                      left: "100%",
                                      //  top: "2%",
                                    },
                                  ]}
                                ></View>
                              </Card.Content>
                            </Card>
                          </Pressable>
                        </>
                      ))
                    )}
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "9%",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindSemiBold",
                        fontSize: 18,
                        color: "#6B0202",
                      }}
                    >
                      No exam timetable found
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
            {keyboardStatus == "Keyboard Hidden" && (
              <View style={{ flex: 1.2 }}>
                <TeachersHome />
              </View>
            )}
          </View>
        </>
      )}

      {showform && (
        <>
          <ScrollView>
            <View style={styles.inputForm}>
              {!isEdit && (
                <Text style={[styles.labels, { marginLeft: 20 }]}>
                  Class Name
                </Text>
              )}
              {!isEdit && (
                <View
                  style={{
                    width: 250,
                    fontSize: 18,
                    marginTop: 3,
                    marginLeft: 20,
                  }}
                >
                  <SelectList
                    setSelected={setSelectedExamTimeTable}
                    data={ExamTimeTableData}
                    placeholder="select class"
                    style={{ fontSize: deviceWidth < 370 ? 14 : 18 }}
                    boxStyles={[
                      selectInputIsInValid && styles.errorSelectedColor,
                      { borderRadius: 0 },
                    ]}
                    inputStyles={{ fontSize: 15, fontFamily: "HindRegular" }}
                    dropdownTextStyles={{
                      fontSize: deviceWidth < 370 ? 14 : 15,
                      fontFamily: "HindRegular",
                    }}
                  />
                  {selectInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>Enter class</Text>
                  )}
                </View>
              )}
              <View>
                <View style={!examLabel ? styles.normal : styles.up}>
                  <Text
                    style={[
                      btn
                        ? styles.normalLabel
                        : selectExamNameIsInValid
                        ? styles.errorLabel
                        : styles.normalLabel,
                    ]}
                    onPress={onExamnameFocusHandler}
                  >
                    Exam name
                  </Text>
                </View>
                <Input
                  style={
                    isExamnameFocused
                      ? styles.focusStyle
                      : selectExamNameIsInValid && styles.errorBorderColor
                  }
                  onChangeText={examNameChangeHandler}
                  value={examName}
                  blur={examBlurHandler}
                  onFocus={onExamnameFocusHandler}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
              {selectExamNameIsInValid && (
                <Text style={styles.commonErrorMsg}>Enter exam name</Text>
              )}
              <View
                style={[
                  styles.container,
                  {
                    // Try setting `flexDirection` to `"row"`.
                    flexDirection: "row",
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Ionicons
                      style={{
                        position: "absolute",
                        top: 15,
                      }}
                      name="calendar"
                      size={24}
                      color="black"
                      onPress={() => showFromMode("date")}
                    />
                  </View>
                  <UnderlinedInput
                    value={fromText}
                    placeholder="From Date"
                    blur={fromDateBlurHandler}
                    onFocus={onFromFocusHandler}
                    style={
                      isFromFocused
                        ? styles.focusStyle
                        : fromDateInputIsInValid && styles.errorBorderColorDate
                    }
                    onChangeText={fromDateChangeHandler}
                    onPressIn={() => showFromMode("date")}
                  />
                  {fromDateInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>select from date</Text>
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
                <View style={styles.space} />

                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Ionicons
                      style={{
                        position: "absolute",
                        top: 20,
                      }}
                      name="calendar"
                      size={24}
                      color="black"
                      onPress={() => showToMode("date")}
                    />
                  </View>
                  <UnderlinedInput
                    value={toText}
                    placeholder="To Date"
                    blur={toDateBlurHanlder}
                    onFocus={onToFocusHandler}
                    style={
                      isToFocused
                        ? styles.focusStyle
                        : toDateInputIsInValid && styles.errorBorderColorDate
                    }
                    onPressIn={() => showToMode("date")}
                  />
                  {toDateInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>select to date</Text>
                  )}
                  {toShow && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={toDate}
                      mode={tomode}
                      is24Hour={true}
                      display="default"
                      onChange={toDateChangeHandler}
                      //  minimumDate={fromDate}
                    />
                  )}
                </View>
              </View>
              <View>
                {/* <View style={btn ? styles.topLabelExtra :(!totalLabel ? styles.normalTotal : styles.upTotal)}>
              <Text 
              style={[marksInputIsInValid ? styles.errorLabel : styles.normalLabel]}
              onPress={onMarkFocusHandler}>Total marks</Text>
            </View> */}
                <View style={!totalLabel ? styles.normalTotal : styles.upTotal}>
                  <Text
                    style={
                      btn
                        ? styles.normalLabel
                        : [
                            marksInputIsInValid
                              ? styles.errorLabel
                              : styles.normalLabel,
                          ]
                    }
                    onPress={onMarkFocusHandler}
                  >
                    Total marks
                  </Text>
                </View>
                <Input
                  onChangeText={totalMarksChangeHandler}
                  value={totalMarks.toString()}
                  style={
                    isTotalmarkFocused
                      ? styles.focusStyle
                      : marksInputIsInValid && styles.errorBorderColor
                  }
                  onSubmitEditing={Keyboard.dismiss}
                  blur={markBlurHanlder}
                  onFocus={onMarkFocusHandler}
                />
              </View>
              {marksInputIsInValid && (
                <Text style={styles.commonErrorMsg}>Enter total marks</Text>
              )}
              <View>
                <View style={!hourLabel ? styles.normalHour : styles.upHour}>
                  <Text
                    style={
                      btn
                        ? styles.normalLabel
                        : [
                            hourInputIsInValid
                              ? styles.errorLabel
                              : styles.normalLabel,
                          ]
                    }
                    onPress={onHourFocusHandler}
                  >
                    Hour
                  </Text>
                </View>
                <Input
                  onChangeText={hourChangeHandler}
                  value={hour}
                  style={
                    isHourFocused
                      ? styles.focusStyle
                      : hourInputIsInValid && styles.errorBorderColor
                  }
                  onSubmitEditing={Keyboard.dismiss}
                  blur={hourBlurHanlder}
                  onFocus={onHourFocusHandler}
                />
              </View>
              {hourInputIsInValid && (
                <Text style={styles.commonErrorMsg}>Enter hour</Text>
              )}

              {!isEdit && (
                <View style={styles.btnSubmit}>
                  <Button onPress={addExamTimeTableHandler}>Add</Button>
                </View>
              )}
              {!isEdit && (
                <View style={styles.cancel}>
                  <Button onPress={cancelHandler}>Cancel</Button>
                </View>
              )}
              {isEdit && (
                <View style={styles.btnSubmit1}>
                  <Button onPress={updateHandler}>Update</Button>
                </View>
              )}

              {isEdit && (
                <View style={styles.cancel}>
                  <Button onPress={cancelHandler}>Cancel</Button>
                </View>
              )}
            </View>
          </ScrollView>
          {keyboardStatus == "Keyboard Hidden" && <TeachersHome />}
        </>
      )}
      {/* {keyboardStatus == "Keyboard Hidden" && (
        <View style={styles.home}>
          <TeachersHome />
        </View>
      )} */}
    </>
  );
};

export default TecahersExamTimeTable;

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
    fontSize: 24,
    marginHorizontal: 10,
  },

  title: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: -10,
  },
  root: {
    backgroundColor: "#EBECFO",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  inputStyle: {
    color: "black",
    borderWidth: 2,
    borderColor: "lightgrey",
    backgroundColor: "white",
    padding: 10,
    // paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
    //margin: 5,
  },
  labels: {
    margin: 5,
    fontFamily: "HindRegular",
    fontSize: 18,
    // marginTop: 17,
  },
  btnSubmit: {
    marginTop: 27,
    marginBottom: 59,
    width: "50%",
    marginLeft: 190,
  },
  btnSubmit1: {
    marginTop: 29,
    marginBottom: 59,
    width: "50%",
    marginLeft: 200,
  },
  cancel: {
    marginTop: -165,
    marginBottom: 40,
    marginLeft: -15,
    width: "50%",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  timetablebtn: {
    width: "15%",
    marginLeft: deviceWidth < 370 ? 260 : 310,
    marginTop: 10,
  },

  container: {
    padding: 10,
  },
  type: {
    marginLeft: 10,
  },
  th: {
    padding: 5,
    marginRight: 13,
    //fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 50,
    fontWeight: "bold",
  },
  tableTitle: {
    // padding: 5,
    margin: 7,
    fontFamily: "MonsterratBold",
    fontSize: 16,
  },
  tableCell: {
    width: 40,
    //  fontFamily: "Montserrat_600SemiBold",
    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  errorBorderColor: {
    borderColor: "red",
  },
  errorSelectedColor: {
    borderColor: "red",
  },
  headingStyle: {
    left: "20%",
    color: "purple",
  },
  stopStyle: {
    fontWeight: "bold",
    fontSize: deviceWidth < 370 ? 18 : 20,
    left: "20%",
  },
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: deviceWidth < 370 ? 14 : 16,
  },
  submit: {
    padding: "3%",
    backgroundColor: "#00B8AC",
    borderRadius: 10,
    borderWidth: 1,
    top: "10%",
    borderColor: "#fff",
    // left:'10%',
    width: deviceWidth < 370 ? "50%" : "50%",
  },
  delete: {
    padding: "3%",
    backgroundColor: "red",
    borderRadius: 10,
    borderWidth: 1,
    top: "10%",
    borderColor: "#fff",
    width: deviceWidth < 370 ? "50%" : "50%",
  },
  focusStyle: {
    borderColor: "blue",
  },

  normal: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 28,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },
  up: {
    top: deviceWidth < 370 ? 15 : 25,
    width: deviceWidth > 400 ? 100 : 100,
    left: deviceWidth < 370 ? 20 : 30,
  },

  normalTotal: {
    position: "absolute",
    top: deviceWidth < 370 ? 22 : 27,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upTotal: {
    top: deviceWidth < 370 ? 15 : 25,
    width: deviceWidth > 400 ? 110 : 95,
    left: deviceWidth < 370 ? 20 : 30,
  },

  normalHour: {
    position: "absolute",
    top: deviceWidth < 370 ? 22 : 25,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upHour: {
    top: deviceWidth < 370 ? 14 : 24,
    width: 48,
    left: deviceWidth < 370 ? 20 : 30,
  },

  errorLabel: {
    color: "red",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
  },
  normalLabel: {
    color: "grey",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 16,
    fontFamily: "HindRegular",
    letterSpacing: 0.5,
  },
  errorText: {
    color: "red",
    left: 40,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 14 : 18,
    position: "absolute",
  },
  topLabelExtra: {
    top: 47,
    left: deviceWidth < 370 ? 20 : 30,
    width: 100,
  },
  topExtra: {
    bottom: 10,
    left: deviceWidth < 370 ? 20 : 30,
    color: "red",
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 20,

    backgroundColor: "#F0F3F4",
  },
  commonErrorMsg: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 14 : 17,
  },
  errorBorderColorDate: {
    borderBottomColor: "red",
  },
});

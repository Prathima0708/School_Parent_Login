import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Alert,
  Button as Btn,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
import SearchBar from "react-native-dynamic-search-bar";
import { Ionicons } from "@expo/vector-icons";
import TeachersHome from "./TeachersHome";
import Input from "../../components/UI/Input";
import { getMomentsAsync } from "expo-media-library";
import moment from "moment";
import VerticalLine from "../../components/UI/VerticalLine";
import { Card, DataTable } from "react-native-paper";
import FeedBackDialog from "../../components/UI/FeedBackDialog";

import AsyncStorage from "@react-native-async-storage/async-storage";
export var ID;
const TeachersCalendarScreenBuild = () => {
  const br = "\n";
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [forCalendarList, setForCalendarList] = useState({
    backgroundColor: "#0C60F4",
    color: "white",
    borderRadius: 10,
  });
  const [forCalendarForm, setForCalendarForm] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 10,
  });

  const [title, setEnteredTitle] = useState("");
  const [enteredTitleTouched, setEnteredTitleTouched] = useState(false);
  const enteredTitleIsValid = title.trim() !== "";
  const titleInputIsInValid = !enteredTitleIsValid && enteredTitleTouched;

  const [description, setEnteredDescription] = useState("");
  const [enteredDescriptionTouched, setEnteredDescriptionTouched] =
    useState(false);
  const enteredDescriptionIsValid = description.trim() !== "";
  const descriptionInputIsInValid =
    !enteredDescriptionIsValid && enteredDescriptionTouched;

  // const [createdby, setEnteredcreatedby] = useState("");
  // const [enteredCreatedByTouched,setEnteredCreatedbyTouched]=useState(false)
  // const enteredCreatedByIsValid=createdby.trim()!=='';
  // const createdByInputIsInValid=!enteredCreatedByIsValid && enteredCreatedByTouched;

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [frmdate, setenteredfrmdate] = useState("");
  const [todate, setenteredtodate] = useState("");

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

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [dateIsInCorrect, setDateIsInCorrect] = useState(false);
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isSame, SetIsSame] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  let i = 0;

  // async function logoutHandler() {
  //   try {
  //     const value = await AsyncStorage.getItem("key");
  //     if (value == null) {

  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Calendar/`);

        setData(res.data);
        setFilteredData(res.data);
        let test = 0;

        const value = await AsyncStorage.getItem("key");
        for (i = 0; i < res.data.length; i++) {
          if (value == res.data[i].created_by) {
            test = res.data[i].created_by;
          } else {
            // console.log('false')
          }
        }
        if (test == value) {
          // console.log("is same")
          SetIsSame(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // const variable=data.createdby === AsyncStorage.getItem('key')
  // const value=AsyncStorage.getItem('key')
  // try {
  //   const value = await AsyncStorage.getItem("key");

  //   if (value !== null) {
  //     console.log("This is the token :" + value);
  //   }
  // } catch (error) {
  //   // Error retrieving data
  // }

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

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
    setFromDate;
  };

  const showToMode = (currentToMode) => {
    setToShow(true);

    setToMode(currentToMode);
  };

  const fromDateChangeHandler = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate || fromDate;
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
    } else {
      //cancel button clicked
    }

    //console.log(fDate);
  };

  const toDateChangeHandler = (event, selectedToDate) => {
    const currentToDate = selectedToDate || toDate;
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
    } else {
      //cancel button clicked
    }
    // console.log(fDate);
  };

  function titleChangeHandler(enteredValue) {
    setEnteredTitle(enteredValue);
  }
  function descriptionChangeHandler(enteredValue) {
    setEnteredDescription(enteredValue);
  }

  function createdByChangeHandler(enteredValue) {
    setEnteredcreatedby(enteredValue);
  }
  function frmDateHandler(enteredValue) {
    // setFromText(enteredValue);
    // setEnteredFromDate(enteredValue);
    setFromDate(enteredValue);
    setenteredfrmdate(enteredValue);
  }
  function toDateHandler(enteredValue) {
    // setToText(enteredValue);
    setToDate(enteredValue);
    setenteredtodate(enteredValue);
  }

  function updateHandler() {
    const FormData = {
      description: description,
      // created_by:createdby,
      startdate: fromDate,
      enddate: toDate,
      titlee: title,
    };
    async function updateData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const dataForm = FormData;
        const resLogin = await axios.put(
          `http://10.0.2.2:8000/school/Calendar/${ID}/`,
          dataForm,
          {
            headers: headers,
          }
        );
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
      } catch (error) {
        console.log(error);
      }
    }
    updateData();
    Alert.alert("Successfully updated", "", [
      { text: "OK", onPress: () => fetchData() },
    ]);

    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Calendar/`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    setEnteredDescription("");
    setEnteredTitle("");
    setFromText("");
    setToText("");
    setShowForm(false);
    setShowList(true);
    setForCalendarList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForCalendarForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
  }

  function buttonPressedHandler() {
    const FormData = {
      description: description,
      // created_by:createdby,
      startdate: fromDate,
      enddate: toDate,
      titlee: title,
    };

    // var dateFromValidate = fromText || frmdate;
    // var isValid = moment(dateFromValidate, "D/M/YYYY", true).isValid();
    // if (!isValid) {
    //   Alert.alert(
    //     "Format Error",
    //     "It seems to be you entered wrong date format please follow D/M/YYYY format ",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]
    //   );
    // }

    // var dateToValidate = toText || todate;
    // var isValid = moment(dateToValidate, "D/M/YYYY", true).isValid();
    // if (!isValid) {
    //   Alert.alert(
    //     "Format Error",
    //     "It seems to be you entered wrong date format please follow D/M/YYYY format",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]
    //   );
    // }

    const formIsValid =
      enteredTitleIsValid &&
      enteredDescriptionIsValid &&
      enteredFromDateIsValid &&
      enteredtoDateIsValid;
    if (formIsValid) {
      Alert.alert("Saved Data", "Saved Data successfully", [
        {
          text: "OK",
          onPress: () => {
            setShowForm(false);
            showCalendar();
          },
        },
      ]);
    }

    setEnteredTitleTouched(true);
    setEnteredDescriptionTouched(true);
    // setEnteredCreatedbyTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    // setCheckFromDateTouched(true);
    // setCheckToDateTouched(true);
    if (!enteredTitleIsValid) {
      return;
    }
    if (!enteredDescriptionIsValid) {
      return;
    }
    // if(!enteredCreatedByIsValid){
    //   return;
    // }
    // if (!enteredFromDateIsValid) {
    //   return;
    // }

    // if (!enteredtoDateIsValid) {
    //   return;
    // }
    async function getData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Calendar/`);

        let filteredlist = res.data.filter(
          (ele) => ele.description == description
        );
        if (filteredlist.length > 0) {
          Alert.alert("Data already exists", "please enter a new data", [
            {
              text: "OK",

              style: "cancel",
            },
          ]);
        } else {
          async function storeData() {
            try {
              let headers = {
                "Content-Type": "application/json; charset=utf-8",
              };
              const dataForm = FormData;

              const resLogin = await axios.post(
                `http://10.0.2.2:8000/school/Calendar/`,
                dataForm,
                {
                  headers: headers,
                }
              );
              // const token = resLogin.data.token;
              // const userId = resLogin.data.user_id;
              console.log(resLogin.data);
            } catch (error) {
              console.log(error);
            }
          }
          storeData();
          setEnteredDescription("");
          setEnteredTitle("");
          setFromText("");
          setToText("");
          setEnteredTitleTouched(false);
          setEnteredDescriptionTouched(false);
          // setEnteredCreatedbyTouched(false);
          setEnteredFromDateTouched(false);
          setEnteredtoDateTouched(false);
          setForCalendarList({ fontWeight: "bold", color: "black" });
          setForCalendarForm({ color: "black" });
          setForCalendarForm({ fontWeight: "bold", color: "black" });
          setForCalendarList({ color: "black" });
          setShowForm(false);
          setShowList(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }
  function titleBlurHandler() {
    setEnteredTitleTouched(true);
  }
  function descriptionBlurHandler() {
    setEnteredDescriptionTouched(true);
  }
  // function createdbyBlurHandler(){
  //   setEnteredCreatedbyTouched(true);
  // }
  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
  }
  function toDateBlurHandler() {
    setEnteredtoDateTouched(true);
  }

  function showCalendarForm() {
    setForCalendarList({
      backgroundColor: "#0C60F4",
      color: "white",
      borderRadius: 10,
    });
    setForCalendarForm({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
    });
    setShowForm(true);
    setShowList(false);
    setEnteredDescriptionTouched(false);
    setEnteredTitleTouched(false);
    setEnteredtoDateTouched(false);
    setEnteredFromDateTouched(false);
    setIsEdit(false);

    setEnteredDescription("");
    setEnteredTitle("");
    setFromText("");
    setToText("");
  }
  function showCalendar() {
    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Calendar/`);
        console.log(res.data);

        setData(res.data);
        setFilteredData(res.data);

        setForCalendarForm({
          color: "white",
          backgroundColor: "#1E8449",
          borderRadius: 10,
        });
        setForCalendarList({
          backgroundColor: "#F4F6F6",
          color: "black",
          borderRadius: 10,
        });
        setShowForm(false);
        setShowList(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  function editItem(id) {
    ID = id;
    console.log(id);
    const filteredDummuyData = data.find((data) => data.id == id);

    setEnteredDescription(filteredDummuyData.description);
    //  setEnteredcreatedby(filteredDummuyData.created_by);
    setFromText(moment(filteredDummuyData.startdate).format("DD/MM/YYYY"));
    setToText(moment(filteredDummuyData.enddate).format("DD/MM/YYYY"));
    setEnteredTitle(filteredDummuyData.titlee);
    //  setEnteredMobile(filteredDummuyData.exam_name);
    //  setEnteredRouteName(filteredDummuyData.hour);
    setForCalendarList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForCalendarForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    setShowForm(true);
    setShowList(false);
    setIsEdit(true);
  }
  function deleteItem(id) {
    Alert.alert("Confirm Deletion", "You are about to delete this row!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes,delete",
        onPress: () => deleteData(),
      },
    ]);
    async function deleteData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        // const dataForm = FormData;
        const resLogin = await axios.delete(
          `http://10.0.2.2:8000/school/Calendar/${id}/`,
          // FormData,
          {
            headers: headers,
          }
        );
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
      async function fetchData() {
        try {
          const res = await axios.get(`http://10.0.2.2:8000/school/Calendar/`);
          // console.log(res.data);
          setData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }

  const searchFilter = (text) => {
    console.log("search function");
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.titlee
          ? item.titlee.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      setFilteredData(data);
      setSearchText(text);
    }
  };

  function cancelHandler() {
    setShowList(true);
    setShowForm(false);
  }
  return (
    <>
      {/* <View style={styles.BtnContainer}>
          <BgButton>Add Event</BgButton>
        </View> */}
      <View style={styles.BtnContainer}>
        <BgButton onPress={showCalendarForm} style={forCalendarList}>
          Add Event
        </BgButton>

        <BgButton onPress={showCalendar} style={forCalendarForm}>
          Show Event
        </BgButton>
      </View>
      {showForm && (
        <ScrollView>
          <View style={styles.inputForm}>
            <Input
              // keyboardType="number-pad"
              placeholder="Title"
              onChangeText={titleChangeHandler}
              blur={titleBlurHandler}
              value={title}
              onSubmitEditing={Keyboard.dismiss}
              style={titleInputIsInValid && styles.errorBorderColor}
            />
            {titleInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter the title
              </Text>
            )}
            <Input
              placeholder="Description"
              onChangeText={descriptionChangeHandler}
              blur={descriptionBlurHandler}
              value={description}
              onSubmitEditing={Keyboard.dismiss}
              style={descriptionInputIsInValid && styles.errorBorderColor}
            />
            {descriptionInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter description
              </Text>
            )}
            {/* <Input 
              // keyboardType="number-pad"
              placeholder="created by"
              onChangeText={createdByChangeHandler}
              blur={createdbyBlurHandler}
              value={createdby}
              onSubmitEditing={Keyboard.dismiss}
              style={createdByInputIsInValid && styles.errorBorderColor}
            />
            {createdByInputIsInValid && (
                <Text style={{ color: "red",left:20 }}>Created by</Text>
              )} */}
            <View style={[{ flexDirection: "row" }]}>
              <View style={{ flex: 1 }}>
                <View>
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: 22,
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showFromMode("date")}
                  />
                </View>
                <Input
                  value={fromText || frmdate}
                  // value={
                  //   moment(fromText).format("DD/MM/YYYY") ||
                  //   moment(frmdate).format("DD/MM/YYYY")
                  // }
                  placeholder="Start date"
                  onSubmitEditing={Keyboard.dismiss}
                  style={fromDateInputIsInValid && styles.errorBorderColor}
                  blur={fromDateBlurHandler}
                  onChangeText={frmDateHandler}
                  onPressIn={() => showFromMode("date")}
                />
                {fromDateInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                  >
                    Select from date
                  </Text>
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
                <View>
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: 22,
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showToMode("date")}
                  />
                </View>
                <Input
                  // value={moment(toText).format('DD/MM/YYYY') || moment(toDate).format('DD/MM/YYYY')}
                  value={toText || todate}
                  // value={
                  //   moment(toText).format("DD/MM/YYYY") ||
                  //   moment(todate).format("DD/MM/YYYY")
                  // }
                  placeholder="End date"
                  onSubmitEditing={Keyboard.dismiss}
                  style={toDateInputIsInValid && styles.errorBorderColor}
                  blur={toDateBlurHandler}
                  onChangeText={toDateHandler}
                  onPressIn={() => showToMode("date")}
                />
                {toDateInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                  >
                    Select to date
                  </Text>
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
            {!isEdit && (
              <View style={styles.btnSubmit}>
                <Button onPress={buttonPressedHandler}>Add Event</Button>
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
      )}
      {showList && (
        <>
          <SearchBar
            style={styles.searchBar}
            textInputStyle={{ fontFamily: "HindRegular", fontSize: 18 }}
            placeholder="Search here"
            onChangeText={(text) => searchFilter(text)}
            value={searchText}
          />
          <View style={[{flex:1}, {flexDirection: "column"}]}>
        <View style={{ flex: 8,bottom:10 }} >
        <ScrollView>
       <View style={styles.root}>
          {filteredData &&
              filteredData.map((filteredData, key) => (
                <>
                  <View key={key}>
                    <Card style={{ margin: 10 }}>
                      <Card.Content>
                        <Card.Title title={filteredData.titlee} />
                        <View style={[{ flexDirection: "row" }]}>
                          <View style={{ flex: 2, left: 20 }}>
                            <Text style={styles.cardTextStyle}>
                              <Ionicons
                                name="calendar"
                                size={24}
                                color="green"
                              />
                              Start date
                            </Text>
                          </View>
                          <View style={{ flex: 2 }}>
                            <Text style={styles.cardTextStyle}>
                              <Ionicons
                                name="calendar"
                                size={24}
                                color="green"
                              />
                              End date
                            </Text>
                          </View>
                        </View>
                        <View style={[{ flexDirection: "row" }]}>
                          <View style={{ flex: 2, left: 40 }}>
                            <Text
                              style={[styles.cardTextStyle, { fontSize: 15 }]}
                            >
                              {moment(filteredData.startdate).format(
                                "DD/MM/YYYY"
                              )}
                            </Text>
                          </View>
                          <View style={{ flex: 2, left: 105 }}>
                            <Text
                              style={[styles.cardTextStyle, { fontSize: 15 }]}
                            >
                              {moment(filteredData.enddate).format(
                                "DD/MM/YYYY"
                              )}
                            </Text>
                          </View>
                          <View style={{ flex: 2, left: 120, bottom: 5 }}>
                            <Ionicons
                              name="md-pencil-sharp"
                              size={24}
                              color="green"
                              onPress={() => editItem(filteredData.id)}
                            />
                          </View>
                          <View style={{ flex: 2, left: 70, bottom: 5 }}>
                            <Ionicons
                              name="trash"
                              size={24}
                              color="red"
                              onPress={() => deleteItem(filteredData.id)}
                            />
                          </View>
                        </View>
                        <View style={[{ flexDirection: "column", flex: 1 }]}>
                          <View style={{ flex: 2, left: 40, top: 5 }}>
                            <Text
                              style={[
                                styles.cardTextStyle,
                                { fontWeight: "bold" },
                              ]}
                            >
                              Description:
                            </Text>
                          </View>
                          <View style={{ flex: 2, left: 40, top: 5 }}>
                            <Text
                              style={[
                                styles.cardTextStyle,
                                { color: "grey", fontSize: 18 },
                              ]}
                            >
                              {filteredData.description}
                            </Text>
                          </View>
                        </View>
                      </Card.Content>
                    </Card>
                  </View>
                </>
              ))}
        </View>
      </ScrollView>
        </View>
        <View style={{ flex: 1}} >
          <TeachersHome />
        </View>
      </View>
        </>
      )}
      {keyboardStatus == "Keyboard Hidden" && <TeachersHome />}
    </>
  );
};

export default TeachersCalendarScreenBuild;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",
    width: "50%",
  },
  home: {
    marginTop: 29,
  },
  root: {
    backgroundColor: "#EBECFO",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  errorBorderColor: {
    color: "black",
    borderBottomWidth: 1,
    borderColor: "red",
    padding: 10,
    margin: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
  },

  btnSubmit: {
    marginTop: 147,
    width: "50%",
    marginLeft: 180,
  },
  space: {
    width: 20,
    height: 20,
  },
  th: {
    padding: 5,

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
    width: 50,
    //  fontFamily: "Montserrat_600SemiBold",
    left: 10,

    maxWidth: 200,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    whiteSpace: "pre-line",
  },
  searchBar: {
    //top: 10,

    marginTop: 10,
    marginBottom: 20,
  },
  btnSubmit1: {
    marginTop: 90,
    marginBottom: 30,
    marginLeft: 190,
    width: "50%",
  },
  cancel: {
    marginTop: -140,
    marginLeft: -15,
    width: "50%",
  },
  cardTextStyle: {
    fontFamily: "HindRegular",
    fontSize: 16,
  },
});

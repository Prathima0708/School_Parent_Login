import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Alert,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import Button from "../../../../components/UI/Button";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import BgButton from "../../../../components/UI/BgButton";
import TeachersHome from "../../BottomTab/TeachersHome";
import { Keyboard } from "react-native";
import { useEffect } from "react";
import Input from "../../../../components/UI/Input";

import moment from "moment";
import { DataTable } from "react-native-paper";
const TeachersNoticeboard = () => {
  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, 100);

  const headermax = 100;
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
  const [isUserFocused, setIsUserFocused] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescFocused, setIsDescFocused] = useState(false);
  const [isDOCFocused, setIsDOCFocused] = useState(false);

  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);

  const [forNoticeList, setForNoticeList] = useState({
    color: "white",
    backgroundColor: "#0C60F4",
    borderRadius: 10,
  });
  const [forNoticeForm, setForNoticeForm] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 10,
  });

  const [username, setEnteredUserName] = useState("");
  const [enteredUserNameTouched, setEnteredUserNameTouched] = useState(false);
  const enteredUserNameIsValid = username.trim() !== "";
  const usernameInputIsInValid =
    !enteredUserNameIsValid && enteredUserNameTouched;

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

  const [dateOfCreation, setEnteredDateOfCreation] = useState("");
  const [fromShow, setFromShow] = useState(false);
  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText.trim() !== "";
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [data, setData] = useState([]);
  const [isSame, SetIsSame] = useState(false);
  let i = 0;

  const [showInitialBtn, setShowInitialBtn] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/NoticeBoard/`);
        setData(res.data);
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
  };
  function frmDateHandler(enteredValue) {
    setFromText(enteredValue);
  }
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
  function userNameChangeHandler(enteredValue) {
    setEnteredUserName(enteredValue);
  }
  function titleChangeHandler(enteredValue) {
    setEnteredTitle(enteredValue);
  }
  function descriptionChangeHandler(enteredValue) {
    setEnteredDescription(enteredValue);
  }
  function dateOfCreationChangeHandler(enteredValue) {
    setEnteredDateOfCreation(enteredValue);
  }

  function buttonPressedHandler() {
    var dateFromValidate = fromText;
    var isValid = moment(dateFromValidate, "D/M/YYYY", true).isValid();
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format ",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    setEnteredUserNameTouched(true);
    setEnteredTitleTouched(true);
    setEnteredDescriptionTouched(true);
    setEnteredFromDateTouched(true);

    if (!enteredUserNameIsValid) {
      return;
    }
    if (!enteredTitleIsValid) {
      return;
    }
    if (!enteredDescriptionIsValid) {
      return;
    }
    if (!enteredFromDateIsValid) {
      return;
    } else {
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };

          const resLogin = await axios.post(
            `http://10.0.2.2:8000/school/NoticeBoard/`,
            dataForm,
            {
              headers: headers,
            }
          );
          // const token = resLogin.data.token;
          // const userId = resLogin.data.user_id;
          //console.log(token);
        } catch (error) {
          console.log(error);
        }
      }
      storeData();
      setEnteredUserNameTouched(false);
      setEnteredTitleTouched(false);
      setEnteredDescriptionTouched(false);
      setEnteredFromDateTouched(false);
      setShowForm(false);
      setShowList(true);
      setForNoticeList({
        color: "black",
        backgroundColor: "#F4F6F6",
        borderRadius: 10,
      });
      setForNoticeForm({
        color: "white",
        backgroundColor: "#0C60F4",
        borderRadius: 10,
      });
    }
  }
  function usernameInputBlur() {
    setEnteredUserNameTouched(true);
    setIsUserFocused(false);
  }
  function onFocusUserHandler() {
    setIsUserFocused(true);
    setEnteredUserNameTouched(false);
  }

  function titleInputBlur() {
    setEnteredTitleTouched(true);
    setIsTitleFocused(false);
  }
  function onFocusTitleHandler() {
    setIsTitleFocused(true);
    setEnteredTitleTouched(false);
  }

  function descriptionInputBlur() {
    setEnteredDescriptionTouched(true);
    setIsDescFocused(false);
  }
  function onFocusDescHandler() {
    setIsDescFocused(true);
    setEnteredDescriptionTouched(false);
  }

  function datecreationInputBlur() {
    setEnteredFromDateTouched(true);
    setIsDOCFocused(false);
  }
  function onFocusDOCHandler() {
    setIsDOCFocused(true);
    setEnteredFromDateTouched(false);
  }

  function showNoticeForm() {
    setForNoticeList({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
    });
    setForNoticeForm({
      color: "white",
      backgroundColor: "#0C60F4",
      borderRadius: 10,
    });
    setShowForm(true);
    setShowList(false);
  }
  function showNotice() {
    setForNoticeForm({
      color: "white",
      backgroundColor: "#0C60F4",
      borderRadius: 10,
    });
    setForNoticeList({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
    });
    setShowForm(false);
    setShowList(true);
  }
  return (
    <>
      {showInitialBtn && (
        <Animated.View
          style={[
            {
              height: animateHeaderHeight,
              backgroundColor: animateHeaderBackGround,
            },
          ]}
        >
          <View style={styles.BtnContainer}>
            <BgButton onPress={showNoticeForm} style={forNoticeList}>
              Add New
            </BgButton>

            <BgButton onPress={showNotice} style={forNoticeForm}>
              Show List
            </BgButton>
          </View>
        </Animated.View>
      )}
      {showForm && (
        <ScrollView style={styles.root}>
          <View style={styles.inputForm}>
            <Input
              placeholder="Username"
              onChangeText={userNameChangeHandler}
              blur={usernameInputBlur}
              onFocus={onFocusUserHandler}
              value={username}
              onSubmitEditing={Keyboard.dismiss}
              style={
                isUserFocused
                  ? styles.focusStyle
                  : usernameInputIsInValid && styles.errorBorderColor
              }
            />
            {usernameInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>Enter Username</Text>
            )}

            <Input
              keyboardType="number-pad"
              placeholder="Title"
              onChangeText={titleChangeHandler}
              blur={titleInputBlur}
              onFocus={onFocusTitleHandler}
              value={title}
              onSubmitEditing={Keyboard.dismiss}
              style={
                isTitleFocused
                  ? styles.focusStyle
                  : titleInputIsInValid && styles.errorBorderColor
              }
            />
            {titleInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>Enter title</Text>
            )}

            <Input
              placeholder="Description"
              onChangeText={descriptionChangeHandler}
              blur={descriptionInputBlur}
              onFocus={onFocusDescHandler}
              value={description}
              onSubmitEditing={Keyboard.dismiss}
              style={
                isDescFocused
                  ? styles.focusStyle
                  : descriptionInputIsInValid && styles.errorBorderColor
              }
            />
            {descriptionInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>Enter description</Text>
            )}

            <View>
              <Ionicons
                style={{
                  position: "absolute",
                  top: 23,
                }}
                name="calendar"
                size={24}
                color="black"
                onPress={() => showFromMode("date")}
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
            <Input
              value={fromText || fromDate}
              onSubmitEditing={Keyboard.dismiss}
              placeholder=" Date of creation:"
              style={
                isDOCFocused
                  ? styles.focusStyle
                  : fromDateInputIsInValid && styles.errorBorderColor
              }
              blur={datecreationInputBlur}
              onFocus={onFocusDOCHandler}
              onChangeText={frmDateHandler}
            />
            {fromDateInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>Enter Date</Text>
            )}
            <View style={styles.btnSubmit}>
              <Button onPress={buttonPressedHandler}>Add Notice</Button>
            </View>
          </View>
        </ScrollView>
      )}
      {showList && (
        <ScrollView horizontal={true}>
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>Title</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>Description</Text>
              </View>
              {/* <View style={styles.th}>
                <Text style={styles.tableTitle}>created by</Text>
              </View> */}
              <View style={styles.th}>
                <Text style={styles.tableTitle}>Start Date</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>End Date</Text>
              </View>
              {isSame && (
                <View style={styles.th}>
                  <Text style={styles.tableTitle}>Update</Text>
                </View>
              )}
              {isSame && (
                <View style={styles.th}>
                  <Text style={styles.tableTitle}>Delete</Text>
                </View>
              )}
            </DataTable.Header>
            {data &&
              data.map((data, key) => (
                <DataTable.Row style={styles.tableRow}>
                  {/* <DataTable.Cell style={styles.tableCell}>
                    {data.id}
                  </DataTable.Cell> */}
                  <DataTable.Cell style={styles.tableCell}>
                    {data.titlee}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.description}
                  </DataTable.Cell>
                  {/* <DataTable.Cell style={styles.tableCell}>
                   {data.created_by}
                  </DataTable.Cell> */}
                  <DataTable.Cell style={styles.tableCell}>
                    {data.startdate}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.enddate}
                  </DataTable.Cell>
                  {isSame && (
                    <DataTable.Cell style={styles.tableCell}>
                      <Btn title="Edit" onPress={() => editItem(data.id)} />
                    </DataTable.Cell>
                  )}
                  {isSame && (
                    <DataTable.Cell style={styles.tableCell}>
                      <Btn title="Delete" onPress={() => deleteItem(data.id)} />
                    </DataTable.Cell>
                  )}
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      )}
      {showForm && keyboardStatus == "Keyboard Hidden" && <TeachersHome />}
    </>
  );
};

export default TeachersNoticeboard;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "#FDFEFE",
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
    borderBottomColor: "red",
  },
  labels: {
    margin: 5,
    fontFamily: "Ubuntu",
    fontSize: 18,
    // marginTop: 17,
  },
  btnSubmit: {
    marginTop: 30,
    marginBottom: 30,
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
    left: 5,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  focusStyle: {
    borderBottomColor: "blue",
  },
});

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Alert,
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
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [forNoticeList, setForNoticeList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forNoticeForm, setForNoticeForm] = useState({ color: "black" });

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
      setForNoticeList({ fontWeight: "bold", color: "black" });
      setForNoticeForm({ color: "black" });
      setForNoticeForm({ fontWeight: "bold", color: "black" });
      setForNoticeList({ color: "black" });
    }
  }
  function usernameInputBlur() {
    setEnteredUserNameTouched(true);
  }

  function titleInputBlur() {
    setEnteredTitleTouched(true);
  }

  function descriptionInputBlur() {
    setEnteredDescriptionTouched(true);
  }

  function datecreationInputBlur() {
    setEnteredFromDateTouched(true);
  }
  function showNoticeForm() {
    setForNoticeList({ fontWeight: "bold", color: "black" });
    setForNoticeForm({ color: "black" });
    setShowForm(true);
    setShowList(false);
  }
  function showNotice() {
    setForNoticeForm({ fontWeight: "bold", color: "black" });
    setForNoticeList({ color: "black" });
    setShowForm(false);
    setShowList(true);
  }
  return (
    <>
      {/* <View style={styles.BtnContainer}>
          <BgButton>Add Notice</BgButton>
        </View> */}
      <View style={styles.BtnContainer}>
        <BgButton onPress={showNoticeForm} style={forNoticeList}>
          Add Notice
        </BgButton>

        <BgButton onPress={showNotice} style={forNoticeForm}>
          Show Notice
        </BgButton>
      </View>
      {showForm && (
        <ScrollView style={styles.root}>
          <View style={styles.inputForm}>
            <Input
              placeholder="Username"
              onChangeText={userNameChangeHandler}
              blur={usernameInputBlur}
              value={username}
              onSubmitEditing={Keyboard.dismiss}
              style={usernameInputIsInValid && styles.errorBorderColor}
            />
            {usernameInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>Enter Username</Text>
            )}

            <Input
              keyboardType="number-pad"
              placeholder="Title"
              onChangeText={titleChangeHandler}
              blur={titleInputBlur}
              value={title}
              onSubmitEditing={Keyboard.dismiss}
              style={titleInputIsInValid && styles.errorBorderColor}
            />
            {titleInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>Enter title</Text>
            )}

            <Input
              placeholder="Description"
              onChangeText={descriptionChangeHandler}
              blur={descriptionInputBlur}
              value={description}
              onSubmitEditing={Keyboard.dismiss}
              style={descriptionInputIsInValid && styles.errorBorderColor}
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
              style={fromDateInputIsInValid && styles.errorBorderColor}
              blur={datecreationInputBlur}
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
});

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Platform,
  Button as Btn,
  Alert,
} from "react-native";
import moment from "moment";
import { Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/UI/Button";
import axios from "axios";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";

import { Ionicons } from "@expo/vector-icons";
import TeachersHome from "./TeachersHome";
import Input from "../../components/UI/Input";
import VerticalLine from "../../components/UI/VerticalLine";
import { DataTable } from "react-native-paper";
const TeachersLeave = () => {
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [forLeaveList, setForLeaveList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forLeaveForm, setForLeaveForm] = useState({ color: "black" });

  const [leaveType, setEnteredLeaveType] = useState("");
  const [enteredLeaveTypeTouched, setEnteredLeaveTypeTouched] = useState(false);
  const enteredLeaveTypeIsValid = leaveType.trim() !== "";
  const leavetypeInputIsInValid =
    !enteredLeaveTypeIsValid && enteredLeaveTypeTouched;

  const [leaveReason, setEnteredLeaveReason] = useState("");
  const [enteredLeaveReasonTouched, setEnteredLeaveReasonTouched] =
    useState(false);
  const enteredLeaveReasonIsValid = leaveReason.trim() !== "";
  const leavereasonInputIsInValid =
    !enteredLeaveReasonIsValid && enteredLeaveReasonTouched;

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

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [data, setData] = useState([]);
  const [isEdit,setIsEdit]=useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Leave/`
        );
        setData(res.data);
        console.log(data)
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

  function frmDateHandler(enteredValue) {
    setFromDate(enteredValue);
  }
  function toDateHandler(enteredValue) {
    setToDate(enteredValue);
  }

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
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
  function leaveTypeChangeHandler(enteredValue) {
    setEnteredLeaveType(enteredValue);
  }
  function leaveReasonChangeHandler(enteredValue) {
    setEnteredLeaveReason(enteredValue);
  }
  function frmDateHandler(enteredValue) {
    setFromText(enteredValue);
  }
  function toDateHandler(enteredValue) {
    setToText(enteredValue);
  }
  function updateHandler(){
    const FormData = {
      leave_type: leaveType,
      leave_reason: leaveReason,
      leave_form: fromDate,
      leave_to: toDate,
    };
    // console.log(FormData);

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

    var dateToValidate = toText;
    var isValid = moment(dateToValidate, "D/M/YYYY", true).isValid();
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format",
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
    setEnteredLeaveTypeTouched(true);
    setEnteredLeaveReasonTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);

    if (!enteredLeaveTypeIsValid) {
      return;
    }
    if (!enteredLeaveReasonIsValid) {
      return;
    }
    if (!enteredFromDateIsValid) {
      return;
    }
    if (!enteredtoDateIsValid) {
      return;
    } else {
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const dataForm = FormData;
          const resLogin = await axios.put(
            `http://10.0.2.2:8000/school/Leave/`,
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
      setEnteredLeaveType("");
      setEnteredLeaveReason("");
      setFromText("");
      setToText("");
      setEnteredLeaveTypeTouched(false);
      setEnteredLeaveReasonTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
    }
  }
  function buttonPressedHandler() {
    console.log(UserId);
    const FormData = {
      leave_type: leaveType,
      leave_reason: leaveReason,
      leave_form: fromDate,
      leave_to: toDate,
    };
    // console.log(FormData);

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

    var dateToValidate = toText;
    var isValid = moment(dateToValidate, "D/M/YYYY", true).isValid();
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format",
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
    setEnteredLeaveTypeTouched(true);
    setEnteredLeaveReasonTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);

    if (!enteredLeaveTypeIsValid) {
      return;
    }
    if (!enteredLeaveReasonIsValid) {
      return;
    }
    if (!enteredFromDateIsValid) {
      return;
    }
    if (!enteredtoDateIsValid) {
      return;
    } else {
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const dataForm = FormData;
          const resLogin = await axios.post(
            `http://10.0.2.2:8000/school/Leave/`,
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
      setEnteredLeaveType("");
      setEnteredLeaveReason("");
      setFromText("");
      setToText("");
      setEnteredLeaveTypeTouched(false);
      setEnteredLeaveReasonTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
    }
  }
  function leavetypeBlurHandler() {
    setEnteredLeaveTypeTouched(true);
  }
  function leavereasonBlurHandler() {
    setEnteredLeaveReasonTouched(true);
  }
  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
  }
  function toDateBlurHandler() {
    setEnteredtoDateTouched(true);
  }
  function showLeaveForm() {
    setForLeaveList({ fontWeight: "bold", color: "black" });
    setForLeaveForm({ color: "black" });
    setShowForm(true);
    setShowList(false);
    
  }
  function showLeave() {
    setForLeaveForm({ fontWeight: "bold", color: "black" });
    setForLeaveList({ color: "black" });
    setShowForm(false);
    setShowList(true);
  }
  function editItem(id){
    const filteredDummuyData= data.find((data)=> data.id==id);
    // console.log(filteredDummuyData);
    setEnteredLeaveType(filteredDummuyData.leave_type);
    setEnteredLeaveReason(filteredDummuyData.leave_type);
    setFromText(filteredDummuyData.leave_form);
    setToText(filteredDummuyData.leave_to);
    setForLeaveList({ fontWeight: "bold", color: "black" });
    setForLeaveForm({ color: "black" });
     setShowForm(true);
     setShowList(false);
     setIsEdit(true);
   }

   function deleteItem(id){
    // console.log(id);
    // const newFilteredData=data.filter((data)=>data.id != id);

    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        // const dataForm = FormData;
        const resLogin = await axios.delete(
          `http://10.0.2.2:8000/school/Leave/${id}/`,
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
    }
    storeData();
  }
  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add Leave</BgButton>
      </View> */}

      <View style={styles.BtnContainer}>
      <BgButton onPress={showLeaveForm} style={forLeaveList}>
        Add Leave
      </BgButton>
      <VerticalLine>|</VerticalLine>
      <BgButton onPress={showLeave} style={forLeaveForm}>
        Show Leave
    </BgButton>
    </View>
      {showForm && <ScrollView>
        <View style={styles.inputForm}>
          <Input
            placeholder="LEAVE TYPE"
            onChangeText={leaveTypeChangeHandler}
            blur={leavetypeBlurHandler}
            value={leaveType}
            onSubmitEditing={Keyboard.dismiss}
            style={leavetypeInputIsInValid && styles.errorBorderColor}
          />
          {leavetypeInputIsInValid && (
            <Text style={{ color: "red", left: 20 }}>Enter the type</Text>
          )}
          <Input
            onChangeText={leaveReasonChangeHandler}
            blur={leavereasonBlurHandler}
            placeholder="LEAVE REASON"
            value={leaveReason}
            onSubmitEditing={Keyboard.dismiss}
            style={leavereasonInputIsInValid && styles.errorBorderColor}
          />
          {leavereasonInputIsInValid && (
            <Text style={{ color: "red", left: 20 }}>Enter leave reason</Text>
          )}

          <View style={[{ flexDirection: "row" }]}>
            <View style={{ flex: 1 }}>
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
              </View>
              <Input
                value={fromText || fromDate}
                placeholder="LEAVE FROM:"
                onSubmitEditing={Keyboard.dismiss}
                style={fromDateInputIsInValid && styles.errorBorderColor}
                blur={fromDateBlurHandler}
                onChangeText={frmDateHandler}
              />
              {fromDateInputIsInValid && (
                <Text style={{ color: "red", left: 20 }}>Enter leave from</Text>
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
                    top: 23,
                  }}
                  name="calendar"
                  size={24}
                  color="black"
                  onPress={() => showToMode("date")}
                />
              </View>
              <Input
                value={toText || toDate}
                placeholder="LEAVE TO:"
                onSubmitEditing={Keyboard.dismiss}
                style={toDateInputIsInValid && styles.errorBorderColor}
                blur={toDateBlurHandler}
                onChangeText={toDateHandler}
              />
              {toDateInputIsInValid && (
                <Text style={{ color: "red", left: 20 }}>Enter to</Text>
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
          {!isEdit && <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Leave</Button>
          </View>}
          {isEdit && <View style={styles.btnSubmit}>
            <Button onPress={ updateHandler}>Update</Button>
          </View>}
        </View>
      </ScrollView>}
      {showList && 
        <ScrollView horizontal={true}>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> ID</Text>
            </View>
            {/* <View style={styles.th}>
              <Text style={styles.tableTitle}> student reg_num</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> User role</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> User name</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Email</Text>
            </View> */}
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Leave type</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Leave from</Text>
            </View>

            <View style={styles.th}>
              <Text style={styles.tableTitle}> Leave to</Text>
            </View>

            <View style={styles.th}>
              <Text style={styles.tableTitle}> Leave reason</Text>
            </View>

            {/* <View style={styles.th}>
              <Text style={styles.tableTitle}> Leave status</Text>
            </View> */}
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Update</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Delete</Text>
            </View>
          </DataTable.Header>

          {data &&
            data.map((data, key) => (
              <DataTable.Row style={styles.tableRow}>
                <DataTable.Cell style={styles.tableCell}>
                  {data.id}
                </DataTable.Cell>
                {/* <DataTable.Cell style={styles.tableCell}>
                  {data.student_reg_number}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.user_role}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.username}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.email}
                </DataTable.Cell> */}
                <DataTable.Cell style={styles.tableCell}>
                  {data.leave_type}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.leave_form}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.leave_to}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {data.leave_reason}
                </DataTable.Cell>
                {/* <DataTable.Cell style={styles.tableCell}>
                  {data.leave_status}
                </DataTable.Cell> */}
                <DataTable.Cell style={styles.tableCell}>
                  <Btn title="Edit" onPress={()=> editItem(data.id)} />
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  <Btn title="Delete" onPress={()=> deleteItem(data.id)} />
              </DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
      </ScrollView>
      }
      {keyboardStatus == "Keyboard Hidden" && <TeachersHome />}
    </>
  );
};

export default TeachersLeave;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection:'row'
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
  // labels: {
  //   margin: 5,
  //   fontFamily: "Ubuntu",
  //   fontSize: 18,
  //   // marginTop: 17,
  // },
  btnSubmit: {
    marginTop: 17,
  },
  dateContainer: {
    width: "10%",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
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
});

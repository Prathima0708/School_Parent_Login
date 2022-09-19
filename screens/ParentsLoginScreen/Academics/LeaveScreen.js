import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import VerticalLine from "../../../components/UI/VerticalLine";
import { DataTable } from "react-native-paper";
import Button from "../../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import BgButton from "../../../components/UI/BgButton";
import { UserId } from "../../Login";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import ParentsHome from "../ParentsHome";
import Input from "../../../components/UI/Input";
const LeaveScreen = () => {
  const [regno, setEnteredRegno] = useState("");
  const [enteredRegNoTouched,setEnteredRegNoTouched]=useState(false)
  const enteredRegNoIsValid=regno.trim()!=='';
  const regnoInputIsInValid=!enteredRegNoIsValid && enteredRegNoTouched;

  const [leaveType, setEnteredLeaveType] = useState("");
  const [enteredLeaveTypeTouched,setEnteredLeaveTypeTouched]=useState(false)
  const enteredLeaveTypeIsValid=leaveType.trim()!=='';
  const leavetypeInputIsInValid=!enteredLeaveTypeIsValid && enteredLeaveTypeTouched;

  const [leaveReason, setEnteredLeaveReason] = useState("");
  const [enteredLeaveReasonTouched,setEnteredLeaveReasonTouched]=useState(false)
  const enteredLeaveReasonIsValid=leaveReason.trim()!=='';
  const leavereasonInputIsInValid=!enteredLeaveReasonIsValid && enteredLeaveReasonTouched;

  const [forTransportList, setForTransportList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forAddTransport, setForAddTransport] = useState({ color: "black" });
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [data, setData] = useState();
  const [fromShow, setFromShow] = useState(false);
  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched,setEnteredFromDateTouched]=useState(false)
  const enteredFromDateIsValid=fromText.trim()!=='';
  const fromDateInputIsInValid=!enteredFromDateIsValid && enteredFromDateTouched;

  const [toShow, setToShow] = useState(false);
  const [tomode, setToMode] = useState("date");

  const [toText, setToText] = useState("");
  const [enteredtoDateTouched,setEnteredtoDateTouched]=useState(false)
  const enteredtoDateIsValid=toText.trim()!=='';
  const toDateInputIsInValid=!enteredtoDateIsValid && enteredtoDateTouched;

  const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');

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

  const showToMode = (currentToMode) => {
    setToShow(true);

    setToMode(currentToMode);
  };

  function frmDateHandler(enteredValue){
    setFromDate(enteredValue);
  }
  function toDateHandler(enteredValue){
    setToDate(enteredValue);
  }

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
      if(event.type == "set") {
        setToText(tDate);
        } else {
            //cancel button clicked
        };
    // console.log(fDate);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://10.0.2.2:8000/school/Leave/");
        console.log(res.data);

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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
      if(event.type == "set") {
        setFromText(fDate);
        } else {
            //cancel button clicked
        };
    //console.log(fDate);
  };

  function regnoChangeHandler(enteredValue) {
    setEnteredRegno(enteredValue);
  }
  function leaveTypeChangeHandler(enteredValue) {
    setEnteredLeaveType(enteredValue);
  }
  function leaveFromChangeHandler(enteredValue) {
    setFromText(enteredValue);
  }
  function leaveToChangeHandler(enteredValue) {
    setToText(enteredValue);
  }
  function leaveReasonChangeHandler(enteredValue) {
    setEnteredLeaveReason(enteredValue);
  }

  function transportList() {
    setForTransportList({ fontWeight: "bold", color: "black" });
    setForAddTransport({ color: "black" });
    setShowForm(false);
    setShowTable(true);
  }
  function addTransport() {
    setForAddTransport({ fontWeight: "bold", color: "black" });
    setForTransportList({ color: "black" });
    setShowForm(true);
    setShowTable(false);
  }

  function buttonPressedHandler() {
    const FormData = {
      student_reg_number: regno,
      leave_type: leaveType,
      leave_form: fromDate,
      leave_to: toDate,
      leave_reason: leaveReason,
    };
    console.log(FormData);

    setEnteredRegNoTouched(true);
    setEnteredLeaveTypeTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredLeaveReasonTouched(true);

    if(!enteredRegNoIsValid){
      return;
    }
    if(!enteredLeaveTypeIsValid){
      return;
    }
    if(!enteredFromDateIsValid){
      return;
    }
    if(!enteredtoDateIsValid){
      return;
    }
    if(!enteredLeaveReasonIsValid){
      return;
    }
    else{
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
          const token = resLogin.data.token;
          const userId = resLogin.data.user_id;
          console.log(token);
          // Token = token;
          // UserId = userId;
        } catch (error) {
          console.log(error);
        }
      }
      storeData();
      setEnteredRegno("");
      setEnteredLeaveType("");
      setEnteredLeaveReason("");
      setFromText("");
      setToText("");
      setEnteredRegNoTouched(false);
      setEnteredLeaveTypeTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredtoDateTouched(false);
      setEnteredLeaveReasonTouched(false);
    }
  }
  function stdregnoBlurHandler(){
    setEnteredLeaveTypeTouched(true);
  }
  function leavetypeBlurHandler(){
    setEnteredLeaveTypeTouched(true);
  }
  function leavereasonBlurHandler(){
    setEnteredLeaveReasonTouched(true);
  }
  function fromDateBlurHandler(){
    setEnteredFromDateTouched(true);
  }
  function toDateBlurHandler(){
    setEnteredtoDateTouched(true);
  }
  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton onPress={transportList} style={forTransportList}>
          Leave List
        </BgButton>
        <VerticalLine>|</VerticalLine>
        <BgButton onPress={addTransport} style={forAddTransport}>
          Apply Leave
        </BgButton>
      </View>
      {showTable && (
        <ScrollView horizontal={true}>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> STUDENT REG NO</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> LEAVE TYPE</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> LEAVE FROM</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> LEAVE TO</Text>
              </View>

              <View style={styles.th}>
                <Text style={styles.tableTitle}> LEAVE REASON</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> LEAVE STATUS</Text>
              </View>
            </DataTable.Header>
            {data &&
              data.map((data, key) => (
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.student_reg_number}
                  </DataTable.Cell>

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
                  <DataTable.Cell style={styles.tableCell}>
                    {data.leave_status}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      )}
      {showForm && (
        <ScrollView style={styles.root}>
          <View style={styles.inputForm}>
            <Input 
              keyboardType="number-pad"
              placeholder="STUDENT REG NO"
              onChangeText={regnoChangeHandler}
              blur={stdregnoBlurHandler}
              value={regno}
              onSubmitEditing={Keyboard.dismiss}
              style={regnoInputIsInValid && styles.errorBorderColor}
            />
            {regnoInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter student registration number</Text>
            )}

            <Input 
              placeholder="LEAVE TYPE"
              onChangeText={leaveTypeChangeHandler}
              blur={leavetypeBlurHandler}
              value={leaveType}
              onSubmitEditing={Keyboard.dismiss}
              style={leavetypeInputIsInValid && styles.errorBorderColor}
            />
            {leavetypeInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter the type</Text>
            )}
            <View style={[{flexDirection: "row"}]}>
              <View style={{ flex: 1 }} >
                <View>
                  <Ionicons
                    style={{
                      top:23,
                      position:'absolute'
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
                placeholder="LEAVE FROM:"
                style={fromDateInputIsInValid && styles.errorBorderColor}
                blur={fromDateBlurHandler}
                onChangeText={leaveFromChangeHandler}
              />
              {fromDateInputIsInValid && (
                <Text style={{ color: "red",left:20 }}>Enter leave from</Text>
              )}
            </View>
            <View style={styles.space} />
              <View style={{ flex: 1 }} >
              <View>
              <Ionicons
                style={{
                  top:23,
                  position:'absolute'
                }}
                name="calendar"
                size={24}
                color="black"
                onPress={() => showToMode("date")}
              />
            </View>
            <Input 
              value={toText || toDate} 
              onSubmitEditing={Keyboard.dismiss} 
              placeholder="LEAVE TO:"
              style={toDateInputIsInValid && styles.errorBorderColor}
              blur={toDateBlurHandler}
              onChangeText={leaveToChangeHandler}
            />
            {toDateInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter leave to</Text>
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
            <Input 
              onChangeText={leaveReasonChangeHandler}
              blur={leavereasonBlurHandler}
              value={leaveReason}
              placeholder="LEAVE REASON"
              onSubmitEditing={Keyboard.dismiss}
              style={leavereasonInputIsInValid && styles.errorBorderColor}
            />
            {leavereasonInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter leave reason</Text>
            )}
            <View style={styles.btnSubmit}>
              <Button onPress={buttonPressedHandler}>Apply Leave</Button>
            </View>
          </View>
        </ScrollView>
      )}
      {keyboardStatus=='Keyboard Hidden' && <ParentsHome />}
    </>
  );
};

export default LeaveScreen;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
    width: 220,
  },
  container: {
    padding: 10,
  },
  type: {
    flexWrap: "wrap",
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
    fontFamily: "MonsterratBold",
    fontSize: 16,
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
  root: {
    backgroundColor: "#EBECFO",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  // inputStyle: {
  //   color: "black",
  //   borderBottomWidth: 1,
  //   borderWidthColor: "black",
  //   // backgroundColor: "white",
  //   padding: 10,
  //   // paddingHorizontal: 15,
  //   paddingVertical: 5,
  //   borderRadius: 5,
  //   fontSize: 18,
  //   margin: 10,
  // },
  // labels: {
  //   margin: 5,
  //   fontFamily: "Ubuntu",
  //   fontSize: 18,
  //   // marginTop: 17,
  // },
  errorBorderColor:{
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
    marginTop: 45,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});


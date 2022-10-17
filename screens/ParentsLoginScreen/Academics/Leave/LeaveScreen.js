import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Button as Btn,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Card, DataTable } from "react-native-paper";
import Button from "../../../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import BgButton from "../../../../components/UI/BgButton";

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import ParentsHome from "../../BottomTab/ParentsHome";
import Input from "../../../../components/UI/Input";
import moment from "moment";
import { StudentRegNo } from "../../../../components/StudentItem/StudentItem";
export var statusData=[]
const LeaveScreen = () => {

  const [isApproved,setIsApproved]=useState(false);
  let i=0;
  // const [statusData,setStatusData]=useState([]);
  const [regno, setEnteredRegno] = useState("");
  const [enteredRegNoTouched, setEnteredRegNoTouched] = useState(false);
  const enteredRegNoIsValid = regno.trim() !== "";
  const regnoInputIsInValid = !enteredRegNoIsValid && enteredRegNoTouched;

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

  const [forLeaveList, setForLeaveList] = useState({
    color: "white",
    backgroundColor: "#0C60F4",
    borderRadius: 10,
  });
  const [forLeaveForm, setForLeaveForm] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 10,
  });
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(true);
  // const [data, setData] = useState();
  const [fromShow, setFromShow] = useState(false);
  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText.trim() !== "";
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;

  const [toShow, setToShow] = useState(false);
  const [tomode, setToMode] = useState("date");

  const [toText, setToText] = useState("");
  const [enteredtoDateTouched, setEnteredtoDateTouched] = useState(false);
  const enteredtoDateIsValid = toText.trim() !== "";
  const toDateInputIsInValid = !enteredtoDateIsValid && enteredtoDateTouched;

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
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

  function frmDateHandler(enteredValue) {
    setFromDate(enteredValue);
  }
  function toDateHandler(enteredValue) {
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
    if (event.type == "set") {
      setToText(tDate);
    } else {
      //cancel button clicked
    }
    // console.log(fDate);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Leave/${StudentRegNo}`
        );
      //  console.log(res.data);
      setData(res.data);
      for( i=0;i<res.data.length;i++){
        statusData[i]=res.data[i].leave_status;
      }

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(()=>{
    statusData.forEach(element => {
      element=='Denied'
      setIsApproved(false);
    });
  },[statusData])
  
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

  function LeaveList() {
    setForLeaveList({
      backgroundColor: "#0C60F4",
      color: "white",
      borderRadius: 10,
    });
    setForLeaveForm({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
    });
    setShowForm(false);
    setShowList(true);
  }
  function addLeave() {
    setForLeaveForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    setForLeaveList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setShowForm(true);
    setShowList(false);
  }

  function updateHandler() {
    const FormData = {
      student_reg_number: regno,
      leave_type: leaveType,
      leave_form: fromDate,
      leave_to: toDate,
      leave_reason: leaveReason,
    };
    console.log(FormData);

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
    setEnteredRegNoTouched(true);
    setEnteredLeaveTypeTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredLeaveReasonTouched(true);

    if (!enteredRegNoIsValid) {
      return;
    }
    if (!enteredLeaveTypeIsValid) {
      return;
    }
    if (!enteredFromDateIsValid) {
      return;
    }
    if (!enteredtoDateIsValid) {
      return;
    }
    if (!enteredLeaveReasonIsValid) {
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
  function buttonPressedHandler() {
    const FormData = {
      student_reg_number: regno || StudentRegNo,
      user_num: 0,
      user_role: "student",
      username: "prathima",
      email: "priya123@gmail.com",
      leave_type: leaveType,
      leave_form: fromDate,
      leave_to: toDate,
      leave_reason: leaveReason,
      leave_status: "pending",
    };
    // console.log(FormData);

    // var dateFromValidate = fromText;
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

    // var dateToValidate = toText;
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
    setEnteredRegNoTouched(true);
    setEnteredLeaveTypeTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredLeaveReasonTouched(true);

    // if (!enteredRegNoIsValid) {
    //   return;
    // }
    // if (!enteredLeaveTypeIsValid) {
    //   return;
    // }
    // if (!enteredFromDateIsValid) {
    //   return;
    // }
    // if (!enteredtoDateIsValid) {
    //   return;
    // }
    // if (!enteredLeaveReasonIsValid) {
    //   return;
    // } else {
    async function storeData() {
      console.log(FormData);
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
    //  }
  }
  function stdregnoBlurHandler() {
    setEnteredRegNoTouched(true);
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
  function editItem(id) {
    const filteredDummuyData = data.find((data) => data.id == id);
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

  function deleteItem(id) {
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
      <View style={styles.BtnContainer}>
        <BgButton onPress={LeaveList} style={forLeaveList}>
          Leave List
        </BgButton>

        <BgButton onPress={addLeave} style={forLeaveForm}>
          Apply Leave
        </BgButton>
      </View>
      {showList && (
        <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
        <View style={{ flex: 8, bottom: 10 }}>
          <ScrollView>
          {data &&
              data.map((data, key) => (
                <>
                  <View key={key} style={{height:'260%'}}>
                    <Card style={styles.cardStyle}>
                      <Card.Content>
                      <View style={[{flex:1}, {flexDirection: "row"}]}>
                        <View style={{ flex:1,top:-15 }} >
                          <Text style={[styles.dateStyle,{color:"black"}]}>{moment(data.leave_from).format("DD/MM/YYYY")}
                          <Text style={{fontWeight:'normal',fontSize:deviceWidth < 370 ? 12 : 14,}}> to </Text>{moment(data.leave_to).format("DD/MM/YYYY")}
                          </Text>
                          <Text style={[styles.dateStyle,{color:'black',top:'20%'}]}>
                            Leave type: <Text style={[styles.dateStyle]}>{data.leave_type}</Text>
                          </Text>
                          <Text style={[styles.dateStyle,{color:'black',top:'33%'}]}>
                            Leave reason: <Text style={[styles.dateStyle]}>{data.leave_reason}</Text>
                          </Text>
                        </View>
                        <View style={{top:'2%'}}>
                          <Text style={[styles.status,!isApproved ? 
                            {backgroundColor:'#FECED1',color:'red'} :
                            {backgroundColor:'#EFFFFD',color:'#00B8AC'}]}>
                            {data.leave_status}
                          </Text>
                        </View>
                      </View>
                      </Card.Content>
                    </Card>
                  </View>
                </>
              ))}
          </ScrollView>
        </View>
      </View>
      )}
      {showForm && (
        <ScrollView style={styles.root}>
          <View style={styles.inputForm}>
            <Input
              keyboardType="number-pad"
              placeholder="Student reg no"
              onChangeText={regnoChangeHandler}
              blur={stdregnoBlurHandler}
              value={StudentRegNo.toString() || regno}
              onSubmitEditing={Keyboard.dismiss}
              style={regnoInputIsInValid && styles.errorBorderColor}
            />
            {/* {regnoInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter student registration number
              </Text>
            )} */}

            <Input
              placeholder="Leave Type"
              onChangeText={leaveTypeChangeHandler}
              blur={leavetypeBlurHandler}
              value={leaveType}
              onSubmitEditing={Keyboard.dismiss}
              style={leavetypeInputIsInValid && styles.errorBorderColor}
            />
            {leavetypeInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter leave type
              </Text>
            )}
            <View style={[{ flexDirection: "row" }]}>
              <View style={{ flex: 1 }}>
                <View>
                  <Ionicons
                    style={{
                      top: 23,
                      position: "absolute",
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
                  placeholder="Leave from"
                  style={fromDateInputIsInValid && styles.errorBorderColor}
                  blur={fromDateBlurHandler}
                  onChangeText={leaveFromChangeHandler}
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
                    Enter leave from
                  </Text>
                )}
              </View>
              <View style={styles.space} />
              <View style={{ flex: 1 }}>
                <View>
                  <Ionicons
                    style={{
                      top: 23,
                      position: "absolute",
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
                  placeholder="Leave to"
                  style={toDateInputIsInValid && styles.errorBorderColor}
                  blur={toDateBlurHandler}
                  onChangeText={leaveToChangeHandler}
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
                    Enter leave to
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
            <Input
              onChangeText={leaveReasonChangeHandler}
              blur={leavereasonBlurHandler}
              value={leaveReason}
              placeholder="Leave reason"
              onSubmitEditing={Keyboard.dismiss}
              style={leavereasonInputIsInValid && styles.errorBorderColor}
            />
            {leavereasonInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter leave reason
              </Text>
            )}
            {!isEdit && (
              <View style={styles.btnSubmit}>
                <Button onPress={buttonPressedHandler}>Add Leave</Button>
              </View>
            )}
            {isEdit && (
              <View style={styles.btnSubmit}>
                <Button onPress={updateHandler}>Update</Button>
              </View>
            )}
          </View>
        </ScrollView>
      )}
      {keyboardStatus == "Keyboard Hidden" && <ParentsHome />}
    </>
  );
};

export default LeaveScreen;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
    width: "48%",
    left:'2%',
    top:'1%'
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
    fontFamily: "HindRegular",
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
    top: deviceHieght < 600 ? -25 : "7%",
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
    fontFamily: "HindSemiBold",
    fontSize: 18,
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
  //new one
  status:{
    left:'15%',
    fontSize: deviceWidth < 370 ? 16 : 18,
    fontWeight:'bold',
    top:-15,
    borderRadius:5,
  
    paddingHorizontal:10,
    paddingVertical:10,
    paddingTop:5    
  },
  dateStyle:{
    fontWeight:'bold',
    fontSize: deviceWidth < 370 ? 16 : 17,
    color:'grey',
    top:'5%',
    left:-13
  },
  cardStyle:{
    padding:5,
    margin:10,
    backgroundColor:'#E5E8E8',
    elevation: 5,
    shadowColor: "black",
    backgroundColor: "#E5E8E8",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginRight:'7%',
    marginLeft:'7%',
    marginTop:'10%',
    borderRadius:5
  }
});

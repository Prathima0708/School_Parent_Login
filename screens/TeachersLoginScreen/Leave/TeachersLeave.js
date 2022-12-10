import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Platform,
  Button as Btn,
  Alert,
  Dimensions,
  LogBox,
  Animated,
  ActivityIndicator,
  Pressable,
} from "react-native";
import moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HStack, Spinner,Text as NativeText,Badge, Box } from "native-base";
import { Keyboard } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../../components/UI/Button";
import axios from "axios";
import { UserId } from "../../Login";
import BgButton from "../../../components/UI/BgButton";

import { Ionicons } from "@expo/vector-icons";
import TeachersHome from "../BottomTab/TeachersHome";
import Input from "../../../components/UI/Input";

import { Card, DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "react-native-dynamic-search-bar";
import UnderlinedInput from "../../../components/UI/UnderlinedInput";
import BackButton from "../../../components/UI/BackButton";
export var ID;
export var FROMDATE, TODATE;
export var BADGE;
var USERNAME, value;
const TeachersLeave = () => {

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

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

  const [offset, SetOffset] = useState(0);
  const [typeLabel, setTypeLabel] = useState(false);
  const [reasonLabel, setReasonLabel] = useState(false);

  const [isLeavetypeFocused, setIsLeavetypeFocused] = useState(false);
  const [isLeavereasonFocused, setIsLeavereasonFocused] = useState(false);
  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(false);

  const [btn, setBtn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showTeachersList,setShowTeachersList]=useState(false);

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

  const [enteredFromDate, setEnteredFromDate] = useState(new Date());
  const [enteredToDate, setEnteredToDate] = useState(new Date());

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
  const [isEdit, setIsEdit] = useState(false);
  const [deletePressed, setDeletePressed] = useState(false);
  const [isSame, SetIsSame] = useState(false);

  const [showChoice,setShowChoice]=useState(true);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [showInitialBtn, setShowInitialBtn] = useState(true);
  const navigation = useNavigation();

  const [approvePressed,setApprovePressed]=useState(false);
  const [denyPressed,setDenyPressed]=useState(false);

  const [showBadge,setShowBadge]=useState(false);
  let i = 0;

  useEffect(() => {
    LogBox.ignoreLogs([
      "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false` ",
    ]);
  }, []);

  useLayoutEffect(() => {
    if(showForm){
      setShowForm(true)

      navigation.setOptions({headerShown: false});
    }
    if(showChoice){

      navigation.setOptions({headerShown: true});
    }
    if(showList){

      navigation.setOptions({headerShown: false});
    }
    if(showTeachersList){

      navigation.setOptions({headerShown: false});
    }

   
  }, [showForm,showChoice,showList]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get(`http://10.0.2.2:8000/school/Leave/`)

  //       setData(res.data);
  //       setFilteredData(res.data);
  //       setLoading(false);
  //       // console.log(data)
  //       let test = 0;
  //       const value = await AsyncStorage.getItem("key");
  //       for (i = 0; i < res.data.length; i++) {
  //         if (value == res.data[i].created_by) {
  //           test = res.data[i].created_by;
  //         } else {
  //           // console.log('false')
  //         }
  //       }
  //       if (test == value) {
  //         // console.log("is same")
  //         SetIsSame(true);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

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

  async function fetchUser() {
    USERNAME = await AsyncStorage.getItem("UserName");
    console.log("this is the username from aysnc", USERNAME);
    if (USERNAME !== null) {
      setUser(USERNAME);
    }
  }
  fetchUser();

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

    //console.log(fDate);
  };

  const toDateChangeHandler = (event, selectedToDate) => {
    const currentToDate = selectedToDate;
    TODATE = selectedToDate;
    setToShow(Platform.OS === "ios");
    // setToDate(currentToDate);

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
      // if (event?.type === "dismissed") {
      //   setToText(tDate);
      //   return;
      // }
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
    setFromDate(enteredValue);
  }
  function toDateHandler(enteredValue) {
    setToText(enteredValue);
  }
  function updateHandler() {
    setShowInitialBtn(true);
    const FormData = {
      leave_type: leaveType,
      leave_reason: leaveReason,
      leave_form: FROMDATE,
      leave_to: TODATE,
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

    if (
      !enteredLeaveReasonIsValid ||
      !enteredLeaveTypeIsValid ||
      !enteredFromDateIsValid ||
      !enteredtoDateIsValid
    ) {
      Alert.alert("Please enter all fields");
    } else {
      async function updateData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const dataForm = FormData;
          const resLogin = await axios.put(
            `http://10.0.2.2:8000/school/Leave/${ID}/`,
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
      updateData();

      Alert.alert("Successfully updated", "", [
        { text: "OK", onPress: () => fetchData },
      ]);

      async function fetchData() {
        try {
          const res = await axios.get(`http://10.0.2.2:8000/school/Leave/`);
          setData(res.data);
          setFilteredData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();

      setEnteredLeaveType("");
      setEnteredLeaveReason("");
      setFromText("");
      setToText("");
      setShowForm(false);
      setShowList(true);
      setForLeaveList({
        backgroundColor: "#F4F6F6",
        color: "black",
        borderRadius: 10,
      });
      setForLeaveForm({
        color: "white",
        backgroundColor: "#1E8449",
        borderRadius: 10,
      });
    }
  }
  function buttonPressedHandler() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    setBtn(true);

    console.log(UserId);
    const FormData = {
      student_reg_number: 11,
      user_num: 0,
      user_role: "student",
      username: "prathima",
      email: "priya123@gmail.com",
      leave_type: leaveType,
      leave_form: FROMDATE,
      leave_to: TODATE,
      leave_reason: leaveReason,
      leave_status: "pending",
    };

    const formIsValid = enteredLeaveTypeIsValid && enteredLeaveReasonIsValid;

    if (formIsValid) {
      Alert.alert("Saved Data", "Saved Data successfully", [
        {
          text: "OK",
          onPress: () => {
            setShowForm(false);
            //  setShowList(true);
            showLeave();
          },
        },
      ]);
    }

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
    }

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
    setForLeaveList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForLeaveForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    //}
  }
  function leavetypeBlurHandler() {
    setEnteredLeaveTypeTouched(true);
    setIsLeavetypeFocused(false);
  }
  function onLeavetypeFocusHandler() {
    setIsLeavetypeFocused(true);
    setEnteredLeaveTypeTouched(false);
    setTypeLabel(true);
  }

  function leavereasonBlurHandler() {
    setEnteredLeaveReasonTouched(true);
    setIsLeavereasonFocused(false);
  }
  function onLeavereasonFocusHandler() {
    setIsLeavereasonFocused(true);
    setEnteredLeaveReasonTouched(false);
    setReasonLabel(true);
  }

  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
    setIsFromFocused(false);
  }
  function onFromFocusHandler() {
    setIsFromFocused(true);
    setEnteredFromDateTouched(false);
  }

  function toDateBlurHandler() {
    setEnteredtoDateTouched(true);
    setIsToFocused(false);
  }
  function onToFocusHandler() {
    setIsToFocused(true);
    setEnteredtoDateTouched(false);
  }

  function onScrollHandler(event) {
    setOnScroll(true);
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);

    if (Math.abs(dif) < 3) {
      console.log("unclear");
    } else if (dif > 0) {
      console.log("up");
    } else {
      console.log("down");
    }

    // this.offset = currentOffset;
  }

  function showLeaveForm() {
    setEnteredLeaveType("");
    setEnteredLeaveReason("");
    setFromText("");
    setToText("");
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
    setShowForm(true);
    setShowList(false);
    setEnteredLeaveTypeTouched(false);
    setEnteredLeaveReasonTouched(false);
    setEnteredFromDateTouched(false);
    setEnteredtoDateTouched(false);
    setIsEdit(false);

    setTypeLabel(false);
    setReasonLabel(false);
  }
  function showLeave() {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Leave/`);
        //console.log(res.data);

        setData(res.data);
        setFilteredData(res.data);

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
        setShowForm(false);
        setShowList(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }
  function approveHandler(id) {

    setApprovePressed(true);
    setDenyPressed(false);
    ID = id;

    const fetchedData= data.find((data) => data.id == id);
    
    const FormData = {
      leave_form: fetchedData.leave_form,
      leave_to: fetchedData.leave_to,
      leave_type: fetchedData.leave_type,
      leave_reason: fetchedData.leave_reason,
      leave_status: "approved",
    };

    console.log(FormData);

    if(data.find((data) => data.id == id)){
      console.log("1")
      setShowBadge(true);
    }else{
      setShowBadge(false);
      console.log("2")
    }

  }

  function denyHanlder(id) {
    setDenyPressed(true);
    setApprovePressed(false);

    ID = id;

    const fetchedData= data.find((data) => data.id == id);
    
    const FormData = {
      leave_form: fetchedData.leave_form,
      leave_to: fetchedData.leave_to,
      leave_type: fetchedData.leave_type,
      leave_reason: fetchedData.leave_reason,
      leave_status: "deny",
    };

    console.log(FormData)
  }

  const searchFilter = (text) => {
    console.log("search function");
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.leave_type
          ? item.leave_type.toUpperCase()
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
    setShowInitialBtn(true);
    setShowList(true);
    setShowForm(false);
  }

  // function scrollHandler(event) {
  //   // console.log(event.nativeEvent.contentOffset.y);
  //     let currentOffset = event.nativeEvent.contentOffset.y;
  //     let direction = currentOffset > offset ? 'down' : 'up';
  //     SetOffset(currentOffset);

  //     if(direction=='down'){
  //       setShowInitialBtn(false);
  //     }else{
  //       setShowInitialBtn(true)
  //     }
  // };

  function applyLeave(){
    setShowForm(true);
    setShowChoice(false)
  }

  function myLeaveList(){
    setShowTeachersList(true);
    setShowForm(false);
    setShowChoice(false)
  }

  function showLeaveList(){
    setShowList(true);
    setShowForm(false);
    setShowChoice(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    setBtn(true);
    showLeave();
  }

  function backHandler(){
    setShowChoice(true);
    setShowForm(false)
    setTypeLabel(false);
    setEnteredLeaveTypeTouched(false);
    setReasonLabel(false);
    setEnteredLeaveReasonTouched(false);
    setIsLeavereasonFocused(false);
    setEnteredFromDateTouched(false);
    setEnteredtoDateTouched(false);
    
  }

  function leaveBackHandler(){
    setShowChoice(true);
    setShowList(false);
  }

  function teacherLeaveBackHandler(){
    setShowChoice(true);
    setShowTeachersList(false);
  }

  return (
    <>
      {showChoice && 
        <View style={[{flex:1}, {flexDirection: "column",backgroundColor:'white'}]}>
          <View style={{ flex: 1,marginHorizontal:'20%',top:'10%' }} >
            <Pressable onPress={applyLeave}>
              <Card style={styles.cardStyle}>
                <Card.Content style={{ margin: 1, marginTop: 0 }}>
                  <View style={{ alignItems:'center' }}>
                    <Text
                      style={{
                        fontSize:  15,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      Apply Leave
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </Pressable>
          </View>
          <View style={{ flex: 1,marginHorizontal:'20%' }} >
            <Pressable onPress={myLeaveList}>
              <Card style={styles.cardStyle}>
                <Card.Content style={{ margin: 1, marginTop: 0 }}>
                  <View style={{ alignItems:'center' }}>
                    <Text
                      style={{
                        fontSize:  15,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      My Leave
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </Pressable>
          </View>
          <View style={{ flex: 1,marginHorizontal:'20%',bottom:'10%' }} >
            <Pressable onPress={showLeaveList}>
                <Card style={styles.cardStyle}>
                  <Card.Content style={{ margin: 1, marginTop: 0 }}>
                    <View style={{ alignItems:'center' }}>
                      <Text
                        style={{
                          fontSize:  15,
                          fontFamily: "HindSemiBold",
                          color: "white",
                        }}
                      >
                        View Student Leave
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
            </Pressable>
          </View>
          <View style={{ flex: 0.2}} >
            <TeachersHome />
          </View>
        </View>        
      }
      
      {showForm && (
          <View style={[{flex:1}, {flexDirection: "column", backgroundColor: "white"}]}>
            <View style={[{flex:0.2}, {flexDirection: "row",top:'20%'}]}>
              <BackButton onPress={backHandler}/>
            </View>
          {/* <View style={{ flex: 0.1, backgroundColor: "white",alignItems:'center',paddingVertical:15,top:'10%' }} >
           
          </View> */}
           <View style={styles.headingStyle} >
              <NativeText bold style={{fontSize:20}}>Leave Form</NativeText>
            </View>
          <View style={[styles.inputForm]} >
            <ScrollView>
            <View style={[{flex:1}, {
              flexDirection: "column",paddingVertical:10
            }]}>
              <View style={{ flex: 1,marginHorizontal:20 }} >

                <View style={[{flex:1}, {
                    flexDirection: "row",marginRight:50
                  }]}>
                    <View style={{ flex: 1,alignItems:'center' }} >
                      <Text style={styles.labelStyle}>user name</Text>
                    </View>
                    <View style={{ flex: 1 }} >
                      <TextInput 
                        style={[styles.labelStyle,{borderWidth:1,paddingLeft:7}]}
                        editable={false} 
                        selectTextOnFocus={false} 
                        value={user}/>
                    </View>
                </View>
              </View>
              <View style={styles.space}/>
              <View style={{ flex: 1}} >
              <View style={[{flex:1}, {
                  flexDirection: "row",marginHorizontal:20,marginRight:70
                }]}>
                  <View style={{ flex: 1,alignItems:'center'}} >
                    <Text style={styles.labelStyle}>user role</Text>
                  </View>
                  <View style={{ flex: 1}} >
                    <TextInput 
                      style={[styles.labelStyle,{borderWidth:1,paddingLeft:7}]}
                      editable={false} 
                      selectTextOnFocus={false} 
                      value='user role'/>
                  </View>
                </View>
              </View>
            </View>
                    {/* <View style={styles.inputForm}> */}
                    <View>
                        <View style={!typeLabel ? styles.normal : styles.up}>
                          <Text
                            onPress={onLeavetypeFocusHandler}
                            style={[
                              btn
                                ? styles.normalLabel
                                : leavetypeInputIsInValid
                                ? styles.errorLabel
                                : styles.normalLabel,
                            ]}
                          >
                            Leave type
                          </Text>
                        </View>
                        <Input
                          // placeholder="leave type"
                          onChangeText={leaveTypeChangeHandler}
                          blur={leavetypeBlurHandler}
                          onFocus={onLeavetypeFocusHandler}
                          value={leaveType}
                          onSubmitEditing={Keyboard.dismiss}
                          style={
                            isLeavetypeFocused
                              ? styles.focusStyle
                              : leavetypeInputIsInValid && styles.errorBorderColor
                          }
                        />
                      </View>
                      {leavetypeInputIsInValid && (
                        <Text style={styles.errorText}>Enter the type</Text>
                      )}
                      <View>
                        <View
                          style={
                            !leavetypeInputIsInValid
                              ? !reasonLabel
                                ? styles.normalRemark
                                : styles.upRemark
                              : !reasonLabel
                              ? styles.normalRemarkExtra
                              : [styles.upRemarkExtra, { top: 3 }]
                          }
                        >
                          <Text
                            style={[
                              btn
                                ? styles.normalLabel
                                : leavereasonInputIsInValid
                                ? [
                                    styles.errorLabel,
                                    leavetypeInputIsInValid ? { top: 1 } : { top: 13 },
                                  ]
                                : styles.normalLabel,
                            ]}
                          >
                            Leave reason
                          </Text>
                        </View>

                        {/* <View style={!reasonLabel ? styles.normalRemark : styles.upRemark}>
                        <Text style={[leavereasonInputIsInValid ? styles.errorLabel : styles.normalLabel]}>Leave reason</Text>
                      </View> */}

                        <Input
                          onChangeText={leaveReasonChangeHandler}
                          blur={leavereasonBlurHandler}
                          onFocus={onLeavereasonFocusHandler}
                          value={leaveReason}
                          onSubmitEditing={Keyboard.dismiss}
                          style={
                            isLeavereasonFocused
                              ? styles.focusStyle
                              : leavereasonInputIsInValid && styles.errorBorderColor
                          }
                        />
                      </View>
                      {leavereasonInputIsInValid && (
                        <Text style={styles.errorText}>Enter leave reason</Text>
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
                          <UnderlinedInput
                            value={fromText}
                            placeholder="Leave from"
                            onSubmitEditing={Keyboard.dismiss}
                            style={
                              isFromFocused
                                ? styles.focusStyle
                                : fromDateInputIsInValid && styles.errorBorderColorDate
                            }
                            blur={fromDateBlurHandler}
                            onFocus={onFromFocusHandler}
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
                              select from date
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
                                top: 23,
                              }}
                              name="calendar"
                              size={24}
                              color="black"
                              onPress={() => showToMode("date")}
                            />
                          </View>
                          <UnderlinedInput
                            value={toText}
                            placeholder="Leave to:"
                            onSubmitEditing={Keyboard.dismiss}
                            style={
                              isToFocused
                                ? styles.focusStyle
                                : toDateInputIsInValid && styles.errorBorderColorDate
                            }
                            blur={toDateBlurHandler}
                            onFocus={onToFocusHandler}
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
                              select to date
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
                          <Button onPress={buttonPressedHandler}>Add Leave</Button>
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
                    {/* </View> */}
            </ScrollView>
          </View>
          {keyboardStatus == "Keyboard Hidden" &&
          (<View style={{ flex: 0.2, backgroundColor: "white" }} >
            <TeachersHome />
          </View>)}
          </View>
      )}

    {showTeachersList &&
      <View style={[{flex:1}, {flexDirection: "column"}]}>

        <View style={{ flex: 2, backgroundColor: "white" }} >
          <Ionicons
          name="chevron-back"
          size={25}
          color="black"
          onPress={teacherLeaveBackHandler}
          style={{ left: 15,top:'13%' }}/>
          <NativeText bold fontSize={16} style={{top:'9.1%',left:'12%'}}>Back</NativeText>
          <NativeText bold style={{fontSize:20,left:'35%',top:'10%'}}>Teachers Leave</NativeText>
          <SearchBar
              onSubmitEditing={Keyboard.dismiss}
              style={styles.searchBar}
              textInputStyle={{ fontFamily: "HindRegular", fontSize: 18 }}
              placeholder="Search here by leave type"
              onChangeText={(text) => searchFilter(text)}
              value={searchText}
            />
          <ScrollView  
            scrollEventThrottle={15}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}>
              <View>
              {loading ? (
                    <ActivityIndicator
                      size={40}
                      visible={loading}
                      textContent={"Loading..."}
                      textStyle={styles.spinnerTextStyle}
                    />
                  ) : (
                    <View>
                      <Text>Teachers List goes here...</Text>
                    </View>
                  )}
              </View>
          </ScrollView>
        </View>
        {keyboardStatus == "Keyboard Hidden" &&
        (<View style={{ flex: 0.2, backgroundColor: "white" }} >
          <TeachersHome />
        </View>)}
      </View>}

      {showList &&
      <View style={[{flex:1}, {flexDirection: "column"}]}>

        <View style={{ flex: 2, backgroundColor: "white" }} >
          <Ionicons
          name="chevron-back"
          size={25}
          color="black"
          onPress={leaveBackHandler}
          style={{ left: 15,top:'13%' }}/>
          <NativeText bold fontSize={16} style={{top:'9.1%',left:'12%'}}>Back</NativeText>
          <NativeText bold style={{fontSize:20,left:'40%',top:'10%'}}>Leave List</NativeText>
          <SearchBar
              onSubmitEditing={Keyboard.dismiss}
              style={styles.searchBar}
              textInputStyle={{ fontFamily: "HindRegular", fontSize: 18 }}
              placeholder="Search here by leave type"
              onChangeText={(text) => searchFilter(text)}
              value={searchText}
            />
          <ScrollView
                scrollEventThrottle={15}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: false }
                )}
              >
                <View style={styles.root}>
                  {/* {!filteredData && <Spinner size="lg" />} */}
                  {loading ? (
                    <ActivityIndicator
                      size={40}
                      visible={loading}
                      textContent={"Loading..."}
                      textStyle={styles.spinnerTextStyle}
                    />
                  ) : (
                    filteredData.map((data) => (
                      <>
                        <View>
                          <Card
                            style={{
                              marginVertical: 15,
                              marginHorizontal: 20,
                              elevation: 5,
                              borderRadius: 10,
                              paddingBottom: 20,
                            }}
                          >
                            <Card.Content>
                              <View style={[{ flexDirection: "row" }]}>
                                <View style={{ flex: 2, marginLeft: 5 }}>
                                  <Ionicons
                                    name="calendar"
                                    size={25}
                                    color="#D4AC0D"
                                    style={{ position: "absolute", left: 5 }}
                                  />
                                  <Text style={styles.cardTextStyle}>
                                    Leave from
                                  </Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                  <View style={{ flex: 2 }}>
                                    <Ionicons
                                      name="calendar"
                                      size={25}
                                      color="#D4AC0D"
                                      style={{ position: "absolute", left: 5 }}
                                    />
                                    <Text style={styles.cardTextStyle}>
                                      Leave to
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View style={[{ flexDirection: "row" }]}>
                                <View style={{ flex: 2, left: 45 }}>
                                  <Text
                                    style={{
                                      fontSize: deviceWidth < 370 ? 14 : 16,
                                      fontFamily: "HindSemiBold",
                                      color: "grey",
                                    }}
                                  >
                                    {moment(data.leave_form).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </Text>
                                </View>
                                <View style={{ flex: 2, left: 120 }}>
                                  <Text
                                    style={{
                                      fontSize: deviceWidth < 370 ? 14 : 16,
                                      fontFamily: "HindSemiBold",
                                      color: "grey",
                                    }}
                                  >
                                    {moment(data.leave_to).format("DD/MM/YYYY")}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flex: 2,
                                    left: deviceWidth < 370 ? 90 : 100,
                                    bottom: -65,
                                  }}
                                >
                                   <Ionicons
                                    name="md-checkmark-sharp"
                                    size={24}
                                    color="green"
                                    onPress={() => approveHandler(data.id)}
                                  /> 
                                </View>
                                <View
                                  style={{ flex: 2, left: 50, bottom: -65 }}
                                >
                                  <Ionicons
                                    name="close"
                                    size={24}
                                    color="red"
                                    onPress={() => denyHanlder(data.id)}
                                  />
                                </View>
                              </View>
                              <View style={[{ flexDirection: "row", flex: 1 }]}>
                                <View style={{ flex: 2, left: -15, top: 5 }}>
                                  <Text style={styles.cardTextStyle}>
                                    Leave Reason:
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flex: 2,
                                    left: deviceWidth < 370 ? -20 : -35,
                                    top: 5,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      fontFamily: "HindSemiBold",
                                      color: "grey",
                                    }}
                                  >
                                    {data.leave_reason}
                                  </Text>
                                </View>
                              </View>

                              <View style={[{ flexDirection: "row", flex: 1 }]}>
                                <View
                                  style={{
                                    flex: 2,
                                    left: -15,
                                    top: 5,
                                  }}
                                >
                                  <Text style={styles.cardTextStyle}>
                                    Leave Type:
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flex: 2,
                                    left: deviceWidth < 370 ? -35 : -50,
                                    top: 5,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      fontFamily: "HindSemiBold",
                                      color: "grey",
                                    }}
                                  >
                                    {data.leave_type}
                                  </Text>
                                </View>
                              </View>
                            </Card.Content>
                          </Card>
                        </View>
                      </>
                    ))
                  )}
                </View>
              </ScrollView>
        </View>
        {keyboardStatus == "Keyboard Hidden" &&
        (<View style={{ flex: 0.2, backgroundColor: "white" }} >
          <TeachersHome />
        </View>)}
      </View>}
    </>
  );
};

export default TeachersLeave;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  btnCont:{
    flexDirection:"row",
    top:'57%'
  },
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "#FDFEFE",
  },
  headingStyle:{
    flex: 0.2,
    alignItems:'center',
    backgroundColor:'white',
    marginTop:65,
    justifyContent:'center'
  },
  searchBar: {
    marginTop: 100,
    marginBottom: 20,
    backgroundColor: "#F0F3F4",
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
  home: {
    marginTop: 29,
  },
  root: {
    backgroundColor: "white",

  },
  inputForm: {
    flex:2,
    paddingHorizontal:20,
    //marginTop:'2%',
    //paddingTop: '5%',
    backgroundColor: "white",
   // height: "100%",
  },
  errorBorderColor: {
    borderColor: "red",
  },
  errorBorderColorDate: {
    borderBottomColor: "red",
  },
  // labels: {
  //   margin: 5,
  //   fontFamily: "Ubuntu",
  //   fontSize: 18,
  //   // marginTop: 17,
  // },
  btnSubmit: {
    marginTop: deviceWidth < 370 ? 50 : 70,
    width: "50%",
    marginLeft: 180,
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
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
    left: 35,
  },
  focusStyle: {
    borderColor: "blue",
  },
  normal: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },
  up: {
    top: deviceHieght > 800 ? 26 : 21,
    width: deviceWidth > 400 ? 90 : 85,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },
  errorLabel: {
    color: "red",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
    top: deviceHieght > 800 ? -2 : -2,
  },
  normalLabel: {
    color: "grey",
    //color: "#AEB6BF",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
    fontFamily: "HindRegular",
  },

  normalRemark: {
    position: "absolute",
    top: deviceWidth < 370 ? 20 : 25,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upRemark: {
    top: deviceHieght > 800 ? 25 : 28,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 110 : 100,
  },
  normalRemarkExtra: {
    position: "absolute",
    left: deviceWidth < 370 ? 20 : 30,
    top: 26,
  },
  upRemarkExtra: {
    position: "absolute",
    left: deviceWidth < 370 ? 20 : 30,
    top: 5,
  },
  errorText: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: 16,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  cardStyle:{
    marginVertical: 15,
    marginHorizontal: 27,        
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    backgroundColor:'darkblue',
    width:'80%',
  },
  labelStyle:{
    fontFamily:'HindRegular',
    fontSize:18,
  }
});

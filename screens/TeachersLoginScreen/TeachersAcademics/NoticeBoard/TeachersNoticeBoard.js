// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Text,
//   ScrollView,
//   Alert,
//   Animated,
//   Dimensions,
// } from "react-native";
// import React, { useState } from "react";
// import { useFonts } from "expo-font";
// import Button from "../../../../components/UI/Button";
// import axios from "axios";
// import { Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";

// import BgButton from "../../../../components/UI/BgButton";
// import TeachersHome from "../../BottomTab/TeachersHome";
// import { Keyboard } from "react-native";
// import { useEffect } from "react";
// import Input from "../../../../components/UI/Input";

// import moment from "moment";
// import { DataTable } from "react-native-paper";
// import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
// const TeachersNoticeboard = () => {

//   const [userNameLabel, setUserNameLabel] = useState(false);
//   const [titleLabel, setTitleLabel] = useState(false);
//   const [descLabel, setDescLabel] = useState(false);

//   const [btn, setBtn] = useState(false);

//   const scrollY = new Animated.Value(0);

//   const diffClamp = Animated.diffClamp(scrollY, 0, 100);

//   const headermax = 100;
//   const headermin = 10;

//   const animateHeaderBackGround = scrollY.interpolate({
//     inputRange: [0, headermax - headermin],
//     outputRange: ["white", "white"],
//     extrapolate: "clamp",
//   });

//   const animateHeaderHeight = diffClamp.interpolate({
//     inputRange: [0, headermax - headermin],
//     outputRange: [headermax, headermin],
//     extrapolate: "clamp",
//   });
//   const [isUserFocused, setIsUserFocused] = useState(false);
//   const [isTitleFocused, setIsTitleFocused] = useState(false);
//   const [isDescFocused, setIsDescFocused] = useState(false);
//   const [isDOCFocused, setIsDOCFocused] = useState(false);

//   const [showForm, setShowForm] = useState(true);
//   const [showList, setShowList] = useState(false);

//   const [forNoticeList, setForNoticeList] = useState({
//     color: "white",
//     backgroundColor: "#0C60F4",
//     borderRadius: 10,
//     borderBottomWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     fontFamily: "HindSemiBold",
//   });
//   const [forNoticeForm, setForNoticeForm] = useState({
//     color: "black",
//     backgroundColor: "#F4F6F6",
//     borderRadius: 10,
//     borderBottomWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     fontFamily: "HindSemiBold",
//   });

//   const [username, setEnteredUserName] = useState("");
//   const [enteredUserNameTouched, setEnteredUserNameTouched] = useState(false);
//   const enteredUserNameIsValid = username.trim() !== "";
//   const usernameInputIsInValid =
//     !enteredUserNameIsValid && enteredUserNameTouched;

//   const [title, setEnteredTitle] = useState("");
//   const [enteredTitleTouched, setEnteredTitleTouched] = useState(false);
//   const enteredTitleIsValid = title.trim() !== "";
//   const titleInputIsInValid = !enteredTitleIsValid && enteredTitleTouched;

//   const [description, setEnteredDescription] = useState("");
//   const [enteredDescriptionTouched, setEnteredDescriptionTouched] =
//     useState(false);
//   const enteredDescriptionIsValid = description.trim() !== "";
//   const descriptionInputIsInValid =
//     !enteredDescriptionIsValid && enteredDescriptionTouched;

//   const [dateOfCreation, setEnteredDateOfCreation] = useState("");
//   const [fromShow, setFromShow] = useState(false);
//   const [frommode, setFromMode] = useState("date");
//   const [fromDate, setFromDate] = useState(new Date());

//   const [fromText, setFromText] = useState("");
//   const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
//   const enteredFromDateIsValid = fromText.trim() !== "";
//   const fromDateInputIsInValid =
//     !enteredFromDateIsValid && enteredFromDateTouched;

//   const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
//   const [data, setData] = useState([]);
//   const [isSame, SetIsSame] = useState(false);
//   let i = 0;

//   const [showInitialBtn, setShowInitialBtn] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await axios.get(`http://10.0.2.2:8000/school/NoticeBoard/`);
//         setData(res.data);
//         let test = 0;
//         const value = await AsyncStorage.getItem("key");
//         for (i = 0; i < res.data.length; i++) {
//           if (value == res.data[i].created_by) {
//             test = res.data[i].created_by;
//           } else {
//             // console.log('false')
//           }
//         }
//         if (test == value) {
//           // console.log("is same")
//           SetIsSame(true);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
//       setKeyboardStatus("Keyboard Shown");
//     });
//     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
//       setKeyboardStatus("Keyboard Hidden");
//     });

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   const showFromMode = (currentFromMode) => {
//     setFromShow(true);

//     setFromMode(currentFromMode);
//   };
//   function frmDateHandler(enteredValue) {
//     setFromText(enteredValue);
//   }
//   const fromDateChangeHandler = (event, selectedFromDate) => {
//     const currentFromDate = selectedFromDate || fromDate;
//     setFromShow(Platform.OS === "ios");
//     setFromDate(currentFromDate);

//     let tempFromDate = new Date(currentFromDate);
//     let fDate =
//       tempFromDate.getDate() +
//       "/" +
//       (tempFromDate.getMonth() + 1) +
//       "/" +
//       tempFromDate.getFullYear();

//     if (event.type == "set") {
//       setFromText(fDate);
//     } else {
//       //cancel button clicked
//     }
//     //console.log(fDate);
//   };
//   function userNameChangeHandler(enteredValue) {
//     setEnteredUserName(enteredValue);
//   }
//   function titleChangeHandler(enteredValue) {
//     setEnteredTitle(enteredValue);
//   }
//   function descriptionChangeHandler(enteredValue) {
//     setEnteredDescription(enteredValue);
//   }
//   function dateOfCreationChangeHandler(enteredValue) {
//     setEnteredDateOfCreation(enteredValue);
//   }

//   function buttonPressedHandler() {
//     setBtn(true);
//     var dateFromValidate = fromText;
//     var isValid = moment(dateFromValidate, "D/M/YYYY", true).isValid();
//     // if (!isValid) {
//     //   Alert.alert(
//     //     "Format Error",
//     //     "It seems to be you entered wrong date format please follow D/M/YYYY format ",
//     //     [
//     //       {
//     //         text: "Cancel",
//     //         onPress: () => console.log("Cancel Pressed"),
//     //         style: "cancel",
//     //       },
//     //       { text: "OK", onPress: () => console.log("OK Pressed") },
//     //     ]
//     //   );
//     // }

//     setEnteredUserNameTouched(true);
//     setEnteredTitleTouched(true);
//     setEnteredDescriptionTouched(true);
//     setEnteredFromDateTouched(true);

//     if (!enteredUserNameIsValid) {
//       return;
//     }
//     if (!enteredTitleIsValid) {
//       return;
//     }
//     if (!enteredDescriptionIsValid) {
//       return;
//     }
//     if (!enteredFromDateIsValid) {
//       return;
//     } else {
//       async function storeData() {
//         try {
//           let headers = {
//             "Content-Type": "application/json; charset=utf-8",
//           };

//           const resLogin = await axios.post(
//             `http://10.0.2.2:8000/school/NoticeBoard/`,
//             dataForm,
//             {
//               headers: headers,
//             }
//           );
//           // const token = resLogin.data.token;
//           // const userId = resLogin.data.user_id;
//           //console.log(token);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       storeData();
//       setEnteredUserNameTouched(false);
//       setEnteredTitleTouched(false);
//       setEnteredDescriptionTouched(false);
//       setEnteredFromDateTouched(false);
//       setShowForm(false);
//       setShowList(true);
//       setForNoticeList({
//         color: "black",
//         backgroundColor: "#F4F6F6",
//         borderRadius: 10,
//       });
//       setForNoticeForm({
//         color: "white",
//         backgroundColor: "#1E8449",
//         borderRadius: 10,
//       });
//     }
//   }
//   function usernameInputBlur() {
//     setEnteredUserNameTouched(true);
//     setIsUserFocused(false);
//   }
//   function onFocusUserHandler() {
//     setIsUserFocused(true);
//     setEnteredUserNameTouched(false);
//     setUserNameLabel(true);
//   }

//   function titleInputBlur() {
//     setEnteredTitleTouched(true);
//     setIsTitleFocused(false);
//   }
//   function onFocusTitleHandler() {
//     setIsTitleFocused(true);
//     setEnteredTitleTouched(false);
//     setTitleLabel(true);
//   }

//   function descriptionInputBlur() {
//     setEnteredDescriptionTouched(true);
//     setIsDescFocused(false);
//   }
//   function onFocusDescHandler() {
//     setIsDescFocused(true);
//     setEnteredDescriptionTouched(false);
//     setDescLabel(true);
//   }

//   function datecreationInputBlur() {
//     setEnteredFromDateTouched(true);
//     setIsDOCFocused(false);
//   }
//   function onFocusDOCHandler() {
//     setIsDOCFocused(true);
//     setEnteredFromDateTouched(false);
//   }

//   function showNoticeForm() {
//     setUserNameLabel(false);
//     setTitleLabel(false);
//     setDescLabel(false);

//     setForNoticeList({
//       backgroundColor: "#0C60F4",
//       color: "white",
//       borderRadius: 10,
//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//     });

//     setForNoticeForm({
//       color: "black",
//       backgroundColor: "#F4F6F6",
//       borderRadius: 10,

//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//     });

//     setShowForm(true);
//     setShowList(false);
//   }

//   function showNotice() {
//     setForNoticeForm({
//       color: "white",
//       backgroundColor: "#1E8449",
//       borderRadius: 10,
//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//     });
//     setForNoticeList({
//       backgroundColor: "#F4F6F6",
//       color: "black",
//       borderRadius: 10,
//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//     });
//     setShowForm(false);
//     setShowList(true);
//   }
//   return (
//     <>
//       {showInitialBtn && (
//         <Animated.View
//           style={[
//             {
//               height: animateHeaderHeight,
//               backgroundColor: animateHeaderBackGround,
//             },
//           ]}
//         >
//           <View style={styles.BtnContainer}>
//             <BgButton onPress={showNoticeForm} style={forNoticeList}>
//               Add New
//             </BgButton>

//             <BgButton onPress={showNotice} style={forNoticeForm}>
//               Show List
//             </BgButton>
//           </View>
//         </Animated.View>
//       )}
//       {showForm && (
//         <ScrollView style={styles.root}>
//           <View style={styles.inputForm}>
//               <View style={!userNameLabel ? styles.normal : styles.up}>
//                 <Text
//                   style={[
//                     btn
//                       ? styles.normalLabel
//                       : usernameInputIsInValid
//                       ? styles.errorLabel
//                       : styles.normalLabel,
//                   ]}
//                   onPress={onFocusUserHandler}
//                   onPressOut={usernameInputBlur}
//                 >
//                   Username
//                 </Text>
//               </View>
//             <Input
//               // placeholder="Username"
//               onChangeText={userNameChangeHandler}
//               blur={usernameInputBlur}
//               onFocus={onFocusUserHandler}
//               value={username}
//               onSubmitEditing={Keyboard.dismiss}
//               style={
//                 isUserFocused
//                   ? styles.focusStyle
//                   : usernameInputIsInValid && styles.errorBorderColor
//               }
//             />
//             {usernameInputIsInValid && (
//               <Text style={{ color: "red", left: 20 }}>Enter Username</Text>
//             )}
//             <View>
//             <View style={!titleLabel ? styles.normalVeh : styles.upVeh}>
//               <Text
//                 style={[
//                   btn
//                     ? styles.normalLabel
//                     : titleInputIsInValid
//                     ? styles.vehError
//                     : styles.normalLabel,
//                 ]}
//                 onPress={onFocusTitleHandler}
//               >
//                 Title
//               </Text>
//             </View>
//             <Input
//               keyboardType="number-pad"
//               // placeholder="Title"
//               onChangeText={titleChangeHandler}
//               blur={titleInputBlur}
//               onFocus={onFocusTitleHandler}
//               value={title}
//               onSubmitEditing={Keyboard.dismiss}
//               style={
//                 isTitleFocused
//                   ? styles.focusStyle
//                   : titleInputIsInValid && styles.errorBorderColor
//               }
//             />
//             </View>

//             {titleInputIsInValid && (
//               <Text style={{ color: "red", left: 20 }}>Enter title</Text>
//             )}
//             <View>
//             <View style={!descLabel ? styles.normalType : styles.upType}>
//                 <Text
//                   style={[
//                     btn
//                       ? styles.normalLabel
//                       : descriptionInputIsInValid
//                       ? styles.errorLabel
//                       : styles.normalLabel,
//                   ]}
//                   onPress={onFocusDescHandler}
//                 >Description</Text>
//             </View>
//             <Input
//               onChangeText={descriptionChangeHandler}
//               blur={descriptionInputBlur}
//               onFocus={onFocusDescHandler}
//               value={description}
//               onSubmitEditing={Keyboard.dismiss}
//               style={
//                 isDescFocused
//                   ? styles.focusStyle
//                   : descriptionInputIsInValid && styles.errorBorderColor
//               }
//             />
//             </View>

//             {descriptionInputIsInValid && (
//               <Text style={{ color: "red", left: 20 }}>Enter description</Text>
//             )}

//                 <View style={{ flex: 1,width:'45%',left:'5%' }}>
//                   <View>
//                     <Ionicons
//                       style={{
//                         position: "absolute",
//                         top: 19,
//                       }}
//                       name="calendar"
//                       size={24}
//                       color="black"
//                       onPress={() => showFromMode("date")}
//                     />
//                   </View>
//                   <UnderlinedInput
//                     value={fromText || fromDate}
//                     placeholder="Start date"
//                     onSubmitEditing={Keyboard.dismiss}
//                     style={
//                       isDOCFocused
//                         ? styles.focusStyle
//                         : fromDateInputIsInValid && styles.errorBorderColorDate
//                     }
//                     blur={datecreationInputBlur}
//                     onFocus={onFocusDOCHandler}
//                     onChangeText={frmDateHandler}
//                     onPressIn={() => showFromMode("date")}
//                   />
//                   {fromDateInputIsInValid && (
//                     <Text style={styles.commonErrorMsg}>Creation Date</Text>
//                   )}
//                   {fromShow && (
//                     <DateTimePicker
//                       testID="dateTimePicker"
//                       value={fromDate}
//                       mode={frommode}
//                       is24Hour={true}
//                       display="default"
//                       onChange={fromDateChangeHandler}
//                     />
//                   )}
//                 </View>
//             {/* <View>
//               <Ionicons
//                 style={{
//                   position: "absolute",
//                   top: 23,
//                 }}
//                 name="calendar"
//                 size={24}
//                 color="black"
//                 onPress={() => showFromMode("date")}
//               />
//               {fromShow && (
//                 <DateTimePicker
//                   testID="dateTimePicker"
//                   value={fromDate}
//                   mode={frommode}
//                   is24Hour={true}
//                   display="default"
//                   onChange={fromDateChangeHandler}
//                 />
//               )}
//             </View>
//             <Input
//               value={fromText || fromDate}
//               onSubmitEditing={Keyboard.dismiss}
//               placeholder=" Date of creation:"
//               style={
//                 isDOCFocused
//                   ? styles.focusStyle
//                   : fromDateInputIsInValid && styles.errorBorderColor
//               }
//               blur={datecreationInputBlur}
//               onFocus={onFocusDOCHandler}
//               onChangeText={frmDateHandler}
//             />
//             {fromDateInputIsInValid && (
//               <Text style={{ color: "red", left: 20 }}>Enter Date</Text>
//             )} */}
//             <View style={styles.btnSubmit}>
//               <Button onPress={buttonPressedHandler}>Add Notice</Button>
//             </View>
//           </View>
//         </ScrollView>
//       )}
//       {showList && (
//         <ScrollView horizontal={true}>
//           <DataTable>
//             <DataTable.Header style={styles.tableHeader}>
//               <View style={styles.th}>
//                 <Text style={styles.tableTitle}>Title</Text>
//               </View>
//               <View style={styles.th}>
//                 <Text style={styles.tableTitle}>Description</Text>
//               </View>
//               {/* <View style={styles.th}>
//                 <Text style={styles.tableTitle}>created by</Text>
//               </View> */}
//               <View style={styles.th}>
//                 <Text style={styles.tableTitle}>Start Date</Text>
//               </View>
//               <View style={styles.th}>
//                 <Text style={styles.tableTitle}>End Date</Text>
//               </View>
//               {isSame && (
//                 <View style={styles.th}>
//                   <Text style={styles.tableTitle}>Update</Text>
//                 </View>
//               )}
//               {isSame && (
//                 <View style={styles.th}>
//                   <Text style={styles.tableTitle}>Delete</Text>
//                 </View>
//               )}
//             </DataTable.Header>
//             {data &&
//               data.map((data, key) => (
//                 <DataTable.Row style={styles.tableRow}>
//                   {/* <DataTable.Cell style={styles.tableCell}>
//                     {data.id}
//                   </DataTable.Cell> */}
//                   <DataTable.Cell style={styles.tableCell}>
//                     {data.titlee}
//                   </DataTable.Cell>
//                   <DataTable.Cell style={styles.tableCell}>
//                     {data.description}
//                   </DataTable.Cell>
//                   {/* <DataTable.Cell style={styles.tableCell}>
//                    {data.created_by}
//                   </DataTable.Cell> */}
//                   <DataTable.Cell style={styles.tableCell}>
//                     {data.startdate}
//                   </DataTable.Cell>
//                   <DataTable.Cell style={styles.tableCell}>
//                     {data.enddate}
//                   </DataTable.Cell>
//                   {isSame && (
//                     <DataTable.Cell style={styles.tableCell}>
//                       <Btn title="Edit" onPress={() => editItem(data.id)} />
//                     </DataTable.Cell>
//                   )}
//                   {isSame && (
//                     <DataTable.Cell style={styles.tableCell}>
//                       <Btn title="Delete" onPress={() => deleteItem(data.id)} />
//                     </DataTable.Cell>
//                   )}
//                 </DataTable.Row>
//               ))}
//           </DataTable>
//         </ScrollView>
//       )}
//       {showForm && keyboardStatus == "Keyboard Hidden" && <TeachersHome />}
//     </>
//   );
// };

// export default TeachersNoticeboard;

// const deviceWidth = Dimensions.get("window").width;
// const deviceHieght = Dimensions.get("window").height;

// const styles = StyleSheet.create({
//   BtnContainer: {
//     fontSize: 24,
//     flexDirection: "row",

//     width: "100%",

//     backgroundColor: "#FDFEFE",
//   },
//   home: {
//     marginTop: 29,
//   },
//   root: {
//     backgroundColor: "white",
//   },
//   inputForm: {
//     padding: 20,
//     paddingTop: 5,
//   },
//   errorBorderColor: {
//     borderColor: "red",
//   },
//   labels: {
//     margin: 5,
//     fontFamily: "Ubuntu",
//     fontSize: 18,
//     // marginTop: 17,
//   },
//   btnSubmit: {
//     marginTop: 30,
//     marginBottom: 30,
//   },
//   th: {
//     padding: 5,

//     //fontSize: 24,
//   },
//   tableHeader: {
//     backgroundColor: "skyblue",

//     height: 50,
//     fontWeight: "bold",
//   },
//   tableTitle: {
//     // padding: 5,
//     margin: 7,
//     fontFamily: "MonsterratBold",
//     fontSize: 16,
//   },
//   tableCell: {
//     width: 50,
//     //  fontFamily: "Montserrat_600SemiBold",
//     left: 5,
//   },

//   tableRow: {
//     height: "9%",
//     borderBottomColor: "black",
//     borderBottomWidth: 2,
//   },
//   focusStyle: {
//     borderColor: "blue",
//   },
//   normal: {
//     position: "absolute",
//     top: deviceWidth < 370 ? 27 : 30,
//     left: deviceWidth < 370 ? 40 : 50,
//   },
//   up: {
//     position: "absolute",
//     top: deviceWidth < 370 ? 2 : 7,
//     left: deviceWidth < 370 ? 40 : 50,
//     fontFamily: "HindRegular",
//   },
//   normalLabel: {
//     // color: "#A7ADAD",
//     color: "#AEB6BF",
//     // backgroundColor: "#F2F2F2",
//     backgroundColor: "white",
//     paddingHorizontal: 5,
//     fontSize: deviceWidth < 370 ? 13 : 16,
//     letterSpacing: 0.5,
//   },
//   errorLabel: {
//     color: "red",
//     //  backgroundColor: "#F2F2F2",
//     backgroundColor: "white",
//     paddingHorizontal: 5,
//     fontSize: deviceWidth < 370 ? 13 : 17,
//     fontFamily: "HindRegular",
//   },
//   normalVeh: {
//     position: "absolute",
//     top: deviceWidth < 370 ? 23 : 25,
//     left: deviceWidth < 370 ? 20 : 30,
//     fontFamily: "HindRegular",
//   },
//   upVeh: {
//     top: deviceWidth < 370 ? 15 : 25,
//     width: deviceWidth < 370 ? 100 : 50,
//     left: deviceWidth < 370 ? 20 : 30,
//     color: "black",
//     height: 20,
//     fontFamily: "HindRegular",
//   },
//   vehError: {
//     bottom: deviceWidth < 370 ? 15 : 3,
//     color: "red",
//     //  backgroundColor: "#F2F2F2",
//     backgroundColor: "white",
//     paddingHorizontal: 5,
//     fontSize: deviceWidth < 370 ? 13 : 16,
//     fontFamily: "HindRegular",
//   },
//   normalType: {
//     position: "absolute",
//     top: deviceWidth < 370 ? 23 : 25,
//     left: deviceWidth < 370 ? 20 : 30,
//     fontFamily: "HindRegular",
//   },
//   upType: {
//     top: deviceHieght > 800 ? 30 : 27,
//     width: deviceWidth > 400 ? 130 : 100,
//     left: deviceWidth < 370 ? 20 : 30,
//     fontFamily: "HindRegular",
//   },
//   commonErrorMsg: {
//     color: "red",
//     left: 20,
//     fontFamily: "HindRegular",
//     fontSize: deviceWidth < 370 ? 16 : 18,
//     top: deviceHieght > 800 ? -3 : 1,
//   },
//   errorBorderColorDate: {
//     borderBottomColor: "red",
//   },
// });

// import { View, Text, Alert, Platform } from "react-native";
// import React, { useEffect } from "react";
// import * as Notifications from "expo-notifications";

// const TeachersNoticeBoard = () => {
//   useEffect(() => {
//     async function configurePushNotifications() {
//       const { status } = await Notifications.getPermissionsAsync();
//       let finalStatus = status;
//       if (finalStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== "granted") {
//         Alert.alert(
//           "Permission required",
//           "push notifications need appropriate permission"
//         );
//         return;
//       }
//       const pushTokenData = await Notifications.getExpoPushTokenAsync();

//       console.log(pushTokenData);

//       if (Platform.OS === "android") {
//         Notifications.setNotificationChannelAsync("default", {
//           name: "default",
//           importance: Notifications.AndroidImportance.DEFAULT,
//         });
//       }
//     }
//     configurePushNotifications();
//   }, []);
//   return (
//     <View>
//       <Text>TeachersNoticeBoard</Text>
//     </View>
//   );
// };

// export default TeachersNoticeBoard;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Dimensions, Button, Alert, Platform} from 'react-native';
import MapView from 'react-native-maps';
import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async ()=>{
    return {
      shouldPlaySound: false,
      shouldSetBadge:false,
      shouldShowAlert:true
    }
  }
});

export default function TeachersNoticeBoard() {

  const [pushTkn,setPushTkn]=useState()
  useEffect(()=>{

    async function configurePushNotifications(){
      const {status}=await Notifications.getPermissionsAsync();
      let finalStatus=status;

      if(finalStatus!=='granted'){
        const {status}=await Notifications.requestPermissionsAsync();
        finalStatus=status;
      }

      if(finalStatus!=='granted'){
        Alert.alert('permission required',
        'Push notifications need the appropriate permissions.');
        return;
      }

        const pushTokenData=await Notifications.getExpoPushTokenAsync().then((pushToken)=>{
        console.log(pushToken);
        setPushTkn(pushToken)

        if(Platform.OS==='android'){
          Notifications.setNotificationChannelAsync("default",{
            name:'default',
            importance:Notifications.AndroidImportance.DEFAULT
          });
        }
      });
    }

    configurePushNotifications();
    
  },[]);

  useEffect(()=>{
   const subscription1= Notifications.addNotificationReceivedListener(
      (notification)=>{
        console.log('Notification received')
        // console.log("token",notification)
      });

      const subscription2=Notifications.addNotificationResponseReceivedListener((response)=>{
        console.log('Notification response received')
        //console.log(response)
      });
      return()=>{
        subscription1.remove();
        subscription2.remove();
      };

  },[]);

  function scheduleNotificationsHanlder(){
    Notifications.scheduleNotificationAsync({
      content: {
        title:'First local notification',
        body:'This is the body of the notification.',
        data:{
          userName:'Max'
        }},
        trigger:{
          seconds:5
        }
      });
    }

    function sendPushNotificationHanlder(){
      fetch('https://exp.host/--/api/v2/push/send',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          to:'ExponentPushToken[iWXLqlFo1CWm6tGpnc4KBa]',
          title:'Push notification',
          body:'This is a Push notification'
        })
      })
    }

  return (
    <>
      <View style={styles.container}>
      <View style={{flexDirection:'row',top:'10%',left:'4%'}}>
        <Button 
          title='Locale Notification'
          onPress={scheduleNotificationsHanlder}/>
        <View style={styles.space} />
        <Button 
          title='Push Notification'
          onPress={sendPushNotificationHanlder}/>
      </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginHorizontal:10
    // alignItems: 'center',
    // justifyContent: 'center',
    // top:100
  },
  space: {
    width: 20,
    height: 20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


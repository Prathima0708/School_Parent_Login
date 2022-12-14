// import { View, StyleSheet, TextInput, Text, Dimensions } from "react-native";
// import { useEffect, useState } from "react";
// import BgButton from "../../../components/UI/BgButton";
// import VerticalLine from "../../../components/UI/VerticalLine";
// import ParentsHome from "../BottomTab/ParentsHome";
// import { Keyboard } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { ScrollView } from "react-native";
// import Input from "../../../components/UI/Input";
// import Button from "../../../components/UI/Button";
// import Toast from "react-native-simple-toast";
// function Noticeboard() {
//   // const [forNoticeList, setForNoticeList] = useState({
//   //   color: "black",
//   //   fontWeight: "bold",
//   // });
//   const [showForm, setShowForm] = useState(true);
//   const [showList, setShowList] = useState(false);
//   const [forNoticeList, setForNoticeList] = useState({
//     color: "black",
//     fontWeight: "bold",
//   });
//   const [forNoticeForm, setForNoticeForm] = useState({ color: "black" });
//   const [creatorofnotice, setCreatorOfNotice] = useState("");
//   const [enteredCreatorOfNoticeTouched, setEnteredCreatorOfNoticeTouched] =
//     useState(false);
//   const enteredCreatorOfNoticeIsValid = creatorofnotice.trim() !== "";
//   const creatorofnoticeInputIsInValid =
//     !enteredCreatorOfNoticeIsValid && enteredCreatorOfNoticeTouched;

//   const [title, setTitle] = useState("");
//   const [enteredTitleTouched, setEnteredTitleTouched] = useState(false);
//   const enteredTitleIsValid = title.trim() !== "";
//   const titleInputIsInValid = !enteredTitleIsValid && enteredTitleTouched;

//   const [description, setDescription] = useState("");
//   const [enteredDescriptionTouched, setEnteredDescriptionTouched] =
//     useState(false);
//   const enteredDescriptionIsValid = description.trim() !== "";
//   const descriptionInputIsInValid =
//     !enteredDescriptionIsValid && enteredDescriptionTouched;

//   // const [forAddNotice, setForAddNotice] = useState({ color: "black" });
//   // const [showForm, setShowForm] = useState(false);
//   // const [showTable, setShowTable] = useState(true);
//   const [fromShow, setFromShow] = useState(false);
//   const [frommode, setFromMode] = useState("date");
//   const [fromDate, setFromDate] = useState(new Date());

//   const [fromText, setFromText] = useState("");
//   const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
//   const enteredFromDateIsValid = fromText.trim() !== "";
//   const fromDateInputIsInValid =
//     !enteredFromDateIsValid && enteredFromDateTouched;

//   const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

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

//   function crtofnoticeChangeHandler(enteredValue) {
//     setCreatorOfNotice(enteredValue);
//   }
//   function titleChangeHandler(enteredValue) {
//     setTitle(enteredValue);
//   }
//   function descriptionChangeHandler(enteredValue) {
//     setDescription(enteredValue);
//   }
//   function frmDateHandler(enteredValue) {
//     setFromText(enteredValue);
//   }
//   const showFromMode = (currentFromMode) => {
//     setFromShow(true);

//     setFromMode(currentFromMode);
//   };

//   function NoticeList() {
//     setForNoticeList({ fontWeight: "bold", color: "black" });
//     setForAddNotice({ color: "black" });
//     setShowForm(false);
//     setShowTable(true);
//   }
//   function addNotice() {
//     setForAddNotice({ fontWeight: "bold", color: "black" });
//     setForNoticeList({ color: "black" });
//     setShowForm(true);
//     setShowTable(false);
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

//   function buttonPressedHandler() {
//     setEnteredCreatorOfNoticeTouched(true);
//     setEnteredTitleTouched(true);
//     setEnteredDescriptionTouched(true);
//     setEnteredFromDateTouched(true);

//     if (!enteredCreatorOfNoticeIsValid) {
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
//       Toast.show("Successfully Notice Added", Toast.LONG, [
//         "UIAlertController",
//       ]);
//       setEnteredCreatorOfNoticeTouched(false);
//       setEnteredTitleTouched(false);
//       setEnteredDescriptionTouched(false);
//       setEnteredFromDateTouched(false);
//       setShowForm(false);
//       setShowList(true);
//       setForNoticeList({ fontWeight: "bold", color: "black" });
//       setForNoticeForm({ color: "black" });
//       setForNoticeForm({ fontWeight: "bold", color: "black" });
//       setForNoticeList({ color: "black" });
//     }
//   }
//   function crtofnoticeInputBlur() {
//     setEnteredCreatorOfNoticeTouched(true);
//   }

//   function titleInputBlur() {
//     setEnteredTitleTouched(true);
//   }

//   function descriptionInputBlur() {
//     setEnteredDescriptionTouched(true);
//   }

//   function datecreationInputBlur() {
//     setEnteredFromDateTouched(true);
//   }
//   function showNoticeForm() {
//     setForNoticeList({ fontWeight: "bold", color: "black" });
//     setForNoticeForm({ color: "black" });
//     setShowForm(true);
//     setShowList(false);
//   }
//   function showNotice() {
//     setForNoticeForm({ fontWeight: "bold", color: "black" });
//     setForNoticeList({ color: "black" });
//     setShowForm(false);
//     setShowList(true);
//   }
//   return (
//     <>
//       <View style={styles.BtnContainer}>
//         {/* <BgButton onPress={showNoticeForm} style={forNoticeList}>
//         Add Notice
//       </BgButton>
//       <VerticalLine>|</VerticalLine>
//       <BgButton onPress={showNotice} style={forNoticeForm}>
//         Show Notice
//     </BgButton> */}
//       </View>
//       {showForm && (
//         <ScrollView>
//           <View style={styles.root}>
//             <Input
//               onSubmitEditing={Keyboard.dismiss}
//               placeholder="Creator of notice"
//               onChangeText={crtofnoticeChangeHandler}
//               blur={crtofnoticeInputBlur}
//               style={creatorofnoticeInputIsInValid && styles.errorBorderColor}
//             />
//             {creatorofnoticeInputIsInValid && (
//               <Text style={{ color: "red", left: 20 }}>
//                 Enter the creator name
//               </Text>
//             )}

//             <Input
//               onSubmitEditing={Keyboard.dismiss}
//               placeholder="Title"
//               onChangeText={titleChangeHandler}
//               blur={titleInputBlur}
//               style={titleInputIsInValid && styles.errorBorderColor}
//             />
//             {titleInputIsInValid && (
//               <Text style={{ color: "red", left: 20 }}>Enter the title</Text>
//             )}

//             <Input
//               onSubmitEditing={Keyboard.dismiss}
//               placeholder="Description"
//               onChangeText={descriptionChangeHandler}
//               blur={descriptionInputBlur}
//               style={descriptionInputIsInValid && styles.errorBorderColor}
//             />
//             {descriptionInputIsInValid && (
//               <Text style={{ color: "red", left: 20 }}>
//                 Enter the description
//               </Text>
//             )}
//             <View>
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
//               placeholder="Date of Creation"
//               style={fromDateInputIsInValid && styles.errorBorderColor}
//               blur={datecreationInputBlur}
//               onChangeText={frmDateHandler}
//             />
//             {fromDateInputIsInValid && (
//               <Text style={{ color: "red", left: 20 }}>
//                 Enter creation date
//               </Text>
//             )}
//             <View style={styles.btnSubmit}>
//               <Button onPress={buttonPressedHandler}>Add Notice</Button>
//             </View>
//           </View>
//         </ScrollView>
//       )}
//       {showList && (
//         <View>
//           <Text>NoticeList</Text>
//         </View>
//       )}
//       {showForm && keyboardStatus == "Keyboard Hidden" && (
//         <View style={styles.home}>
//           <ParentsHome />
//         </View>
//       )}
//     </>
//   );
// }

// export default Noticeboard;

// const deviceHieght = Dimensions.get("window").height;
// const deviceWidth = Dimensions.get("window").width;
// const styles = StyleSheet.create({
//   BtnContainer: {
//     fontSize: 24,
//     flexDirection: "row",
//   },
//   root: {
//     // backgroundColor: "skyblue",
//     paddingLeft: 20,
//     paddingRight: 20,
//     // margin: 20,
//     borderRadius: 15,
//   },

//   // labels: {
//   //   fontSize: 18,
//   //   color: "black",
//   //   //  color: "#7d7d7d",
//   //   marginTop: 10,
//   //   marginBottom: 5,
//   //   lineHeight: 25,

//   //   marginBottom: 4,
//   //   //fontFamily: "regular",
//   // },

//   errorBorderColor: {
//     color: "black",
//     borderBottomWidth: 1,
//     borderColor: "red",
//     padding: 10,
//     margin: 15,
//     paddingVertical: 5,
//     borderRadius: 5,
//     fontSize: 18,
//   },
//   btnSubmit: {
//     top: deviceHieght < 600 ? "1%" : "2%",
//     marginBottom: 30,
//   },
// });

// const NoticeBoard = () => {
//   const data = [
//     {
//       id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//       fullName: "Some Notice",
//       timeStamp: "12:47 PM",
//       recentText: "Good Day!",
//       avatarUrl:
//         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     },
//     {
//       id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//       fullName: "Some Notice",
//       timeStamp: "11:11 PM",
//       recentText: "Cheer up, there!",
//       avatarUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
//     },
//     {
//       id: "58694a0f-3da1-471f-bd96-145571e29d72",
//       fullName: "Some Notice",
//       timeStamp: "6:22 PM",
//       recentText: "Good Day!",
//       avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
//     },
//     {
//       id: "68694a0f-3da1-431f-bd56-142371e29d72",
//       fullName: "Some Notice",
//       timeStamp: "8:56 PM",
//       recentText: "All the best",
//       avatarUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
//     },
//     {
//       id: "28694a0f-3da1-471f-bd96-142456e29d72",
//       fullName: "Some Notice",
//       timeStamp: "12:47 PM",
//       recentText: "I will call today.",
//       avatarUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
//     },
//   ];
//   return (
//     <Box>
//       <Heading fontSize="xl" p="4" pb="3">
//         NoticeBoard
//       </Heading>
//       <FlatList
//         data={data}
//         renderItem={({ item }) => (
//           <Box
//             borderBottomWidth="1"
//             _dark={{
//               borderColor: "muted.50",
//             }}
//             borderColor="muted.800"
//             pl={["0", "4"]}
//             pr={["0", "5"]}
//             py="2"
//           >
//             <HStack space={[2, 3]} justifyContent="space-between">
//               {/* <Avatar
//                 size="48px"
//                 source={{
//                   uri: item.avatarUrl,
//                 }}
//               /> */}
//               <VStack>
//                 <Text
//                   _dark={{
//                     color: "warmGray.50",
//                   }}
//                   color="coolGray.800"
//                   bold
//                 >
//                   {item.fullName}
//                 </Text>
//                 <Text
//                   color="coolGray.600"
//                   _dark={{
//                     color: "warmGray.200",
//                   }}
//                 >
//                   {item.recentText}
//                 </Text>
//               </VStack>
//               <Spacer />
//               {/* <Text
//                 fontSize="xs"
//                 _dark={{
//                   color: "warmGray.50",
//                 }}
//                 color="coolGray.800"
//                 alignSelf="flex-start"
//               >
//                 {item.timeStamp}
//               </Text> */}
//             </HStack>
//           </Box>
//         )}
//         keyExtractor={(item) => item.id}
//       />
//     </Box>
//   );
// };
// export default NoticeBoard;

// import { View, Text, Button } from "react-native";
// import React, { useEffect } from "react";
// import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";

// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     return {
//       shouldPlaySound: false,
//       shouldSetBadge: false,
//       shouldShowAlert: true,
//     };
//   },
// });

// const Noticeboard = () => {
//   useEffect(() => {
//     const subscription = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         console.log("Notification Received");
//         console.log(notification);
//       }
//     );
//     return () => {
//       subscription.remove();
//     };
//   }, []);
//   function scheduleNotificationHandler() {
//     Notifications.scheduleNotificationAsync({
//       content: {
//         title: "My first notification",
//         body: "This is the body of the notification",
//         data: {
//           userName: "Max",
//         },
//         trigger: {
//           seconds: 5,
//         },
//       },
//     });
//   }
//   return (
//     <View>
//       <Text>Noticeboard</Text>
//       <Button
//         title="Schedule Notifications"
//         onPress={scheduleNotificationHandler}
//       />
//     </View>
//   );
// };

// export default Noticeboard;

import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, FlatList, Heading, ScrollView,Text as NativeText } from "native-base";
import axios from "axios";
import NoticeBoardList from "./NoticeBoardList";
import ParentsHome from '../BottomTab/ParentsHome'
export var arr = [];
var sortedArr = [];
const NoticeBoard = () => {
  const [data, setData] = useState([]);
  // const [sortedArr, setSortedArr] = useState([]);
  // const [sortedData, setSortedData] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    async function fetchData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          // Authorization: "Token " + `${Token}`,
        };

        // const res = await axios.get("http://10.0.2.2:8000/school/users/", {
        const res = await axios.get("http://10.0.2.2:8000/school/Calendar/", {
          headers: headers,
        });
        console.log(res.data);
        arr = res.data;
        // for (let i = 0; i < res.data.length; i++) {
        //   arr.push(res.data[i].startdate);

        //   console.log("before sorting");
        //   console.log(arr);
        // }

        console.log("before sorting");
        console.log(arr);
        function dateComparison(a, b) {
          const date1 = new Date(a.startdate);
          const date2 = new Date(b.startdate);

          return date2 - date1;
        }

        arr.sort(dateComparison);

        console.log("after sorting");
        console.log(arr.slice(0, 3));

        setData(res.data.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function renderNotice(itemData) {
    return <NoticeBoardList {...itemData.item} />;
  }
  return (

    <View style={[{flex:1}, {flexDirection: "column"}]}>
        <View style={styles.headingView} >
          <NativeText bold style={styles.textStyle}>Upcoming Events</NativeText>
        </View>
        <View style={{ flex: 2, backgroundColor: "white" }} >
          <ScrollView>
            <Box>
              <FlatList data={data} padding={2} renderItem={renderNotice} />
            </Box>
          </ScrollView>
        </View>
        <View style={{ flex: 0.2, backgroundColor: "white" }} >
          <ParentsHome />
        </View>
      </View>

  );
};

export default NoticeBoard;

const styles = StyleSheet.create({
  headingView:{
    flex: 0.2, 
    backgroundColor: "white",
    alignItems:'center',
    paddingVertical:15,
  },
  textStyle:{
    fontSize:20,
    color:'white',
    marginTop:'2%',
    backgroundColor:'#364585',
    padding:10,
    borderRadius:10
  }
})


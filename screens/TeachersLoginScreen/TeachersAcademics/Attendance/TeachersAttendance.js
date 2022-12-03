// // import { View, StyleSheet, ScrollView, Button, FlatList } from "react-native";
// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useEffect } from "react";
// // import SearchBar from "react-native-dynamic-search-bar";
// // import StudentAttendance from "../../../../components/StudentItem/StudentAttendance";
// // import TeacherAttendance, {
// //   CLASSNAME,
// //   ID,
// //   SECTION,
// //   STATUS,
// //   STUDENTNAME,
// // } from "./TeacherAttendance";

// // const TeachersAttendance = () => {
// //   const [data, setData] = useState([]);
// //   const [filteredData, setFilteredData] = useState([]);
// //   const [searchText, setSearchText] = useState("");
// //   let i,
// //     storeData = [];
// //   const [inputs, setInputs] = useState([
// //     {
// //       class_name: CLASSNAME,
// //       section: SECTION,
// //       status: STATUS,
// //       student_name: STUDENTNAME,
// //     },
// //   ]);

// //   useEffect(() => {
// //     async function fetchData() {
// //       try {
// //         const res = await axios.get(
// //           `http://10.0.2.2:8000/school/Studentclass/`
// //         );
// //         // console.log(res.data);
// //         setData(res.data);
// //         setFilteredData(res.data);
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     }
// //     fetchData();
// //   }, []);

// //   const searchFilter = (text) => {
// //     if (text) {
// //       const newData = data.filter((item) => {
// //         const itemData = item.teachers
// //           ? item.teachers.toUpperCase()
// //           : "".toUpperCase();
// //         const textData = text.toUpperCase();
// //         return itemData.indexOf(textData) > -1;
// //       });
// //       setFilteredData(newData);
// //       setSearchText(text);
// //     } else {
// //       setFilteredData(data);
// //       setSearchText(text);
// //     }
// //   };
// //   function renderStudentDetails(itemData) {
// //     return <TeacherAttendance {...itemData.item} />;
// //   }

// //   function buttonPressedHandler() {
// //     console.log("inside button");

// //     for (i = 0; i < filteredData.length; i++) {
// //       console.log(filteredData[i].class_name);
// //     }
// //     const FormData = {
// //       student_name: STUDENTNAME,
// //       class_name: CLASSNAME,
// //       section: SECTION,
// //       status: STATUS,
// //     };

// //     console.log(FormData);
// //   }

// //   return (
// //     <>
// //       <SearchBar
// //         style={styles.searchBar}
// //         placeholder="Search here by name"
// //         onChangeText={(text) => searchFilter(text)}
// //         value={searchText}
// //       />

// //       <ScrollView>
// //         <FlatList
// //           data={filteredData}
// //           renderItem={renderStudentDetails}
// //           keyExtractor={(item, index) => index.toString()}
// //         />
// //         <Button title="Save" onPress={buttonPressedHandler} />
// //       </ScrollView>
// //     </>
// //   );
// // };
// // export default TeachersAttendance;

// // const styles = StyleSheet.create({
// //   searchBar: {
// //     top: 10,
// //   },
// // });

import { View, Text, Platform, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "native-base";
import TeacherAttendance, { STATUS, STUDENTNAME } from "./TeacherAttendance";
import axios from "axios";
export var finalList = [];
const TeachersAttendance = () => {
  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());
  const [fromShow, setFromShow] = useState(false);
  const [fromText, setFromText] = useState("");

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([
    // {
    //   sname: STUDENTNAME,
    //   status: STATUS,
    // },
  ]);

  const [showCalendar, setShowCalendar] = useState(true);
  const [showStudList, setShowStudList] = useState(false);

  const [present, setPresent] = useState("");
  const [status, setStatus] = useState([
    { present: "", absent: "", holiday: "" },
  ]);


  //how to add elements on loop to array in react?


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Studentclass/`
        );
        // console.log(res.data);
        setData(res.data);
        setFilteredData(res.data);
        finalList = filteredData;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function renderStudentDetails(itemData) {
    return <TeacherAttendance {...itemData.item} onPresent={present} />;
  }

  function saveAttendance() {
    // console.log("inside button");

    for (let i = 0; i < filteredData.length; i++) {
      //console.log(filteredData[i]?.class_name);
      const formData = {
        studentname: filteredData[i].STUDENTNAME,
        status: filteredData[i].STATUS,
        // studentname: STUDENTNAME,
        // status: STATUS,
      };
      console.log("finalList", formData);
    }
  }

  const fromDateChangeHandler = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate;

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
  };

  function frmDateHandler(enteredValue) {
    setFromDate(enteredValue);
  }

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  function buttonPressedHandler() {
    setShowCalendar(false);
    setShowStudList(true);
  }
  function presentHandler() {
    setPresent("present");
    // setPresent(!present);
  }
  return (
    <View>
      {showCalendar && (
        <View style={{}}>
          <View>
            <Ionicons
              style={{
                position: "absolute",
                top: 95,
                left: 60,
              }}
              name="calendar"
              size={24}
              color="black"
              onPress={() => showFromMode("date")}
            />
          </View>

          <View style={{ margin: 70, width: "50%" }}>
            <UnderlinedInput
              value={fromText}
              placeholder="Select Date"
              // onSubmitEditing={Keyboard.dismiss}
              // style={
              //   isFromFocused
              //     ? styles.focusStyle
              //     : fromDateInputIsInValid && styles.errorBorderColorDate
              // }
              // blur={fromDateBlurHandler}
              // onFocus={onFromFocusHandler}
              onChangeText={frmDateHandler}
              onPressIn={() => showFromMode("date")}
            />
          </View>

          {/* {fromDateInputIsInValid && (
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
      )} */}
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
          <View style={{ width: "65%", margin: 20, paddingLeft: 110 }}>
            <Button size="md" onPress={buttonPressedHandler}>
              Start Attendance
            </Button>
          </View>
        </View>
      )}

      {showStudList && (
        <View>
          <ScrollView>
            <View style={{ backgroundColor: "red" }}>
              <Button onPress={presentHandler}>Present</Button>
              <Button>Absent</Button>
              <Button>Holiday</Button>
            </View>
            <FlatList
              data={filteredData}
              renderItem={renderStudentDetails}
              keyExtractor={(item, index) => index.toString()}
            />
            <Button onPress={saveAttendance}>Save</Button>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default TeachersAttendance;

// import {
//   View,
//   Text,
//   Platform,
//   ScrollView,
//   FlatList,
//   StyleSheet,
//   Button as Btn,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { Button } from "native-base";
// import TeacherAttendance, { STATUS } from "./TeacherAttendance";
// import axios from "axios";

// const TeachersAttendance = () => {
//   const [frommode, setFromMode] = useState("date");
//   const [fromDate, setFromDate] = useState(new Date());
//   const [fromShow, setFromShow] = useState(false);
//   const [fromText, setFromText] = useState("");

//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   const [showCalendar, setShowCalendar] = useState(true);
//   const [showStudList, setShowStudList] = useState(false);

//   const [status, setStatus] = useState([
//     {
//       present: "",
//       absent: "",
//       holiday: "",
//     },
//   ]);

//   const [selectedStatus, setSelectedStatus] = useState("");
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await axios.get(
//           `http://10.0.2.2:8000/school/Studentclass/`
//         );
//         // console.log(res.data);
//         setData(res.data);
//         setFilteredData(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, []);

//   function presentHandler() {
//     // setPresent("present");
//     setSelectedStatus("present");
//   }
//   function absentHandler() {
//     //setAbsent("absent");
//     setSelectedStatus("absent");
//   }
//   function holidayHandler() {
//     //  setHoliday("holiday");
//     setSelectedStatus("holiday");
//   }

//   function renderStudentDetails(itemData) {
//     return (
//       <ScrollView horizontal={false}>
//         <View style={styles.studentItem}>
//           <View style={styles.studentItem}>
//             <Text style={[styles.textBase, styles.description]}>
//               {itemData.item.teachers} {itemData.item.id}
//             </Text>
//             <Text style={[styles.textBase, styles.description]}>
//               {itemData.item.section}
//             </Text>
//             <Text style={[styles.textBase, styles.description]}>
//               {itemData.item.class_name}
//             </Text>
//           </View>
//           <View style={{ padding: 10 }}>
//             <Text style={{ color: "black", fontWeight: "bold" }}>
//               {selectedStatus}
//             </Text>
//           </View>
//           <View style={styles.checkBoxContainer}>
//             <Btn title="P" onPress={presentHandler} />
//             <View style={styles.space} />
//             <Btn title="A" onPress={absentHandler} />
//             <View style={styles.space} />
//             <Btn title="H" onPress={holidayHandler} />
//           </View>
//         </View>
//       </ScrollView>
//     );
//   }
//   const fromDateChangeHandler = (event, selectedFromDate) => {
//     const currentFromDate = selectedFromDate;

//     setFromShow(Platform.OS === "ios");
//     // setFromDate(currentFromDate);

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
//       // if (event?.type === "dismissed") {
//       //   setFromText("");
//       //   return;
//       // }
//     }
//   };

//   function frmDateHandler(enteredValue) {
//     setFromDate(enteredValue);
//   }
//   function buttonPressedHandler() {
//     setShowCalendar(false);
//     setShowStudList(true);
//   }
//   const showFromMode = (currentFromMode) => {
//     setFromShow(true);

//     setFromMode(currentFromMode);
//   };
//   return (
//     <View>
//       {showCalendar && (
//         <View style={{}}>
//           <View>
//             <Ionicons
//               style={{
//                 position: "absolute",
//                 top: 95,
//                 left: 60,
//               }}
//               name="calendar"
//               size={24}
//               color="black"
//               onPress={() => showFromMode("date")}
//             />
//           </View>

//           <View style={{ margin: 70, width: "50%" }}>
//             <UnderlinedInput
//               value={fromText}
//               placeholder="Select Date"
//               // onSubmitEditing={Keyboard.dismiss}
//               // style={
//               //   isFromFocused
//               //     ? styles.focusStyle
//               //     : fromDateInputIsInValid && styles.errorBorderColorDate
//               // }
//               // blur={fromDateBlurHandler}
//               // onFocus={onFromFocusHandler}
//               onChangeText={frmDateHandler}
//               onPressIn={() => showFromMode("date")}
//             />
//           </View>

//           {/* {fromDateInputIsInValid && (
//         <Text
//           style={{
//             color: "red",
//             left: 20,
//             fontFamily: "HindRegular",
//             fontSize: 18,
//           }}
//         >
//           select from date
//         </Text>
//       )} */}
//           {fromShow && (
//             <DateTimePicker
//               testID="dateTimePicker"
//               value={fromDate}
//               mode={frommode}
//               is24Hour={true}
//               display="default"
//               onChange={fromDateChangeHandler}
//             />
//           )}
//           <View style={{ width: "65%", margin: 20, paddingLeft: 110 }}>
//             <Button size="md" onPress={buttonPressedHandler}>
//               Start Attendance
//             </Button>
//           </View>
//         </View>
//       )}

//       {showStudList && (
//         <View>
//           <ScrollView>
//             <View style={{ backgroundColor: "red" }}>
//               <Button>Present all</Button>
//               <Button>Absent all</Button>
//               <Button>Holiday all</Button>
//             </View>
//             {/* {data.map((data, key) => (
//               <ScrollView horizontal={false}>
//                 <View style={styles.studentItem}>
//                   <View style={styles.studentItem}>
//                     <Text style={[styles.textBase, styles.description]}>
//                       {data.teachers} {data.id}
//                     </Text>
//                     <Text style={[styles.textBase, styles.description]}>
//                       {data.section}
//                     </Text>
//                     <Text style={[styles.textBase, styles.description]}>
//                       {data.class_name}
//                     </Text>
//                   </View>
//                   <View style={{ padding: 10 }}>
//                     <Text style={{ color: "black", fontWeight: "bold" }}>
//                       {present || absent || holiday}
//                     </Text>
//                   </View>
//                   <View style={styles.checkBoxContainer}>
//                     <Btn title="P" onPress={presentHandler} id={key} />
//                     <View style={styles.space} />
//                     <Btn title="A" onPress={absentHandler} />
//                     <View style={styles.space} />
//                     <Btn title="H" onPress={holidayHandler} />
//                   </View>
//                 </View>
//               </ScrollView>
//             ))} */}

//             <FlatList
//               data={filteredData}
//               renderItem={renderStudentDetails}
//               keyExtractor={(item, index) => index.toString()}
//             />
//             <Button>Save</Button>
//           </ScrollView>
//         </View>
//       )}
//     </View>
//   );
// };

// export default TeachersAttendance;

// const styles = StyleSheet.create({
//   statusContainer: {},
//   studentItem: {
//     // width: "90%",

//     padding: 11,
//     marginVertical: 8,
//     // //  backgroundColor: "#3e04c3",
//     backgroundColor: "#f0f0fc",
//     flexDirection: "row",
//     alignItems: "center",

//     justifyContent: "space-between",
//     borderRadius: 6,
//   },
//   textBase: {
//     color: "#0D98BA",
//     marginRight: 33,
//   },
//   description: {
//     fontSize: 20,
//     marginBottom: 4,
//     fontWeight: "bold",
//   },
//   space: {
//     width: 20, // or whatever size you need
//     height: 20,
//   },
// });














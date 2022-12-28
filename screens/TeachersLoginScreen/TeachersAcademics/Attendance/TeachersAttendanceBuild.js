// import { View, StyleSheet, ScrollView, Button, FlatList } from "react-native";
// import React, { useState } from "react";
// import axios from "axios";
// import { useEffect } from "react";
// import SearchBar from "react-native-dynamic-search-bar";
// import StudentAttendance from "../../../../components/StudentItem/StudentAttendance";
// import TeacherAttendance, {
//   CLASSNAME,
//   ID,
//   SECTION,
//   STATUS,
//   STUDENTNAME,
// } from "./TeacherAttendance";

// const TeachersAttendance = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   let i,
//     storeData = [];
//   const [inputs, setInputs] = useState([
//     {
//       class_name: CLASSNAME,
//       section: SECTION,
//       status: STATUS,
//       student_name: STUDENTNAME,
//     },
//   ]);

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

//   const searchFilter = (text) => {
//     if (text) {
//       const newData = data.filter((item) => {
//         const itemData = item.teachers
//           ? item.teachers.toUpperCase()
//           : "".toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//       });
//       setFilteredData(newData);
//       setSearchText(text);
//     } else {
//       setFilteredData(data);
//       setSearchText(text);
//     }
//   };
//   function renderStudentDetails(itemData) {
//     return <TeacherAttendance {...itemData.item} />;
//   }

//   function buttonPressedHandler() {
//     console.log("inside button");

//     for (i = 0; i < filteredData.length; i++) {
//       console.log(filteredData[i].class_name);
//     }
//     const FormData = {
//       student_name: STUDENTNAME,
//       class_name: CLASSNAME,
//       section: SECTION,
//       status: STATUS,
//     };

//     console.log(FormData);
//   }

//   return (
//     <>
//       <SearchBar
//         style={styles.searchBar}
//         placeholder="Search here by name"
//         onChangeText={(text) => searchFilter(text)}
//         value={searchText}
//       />

//       <ScrollView>
//         <FlatList
//           data={filteredData}
//           renderItem={renderStudentDetails}
//           keyExtractor={(item, index) => index.toString()}
//         />
//         <Button title="Save" onPress={buttonPressedHandler} />
//       </ScrollView>
//     </>
//   );
// };
// export default TeachersAttendance;

// const styles = StyleSheet.create({
//   searchBar: {
//     top: 10,
//   },
// });

import {
  View,
  Text,
  Platform,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button as NativeButton} from "native-base";
import axios from "axios";
import TeachersList from "./TeachersList";
import { subURL } from "../../../../components/utils/URL's";
import TeachersHome from "../../BottomTab/TeachersHome";

var Indiviual_ID;
const TeachersAttendanceBuild = () => {

  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());
  const [fromShow, setFromShow] = useState(false);
  const [fromText, setFromText] = useState("");
  
  const [selectedStatus, setSelectedStatus] = useState("");

  const [data, setData] = useState([]);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showStudList, setShowStudList] = useState(false);
  const [array,setArray]=useState([]);

  let i;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Calendar/`);
        // console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  function frmDateHandler(enteredValue) {
    setFromDate(enteredValue);
  }

  function buttonPressedHandler() {
    setShowCalendar(false);
    setShowStudList(true);
  }

  function presentButtonPressed(id) {
    Indiviual_ID=id;
    
    setSelectedStatus("Present")
    const object = {
      id: id,
      leave_status: "present"
    };

    const existingItem = array.find((item) => item.id === object.id);

    if(existingItem){
      setArray(array.map((item)=>(item.id===object.id ? object : item)))
    }else{
      setArray(prevArray => [...prevArray, object]);
      //setItems([...items, updatedItem]);
    }
  }

  function absentBtnHandler(id) {
    Indiviual_ID=id;
    setSelectedStatus("Absent")
    const object = {
      id: id,
      leave_status: "absent"
    };
    const existingItem = array.find((item) => item.id === object.id);

    if(existingItem){
      setArray(array.map((item)=>(item.id===object.id ? object : item)))
    }else{
      setArray(prevArray => [...prevArray, object]);
      //setItems([...items, updatedItem]);
    }
  }

  function holidatBtnGHandler(id) {
    Indiviual_ID=id;
    setSelectedStatus("Holiday")
    const object = {
      id: id,
      leave_status: "holiday"
    };
    const existingItem = array.find((item) => item.id === object.id);

    if(existingItem){
      setArray(array.map((item)=>(item.id===object.id ? object : item)))
    }else{
      setArray(prevArray => [...prevArray, object]);
      //setItems([...items, updatedItem]);
    }
  }

  function presentAllHandler(){
    setSelectedStatus("Present");

    while(array.length > 0) {
      array.pop();
    }
    
    for(i=0;i < data.length;i++){
      const  object = {
        id: data[i].id,
        leave_status: "present"
      };

      array.push(object)
    }
  }

  function absentAllHandler(){
    setSelectedStatus("Absent");

    while(array.length > 0) {
      array.pop();
    }
    
    for(i=0;i < data.length;i++){
      const  object = {
        id: data[i].id,
        leave_status: "absent"
      };

      array.push(object)
    }
  }

  function holidayForAllHandler(){
    setSelectedStatus("Holiday");

    while(array.length > 0) {
      array.pop();
    }
    
    for(i=0;i < data.length;i++){
      const  object = {
        id: data[i].id,
        leave_status: "holiday"
      };

      array.push(object)
    }

  }

  function saveAttendance() {
    console.log("finalList", array);
  }

  return (
    <>
      {showCalendar && (
        <>
          <View
            style={[
              { flex: 1 },
              {
                flexDirection: "column",
                backgroundColor: "white",
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <View style={[styles.overallContainer]}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    style={{}}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showFromMode("date")}
                  />
                </View>
                <View style={styles.dateContainer}>
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
              </View>
              <View style={{ flex: 1.5, paddingHorizontal: 100 }}>
                <NativeButton size="md" onPress={buttonPressedHandler}>
                  Start Attendance
                </NativeButton>
              </View>
            </View>
          </View>
          <TeachersHome />
        </>
      )}

      {showStudList && (
        <View style={[{flex:1}, {flexDirection: "column"}]}>
          <View style={{ flex: 0.3}} >
            <View style={[{flex:1}, {flexDirection: "row",left:'10%',marginHorizontal:15,marginVertical:15}]}>
              <View style={{ flex: 1 }} >
                <NativeButton onPress={presentAllHandler}>Present All</NativeButton>
              </View>
              <View style={styles.space}/>
              <View style={{ flex: 1 }} >
                <NativeButton onPress={absentAllHandler}>Absent All</NativeButton>
              </View>
              <View style={styles.space}/>
              <View style={{ flex: 1 }} >
                <NativeButton onPress={holidayForAllHandler}>Holiday</NativeButton>
              </View>
              <View style={styles.space}/>
            </View>
          </View>
          <View style={{ flex: 2,marginVertical:10}} >
            <ScrollView>
              {data && 
                data.map((data,key)=>(
                  <View style={[{flex:1}, {
                    flexDirection: "row",backgroundColor:'#D3D2FF' ,marginVertical:10
                  }]}>
                    <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }} >
                      <Text style={[styles.textBase, styles.description]}>
                        {data.id}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }} >
                      <Text style={[styles.textBase, styles.description]}>
                        {/* {teachers} */}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }} >
                      <Text style={[styles.textBase, styles.description]}>
                        {/* {class_name} Second  */}
                      </Text>
                    </View>
                    {/* <View style={{ flex: 1,justifyContent:'center' }} >
                      <Text style={{ color: "black", fontWeight: "bold" }}>
                        {selectedStatus}
                      </Text>
                    </View> */}
                    <View style={{ flex: 0.4 }} >
                      <View style={[{flex:1}, {
                        flexDirection: "column",marginVertical:20,
                      }]}>
                        <View style={{ flex: 1 ,marginRight:'30%'}} >
                          <Button onPress={() => presentButtonPressed(data.id)} title="P" />
                        </View>
                        <View style={styles.space}/>
                        <View style={{ flex: 1,marginRight:'30%' }} >
                          <Button onPress={() => absentBtnHandler(data.id)} title="A" />
                        </View>
                        {/* <View style={styles.space}/>
                        <View style={{ flex: 1,marginRight:'30%' }} >
                          <Button onPress={() => holidatBtnGHandler(data.id)} title="H" />
                        </View>*/}
                      </View>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
          <View style={{ flex: 0.3 ,marginHorizontal:60}} >
            <NativeButton size="md" onPress={saveAttendance}>
              Save
            </NativeButton>
          </View>
          <View style={{ flex: 0.2 }} >
            <TeachersHome />
          </View>
        </View>
      )}
    </>
  );
};

export default TeachersAttendanceBuild;

// import {
//   View,
//   Text,
//   Platform,
//   ScrollView,
//   FlatList,
//   StyleSheet,
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

//   const [showCalendar, setShowCalendar] = useState(true);
//   const [showStudList, setShowStudList] = useState(false);

//   const [present, setPresent] = useState(false);
//   const [absent, setAbsent] = useState(false);
//   const [holiday, setHoliday] = useState(false);
//   const [statusBackground, setStatusBackground] = useState();
//   const [selectedStatus, setSelectedStatus] = useState("");
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await axios.get(
//           `http://10.0.2.2:8000/school/Studentclass/`
//         );
//         // console.log(res.data);
//         setData(res.data);
//         //  setFilteredData(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, []);

//   function presentBtnHandler() {
//     setPresent(true);

//     setSelectedStatus("Present");
//   }

//   function absentBtnHandler() {
//     setAbsent(true);

//     setSelectedStatus("Absent");
//   }
//   function holidatBtnGHandler() {
//     setHoliday(true);

//     setSelectedStatus("Holiday");
//   }

//   const showFromMode = (currentFromMode) => {
//     setFromShow(true);

//     setFromMode(currentFromMode);
//   };
//   function buttonPressedHandler() {
//     setShowCalendar(false);
//     setShowStudList(true);
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
//   function renderStudentDetails(itemData) {
//     return (
//       <>
//         <ScrollView horizontal={false}>
//           <View style={styles.studentItem}>
//             <View style={styles.studentItem}>
//               <Text style={[styles.textBase, styles.description]}>
//                 {itemData.item.teachers} {itemData.item.id}
//               </Text>
//               <Text style={[styles.textBase, styles.description]}>
//                 {itemData.item.section}
//               </Text>
//               <Text style={[styles.textBase, styles.description]}>
//                 {itemData.item.class_name}
//               </Text>
//             </View>
//             <View style={{ padding: 10 }}>
//               <Text style={{ color: "black", fontWeight: "bold" }}>
//                 {selectedStatus}
//               </Text>
//             </View>
//             <View style={styles.checkBoxContainer}>
//               <Button
//                 title="P"
//                 // color={changePresentColor}
//                 onPress={presentBtnHandler}
//               />
//               <View style={styles.space} />
//               <Button
//                 title="A"
//                 // color={changeAbsentColor}
//                 onPress={absentBtnHandler}
//               />
//               <View style={styles.space} />
//               <Button
//                 title="H"
//                 // color={changeHolidayColor}
//                 onPress={holidatBtnGHandler}
//               />
//             </View>
//           </View>
//         </ScrollView>
//       </>
//     );
//   }
//   function frmDateHandler(enteredValue) {
//     setFromDate(enteredValue);
//   }

//   function saveAttendance() {}

//   return (
//     <View>
//       {showCalendar && (
//         <View style={{}}>
//           <View>
//             <Ionicons
//               style={{
//                 position: "absolute",
//                 top: 23,
//               }}
//               name="calendar"
//               size={24}
//               color="black"
//               onPress={() => showFromMode("date")}
//             />
//           </View>
//           <UnderlinedInput
//             value={fromText}
//             placeholder="Select Date"
//             // onSubmitEditing={Keyboard.dismiss}
//             // style={
//             //   isFromFocused
//             //     ? styles.focusStyle
//             //     : fromDateInputIsInValid && styles.errorBorderColorDate
//             // }
//             // blur={fromDateBlurHandler}
//             // onFocus={onFromFocusHandler}
//             onChangeText={frmDateHandler}
//             onPressIn={() => showFromMode("date")}
//           />

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

//           <Button size="sm" onPress={buttonPressedHandler}>
//             Start Attendance
//           </Button>
//         </View>
//       )}

//       {showStudList && (
//         <View>
//           <ScrollView>
//             <View style={ }}>
//               <Button>Present</Button>
//               <Button>Absent</Button>
//               <Button>Holiday</Button>
//             </View>
//             <FlatList
//               data={data}
//               renderItem={renderStudentDetails}
//               keyExtractor={(item, index) => index.toString()}
//             />
//             <Button onPress={saveAttendance}>Save</Button>
//           </ScrollView>
//         </View>
//       )}
//     </View>
//   );
// };
// export default TeachersAttendance;

const styles = StyleSheet.create({

  overallContainer: {
    flex: 1,
    flexDirection: "row",
    top: "10%",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  dateContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
    right: "5%",
  },
  studentItem: {
    // width: "90%",

    padding: 11,
    marginVertical: 8,
    // //  backgroundColor: "#3e04c3",
    backgroundColor: "#f0f0fc",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 6,
  },
  textBase: {
    color: "black",
    marginRight: 33,
  },
  description: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: "bold",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  checkBoxContainer: {},
});

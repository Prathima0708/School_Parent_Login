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
  Button,
  Dimensions
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button as NativeButton,Text as NativeText} from "native-base";
import axios from "axios";
import TeachersList from "./TeachersList";
import { subURL } from "../../../../components/utils/URL's";
import TeachersHome from "../../BottomTab/TeachersHome";
import SelectList from "react-native-dropdown-select-list";
import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../../components/UI/BackButton";

var USERID,newArray;

const TeachersAttendanceBuild = () => {

  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());
  const [fromShow, setFromShow] = useState(false);

  const [isFromDateFocused, setIsFromDateFocused] = useState(false);
  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText.trim() !== "";
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;
  
  const [selectedStatus, setSelectedStatus] = useState("");
  const [userID, setUserID] = useState("");

  const [selectedClassSection, setSelectedClassSection] = useState("");
  const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
  const enteredSelcetdIsValid = selectedClassSection.toString().trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

  const [showCalendar, setShowCalendar] = useState(true);
  const [showStudList, setShowStudList] = useState(false);

  const [data, setData] = useState([]);
  const [array,setArray]=useState([]);
  const [classTeacherData, setClassTeacherData] = useState([]);


  const [presentPressed,setPresentPressed]=useState(false);
  const [absentPressed,setAbsentPressed]=useState(false);

  const [samePresentID,setSamePresentID]=useState();
  const [sameAbsentID,setSameAbsentID]=useState(false);

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const navigation = useNavigation();

  let i,totalIDs=[];

  async function fetchUser() {
    USERID = await AsyncStorage.getItem("key");

    if (USERID !== null) {
      setUserID(USERID);
    }
  }
  fetchUser();

  useEffect(() => {
    async function fetchStudentClass() {
      axios
        .get(`${subURL}/IsClassteacher/${userID}/`)
        .then((response) => {
          newArray = response.data.map((item) => {
            return {
              key: item.id,
              value: item.class_name + " - " + item.section,
              classname: item.class_name,
              section: item.section,
            };
          });
          setClassTeacherData(newArray);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchStudentClass();
  }, [userID]);

  
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

  useLayoutEffect(() => {
    if (showCalendar) {
      setShowCalendar(true);
      navigation.setOptions({ headerShown: true });
    }
    if (showStudList) {
      navigation.setOptions({ headerShown: false });
    }
  }, [showCalendar,showStudList]);

  function viewStudentList() {
    async function fetchStudents() {

      let filteredlist = newArray.filter((ele) => ele.key == selectedClassSection);
      let class_name = filteredlist[0].classname;
      let section = filteredlist[0].section;

      try {
        const res = await axios.get(`${subURL}/Student/`);

        let filteredclass = res.data.filter(
          (ele) => ele.class_name == class_name
        );

        let filteredsection = res.data.filter((ele) => ele.section == section);

        const filteredList = filteredclass && filteredsection;

        let filteredc = filteredList.filter(
          (ele) => ele.class_name == class_name
        );

        // let filteredc = res.data;

        if (filteredc) {
          setData(filteredc);
        }
        
        for(i=0;i<data.length;i++){
          totalIDs[i]=data[i].id;
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchStudents();
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

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  function frmDateHandler(enteredValue) {
    setFromDate(enteredValue);
  }

  function buttonPressedHandler() {

    setEnteredSelectedTouched(true);
    setEnteredFromDateTouched(true);

    if (!enteredSelcetdIsValid || !enteredFromDateIsValid) {
      return;
    }else{

      setShowCalendar(false);
      setShowStudList(true);
    }
  }

  function presentButtonPressed(id) {
   
    setAbsentPressed(false);
    setPresentPressed(true);

    if(data.find((item) => item.id === id)){
      //console.log("SAME ID",id)
      setSamePresentID(id);
    }

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
    setAbsentPressed(true);
    setPresentPressed(false);
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

      changeColor(data[i].id, 'P')
      array.push(object)
      console.log(array);
    }
    viewStudentList();
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
      
      changeColor(data[i].id, 'A')
      array.push(object)
    }
    viewStudentList();
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

  function changeColor(id, text){
    if(array.filter((item) => item.id === id)){
      var selectedData = []
      selectedData = array.filter((item) => item.id === id)
      if(selectedData.length>0){

        var isPresent = false;
        var isAbsent = false;
        isPresent = selectedData.map((data,key)=>(data.leave_status==='present'))[0]
        isAbsent = selectedData.map((data,key)=>(data.leave_status==='absent'))[0]

        if(isPresent && text=='P'){
          return 'green'
        } else if(isAbsent && text=='A'){
          return 'red'
        } else {
          return 'grey'
        }
      }
      return 'grey'
    }
  }

  function fromDateBlurHandler() {
    setEnteredFromDateTouched(true);
    setIsFromDateFocused(false);
  }

  function onFocusFromHandler() {
    setIsFromDateFocused(true);
    setEnteredFromDateTouched(false);
    //setstartDateLabel(true);
  }

  function backButtonHandler(){
    setShowCalendar(true);
    setShowStudList(false);

    setSelectedClassSection("");
    setEnteredSelectedTouched(false);
    
    setFromText("");
    setEnteredFromDateTouched(false);

  }

  return (
    <>
      {showCalendar && (
        <View
          style={[
            { flex: 1 },
            { flexDirection: "column", backgroundColor: "white" },
          ]}
        >

          <View
            style={[
              styles.inputForm,
            ]}
          >
            <ScrollView persistentScrollbar={false}>
                <View
                  style={{
                    top: "3%",
                    left: "3%",
                    flexDirection: "row",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HindRegular",
                      fontSize: 18,
                      top: "3%",
                      //marginLeft: 10,
                    }}
                  >
                    Select Class
                  </Text>
                  <View style={styles.leaveSpace} />
                  <View style={{flexDirection:'column'}}>
                  <SelectList
                    setSelected={setSelectedClassSection}
                    data={classTeacherData}
                    onSelect={viewStudentList}
                    placeholder="Select class"
                    save="key"
                    boxStyles={
                      selectInputIsInValid && styles.errorSelectedColor
                    }
                    dropdownTextStyles={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                    }}
                    inputStyles={{ fontSize: 20, fontFamily: "HindRegular" }}
                  />
                  {selectInputIsInValid && (
                    <Text style={[styles.errorText, { top: 10,left:'2%' }]}>
                      Select class
                    </Text>
                  )}
                  </View>
                </View>

              <View style={[{ flexDirection: "column" }]}>
              <View
                  style={{
                    top: "3%",
                    left: "3%",
                    flexDirection: "row",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HindRegular",
                      fontSize: 18,
                      top: "3%",
                      //marginLeft: 10,
                    }}
                  >
                    Select Date
                  </Text>
                  <View style={styles.dateLabelSpace} />
                
                <View style={styles.dateContainer}>
                  <UnderlinedInput
                    value={fromText}
                    placeholder="Select Date"
                    // onSubmitEditing={Keyboard.dismiss}
                    style={
                      isFromDateFocused
                        ? styles.focusStyle
                        : fromDateInputIsInValid && styles.errorBorderColorDate
                    }
                    blur={fromDateBlurHandler}
                    onFocus={onFocusFromHandler}
                    onChangeText={frmDateHandler}
                    onPressIn={() => showFromMode("date")}
                  />
                  {fromDateInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>Select from date</Text>
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
                </View>
                <View style={{ flex: 1.5,width:'50%',marginLeft:'27%',marginTop:'10%'}}>
                  <NativeButton size="md" onPress={buttonPressedHandler}>
                    Start Attendance
                  </NativeButton>
              </View> 
              </View>
            </ScrollView>
          </View>
          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 0.2, backgroundColor: "white" }}>
              <TeachersHome />
            </View>
          )}
        </View>
      )}

      {showStudList && (
        <View style={[{flex:1}, {flexDirection: "column"}]}>
          <View style={[{ flex: 0.9 }, { flexDirection: "row",alignItems:"center"}]}>
            <BackButton onPress={backButtonHandler} />
          </View>
          <View style={{ flex: 0.7,bottom:"7%"}} >
            <View style={[{flex:1}, {flexDirection: "row",left:'10%',marginHorizontal:15,marginVertical:15}]}>
              <View style={{ flex: 1 }} >
                <NativeButton 
                  onPress={presentAllHandler} 
                  colorScheme="green">Present All</NativeButton>
              </View>
              <View style={styles.space}/>
              <View style={{ flex: 1 }} >
                <NativeButton 
                  onPress={absentAllHandler}
                  colorScheme='red'>Absent All</NativeButton>
              </View>
              <View style={styles.space}/>
              <View style={{ flex: 1 }} >
                <NativeButton 
                  onPress={holidayForAllHandler}
                  colorScheme='yellow'>Holiday</NativeButton>
              </View>
              <View style={styles.space}/>
            </View>
            <View style={[{flex:1}, {
              flexDirection: "column",marginLeft:'7%'
            }]}>
              <View style={{ flex: 0.8 }} >
                <View style={[{flex:1}, {
                  flexDirection: "row"
                }]}>
                  <View style={{ flex: 1,justifyContent:'center' }} >
                    <Text style={styles.labelStyle}>Class :</Text>
                  </View>
                  <View style={{ flex: 1 }} >
                    <Text></Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }} >
                <View style={[{flex:1}, {
                    flexDirection: "row"
                  }]}>
                    <View style={{ flex: 0.2,justifyContent:'center' }} >
                      <Text style={styles.labelStyle}>Date :</Text>
                    </View>
                    <View style={{ flex: 1,justifyContent:'center' }} >
                      <Text style={styles.labelStyle}>{fromText}</Text>
                    </View>
                  </View>
                </View>
            </View>
          </View>
          <View style={{ flex: 2,bottom:'6%'}} >
            <ScrollView>
              {data &&
                data.map((data,key)=>(
                  <View style={[{flex:1}, {
                    flexDirection: "row",backgroundColor:'#D3D2FF' ,marginVertical:10,marginHorizontal:20
                  }]}>
                    <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }} >
                      <Text style={[styles.textBase, styles.description]}>
                        {data.reg_number}
                      </Text>
                    </View>
                    <View style={{ flex: 1 ,justifyContent:'center',alignItems:'center' }} >
                      <Text style={[styles.textBase, styles.description]}>
                        {data.student_name}
                      </Text>
                    </View>
                    {/* <View style={{ flex: 1 }} >
                      <Text style={[styles.textBase, styles.description]}>
                        {data.id}
                      </Text>
                    </View> */}
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
                          <Button 
                            onPress={() => presentButtonPressed(data.id)}
                            color={changeColor(data.id,"P")}
                          
                            title="P" />
                        </View>
                        <View style={styles.space}/>
                        <View style={{ flex: 1,marginRight:'30%' }} >
                          <Button 
                            color={changeColor(data.id,"A")}
                            onPress={() => absentBtnHandler(data.id)} title="A"/>
                        </View>
                        {/* <View style={styles.space}/>
                        <View style={{ flex: 1,marginRight:'30%' }} >
                          <Button onPress={() => holidatBtnGHandler(data.id)} title="H" />
                        </View>*/}
                      </View>
                    </View>
                  </View>
                ))
                //  : 
                // <View style={{ alignItems: "center", marginVertical: 10 }}>
                //   <NativeText fontSize="xl" bold color="error.900">
                //     No Students found
                //   </NativeText>
                // </View>
                }
            </ScrollView>
          </View>
          <View style={{ flex: 0.3 ,marginHorizontal:60,bottom:'3%'}} >
            <NativeButton size="md" onPress={saveAttendance}>
              Save All
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

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({


  overallContainer: {
    flex: 1,
    flexDirection: "row",
    top: "10%",
  },
  iconContainer: {
    flex: 0.3,
    justifyContent:'center',
    bottom:'1%',
    alignItems: "flex-start",
  },
  dateContainer: {
    flex: 2,
    //right: "5%",
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
  leaveSpace: {
    width: 60, // or whatever size you need
    height: 10,
  },
  dateLabelSpace:{
    width: 40, // or whatever size you need
    height: 10,
  },
  inputForm: {
    flex: 2,
    paddingHorizontal: 20,
    marginTop: "30%",
    //paddingTop: '5%',
    backgroundColor: "white",
    // height: "100%",
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
  errorBorderColorDate: {
    borderBottomColor: "red",
  },
  commonErrorMsg: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 16 : 18,
    top: deviceHieght > 800 ? -3 : 1,
  },
  errorSelectedColor: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: 16,
  },
  labelStyle:{
    fontFamily:'HindBold',
    fontSize:16
  },
  checkBoxContainer: {},
});

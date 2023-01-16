// import { View, StyleSheet, ScrollView, Button, FlatList, Dimensions } from "react-native";
// import React, { useState } from "react";
// import axios from "axios";
// import { useEffect } from "react";
// import SearchBar from "react-native-dynamic-search-bar";
// import StudentAttendance from "../../../../components/StudentItem/StudentAttendance";

// const Attendance = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchText, setSearchText] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await axios.get(
//           `http://10.0.2.2:8000/school/Studentclass/`
//         );
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
//     return <StudentAttendance {...itemData.item} />;
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
//       </ScrollView>
//     </>
//   );
// };
// export default Attendance;
// const deviceHieght = Dimensions.get("window").height;
// const deviceWidth = Dimensions.get("window").width;

// const styles = StyleSheet.create({
//   searchBar: {
//     top: 10,
//   },
// });


import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar } from "react-native-calendars";
import ParentsHome from '../../BottomTab/ParentsHome';
import { subURL } from '../../../../components/utils/URL\'s';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { studentId } from '../../../../components/StudentItem/StudentItem';
import moment from 'moment';

var ID;
const Attendance = () => {
  const [current, setCurrent] = useState(new Date());
  const [data,setData]=useState([]);
  let dates={},selectedDate;

  function leftArrowPressedHandler (current){
    const substractMonth = new Date(current.setMonth(current.getMonth() - 1));
    
    setCurrent(substractMonth);

    const request_model = {
      student_id: studentId,
      yearMonth: moment(current).format("YYYY-MM")
    }; 
    
    useEffect(()=>{
      const request_model = {
        student_id: studentId,
        yearMonth: moment(current).format("YYYY-MM")
      }; 
      async function fetchData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const res = await axios.post(
          `${subURL}/AttendanceDetailByStudentIDMonthYear/`,  
          request_model,
            {
              headers: headers,
            });
             // console.log(res.data)
              setData(res.data)
              selectedDate = new Set(data.map((obj) => obj.attendance_date));
            } catch (error) {
              console.log(error);
            }
          }
      fetchData();
    },[]);
    async function fetchData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const res = await axios.post(
        `${subURL}/AttendanceDetailByStudentIDMonthYear/`,  
        request_model,
          {
            headers: headers,
          });
           // console.log(res.data)
            setData(res.data)
            selectedDate = new Set(data.map((obj) => obj.attendance_date));
          } catch (error) {
            console.log(error);
          }
        }
    fetchData();
  }

  return (
    <View
      style={[
        {
          flex:1,
          flexDirection: 'column',
        },
      ]}>
      <View style={{flex: 1.4,backgroundColor:'white'}} >
        <Calendar
          markedDates={selectedDate}
          current={current}
          onPressArrowLeft={()=> leftArrowPressedHandler(current)}
          hideExtraDays={true}
          style={{
            elevation: 5,
            shadowColor: "black",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            shadowOpacity: 0.75,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            overflow: Platform.OS === "android" ? "hidden" : "visible",
            marginLeft: 10,
            marginRight: 10,
          }}   
          theme={{
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          />
      </View>
      <View style={[{flex: 1 , flexDirection: "column", backgroundColor: "white"}]}>
        <View style={{ flex: 8, bottom: 30, }}>
          <ScrollView>
            <View style={[ { flex: 1,flexDirection: "column"}]}>
                
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{flex: 0.1, backgroundColor: 'darkorange'}} >
        <ParentsHome />
      </View>
    </View>
  )
}

export default Attendance
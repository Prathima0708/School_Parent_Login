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



  // function leftArrowPressedHandler (current){
  //   const substractMonth = new Date(current.setMonth(current.getMonth() - 1));
    
  //   setCurrent(substractMonth);
  //   console.log(current)
  //     const request_model = {
  //       student_id: studentId,
  //       yearMonth: moment(current).format("YYYY-MM")
  //     }; 
  //     async function fetchData() {
  //       try {
  //         let headers = {
  //           "Content-Type": "application/json; charset=utf-8",
  //         };
  //         const res = await axios.post(
  //         `${subURL}/AttendanceDetailByStudentIDMonthYear/`,  
  //         request_model,
  //           {
  //             headers: headers,
  //           });
  //            // console.log(res.data)
  //             setData(res.data)
  //             selectedDate = new Set(data.map((obj) => obj.attendance_date));
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         }
  //     fetchData();

  // }
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { studentId } from '../../../../components/StudentItem/StudentItem';
import { subURL } from '../../../../components/utils/URL\'s';
import ParentsHome from '../../BottomTab/ParentsHome';
  
  function Attendance() {

    const [customDatesStyles,setCustomDatesStyles]=useState([]);
    let today=moment();
    let formatedTodayDate=(moment(today).format('YYYY-MM'))

    useEffect(()=>{
      const request_model = {
        student_id: studentId,
        yearMonth:formatedTodayDate
      }; 
      async function fetchData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const res = await axios.post(`${subURL}/AttendanceDetailByStudentIDMonthYear/`,
          request_model,
          {
            headers: headers,
          });   
          setCustomDatesStyles(
            res.data.map(d => (
              {
                date: d.attendance_date, 
                style: {backgroundColor: d.attendance_status=='present' ? 'green' : 'red'}, 
                textStyle:{color:d.attendance_status==='present' ? 'white' : 'white'}, 
                containerStyle:[]
              })));
          console.log(customDatesStyles)
          } catch (error) {
            console.log(error);
          }
        }
      fetchData();
      // customDatesStyles.pop()
    },[]);

    function monthChangeHandler(month){

      const request_model = {
        student_id: studentId,
        yearMonth: moment(month).format("YYYY-MM")
      }; 
      
      async function fetchData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const res = await axios.post(`${subURL}/AttendanceDetailByStudentIDMonthYear/`,
          request_model,
          {
            headers: headers,
          });   
          setCustomDatesStyles(
            res.data.map(d => (
              {
                date: d.attendance_date, 
                style: { backgroundColor: d.attendance_status==='present' ? 'green' : 'red' },
                textStyle:{color: d.attendance_status==='present' ? 'white' : 'white'}, 
                containerStyle:[]
              })));
          } catch (error) {
            console.log(error);
          }
        }
      fetchData();
    //  customDatesStyles.pop()
    }

    return (
      <View
        style={[
          {
            // Try setting `flexDirection` to `"row"`.
            flex:1,
            flexDirection: 'column',
            backgroundColor:'white'
          },
        ]}>
        <View style={{flex: 1.2}} >
          <CalendarPicker
            onMonthChange={(month) => monthChangeHandler(month)}
            customDatesStyles={customDatesStyles}
            enableDateChange={false}
          />
        </View>
        <View style={{flex: 1}} >
          
        </View>
        <View style={{flex: 0.1}} >
          <ParentsHome />
        </View>
      </View>
    );
  }
  
  export default Attendance;
  
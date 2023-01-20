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
import { Modal, Popover,Text as NativeText,Button as NativeButton } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View,Text, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { studentId } from '../../../../components/StudentItem/StudentItem';
import { subURL } from '../../../../components/utils/URL\'s';
import ParentsHome from '../../BottomTab/ParentsHome';
  
function Attendance() {

    const [data,setData]=useState([]);
    const [customDatesStyles,setCustomDatesStyles]=useState([]);
    const [attendance_status,setAttendance_Status]=useState([]);

    const [placement, setPlacement] = useState(undefined);
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [count,setCount]=useState({ present: 0, absent: 0,holiday:0 })

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
          
          setData(res.data);
          //console.log(res.data)
          setCustomDatesStyles(
            res.data.map(d => (
              {
                date: d.attendance_date, 
                style: {backgroundColor: d.attendance_status==='present' ? 'green' :  d.attendance_status==='absent' ? 'red' : '#D4AC0D'}, 
                textStyle:{color:d.attendance_status==='present' ? 'white' : 'white'}, 
                containerStyle:[]
              })));
            setAttendance_Status(res.data.map(d => (  
             {att_status:d.attendance_status}
            )))
            console.log(attendance_status)
          } catch (error) {
            console.log(error);
          }
        }
      fetchData();
      // customDatesStyles.pop()
    },[]);


    useEffect(() => {
      if(attendance_status.length>0){
        setCount(attendance_status.reduce((acc, curr) => {
          acc[curr.att_status] = (acc[curr.att_status] || 0) + 1;
          console.log(acc)
          return acc;
        }, { present: 0, absent: 0, holiday : 0 }))
        
      }else {
          setCount({ present: 0, absent: 0 ,holiday : 0});
      }
      
    }, [attendance_status]);

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
                style: { backgroundColor: 
                  d.attendance_status==='present' ? 'green' :  d.attendance_status==='absent' ? 'red' : '#D4AC0D'},
                textStyle:{color: d.attendance_status==='present' ? 'white' : 'white'}, 
                containerStyle:[]
              })));

              setAttendance_Status(res.data.map(d => (  
                {att_status:d.attendance_status}
               )))
               if (attendance_status.length > 0) {
                setCount(attendance_status.reduce((acc, curr) => {
                  acc[curr.att_status] = (acc[curr.att_status] || 0) + 1;
                  return acc;
                }, {present: 0, absent: 0,holiday : 0}));
              } else {
                setCount({ present: 0, absent: 0,holiday : 0 });
              }
              //console.log(attendance_status)
             
          } catch (error) {
            console.log(error);
          }
        }
      fetchData();
    //  customDatesStyles.pop()
    }

    function handlePress(day){
      
      let allHavePropertiesWithValues = data.some(
        obj => obj.attendance_date === moment(day).format("YYYY-MM-DD") && obj.attendance_status === 'holiday');
      //console.log(allHavePropertiesWithValues);

      let filteredList=data.find(
        obj => obj.attendance_date === moment(day).format("YYYY-MM-DD") && obj.attendance_status === 'holiday');
      if(filteredList===undefined){
        return
      }else{

      
      setDescription(filteredList.description)
      }
      console.log('descp is',description)
      if(allHavePropertiesWithValues){
        setOpen(true);
        setPlacement(placement);
      }else{
        setOpen(false);
      }
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
            selectedDayStyle={{}}
            // selectedDayStyle={{backgroundColor:'transparent'}}
            // selectedDayTextStyle={{color: 'black'}}
            enableDateChange={true}
            onDateChange={(day)=>handlePress(day)}
          />
           
        </View>
        
        <View style={{flex: 1}} >
        <View
          style={[
            {
              // Try setting `flexDirection` to `"row"`.
              flex:1,
              flexDirection: 'column',
              marginTop:'15%',
              marginLeft:'10%'
              // padding:30
            },
          ]}>
          <View style={{flex: 0.3}}>
            <View
              style={[
                {
                  // Try setting `flexDirection` to `"row"`.
                  flex: 1,
                  flexDirection: 'row',
                },
              ]}>
              <View style={{flex: 0.1}} >
                <View style={styles.presentDot}/>
              </View>
              <View style={{flex: 1}} >
                {count && <Text>Present: {count.present} Days</Text>}
              </View>
            </View>
          </View>
          <View style={{flex: 0.3}}>
            <View
              style={[
                {
                  // Try setting `flexDirection` to `"row"`.
                  flex:1,
                  flexDirection: 'row',
                },
              ]}>
              <View style={{flex: 0.1}} >
                <View style={styles.absentDot}/>
              </View>
              <View style={{flex: 1}} >
                {count && <Text>Absent: {count.absent} Days</Text>}
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={[
                {
                  // Try setting `flexDirection` to `"row"`.
                  flex:1,
                  flexDirection: 'row',
                },
              ]}>
              <View style={{flex: 0.1}} >
                <View style={styles.holidayDot}/>
              </View>
              <View style={{flex: 1}} >
                {count && <Text>Holiday: {count.holiday} Days</Text>}
              </View>
            </View>
          </View>
        </View>
        </View>
        <View style={{flex: 0.1}} >
          <ParentsHome />
        </View>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          safeAreaTop={true}
          size="full"
        >
          <Modal.Content maxWidth="90%" minHeight="5%">
            <Modal.Header
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              Holiday Description
            </Modal.Header>
            <Modal.Body>
              <Text>{description}</Text>
            </Modal.Body>
            <Modal.Footer>
              <NativeButton.Group space={2}>
                <NativeButton
                  onPress={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </NativeButton>
              </NativeButton.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </View>
    );
  }
  
  export default Attendance;

  const styles=StyleSheet.create({
    presentDot: {
      width: 20, // or whatever size you need
      height: 20,
      backgroundColor:'green',
      // borderRadius:100
    },
    absentDot: {
      width: 20, // or whatever size you need
      height: 20,
      backgroundColor:'red',
      // borderRadius:100
    },
    holidayDot: {
      width: 20, // or whatever size you need
      height: 20,
      backgroundColor:'#D4AC0D',
      // borderRadius:100
    },
  })
  
import { View, StyleSheet, ScrollView, Button } from "react-native";
import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import SelectList from 'react-native-dropdown-select-list'
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "react-native-paper";
import {  Text, TouchableOpacity, Image } from 'react-native';
import axios from "axios";
// import RadioButton from "react-native-paper";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { useEffect } from "react";
  const classData = [
    '1st Standard',
    '2nd Standard',
    '3rd Standard',
    '4th Standard',
  ];

  const sectionData = [
    '1A',
    '2A',
    '3A',
    '4A',
  ];

  const studentData = [
    {id: '1', name:'studen1' },
    {id: '2', name:'student2' },
    {id: '3', name:'student3' },
    {id: '4', name:'student4' },
  ]

const Attendance = () => {
  
const [data,setData]=useState()
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Studentclass/`
        );
        console.log(res.data);

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
      // try {
      //   // const value = await AsyncStorage.getItem('token');
      // const value=  await AsyncStorage.getItem('token')
      // console.log(value)
      // } catch (error) {
      //   // Error retrieving data
      // }
    }
    fetchData();
  }, []);

    const [checked, setChecked] = useState();
    const [selected, setSelected] = useState("");
    var todayDate;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    todayDate= date + '-' + month + '-' + year;//format: d-m-y;


    function radioHandler(value){
      setChecked(value)
    }
    var radio_props = [
      {label: 'P', value: 0 },
      {label: 'A', value: 1 },
      {label: 'H', value: 2 }
    ];
  return (
    <>
    <View style={[styles.container, {flexDirection: "row"}]}>
      <View style={{ flex: 2 }}>
       <SelectList setSelected={setSelected} 
       data={data}  />
      </View>
      <View style={{ flex: 2,marginTop:5}}>
      {/* <Ionicons
              name="search-circle-outline"
              size={34}
              color="black"
              
            /> */}
      </View>
    </View>
        <ScrollView horizontal={true}>
          <DataTable style={styles.tableContainer}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={styles.tableTitle}>ID</DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>STUDENT NAME</DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>{todayDate}</DataTable.Title>
            </DataTable.Header>
            {studentData &&
              studentData.map((studentData, key) => (
                <DataTable.Row style={styles.tableRow}>
                   <DataTable.Cell style={styles.tableCell}>
                    {studentData.id}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {studentData.name}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    <View style={{ flexDirection:'row' }}>
                      {/* <Checkbox /> */}
                      <RadioForm style={{flexDirection:'row'}}
                        radio_props={radio_props}
                        initial={0}
                        buttonColor={'#2196f3'}
                        animation={true}
                        onPress={radioHandler}/>
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
        
    </>
  );
};
export default Attendance;

const styles = StyleSheet.create({

  container:{
    marginLeft:50,
  },
  tableContainer:{
    marginTop:20
  },
  tableHeader: {
    backgroundColor: "skyblue",
    height: 60,
  },
  tableTitle: {
    // padding: 5,
    // margin: 10,
    // fontWeight: "bold",
    // fontSize:32

  },
  tableCell: {
    padding: 5,
    margin: 5,
  },
  tableRow: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  
});

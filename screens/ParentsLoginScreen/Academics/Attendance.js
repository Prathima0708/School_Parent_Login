import { View, StyleSheet, ScrollView, Button } from "react-native";
import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import SelectList from 'react-native-dropdown-select-list'
import axios from "axios";
import { useEffect } from "react";
import { Checkbox } from 'react-native-paper';

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
  const [checked, setChecked] = useState();
  const [selected, setSelected] = useState("");

  var todayDate;
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  todayDate= date + '-' + month + '-' + year;//format: d-m-y;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Studentclass/`
        );
        // console.log(res.data);
        // var arr=[]
        // arr.push(res.data);
        setData(res.data);
        console.log(data);
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


  return (
    <>
    <View style={[styles.container, {flexDirection: "row"}]}>
      <View style={{ flex: 2 }}>
       <SelectList setSelected={setSelected} 
         />
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
                  <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                    color={'green'}
                    uncheckColor={'red'}
                  />
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    <View style={{ flexDirection:'row' }}>
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

  tableCell: {
    padding: 5,
    margin: 5,
  },
  tableRow: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  
});

import { View, StyleSheet, ScrollView, Button } from "react-native";
import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
// import RadioButton from "react-native-paper";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
  const classData = [
    {label:'1st Standard' },
    {label:'2nd Standard' },
    {label:'3rd Standard' },
    {label:'4th Standard' },
  ];

  const sectionData = [
    { label: '1A', value: '1' },
    { label: '2A', value: '2' },
    { label: '3A', value: '3' },
    { label: '4A', value: '4' },
  ];

  const studentData = [
    {id: '1', name:'studen1' },
    {id: '2', name:'student2' },
    {id: '3', name:'student3' },
    {id: '4', name:'student4' },
  ]

const Attendance = () => {
  
    const [checked, setChecked] = useState();

    var todayDate;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    todayDate= date + '-' + month + '-' + year;//format: d-m-y;


    function radioHandler(value){
      setChecked(value)
    }
    var radio_props = [
      {label: 'Present', value: 0 },
      {label: 'Absent', value: 1 },
      {label: 'Holiday', value: 2 }
    ];
  return (
    <>
    <View style={[styles.container, {flexDirection: "row"}]}>
      <View style={{ flex: 2 }}>
      <SelectDropdown
	      data={classData.map((classdata,key)=>(classdata.label))}
	      onSelect={(selectedItem, index) => {
		    console.log(selectedItem, index)
	    }}
	    buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem
	    }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item
	    }}/>
      </View>
      <View style={{ flex: 2}}>
      <SelectDropdown
	      data={sectionData.map((sectiondata,key)=>(sectiondata.label))}
	      onSelect={(selectedItem, index) => {
		    console.log(selectedItem, index)
	    }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem
	    }}
      rowTextForSelection={(item, index) => {
        return item
	    }} />
      </View>
      <View style={{ flex: 2,marginTop:10}}>
        <Button title="Search"/>
      </View>
    </View>
        <ScrollView horizontal={true}>
          <DataTable style={styles.container}>
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
                    <View style={{ flexDirection:'row' }}>
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

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  // iconStyle: {
  //   width: 20,
  //   height: 20,
  // },
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

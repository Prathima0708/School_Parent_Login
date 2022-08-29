import { View,StyleSheet, TextInput,Text } from "react-native";
import React, { useEffect, useState } from "react";
import VerticalLine from "../../../components/UI/VerticalLine";
import BgButton from "../../../components/UI/BgButton";

const Attendance = () => {

   const [forAttendanceList,setForAttendanceList]=useState({color:'black',fontWeight: "bold"})
  const [forAddAttendance,setForAddAttendance]=useState({color:'black'})
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  function AttendanceList(){
    setForAttendanceList({fontWeight: "bold",color:'black'});
    setForAddAttendance({color:'black'});
    setShowForm(false);
    setShowTable(true);
  }
  function addAttendance(){
    setForAddAttendance({fontWeight: "bold",color:'black'});
    setForAttendanceList({color:'black'});
    setShowForm(true);
    setShowTable(false);
  }

  return (
    <>
    <View style={styles.BtnContainer}>
      <BgButton onPress={AttendanceList} style={forAttendanceList}>List</BgButton>
      <VerticalLine>|</VerticalLine>
      <BgButton onPress={addAttendance} style={forAddAttendance}>Add Attendance</BgButton>
    </View>
    {showTable && 
      <ScrollView>
        <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title>STUDENT NAME</DataTable.Title>
        <DataTable.Title>DAY</DataTable.Title>
      </DataTable.Header>
      {
            <DataTable.Row>

              <DataTable.Cell>             
              </DataTable.Cell>

              <DataTable.Cell>
              </DataTable.Cell>

              <DataTable.Cell>     
              </DataTable.Cell>
              
            </DataTable.Row>
        }
      </DataTable>
      </ScrollView>}
  {showForm && 
  <ScrollView>
    
  </ScrollView>}
    </>
  );

}
export default Attendance;

const styles=StyleSheet.create({
  BtnContainer:{
    flexDirection:'row',
  },
 
})

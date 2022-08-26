import { View,StyleSheet, TextInput,Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import BgButton from "../../../components/UI/BgButton";
import VerticalLine from "../../../components/UI/VerticalLine";
import { DataTable } from "react-native-paper";
import Button from "../../../components/UI/Button";
import axios from "axios";

const TransportScreen = () => {

  const [forTransportList,setForTransportList]=useState({color:'black',fontWeight: "bold"})
  const [forAddTransport,setForAddTransport]=useState({color:'black'})
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [data,setData]=useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://10.0.2.2:8000/school/Transportreport/");
         console.log(res.data);
        
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  function transportList(){
    setForTransportList({fontWeight: "bold",color:'black'});
    setForAddTransport({color:'black'});
    setShowForm(false);
    setShowTable(true);
  }
  function addTransport(){
    setForAddTransport({fontWeight: "bold",color:'black'});
    setForTransportList({color:'black'});
    setShowForm(true);
    setShowTable(false);
  }
  return (
    <>
    <View style={styles.BtnContainer}>
      <BgButton onPress={transportList} style={forTransportList}>Transport List</BgButton>
      <VerticalLine>|</VerticalLine>
      <BgButton onPress={addTransport} style={forAddTransport}>Add Transport</BgButton>
    </View>
    {showTable && 
      <ScrollView>
        <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title>STUDENT</DataTable.Title>
        <DataTable.Title>VEHICLENO</DataTable.Title>
        <DataTable.Title>TYPES</DataTable.Title>
        <DataTable.Title>DRIVERS NAME</DataTable.Title>
        <DataTable.Title>EMP MOBILE</DataTable.Title>
        <DataTable.Title>ROUTE NAME</DataTable.Title>
        <DataTable.Title>STOP NAME</DataTable.Title>
      </DataTable.Header>
      <DataTable.Row>
      {/* {item.map(item=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.date}</td>
                        <td>{item.title}</td>
                        <td>{item.story}</td>
                    </tr>
                ))} */}
        
        {/* <DataTable.Cell></DataTable.Cell>
        <DataTable.Cell></DataTable.Cell>
        <DataTable.Cell></DataTable.Cell> 
        <DataTable.Cell></DataTable.Cell> 
        <DataTable.Cell></DataTable.Cell>
        <DataTable.Cell></DataTable.Cell> */}
      </DataTable.Row>
    </DataTable>
      </ScrollView>}
  {showForm && 
  <ScrollView>
    <View style={styles.inputForm}>
    <Text style={styles.labels}>STUDENT</Text>
    <TextInput 
      style={styles.inputStyle}/>
    <Text style={styles.labels}>VEHICLENO</Text>
    <TextInput 
      keyboardType="number-pad"
      style={styles.inputStyle}/>
    <Text style={styles.labels}>TYPES</Text>
    <TextInput 
      style={styles.inputStyle}/>
    <Text style={styles.labels}>DRIVERS NAME</Text>
    <TextInput 
      style={styles.inputStyle}/>
    <Text style={styles.labels}>EMP MOBILE</Text>
    <TextInput 
      style={styles.inputStyle}/>
    <Text style={styles.labels}>ROUTE NAME</Text>
    <TextInput 
      style={styles.inputStyle}/>
    <Text style={styles.labels}>STOP NAME</Text>
    <TextInput 
      style={styles.inputStyle}/>
    <View style={styles.btnSubmit}>
      <Button>Add Transport</Button>
    </View>
  </View>
  </ScrollView>}
    </>
  );
};

export default TransportScreen;

const styles=StyleSheet.create({
  BtnContainer:{
    flexDirection:'row',
  },
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  inputForm:{
    padding:20
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  labels:{
    marginTop:2
  },
  btnSubmit:{
    marginTop:5
  }
})

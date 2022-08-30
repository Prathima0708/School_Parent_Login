import { View,StyleSheet, TextInput,Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import VerticalLine from "../../../components/UI/VerticalLine";
import { DataTable } from "react-native-paper";
import Button from "../../../components/UI/Button";
import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import { UserId } from "../../Login";
const TransportScreen = () => {
 

  const [creator, setEnteredStudent] = useState("");
  const [vehicleno, setEnteredVehicleNumber] = useState("");
  const [types, setEnteredTypes] = useState("");
  const [driver_name, setEnteredDriverName] = useState("");
  const [emp_mobile, setEnteredEmpMobile] = useState();
  const [route_name, setEnteredRoute] = useState("");
  const [stop_name, setEnteredStopName] = useState("");
  const [forTransportList,setForTransportList]=useState({color:'black',fontWeight: "bold"})
  const [forAddTransport,setForAddTransport]=useState({color:'black'})
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [data,setData]=useState();
  const [formData,setFormData]=useState();

  // useEffect(()=>{
  //   async function getToken(){
  //     const value= await AsyncStorage.getItem('token')
  //     console.log(value)
  //   }
  //   getToken()
  //     },[]);
  useEffect(() => {

    async function fetchData() {
      try {
        const res = await axios.get("http://10.0.2.2:8000/school/Transportreport/");
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

  function studentTextChanged(enteredValue){
    setEnteredStudent(enteredValue)
  }
  function vehicleNumberChanged(enteredValue){
    setEnteredVehicleNumber(enteredValue)
  }
  function typesChanged(enteredValue){
    setEnteredTypes(enteredValue)
  }
  function driverNameChanged(enteredValue){
    setEnteredDriverName(enteredValue)
  }
  function empChnaged(enteredValue){
    setEnteredEmpMobile(enteredValue)
  }
  function routeChnaged(enteredValue){
    setEnteredRoute(enteredValue)
  }
  function stopChnaged(enteredValue){
    setEnteredStopName(enteredValue)
  }
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

  function buttonPressedHandler(){

    setShowTable(true);
    setShowForm(false);
    setForTransportList({fontWeight: "bold",color:'black'});
    setForAddTransport({color:'black'});
    console.log(UserId);
    const FormData={
      creator,
      vehicleno,
      types,
      driver_name,
      emp_mobile,
      route_name,
      stop_name
    }
    console.log(FormData);
      async function storeData() {
        try {
          let headers = {
                  "Content-Type": "application/json; charset=utf-8",
                };
                const dataForm = FormData;
                    const resLogin = await axios.post(
                      `http://10.0.2.2:8000/school/Transportreport/${UserId}`,
                      dataForm,
                      {
                        headers: headers,
                      }
                    );
                    const token = resLogin.data.token;
                    const userId = resLogin.data.user_id;
                    console.log(token)
                    // Token = token;
                    // UserId = userId;
        } catch (error) {
          console.log(error);
        }
      }
      storeData();

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
      {
        data &&  data.map((data,key) => (
            <DataTable.Row>
              <DataTable.Cell>
                {data.id}
              </DataTable.Cell>
               <DataTable.Cell>
                {data.student}
              </DataTable.Cell>
               <DataTable.Cell>
                {data.vehicleno}
              </DataTable.Cell>
              <DataTable.Cell>
                {data.types}
              </DataTable.Cell>
              <DataTable.Cell>
                {data.driver_name}
              </DataTable.Cell>
              <DataTable.Cell>
                {data.emp_mobile}
              </DataTable.Cell>
              <DataTable.Cell>
                {data.route_name}
              </DataTable.Cell>
              <DataTable.Cell>
                {data.stop_name}
              </DataTable.Cell>
            </DataTable.Row>
          )
        )}
      </DataTable>
      </ScrollView>}
  {showForm && 
  <ScrollView>
    <View style={styles.inputForm}>
    <Text style={styles.labels}>STUDENT</Text>
    <TextInput 
      style={styles.inputStyle}
      onChangeText={studentTextChanged}
      value={creator}/>
    <Text style={styles.labels}>VEHICLENO</Text>
    <TextInput 
      keyboardType="number-pad"
      style={styles.inputStyle}
      onChangeText={vehicleNumberChanged}
      value={vehicleno}/>
    <Text style={styles.labels}>TYPES</Text>
    <TextInput 
      style={styles.inputStyle}
      onChangeText={typesChanged}
      value={types}/>
    <Text style={styles.labels}>DRIVERS NAME</Text>
    <TextInput 
      style={styles.inputStyle}
      onChangeText={driverNameChanged}
      value={driver_name}/>
    <Text style={styles.labels}>EMP MOBILE</Text>
    <TextInput 
      style={styles.inputStyle}
      onChangeText={empChnaged}
      value={emp_mobile}/>
    <Text style={styles.labels}>ROUTE NAME</Text>
    <TextInput 
      style={styles.inputStyle}
      onChangeText={routeChnaged}
      value={route_name}/>
    <Text style={styles.labels}>STOP NAME</Text>
    <TextInput 
      style={styles.inputStyle}
      onChangeText={stopChnaged}
      value={stop_name}/>
    <View style={styles.btnSubmit}>
      <Button onPress={buttonPressedHandler}>Add Transport</Button>
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

import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import VerticalLine from "../../../components/UI/VerticalLine";
import { DataTable } from "react-native-paper";
import Button from "../../../components/UI/Button";
import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import { UserId } from "../../Login";
const TransportScreen = () => {
<<<<<<< HEAD
 

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
=======
  const [forTransportList, setForTransportList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forAddTransport, setForAddTransport] = useState({ color: "black" });
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [data, setData] = useState();
  const [formData, setFormData] = useState();

>>>>>>> 061d1a50c8a5d441beb946c249c58b09dccd4677
  useEffect(() => {

    async function fetchData() {
      try {
        const res = await axios.get(
          "http://10.0.2.2:8000/school/Transportreport/"
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

  function transportList() {
    setForTransportList({ fontWeight: "bold", color: "black" });
    setForAddTransport({ color: "black" });
    setShowForm(false);
    setShowTable(true);
  }

  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton onPress={transportList} style={forTransportList}>
          Transport List
        </BgButton>
      </View>
      {showTable && (
        <ScrollView horizontal={true}>
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
            {data &&
              data.map((data, key) => (
                <DataTable.Row>
                  <DataTable.Cell>{data.id}</DataTable.Cell>
                  <DataTable.Cell>{data.student}</DataTable.Cell>
                  <DataTable.Cell>{data.vehicleno}</DataTable.Cell>
                  <DataTable.Cell>{data.types}</DataTable.Cell>
                  <DataTable.Cell>{data.driver_name}</DataTable.Cell>
                  <DataTable.Cell>{data.emp_mobile}</DataTable.Cell>
                  <DataTable.Cell>{data.route_name}</DataTable.Cell>
                  <DataTable.Cell>{data.stop_name}</DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      )}
    </>
  );
};

export default TransportScreen;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
  },
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
  inputForm: {
    padding: 20,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  labels: {
    marginTop: 2,
  },
  btnSubmit: {
    marginTop: 5,
  },
});

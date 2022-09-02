import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import VerticalLine from "../../../components/UI/VerticalLine";
import { DataTable } from "react-native-paper";
import Button from "../../../components/UI/Button";
import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import { UserId } from "../../Login";
import { busNumber } from "../../../components/StudentItem/StudentItem";
import ParentsHome from "../ParentsHome";
const TransportScreen = () => {
  const [creator, setEnteredStudent] = useState("");
  const [vehicleno, setEnteredVehicleNumber] = useState("");
  const [types, setEnteredTypes] = useState("");
  const [driver_name, setEnteredDriverName] = useState("");
  const [emp_mobile, setEnteredEmpMobile] = useState();
  const [route_name, setEnteredRoute] = useState("");
  const [stop_name, setEnteredStopName] = useState("");

  // useEffect(()=>{
  //   async function getToken(){
  //     const value= await AsyncStorage.getItem('token')
  //     console.log(value)
  //   }
  //   getToken()
  //     },[]);

  const [forTransportList, setForTransportList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forAddTransport, setForAddTransport] = useState({ color: "black" });
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [data, setData] = useState();
  const [formData, setFormData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Transportreport/`
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
              <DataTable.Title style={styles.tableTitle}>ID</DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>
                STUDENT
              </DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>
                VEHICLENO
              </DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>TYPES</DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>
                DRIVERS NAME
              </DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>
                EMP MOBILE
              </DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>
                ROUTE NAME
              </DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>
                STOP NAME
              </DataTable.Title>
            </DataTable.Header>
            {data &&
              data.map((data, key) => (
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.id}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.student}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.vehicleno}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.types}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.driver_name}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.emp_mobile}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.route_name}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.stop_name}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      )}
      <ParentsHome />
    </>
  );
};

export default TransportScreen;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
  },
  container: {
    padding: 10,
  },
  tableHeader: {
    backgroundColor: "skyblue",
    height: 60,
  },
  tableTitle: {
    padding: 5,
    margin: 5,
    fontWeight: "bold",
  },
  tableCell: {
    padding: 5,
    margin: 9,
  },
  tableRow: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
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

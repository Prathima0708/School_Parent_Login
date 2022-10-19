import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import { DataTable } from "react-native-paper";
import Button from "../../../components/UI/Button";
import axios from "axios";
import BgButton from "../../../components/UI/BgButton";

import ParentsHome from "../BottomTab/ParentsHome";

import { busNumber } from "../../../components/StudentItem/StudentItem";
const TransportScreen = () => {
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

  const [showTable, setShowTable] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Transportreport/${busNumber}`
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
        {/* <BgButton onPress={transportList} style={forTransportList}>
          Transport List
        </BgButton> */}
      </View>
      {showTable && (
        <ScrollView horizontal={true}>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> BUS NUMBER</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> TYPES</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> VEHICLENO</Text>
              </View>

              <View style={styles.th}>
                <Text style={styles.tableTitle}> DRIVER NAME</Text>
              </View>

              <View style={styles.th}>
                <Text style={styles.tableTitle}> EMP MOBILE</Text>
              </View>

              <View style={styles.th}>
                <Text style={styles.tableTitle}> ROUTE NAME</Text>
              </View>

              <View style={styles.th}>
                <Text style={styles.tableTitle}> STOP NAME</Text>
              </View>
            </DataTable.Header>

            {data &&
              data.map((data, key) => (
                <DataTable.Row style={styles.tableRow} key={key}>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.busnumber}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.type}>
                    {data.types}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.vehicleno}
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
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
    width: 220,
  },
  container: {
    padding: 10,
  },
  type: {
    marginLeft: 10,
  },
  th: {
    padding: 5,
    marginRight: 13,
    //fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 50,
    fontWeight: "bold",
  },
  tableTitle: {
    // padding: 5,
    margin: 7,
    fontFamily: "MonsterratBold",
    fontSize: deviceWidth < 370 ? 13 : 16,
  },
  tableCell: {
    width: 40,
    //  fontFamily: "Montserrat_600SemiBold",
    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
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

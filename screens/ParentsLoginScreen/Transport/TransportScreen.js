import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { DataTable } from "react-native-paper";
import Button from "../../../components/UI/Button";
import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
} from "@expo-google-fonts/montserrat";
import ParentsHome from "../ParentsHome";
import AppLoading from "expo-app-loading";
const TransportScreen = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
  });
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

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
                  <DataTable.Row style={styles.tableRow}>
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
  }
};

export default TransportScreen;

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
    fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 50,
    fontWeight: "bold",
  },
  tableTitle: {
    padding: 5,
    margin: 7,
    // fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
  },
  tableCell: {
    width: 40,
    fontFamily: "Montserrat_600SemiBold",
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

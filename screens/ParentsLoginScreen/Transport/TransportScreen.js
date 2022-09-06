// import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
// import React, { useEffect, useState } from "react";
// import VerticalLine from "../../../components/UI/VerticalLine";
// import { DataTable } from "react-native-paper";
// import Button from "../../../components/UI/Button";
// import axios from "axios";
// import BgButton from "../../../components/UI/BgButton";
// import { UserId } from "../../Login";
// import { busNumber } from "../../../components/StudentItem/StudentItem";
// import ParentsHome from "../ParentsHome";
// const TransportScreen = () => {
//   const [creator, setEnteredStudent] = useState("");
//   const [vehicleno, setEnteredVehicleNumber] = useState("");
//   const [types, setEnteredTypes] = useState("");
//   const [driver_name, setEnteredDriverName] = useState("");
//   const [emp_mobile, setEnteredEmpMobile] = useState();
//   const [route_name, setEnteredRoute] = useState("");
//   const [stop_name, setEnteredStopName] = useState("");

//   // useEffect(()=>{
//   //   async function getToken(){
//   //     const value= await AsyncStorage.getItem('token')
//   //     console.log(value)
//   //   }
//   //   getToken()
//   //     },[]);

//   const [forTransportList, setForTransportList] = useState({
//     color: "black",
//     fontWeight: "bold",
//   });
//   const [forAddTransport, setForAddTransport] = useState({ color: "black" });
//   const [showForm, setShowForm] = useState(false);
//   const [showTable, setShowTable] = useState(true);
//   const [data, setData] = useState();
//   const [formData, setFormData] = useState();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await axios.get(
//           `http://10.0.2.2:8000/school/Transportreport/`
//         );
//         console.log(res.data);

//         setData(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//       // try {
//       //   // const value = await AsyncStorage.getItem('token');
//       // const value=  await AsyncStorage.getItem('token')
//       // console.log(value)
//       // } catch (error) {
//       //   // Error retrieving data
//       // }
//     }
//     fetchData();
//   }, []);

//   function transportList() {
//     setForTransportList({ fontWeight: "bold", color: "black" });
//     setForAddTransport({ color: "black" });
//     setShowForm(false);
//     setShowTable(true);
//   }

//   return (
//     <>
//       <View style={styles.BtnContainer}>
//         <BgButton onPress={transportList} style={forTransportList}>
//           Transport List
//         </BgButton>
//       </View>
//       {showTable && (
//         <ScrollView horizontal={true}>
//           <DataTable style={styles.container}>
//             <DataTable.Header style={styles.tableHeader}>
//               <View style={styles.th}>
//                 <Text style={styles.tableTitle}>ID</Text>
//               </View>
//               <View style={styles.th}>
//                 <Text style={styles.tableTitle}> BUS NUMBER</Text>
//               </View>
//               <View style={styles.th}>
//                 <Text style={styles.tableTitle}> VEHICLENO</Text>
//               </View>

//               <View style={styles.th}>
//                 <Text style={styles.tableTitle}> TYPES</Text>
//               </View>

//               <View style={styles.th}>
//                 <Text style={styles.tableTitle}> EMP MOBILE</Text>
//               </View>

//               <View style={styles.th}>
//                 <Text style={styles.tableTitle}> ROUTE NAME</Text>
//               </View>

//               <View style={styles.th}>
//                 <Text style={styles.tableTitle}> STOP NAME</Text>
//               </View>
//             </DataTable.Header>

//             {data &&
//               data.map((data, key) => (
//                 <DataTable.Row style={styles.tableRow}>
//                   <View style={styles.id}>
//                     <Text style={styles.tableTitle}> {data.id}</Text>
//                   </View>
//                   <View style={styles.bno}>
//                     <Text style={styles.tableTitle}> {data.busnumber}</Text>
//                   </View>
//                   <View style={styles.vno}>
//                     <Text style={styles.tableTitle}> {data.vehicleno}</Text>
//                   </View>
//                   <View style={styles.th}>
//                     <Text style={styles.tableTitle}> {data.types}</Text>
//                   </View>
//                   <View style={styles.th}>
//                     <Text style={styles.tableTitle}> {data.driver_name}</Text>
//                   </View>
//                   <View style={styles.th}>
//                     <Text style={styles.tableTitle}> {data.types}</Text>
//                   </View>
//                   <View style={styles.th}>
//                     <Text style={styles.tableTitle}> {data.emp_mobile}</Text>
//                   </View>
//                   <View style={styles.th}>
//                     <Text style={styles.tableTitle}> {data.route_name}</Text>
//                   </View>
//                   <View style={styles.th}>
//                     <Text style={styles.tableTitle}> {data.stop_name}</Text>
//                   </View>
//                 </DataTable.Row>
//               ))}
//           </DataTable>
//         </ScrollView>
//       )}
//       <ParentsHome />
//     </>
//   );
// };

// export default TransportScreen;

// const styles = StyleSheet.create({
//   BtnContainer: {
//     flexDirection: "row",
//     width: 220,
//   },
//   container: {
//     padding: 10,
//   },
//   id: {
//     width: 45,
//     borderRightColor: "black",
//     borderRightWidth: 1,
//   },
//   bno: {
//     justifyContent: "center",
//     alignItems: "center",
//     // margin: 15,
//     width: 125,
//     borderRightColor: "black",
//     borderRightWidth: 1,
//   },
//   vno: {
//     justifyContent: "center",
//     alignItems: "center",
//     //margin: 15,
//     width: 110,
//     height: 60,
//     padding: 10,
//     flexWrap: "wrap",
//     borderRightColor: "black",
//     borderRightWidth: 1,
//   },
//   th: {
//     //width: 100,
//     padding: 5,
//     fontSize: 24,
//     borderRightColor: "black",
//     borderRightWidth: 1,
//     // fontWeight: "bold",
//     // backgroundColor: "red",
//   },
//   tableHeader: {
//     backgroundColor: "skyblue",

//     height: 50,
//     fontWeight: "bold",
//   },
//   tableTitle: {
//     padding: 5,
//     margin: 5,
//     fontWeight: "bold",
//   },
//   tableCell: {
//     //padding: 5,
//     //margin: 10,
//     // width: 40,
//     borderRightColor: "black",
//     borderRightWidth: 1,
//     // marginTop: 7,
//     // marginLeft:5,
//     marginRight: 10,
//   },

//   tableRow: {
//     // alignItems: "stretch",
//     height: 26,
//     borderBottomColor: "black",
//     borderBottomWidth: 2,
//   },
//   inputForm: {
//     padding: 20,
//   },
//   inputStyle: {
//     borderWidth: 1,
//     borderColor: "grey",
//     borderRadius: 5,
//   },
//   labels: {
//     marginTop: 2,
//   },
//   btnSubmit: {
//     marginTop: 5,
//   },
// });
import * as React from "react";
import { useState } from "react";
import { DataTable } from "react-native-paper";

const optionsPerPage = [2, 3, 4];

const TransportScreen = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [data, setData] = useState();

  React.useEffect(() => {
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

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header>
      {/* {data &&
        data.map((data, key) => (
          <DataTable.Row>
            <DataTable.Cell>{data.id}</DataTable.Cell>
          </DataTable.Row>
        ))} */}
      {data &&
        data.map((data, key) => (
          <DataTable.Row>
            <DataTable.Cell>{data.id}</DataTable.Cell>
          </DataTable.Row>
        ))}

      {/* <DataTable.Row>
        <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
        <DataTable.Cell numeric>237</DataTable.Cell>
        <DataTable.Cell numeric>8.0</DataTable.Cell>
      </DataTable.Row> */}
    </DataTable>
  );
};

export default TransportScreen;

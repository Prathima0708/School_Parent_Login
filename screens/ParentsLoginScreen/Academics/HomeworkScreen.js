// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Text,
//   ScrollView,
//   Image,
// } from "react-native";
// import React, { useEffect, useState } from "react";

// import { DataTable } from "react-native-paper";

// import axios from "axios";
// import BgButton from "../../../components/UI/BgButton";
// import VerticalLine from "../../../components/UI/VerticalLine";
// import Button from "../../../components/UI/Button";

// const HomeworkScreen = ({}) => {
//   const [forTransportList, setForTransportList] = useState({
//     color: "black",
//     fontWeight: "bold",
//   });
//   const [forAddTransport, setForAddTransport] = useState({ color: "black" });
//   const [showForm, setShowForm] = useState(false);
//   const [showTable, setShowTable] = useState(true);
//   const [data, setData] = useState();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await axios.get("http://10.0.2.2:8000/school/Homework/");
//         console.log(res.data);

//         setData(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, []);
//   function transportList() {
//     setForTransportList({ fontWeight: "bold", color: "black" });
//     setForAddTransport({ color: "black" });
//     setShowForm(false);
//     setShowTable(true);
//   }
//   function addTransport() {
//     setForAddTransport({ fontWeight: "bold", color: "black" });
//     setForTransportList({ color: "black" });
//     setShowForm(true);
//     setShowTable(false);
//   }
//   return (
//     <>
//       <View style={styles.BtnContainer}>
//         <BgButton onPress={transportList} style={forTransportList}>
//           Transport List
//         </BgButton>
//         <VerticalLine>|</VerticalLine>
//         <BgButton onPress={addTransport} style={forAddTransport}>
//           Add Transport
//         </BgButton>
//       </View>
//       {showTable && (
//         <ScrollView>
//           <DataTable style={styles.container}>
//             <DataTable.Header style={styles.tableHeader}>
//               <DataTable.Title>ID</DataTable.Title>
//               <DataTable.Title>CLASS NAME</DataTable.Title>
//               <DataTable.Title>SUBJECT</DataTable.Title>
//               <DataTable.Title>SECTION</DataTable.Title>
//               <DataTable.Title>HOMEWORK DATE</DataTable.Title>
//               <DataTable.Title>REMARK</DataTable.Title>
//               <DataTable.Title>PHOTO</DataTable.Title>
//               <DataTable.Title>HOMEWORK</DataTable.Title>
//             </DataTable.Header>

//             {data &&
//               data.map((data) => (
//                 <DataTable.Row>
//                   <DataTable.Cell>{data.id}</DataTable.Cell>
//                   <DataTable.Cell>{data.class_name}</DataTable.Cell>
//                   <DataTable.Cell>{data.section}</DataTable.Cell>
//                   <DataTable.Cell>{data.subject}</DataTable.Cell>
//                   <DataTable.Cell>{data.homework_date}</DataTable.Cell>
//                   <DataTable.Cell>{data.remark}</DataTable.Cell>
//                   <DataTable.Cell>
//                     <Image
//                       source={{
//                         uri: `http://10.0.2.2:8000${data.homework_photo}`,
//                       }}
//                       style={styles.image}
//                       width="100px"
//                     />
//                   </DataTable.Cell>
//                   <DataTable.Cell>{data.homework}</DataTable.Cell>
//                 </DataTable.Row>
//               ))}
//           </DataTable>
//         </ScrollView>
//       )}
//       {showForm && (
//         <ScrollView>
//           <View style={styles.inputForm}>
//             <Text style={styles.labels}>STUDENT</Text>
//             <TextInput style={styles.inputStyle} />
//             <Text style={styles.labels}>VEHICLENO</Text>
//             <TextInput keyboardType="number-pad" style={styles.inputStyle} />
//             <Text style={styles.labels}>TYPES</Text>
//             <TextInput style={styles.inputStyle} />
//             <Text style={styles.labels}>DRIVERS NAME</Text>
//             <TextInput style={styles.inputStyle} />
//             <Text style={styles.labels}>EMP MOBILE</Text>
//             <TextInput style={styles.inputStyle} />
//             <Text style={styles.labels}>ROUTE NAME</Text>
//             <TextInput style={styles.inputStyle} />
//             <Text style={styles.labels}>STOP NAME</Text>
//             <TextInput style={styles.inputStyle} />
//             <View style={styles.btnSubmit}>
//               <Button>Add Transport</Button>
//             </View>
//           </View>
//         </ScrollView>
//       )}
//     </>
//   );
// };

// export default HomeworkScreen;

// const styles = StyleSheet.create({
//   BtnContainer: {
//     flexDirection: "row",
//   },
//   container: {
//     padding: 15,
//   },
//   tableHeader: {
//     backgroundColor: "#DCDCDC",
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
//   image: {
//     height: 70,
//     width: 50,
//   },
// });

import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { className } from "../../../components/StudentItem/StudentItem";
import ParentsHome from "../ParentsHome";
import { ScrollView } from "react-native";

const HomeworkScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/HomeworkByClass/${className}/`
        );
        console.log(res.data);
        setIsLoading(false);
        var Homeworkdata = [];
        Homeworkdata.push(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <ScrollView>
        <View style={styles.root}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <View style={styles.imgContainer}></View>
                  <View>
                    <View style={styles.bio}>
                      <Text style={styles.homewrk}>
                        Remark : {item.homework}
                      </Text>
                      <Text style={styles.homewrk}>
                        Subject: {item.subject}
                      </Text>
                    </View>

                    <View style={styles.main}>
                      <Image
                        style={styles.img}
                        resizeMode="cover"
                        source={{
                          uri: `http://10.0.2.2:8000${item.homework_photo}`,
                        }}
                      />
                      <View
                        style={{
                          marginLeft: -140,
                        }}
                      >
                        <Text style={styles.remark}>{item.remark}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <View>
        <ParentsHome />
      </View>
    </>
  );
};

export default HomeworkScreen;

const styles = StyleSheet.create({
  card: {
    width: 350,

    borderRadius: 25,
    //marginVertical: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  home: {
    marginTop: 620,
  },
  img: {
    height: 150,
    width: 200,
  },
  homewrk: {
    padding: 5,
    color: "white",
    fontSize: 20,
  },
  main: {
    width: "100%",
    padding: 15,
    backgroundColor: "#b696d7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    padding: 10,
  },
  bio: {
    width: "100%",
    //display: "flex",
    //flexDirection: "row",
    // alignItems: "center",
    //  justifyContent: "space-between",
    backgroundColor: "#353535",
    //  paddingVertical: 10,
  },
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  remark: {
    fontSize: 18,
    color: "black",
  },
});

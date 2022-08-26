// import { useEffect, useState } from "react";
// import { FlatList, StyleSheet, Text, View } from "react-native";

// import axios from "axios";

// function Exam() {
//   const [exams, setExams] = useState([]);
//   useEffect(() => {
//     async function getAllStudents() {
//       try {
//         const exams = await axios.get(`http://10.0.2.2:8000/school/Marksheet/`);
//         // console.log(students.data);
//         setExams(exams.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getAllStudents();
//   }, []);

//   const CONTENT = {
//     tableHead: ["S.no", "Name", "Hindi", "English", "Maths"],
//     tableTitle: ["1", "2", "3", "4", "5"],
//     tableData: [
//       ["abc", "50", "55", "60"],
//       ["xyz", "100", "90", "88"],
//       ["xyz", "100", "90", "88"],
//     ],
//   };
//   return (
//     <View style={styles.container}>
//       <Text>Student Details</Text>
//     </View>
//   );
// }

// export default Exam;

// const styles = StyleSheet.create({
//   rootContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 32,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
// });

import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";

export default class ExampleFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Head", "Head2", "Head3", "Head4"],
      tableData: [
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
      ],
    };
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderColor: "transparent" }}>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          {state.tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={cellIndex === 3 ? element(cellData, index) : cellData}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#808B97" },
  text: { margin: 6 },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
  btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" },
});

// import React, { Component } from "react";
// import { StyleSheet, View } from "react-native";
// import {
//   Table,
//   TableWrapper,
//   Row,
//   Rows,
//   Col,
// } from "react-native-table-component";

// export default class ExampleTwo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tableHead: ["", "Head1", "Head2", "Head3"],
//       tableTitle: ["Title", "Title2", "Title3", "Title4"],
//       tableData: [
//         ["1", "2", "3"],
//         ["a", "b", "c"],
//         ["1", "2", "3"],
//         ["a", "b", "c"],
//       ],
//     };
//   }

//   render() {
//     const state = this.state;
//     return (
//       <View style={styles.container}>
//         <Table borderStyle={{ borderWidth: 1 }}>
//           <Row
//             data={state.tableHead}
//             flexArr={[1, 2, 1, 1]}
//             style={styles.head}
//             textStyle={styles.text}
//           />
//           <TableWrapper style={styles.wrapper}>
//             <Col
//               data={state.tableTitle}
//               style={styles.title}
//               heightArr={[28, 28]}
//               textStyle={styles.text}
//             />
//             <Rows
//               data={state.tableData}
//               flexArr={[2, 1, 1]}
//               style={styles.row}
//               textStyle={styles.text}
//             />
//           </TableWrapper>
//         </Table>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
//   head: { height: 40, backgroundColor: "#f1f8ff" },
//   wrapper: { flexDirection: "row" },
//   title: { flex: 1, backgroundColor: "#f6f8fa" },
//   row: { height: 28 },
//   text: { textAlign: "center" },
// });

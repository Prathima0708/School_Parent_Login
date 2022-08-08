import { StyleSheet, Text, View } from "react-native";

function StudentsOverviewScreen() {
  return (
    <View style={styles.container}>
      <Text>Students Overview Screen</Text>
    </View>
  );
}
export default StudentsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";

// function StudentsOverviewScreen() {
//   const [exams, setExams] = useState([]);
//   useEffect(() => {
//     async function getAllStudents() {
//       try {
//         const exams = await axios.get("http://10.0.2.2:8000/school/Exam/");
//         // console.log(students.data);
//         setExams(exams.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getAllStudents();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>Student Details</Text>
//       <FlatList
//         data={exams}
//         renderItem={({ item }) => <Text>{item.exam_name}</Text>}
//       />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// export default StudentsOverviewScreen;

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

// export async function getAllStudents() {
//   const [students, setStudents] = useState([]);
//   try {
//     const students = await axios.get("http://10.0.2.2:8000/school/Student/");
//     // console.log(students.data);
//     setStudents(students.data);
//   } catch (error) {
//     console.log(error);
//   }
//   return (
//     <View style={styles.container}>
//       <Text>Student Details</Text>
//       <FlatList
//         data={students}
//         renderItem={({ item }) => <Text>{item.student_name}</Text>}
//       />
//     </View>
//   );
// }

function GetAllStudents() {
  const [students, setStudents] = useState([]);
  async function getStudents() {
    try {
      const students = await axios.get("http://10.0.2.2:8000/school/Student/");
      // console.log(students.data);
      setStudents(students.data);
    } catch (error) {
      console.log(error);
    }
    getStudents();
  }
  return (
    <View style={styles.container}>
      <Text>Student Details</Text>
      <FlatList
        data={students}
        renderItem={({ item }) => <Text>{item.student_name}</Text>}
      />
    </View>
  );
}

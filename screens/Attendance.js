import { FlatList, StyleSheet, Text, View } from "react-native";
import StudentItem from "../components/StudentItem/StudentItem";
import { studentList } from "./Login";

function Exam() {
  const [exams, setExams] = useState([]);
  useEffect(() => {
    async function getAllStudents() {
      try {
        const exams = await axios.get("http://10.0.2.2:8000/school/exam/");
        // console.log(students.data);
        setExams(exams.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllStudents();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Student Details</Text>
      <FlatList
        data={exams}
        renderItem={({ item }) => <Text>{item.exam_name}</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default Exam;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import StudentItem from "../components/StudentItem/StudentItem";
import { studentList } from "./Login";

function WelcomeScreen({ navigation }) {
  //console.log(studentList);
  function renderStudentDetails(itemData) {
    return <StudentItem {...itemData.item} />;
  }
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome</Text>

      {/* <Button title="Chat" /> */}

      <FlatList data={studentList} renderItem={renderStudentDetails} />
    </View>
  );
}

export default WelcomeScreen;

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

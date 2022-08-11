import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StudentItem from "../components/StudentItem/StudentItem";
import { studentList } from "./Login";
import { Ionicons } from "@expo/vector-icons";

function WelcomeScreen({ navigation }) {
  //console.log(studentList);
  function renderStudentDetails(itemData) {
    return <StudentItem {...itemData.item} />;
  }
  return (
    <>
      <View style={styles.rootContainer}>
        <Text style={styles.title}>Welcome</Text>

        <FlatList data={studentList} renderItem={renderStudentDetails} />
        <Pressable
          style={styles.btnContainer}
          onPress={() => navigation.navigate("Chat")}
        >
          <Ionicons name="chatbubble" size={28} color="black" />
          <Text style={styles.btnText}>Chat</Text>
        </Pressable>
      </View>
    </>
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
    fontWeight: "500",
    marginBottom: 8,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,

    borderRadius: 20,
    backgroundColor: "#368dff",
    marginTop: -39,
    marginLeft: 250,
  },

  btnText: {
    fontSize: 18,
    color: "black",
    marginLeft: 3,
    marginTop: 2,
  },
});

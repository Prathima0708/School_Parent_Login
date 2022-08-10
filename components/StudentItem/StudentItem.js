import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export var studentId, className;
function StudentItem({ student_name, class_name, id, student_photo }) {
  const navigation = useNavigation();
  function navigateHandler() {
    studentId = id;
    className = class_name;
    console.log(id);
    navigation.navigate("Category");
  }
  return (
    <>
      <Pressable onPress={navigateHandler.bind(this, id)}>
        <View style={styles.studentItem}>
          <View style={styles.studentItem}>
            {/* <Image
              source={{
                uri: `http://localhost:8000/${student_photo}`,
              }}
              style={styles.image}
            /> */}
            <Text style={[styles.textBase, styles.description]}>
              {/* <Text>Student Name:</Text> */}
              {student_name}
            </Text>
            <Text style={[styles.textBase, styles.description]}>
              {/* <Text>Class:</Text> */}
              {class_name}
            </Text>
            {/* <View style={styles.imageContainer}> */}
            {/* <Image
              source={{
                uri: `http://localhost:8000/${student_photo}`,
              }}
              style={styles.image}
            /> */}
            {/* </View> */}
          </View>
        </View>
      </Pressable>
    </>
  );
}
export default StudentItem;

const styles = StyleSheet.create({
  studentItem: {
    width: "100%",

    padding: 12,
    marginVertical: 8,
    backgroundColor: "#3e04c3",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: "#39324a",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: "#e4d9fd",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  imageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    //minWidth: 80,
  },
  image: {
    height: "100%",
    width: "50%",
  },
});

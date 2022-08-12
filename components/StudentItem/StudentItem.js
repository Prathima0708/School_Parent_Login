import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export var studentId, className, motherName;
function StudentItem({
  student_name,
  class_name,
  id,
  student_photo,
  mother_name,
}) {
  const navigation = useNavigation();
  function navigateHandler() {
    studentId = id;
    className = class_name;
    motherName = mother_name;
    console.log(id);
    navigation.navigate("Category");
  }
  return (
    <>
      <Pressable onPress={navigateHandler.bind(this, id)}>
        <View style={styles.studentItem}>
          <View style={styles.studentItem}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `http://10.0.2.2:8000${student_photo}`,
                }}
                style={styles.image}
                width="100px"
              />
            </View>
            <Text style={[styles.textBase, styles.description]}>
              {/* <Text>Student Name:</Text> */}
              {student_name}
            </Text>
            <Text style={[styles.textBase, styles.description]}>
              {/* <Text>Class:</Text> */}
              {class_name}
            </Text>
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

    padding: 11,
    marginVertical: 8,
    backgroundColor: "#3e04c3",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 6,
  },
  textBase: {
    color: "#e4d9fd",
    marginRight: 33,
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
    height: 70,
    width: 50,
  },
});

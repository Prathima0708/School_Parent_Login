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
import ImageSlider from "../../screens/ParentsLoginScreen/ImageSlider";

export var studentId, className, motherName, busNumber, Section;
function StudentItem({
  student_name,
  class_name,
  id,
  student_photo,
  mother_name,
  busnumber,
  section,
}) {
  const navigation = useNavigation();
  function navigateHandler() {
    studentId = id;
    className = class_name;
    busNumber = busnumber;
    Section = section;
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
    //  backgroundColor: "#3e04c3",
    backgroundColor: "#f0f0fc",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 8,
  },
  textBase: {
    color: "#0D98BA",
    marginRight: 33,
  },
  description: {
    fontSize: 20,

    marginBottom: 4,
    fontWeight: "bold",
  },
  imageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    borderColor: "#23215b",
    borderWidth: 5,
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

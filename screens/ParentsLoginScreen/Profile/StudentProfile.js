import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { mainURL } from "../../../components/utils/URL's";
import ImageSlider from "../ImageSlider";

export var studentId,
  className,
  StudentRegNo,
  busNumber,
  Section,
  StudentName,
  FatherName;
function StudentProfile({
  student_name,
  class_name,
  id,
  student_photo,
  reg_number,
  busnumber,
  section,
  father_name,
}) {
  const navigation = useNavigation();
  function navigateHandler() {
    StudentRegNo = reg_number;
    StudentName = student_name;
    studentId = id;
    className = class_name;
    busNumber = busnumber;
    Section = section;

    // console.log(id);
    navigation.navigate("StudentDetails", {
      stdreg: reg_number,
      stdname: student_name,
      stdclass: class_name,
      stdsection: section,
      fathername: father_name,
    });
  }
  return (
    <>
      <Pressable onPress={navigateHandler.bind(this, id)}>
        <View style={styles.studentItem}>
          <View style={styles.studentItem}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `${mainURL}${student_photo}`,
                }}
                style={styles.image}
                width="100px"
              />
            </View>
            {/* <Text style={[styles.textBase, styles.description]}>
              {student_name}
            </Text>
            <Text style={[styles.textBase, styles.description]}>
              {class_name}
            </Text> */}
            <View style={[{ flex: 1 }, { flexDirection: "column", left: 30 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.textBase, styles.description]}>Name</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.textBase, styles.description]}>Class</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.textBase, styles.description]}>
                  Reg No
                </Text>
              </View>
            </View>
            <View
              style={[
                { flex: 1 },
                { flexDirection: "column", left: 10, top: 2 },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.textBase, styles.textStyleStudInfo]}>
                  {student_name}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.textBase, styles.textStyleStudInfo]}>
                  {class_name} - {section}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.textBase, styles.textStyleStudInfo]}>
                  {reg_number}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
}
export default StudentProfile;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

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
    marginRight: 10,
  },
  description: {
    fontSize: deviceWidth < 370 ? 20 : 17,

    marginBottom: 4,
    // fontWeight: "bold",
    fontFamily: "HindSemiBold",
  },
  textStyleStudInfo: {
    fontSize: deviceWidth < 370 ? 20 : 17,

    marginBottom: 4,
    // fontWeight: "bold",
    fontFamily: "HindMedium",
  },
  imageContainer: {
    // paddingHorizontal: 12,
    // paddingVertical: 4,
    backgroundColor: "white",
    // borderColor: "#23215b",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    //minWidth: 80,
  },
  image: {
    height: 70,
    width: 75,
  },
});

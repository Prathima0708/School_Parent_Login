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
import { Image as NativeImage } from "native-base";
import ImageSlider from "../../screens/ParentsLoginScreen/ImageSlider";
import { useEffect, useRef } from "react";

export var studentId,
  className,
  StudentRegNo,
  busNumber,
  Section,
  StudentName,
  FatherName,
  MotherName,
  DOB,
  Gendar,
  DateOfAddmission,
  StudentAddress,
  City,
  State,
  Country,
  Pincode,
  AcademicYear,
  StudentPhoto;
function StudentItem({
  student_name,
  class_name,
  id,
  reg_number,
  busnumber,
  section,
  father_name,
  mother_name,
  Dob,
  gender,
  date_of_admission,
  student_address,
  city,
  state,
  country,
  pincode,
  academic_year,
  student_photo,
}) {
  const navigation = useNavigation();
  function navigateHandler() {
    StudentRegNo = reg_number;
    StudentName = student_name;
    studentId = id;
    className = class_name;
    busNumber = busnumber;
    Section = section;
    // StudentPhoto = student_photo;
    FatherName = father_name;
    MotherName = mother_name;
    DOB = Dob;
    Gendar = gender;
    DateOfAddmission = date_of_admission;
    StudentAddress = student_address;
    City = city;
    State = state;
    Country = country;
    Pincode = pincode;
    AcademicYear = academic_year;
    StudentPhoto = student_photo;
    console.log(id);
    navigation.navigate("Category");
  }
  const myRef = useRef(null);

  useEffect(() => {
    if (myRef.current && myRef.current.setNativeProps) {
      const styleObj = {
        borderWidth: 3,
        //borderRadius: 4,
        borderColor: "black",
      };
      myRef.current.setNativeProps({
        style: styleObj,
      });
    }
  }, [myRef]);

  return (
    <>
      <Pressable onPress={navigateHandler.bind(this, id)}>
        <View style={[styles.container]}>
          <View style={{ flex: 0.53 }}>
            {/* <Image
              source={{
                uri: `http://10.0.2.2:8000${student_photo}`,
              }}
              style={styles.image}
              width="100px"/> */}
            <NativeImage
              source={{
                uri: `http://10.0.2.2:8000${student_photo}`,
              }}
              alt="Student Image"
              size="lg"
              resizeMode="contain"
              ref={myRef}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={[
                { flex: 1 },
                {
                  flexDirection: "row",
                },
              ]}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.textBase, styles.description]}>Name</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.textBase, styles.textStyleStudInfo]}>
                  {student_name}
                </Text>
              </View>
            </View>
            <View
              style={[
                { flex: 1 },
                {
                  flexDirection: "row",
                },
              ]}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.textBase, styles.description]}>Class</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.textBase, styles.textStyleStudInfo]}>
                  {class_name} - {section}
                </Text>
              </View>
            </View>
            <View
              style={[
                { flex: 1 },
                {
                  flexDirection: "row",
                },
              ]}
            >
              <View style={{ flex: 1, alignItems: "center", marginLeft: "5%" }}>
                <Text style={[styles.textBase, styles.description]}>
                  Reg No
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
export default StudentItem;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 15,
   backgroundColor: "#f0f0fc",
    padding: 15,
  },
  studentItem: {
    width: "100%",

    padding: 11,
    marginVertical: 8,
    //  backgroundColor: "#3e04c3",
    // backgroundColor: "#f0f0fc",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 8,
  },
  textBase: {
    color: "#0D98BA",
    // marginRight: 10,
  },
  description: {
    fontSize: deviceWidth < 370 ? 15 : 17,
    marginBottom: 4,
    // fontWeight: "bold",
    fontFamily: "HindSemiBold",
  },
  textStyleStudInfo: {
    fontSize: deviceWidth < 370 ? 15 : 17,

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
    // bottom:deviceWidth < 370 ? '15%' : '1%',
    //minWidth: 80,
  },
  image: {
    height: 70,
    // bottom:deviceWidth < 370 ? '2%' : '1%',
    width: 100,
  },
});

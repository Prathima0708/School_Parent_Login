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
import { Center, Image as NativeImage, Skeleton } from "native-base";
import ImageSlider from "../../screens/ParentsLoginScreen/ImageSlider";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mainURL } from "../utils/URL's";
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
  StudentPhoto,
  ContactNumber,
  AlternateNumber;
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
  contact_num,
  alter_num,
}) {
  const navigation = useNavigation();
  const [loading, setIsLoading] = useState(true);
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
    ContactNumber = contact_num;
    AlternateNumber = alter_num;
    console.log(id);

    navigation.navigate("Category");
  }
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);
  const myRef = useRef(null);

  // async function fetchData() {
  //   try {
  //     await AsyncStorage.setItem("STUD_ID", id);
  //   } catch (error) {
  //     // Error saving data
  //   }
  // }
  // fetchData();

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
  }, [myRef, loading]);
  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <Pressable onPress={navigateHandler.bind(this, id)}>
        <View style={[styles.container]}>
          <View style={{ flex: 0.53 }}>
            {loading && (
              <Center w="100%">
                <Skeleton
                  borderWidth={1}
                  borderColor="coolGray.200"
                  endColor="warmGray.50"
                  size="20"
                />
              </Center>
            )}
            {!loading && (
              <NativeImage
                source={{
                  uri: `${mainURL}${student_photo}`,
                }}
                alt="Student Image"
                size="lg"
                resizeMode="contain"
                ref={myRef}
                // onError={() => setLoading(false)}
                // onLoad={handleImageLoad}
              />
            )}
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
              <View style={{ flex: 0.8, alignItems: "center" }}>
                <Text style={[styles.textBase, styles.description]}>Class</Text>
              </View>
              <View style={{ flex: 0.8 }}>
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

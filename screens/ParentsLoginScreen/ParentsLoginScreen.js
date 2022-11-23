// import {
//   Alert,
//   Dimensions,
//   FlatList,
//   Image,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import StudentItem from "../../components/StudentItem/StudentItem";
// import axios from "axios";
// import { useEffect } from "react";
// import { useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { useLayoutEffect } from "react";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import IconButton from "../../components/UI/IconButton";
// import ImageSlider from "./ImageSlider";
// export var studentList = [];
// export var value;
// function ParentsLoginScreen() {
//   const [students, setStudents] = useState([]);
//   const route = useRoute();
//   const navigation = useNavigation();
//   //const phone = navigation.getParent("phone");

//   async function logoutHandler() {
//     try {
//       // const value = await AsyncStorage.getItem('token');
//       const value = await AsyncStorage.removeItem("token");
//       if (value == null) {
//         console.log("Data removed");
//         navigation.navigate("Login");
//       } else {
//         console.log("Data not removed");
//       }

//       // if (value == null) {
//       //   console.log("Token is removed"+value)
//       //   //  AsyncStorage.removeItem("token");
//       //   //  console.log(value)
//       //   //  navigation.navigate("Login");
//       // }
//     } catch (error) {
//       // Error retrieving data
//     }
//   }

//   useEffect(() => {
//     async function fetchPhone() {
//       value = await AsyncStorage.getItem("Phone");
//       // console.log("this is from parents screen", value);
//     }
//     fetchPhone();
//   }, []);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => {
//         return (
//           // <LogoutButton onPress={LogoutBtnPressHandler}>Test</LogoutButton>
//           <IconButton
//             onPress={logoutHandler}
//             icon="log-out-outline"
//             size={30}
//           />
//         );
//       },
//     });
//   }, []);

//   useEffect(() => {
//     async function login() {
//       //   console.log(route.params.phone);
//       //console.log("this is inside parentsloginscreen", phone);
//       try {
//         const ph = route.params.phone.toString();
//         console.log(ph);
//         const res = await axios.get("http://10.0.2.2:8000/school/Student/");
//         //  console.log(res.data);
//         let filteredlist = res.data.filter(
//           (ele) => ele.contact_num == route.params.phone
//         );
//         setStudents(filteredlist);
//         // if (route.params.phone == null) {
//         //   setStudents("");
//         // }
//         console.log(filteredlist);
//         studentList = filteredlist;
//         if (filteredlist.length == 0) {
//           Alert.alert("Invalid Input", "Please enter a valid phone number");
//           navigation.navigate("Login");
//           // return;
//         } else {
//           console.log("else part");
//         }
//         // else {
//         //   navigation.navigate("ParentsLogin");
//         // }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     login();
//   }, []);

//   function renderStudentDetails(itemData) {
//     return <StudentItem {...itemData.item} />;
//   }
//   return (
//     <>
//       <View style={styles.rootContainer}>
//         <FlatList data={students} renderItem={renderStudentDetails} />
//         <ImageSlider />
//         <Pressable
//           style={styles.btnContainer}
//           onPress={() => navigation.navigate("Chat")}
//         >
//           <Ionicons name="chatbubble" size={28} color="black" />
//           <Text style={styles.btnText}>Chat</Text>
//         </Pressable>
//       </View>
//     </>
//   );
// }

// export default ParentsLoginScreen;
// const deviceWidth = Dimensions.get("window").height;
// const styles = StyleSheet.create({
//   rootContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: deviceWidth < 718 ? 20 : 32,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "500",
//     marginBottom: 8,
//   },
//   btnContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     padding: 10,

//     borderRadius: 20,
//     backgroundColor: "#368dff",
//     marginTop: -39,
//     marginLeft: 250,
//   },

//   btnText: {
//     fontSize: 18,
//     color: "black",
//     marginLeft: 3,
//     marginTop: 2,
//   },
// });

//new one
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StudentItem from "../../components/StudentItem/StudentItem";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "../../components/UI/IconButton";
import ImageSlider from "./ImageSlider";
import Swiper from "react-native-swiper";
import { Heading } from "native-base";
import { PHONENO } from "../Login";
export var studentList = [];
export var value, phno;
export var PHONE;
export var phonenumber;
function ParentsLoginScreen() {
  const [students, setStudents] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  //const phone = navigation.getParent("phone");

  async function logoutHandler() {
    try {
      // const value = await AsyncStorage.getItem('token');
      const value = await AsyncStorage.removeItem("token");
      const ph = await AsyncStorage.removeItem("Phone");
      console.log("ph", ph);
      // const studlist = await AsyncStorage.removeItem("studentlist");
      // console.log("studentlist", studlist);
      // if (ph == undefined) {
      //   const newph = await AsyncStorage.setItem("value");
      // }

      //    console.log("newph", newph);
      if (value == null) {
        console.log("Data removed");
        navigation.navigate("Login");
      } else {
        console.log("Data not removed");
      }

      // if (value == null) {
      //   console.log("Token is removed"+value)
      //   //  AsyncStorage.removeItem("token");
      //   //  console.log(value)
      //   //  navigation.navigate("Login");
      // }
    } catch (error) {
      // Error retrieving data
    }
  }

  async function fetchPhone() {
    value = await AsyncStorage.getItem("Phone");
    if (value == null) {
      await AsyncStorage.removeItem("Phone");
    }

    // console.log("this is from parents screen", value);
  }
  fetchPhone();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          // <LogoutButton onPress={LogoutBtnPressHandler}>Test</LogoutButton>
          <IconButton
            onPress={logoutHandler}
            icon="log-out-outline"
            size={30}
          />
        );
      },
    });
  }, []);

  useEffect(() => {
    async function login() {
      // PHONE = route.params.phone;
      // console.log("this is from parents screen", PHONENO);

      try {
        //  const ph = route.params.phone.toString();

        const res = await axios.get("http://10.0.2.2:8000/school/Student/");
        // if (route.params.phone == undefined) {
        //   phonenumber = value;
        // }
        //  console.log("this is phno value", route.params.phone);
        // console.log("this is phno", value);
        // if (route.params.phone == undefined) {
        //   route.params.phone = value;
        // }
        let filteredlist = res.data.filter((ele) => ele.contact_num == value);
        setStudents(filteredlist);
        // if (route.params.phone == null) {
        //   setStudents("");
        // }
        console.log("**********************");
        console.log(filteredlist);
        studentList = filteredlist;

        if (filteredlist.length == 0) {
          Alert.alert("Invalid Input", "Please enter a valid phone number");
          navigation.navigate("Login");
          // return;
        } else {
          console.log("else part");
        }
      } catch (error) {
        console.log(error);
      }
    }
    login();
  }, []);

  function renderStudentDetails(itemData) {
    return <StudentItem {...itemData.item} />;
  }
  return (
    <>
      <View
        style={[
          { flex: 1 },
          { flexDirection: "column", backgroundColor: "white" },
        ]}
      >
        <View style={styles.studInfoStyle}>
          <Heading size="md" style={{ textAlign: "center", bottom: 7 }}>
            Student details
          </Heading>
          <ScrollView persistentScrollbar={false}>
            <FlatList data={students} renderItem={renderStudentDetails} />
          </ScrollView>
        </View>
        <View style={{ flex: 2, top: -10 }}>
          <ImageSlider />
        </View>
        <View
          style={{ flex: 0.5, backgroundColor: "white", right: 20, bottom: 10 }}
        >
          <Pressable
            style={styles.btnContainer}
            onPress={() => navigation.navigate("Chat")}
          >
            <Ionicons name="chatbubble-sharp" size={38} color="#368dff" />
            {/* <Text style={styles.btnText}>Chat</Text> */}
          </Pressable>
        </View>
      </View>
    </>
  );
}

export default ParentsLoginScreen;
const deviceWidth = Dimensions.get("window").height;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: deviceWidth < 718 ? 20 : 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
  btnContainer: {
    // flexDirection: "row",
    // justifyContent: "center",
    // padding: 10,
    // borderRadius: 20,
    backgroundColor: "#DBDDFC",
    width: "15.5%",
    left: "85%",
    padding: 10,
    borderRadius: 100,
    bottom: 3,
    // // marginTop: -39,
    // marginLeft: 250,
  },

  btnText: {
    fontSize: 18,
    color: "black",
    marginLeft: 3,
    marginTop: 2,
  },
  studInfoStyle: {
    flex: 1.4,
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    shadowColor: "black",
    elevation: 10,
    shadowOpacity: 0.95,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
});

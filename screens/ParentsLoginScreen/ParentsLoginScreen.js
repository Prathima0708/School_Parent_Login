// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Alert,
//   Pressable,
// } from "react-native";
// import React from "react";
// import { studentList } from "./WelcomeScreen";
// import StudentItem from "../components/StudentItem/StudentItem";
// import { Ionicons } from "@expo/vector-icons";

// import { useNavigation } from "@react-navigation/native";

// const ParentsLoginScreen = () => {
//   const navigation = useNavigation();
//   //   if (studentList.length == 0) {
//   //     Alert.alert("Invalid Input", "Please enter valid credentials");
//   //   }
//   function renderStudentDetails(itemData) {
//     return <StudentItem {...itemData.item} />;
//   }
//   return (
//     <View style={styles.rootContainer}>
//       <FlatList data={studentList} renderItem={renderStudentDetails} />
//       <Pressable
//         style={styles.btnContainer}
//         onPress={() => navigation.navigate("Chat")}
//       >
//         <Ionicons name="chatbubble" size={28} color="black" />
//         <Text style={styles.btnText}>Chat</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default ParentsLoginScreen;

// const styles = StyleSheet.create({
//   rootContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 32,
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

import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StudentItem from "../../components/StudentItem/StudentItem";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";

export var studentList = [];
function ParentsLoginScreen() {
  const [students, setStudents] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    async function login() {
      try {
        const ph = route.params.phone.toString();
        const res = await axios.get("http://10.0.2.2:8000/school/Student/");
        //  console.log(res.data);
        let filteredlist = res.data.filter(
          (ele) => ele.contact_num == route.params.phone
        );
        setStudents(filteredlist);

        console.log(filteredlist);
        studentList = filteredlist;
        if (filteredlist.length == 0) {
          Alert.alert("Invalid Input", "Please enter valid phone number");
          navigation.navigate("Login");
        }
        // else {
        //   navigation.navigate("ParentsLogin");
        // }
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
      <View style={styles.rootContainer}>
        <FlatList data={students} renderItem={renderStudentDetails} />
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

export default ParentsLoginScreen;

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
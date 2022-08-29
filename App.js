// import axios from "axios";
// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState } from "react";
// import { FlatList, StyleSheet, Text, View } from "react-native";

// export default function App() {
//   const [students, setStudents] = useState([]);
//   useEffect(() => {
//     async function getAllStudents() {
//       try {
//         const students = await axios.get(
//           "http://10.0.2.2:8000/school/Student/"
//         );
//         // console.log(students.data);
//         setStudents(students.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getAllStudents();
//   }, []);
//   return (
//     <View style={styles.container}>
//       <Text>Student Details</Text>
//       <FlatList
//         data={students}
//         renderItem={({ item }) => <Text>{item.student_photo}</Text>}
//       />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import Login from "./screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";

import Chat from "./components/ChatApplication/Chat";
import ChatScreen from "./components/ChatApplication/ChatScreen";
import SingleUser from "./components/ChatApplication/SingleUser";
import TeachersLoginScreen from "./screens/TeachersLoginScreen/TeachersLoginScreen";
import ParentsLoginScreen from "./screens/ParentsLoginScreen/ParentsLoginScreen";
import TeachersOverviewScreen from "./screens/TeachersLoginScreen/TeachersTransport";
import LeaveScreen from "./screens/ParentsLoginScreen/Academics/LeaveScreen";
import TransportScreen from "./screens/ParentsLoginScreen/Transport/TransportScreen";
import CalenderScreen from "./screens/ParentsLoginScreen/Calendar/CalenderScreen";
import Exam from "./screens/ParentsLoginScreen/Academics/Exam";
import Academics from "./screens/ParentsLoginScreen/Academics/Academics";
import HomeworkScreen from "./screens/ParentsLoginScreen/Academics/HomeworkScreen";
import StudentCategories from "./screens/ParentsLoginScreen/StudentCategories";
import StudentsOverviewScreen from "./screens/ParentsLoginScreen/StudentsOverviewScreen";
import Noticeboard from "./screens/ParentsLoginScreen/Academics/Noticeboard";
import Attendance from "./screens/ParentsLoginScreen/Academics/Attendance";
import TeachersTransport from "./screens/TeachersLoginScreen/TeachersTransport";
import TimeTable from "./screens/ParentsLoginScreen/Academics/TimeTable";
import TeachersHomework from "./screens/TeachersLoginScreen/TeachersHomeWork";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      {/* <Login /> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Kinara" }}
          />
          <Stack.Screen name="TeachersLogin" component={TeachersLoginScreen} />

          <Stack.Screen name="ParentsLogin" component={ParentsLoginScreen} />

          <Stack.Screen name="Category" component={StudentCategories} />
          <Stack.Screen
            name="StudentsOverview"
            component={StudentsOverviewScreen}
          />
          <Stack.Screen name="Leave" component={LeaveScreen} />
          <Stack.Screen name="Calender" component={CalenderScreen} />
          {/* <Stack.Screen name="MarksCard" component={Exam} /> */}
          <Stack.Screen name="NoticeBoard" component={Noticeboard} />
          <Stack.Screen name="TimeTable" component={TimeTable} />
          <Stack.Screen name="Attendance" component={Attendance} />
          <Stack.Screen name="Transport" component={TransportScreen} />
          <Stack.Screen
            name="TeachersTransport"
            component={TeachersTransport}
          />
          <Stack.Screen name="TeachersHomework" component={TeachersHomework} />
          <Stack.Screen
            name="TeachersOverview"
            component={TeachersOverviewScreen}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="SingleUser" component={SingleUser} />
          <Stack.Screen name="Academics" component={Academics} />
          <Stack.Screen name="Homework" component={HomeworkScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

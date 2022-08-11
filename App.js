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

import StudentCategories from "./screens/StudentCategories";
import StudentsOverviewScreen from "./screens/StudentsOverviewScreen";
import Chat from "./components/ChatApplication/Chat";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      {/* <Login /> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Category" component={StudentCategories} />
          <Stack.Screen
            name="StudentsOverview"
            component={StudentsOverviewScreen}
          />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

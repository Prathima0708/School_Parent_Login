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
import Dashboard from "./screens/Dashboard";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      {/* <Login /> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { StatusBar } from "expo-status-bar";
// import { useContext, useEffect, useState } from "react";
// import IconButton from "../SchoolParentApp/components/UI/IconButton";
// import { Colors } from "./components/constants/styles";
// import AppLoading from "expo-app-loading";
// import LoginScreen from "./screens/LoginScreen";
// import SignupScreen from "./screens/SignupScreen";
// import WelcomeScreen from "./screens/WelcomeScreen";
// import AuthContextProvider from "./components/store/auth-context";
// import { AuthContext } from "./components/store/auth-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Stack = createNativeStackNavigator();

// function AuthStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: Colors.primary500 },
//         headerTintColor: "white",
//         contentStyle: { backgroundColor: Colors.primary100 },
//       }}
//     >
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Signup" component={SignupScreen} />
//     </Stack.Navigator>
//   );
// }

// function AuthenticatedStack() {
//   const authCtx = useContext(AuthContext);
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: Colors.primary500 },
//         headerTintColor: "white",
//         contentStyle: { backgroundColor: Colors.primary100 },
//       }}
//     >
//       <Stack.Screen
//         name="Welcome"
//         component={WelcomeScreen}
//         options={{
//           headerRight: ({ tintColor }) => (
//             <IconButton
//               icon="exit"
//               color={tintColor}
//               size={24}
//               onPress={authCtx.logout}
//             />
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// function Navigation() {
//   const authCtx = useContext(AuthContext);

//   return (
//     <NavigationContainer>
//       {!authCtx.isAuthenticated && <AuthStack />}
//       {authCtx.isAuthenticated && <AuthenticatedStack />}
//     </NavigationContainer>
//   );
// }
// function Root() {
//   const [isTryingLogin, setIsTryingLogin] = useState(true);
//   const authCtx = useContext(AuthContext);

//   useEffect(() => {
//     async function fetchToken() {
//       const storedToken = await AsyncStorage.getItem("token");
//       if (storedToken) {
//         authCtx.authenticate(storedToken);
//       }
//       setIsTryingLogin(false);
//     }
//     fetchToken();
//   }, []);
//   if (isTryingLogin) {
//     return <AppLoading />;
//   }
//   return <Navigation />;
// }
// export default function App() {
//   return (
//     <>
//       <StatusBar style="light" />
//       <AuthContextProvider>
//         <Root />
//       </AuthContextProvider>
//     </>
//   );
// }

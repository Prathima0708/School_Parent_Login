// import { useEffect, useState } from "react";
// import Test from "../components/UI/LgButton";
// import { Ionicons } from "@expo/vector-icons";
// import KeyboardAccessory from "react-native-sticky-keyboard-accessory";
// import {
//   Alert,
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Button as Btn,
//   KeyboardAvoidingView,
//   ScrollView,
//   Image,
//   Keyboard,
//   TouchableHighlight,
// } from "react-native";
// import Button from "../components/UI/Button";
// import axios from "axios";
// import { Colors } from "../components/constants/styles";
// import { useNavigation } from "@react-navigation/native";
// import { AsyncStorageStatic } from "react-native";
// import WelcomeScreen from "./WelcomeScreen";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import LgButton from "../components/UI/LgButton";
// import { TouchableWithoutFeedback } from "react-native";
// import { Platform } from "react-native";
// import AppLoading from "expo-app-loading";
// import { useFonts } from "expo-font";
// import { validateYupSchema } from "formik";
// import { formikFieldApplyYupTransforms } from "formik-yup";

// export var Token, UserId, LoginResponse;
// function Login() {
//   // const [fontsLoaded] = useFonts({
//   //   Roboto: require("../assets/fonts/Roboto-Black.ttf"),
//   //   RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
//   // });
//   const navigation = useNavigation();
//   const [enteredUser, setEnteredUser] = useState("");
//   const [enteredPassword, setEnteredPassword] = useState("");
//   const [enteredPhone, setEnteredPhone] = useState("");
//   const [students, setStudents] = useState([]);
//   const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
//   const [authToken, setAuthToken] = useState();

//   const [show, setShow] = useState(false);

//   const [forPartentBackground, setForPartentBackground] = useState({
//     color: "#d9dffc",
//     borderColor: "#d9dffc",
//     fontFamily: "welcomeMsg",
//   });

//   const [forTeacherBackground, setForTeacherBackground] = useState({
//     color: "#3d4590",
//     borderColor: "#3d4590",
//     fontFamily: "welcomeMsg",
//   });

//   // function login() {
//   //   //fun call get stdent  --  [{ctnum},{}]
//   //   // filter ctnum -- enteredPhone  ----- fitertedstdData = [{},{}] || []
//   //   // local storage  fitertedstdData  window.localstorage.setItem(stdentList, fitertedstdData)
//   //   // if fitertedstdData.length == 0 ? errMsg : Dashboard redirection (  window.localstorage.getItem(stdentList) )
//   // }

//   useEffect(() => {
//     const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
//       setKeyboardStatus("Keyboard Shown");
//     });
//     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
//       setKeyboardStatus("Keyboard Hidden");
//     });

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   async function login() {
//     try {
//       //  const token = "c4e8c2613ea3f60e47de0bd593ec2d71357e934b";
//       let headers = {
//         "Content-Type": "application/json; charset=utf-8",
//       };
//       const user = { username: enteredUser, password: enteredPassword };
//       const resLogin = await axios.post(
//         "http://10.0.2.2:8000/school/api-token-auth/",
//         user,

//         {
//           headers: headers,
//         }
//       );
//       // LoginResponse = resLogin;
//       const token = resLogin.data.token;
//       const userId = resLogin.data.user_id;

//       Token = token;
//       UserId = userId;
//       // setAuthToken(token);
//       // AsyncStorage.setItem("token", token);
//       // const tokenValue=AsyncStorage.getItem("token", token);
//       // console.log(tokenValue)
//       console.log(resLogin.data);
//       console.log(resLogin.data.groups);

//       // setStudents(resLogin.data);

//       // let filteredlist = res.data.filter((ele) => ele.username == enteredPhone);
//       // studentList = filteredlist;
//       // console.log(filteredlist);
//       // if (filteredlist.length == 0) {
//       //   Alert.alert("Invalid Input", "Please enter valid credentials");
//       //   setEnteredPhone("");
//       // } else {

//       if (resLogin.data.groups[0] === "parents") {
//         // <WelcomeScreen />;

//         navigation.navigate("Parent's Dashboard", {
//           phone: enteredPhone,
//         });
//       } else {
//         // console.log("TEACHERS PAGE");
//         navigation.navigate("TeachersLogin");
//       }

//       setEnteredUser("");
//       setEnteredPassword("");
//       setEnteredPhone("");
//       // }
//     } catch (error) {
//       console.log(error);
//     }
//     try {
//       await AsyncStorage.setItem("token", Token);
//     } catch (error) {
//       // Error saving data
//     }
//     try {
//       const value = await AsyncStorage.getItem("token");

//       if (value !== null) {
//         console.log("This is the token :" + value);
//       }
//     } catch (error) {
//       // Error retrieving data
//     }
//   }
//   function toggleParents() {
//     setShow(true);
//     setForTeacherBackground({ color: "#d9dffc", borderColor: "#d9dffc" });

//     setForPartentBackground({ color: "#3d4590", borderColor: "#3d4590" });

//     //navigation.navigate("TeachersLogin");
//   }
//   function userInputHandler(enteredValue) {
//     setEnteredUser(enteredValue);
//   }
//   function passwordInputHandler(enteredValue) {
//     setEnteredPassword(enteredValue);
//   }
//   function phoneInputHandler(enteredValue) {
//     setEnteredPhone(enteredValue);
//   }

//   function toggleTeachers() {
//     setShow(false);
//     setForPartentBackground({ color: "#d9dffc", borderColor: "#d9dffc" });
//     setForTeacherBackground({ color: "#3d4590", borderColor: "#3d4590" });
//   }

//   return (
//     <>
//       <View style={{ backgroundColor: "white", height: "100%" }}>
//         {keyboardStatus == "Keyboard Hidden" && (
//           <Image
//             style={styles.bannerImage}
//             source={require("../assets/kinarabg2.png")}
//           />
//         )}

//         <View style={styles.accTypeText}>
//           <Text
//             style={{
//               color: "#85929E",
//               fontSize: 18,
//               top: -25,
//               fontFamily: "Poppins",
//             }}
//           >
//             Choose account type
//           </Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <LgButton onPress={toggleTeachers} style={forTeacherBackground}>
//             Teachers
//           </LgButton>
//           <View style={styles.space} />
//           <LgButton onPress={toggleParents} style={forPartentBackground}>
//             Parents
//           </LgButton>
//         </View>
//         <View>
//           <View style={styles.inputContainer}>
//             <TextInput
//               onChangeText={userInputHandler}
//               style={styles.inputStyle}
//               value={enteredUser}
//               placeholder="Username"
//             />
//             <TextInput
//               secureTextEntry
//               onChangeText={passwordInputHandler}
//               style={styles.inputStyle}
//               value={enteredPassword}
//               placeholder="Password"
//             />
//             {show && (
//               <>
//                 <TextInput
//                   onChangeText={phoneInputHandler}
//                   style={styles.inputStyle}
//                   value={enteredPhone}
//                   keyboardType="number-pad"
//                   placeholder="Registered Phone Number"
//                 />
//               </>
//             )}
//             <TouchableHighlight
//               style={styles.submit}
//               onPress={login}
//               underlayColor="#002D62"
//             >
//               <Text style={[styles.submitText]}>Login</Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//       </View>
//     </>
//   );
// }

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   bannerImage: {
//     width: "100%",
//     height: 300,
//   },
//   loginTypeText: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     paddingLeft: 47,
//     paddingRight: 57,
//     // top: 45,
//   },
//   space: {
//     width: 20,
//     height: 20,
//   },
//   inputContainer: {
//     //width: "100%",

//     paddingLeft: 47,
//     paddingRight: 47,
//     position: "relative",
//     top: 10,
//   },
//   accTypeText: {
//     justifyContent: "center",
//     alignItems: "center",
//     //  top: 20,
//   },
//   inputStyle: {
//     color: "black",
//     borderWidth: 2,
//     borderColor: "#dddddd",
//     paddingHorizontal: 15,
//     paddingVertical: 9,
//     borderRadius: 1,
//     fontSize: 20,
//     fontFamily: "Poppins",
//     margin: 9,
//   },

//   buttons: {
//     top: 15,
//   },
//   submit: {
//     padding: 15,
//     backgroundColor: "#002D62",
//     borderRadius: 10,
//     borderWidth: 1,
//     top: 10,
//     borderColor: "#fff",
//   },
//   submitText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 18,
//     fontFamily: "PoppinsRegular",
//   },
// });




import { useEffect, useState } from "react";
import Test from "../components/UI/LgButton";
import { Ionicons } from "@expo/vector-icons";
import KeyboardAccessory from "react-native-sticky-keyboard-accessory";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  View,
  Button as Btn,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Keyboard,
  TouchableHighlight,
} from "react-native";
import Button from "../components/UI/Button";
import axios from "axios";
import { Colors } from "../components/constants/styles";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorageStatic } from "react-native";
import WelcomeScreen from "./WelcomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LgButton from "../components/UI/LgButton";
import { TouchableWithoutFeedback } from "react-native";
import { Platform } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { validateYupSchema } from "formik";
import { formikFieldApplyYupTransforms } from "formik-yup";
import { StyleSheet } from "react-native";
import AccountTypeBtn from "../components/UI/AccountTypeBtn";

export var Token, UserId, LoginResponse;
function Login() {
  // const [fontsLoaded] = useFonts({
  //   Roboto: require("../assets/fonts/Roboto-Black.ttf"),
  //   RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  // });
  const navigation = useNavigation();
  const [enteredUser, setEnteredUser] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [students, setStudents] = useState([]);
  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [authToken, setAuthToken] = useState();

  const [show, setShow] = useState(false);

  const [forPartentBackground, setForPartentBackground] = useState({
    color: "#d9dffc",
    borderTopColor: "#d9dffc",
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontFamily: "welcomeMsg",
  });

  const [forTeacherBackground, setForTeacherBackground] = useState({
    color: "#3d4590",
    borderTopColor: "#3d4590",
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontFamily: "welcomeMsg",
  });

  // function login() {
  //   //fun call get stdent  --  [{ctnum},{}]
  //   // filter ctnum -- enteredPhone  ----- fitertedstdData = [{},{}] || []
  //   // local storage  fitertedstdData  window.localstorage.setItem(stdentList, fitertedstdData)
  //   // if fitertedstdData.length == 0 ? errMsg : Dashboard redirection (  window.localstorage.getItem(stdentList) )
  // }

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  async function login() {
    try {
      //  const token = "c4e8c2613ea3f60e47de0bd593ec2d71357e934b";
      let headers = {
        "Content-Type": "application/json; charset=utf-8",
      };
      const user = { username: enteredUser, password: enteredPassword };
      const resLogin = await axios.post(
        "http://10.0.2.2:8000/school/api-token-auth/",
        user,

        {
          headers: headers,
        }
      );
      // LoginResponse = resLogin;
      const token = resLogin.data.token;
      const userId = resLogin.data.user_id;

      Token = token;
      UserId = userId;
      // setAuthToken(token);
      // AsyncStorage.setItem("token", token);
      // const tokenValue=AsyncStorage.getItem("token", token);
      // console.log(tokenValue)
      console.log(resLogin.data);
      console.log(resLogin.data.groups);

      // setStudents(resLogin.data);

      // let filteredlist = res.data.filter((ele) => ele.username == enteredPhone);
      // studentList = filteredlist;
      // console.log(filteredlist);
      // if (filteredlist.length == 0) {
      //   Alert.alert("Invalid Input", "Please enter valid credentials");
      //   setEnteredPhone("");
      // } else {

      if (resLogin.data.groups[0] === "parents") {
        // <WelcomeScreen />;

        navigation.navigate("Parent's Dashboard", {
          phone: enteredPhone,
        });
      } else {
        // console.log("TEACHERS PAGE");
        navigation.navigate("TeachersLogin");
      }

      setEnteredUser("");
      setEnteredPassword("");
      setEnteredPhone("");
      // }
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("token", Token);
    } catch (error) {
      // Error saving data
    }
    try {
      const value = await AsyncStorage.getItem("token");

      if (value !== null) {
        console.log("This is the token :" + value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  function toggleParents() {
    setShow(true);
    setForTeacherBackground({
      color: "#d9dffc",
      borderTopColor: "#d9dffc",
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });

    setForPartentBackground({
      color: "#3d4590",
      borderTopColor: "#3d4590",
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });

    //navigation.navigate("TeachersLogin");
  }
  function userInputHandler(enteredValue) {
    setEnteredUser(enteredValue);
  }
  function passwordInputHandler(enteredValue) {
    setEnteredPassword(enteredValue);
  }
  function phoneInputHandler(enteredValue) {
    setEnteredPhone(enteredValue);
  }

  function toggleTeachers() {
    setShow(false);
    setForPartentBackground({
      color: "#d9dffc",
      borderTopColor: "#d9dffc",
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });
    setForTeacherBackground({
      color: "#3d4590",
      borderTopColor: "#3d4590",
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });
  }

  return (
    <>
      <View style={{ backgroundColor: "white", height: "100%" }}>
        {keyboardStatus == "Keyboard Hidden" && (
          <Image
            style={styles.bannerImage}
            source={require("../assets/kinarabg2.png")}
          />
        )}
        <View>
          <View style={styles.accTypeText}>
            <Text
              style={{ color: "grey", fontSize: 16, fontFamily: "welcomeMsg" }}
            >
              Choose account type
            </Text>
          </View>
          <View style={styles.lateralContainer}>
            <View style={styles.buttonContainer}>
              <AccountTypeBtn
                onPress={toggleTeachers}
                style={forTeacherBackground}
              >
                Teachers
              </AccountTypeBtn>
              <View style={styles.space} />
              <AccountTypeBtn
                onPress={toggleParents}
                style={forPartentBackground}
              >
                Parents
              </AccountTypeBtn>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={userInputHandler}
                style={styles.inputStyle}
                value={enteredUser}
                placeholder="Username"
              />
              <TextInput
                secureTextEntry
                onChangeText={passwordInputHandler}
                style={styles.inputStyle}
                value={enteredPassword}
                placeholder="Password"
              />
              {show && (
                <>
                  <TextInput
                    onChangeText={phoneInputHandler}
                    style={styles.inputStyle}
                    value={enteredPhone}
                    keyboardType="number-pad"
                    placeholder="Registered Phone Number"
                  />
                </>
              )}
              <TouchableHighlight
                style={styles.submit}
                onPress={login}
                underlayColor="#4FA3C4"
              >
                <Text style={[styles.submitText]}>
                  Login
                  <Ionicons name="log-in" size={18} color="white" />
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // lateralContainer:{
  //   elevation:5
  // },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  loginTypeText: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    // paddingLeft: 47,
    // paddingRight: 57,
    marginLeft: 20,
    marginRight: 20,
    top: 45,
    //width:350,
    elevation: 11,
    shadowColor: "black",
    backgroundColor: "white",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  // space: {
  //   width: 20,
  //   height: 20,
  // },
  inputContainer: {
    // paddingLeft: 47,
    // paddingRight: 47,
    padding: 10,
    position: "relative",
    top: 45,
    // borderColor:'grey',
    // borderWidth:1,
    borderTopWidth: 0,
    padding: 40,
    width: 353,
    left: 20,

    elevation: 11,
    shadowColor: "black",
    backgroundColor: "white",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  accTypeText: {
    justifyContent: "center",
    alignItems: "center",
    top: 10,
  },
  inputStyle: {
    color: "black",
    borderWidth: 2,
    borderColor: "#dddddd",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    fontSize: 20,
    fontFamily: "welcomeMsg",
    margin: 7,
    width: 310,
    right: 22,
  },

  buttons: {
    top: 15,
  },
  submit: {
    padding: 15,
    backgroundColor: "#59b8dd",
    borderRadius: 10,
    borderWidth: 1,
    top: 10,
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "welcomeMsg",
  },
});

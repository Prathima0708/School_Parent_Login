// import { useEffect, useState } from "react";
// import Test from "../components/UI/LgButton";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import KeyboardAccessory from "react-native-sticky-keyboard-accessory";
// import {
//   Alert,
//   FlatList,
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

// import { useFonts } from "expo-font";
// import { validateYupSchema } from "formik";
// import { formikFieldApplyYupTransforms } from "formik-yup";
// import { StyleSheet } from "react-native";
// import AccountTypeBtn from "../components/UI/AccountTypeBtn";
// import { Dimensions } from "react-native";
// import {
//   Icon as NativeIcon,
//   Input as NativeInput,
//   Pressable,
//   Button as NativeButton,
// } from "native-base";

// export var Token,
//   UserId,
//   LoginResponse,
//   Teacher,
//   TeacherEmail,
//   TeacherGroup,
//   ParentGroup;
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

//   const [userNameFocused, setUserNameFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const [numberFocused, setNumberFocused] = useState(false);

//   const [userNameBlur, setUserNameBlur] = useState(false);
//   const [passwordBlur, setPasswordBlur] = useState(false);
//   const [numberBlur, setNumberBlur] = useState(false);

//   const [show, setShow] = useState(false);
//   const [show1, setShow1] = useState(false);
//   const [forPartentBackground, setForPartentBackground] = useState({
//     color: "#d9dffc",
//     borderTopColor: "#d9dffc",
//     borderBottomWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     fontFamily: "welcomeMsg",
//   });

//   const [forTeacherBackground, setForTeacherBackground] = useState({
//     color: "#3d4590",
//     borderTopColor: "#3d4590",
//     borderBottomWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     fontFamily: "welcomeMsg",
//   });
//   const [expandHight, setExpandHieght] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);

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
//       Teacher = user.username;
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
//       TeacherEmail = resLogin.data.email;
//       Token = token;
//       UserId = userId;
//       TeacherGroup = resLogin.data.groups[0] == "staff";
//       ParentGroup = resLogin.data.groups[0] == "parents";
//       console.log("teacher group is :", TeacherGroup);
//       console.log("parent group is :", ParentGroup);

//       try {
//         await AsyncStorage.setItem("datagroup", resLogin.data.groups[0]);
//         // await AsyncStorage.setItem("datagroupParent", resLogin.data.groups[1]);
//       } catch (error) {
//         // Error saving data
//       }

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

//         navigation.navigate("ParentsLoginScreen", {
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

//     // Saves to storage as a JSON-string
//     AsyncStorage.setItem("key", JSON.stringify(UserId));

//     // Retrieves from storage as boolean
//     AsyncStorage.getItem("key", (err, value) => {
//       if (err) {
//         console.log(err);
//       } else {
//         JSON.parse(value); // boolean false
//         console.log("this is the userid:" + value);
//       }
//     });

//     // AsyncStorage.setItem("Phone", enteredPhone);
//     // //  console.log(Group);

//     // let Phone = AsyncStorage.getItem("Phone");
//     // console.log(Phone);

//     AsyncStorage.setItem("Phone", JSON.stringify(enteredPhone));

//     // try {
//     //   const value = await AsyncStorage.getItem("Phone");

//     //   if (value !== null) {
//     //     console.log("This is the Phone of login page:" + value);
//     //   }
//     // } catch (error) {
//     //   // Error retrieving data
//     // }
//   }
//   function toggleParents() {
//     setShow(true);
//     setExpandHieght(true);
//     setForTeacherBackground({
//       color: "#d9dffc",
//       borderTopColor: "#d9dffc",
//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//     });

//     setForPartentBackground({
//       color: "#3d4590",
//       borderTopColor: "#3d4590",
//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//     });

//     if (enteredUser != null) {
//       setEnteredUser("");
//     }
//     if (enteredPassword != null) {
//       setEnteredPassword("");
//     }
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
//     setExpandHieght(false);
//     setForPartentBackground({
//       color: "#d9dffc",
//       borderTopColor: "#d9dffc",
//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//     });
//     setForTeacherBackground({
//       color: "#3d4590",
//       borderTopColor: "#3d4590",
//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//     });

//     if (enteredUser != null) {
//       setEnteredUser("");
//     }
//     if (enteredPassword != null) {
//       setEnteredPassword("");
//     }
//     if (enteredPhone != null) {
//       setEnteredPhone("");
//     }
//   }

//   function userNameFocusHandler() {
//     setUserNameFocused(true);
//     setUserNameBlur(false);
//   }
//   function userNameBlurHandler() {
//     setUserNameBlur(true);
//     setUserNameFocused(false);
//   }

//   function passwordFocusHandler() {
//     setPasswordFocused(true);
//     setPasswordBlur(false);
//   }
//   function passwordBlurHandler() {
//     setPasswordBlur(true);
//     setPasswordFocused(false);
//   }

//   function numberFocusHandler() {
//     setNumberFocused(true);
//     setNumberBlur(false);
//   }
//   function numberBlurHandler() {
//     setNumberBlur(true);
//     setNumberFocused(false);
//   }

//   const handleClick = () => setShowPassword(!showPassword);

//   return (
//     <>
//       <View style={{ flex: 1 }}>
//         <View style={styles.upperPartView}>
//           {keyboardStatus == "Keyboard Hidden" && (
//             <Image
//               style={styles.bannerImage}
//               source={
//                 deviceWidth < 370
//                   ? require("../assets/kinaraui4.png")
//                   : require("../assets/kinarabg2.png")
//               }
//             />
//           )}
//         </View>
//         <View
//           style={
//             keyboardStatus == "Keyboard Hidden"
//               ? expandHight
//                 ? styles.test
//                 : styles.lowerPartView
//               : expandHight
//               ? styles.AccountTypeBtn
//               : styles.AccountTypeBtnDown
//           }
//         >
//           <Text
//             style={[
//               styles.subheading,
//               keyboardStatus == "Keyboard Shown" && styles.setAccTypeStyle,
//             ]}
//           >
//             Choose account type
//           </Text>
//           <View style={styles.buttonContainer}>
//             <AccountTypeBtn
//               onPress={toggleTeachers}
//               style={[forTeacherBackground]}
//             >
//               Teachers
//             </AccountTypeBtn>
//             <View style={styles.space} />
//             <AccountTypeBtn
//               onPress={toggleParents}
//               style={forPartentBackground}
//             >
//               Parents
//             </AccountTypeBtn>
//           </View>
//           {/* <TextInput
//             onChangeText={userInputHandler}
//             style={userNameFocused ? styles.focusedBorderColor : styles.inputStyle}
//             value={enteredUser}
//             placeholder="Username"
//             onFocus={userNameFocusHandler}
//             onBlur={userNameBlurHandler}
//           /> */}
//           <NativeInput
//             type="text"
//             w="80%"
//             left="11%"
//             top="6"
//             borderWidth={2}
//             onChangeText={userInputHandler}
//             value={enteredUser}
//             style={styles.inputStyle}
//             // py="0"
//             placeholder="Username"
//           />
//           {/* <Ionicons
//                 name={showPassword ? "eye-outline" : "eye-off-outline"}
//                 size={28}
//                 color="black"
//                 style={{
//                   position: "absolute",
//                   top: deviceHieght < 600 ? "17%" : "20%",
//                 }}
//                 onPress={iconPressed}
//             />
//           <TextInput
//             secureTextEntry={true}
//             onChangeText={passwordInputHandler}
//             style={passwordFocused ? styles.focusedBorderColor : styles.inputStyle}
//             value={enteredPassword}
//             placeholder="Password"
//             onFocus={passwordFocusHandler}
//             onBlur={passwordBlurHandler}

//           /> */}
//           <NativeInput
//             type={showPassword ? "text" : "password"}
//             w="80%"
//             left="11%"
//             top="9"
//             borderWidth={1}
//             onChangeText={passwordInputHandler}
//             value={enteredPassword}
//             // py="0"
//             style={styles.inputStyle}
//             InputRightElement={
//               <NativeButton
//                 size="xs"
//                 rounded="none"
//                 w="1/5"
//                 h="full"
//                 onPress={handleClick}
//               >
//                 {showPassword ? (
//                   <Ionicons name="eye-outline" size={24} color="white" />
//                 ) : (
//                   <Ionicons name="eye-off-outline" size={24} color="white" />
//                 )}
//               </NativeButton>
//             }
//             placeholder="Password"
//           />
//           {/* <Input
//             variant="outline"
//             w={{
//               base: "75%",
//               md: "25%",
//             }}
//             marginTop={5}
//             ml={39}
//             fontSize={18}
//             type={show1 ? "text" : "password"}
//             InputRightElement={
//               <Pressable onPress={() => setShow1(!show1)}>
//                 <Icon
//                   as={
//                     <MaterialIcons
//                       name={show1 ? "visibility" : "visibility-off"}
//                     />
//                   }
//                   size={5}
//                   mr="2"
//                   color="muted.400"
//                 />
//               </Pressable>
//             }
//             placeholder="Password"
//           /> */}
//           {show && (
//             <>
//               {/* <TextInput
//                 onChangeText={phoneInputHandler}
//                 style={numberFocused ? styles.focusedBorderColor : styles.inputStyle}
//                 value={enteredPhone}
//                 keyboardType="number-pad"
//                 placeholder="Registered Phone Number"
//                 onFocus={numberFocusHandler}
//                 onBlur={numberBlurHandler}
//               /> */}
//               <NativeInput
//                 type="number"
//                 w="80%"
//                 keyboardType="number-pad"
//                 left="11%"
//                 borderWidth={1}
//                 top="12"
//                 onChangeText={phoneInputHandler}
//                 value={enteredPhone}
//                 style={styles.inputStyle}
//                 // py="0"
//                 placeholder="Registered phone number"
//               />
//             </>
//           )}
//           <TouchableHighlight
//             style={styles.submit}
//             onPress={login}
//             underlayColor="#4FA3C4"
//           >
//             <Text style={[styles.submitText]}>Login</Text>
//           </TouchableHighlight>
//         </View>
//       </View>
//     </>
//   );
// }

// export default Login;
// const deviceHieght = Dimensions.get("window").height;
// const deviceWidth = Dimensions.get("window").width;
// console.log("hieght" + deviceHieght);
// console.log("width" + deviceWidth);
// const styles = StyleSheet.create({
//   upperPartView: {
//     flex: 2,
//     backgroundColor: "white",
//   },
//   lowerPartView: {
//     flex: 2,
//     position: "absolute",
//     top: deviceHieght < 600 ? "40%" : "40%",
//     backgroundColor: "white",
//     width: deviceWidth < 370 ? "80%" : "90%",
//     left: deviceWidth < 370 ? "10%" : "5%",
//     borderRadius: 10,
//     elevation: 10,
//     height: "50%",
//   },
//   test: {
//     flex: 2,
//     position: "absolute",
//     top: deviceHieght < 600 ? "38%" : "40%",
//     backgroundColor: "white",
//     width: deviceWidth < 370 ? "80%" : "90%",
//     left: deviceWidth < 370 ? "10%" : "5%",
//     borderRadius: 10,
//     elevation: 10,
//     height: deviceHieght < 600 ? "60%" : "55%",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "red",
//   },
//   lateralContainer: {
//     height: "100%",
//   },
//   bannerImage: {
//     width: "100%",
//     height: 300,
//     position: "absolute",
//     top: deviceHieght < 600 ? -50 : -35,
//   },
//   loginTypeText: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     left: deviceWidth < 370 ? "15%" : "10%",
//     width: deviceWidth < 370 ? "80%" : "80%",
//     top: "5%",
//   },

//   inputContainer: {
//     position: "absolute",
//     top: "60%",

//     borderTopWidth: 0,

//     padding: "10%",
//     paddingTop: "5%",
//     width: deviceWidth < 370 ? "70%" : "100%",
//     left: "5%",

//     elevation: 11,
//     shadowColor: "black",
//     backgroundColor: "white",
//     shadowOpacity: 0.75,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//   },
//   accTypeText: {
//     justifyContent: "center",
//     alignItems: "center",
//     top: -40,
//   },
//   inputStyle: {
//     // color: "black",
//     // borderWidth: 2,
//     // borderColor: "#dddddd",
//     // paddingHorizontal: "5%",
//     // paddingVertical: deviceWidth < 370 ? "1%" : "2%",
//     // borderRadius: 7,
//     // fontSize: deviceWidth < 370 ? 16 : 20,
//     // fontFamily: "HindRegular",
//     // margin: "2%",
//     // top: "7%",
//     // left: deviceWidth < 370 ? "8%" : "8%",
//     // width: deviceWidth < 370 ? "80%" : "80%",
//     fontSize: deviceWidth < 370 ? 16 : 20,
//     fontFamily: "HindRegular",
//   },

//   submit: {
//     padding: "3%",
//     backgroundColor: "#59b8dd",
//     borderRadius: 10,
//     borderWidth: 1,
//     top: "15%",
//     borderColor: "#fff",
//     left: deviceWidth < 370 ? "10%" : "10%",
//     width: deviceWidth < 370 ? "80%" : "80%",
//   },
//   submitText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: deviceWidth < 370 ? 16 : 20,
//     fontFamily: "HindSemiBold",
//   },
//   AccountTypeBtn: {
//     flex: 2,
//     position: "absolute",
//     top: deviceHieght < 600 ? "5%" : "7%",
//     backgroundColor: "white",
//     width: deviceWidth < 370 ? "80%" : "90%",
//     left: deviceWidth < 370 ? "10%" : "5%",
//     borderRadius: 10,
//     elevation: 10,
//     height: deviceHieght < 600 ? "100%" : "90%",
//   },
//   AccountTypeBtnDown: {
//     flex: 2,
//     position: "absolute",
//     top: deviceHieght < 600 ? "5%" : "7%",
//     backgroundColor: "white",
//     width: deviceWidth < 370 ? "80%" : "90%",
//     left: deviceWidth < 370 ? "10%" : "5%",
//     borderRadius: 10,
//     elevation: 10,
//     height: deviceHieght < 600 ? "100%" : "80%",
//   },
//   setAccTypeStyle: {
//     top: 10,
//   },
//   showInputCont: {
//     top: 100,
//   },
//   showTypeBtnCont: {
//     top: 50,
//   },
//   subheading: {
//     color: "grey",
//     fontSize: deviceWidth < 370 ? 16 : 20,
//     fontFamily: "HindRegular",
//     justifyContent: "center",
//     left: "25%",
//     top: 5,
//   },
//   focusedBorderColor: {
//     borderColor: "#484EFF",
//     color: "black",
//     borderWidth: 2,
//     paddingHorizontal: "5%",
//     paddingVertical: deviceWidth < 370 ? "1%" : "2%",
//     borderRadius: 7,
//     fontSize: deviceWidth < 370 ? 16 : 20,
//     fontFamily: "HindRegular",
//     margin: "2%",
//     top: "7%",
//     left: deviceWidth < 370 ? "8%" : "8%",
//     width: deviceWidth < 370 ? "80%" : "80%",
//   },
//   showText: {
//     color: "white",
//     fontSize: 11.9,
//   },
// });

import { useEffect, useState, useRef } from "react";

import Test from "../components/UI/LgButton";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
import {
  HStack,
  VStack,
  Alert as NativeAlert,
  Text as NativeText,
  AlertDialog,
} from "native-base";
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

import { useFonts } from "expo-font";
import { validateYupSchema } from "formik";
import { formikFieldApplyYupTransforms } from "formik-yup";
import { StyleSheet } from "react-native";
import AccountTypeBtn from "../components/UI/AccountTypeBtn";
import { Dimensions } from "react-native";
import {
  Icon as NativeIcon,
  Input as NativeInput,
  Pressable,
  Button as NativeButton,
} from "native-base";
import { value } from "./ParentsLoginScreen/ParentsLoginScreen";
import { subURL } from "../components/utils/URL's";

export var Token,
  UserId,
  LoginResponse,
  Teacher,
  TeacherEmail,
  TeacherGroup,
  PHONENO,
  VALUE,
  ParentGroup,
  UserName;
export var studentList = [];
function Login() {
  // const [fontsLoaded] = useFonts({
  //   Roboto: require("../assets/fonts/Roboto-Black.ttf"),
  //   RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  // });
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);
  const navigation = useNavigation();
  const [enteredUser, setEnteredUser] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");

  const [invalidPassword, setInValidPassword] = useState(false);
  const [invalidUserName, setInValidUserName] = useState(false);
  const [invalidForm, setInValidForm] = useState(false);

  const [students, setStudents] = useState([]);
  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [authToken, setAuthToken] = useState();

  const [userNameFocused, setUserNameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [numberFocused, setNumberFocused] = useState(false);

  const [userNameBlur, setUserNameBlur] = useState(false);
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [numberBlur, setNumberBlur] = useState(false);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
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
  const [expandHight, setExpandHieght] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const onClose = () => setIsOpen(false);
  // function login() {
  //   //fun call get stdent  --  [{ctnum},{}]
  //   // filter ctnum -- enteredPhone  ----- fitertedstdData = [{},{}] || []
  //   // local storage  fitertedstdData  window.localstorage.setItem(stdentList, fitertedstdData)
  //   // if fitertedstdData.length == 0 ? errMsg : Dashboard redirection (  window.localstorage.getItem(stdentList) )
  // }

  const [saveImg, setSaveImg] = useState(``);

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

  useEffect(() => {
    async function fetchData() {
      try {
        // http://10.0.2.2:8000/school/Calendar/
        const res = await axios.get(`${subURL}/Institute/`);
        // console.log(res.data[0].instituteLogo)
        setSaveImg(res.data[0].instituteLogo);
      } catch (error) {
        console.log(error);
      }
      // setLoading(false);
    }
    fetchData();
  }, []);

  async function login() {
    if (enteredUser.length <= 0) {
      setInValidUserName(true);
      setInValidPassword(false);
      setInValidForm(false);
      setIsOpen(!isOpen);
    }
    if (enteredPassword.length <= 0) {
      setInValidPassword(true);
      setInValidUserName(false);
      setInValidForm(false);
      setIsOpen(!isOpen);
    }
    if (enteredUser.length <= 0 && enteredPassword.length <= 0) {
      setIsOpen(!isOpen);
      setInValidUserName(false);
      setInValidPassword(false);
      setInValidForm(true);
    } else {
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

        const res = await axios.get("http://10.0.2.2:8000/school/Student/");

        let filteredlist = res.data.filter(
          (ele) => ele.contact_num == enteredPhone
        );
        console.log("from login page");
        console.log(filteredlist);

        const token = resLogin.data.token;
        const userId = resLogin.data.user_id;
        TeacherEmail = resLogin.data.email;
        Token = token;
        UserId = userId;
        TeacherGroup = resLogin.data.groups[0] == "staff";
        ParentGroup = resLogin.data.groups[0] == "parents";
        console.log("teacher group is :", TeacherGroup);
        console.log("parent group is :", ParentGroup);
        Teacher = user.username;

        console.log("this is the username from console log", Teacher);

        try {
          await AsyncStorage.setItem("UserName", Teacher);
          // await AsyncStorage.setItem("datagroupParent", resLogin.data.groups[1]);
        } catch (error) {
          // Error saving data
        }

        try {
          await AsyncStorage.setItem("userID", UserId);
          // await AsyncStorage.setItem("datagroupParent", resLogin.data.groups[1]);
        } catch (error) {
          // Error saving data
        }

        try {
          await AsyncStorage.setItem("datagroup", resLogin.data.groups[0]);
          // await AsyncStorage.setItem("datagroupParent", resLogin.data.groups[1]);
        } catch (error) {
          // Error saving data
        }
        try {
          await AsyncStorage.setItem("Phone", enteredPhone);
        } catch (error) {}

        try {
          PHONENO = await AsyncStorage.getItem("Phone");

          console.log("this is the ph value from login", PHONENO);
        } catch (error) {}

        // if (PHONENO !== enteredPhone) {
        //   Alert.alert("Invalid no");
        // }
        // if (filteredlist.length == 0) {
        //   Alert.alert("Invalid Input", "Please enter a valid phone number");
        //   navigation.navigate("Login");
        // }
        // if (resLogin.data.groups[0] === "parents") {
        if (resLogin.data.groups.includes("parents")) {
          if (filteredlist.length == 0) {
            Alert.alert("Invalid Input", "Please enter a valid phone number");
            setEnteredUser("");
            setEnteredPassword("");
            setEnteredPhone("");
            return;
          }
          console.log("group name -", resLogin.data.groups[0]);
          console.log(PHONENO);
          // <WelcomeScreen />;

          navigation.navigate("ParentsLoginScreen", {
            phone: PHONENO,
          });
        } else if (resLogin.data.groups.includes("staff")) {
          console.log(resLogin.data.groups[0]);
          // console.log("TEACHERS PAGE");
          navigation.navigate("TeachersLogin", {
            //   username: UserName,
          });
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
        VALUE = value;
        // if (value == null) {
        //   await AsyncStorage.removeItem("Phone");
        //   console.log("this is the ph value after logout", PHONENO);
        // }
        if (value !== null) {
          console.log("This is the token :" + value);
        }
      } catch (error) {
        // Error retrieving data
      }

      // Saves to storage as a JSON-string
      AsyncStorage.setItem("key", JSON.stringify(UserId));

      // Retrieves from storage as boolean
      AsyncStorage.getItem("key", (err, value) => {
        if (err) {
          console.log(err);
        } else {
          JSON.parse(value); // boolean false
          //  console.log("this is the userid:" + value);
        }
      });

      // AsyncStorage.setItem("Phone", enteredPhone);
      // //  console.log(Group);

      // let Phone = AsyncStorage.getItem("Phone");
      // console.log(Phone);

      // try {
      //   const value = await AsyncStorage.getItem("Phone");

      //   if (value !== null) {
      //     console.log("This is the Phone of login page:" + value);
      //   }
      // } catch (error) {
      //   // Error retrieving data
      // }
    }
  }
  function toggleParents() {
    setShow(true);
    setExpandHieght(true);
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

    if (enteredUser != null) {
      setEnteredUser("");
    }
    if (enteredPassword != null) {
      setEnteredPassword("");
    }
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
    setExpandHieght(false);
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

    if (enteredUser != null) {
      setEnteredUser("");
    }
    if (enteredPassword != null) {
      setEnteredPassword("");
    }
    if (enteredPhone != null) {
      setEnteredPhone("");
    }
  }

  function userNameFocusHandler() {
    setUserNameFocused(true);
    setUserNameBlur(false);
  }
  function userNameBlurHandler() {
    setUserNameBlur(true);
    setUserNameFocused(false);
  }

  function passwordFocusHandler() {
    setPasswordFocused(true);
    setPasswordBlur(false);
  }
  function passwordBlurHandler() {
    setPasswordBlur(true);
    setPasswordFocused(false);
  }

  function numberFocusHandler() {
    setNumberFocused(true);
    setNumberBlur(false);
  }
  function numberBlurHandler() {
    setNumberBlur(true);
    setNumberFocused(false);
  }

  const handleClick = () => setShowPassword(!showPassword);

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.upperPartView}>
          {keyboardStatus == "Keyboard Hidden" && (
            <Image
              style={styles.bannerImage}
              source={
                // deviceWidth < 370
                //   ? require("../assets/kinaraui4.png")
                //   : require("../assets/kinarabg2.png")
                { uri: `http://10.0.2.2:8000${saveImg}` }
              }
            />
          )}
        </View>
        <View
          style={
            keyboardStatus == "Keyboard Hidden"
              ? expandHight
                ? styles.test
                : styles.lowerPartView
              : expandHight
              ? styles.AccountTypeBtn
              : styles.AccountTypeBtnDown
          }
        >
          <Text
            style={[
              styles.subheading,
              keyboardStatus == "Keyboard Shown" && styles.setAccTypeStyle,
            ]}
          >
            Choose account type
          </Text>
          <View style={styles.buttonContainer}>
            <AccountTypeBtn
              onPress={toggleTeachers}
              style={[forTeacherBackground]}
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
          {/* <TextInput
            onChangeText={userInputHandler}
            style={userNameFocused ? styles.focusedBorderColor : styles.inputStyle}
            value={enteredUser}
            placeholder="Username"
            onFocus={userNameFocusHandler}
            onBlur={userNameBlurHandler}
          /> */}
          <NativeInput
            type="text"
            w="80%"
            left="11%"
            top="6"
            height={deviceHieght < 800 ? "16%" : "13%"}
            borderWidth={2}
            onChangeText={userInputHandler}
            value={enteredUser}
            style={styles.inputStyle}
            // py="0"
            placeholder="Username"
          />
          {/* <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={28}
                color="black"
                style={{
                  position: "absolute",
                  top: deviceHieght < 600 ? "17%" : "20%",
                }}
                onPress={iconPressed}
            />
          <TextInput
            secureTextEntry={true}
            onChangeText={passwordInputHandler}
            style={passwordFocused ? styles.focusedBorderColor : styles.inputStyle}
            value={enteredPassword}
            placeholder="Password"
            onFocus={passwordFocusHandler}
            onBlur={passwordBlurHandler}
            
          /> */}
          <NativeInput
            type={showPassword ? "text" : "password"}
            w="80%"
            left="11%"
            top="9"
            height={deviceHieght < 800 ? "16%" : "13%"}
            borderWidth={1}
            onChangeText={passwordInputHandler}
            value={enteredPassword}
            // py="0"
            style={styles.inputStyle}
            InputRightElement={
              <NativeButton
                size="xs"
                rounded="none"
                w="1/5"
                h="full"
                onPress={handleClick}
              >
                {showPassword ? (
                  <Ionicons name="eye-outline" size={24} color="white" />
                ) : (
                  <Ionicons name="eye-off-outline" size={24} color="white" />
                )}
              </NativeButton>
            }
            placeholder="Password"
          />
          {/* <Input
            variant="outline"
            w={{
              base: "75%",
              md: "25%",
            }}
            marginTop={5}
            ml={39}
            fontSize={18}
            type={show1 ? "text" : "password"}
            InputRightElement={
              <Pressable onPress={() => setShow1(!show1)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show1 ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="Password"
          /> */}
          {show && (
            <>
              {/* <TextInput
                onChangeText={phoneInputHandler}
                style={numberFocused ? styles.focusedBorderColor : styles.inputStyle}
                value={enteredPhone}
                keyboardType="number-pad"
                placeholder="Registered Phone Number"
                onFocus={numberFocusHandler}
                onBlur={numberBlurHandler}
              /> */}
              <NativeInput
                type="number"
                w="80%"
                keyboardType="number-pad"
                left="11%"
                borderWidth={1}
                top="12"
                height={deviceHieght < 800 ? "14%" : "13%"}
                onChangeText={phoneInputHandler}
                value={enteredPhone}
                style={styles.inputStyle}
                // py="0"
                placeholder="Registered phone number"
              />
            </>
          )}
          <TouchableHighlight
            style={styles.submit}
            onPress={login}
            underlayColor="#4FA3C4"
          >
            <Text style={[styles.submitText]}>Login</Text>
          </TouchableHighlight>
          {/* {invalidPassword && <Text>You have to enter at least 6 digit</Text>} */}

          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            top="5%"
            onClose={onClose}
          >
            <AlertDialog.Content>
              {invalidUserName && (
                <>
                  {/* <AlertDialog.Header>Please enter all fields</AlertDialog.Header> */}
                  <AlertDialog.Body>
                    You have to enter all the fields
                  </AlertDialog.Body>
                </>
              )}
              {invalidPassword && (
                <>
                  {/* <AlertDialog.Header>Please enter all fields</AlertDialog.Header> */}
                  <AlertDialog.Body>
                    You have to enter all the fields
                  </AlertDialog.Body>
                </>
              )}
              {invalidForm && (
                <>
                  {/* <AlertDialog.Header>Please enter all fields</AlertDialog.Header> */}
                  <AlertDialog.Body>
                    You have to enter all the fields
                  </AlertDialog.Body>
                </>
              )}
              <AlertDialog.Footer>
                <NativeButton.Group space={2}>
                  <NativeButton
                    colorScheme="primary"
                    onPress={onClose}
                    size="xs"
                  >
                    Okay
                  </NativeButton>
                </NativeButton.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </View>
      </View>
    </>
  );
}

export default Login;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
console.log("hieght" + deviceHieght);
console.log("width" + deviceWidth);
const styles = StyleSheet.create({
  upperPartView: {
    flex: 2,
    backgroundColor: "white",
  },
  lowerPartView: {
    flex: 2,
    position: "absolute",
    top: deviceHieght < 600 ? "40%" : "40%",
    backgroundColor: "white",
    width: deviceWidth < 370 ? "80%" : "90%",
    left: deviceWidth < 370 ? "10%" : "5%",
    borderRadius: 10,
    elevation: 10,
    height: "50%",
  },
  test: {
    flex: 2,
    position: "absolute",
    top: deviceHieght < 600 ? "38%" : "40%",
    backgroundColor: "white",
    width: deviceWidth < 370 ? "80%" : "90%",
    left: deviceWidth < 370 ? "10%" : "5%",
    borderRadius: 10,
    elevation: 10,
    height: deviceHieght < 600 ? "60%" : "55%",
  },
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  lateralContainer: {
    height: "100%",
  },
  bannerImage: {
    width: "100%",
    height: 300,
    position: "absolute",
    top: deviceHieght < 600 ? -50 : -35,
  },
  loginTypeText: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    left: deviceWidth < 370 ? "15%" : "10%",
    width: deviceWidth < 370 ? "80%" : "80%",
    top: "5%",
  },

  inputContainer: {
    position: "absolute",
    top: "60%",

    borderTopWidth: 0,

    padding: "10%",
    paddingTop: "5%",
    width: deviceWidth < 370 ? "70%" : "100%",
    left: "5%",

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
    top: -40,
  },
  inputStyle: {
    // color: "black",
    // borderWidth: 2,
    // borderColor: "#dddddd",
    // paddingHorizontal: "5%",
    // paddingVertical: deviceWidth < 370 ? "1%" : "2%",
    // borderRadius: 7,
    // fontSize: deviceWidth < 370 ? 16 : 20,
    // fontFamily: "HindRegular",
    // margin: "2%",
    // top: "7%",
    // left: deviceWidth < 370 ? "8%" : "8%",
    // width: deviceWidth < 370 ? "80%" : "80%",
    fontSize: deviceWidth < 370 ? 16 : 20,
    fontFamily: "HindRegular",
  },

  submit: {
    padding: "3%",
    backgroundColor: "#59b8dd",
    borderRadius: 10,
    borderWidth: 1,
    top: deviceWidth < 370 ? "18%" : "15%",
    borderColor: "#fff",
    left: deviceWidth < 370 ? "10%" : "10%",
    width: deviceWidth < 370 ? "80%" : "80%",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: deviceWidth < 370 ? 16 : 20,
    fontFamily: "HindSemiBold",
  },
  AccountTypeBtn: {
    flex: 2,
    position: "absolute",
    top: deviceHieght < 600 ? "5%" : "7%",
    backgroundColor: "white",
    width: deviceWidth < 370 ? "80%" : "90%",
    left: deviceWidth < 370 ? "10%" : "5%",
    borderRadius: 10,
    elevation: 10,
    height: deviceHieght < 600 ? "100%" : "90%",
  },
  AccountTypeBtnDown: {
    flex: 2,
    position: "absolute",
    top: deviceHieght < 600 ? "5%" : "7%",
    backgroundColor: "white",
    width: deviceWidth < 370 ? "80%" : "90%",
    left: deviceWidth < 370 ? "10%" : "5%",
    borderRadius: 10,
    elevation: 10,
    height: deviceHieght < 600 ? "100%" : "80%",
  },
  setAccTypeStyle: {
    top: 10,
  },
  showInputCont: {
    top: 100,
  },
  showTypeBtnCont: {
    top: 50,
  },
  subheading: {
    color: "grey",
    fontSize: deviceWidth < 370 ? 16 : 20,
    fontFamily: "HindRegular",
    justifyContent: "center",
    left: "25%",
    top: 5,
  },
  focusedBorderColor: {
    borderColor: "#484EFF",
    color: "black",
    borderWidth: 2,
    paddingHorizontal: "5%",
    paddingVertical: deviceWidth < 370 ? "1%" : "2%",
    borderRadius: 7,
    fontSize: deviceWidth < 370 ? 16 : 20,
    fontFamily: "HindRegular",
    margin: "2%",
    top: "7%",
    left: deviceWidth < 370 ? "8%" : "8%",
    width: deviceWidth < 370 ? "80%" : "80%",
  },
  showText: {
    color: "white",
    fontSize: 11.9,
  },
});

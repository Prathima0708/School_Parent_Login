// // import { useEffect, useState } from "react";
// // import Test from "../components/UI/LgButton";
// // import { Ionicons } from "@expo/vector-icons";
// // import KeyboardAccessory from "react-native-sticky-keyboard-accessory";
// // import {
// //   Alert,
// //   FlatList,
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   View,
// //   Button as Btn,
// //   KeyboardAvoidingView,
// //   ScrollView,
// //   Image,
// //   Keyboard,
// //   TouchableHighlight,
// // } from "react-native";
// // import Button from "../components/UI/Button";
// // import axios from "axios";
// // import { Colors } from "../components/constants/styles";
// // import { useNavigation } from "@react-navigation/native";
// // import { AsyncStorageStatic } from "react-native";
// // import WelcomeScreen from "./WelcomeScreen";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import LgButton from "../components/UI/LgButton";
// // import { TouchableWithoutFeedback } from "react-native";
// // import { Platform } from "react-native";
// // import AppLoading from "expo-app-loading";
// // import { useFonts } from "expo-font";
// // import { validateYupSchema } from "formik";
// // import { formikFieldApplyYupTransforms } from "formik-yup";

// // export var Token, UserId, LoginResponse;
// // function Login() {
// //   // const [fontsLoaded] = useFonts({
// //   //   Roboto: require("../assets/fonts/Roboto-Black.ttf"),
// //   //   RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
// //   // });
// //   const navigation = useNavigation();
// //   const [enteredUser, setEnteredUser] = useState("");
// //   const [enteredPassword, setEnteredPassword] = useState("");
// //   const [enteredPhone, setEnteredPhone] = useState("");
// //   const [students, setStudents] = useState([]);
// //   const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
// //   const [authToken, setAuthToken] = useState();

// //   const [show, setShow] = useState(false);

// //   const [forPartentBackground, setForPartentBackground] = useState({
// //     color: "#d9dffc",
// //     borderColor: "#d9dffc",
// //     fontFamily: "welcomeMsg",
// //   });

// //   const [forTeacherBackground, setForTeacherBackground] = useState({
// //     color: "#3d4590",
// //     borderColor: "#3d4590",
// //     fontFamily: "welcomeMsg",
// //   });

// //   // function login() {
// //   //   //fun call get stdent  --  [{ctnum},{}]
// //   //   // filter ctnum -- enteredPhone  ----- fitertedstdData = [{},{}] || []
// //   //   // local storage  fitertedstdData  window.localstorage.setItem(stdentList, fitertedstdData)
// //   //   // if fitertedstdData.length == 0 ? errMsg : Dashboard redirection (  window.localstorage.getItem(stdentList) )
// //   // }

// //   useEffect(() => {
// //     const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
// //       setKeyboardStatus("Keyboard Shown");
// //     });
// //     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
// //       setKeyboardStatus("Keyboard Hidden");
// //     });

// //     return () => {
// //       showSubscription.remove();
// //       hideSubscription.remove();
// //     };
// //   }, []);

// //   async function login() {
// //     try {
// //       //  const token = "c4e8c2613ea3f60e47de0bd593ec2d71357e934b";
// //       let headers = {
// //         "Content-Type": "application/json; charset=utf-8",
// //       };
// //       const user = { username: enteredUser, password: enteredPassword };
// //       const resLogin = await axios.post(
// //         "http://10.0.2.2:8000/school/api-token-auth/",
// //         user,

// //         {
// //           headers: headers,
// //         }
// //       );
// //       // LoginResponse = resLogin;
// //       const token = resLogin.data.token;
// //       const userId = resLogin.data.user_id;

// //       Token = token;
// //       UserId = userId;
// //       // setAuthToken(token);
// //       // AsyncStorage.setItem("token", token);
// //       // const tokenValue=AsyncStorage.getItem("token", token);
// //       // console.log(tokenValue)
// //       console.log(resLogin.data);
// //       console.log(resLogin.data.groups);

// //       // setStudents(resLogin.data);

// //       // let filteredlist = res.data.filter((ele) => ele.username == enteredPhone);
// //       // studentList = filteredlist;
// //       // console.log(filteredlist);
// //       // if (filteredlist.length == 0) {
// //       //   Alert.alert("Invalid Input", "Please enter valid credentials");
// //       //   setEnteredPhone("");
// //       // } else {

// //       if (resLogin.data.groups[0] === "parents") {
// //         // <WelcomeScreen />;

// //         navigation.navigate("Parent's Dashboard", {
// //           phone: enteredPhone,
// //         });
// //       } else {
// //         // console.log("TEACHERS PAGE");
// //         navigation.navigate("TeachersLogin");
// //       }

// //       setEnteredUser("");
// //       setEnteredPassword("");
// //       setEnteredPhone("");
// //       // }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //     try {
// //       await AsyncStorage.setItem("token", Token);
// //     } catch (error) {
// //       // Error saving data
// //     }
// //     try {
// //       const value = await AsyncStorage.getItem("token");

// //       if (value !== null) {
// //         console.log("This is the token :" + value);
// //       }
// //     } catch (error) {
// //       // Error retrieving data
// //     }
// //   }
// //   function toggleParents() {
// //     setShow(true);
// //     setForTeacherBackground({ color: "#d9dffc", borderColor: "#d9dffc" });

// //     setForPartentBackground({ color: "#3d4590", borderColor: "#3d4590" });

// //     //navigation.navigate("TeachersLogin");
// //   }
// //   function userInputHandler(enteredValue) {
// //     setEnteredUser(enteredValue);
// //   }
// //   function passwordInputHandler(enteredValue) {
// //     setEnteredPassword(enteredValue);
// //   }
// //   function phoneInputHandler(enteredValue) {
// //     setEnteredPhone(enteredValue);
// //   }

// //   function toggleTeachers() {
// //     setShow(false);
// //     setForPartentBackground({ color: "#d9dffc", borderColor: "#d9dffc" });
// //     setForTeacherBackground({ color: "#3d4590", borderColor: "#3d4590" });
// //   }

// //   return (
// //     <>
// //       <View style={{ backgroundColor: "white", height: "100%" }}>
// //         {keyboardStatus == "Keyboard Hidden" && (
// //           <Image
// //             style={styles.bannerImage}
// //             source={require("../assets/kinarabg2.png")}
// //           />
// //         )}

// //         <View style={styles.accTypeText}>
// //           <Text
// //             style={{
// //               color: "#85929E",
// //               fontSize: 18,
// //               top: -25,
// //               fontFamily: "Poppins",
// //             }}
// //           >
// //             Choose account type
// //           </Text>
// //         </View>
// //         <View style={styles.buttonContainer}>
// //           <LgButton onPress={toggleTeachers} style={forTeacherBackground}>
// //             Teachers
// //           </LgButton>
// //           <View style={styles.space} />
// //           <LgButton onPress={toggleParents} style={forPartentBackground}>
// //             Parents
// //           </LgButton>
// //         </View>
// //         <View>
// //           <View style={styles.inputContainer}>
// //             <TextInput
// //               onChangeText={userInputHandler}
// //               style={styles.inputStyle}
// //               value={enteredUser}
// //               placeholder="Username"
// //             />
// //             <TextInput
// //               secureTextEntry
// //               onChangeText={passwordInputHandler}
// //               style={styles.inputStyle}
// //               value={enteredPassword}
// //               placeholder="Password"
// //             />
// //             {show && (
// //               <>
// //                 <TextInput
// //                   onChangeText={phoneInputHandler}
// //                   style={styles.inputStyle}
// //                   value={enteredPhone}
// //                   keyboardType="number-pad"
// //                   placeholder="Registered Phone Number"
// //                 />
// //               </>
// //             )}
// //             <TouchableHighlight
// //               style={styles.submit}
// //               onPress={login}
// //               underlayColor="#002D62"
// //             >
// //               <Text style={[styles.submitText]}>Login</Text>
// //             </TouchableHighlight>
// //           </View>
// //         </View>
// //       </View>
// //     </>
// //   );
// // }

// // export default Login;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },

// //   bannerImage: {
// //     width: "100%",
// //     height: 300,
// //   },
// //   loginTypeText: {
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   buttonContainer: {
// //     flexDirection: "row",
// //     paddingLeft: 47,
// //     paddingRight: 57,
// //     // top: 45,
// //   },
// //   space: {
// //     width: 20,
// //     height: 20,
// //   },
// //   inputContainer: {
// //     //width: "100%",

// //     paddingLeft: 47,
// //     paddingRight: 47,
// //     position: "relative",
// //     top: 10,
// //   },
// //   accTypeText: {
// //     justifyContent: "center",
// //     alignItems: "center",
// //     //  top: 20,
// //   },
// //   inputStyle: {
// //     color: "black",
// //     borderWidth: 2,
// //     borderColor: "#dddddd",
// //     paddingHorizontal: 15,
// //     paddingVertical: 9,
// //     borderRadius: 1,
// //     fontSize: 20,
// //     fontFamily: "Poppins",
// //     margin: 9,
// //   },

// //   buttons: {
// //     top: 15,
// //   },
// //   submit: {
// //     padding: 15,
// //     backgroundColor: "#002D62",
// //     borderRadius: 10,
// //     borderWidth: 1,
// //     top: 10,
// //     borderColor: "#fff",
// //   },
// //   submitText: {
// //     color: "#fff",
// //     textAlign: "center",
// //     fontSize: 18,
// //     fontFamily: "PoppinsRegular",
// //   },
// // });

// import { useEffect, useState } from "react";
// import Test from "../components/UI/LgButton";
// import { Ionicons } from "@expo/vector-icons";
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
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
//   const [hieght,setHieght]=useState(false);
//   const [show, setShow] = useState(false);

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
//     AsyncStorage.setItem('key', JSON.stringify(UserId))

//     // Retrieves from storage as boolean
//     AsyncStorage.getItem('key', (err, value) => {
//         if (err) {
//             console.log(err)
//         } else {
//             JSON.parse(value) // boolean false
//             console.log("this is the userid:"+value)
//         }
//     })

//   }
//   function toggleParents() {
//     setShow(true);
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
//   }
//   return (
//     <>
//            <ScrollView>

//         <View style={{ backgroundColor: "white", height: "300%"}}>
//         {keyboardStatus == "Keyboard Hidden" && (
//           <Image
//             style={styles.bannerImage}
//             source={require("../assets/kinarabg2.png")}
//           />
//         )}
//         {/* {keyboardStatus == "Keyboard Shown" && (
//           <Image
//             style={{ width: 70, height: 70, left: 160 }}
//             source={require("../assets/Asset2.png")}
//           />
//         )} */}

//           <View style={styles.accTypeText}>
//             <Text
//               style={[
//                 styles.subheading,
//                 keyboardStatus == "Keyboard Shown" && styles.test1,
//               ]}
//             >
//               Choose account type
//             </Text>
//           </View>
   

         
//           <View style={styles.lateralContainer}>
        
//             <View
//               style={[
//                 styles.buttonContainer,
//                 keyboardStatus == "Keyboard Shown" && styles.test2,
//               ]}
//             >


             
//               <AccountTypeBtn
//                 onPress={toggleTeachers}
//                 style={forTeacherBackground}
//               >
//                 Teachers
//               </AccountTypeBtn>
//               <View style={styles.space} />
//               <AccountTypeBtn
//                 onPress={toggleParents}
//                 style={forPartentBackground}
//               >
//                 Parents
//               </AccountTypeBtn>
//             </View>
//             <View
//               style={[
//                 styles.inputContainer,
//                 keyboardStatus == "Keyboard Shown" 
//               ]}
//             >
//               <TextInput
//                 onChangeText={userInputHandler}
//                 style={styles.inputStyle}
//                 value={enteredUser}
//                 placeholder="Username"
//               />
//               <TextInput
//                 secureTextEntry
//                 onChangeText={passwordInputHandler}
//                 style={styles.inputStyle}
//                 value={enteredPassword}
//                 placeholder="Password"
//               />
//               {show && (
//                 <>
//                   <TextInput
//                     onChangeText={phoneInputHandler}
//                     style={styles.inputStyle}
//                     value={enteredPhone}
//                     keyboardType="number-pad"
//                     placeholder="Registered Phone Number"
//                   />
//                 </>
//               )}
//               <TouchableHighlight
//                 style={styles.submit}
//                 onPress={login}
//                 underlayColor="#4FA3C4"
//               >
//                 <Text style={[styles.submitText]}>Login</Text>
//               </TouchableHighlight>
              
//             </View>
            
//           </View>
 
//       </View>

//       </ScrollView>
//     </>
//   );
// }

// export default Login;
// const deviceWidth = Dimensions.get("window").height;

// //console.log(deviceWidth);
// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   textWrapper: {
//     height: hp('100%'), // 70% of height device screen
//     width: wp('100%')   // 80% of width device screen
//   },
//   myText: {
//     fontSize: hp('5%') // End result looks like the provided UI mockup
//   },

//   bannerImage: {
//     width: "100%",
//     height: deviceWidth < 728 ? 265 : 300,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     position:'absolute',
//     marginLeft: deviceWidth < 718 ? 30 : 20,
//     marginRight: deviceWidth < 718 ? 30 : 20,
//     height: deviceWidth < 718 ? 40 : 50,
//     elevation: 11,
//     shadowColor: "black",
//     backgroundColor: "white",
//     shadowOpacity: 0.75,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//   },

//   inputContainer: {
//     position: "absolute",
//     top: deviceWidth < 718 ? 40 : 50,
//     borderTopWidth: 0,
//     padding: deviceWidth < 718 ? 70 :40,
//     paddingTop: 11,
    
//     width: deviceWidth > 730 ? 370 : 300,
//     maxHeight:deviceWidth > 730 ? 350 : 240,
//     left: deviceWidth < 718 ? 30 : 21,
//     elevation: 11,
//     shadowColor: "black",
//     backgroundColor: "white",
//     shadowOpacity: 0.75,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//   //   position: "relative",
//   //   top: -25,
//   // // height:deviceWidth < 720 ? 130 : 290,
//   //   borderTopWidth: 0,

//   //   padding: 40,
//   //   paddingTop: 11,
//   //   width: 320,
//   //   left: 20,

//   //   elevation: 11,
//   //   shadowColor: "black",
//   //   backgroundColor: "white",
//   //   shadowOpacity: 0.75,
//   //   shadowOffset: { width: 0, height: 2 },
//   //   shadowRadius: 8,

//   },
//   accTypeText: {
//     justifyContent: "center",
//     alignItems: "center",
//     top: deviceWidth < 718 ? 175 : 240,
//     left:100,
//     position:'absolute'
//   },
//   inputStyle: {
//     color: "black",
//     borderWidth: 2,
//     borderColor: "#dddddd",
//     paddingHorizontal: deviceWidth < 718 ? 5 : 15,
//     paddingVertical: deviceWidth < 718 ? 5 : 7,
//     borderRadius: 7,
//     fontSize: deviceWidth < 718 ? 16 : 22,
//     fontFamily: "HindRegular",
//     margin: 7,
//     width: deviceWidth < 718 ? 220 : 310,
//     right:deviceWidth < 718 ? 35 : 30
//     // right: deviceWidth < 718 ? 40 : 22,
//   },

//   submit: {
//     padding: deviceWidth < 718 ? 5 : 10,
//     backgroundColor: "#59b8dd",
//     borderRadius: 10,
//     borderWidth: 1,
//     top: deviceWidth < 718 ? 2 : 9,
//     borderColor: "#fff",
//   },
//   submitText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: deviceWidth < 718 ? 16 : 24,
//     fontFamily: "HindSemiBold",
//   },
//   test: {
//     top: 90,
//   },
//   test1: {
//     top: 10,
//   },
//   test2:{
//     top: deviceWidth < 718 ? 50 : 40
//   },
//   showAccType: {
//     top: 0,color:'grey'
//   },
//   showBtnType:{
//     top:40
//   },
//   subheading: {
//     color: "grey",
//     fontSize: 20,
//     top:deviceWidth < 718 ? 50 : 10,
//     fontFamily: "HindRegular",
//   },
// });

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

import { useFonts } from "expo-font";
import { validateYupSchema } from "formik";
import { formikFieldApplyYupTransforms } from "formik-yup";
import { StyleSheet } from "react-native";
import AccountTypeBtn from "../components/UI/AccountTypeBtn";
import { Dimensions } from "react-native";

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

        navigation.navigate("ParentsLoginScreen", {
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

    // Saves to storage as a JSON-string
    AsyncStorage.setItem('key', JSON.stringify(UserId))

    // Retrieves from storage as boolean
    AsyncStorage.getItem('key', (err, value) => {
        if (err) {
            console.log(err)
        } else {
            JSON.parse(value) // boolean false
            console.log("this is the userid:"+value)
        }
    })

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
    <ScrollView>
    <View style={styles.container}>
        {keyboardStatus == "Keyboard Hidden" && (
          <Image
            style={styles.bannerImage}
            source={require("../assets/kinarabg2.png")}
          />
        )}
        {/* {keyboardStatus == "Keyboard Shown" && (
          <Image
            style={{ width: 70, height: 70, left: 160 }}
            source={require("../assets/Asset2.png")}
          />
        )} */}
        <View>
          <View style={styles.accTypeText}>
            <Text
              style={[
                styles.subheading,
                keyboardStatus == "Keyboard Shown" && styles.test1,
              ]}
            >
              Choose account type
            </Text>
          </View>
          <View style={styles.lateralContainer}>
            <View
              style={[
                styles.buttonContainer,
                keyboardStatus == "Keyboard Shown" && styles.showTypeBtnCont
              ]}
            >
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
            <View
              style={[
                styles.inputContainer,
                keyboardStatus == "Keyboard Shown" && styles.showInputCont
              ]}
            >
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
                <Text style={[styles.submitText]}>Login</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    </>
  );
}

export default Login;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
console.log(deviceWidth);
const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    paddingBottom:deviceWidth < 370 ? 300 : 300
    // height:"400%"
    // minHeight:'500%'
  },
  // lateralContainer:{
  //   elevation:5
  // },
  bannerImage: {
    width: "100%",
    height: 300,
  },
  loginTypeText: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",

    marginLeft: 20,
    marginRight: deviceWidth > 400 ? 40 : 20,
    top: -25,
    height: deviceHieght < 718 ? 100 : 50,
    elevation: 11,
    shadowColor: "black",
    backgroundColor: "white",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },

  inputContainer: {
    position: "absolute",
    top: 25,

    borderTopWidth: 0,

    padding: 40,
    paddingTop: 11,
    width: deviceWidth < 370 ? 320 : 352,
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
    top: -40,
  },
  inputStyle: {
    color: "black",
    borderWidth: 2,
    borderColor: "#dddddd",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 7,

    fontSize: 22,
    fontFamily: "HindRegular",
    margin: 7,

    width: deviceWidth < 370 ? 270 : 310,
    right: 22,
  },

  submit: {
    padding: 10,
    backgroundColor: "#59b8dd",
    borderRadius: 10,
    borderWidth: 1,
    top: 9,
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "HindSemiBold",
  },
  // test: {
  //   top: 50,
  // },
  test1: {
    top: 60,
  },
  showInputCont:{
    top:100
  },
  showTypeBtnCont:{
    top:50
  },
  subheading: {
    color: "grey",
    fontSize: 20,
    fontFamily: "HindRegular",
  },
});
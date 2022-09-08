import { useEffect, useState } from "react";
import Test from "../components/UI/LgButton";
import { Ionicons } from "@expo/vector-icons";
import KeyboardAccessory from "react-native-sticky-keyboard-accessory";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button as Btn,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Keyboard,
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
export var Token, UserId, LoginResponse;
function Login() {
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
    borderColor: "#d9dffc",
  });

  const [forTeacherBackground, setForTeacherBackground] = useState({
    color: "#3d4590",
    borderColor: "#3d4590",
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
    setForTeacherBackground({ color: "#d9dffc", borderColor: "#d9dffc" });

    setForPartentBackground({ color: "#3d4590", borderColor: "#3d4590" });

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
    setForPartentBackground({ color: "#d9dffc", borderColor: "#d9dffc" });
    setForTeacherBackground({ color: "#3d4590", borderColor: "#3d4590" });
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.mainContainer}>
              {keyboardStatus === "Keyboard Hidden" && (
                <Image
                  style={styles.bannerImage}
                  source={require("../assets/bgelement.png")}
                />
              )}
              {keyboardStatus === "Keyboard Hidden" && (
                <Image
                  style={styles.logo}
                  source={require("../assets/Asset2.png")}
                />
              )}
              {keyboardStatus === "Keyboard Hidden" && (
                <Text style={{ left: 30, color: "grey", fontSize: 18, top: 5 }}>
                  Welcome to
                </Text>
              )}
              {keyboardStatus === "Keyboard Hidden" && (
                <Text
                  style={{
                    left: 30,
                    color: "red",
                    fontSize: 23,
                    fontWeight: "800",
                    top: 5,
                  }}
                >
                  KINARA SCHOOL
                </Text>
              )}
              {keyboardStatus === "Keyboard Hidden" && (
                <View style={styles.loginTypeText}>
                  <Text
                    style={{ color: "grey", fontWeight: "bold", fontSize: 18 }}
                  >
                    Choose Account Type
                  </Text>
                </View>
              )}
              {keyboardStatus === "Keyboard Hidden" && (
                <View>
                  <View style={styles.buttonContainer}>
                    <LgButton
                      onPress={toggleTeachers}
                      style={forTeacherBackground}
                    >
                      Teachers
                    </LgButton>
                    <View style={styles.space} />
                    <LgButton
                      onPress={toggleParents}
                      style={forPartentBackground}
                    >
                      Parents
                    </LgButton>
                  </View>
                </View>
              )}
              <View style={styles.inputContainer}>
                {keyboardStatus === "Keyboard Shown" && (
                  <Image
                    style={{
                      width: "20%",
                      height: "10%",
                      padding: 35,
                      left: 100,
                    }}
                    source={require("../assets/Asset2.png")}
                  />
                )}
                {keyboardStatus === "Keyboard Shown" && (
                  <Text
                    style={{
                      left: 60,
                      color: "red",
                      fontSize: 20,
                      fontWeight: "800",
                      bottom: 5,
                    }}
                  >
                    KINARA SCHOOL
                  </Text>
                )}
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
                <View style={styles.buttons}>
                  <Button onPress={login}>Login</Button>
                </View>
              </View>
              {/* </KeyboardAccessory> */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
  // header: {
  //   fontSize: 36,
  //   marginBottom: 48
  // },
  // textInput: {
  //   height: 40,
  //   borderColor: "#000000",
  //   borderBottomWidth: 1,
  //   marginBottom: 36
  // },
  // btnContainer: {
  //   backgroundColor: "white",
  //   marginTop: 12
  // },
  container: {
    flex: 1,
  },
  inner: {
    // padding: 24,
    // flex: 1,
    justifyContent: "space-around",
  },

  mainContainer: {
    height: 630,
  },
  bannerImage: {
    width: "100%",
    height: "38%",
  },
  loginTypeText: {
    justifyContent: "center",
    alignItems: "center",
    top: 20,
  },
  logo: {
    width: "30%",
    height: "20%",
    marginLeft: 25,
    position: "absolute",
    top: 120,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingLeft: 47,
    paddingRight: 57,
    top: 45,
    // display:'flex',
    // justifyContent:'space-between',
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  inputContainer: {
    paddingLeft: 47,
    paddingRight: 47,
    position: "relative",
    top: 70,
  },

  inputStyle: {
    color: "black",
    borderWidth: 2,
    borderColor: "#dddddd",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    fontSize: 18,
    margin: 5,
  },

  buttons: {
    top: 15,
  },
});

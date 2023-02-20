import { useEffect, useState, useRef } from "react";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import {
  Alert,
  Text,
  View,
  Button as Btn,
  Image,
  Keyboard,
  TouchableHighlight,
  Switch,
} from "react-native";
import {
  Alert as NativeAlert,
  Text as NativeText,
  AlertDialog,
} from "native-base";

import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

import { StyleSheet } from "react-native";
import AccountTypeBtn from "../components/UI/AccountTypeBtn";
import { Dimensions } from "react-native";
import {
  Icon as NativeIcon,
  Input as NativeInput,
  Pressable,
  Button as NativeButton,
} from "native-base";

import { mainURL, subURL } from "../components/utils/URL's";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export var Token,
  UserId,
  LoginResponse,
  Teacher,
  TeacherEmail,
  TeacherGroup,
  PHONENO,
  VALUE,
  ParentGroup,
  UserName,
  StaffPhoto;
export var studentList = [];
var NotificationUserId;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    console.log("device is", Device.isDevice);
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    console.log("existing status", existingStatus);
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    console.log("status is", finalStatus);
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("custom", {
      name: "Kinara School",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  

  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);
  const navigation = useNavigation();
  const [enteredUser, setEnteredUser] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");

  const [invalidPassword, setInValidPassword] = useState(false);
  const [invalidUserName, setInValidUserName] = useState(false);
  const [invalidForm, setInValidForm] = useState(false);

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  const [userNameFocused, setUserNameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [numberFocused, setNumberFocused] = useState(false);

  const [userNameBlur, setUserNameBlur] = useState(false);
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [numberBlur, setNumberBlur] = useState(false);

  const [show, setShow] = useState(false);
  const [loginType, setLoginType] = useState("teacher");
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

  const [saveImg, setSaveImg] = useState(``);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [expoPushToken]);

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
        const res = await axios.get(`${subURL}/Institute/`);

        setSaveImg(res.data[0].instituteLogo);
      } catch (error) {
        console.log(error);
      }
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
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const user = { username: enteredUser, password: enteredPassword };

        const resLogin = await axios.post(
          `${subURL}/api-token-auth/`,
          user,

          {
            headers: headers,
          }
        );
        console.log("token is", expoPushToken);
        NotificationUserId = resLogin.data.user_id;
        const formData = {
          user_id: resLogin.data.user_id,

          notification_token: expoPushToken,
        };
        const getNotificationRes = await axios.get(`${subURL}/Notification/`);
        let filteredNotification = getNotificationRes.data.filter(
          (ele) => ele.user_id.id == NotificationUserId
        );
        if (filteredNotification.length > 0) {
          console.log("token existing");
        } else {
          const notificationRes = await axios.post(
            `${subURL}/Notification/`,
            formData
          );
          console.log(notificationRes.data);
        }

        const res = await axios.get(`${subURL}/Student/`);
        const staffres = await axios.get(`${subURL}/Staff`);

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
        } catch (error) {}

        try {
          await AsyncStorage.setItem("datagroup", resLogin.data.groups[0]);
        } catch (error) {}
        try {
          await AsyncStorage.setItem("Phone", enteredPhone);
        } catch (error) {}

        try {
          PHONENO = await AsyncStorage.getItem("Phone");

          console.log("this is the ph value from login", PHONENO);
        } catch (error) {}

        if (resLogin.data.groups.includes("parents")) {
          if (filteredlist.length == 0) {
            Alert.alert("Invalid Input", "Please enter a valid phone number");
            setEnteredUser("");
            setEnteredPassword("");
            setEnteredPhone("");
            return;
          }

          navigation.navigate("ParentsLoginScreen", {
            phone: PHONENO,
          });
        } else if (resLogin.data.groups.includes("staff")) {
          navigation.navigate("TeachersLogin", {});
        }

        setEnteredUser("");
        setEnteredPassword("");
        setEnteredPhone("");
      } catch (error) {
        console.log(error);
      }

      try {
        await AsyncStorage.setItem("token", Token);
      } catch (error) {}

      try {
        const value = await AsyncStorage.getItem("token");
        VALUE = value;

        if (value !== null) {
          console.log("This is the token :" + value);
        }
      } catch (error) {}

      AsyncStorage.setItem("key", JSON.stringify(UserId));

      AsyncStorage.getItem("key", (err, value) => {
        if (err) {
          console.log(err);
        } else {
          JSON.parse(value);
        }
      });
    }
  }

  useEffect(() => {
    const getLoginCredentials = async () => {
      const storedEmail = await SecureStore.getItemAsync("email");
      const storedPassword = await SecureStore.getItemAsync("password");
      const storedLoginType = await SecureStore.getItemAsync("loginType");
      const storedPhone =
        storedLoginType === "parent"
          ? await SecureStore.getItemAsync("phone")
          : "";

      if (storedEmail && storedPassword) {
        loginType === "teacher"
          ? setEnteredUser(storedEmail)
          : setEnteredUser("");

        loginType === "teacher"
          ? setEnteredPassword(storedPassword)
          : setEnteredPassword("");

        setRememberMe(true);
      }

      if (storedEmail && storedPassword && storedPhone) {
        loginType === "parent"
          ? setEnteredUser(storedEmail)
          : setEnteredUser("");

        loginType === "parent"
          ? setEnteredPassword(storedPassword)
          : setEnteredPassword("");
        setEnteredPhone(storedPhone);
        setRememberMe(true);
      }
    };

    getLoginCredentials();
  }, [loginType, show]);
  const handleRememberMe = async (
    email,
    password,
    phone,
    rememberMe,
    loginType
  ) => {
    if (rememberMe) {
      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("password", password);
      await SecureStore.setItemAsync("loginType", loginType);
      if (loginType === "parent") {
        await SecureStore.setItemAsync("phone", phone);
      }
    } else {
      await SecureStore.deleteItemAsync("email");
      await SecureStore.deleteItemAsync("password");
      await SecureStore.deleteItemAsync("loginType");
      if (loginType === "parent") {
        await SecureStore.deleteItemAsync("phone");
      }
    }
  };
  function toggleParents() {
    setShow(true);
    setLoginType("parent");
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
    setLoginType("teacher");
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

  const handleClick = () => setShowPassword(!showPassword);

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          {keyboardStatus == "Keyboard Hidden" && (
            <Image
              style={styles.bannerImage}
              source={{ uri: `${mainURL}${saveImg}` }}
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
          <View
            style={[
              styles.buttonContainer,
              keyboardStatus == "Keyboard Shown" && {
                ...Platform.select({
                  ios: {
                    left: "7%",
                  },
                }),
              },
            ]}
          >
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
          <View
            style={[
              {
                flex: 1,
                flexDirection: "column",
              },
            ]}
          >
            <View
              style={[
                { flex: 1, justifyContent: "center", alignItems: "center" },
                keyboardStatus == "Keyboard Shown" && {
                  ...Platform.select({
                    ios: {
                      flex: 0.3,
                    },
                  }),
                },
              ]}
            >
              <NativeInput
                type="text"
                w="80%"
                borderWidth={2}
                onChangeText={userInputHandler}
                value={enteredUser}
                style={styles.inputStyle}
                placeholder="Username"
              />
            </View>
            <View
              style={[
                {
                  flex: 0.6,
                  justifyContent: "flex-start",
                  alignItems: "center",
                },
                keyboardStatus == "Keyboard Shown" && {
                  ...Platform.select({
                    ios: {
                      flex: 0.2,
                    },
                  }),
                },
              ]}
            >
              <NativeInput
                type={showPassword ? "text" : "password"}
                w="80%"
                borderWidth={1}
                onChangeText={passwordInputHandler}
                value={enteredPassword}
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
                      <Ionicons
                        name="eye-off-outline"
                        size={24}
                        color="white"
                      />
                    )}
                  </NativeButton>
                }
                placeholder="Password"
              />
            </View>
            {show && loginType === "parent" && (
              <View
                style={[
                  {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  keyboardStatus == "Keyboard Shown" && {
                    ...Platform.select({
                      ios: {
                        flex: 0.2,
                      },
                    }),
                  },
                ]}
              >
                <NativeInput
                  type="number"
                  w="80%"
                  keyboardType="number-pad"
                  borderWidth={1}
                  onChangeText={phoneInputHandler}
                  value={enteredPhone}
                  style={styles.inputStyle}
                  placeholder="Registered phone number"
                />
              </View>
            )}

            {show && (
              <View style={{ flex: 0.4 }}>
                <View
                  style={[
                    {
                      flex: 1,
                      flexDirection: "row",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.radioStyle,
                      keyboardStatus == "Keyboard Shown" && {
                        justifyContent: "space-around",
                      },
                    ]}
                  >
                    <Switch
                      value={rememberMe}
                      onValueChange={(value) => {
                        setRememberMe(value);
                        handleRememberMe(
                          enteredUser,
                          enteredPassword,
                          enteredPhone,
                          value,
                          loginType
                        );
                      }}
                    />
                  </View>
                  <View
                    style={[
                      styles.checkText,
                      keyboardStatus == "Keyboard Shown" && {
                        ...Platform.select({
                          ios: {
                            justifyContent: "center",
                            marginBottom: "8%",
                          },
                        }),
                      },
                    ]}
                  >
                    <Text style={[styles.rememberMeText]}>Remember P</Text>
                  </View>
                  <View style={{ flex: 0.3 }}></View>
                </View>
              </View>
            )}

            {!show && (
              <View style={{ flex: 0.4 }}>
                <View
                  style={[
                    {
                      flex: 1,
                      flexDirection: "row",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.radioStyle,
                      keyboardStatus == "Keyboard Shown" && {
                        justifyContent: "space-around",
                      },
                    ]}
                  >
                    <Switch
                      value={rememberMe}
                      onValueChange={(value) => {
                        setRememberMe(value);
                        handleRememberMe(
                          enteredUser,
                          enteredPassword,

                          value,
                          loginType
                        );
                      }}
                    />
                  </View>
                  <View
                    style={[
                      styles.checkText,
                      keyboardStatus == "Keyboard Shown" && {
                        ...Platform.select({
                          ios: {
                            justifyContent: "center",
                            marginBottom: "8%",
                          },
                        }),
                      },
                    ]}
                  >
                    <Text style={[styles.rememberMeText]}>Remember T</Text>
                  </View>
                  <View style={{ flex: 0.3 }}></View>
                </View>
              </View>
            )}

            <View
              style={[
                { flex: 1, justifyContent: "flex-start", alignItems: "center" },
                keyboardStatus == "Keyboard Shown" && {
                  ...Platform.select({
                    ios: {
                      paddingBottom: "10%",
                    },
                  }),
                },
              ]}
            >
              <TouchableHighlight
                style={styles.submit}
                onPress={login}
                underlayColor="#4FA3C4"
              >
                <Text style={[styles.submitText]}>Login</Text>
              </TouchableHighlight>
            </View>
          </View>

          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            top="5%"
            onClose={onClose}
          >
            <AlertDialog.Content>
              {invalidUserName && (
                <>
                  <AlertDialog.Body>
                    You have to enter all the fields
                  </AlertDialog.Body>
                </>
              )}
              {invalidPassword && (
                <>
                  <AlertDialog.Body>
                    You have to enter all the fields
                  </AlertDialog.Body>
                </>
              )}
              {invalidForm && (
                <>
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
  imageContainer: {
    flex: 2,
    backgroundColor: "white",
  },
  lowerPartView: {
    flex: 2,
    position: "absolute",
    top: deviceHieght < 600 ? "40%" : "35%",
    backgroundColor: "white",
    width: deviceWidth < 370 ? "80%" : "90%",
    left: deviceWidth < 370 ? "10%" : "5%",
    borderRadius: 10,
    elevation: 10,
    height: "50%",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  rememberMeText: {
    fontFamily: "HindRegular",
  },

  radioStyle: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginLeft: "10%",
    ...Platform.select({
      ios: {
        bottom: "3%",
      },
    }),
  },
  rememberMeContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // marginBottom: 20,
    // flex:1,
    flexDirection: "row",
  },
  switch: {
    // marginRight: 10,
    // marginTop:'7%'
  },
  checkText: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    ...Platform.select({
      android: {
        top: "1%",
      },
      ios: {
        top: "1%",
      },
    }),
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
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
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
    left: deviceWidth < 370 ? "10%" : "10%",
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
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
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
    backgroundColor: "#1E84A4",
    borderRadius: 10,
    borderWidth: 1,
    // top: deviceWidth < 370 ? "18%" : "15%",
    borderColor: "#fff",
    //left: deviceWidth < 370 ? "10%" : "10%",
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
    height: deviceHieght < 600 ? "100%" : "100%",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
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
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
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
    left: deviceHieght < 850 ? deviceWidth * 0.2 : deviceWidth * 0.27,
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

import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StudentItem from "../../components/StudentItem/StudentItem";
import axios from "axios";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "../../components/UI/IconButton";
import ImageSlider from "./ImageSlider";
import { subURL } from "../../components/utils/URL's";
export var studentList = [];
export var value, phno, removeGrp;
export var PHONE;
export var phonenumber, USERNAME;

var Group;
function ParentsLoginScreen() {
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState("");
  const [showLogoutAlert, setShowLogoutAlert] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const [group, setGroup] = useState("");

  async function fetchUser() {
    USERNAME = await AsyncStorage.getItem("UserName");

    if (USERNAME !== null) {
      setUser(USERNAME);
    }
  }
  fetchUser();

  useEffect(() => {
    async function getGroup() {
      Group = await AsyncStorage.getItem("datagroup");
      setGroup(Group);
    }
    getGroup();
  }, []);

  useEffect(() => {
    const beforeRemoveHandler = async (e) => {
      const action = e.data.action;

      e.preventDefault();

      if (showLogoutAlert) {
        setShowLogoutAlert(false);
        Alert.alert("Logout", "Are you sure you want to logout?", [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              setShowLogoutAlert(true);
            },
          },
          {
            text: "Yes",
            onPress: async () => {
              try {
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("datagroup");
                navigation.dispatch(action);
              } catch (error) {
                console.log(error);
              }
            },
            style: "destructive",
          },
        ]);
      } else {
        (async () => {
          try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("datagroup");
            navigation.dispatch(action);
          } catch (error) {
            console.log(error);
          }
        })();
      }
    };

    const removeListener = navigation.addListener(
      "beforeRemove",
      beforeRemoveHandler
    );

    return () => {
      removeListener();
    };
  }, [navigation, showLogoutAlert]);

  const logoutHandler = () => {
    if (showLogoutAlert) {
      setShowLogoutAlert(false);
      Alert.alert("Logout", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            setShowLogoutAlert(true);
          },
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("datagroup");
              navigation.navigate("LadingScreen", { headerShown: false });
            } catch (error) {
              console.log(error);
            }
          },
          style: "destructive",
        },
      ]);
    } else {
      (async () => {
        try {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("datagroup");
          navigation.navigate("Login", { headerShown: false });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  useEffect(() => {
   
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const currgroup=Group
        if (currgroup == "parents") {
          navigation.navigate("NoticeBoard");
        } 
      }
    );
    return () => {

      subscription2.remove();
    };
  }, [ ]);
  async function fetchPhone() {
    value = await AsyncStorage.getItem("Phone");
    if (value == null) {
      await AsyncStorage.removeItem("Phone");
    }
  }
  fetchPhone();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={logoutHandler}
            icon="power"
            size={25}
          />
        );
      },
    });
  }, []);


  useEffect(() => {
    async function login() {
      try {
        const res = await axios.get(`${subURL}/Student/`);

        let filteredlist = res.data.filter((ele) => ele.contact_num == value);
        setStudents(filteredlist);

        studentList = filteredlist;

        if (filteredlist.length == 0) {
          Alert.alert("Invalid Input", "Please enter a valid phone number");
          navigation.navigate("Login");
        } else {
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
          <Text style={styles.mainHeading}>Student details</Text>
          <ScrollView persistentScrollbar={false}>
            <FlatList data={students} renderItem={renderStudentDetails} />
          </ScrollView>
        </View>
        <View style={{ flex: 2, top: -10 }}>
          <ImageSlider />
        </View>
      </View>
    </>
  );
}

export default ParentsLoginScreen;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({

  mainHeading: {
    fontSize: 18,
    fontFamily: "HindSemiBold",
    left: "33%",
  },

  studInfoStyle: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
});

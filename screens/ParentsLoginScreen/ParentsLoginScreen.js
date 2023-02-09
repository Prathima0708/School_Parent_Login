
//new one
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
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
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "../../components/UI/IconButton";
import ImageSlider from "./ImageSlider";
import Swiper from "react-native-swiper";
import { Heading } from "native-base";
import { PHONENO } from "../Login";
import { subURL } from "../../components/utils/URL's";
export var studentList = [];
export var value, phno,removeGrp;
export var PHONE;
export var phonenumber, USERNAME;
var Group;
function ParentsLoginScreen() {
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState("");
  const route = useRoute();
  const navigation = useNavigation();
  const [group, setGroup] = useState("");
  //const phone = navigation.getParent("phone");
  async function fetchUser() {
    USERNAME = await AsyncStorage.getItem("UserName");
    
    if (USERNAME !== null) {
      setUser(USERNAME);
    }
  }

  fetchUser();
  async function logoutHandler() {
    try {
      // const value = await AsyncStorage.getItem('token');
      const value = await AsyncStorage.removeItem("token");
      const ph = await AsyncStorage.removeItem("Phone");
       removeGrp = await AsyncStorage.removeItem("datagroup");
    
     
      if (value == null) {
     
        navigation.navigate("Login");
      } else {
       
      }

     
    } catch (error) {
      
    }
  }

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
          // <LogoutButton onPress={LogoutBtnPressHandler}>Test</LogoutButton>
          <IconButton
            onPress={logoutHandler}
            icon="log-out-outline"
            size={30}
          />
        );
      },
    });
  }, []);
  useEffect(() => {
    async function getGroup() {
      Group = await AsyncStorage.getItem("datagroup");

      setGroup(Group);
    }
    getGroup();
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
          // return;
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
          {/* <Heading
            size="md"
            style={{ textAlign: "center", bottom: 7, marginVertical: 7 }}
          >
            Student details
          </Heading> */}
          <Text style={styles.mainHeading}>Student details</Text>
          <ScrollView persistentScrollbar={false}>
            <FlatList data={students} renderItem={renderStudentDetails} />
          </ScrollView>
        </View>
        <View style={{ flex: 2, top: -10 }}>
          <ImageSlider />
        </View>
        {/* <View
          style={{ flex: 0.5, backgroundColor: "white", right: 20, bottom: 10 }}
        >
          <Pressable
            style={styles.btnContainer}
            onPress={() => navigation.navigate("Chat")}
          >
            <Ionicons name="chatbubble-sharp" size={38} color="#368dff" />
           
          </Pressable>
        </View> */}
      </View>
    </>
  );
}

export default ParentsLoginScreen;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

console.log(deviceHieght)
console.log(deviceWidth)
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: deviceWidth < 718 ? 20 : 32,
  },
  mainHeading: {
    fontSize: 18,
    fontFamily: "HindSemiBold",
    left: "33%",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
  btnContainer: {
    // flexDirection: "row",
    // justifyContent: "center",
    // padding: 10,
    // borderRadius: 20,
    backgroundColor: "#DBDDFC",
    width: "15.5%",
    left: "85%",
    padding: 10,
    borderRadius: 100,
    bottom: 3,
    // // marginTop: -39,
    // marginLeft: 250,
  },

  btnText: {
    fontSize: 18,
    color: "black",
    marginLeft: 3,
    marginTop: 2,
  },
  studInfoStyle: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    shadowColor: "black",
    elevation: 10,
    shadowOpacity: 0.95,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
});

import { useState } from "react";
import Test from "../components/UI/LgButton";
import { Ionicons } from '@expo/vector-icons';
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
} from "react-native";
import Button from "../components/UI/Button";
import axios from "axios";
import { Colors } from "../components/constants/styles";
import { useNavigation } from "@react-navigation/native";
import WelcomeScreen from "./WelcomeScreen";
import LgButton from "../components/UI/LgButton";

export var Token, UserId, LoginResponse;
function Login() {
  const navigation = useNavigation();
  const [enteredUser, setEnteredUser] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  const [forPartentBackground,setForPartentBackground]=useState({backgroundColor:'#4169E1',color:'white'})
  const [forTeacherBackground,setForTeacherBackground]=useState({backgroundColor:'white',color:'black'})


  // function login() {
  //   //fun call get stdent  --  [{ctnum},{}]
  //   // filter ctnum -- enteredPhone  ----- fitertedstdData = [{},{}] || []
  //   // local storage  fitertedstdData  window.localstorage.setItem(stdentList, fitertedstdData)
  //   // if fitertedstdData.length == 0 ? errMsg : Dashboard redirection (  window.localstorage.getItem(stdentList) )
  // }

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

        navigation.navigate("ParentsLogin", {
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
  }
   function toggleParents() {
    setShow(true);
    setForPartentBackground({backgroundColor:'white',color:'black'})
   
    setForTeacherBackground({backgroundColor:'#4169E1',color:'white'})

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
    setForTeacherBackground({backgroundColor:'white',color:'black'})
    setForPartentBackground({backgroundColor:'#4169E1',color:'white'})
  }

  return (
    <>

    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
        {/* <ScrollView> */}
    <View style={styles.textContainer}>
      <Text style={{ color:'#999999',fontSize:24}}>Welcome To</Text>
      <Text style={{ fontWeight:'bold', fontSize:34}}>Kinara school</Text>
      <Text style={{color:'#999999',fontSize:15}}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
      sed diam nonummy nibh euismod tincidunt ut 
      laoreet dolore magna aliquam erat volutpat.
      </Text>
    </View>
    <View style={styles.mainContainer}>
      <View style={styles.select}>
          <LgButton onPress={toggleTeachers} style={forPartentBackground}>Teachers</LgButton>
          <LgButton onPress={toggleParents} style={forTeacherBackground}>Parents</LgButton>
        </View>

        <Text style={styles.mainHeader}>Login Form</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.labels}> User Name</Text>
          <TextInput
            onChangeText={userInputHandler}
            style={styles.inputStyle}
            value={enteredUser}
          />
          <Text style={styles.labels}> Password</Text>
          <TextInput
            secureTextEntry
            onChangeText={passwordInputHandler}
            style={styles.inputStyle}
            value={enteredPassword}
          />
          {show && (
            <>
              <Text style={styles.labels}>Registered Phone Number</Text>
              <TextInput
                onChangeText={phoneInputHandler}
                style={styles.inputStyle}
                value={enteredPhone}
                keyboardType="number-pad"
              />
            </>
          )}
          <View style={styles.buttons}>
            <Button onPress={login}>Login</Button>
          </View>

          {/* <FlatList
            data={students.filter((ele) => ele.contact_num == enteredPhone)}
            renderItem={({ item }) => <Text>{item.student_name}</Text>}
          /> */}

          {/* <WelcomeScreen enteredPhone={enteredPhone} /> */}
        </View>
      </View>
    {/* </ScrollView> */}
    </KeyboardAvoidingView>
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    // height: "100%",
    // paddingHorizontal: 30,
    // paddingTop: 30,
    // backgroundColor: "#fff",
    minHeight: "40%",
    marginTop: 30,
    marginHorizontal: 32,
    paddingBottom: 26,
    // paddingLeft:26,
    // paddingRight:26,
    borderRadius: 8,
    backgroundColor: '#4169E1',
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },

  textContainer:{
    marginLeft:30,
    marginTop:20,
    width:'75%'
  },
  select: {
    flexDirection: "row",
    fontSize: 15,
    justifyContent: "space-between",
    fontWeight: "500",
    backgroundColor: "white",
  },
  mainHeader: {
    fontSize: 25,
    color: "white",
    fontWeight: "500",
    paddingTop: 20,
    paddingBottom: 15,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 10,
    paddingLeft: 26,
    paddingRight: 26,
  },

  labels: {
    fontSize: 18,
    color: "#7d7d7d",
    marginTop: 10,
    marginBottom: 5,
    lineHeight: 25,
    color: "white",
    marginBottom: 4,
    //fontFamily: "regular",
  },
  buttons: {
    marginTop: 22,
  },
  inputStyle: {
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    fontSize: 18,
  },
});

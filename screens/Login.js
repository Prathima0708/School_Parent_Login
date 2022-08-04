import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/UI/Button";
import axios from "axios";
import { Colors } from "../components/constants/styles";
import { useNavigation } from "@react-navigation/native";

export var studentList = [];
function Login() {
  const navigation = useNavigation();
  const [enteredPhone, setEnteredPhone] = useState("");
  const [students, setStudents] = useState([]);

  // function login() {
  //   //fun call get stdent  --  [{ctnum},{}]
  //   // filter ctnum -- enteredPhone  ----- fitertedstdData = [{},{}] || []
  //   // local storage  fitertedstdData  window.localstorage.setItem(stdentList, fitertedstdData)
  //   // if fitertedstdData.length == 0 ? errMsg : Dashboard redirection (  window.localstorage.getItem(stdentList) )
  // }
  async function login() {
    try {
      const res = await axios.get("http://10.0.2.2:8000/school/Student/");

      // console.log(res.data);
      setStudents(res.data);
      let filteredlist = res.data.filter(
        (ele) => ele.contact_num == enteredPhone
      );
      studentList = filteredlist;
      //console.log(filteredlist);
      if (filteredlist.length == 0) {
        <Text>No Data</Text>;
      } else {
        navigation.navigate("Welcome");
        setEnteredPhone("");
      }
    } catch (error) {
      console.log(error);
    }
  }
  function phoneInputHandler(enteredValue) {
    setEnteredPhone(enteredValue);
  }

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.mainHeader}>Login Form</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.labels}> Contact Number</Text>
          <TextInput
            onChangeText={phoneInputHandler}
            style={styles.inputStyle}
            value={enteredPhone}
            keyboardType="number-pad"
          />
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
    marginTop: 184,
    marginHorizontal: 32,
    padding: 26,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  mainHeader: {
    fontSize: 25,
    color: "white",
    fontWeight: "500",
    paddingTop: 20,
    paddingBottom: 15,
  },
  inputContainer: {
    marginTop: 20,
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

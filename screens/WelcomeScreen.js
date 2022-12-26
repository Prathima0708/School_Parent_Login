import { Alert, StyleSheet, Text, View } from "react-native";
import StudentItem from "../components/StudentItem/StudentItem";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { subURL } from "../components/utils/URL's";

export var studentList = [];
function WelcomeScreen() {
  const [students, setStudents] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    async function login() {
      try {
        const ph = route.params.phone.toString();
        const res = await axios.get(`${subURL}/Student/`);
        //  console.log(res.data);
        setStudents(res.data);
        let filteredlist = res.data.filter(
          (ele) => ele.contact_num == route.params.phone
        );
        console.log(filteredlist);
        studentList = filteredlist;
        if (filteredlist.length == 0) {
          Alert.alert("Invalid Input", "Please enter valid credentials");
          //setEnteredPhone("");
        } else {
          navigation.navigate("ParentsLogin");
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
      <View style={styles.rootContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text>{route.params.phone}</Text>
        {/* <FlatList data={studentList} renderItem={renderStudentDetails} /> */}
        {/* <ParentsLogin /> */}

        {/* <FlatList data={studentList} renderItem={renderStudentDetails} />
        <Pressable
          style={styles.btnContainer}
          onPress={() => navigation.navigate("Chat")}
        >
          <Ionicons name="chatbubble" size={28} color="black" />
          <Text style={styles.btnText}>Chat</Text>
        </Pressable> */}
      </View>
    </>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,

    borderRadius: 20,
    backgroundColor: "#368dff",
    marginTop: -39,
    marginLeft: 250,
  },

  btnText: {
    fontSize: 18,
    color: "black",
    marginLeft: 3,
    marginTop: 2,
  },
});

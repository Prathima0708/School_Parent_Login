import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import React, { useState } from "react";
import { studentId, StudentRegNo } from "./StudentProfile";
import { Ionicons } from "@expo/vector-icons";
import Input from "../UI/Input";
import { useNavigation, useRoute } from "@react-navigation/native";
import UnderlinedInput from "../UI/UnderlinedInput";
import Button from "../UI/Button";

const StudentDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [regno, setregno] = useState(route.params.stdreg.toString());
  const [name, setName] = useState(route.params.stdname);
  const [classname, setClassName] = useState(
    route.params.stdclass + "-" + route.params.stdsection
  );

  function regNoChangeHandler(enteredValue) {
    setregno(enteredValue);
  }
  function nameChangeHandler(enteredValue) {
    setName(enteredValue);
  }
  function classChangeHandler(enteredValue) {
    setClassName(enteredValue);
  }
  function cancelHandler() {
    navigation.navigate("ParentsProfile");
  }
  return (
    <View>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>Edit Student Information</Text>
      </View>
      <Input value={regno} onChangeText={regNoChangeHandler} />
      <Input value={name} onChangeText={nameChangeHandler} />
      <Input value={classname} onChangeText={classChangeHandler} />
      <View style={styles.btnSubmit}>
        <Button onPress={cancelHandler}>Cancel</Button>
        <Button>Update</Button>
      </View>
    </View>
  );
};

export default StudentDetails;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    //paddingHorizontal: 30,
  },
  menuItemText: {
    marginLeft: 18,
    fontFamily: "HindSemiBold",
    fontSize: 20,
    lineHeight: 26,
  },
  btnSubmit: {
    flexDirection: "row",
    marginTop: 30,

    width: "55%",
    marginLeft: deviceWidth < 370 ? 170 : 10,
  },
});

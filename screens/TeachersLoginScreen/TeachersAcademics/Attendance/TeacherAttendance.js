import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { finalList } from "./TeachersAttendance";

export var STUDENTNAME, CLASSNAME, SECTION, STATUS, ID;
let newTester = []; // <-- Important!
function TeacherAttendance({
  teachers,
  class_name,
  section,
  id,
  onPresent,
  // student_photo,
  // mother_name,
  // busnumber,
}) {
  const [present, setPresent] = useState(false);
  const [absent, setAbsent] = useState(false);
  const [holiday, setHoliday] = useState(false);
  const [statusBackground, setStatusBackground] = useState();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [changePresentColor, setChangePresentColor] = useState();
  const [changeAbsentColor, setChangeAbsentColor] = useState();
  const [changeHolidayColor, setChangeHolidayColor] = useState();

  const [status, setStatus] = useState([
    {
      studentname: "",
      present: "",
      absent: "",
      holiday: "",
    },
  ]);
  const [finalStatus, setFinalStatus] = useState([...selectedStatus]);

  STUDENTNAME = teachers;

  CLASSNAME = class_name;
  SECTION = section;
  // STATUS = selectedStatus || onPresent;
  STATUS = finalList;

  ID = id;

  console.log("***************");
  console.log(finalList);

  function presentBtnHandler() {
    setPresent(true);
    // const _inputs = [...test];

    // test.present = "Present";

    // setTest(_inputs);

    setSelectedStatus("present");
    setFinalStatus([...finalStatus, "present"]);
    newTester.push([...selectedStatus, "present"]);

    finalList.concat(newTester);

    //setStatus((data) => [...data, "Present"]);
    // setStatusBackground("green");
    // setOverAllPresent(overAllPresent);
    //setStatus("Present");
    // setStatus((oldArray) => [...oldArray, "Present"]);
  }
  function absentBtnHandler() {
    setAbsent(true);

    setSelectedStatus("absent");
    setFinalStatus([...finalStatus, "absent"]);
    newTester.push([...selectedStatus, "absent"]);
    finalList.concat(newTester);
  }
  function holidatBtnGHandler() {
    setHoliday(true);

    setSelectedStatus("holiday");
    setFinalStatus([...finalStatus, "holiday"]);
    newTester.push([...selectedStatus, "holiday"]);
    finalList.concat(newTester);
  }

  return (
    <>
      <ScrollView horizontal={false}>
        <View style={styles.studentItem}>
          <View style={styles.studentItem}>
            <Text style={[styles.textBase, styles.description]}>
              {teachers} {id}
            </Text>
            <Text style={[styles.textBase, styles.description]}>{section}</Text>
            <Text style={[styles.textBase, styles.description]}>
              {class_name}
            </Text>
          </View>
          <View style={{ color: statusBackground, padding: 10 }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>
              {selectedStatus || onPresent}
            </Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <Button
              title="P"
              color={changePresentColor}
              onPress={presentBtnHandler}
            />
            <View style={styles.space} />
            <Button
              title="A"
              color={changeAbsentColor}
              onPress={absentBtnHandler}
            />
            <View style={styles.space} />
            <Button
              title="H"
              color={changeHolidayColor}
              onPress={holidatBtnGHandler}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default TeacherAttendance;

const styles = StyleSheet.create({
  statusContainer: {},
  studentItem: {
    // width: "90%",

    padding: 11,
    marginVertical: 8,
    // //  backgroundColor: "#3e04c3",
    backgroundColor: "#f0f0fc",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 6,
  },
  textBase: {
    color: "#0D98BA",
    marginRight: 33,
  },
  description: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: "bold",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});

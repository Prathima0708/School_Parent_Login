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

export var STUDENTNAME, CLASSNAME, SECTION, STATUS, ID;

function TeachersList({
  teachers,
  class_name,
  section,
  id,
  onPresent,
  // student_photo,
  // mother_name,
  // busnumber,
}) {

  const [selectedStatus, setSelectedStatus] = useState([]);
  
  const [present,setPresent]=useState(false);
  const [absent,setAbsent]=useState(false);
  const [holiday,setHoliday]=useState(false);

  const [statusBackground, setStatusBackground] = useState();
  const [changePresentColor, setChangePresentColor] = useState();
  const [changeAbsentColor, setChangeAbsentColor] = useState();
  const [changeHolidayColor, setChangeHolidayColor] = useState();

  function presentButtonPressed() {
    setTest([ ...test, "Present" ]);
  }

  function absentBtnHandler() {
    setTest([ ...test, "Absent" ]);
  }

  function holidatBtnGHandler() {
    setTest([ ...test, "Holiday" ]);

  }

  function halfDayBtnHandler(){
    setTest([ ...test, "Half Day" ]);
  }

//   STATUS=selectedStatus;
//   console.log(STATUS)

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
          {/* <View style={{ color: statusBackground, padding: 10 }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>
              {selectedStatus}
            </Text>
          </View> */}
          <View style={styles.checkBoxContainer}>
            <Button
              title="P"
              color={changePresentColor}
              onPress={presentButtonPressed}
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
            <View style={styles.space} />
            <Button
              title="HD"
              color={changeHolidayColor}
              onPress={halfDayBtnHandler}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default TeachersList;

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

import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "native-base";
import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import Input from "../../../components/UI/Input";
import UnderlinedInput from "../../../components/UI/UnderlinedInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../../components/UI/Button";
import axios from "axios";
import TeachersTimetable from "./TeachersTimeTable";
import { subURL } from "../../../components/utils/URL's";

function EditTeachersTimeTable() {
  const route = useRoute();
  const navigation = useNavigation();

  const [idValue, setIdValue] = useState(route.params.ID.toString());
  const [examData, setShowExamData] = useState([]);
  const [examname, setExamName] = useState(route.params.examname);
  const [marks, setMarks] = useState(route.params.totalmarks.toString());
  const [hour, setHour] = useState(route.params.Hour);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [toText, setToText] = useState(route.params.todate);
  const [enteredtoDateTouched, setEnteredtoDateTouched] = useState(false);
  const enteredtoDateIsValid = toText;
  const toDateInputIsInValid = !enteredtoDateIsValid && enteredtoDateTouched;

  const [fromText, setFromText] = useState(route.params.fromdate);
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText;
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;

  const [datemode, setDateMode] = useState("date");

  const toDateChangeHandler = (event, selectedToDate) => {
    const currentToDate = selectedToDate || toDate;
    setToShow(Platform.OS === "ios");
    setToDate(currentToDate);

    let tempToDate = new Date(currentToDate);
    let tDate =
      tempToDate.getDate() +
      "/" +
      (tempToDate.getMonth() + 1) +
      "/" +
      tempToDate.getFullYear();
    if (event.type == "set") {
      setToText(tDate);
    }

    // console.log(fDate);
  };

  const fromDateChangeHandler = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate || fromDate;
    setFromShow(Platform.OS === "ios");
    setFromDate(currentFromDate);

    let tempFromDate = new Date(currentFromDate);
    let fDate =
      tempFromDate.getDate() +
      "/" +
      (tempFromDate.getMonth() + 1) +
      "/" +
      tempFromDate.getFullYear();
    if (event.type == "set") {
      setFromText(fDate);
    }

    //console.log(fDate);
  };

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  const showToMode = (currentToMode) => {
    setToShow(true);

    setDateMode(currentToMode);
  };

  function examNameChangeHandler(enteredValue) {
    setExamName(enteredValue);
  }

  function totalMarksChangeHandler(enteredValue) {
    setMarks(enteredValue);
  }

  function hourChangeHandler(enteredValue) {
    setHour(enteredValue);
  }

  function updateHandler() {
    const FormData = {
      exam_name: examname,
      start_date: fromDate,
      end_date: toDate,
      Total_marks: marks,
      hour: hour,
      // class_name: class_name,
    };

    if (!examname || !marks || !hour) {
      Alert.alert("Please enter all fields");
    } else {
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const dataForm = FormData;
          const resLogin = await axios.put(
            `${subURL}/Exam/${idValue}/`,
            dataForm,
            {
              headers: headers,
            }
          );
          console.log(resLogin.data);
          const token = resLogin.data.token;
          const userId = resLogin.data.user_id;
          console.log(token);
          // Token = token;
          // UserId = userId;
        } catch (error) {
          console.log(error);
        }
      }
      storeData();

      // setShowExamList(true);
      // setShowForm(false);
      // setShowAddBtn(true);
      Alert.alert("Successfully updated", "", [
        {
          text: "OK",
          onPress: () => {
            async function fetchData() {
              try {
                const res = await axios.get(`${subURL}/Exam/`);
                // console.log(res.data);
                setShowExamData(res.data);
                //   setFilteredData(res.data);
              } catch (error) {
                console.log(error);
              }
            }
            fetchData();
            navigation.navigate("TeachersTimetable", {
              examDataNew: examData,
            });
          },
        },
      ]);
    }
  }

  function cancelHandler() {
    navigation.navigate("TeachersTimetable");
  }
  return (
    <View
      style={[
        { flex: 1 },
        { flexDirection: "column", backgroundColor: "white" },
      ]}
    >
      <View style={{ flex: 2 }}>
        <Input onChangeText={examNameChangeHandler} value={examname} />
        <View style={[{ flexDirection: "row", marginHorizontal: 20 }]}>
          <View style={{ flex: 1 }}>
            <UnderlinedInput
              value={fromText}
              placeholder="From Date"
              // blur={fromDateBlurHandler}
              // onFocus={onFromFocusHandler}
              // style={
              // isFromFocused
              //     ? styles.focusStyle
              //     : fromDateInputIsInValid && styles.errorBorderColorDate
              // }
              onChangeText={fromDateChangeHandler}
              onPressIn={() => showFromMode("date")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <UnderlinedInput
              value={toText}
              placeholder="To Date"
              // blur={toDateBlurHanlder}
              // onFocus={onToFocusHandler}
              // style={
              // isToFocused
              //     ? styles.focusStyle
              //     : toDateInputIsInValid && styles.errorBorderColorDate
              // }
              onPressIn={() => showToMode("date")}
            />
          </View>
        </View>
        {fromShow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fromDate}
            mode={frommode}
            is24Hour={true}
            display="default"
            onChange={fromDateChangeHandler}
          />
        )}
        {toShow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={route.params.todate}
            mode={tomode}
            is24Hour={true}
            display="default"
            onChange={toDateChangeHandler}
          />
        )}
        <Input onChangeText={totalMarksChangeHandler} value={marks} />
        <Input onChangeText={hourChangeHandler} value={hour} />
      </View>
      <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
        <View style={{ flex: 1 }}>
          <Button onPress={cancelHandler}>Cancel</Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button onPress={updateHandler}>Update</Button>
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

export default EditTeachersTimeTable;

const styles = StyleSheet.create({
  // btnSubmit1: {
  //     width: "50%",
  // },
  // cancel: {
  //     width: "50%",
  //   },
  errorBorderColorDate: {
    borderBottomColor: "red",
  },
});

import { View, StyleSheet, ScrollView, Button, FlatList } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SearchBar from "react-native-dynamic-search-bar";
import StudentAttendance from "../../../../components/StudentItem/StudentAttendance";
import TeacherAttendance, {
  CLASSNAME,
  ID,
  SECTION,
  STATUS,
  STUDENTNAME,
} from "./TeacherAttendance";

const TeachersAttendance = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  let i,
    storeData = [];
  const [inputs, setInputs] = useState([
    {
      class_name: CLASSNAME,
      section: SECTION,
      status: STATUS,
      student_name: STUDENTNAME,
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Studentclass/`
        );
        // console.log(res.data);
        setData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.teachers
          ? item.teachers.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      setFilteredData(data);
      setSearchText(text);
    }
  };
  function renderStudentDetails(itemData) {
    return <TeacherAttendance {...itemData.item} />;
  }

  function buttonPressedHandler() {
    console.log("inside button");

    for (i = 0; i < filteredData.length; i++) {
      const FormData = {
        student_name: STUDENTNAME,
        class_name: CLASSNAME,
        section: SECTION,
        status: STATUS,
      };

      console.log(FormData);
    }

    // }

    // setEnteredBusnumberTouched(true);
    // setEnteredVehicleNoTouched(true);
    // setEnteredTypeTouched(true);
    // setEnteredDrivernameTouched(true);
    // setEnteredMobileTouched(true);
    // setEnteredRoutenameTouched(true);
    // setEnteredStopnameTouched(true);
    // const formIsValid =
    //   enteredBusnumberIsValid &&
    //   enteredVehicleNoIsValid &&
    //   enteredTypeIsValid &&
    //   enteredDrivernameIsValid &&
    //   enteredMobileIsValid &&
    //   enteredRoutenameIsValid &&
    //   enteredStopnameIsValid;
    // if (formIsValid) {
    //   Alert.alert("Saved Data", "Saved Data successfully", [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel",
    //     },
    //     {
    //       text: "OK",
    //       onPress: () => {
    //         setShowForm(false);
    //         showTransport();
    //       },
    //     },
    //   ]);
    // }

    // async function getData() {
    //   try {
    //     const res = await axios.get(
    //       `http://10.0.2.2:8000/school/Transportreport/`
    //     );

    //     let filteredlist = res.data.filter((ele) => ele.vehicleno == vehicleno);
    //     if (filteredlist.length > 0) {
    //       Alert.alert(
    //         "Vehicle number already exists",
    //         "please enter a new one",
    //         [
    //           {
    //             text: "OK",

    //             style: "cancel",
    //           },
    //         ]
    //       );
    //     } else {
    //       async function storeData() {
    //         try {
    //           let headers = {
    //             "Content-Type": "application/json; charset=utf-8",
    //           };

    //           const resLogin = await axios.post(
    //             "http://10.0.2.2:8000/school/Transportreport/",
    //             FormData,
    //             {
    //               headers: headers,
    //             }
    //           );
    //           // const token = resLogin.data.token;
    //           // const userId = resLogin.data.user_id;
    //           console.log(resLogin.data);
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       }
    //       storeData();
    //       setEnteredStudentID("");
    //       setEnteredBusNumber("");
    //       setEnteredVehicleNo("");
    //       setEnteredType("");
    //       setEnteredDriverName("");
    //       setEnteredMobile("");
    //       setEnteredRouteName("");
    //       setEnteredStopName("");
    //       setEnteredBusnumberTouched(false);
    //       setEnteredVehicleNoTouched(false);
    //       setEnteredTypeTouched(false);
    //       setEnteredDrivernameTouched(false);
    //       setEnteredMobileTouched(false);
    //       setEnteredRoutenameTouched(false);
    //       setEnteredStopnameTouched(false);
    //       // setShowForm(false);
    //       // setShowList(true);
    //       setForTransportList({
    //         backgroundColor: "#F4F6F6",
    //         color: "black",
    //         borderRadius: 10,
    //       });
    //       setForTransportForm({
    //         color: "white",
    //         backgroundColor: "#1E8449",
    //         borderRadius: 10,
    //       });
    //       // setForTransportForm({ fontWeight: "bold", color: "black" });
    //       // setForTransportList({ color: "black" });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // getData();
  }

  return (
    <>
      <SearchBar
        style={styles.searchBar}
        placeholder="Search here by name"
        onChangeText={(text) => searchFilter(text)}
        value={searchText}
      />

      <ScrollView>
        <FlatList
          data={filteredData}
          renderItem={renderStudentDetails}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button title="Save" onPress={buttonPressedHandler} />
      </ScrollView>
    </>
  );
};
export default TeachersAttendance;

const styles = StyleSheet.create({
  searchBar: {
    top: 10,
  },
});

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Button as Btn,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
import TeachersHome from "./TeachersHome";
import Input from "../../components/UI/Input";
import VerticalLine from "../../components/UI/VerticalLine";
import { FlatList } from "react-native";
import { DataTable } from "react-native-paper";
import data from "../../components/store/mockdata.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
export var ID;

const TeachersTransport = () => {
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [forTransportList, setForTransportList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forTransportForm, setForTransportForm] = useState({ color: "black" });

  const [studentID, setEnteredStudentID] = useState("");

  const [vehicleno, setEnteredVehicleNo] = useState("");
  const [enteredVehicleNoTouched, setEnteredVehicleNoTouched] = useState(false);
  const enteredVehicleNoIsValid = vehicleno.trim() !== "";
  const vehicleNoInputIsInValid =
    !enteredVehicleNoIsValid && enteredVehicleNoTouched;

  const [type, setEnteredType] = useState("");
  const [enteredTypeTouched, setEnteredTypeTouched] = useState(false);
  const enteredTypeIsValid = type.trim() !== "";
  const typeInputIsInValid = !enteredTypeIsValid && enteredTypeTouched;

  const [drivername, setEnteredDriverName] = useState("");
  const [enteredDrivernameTouched, setEnteredDrivernameTouched] =
    useState(false);
  const enteredDrivernameIsValid = drivername.trim() !== "";
  const drivernameInputIsInValid =
    !enteredDrivernameIsValid && enteredDrivernameTouched;

  const [mobile, setEnteredMobile] = useState("");
  const [enteredMobileTouched, setEnteredMobileTouched] = useState(false);
  const enteredMobileIsValid = mobile;
  const mobileInputIsInValid = !enteredMobileIsValid && enteredMobileTouched;

  const [routename, setEnteredRouteName] = useState("");
  const [enteredRoutenameTouched, setEnteredRoutenameTouched] = useState(false);
  const enteredRoutenameIsValid = routename.trim() !== "";
  const routenameInputIsInValid =
    !enteredRoutenameIsValid && enteredRoutenameTouched;

  const [stopname, setEnteredStopName] = useState("");
  const [enteredStopnameTouched, setEnteredStopnameTouched] = useState(false);
  const enteredStopnameIsValid = stopname.trim() !== "";
  const stopnameInputIsInValid =
    !enteredStopnameIsValid && enteredStopnameTouched;

  const [busNumber, setEnteredBusNumber] = useState("");
  const [enteredBusnumberTouched, setEnteredBusnumberTouched] = useState(false);
  const enteredBusnumberIsValid = busNumber.trim() !== "";
  const busnumberInputIsInValid =
    !enteredBusnumberIsValid && enteredBusnumberTouched;

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSame, SetIsSame] = useState(false);
  let i = 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Transportreport/`
        );
        setData(res.data);
        let test = 0;
        const value = await AsyncStorage.getItem("key");
        for (i = 0; i < res.data.length; i++) {
          if (value == res.data[i].created_by) {
            test = res.data[i].created_by;
          } else {
            // console.log('false')
          }
        }
        if (test == value) {
          // console.log("is same")
          SetIsSame(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  function studentIDChangeHandler(enteredValue) {
    setEnteredStudentID(enteredValue);
  }
  function vehicleChangeHandler(enteredValue) {
    setEnteredVehicleNo(enteredValue);
  }
  function typeChangeHandler(enteredValue) {
    setEnteredType(enteredValue);
  }
  function driverNameChangeHandler(enteredValue) {
    setEnteredDriverName(enteredValue);
  }
  function mobileChangeHandler(enteredValue) {
    setEnteredMobile(enteredValue);
  }
  function routeNameChangeHandler(enteredValue) {
    setEnteredRouteName(enteredValue);
  }
  function stopNameChangeHandler(enteredValue) {
    setEnteredStopName(enteredValue);
  }
  function busNumberChangeHandler(enteredValue) {
    setEnteredBusNumber(enteredValue);
  }

  function updateHandler() {
    const FormData = {
      busnumber: busNumber,
      vehicleno: vehicleno,
      types: type,
      driver_name: drivername,
      emp_mobile: mobile,
      route_name: routename,
      stop_name: stopname,
    };
    console.log(FormData);

    async function updateData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const resLogin = await axios.put(
          `http://10.0.2.2:8000/school/Transportreport/${ID}/`,
          FormData,
          {
            headers: headers,
          }
        );
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
    }
    updateData();
    Alert.alert("Successfully updated", "", [
      { text: "OK", onPress: () => fetchData },
    ]);
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Transportreport/`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    setEnteredStudentID("");
    setEnteredBusNumber("");
    setEnteredVehicleNo("");
    setEnteredType("");
    setEnteredDriverName("");
    setEnteredMobile("");
    setEnteredRouteName("");
    setEnteredStopName("");
    setShowForm(false);
    setShowList(true);
    setForTransportList({ fontWeight: "bold", color: "black" });
    setForTransportForm({ color: "black" });
    setForTransportForm({ fontWeight: "bold", color: "black" });
    setForTransportList({ color: "black" });
  }

  function buttonPressedHandler() {
    console.log(UserId);
    const FormData = {
      busnumber: busNumber,
      vehicleno: vehicleno,
      types: type,
      driver_name: drivername,
      emp_mobile: mobile,
      route_name: routename,
      stop_name: stopname,
    };

    console.log(FormData);

    setEnteredBusnumberTouched(true);
    setEnteredVehicleNoTouched(true);
    setEnteredTypeTouched(true);
    setEnteredDrivernameTouched(true);
    setEnteredMobileTouched(true);
    setEnteredRoutenameTouched(true);
    setEnteredStopnameTouched(true);

    if (!enteredBusnumberIsValid) {
      return;
    }
    if (!enteredVehicleNoIsValid) {
      return;
    }
    if (!enteredTypeIsValid) {
      return;
    }
    if (!enteredDrivernameIsValid) {
      return;
    }
    if (!enteredMobileIsValid) {
      return;
    }
    if (!enteredRoutenameIsValid) {
      return;
    }
    if (!enteredStopnameIsValid) {
      return;
    } else {
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };

          const resLogin = await axios.post(
            "http://10.0.2.2:8000/school/Transportreport/",
            FormData,
            {
              headers: headers,
            }
          );
          // const token = resLogin.data.token;
          // const userId = resLogin.data.user_id;
          console.log(resLogin.data);
        } catch (error) {
          console.log(error);
        }
      }
      storeData();
      setEnteredStudentID("");
      setEnteredBusNumber("");
      setEnteredVehicleNo("");
      setEnteredType("");
      setEnteredDriverName("");
      setEnteredMobile("");
      setEnteredRouteName("");
      setEnteredStopName("");
      setEnteredBusnumberTouched(false);
      setEnteredVehicleNoTouched(false);
      setEnteredTypeTouched(false);
      setEnteredDrivernameTouched(false);
      setEnteredMobileTouched(false);
      setEnteredRoutenameTouched(false);
      setEnteredStopnameTouched(false);
      // setShowForm(false);
      // setShowList(true);
      setForTransportList({ fontWeight: "bold", color: "black" });
      setForTransportForm({ color: "black" });
      setForTransportForm({ fontWeight: "bold", color: "black" });
      setForTransportList({ color: "black" });
    }
  }

  function busnumberInputBlur() {
    setEnteredBusnumberTouched(true);
  }
  function vehicleInputBlur() {
    setEnteredVehicleNoTouched(true);
  }
  function typeInputBlur() {
    setEnteredTypeTouched(true);
  }
  function drivernameInputBlur() {
    setEnteredDrivernameTouched(true);
  }
  function mobilenumberInputBlur() {
    setEnteredMobileTouched(true);
  }
  function routenameInputBlur() {
    setEnteredRoutenameTouched(true);
  }
  function stopnameInputBlur() {
    setEnteredStopnameTouched(true);
  }

  function showTransportForm() {
    setForTransportList({ fontWeight: "bold", color: "black" });
    setForTransportForm({ color: "black" });
    setShowForm(true);
    setShowList(false);
    setEnteredBusnumberTouched(false);
    setEnteredVehicleNoTouched(false);
    setEnteredTypeTouched(false);
    setEnteredDrivernameTouched(false);
    setEnteredMobileTouched(false);
    setEnteredRoutenameTouched(false);
    setEnteredStopnameTouched(false);
    setIsEdit(false);
  }
  function showTransport() {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Transportreport/`
        );
        console.log(res.data);

        setData(res.data);

        setForCalendarForm({ fontWeight: "bold", color: "black" });
        setForCalendarList({ color: "black" });
        setShowForm(false);
        setShowList(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    setForTransportForm({ fontWeight: "bold", color: "black" });
    setForTransportList({ color: "black" });
    setShowForm(false);
    setShowList(true);
  }

  function editItem(id) {
    ID = id;
    const filteredDummuyData = data.find((data) => data.id == id);
    console.log(filteredDummuyData);
    setEnteredBusNumber(filteredDummuyData.busnumber);
    setEnteredVehicleNo(filteredDummuyData.vehicleno);
    setEnteredType(filteredDummuyData.types);
    setEnteredDriverName(filteredDummuyData.driver_name);
    setEnteredMobile(filteredDummuyData.emp_mobile);
    setEnteredRouteName(filteredDummuyData.route_name);
    setEnteredStopName(filteredDummuyData.stop_name);
    setForTransportList({ fontWeight: "bold", color: "black" });
    setForTransportForm({ color: "black" });
    setShowForm(true);
    setShowList(false);
    setIsEdit(true);
  }
  function deleteItem(id) {
    console.log(id);
    // const newFilteredData=data.filter((data)=>data.id != id);
    Alert.alert("Confirm Deletion", "You are about to delete this row!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes,delete",
        onPress: () => deleteData(),
      },
    ]);
    async function deleteData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        // const dataForm = FormData;
        const resLogin = await axios.delete(
          `http://10.0.2.2:8000/school/Transportreport/${id}/`,
          // FormData,
          {
            headers: headers,
          }
        );
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
      async function fetchData() {
        try {
          const res = await axios.get(
            `http://10.0.2.2:8000/school/Transportreport/`
          );
          // console.log(res.data);
          setData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }

  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add Transport</BgButton>
      </View> */}
      <View style={styles.BtnContainer}>
        <BgButton onPress={showTransportForm} style={forTransportList}>
          Add Transport
        </BgButton>
        <VerticalLine>|</VerticalLine>
        <BgButton onPress={showTransport} style={forTransportForm}>
          Show Transport
        </BgButton>
      </View>
      {showForm && (
        <ScrollView style={styles.root}>
          <View style={styles.inputForm}>
            <Input
              // keyboardType="number-pad"
              placeholder="Bus Number"
              onChangeText={busNumberChangeHandler}
              blur={busnumberInputBlur}
              value={busNumber}
              onSubmitEditing={Keyboard.dismiss}
              style={busnumberInputIsInValid && styles.errorBorderColor}
            />
            {busnumberInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter bus number
              </Text>
            )}

            <Input
              // keyboardType="number-pad"
              placeholder="Vehicle Number"
              onChangeText={vehicleChangeHandler}
              blur={vehicleInputBlur}
              value={vehicleno}
              onSubmitEditing={Keyboard.dismiss}
              style={vehicleNoInputIsInValid && styles.errorBorderColor}
            />
            {vehicleNoInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter vehicle number
              </Text>
            )}

            <Input
              placeholder="Type"
              onChangeText={typeChangeHandler}
              blur={typeInputBlur}
              value={type}
              onSubmitEditing={Keyboard.dismiss}
              style={typeInputIsInValid && styles.errorBorderColor}
            />
            {typeInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter type
              </Text>
            )}

            <Input
              placeholder="Driver Name"
              onChangeText={driverNameChangeHandler}
              blur={drivernameInputBlur}
              value={drivername}
              onSubmitEditing={Keyboard.dismiss}
              style={drivernameInputIsInValid && styles.errorBorderColor}
            />
            {drivernameInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter driver name
              </Text>
            )}

            <Input
              keyboardType="number-pad"
              // style={styles.inputStyle}
              placeholder="Mobile Number"
              onChangeText={mobileChangeHandler}
              blur={mobilenumberInputBlur}
              value={mobile.toString()}
              onSubmitEditing={Keyboard.dismiss}
              style={mobileInputIsInValid && styles.errorBorderColor}
            />
            {mobileInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter mobile number
              </Text>
            )}

            <Input
              placeholder="Route Name"
              onChangeText={routeNameChangeHandler}
              blur={routenameInputBlur}
              value={routename}
              onSubmitEditing={Keyboard.dismiss}
              style={routenameInputIsInValid && styles.errorBorderColor}
            />
            {routenameInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter route name
              </Text>
            )}

            <Input
              placeholder="Stop Name"
              onChangeText={stopNameChangeHandler}
              blur={stopnameInputBlur}
              value={stopname}
              onSubmitEditing={Keyboard.dismiss}
              style={stopnameInputIsInValid && styles.errorBorderColor}
            />
            {stopnameInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter stop name
              </Text>
            )}
            {!isEdit && (
              <View style={styles.btnSubmit}>
                <Button onPress={buttonPressedHandler}>Add Transport</Button>
              </View>
            )}
            {isEdit && (
              <View style={styles.btnSubmit}>
                <Button onPress={updateHandler}>Update</Button>
              </View>
            )}
          </View>
        </ScrollView>
      )}
      {showList && (
        <ScrollView horizontal={true}>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> BUS NUMBER</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> VEHICLENO</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> TYPES</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> DRIVER NAME</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> EMP MOBILE</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> ROUTE NAME</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}> STOP NAME</Text>
              </View>

              <View style={styles.th}>
                <Text
                  style={{
                    margin: 7,
                    marginLeft: 50,
                    fontFamily: "MonsterratBold",
                    fontSize: 16,
                  }}
                >
                  ACTIONS
                </Text>
              </View>

              {/* {isSame && <View style={styles.th}>
                <Text style={styles.tableTitle}> Update</Text>
              </View>}
              {isSame && <View style={styles.th}>
                <Text style={styles.tableTitle}> Delete</Text>
              </View>} */}
            </DataTable.Header>

            {data &&
              data.map((data, key) => (
                <DataTable.Row style={styles.tableRow} key={key}>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 50,
                    }}
                  >
                    {data.busnumber}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 50,
                    }}
                  >
                    {data.vehicleno}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 20,
                    }}
                  >
                    {data.types}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 50,
                    }}
                  >
                    {data.driver_name}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 50,
                    }}
                  >
                    {data.emp_mobile}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 50,
                    }}
                  >
                    {data.route_name}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 70,
                    }}
                  >
                    {data.stop_name}
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 110,
                    }}
                  >
                    <Ionicons
                      name="md-pencil-sharp"
                      size={24}
                      color="green"
                      onPress={() => editItem(data.id)}
                    />
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      //marginLeft: 15,
                    }}
                  >
                    <Ionicons
                      name="trash"
                      size={24}
                      color="red"
                      onPress={() => deleteItem(data.id)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      )}
      {showForm && keyboardStatus == "Keyboard Hidden" && (
        <View style={styles.home}>
          <TeachersHome />
        </View>
      )}
    </>
  );
};

export default TeachersTransport;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",
  },
  container: {
    marginTop: 10,
    padding: 10,
  },
  home: {
    marginTop: 29,
  },
  type: {
    left: 30,
  },
  root: {
    backgroundColor: "#EBECFO",
    // backgroundColor:'white'
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  errorBorderColor: {
    color: "black",
    borderBottomWidth: 1,
    borderColor: "red",
    padding: 10,
    margin: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
  },
  btnSubmit: {
    marginTop: 30,
    marginBottom: 30,
  },
  th: {
    padding: 5,
    marginRight: 13,
    //fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 50,
    fontWeight: "bold",
  },
  tableTitle: {
    // padding: 5,
    margin: 7,
    fontFamily: "MonsterratBold",
    fontSize: 16,
  },
  tableCell: {
    width: 40,
    //  fontFamily: "Montserrat_600SemiBold",
    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});

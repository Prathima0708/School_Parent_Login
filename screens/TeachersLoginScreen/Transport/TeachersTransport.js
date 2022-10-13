import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Button as Btn,
  Alert,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";

import BgButton from "../../../components/UI/BgButton";
import TeachersHome from "../BottomTab/TeachersHome";
import Input from "../../../components/UI/Input";

import { FlatList } from "react-native";
import { Card, DataTable } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "react-native-dynamic-search-bar";
export var ID;

const TeachersTransport = () => {
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [forTransportList, setForTransportList] = useState({
    color: "white",
    backgroundColor: "#0C60F4",
    borderRadius: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontFamily: "HindSemiBold",
  });
  const [forTransportForm, setForTransportForm] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontFamily: "HindSemiBold",
  });

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
  const enteredMobileIsValid = mobile.length == 10;
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
  const [showInitialBtn, setShowInitialBtn] = useState(true);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
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
    setShowInitialBtn(true);
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
        setFilteredData(res.data);
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
    setForTransportList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForTransportForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
  }

  function buttonPressedHandler() {
    // console.log(UserId);
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
    const formIsValid =
      enteredBusnumberIsValid &&
      enteredVehicleNoIsValid &&
      enteredTypeIsValid &&
      enteredDrivernameIsValid &&
      enteredMobileIsValid &&
      enteredRoutenameIsValid &&
      enteredStopnameIsValid;
    if (formIsValid) {
      Alert.alert("Saved Data", "Saved Data successfully", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setShowForm(false);
            showTransport();
          },
        },
      ]);
    }

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
    }
    async function getData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Transportreport/`
        );

        let filteredlist = res.data.filter((ele) => ele.vehicleno == vehicleno);
        if (filteredlist.length > 0) {
          Alert.alert(
            "Vehicle number already exists",
            "please enter a new one",
            [
              {
                text: "OK",

                style: "cancel",
              },
            ]
          );
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
          setForTransportList({
            backgroundColor: "#F4F6F6",
            color: "black",
            borderRadius: 10,
          });
          setForTransportForm({
            color: "white",
            backgroundColor: "#1E8449",
            borderRadius: 10,
          });
          // setForTransportForm({ fontWeight: "bold", color: "black" });
          // setForTransportList({ color: "black" });
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
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
    setForTransportForm({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
      // borderTopColor: "#d9dffc",
      // backgroundColor: "#D6EAF8",
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });

    setForTransportList({
      backgroundColor: "#0C60F4",
      color: "white",
      borderRadius: 10,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });
    // setForTransportList({ fontWeight: "bold", color: "black" });
    // setForTransportForm({ color: "black" });
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
    setEnteredStudentID("");
    setEnteredBusNumber("");
    setEnteredVehicleNo("");
    setEnteredType("");
    setEnteredDriverName("");
    setEnteredMobile("");
    setEnteredRouteName("");
    setEnteredStopName("");
  }
  function showTransport() {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Transportreport/`
        );
        console.log(res.data);

        setFilteredData(res.data);

        // setForTransportForm({ fontWeight: "bold", color: "black" });
        // setForTransportList({ color: "black" });
        setShowForm(false);
        setShowList(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // setForTransportForm({ fontWeight: "bold", color: "black" });
    // setForTransportList({ color: "black" });
    setForTransportList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });
    setForTransportForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    });
    setShowForm(false);
    setShowList(true);
  }

  function editItem(id) {
    setShowInitialBtn(false);
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
    setForTransportList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForTransportForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    setShowForm(true);
    setShowList(false);
    setIsEdit(true);
  }

  function deleteItem(busnumber) {
    console.log(busnumber);
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
        const resLogin = await axios.delete(
          `http://10.0.2.2:8000/school/Transportreport/${busnumber}/`,
          {
            headers: headers,
          }
        );
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
          setFilteredData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }

  function cancelHandler() {
    setShowInitialBtn(true);
    setShowForm(false);
    setShowList(true);
  }

  const searchFilter = (text) => {
    console.log("search function");
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.driver_name
          ? item.driver_name.toUpperCase()
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
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          // backgroundColor: "white",
        }}
      >
        <View style={{ flex: 8 }}>
          {showInitialBtn && (
            <View style={styles.BtnContainer}>
              <BgButton onPress={showTransportForm} style={forTransportList}>
                Add Transport
              </BgButton>

              <BgButton onPress={showTransport} style={forTransportForm}>
                Show Transport
              </BgButton>
            </View>
          )}
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
                      fontSize: deviceWidth < 370 ? 16 : 18,
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
                      fontSize: deviceWidth < 370 ? 16 : 18,
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
                      fontSize: deviceWidth < 370 ? 16 : 18,
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
                      fontSize: deviceWidth < 370 ? 16 : 18,
                    }}
                  >
                    Enter driver name
                  </Text>
                )}

                <Input
                  keyboardType="number-pad"
                  // style={styles.inputStyle}
                  placeholder="Mobile Number"
                  maxLength={10}
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
                      fontSize: deviceWidth < 370 ? 16 : 18,
                    }}
                  >
                    Enter a valid mobile number(10 digits)
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
                      fontSize: deviceWidth < 370 ? 16 : 18,
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
                      fontSize: deviceWidth < 370 ? 16 : 18,
                    }}
                  >
                    Enter stop name
                  </Text>
                )}

                {!isEdit && (
                  <View style={styles.btnSubmit}>
                    <Button onPress={buttonPressedHandler}>
                      Add Transport
                    </Button>
                  </View>
                )}
                {isEdit && (
                  <View style={styles.btnSubmit1}>
                    <Button onPress={updateHandler}>Update</Button>
                  </View>
                )}
                {isEdit && (
                  <View style={styles.cancel}>
                    <Button onPress={cancelHandler}>Cancel</Button>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
          {/* {isSame && <View style={styles.th}>
                <Text style={styles.tableTitle}> Update</Text>
              </View>}
              {isSame && <View style={styles.th}>
                <Text style={styles.tableTitle}> Delete</Text>
              </View>} */}
          {showList && (
            <>
              <SearchBar
                // onSubmitEditing={Keyboard.dismiss}
                style={styles.searchBar}
                textInputStyle={{
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
                placeholder="Search here"
                onChangeText={(text) => searchFilter(text)}
                value={searchText}
              />
              <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
                <View style={{ flex: 8, bottom: 10 }}>
                  <ScrollView>
                    <View style={styles.root}>
                      {filteredData &&
                        filteredData.map((data, key) => (
                          <>
                            <View key={key}>
                              <Card
                                style={{
                                  margin: 5,
                                  marginVertical: 15,
                                  marginHorizontal: 25,
                                  elevation: 5,
                                  borderRadius: 10,
                                }}
                              >
                                <Card.Content style={{ marginTop: 0 }}>
                                  <View
                                    style={[{ flexDirection: "row", flex: 1 }]}
                                  >
                                    <View style={{ flex: 2, left: 20, top: 5 }}>
                                      <Text style={[styles.cardTextStyle]}>
                                        Driver Name
                                      </Text>
                                    </View>
                                    <View style={{ flex: 2, left: 40, top: 5 }}>
                                      <Text style={styles.cardData}>
                                        {data.driver_name}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={[{ flexDirection: "row", flex: 1 }]}
                                  >
                                    <View style={{ flex: 2, left: 20, top: 5 }}>
                                      <Text style={[styles.cardTextStyle]}>
                                        Bus Number
                                      </Text>
                                    </View>
                                    <View style={{ flex: 2, left: 40, top: 5 }}>
                                      <Text style={styles.cardData}>
                                        {data.busnumber}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={[{ flexDirection: "row", flex: 1 }]}
                                  >
                                    <View style={{ flex: 2, left: 20, top: 5 }}>
                                      <Text style={[styles.cardTextStyle]}>
                                        Vehicle Number
                                      </Text>
                                    </View>
                                    <View style={{ flex: 2, left: 40, top: 5 }}>
                                      <Text style={styles.cardData}>
                                        {data.vehicleno}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={[{ flexDirection: "row", flex: 1 }]}
                                  >
                                    <View style={{ flex: 2, left: 20, top: 5 }}>
                                      <Text style={[styles.cardTextStyle]}>
                                        Contact Number
                                      </Text>
                                    </View>
                                    <View style={{ flex: 2, left: 40, top: 5 }}>
                                      <Text style={styles.cardData}>
                                        {data.emp_mobile}
                                      </Text>
                                    </View>
                                  </View>
                                  <View
                                    style={[{ flexDirection: "row", flex: 1 }]}
                                  >
                                    <View
                                      style={{ flex: 1, top: 5, left: 200 }}
                                    >
                                      <Ionicons
                                        name="md-pencil-sharp"
                                        size={24}
                                        color="green"
                                        style={{ left: "30%" }}
                                        onPress={() => editItem(data.id)}
                                      />
                                    </View>
                                    <View style={{ flex: 1, left: 40, top: 5 }}>
                                      <Ionicons
                                        name="trash"
                                        size={24}
                                        color="red"
                                        style={{ left: "60%" }}
                                        onPress={() => deleteItem(data.id)}
                                      />
                                    </View>
                                  </View>
                                </Card.Content>
                              </Card>
                            </View>
                          </>
                        ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </>
          )}
        </View>
        {keyboardStatus == "Keyboard Hidden" && (
          <View style={{ flex: 1 }}>
            <TeachersHome />
          </View>
        )}
      </View>
    </>
  );
};

export default TeachersTransport;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",
    width: "49%",

    marginHorizontal: 10,
  },
  container: {
    marginTop: "1%",
    padding: "1%",
  },

  btnSubmit1: {
    marginLeft: "50%",
    width: "50%",
  },
  cancel: {
    marginTop: -110,
    marginBottom: 10,
    marginLeft: -15,
    width: "50%",
  },
  type: {
    left: 30,
  },
  root: {
    backgroundColor: "#EBECFO",
    height: "100%",
  },
  inputForm: {
    padding: "5%",
    paddingTop: "1%",
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
    marginTop: "2%",

    marginLeft: "35%",
    width: "70%",
  },
  cardData: {
    fontSize: 16,
    fontFamily: "HindSemiBold",
    color: "grey",
  },

  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: deviceWidth < 370 ? 14 : 16,
  },
  submit: {
    padding: "3%",
    backgroundColor: "#00B8AC",
    borderRadius: 10,
    borderWidth: 1,
    top: "10%",
    borderColor: "#fff",
    left: "10%",
    width: deviceWidth < 370 ? "50%" : "50%",
  },
  delete: {
    padding: "3%",
    backgroundColor: "#00B8AC",
    borderRadius: 10,
    borderWidth: 1,
    top: "10%",
    borderColor: "#fff",
    width: deviceWidth < 370 ? "50%" : "50%",
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 20,
  },
});

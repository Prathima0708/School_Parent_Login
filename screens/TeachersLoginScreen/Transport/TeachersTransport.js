import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";

import BgButton from "../../../components/UI/BgButton";
import TeachersHome from "../BottomTab/TeachersHome";
import Input from "../../../components/UI/Input";

import { Card } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "react-native-dynamic-search-bar";
import { useNavigation } from "@react-navigation/native";
import { Heading, Spinner, Text as NativeText } from "native-base";
import { subURL } from "../../../components/utils/URL's";

export var ID;

const TeachersTransport = () => {
  const navigation = useNavigation();
  const [busLabel, setBusLabel] = useState(false);
  const [vehLabel, setVehLabel] = useState(false);
  const [typeLabel, setTypeLabel] = useState(false);
  const [driverLabel, setDriverLabel] = useState(false);
  const [mobLabel, setMobLabel] = useState(false);
  const [rootLabel, setRootLabel] = useState(false);
  const [stopLabel, setStopLabel] = useState(false);

  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, 100);

  const headermax = 100;
  const headermin = 10;

  const animateHeaderBackGround = scrollY.interpolate({
    inputRange: [0, headermax - headermin],
    outputRange: ["white", "white"],
    extrapolate: "clamp",
  });

  const animateHeaderHeight = diffClamp.interpolate({
    inputRange: [0, headermax - headermin],
    outputRange: [headermax, headermin],
    extrapolate: "clamp",
  });

  const [top, setTop] = useState(false);
  const [btn, setBtn] = useState(false);

  const [offset, SetOffset] = useState(0);

  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVehFocused, setIsVehFocused] = useState(false);
  const [isTypeFocused, setIsTypeFocused] = useState(false);
  const [isDriverFocused, setIsDriverFocused] = useState(false);
  const [isMobFocused, setIsMobFocused] = useState(false);
  const [isRouteFocused, setIsRouteFocused] = useState(false);
  const [isStopFocused, setIsStopFocused] = useState(false);
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
  const enteredMobileIsValid = mobile.toString().length == 10;
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

  const [loading, setLoading] = useState(false);
  let i = 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Transportreport/`);
        setData(res.data);
        setFilteredData(res.data);
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
      // setLoading(false);
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
      emp_mobile: mobile.toString(),
      route_name: routename,
      stop_name: stopname,
    };

    if (
      !enteredBusnumberIsValid ||
      !enteredVehicleNoIsValid ||
      !enteredDrivernameIsValid ||
      !enteredMobileIsValid ||
      !enteredRoutenameIsValid ||
      !enteredStopnameIsValid
    ) {
      Alert.alert("Please enter all fields");
    } else {
      async function updateData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };

          const resLogin = await axios.put(
            `${subURL}/Transportreport/${ID}/`,
            FormData,
            {
              headers: headers,
            }
          );

          console.log(resLogin.data);
        } catch (error) {
          console.log(error);
        }
      }
      updateData();

      setShowForm(false);
      setShowList(true);
      Alert.alert("Successfully updated", "", [
        {
          text: "OK",
          onPress: () => {
            showTransport();
          },
        },
      ]);
    }
    //  }
  }

  function buttonPressedHandler() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    setBtn(true);

    const FormData = {
      busnumber: busNumber,
      vehicleno: vehicleno,
      types: type,
      driver_name: drivername,
      emp_mobile: mobile,
      route_name: routename,
      stop_name: stopname,
    };

    //  console.log(FormData);

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
        const res = await axios.get(`${subURL}/Transportreport/`);

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
                `${subURL}/Transportreport/`,
                FormData,
                {
                  headers: headers,
                }
              );

              console.log(resLogin.data);
            } catch (error) {
              console.log(error);
            }
          }
          storeData();
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
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }

  function busnumberInputBlur() {
    setEnteredBusnumberTouched(true);
    setIsFocused(false);
  }
  function onFocusBusHandler() {
    setIsFocused(true);
    setEnteredBusnumberTouched(false);
    setBusLabel(true);
  }

  function vehicleInputBlur() {
    setEnteredVehicleNoTouched(true);
    setIsVehFocused(false);
  }
  function onFocusVehHandler() {
    setIsVehFocused(true);
    setEnteredVehicleNoTouched(false);
    setVehLabel(true);
    setTop(true);
  }

  function typeInputBlur() {
    setEnteredTypeTouched(true);
    setIsTypeFocused(false);
  }
  function onFocusTypeHandler() {
    setIsTypeFocused(true);
    setEnteredTypeTouched(false);
    setTypeLabel(true);
    setTop(true);
  }

  function drivernameInputBlur() {
    setEnteredDrivernameTouched(true);
    setIsDriverFocused(false);
  }
  function onFocusDriverHandler() {
    setIsDriverFocused(true);
    setEnteredDrivernameTouched(false);
    setDriverLabel(true);
    setTop(true);
  }

  function mobilenumberInputBlur() {
    setEnteredMobileTouched(true);
    setIsMobFocused(false);
  }
  function onFocusMobHandler() {
    setIsMobFocused(true);
    setEnteredMobileTouched(false);
    setMobLabel(true);
    setTop(true);
  }

  function routenameInputBlur() {
    setEnteredRoutenameTouched(true);
    setIsRouteFocused(false);
  }
  function onFocusRouteHandler() {
    setIsRouteFocused(true);
    setEnteredRoutenameTouched(false);
    setRootLabel(true);
    setTop(true);
  }

  function stopnameInputBlur() {
    setEnteredStopnameTouched(true);
    setIsStopFocused(false);
  }
  function onFocusStopHandler() {
    setIsStopFocused(true);
    setEnteredStopnameTouched(false);
    setStopLabel(true);
    setTop(true);
  }

  function showTransportForm() {
    setBusLabel(false);
    setVehLabel(false);
    setTypeLabel(false);
    setDriverLabel(false);
    setMobLabel(false);
    setRootLabel(false);
    setStopLabel(false);
    setForTransportForm({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,

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

    setEnteredBusNumber("");
    setEnteredVehicleNo("");
    setEnteredType("");
    setEnteredDriverName("");
    setEnteredMobile("");
    setEnteredRouteName("");
    setEnteredStopName("");

    setIsFocused(false);
    setIsVehFocused(false);
    setIsTypeFocused(false);
    setIsDriverFocused(false);
    setIsMobFocused(false);
    setIsRouteFocused(false);
    setIsStopFocused(false);
  }
  function showTransport() {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Transportreport/`);
        console.log(res.data);

        setFilteredData(res.data);

        setShowForm(false);
        setShowList(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

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

  // function editItem(id) {
  //   setShowInitialBtn(false);
  //   setBusLabel(true);
  //   setVehLabel(true);
  //   setTypeLabel(true);
  //   setDriverLabel(true);
  //   setMobLabel(true);
  //   setRootLabel(true);
  //   setStopLabel(true);

  //   ID = id;
  //   const filteredDummuyData = data.find((data) => data.id == id);

  //   setEnteredBusNumber(filteredDummuyData.busnumber);
  //   setEnteredVehicleNo(filteredDummuyData.vehicleno);

  //   setEnteredDriverName(filteredDummuyData.driver_name);
  //   setEnteredMobile(filteredDummuyData.emp_mobile);
  //   setEnteredRouteName(filteredDummuyData.route_name);
  //   setEnteredStopName(filteredDummuyData.stop_name);
  //   setForTransportList({
  //     backgroundColor: "#F4F6F6",
  //     color: "black",
  //     borderRadius: 10,
  //   });
  //   setForTransportForm({
  //     color: "white",
  //     backgroundColor: "#1E8449",
  //     borderRadius: 10,
  //   });
  // }

  function editItem(id) {
    setShowInitialBtn(false);
    setBusLabel(true);
    setVehLabel(true);
    setTypeLabel(true);
    setDriverLabel(true);
    setMobLabel(true);
    setRootLabel(true);
    setStopLabel(true);
    ID = id;
    console.log(id);
    const filteredDummuyData = data.find((data) => data.id == id);

    setEnteredBusNumber(filteredDummuyData.busnumber);
    setEnteredVehicleNo(filteredDummuyData.vehicleno);

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
          `${subURL}/Transportreport/${busnumber}/`,
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
          const res = await axios.get(`${subURL}/Transportreport/`);

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

  function scrollHanlder(event) {
    var currentOffset = event.nativeEvent.contentOffset.y;
    var direction = currentOffset > offset ? "down" : "up";
    if (direction == "down") {
      setShowInitialBtn(false);
    } else {
      setShowInitialBtn(true);
    }
  }

  return (
    <>
      <View style={[styles.mainContainer]}>
        <View style={[styles.headingView,
          keyboardStatus=='Keyboard Shown'&& styles.headingViewNew]}>
          <NativeText bold style={styles.textStyle}>
            Bus and Driver Details
          </NativeText>
        </View>
        <View style={{ flex: 2, backgroundColor: "white" }}>
          <SearchBar
            style={styles.searchBar}
            textInputStyle={{
              fontFamily: "HindRegular",
              fontSize: 18,
            }}
            placeholder="Search here"
            onChangeText={(text) => searchFilter(text)}
            value={searchText}
          />
          <ScrollView>
            {filteredData &&
              filteredData.map((data, key) => (
                <Card style={[styles.card]}>
                  <Card.Content style={{ marginTop: 0 }}>
                    <View style={styles.flexStyleRow}>
                      <View style={styles.flexData1}>
                        <Text style={[styles.cardTextStyle]}>Driver Name</Text>
                      </View>
                      <View style={styles.flexData}>
                        <Text style={styles.cardData}>{data.driver_name}</Text>
                      </View>
                    </View>
                    <View style={styles.flexStyleRow}>
                      <View style={styles.flexData1}>
                        <Text style={[styles.cardTextStyle]}>Bus Number</Text>
                      </View>
                      <View style={styles.flexData}>
                        <Text style={styles.cardData}>{data.busnumber}</Text>
                      </View>
                    </View>
                    <View style={styles.flexStyleRow}>
                      <View style={styles.flexData1}>
                        <Text style={[styles.cardTextStyle]}>
                          Vehicle Number
                        </Text>
                      </View>
                      <View style={styles.flexData}>
                        <Text style={styles.cardData}>{data.vehicleno}</Text>
                      </View>
                    </View>

                    <View style={styles.flexStyleRow}>
                      <View style={styles.flexData1}>
                        <Text style={[styles.cardTextStyle]}>
                          Contact Number
                        </Text>
                      </View>
                      <View style={styles.flexData}>
                        <Text style={styles.cardData}>{data.emp_mobile}</Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              ))}
          </ScrollView>
        </View>
        {keyboardStatus == "Keyboard Hidden" && (
          <View style={{ flex: 0.2, backgroundColor: "white" }}>
            <TeachersHome />
          </View>
        )}
      </View>
    </>
  );
  {
    /* {showInitialBtn && (
            <Animated.View
              style={[
                {
                  height: animateHeaderHeight,
                  backgroundColor: animateHeaderBackGround,
                },
              ]}
            >
              <View style={styles.BtnContainer}>
                <BgButton onPress={showTransportForm} style={forTransportList}>
                  Add Transport
                </BgButton>

                <BgButton onPress={showTransport} style={forTransportForm}>
                  Show list
                </BgButton>
              </View>
            </Animated.View>
          )} */
  }
  {
    /* {showForm && (
            <>
              <ScrollView style={styles.root}>
                <View style={styles.inputForm}>
                  <View style={!busLabel ? styles.normal : styles.up}>
                    <Text
                      style={[
                        btn
                          ? styles.normalLabel
                          : busnumberInputIsInValid
                          ? styles.errorLabel
                          : styles.normalLabel,
                      ]}
                      onPress={onFocusBusHandler}
                      onPressOut={busnumberInputBlur}
                    >
                      Bus number
                    </Text>
                  </View>
                  <Input
                    keyboardType="number-pad"
                    onChangeText={busNumberChangeHandler}
                    blur={busnumberInputBlur}
                    onFocus={onFocusBusHandler}
                    value={busNumber}
                    onSubmitEditing={Keyboard.dismiss}
                    style={
                      isFocused
                        ? styles.focusStyle
                        : busnumberInputIsInValid && styles.errorBorderColor
                    }
                  />
                  {busnumberInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>Enter bus number</Text>
                  )}

                  <View>
                    <View style={!vehLabel ? styles.normalVeh : styles.upVeh}>
                      <Text
                        style={[
                          btn
                            ? styles.normalLabel
                            : vehicleNoInputIsInValid
                            ? styles.vehError
                            : styles.normalLabel,
                        ]}
                        onPress={onFocusVehHandler}
                      >
                        Vehicle number
                      </Text>
                    </View>
                    <Input
                      keyboardType="number-pad"
                      onChangeText={vehicleChangeHandler}
                      blur={vehicleInputBlur}
                      onFocus={onFocusVehHandler}
                      value={vehicleno}
                      onSubmitEditing={Keyboard.dismiss}
                      style={
                        isVehFocused
                          ? styles.focusStyle
                          : vehicleNoInputIsInValid && styles.errorBorderColor
                      }
                    />
                  </View>
                  {vehicleNoInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>
                      Enter vehicle number
                    </Text>
                  )}

                  {!isEdit && (
                    <View>
                      <View
                        style={!typeLabel ? styles.normalType : styles.upType}
                      >
                        <Text
                          style={[
                            btn
                              ? styles.normalLabel
                              : typeInputIsInValid
                              ? styles.errorLabel
                              : styles.normalLabel,
                          ]}
                          onPress={onFocusTypeHandler}
                        >
                          Transport Type
                        </Text>
                      </View>
                      <Input
                        onChangeText={typeChangeHandler}
                        blur={typeInputBlur}
                        onFocus={onFocusTypeHandler}
                        value={type}
                        onSubmitEditing={Keyboard.dismiss}
                        style={
                          isTypeFocused
                            ? styles.focusStyle
                            : typeInputIsInValid && styles.errorBorderColor
                        }
                      />
                    </View>
                  )}
                  {typeInputIsInValid && !isEdit && (
                    <Text style={styles.commonErrorMsg}>Enter type</Text>
                  )}

                  <View>
                    <View
                      style={
                        !driverLabel ? styles.normalDriver : styles.upDriver
                      }
                    >
                      <Text
                        style={[
                          btn
                            ? styles.normalLabel
                            : drivernameInputIsInValid
                            ? styles.errorLabel
                            : styles.normalLabel,
                        ]}
                        onPress={onFocusDriverHandler}
                      >
                        Driver name
                      </Text>
                    </View>
                    <Input
                      onChangeText={driverNameChangeHandler}
                      blur={drivernameInputBlur}
                      onFocus={onFocusDriverHandler}
                      value={drivername}
                      onSubmitEditing={Keyboard.dismiss}
                      style={
                        isDriverFocused
                          ? styles.focusStyle
                          : drivernameInputIsInValid && styles.errorBorderColor
                      }
                    />
                  </View>
                  {drivernameInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>Enter driver name</Text>
                  )}

                  <View>
                    <View style={!mobLabel ? styles.normalMob : styles.upMob}>
                      <Text
                        style={[
                          btn
                            ? styles.normalLabel
                            : mobileInputIsInValid
                            ? styles.errorLabel
                            : styles.normalLabel,
                        ]}
                        onPress={onFocusMobHandler}
                      >
                        Mobile number
                      </Text>
                    </View>
                    <Input
                      keyboardType="number-pad"
                      maxLength={10}
                      onChangeText={mobileChangeHandler}
                      blur={mobilenumberInputBlur}
                      onFocus={onFocusMobHandler}
                      value={mobile.toString()}
                      onSubmitEditing={Keyboard.dismiss}
                      style={
                        isMobFocused
                          ? styles.focusStyle
                          : mobileInputIsInValid && styles.errorBorderColor
                      }
                    />
                  </View>
                  {mobileInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>
                      Enter a valid mobile number(10 digits)
                    </Text>
                  )}

                  <View>
                    <View
                      style={!rootLabel ? styles.normalRoot : styles.upRoot}
                    >
                      <Text
                        style={[
                          btn
                            ? styles.normalLabel
                            : routenameInputIsInValid
                            ? styles.errorLabel
                            : styles.normalLabel,
                        ]}
                        onPress={onFocusRouteHandler}
                      >
                        Route name
                      </Text>
                    </View>
                    <Input
                      onChangeText={routeNameChangeHandler}
                      blur={routenameInputBlur}
                      onFocus={onFocusRouteHandler}
                      value={routename}
                      onSubmitEditing={Keyboard.dismiss}
                      style={
                        isRouteFocused
                          ? styles.focusStyle
                          : routenameInputIsInValid && styles.errorBorderColor
                      }
                    />
                  </View>
                  {routenameInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>Enter route name</Text>
                  )}

                  <View>
                    <View
                      style={!stopLabel ? styles.normalStop : styles.upStop}
                    >
                      <Text
                        style={[
                          btn
                            ? styles.normalLabel
                            : stopnameInputIsInValid
                            ? styles.errorLabel
                            : styles.normalLabel,
                        ]}
                        onPress={onFocusStopHandler}
                      >
                        Stop name
                      </Text>
                    </View>
                    <Input
                      // placeholder="Stop Name"
                      onChangeText={stopNameChangeHandler}
                      blur={stopnameInputBlur}
                      onFocus={onFocusStopHandler}
                      value={stopname}
                      onSubmitEditing={Keyboard.dismiss}
                      style={
                        isStopFocused
                          ? styles.focusStyle
                          : stopnameInputIsInValid && styles.errorBorderColor
                      }
                    />
                  </View>
                  {stopnameInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>Enter stop name</Text>
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
              {keyboardStatus == "Keyboard Hidden" && (
                <View style={{ flex: 1 }}>
                  <TeachersHome />
                </View>
              )}
            </>
          )} */
  }
  {
    /* {isSame && <View style={styles.th}>
                <Text style={styles.tableTitle}> Update</Text>
              </View>}
              {isSame && <View style={styles.th}>
                <Text style={styles.tableTitle}> Delete</Text>
              </View>} */
  }

  {
    /* {showList && ( */
  }
  <>
    {/* <Animated.View style={{transform:[
              {translateY:translateY}
            ]}}> */}
    {/* <NativeText fontSize="3xl">Transport List</NativeText> */}
  </>;
  {
    /* )} */
  }
};

export default TeachersTransport;

const deviceWidth = Dimensions.get("window").width;
const deviceHieght = Dimensions.get("window").height;

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    flexDirection: "column",
    backgroundColor:'white' 
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  flexData: {
    flex: 2,
    left: 40,
    top: 5,
  },
  flexData1: {
    flex: 2,
    left: 20,
    top: 5,
  },
  edititem: {
    flex: 1,
    top: 5,
    left: deviceWidth < 370 ? 190 : 200,
  },
  card: {
    margin: 5,
    marginVertical: 15,
    marginHorizontal: 25,
    elevation: 5,
    borderRadius: 10,
  },
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",
    // marginHorizontal: 10,
    width: "100%",
    //height:'100%',
    backgroundColor: "#FDFEFE",
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
    // backgroundColor: "#EBECFO",
    backgroundColor: "white",
    height: "100%",
    //  top: 10,
  },
  inputForm: {
    padding: "5%",
    paddingTop: "1%",
    backgroundColor: "white",
    height: "100%",
    //marginTop: -15,
  },
  errorBorderColor: {
    borderColor: "red",
  },

  btnSubmit: {
    marginTop: "2%",
    marginBottom: 30,

    marginLeft: "35%",
    width: "70%",
  },
  cardData: {
    fontSize: deviceWidth < 370 ? 14 : 16,
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
    // backgroundColor: "white",
    backgroundColor: "#F0F3F4",
    // height:deviceWidth < 370 ? "6%" : "6%",
  },
  focusStyle: {
    borderColor: "blue",
  },
  normal: {
    position: "absolute",
    top: deviceWidth < 370 ? 27 : 30,
    left: deviceWidth < 370 ? 40 : 50,
  },
  up: {
    position: "absolute",
    top: deviceWidth < 370 ? 2 : 7,
    left: deviceWidth < 370 ? 40 : 50,
    fontFamily: "HindRegular",
  },
  errorLabel: {
    color: "red",
    //  backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 17,
    fontFamily: "HindRegular",
  },
  normalLabel: {
    // color: "#A7ADAD",
    color: "#AEB6BF",
    // backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 16,
    letterSpacing: 0.5,
  },

  normalVeh: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },
  upVeh: {
    top: deviceWidth < 370 ? 15 : 25,
    width: deviceWidth < 370 ? 100 : 129,
    left: deviceWidth < 370 ? 20 : 30,
    color: "black",
    height: 20,
    fontFamily: "HindRegular",
  },
  vehError: {
    bottom: deviceWidth < 370 ? 15 : 3,
    color: "red",
    //  backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 16,
    fontFamily: "HindRegular",
  },

  normalType: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },
  upType: {
    top: deviceHieght > 800 ? 30 : 27,
    width: deviceWidth > 400 ? 130 : 130,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },

  normalDriver: {
    position: "absolute",
    top: 26,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },
  upDriver: {
    top: deviceHieght > 800 ? 30 : 25,
    width: deviceWidth < 370 ? 90 : 110,
    left: deviceWidth < 370 ? 20 : 35,
    fontFamily: "HindRegular",
  },

  normalMob: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },
  upMob: {
    top: deviceWidth < 370 ? 15 : 25,
    width: deviceWidth > 400 ? 130 : 130,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },

  normalRoot: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },
  upRoot: {
    top: deviceWidth < 370 ? 15 : 33,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 107 : 100,
    fontFamily: "HindRegular",
  },

  normalStop: {
    position: "absolute",
    top: deviceWidth < 370 ? 22 : 27,
    left: deviceWidth < 370 ? 20 : 30,
    fontFamily: "HindRegular",
  },
  upStop: {
    // position:'absolute',
    top: deviceWidth < 370 ? 15 : 27,
    left: deviceWidth < 370 ? 25 : 37,
    width: deviceWidth < 370 ? 80 : 95,
    fontFamily: "HindRegular",
  },

  commonErrorMsg: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 14 : 17,
  },
  flexStyleCol: {
    flex: 1,
    flexDirection: "column",
  },
  flexStyleRow: {
    flex: 1,
    flexDirection: "row",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  headingView: {
    flex: 0.2,
    backgroundColor: "white",
    alignItems: "center",
    marginVertical:17
  },
  headingViewNew: {
    flex: 0.5,
    backgroundColor: "white",
    alignItems: "center",
    marginVertical:27
  },
  textStyle: {
    fontSize: 18,
    fontFamily: "HindSemiBold",
    color: "#F0F3F4",

    backgroundColor: "#566573",
    padding: 15,
    borderRadius: 10,
  },
});

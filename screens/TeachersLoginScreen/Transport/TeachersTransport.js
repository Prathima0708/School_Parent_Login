// import { View, StyleSheet, Text, Linking, Dimensions } from "react-native";
// import React, { useEffect, useRef, useState } from "react";

// import axios from "axios";
// import * as Location from "expo-location";

// import { Image as NativeImage } from "native-base";

// import TeachersHome from "../BottomTab/TeachersHome";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";

// import { IconButton } from "native-base";
// import { subURL } from "../../../components/utils/URL's";
// import MapView, { Marker } from "react-native-maps";

// var USERID;

// const TeachersTransport = () => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);

//   const [isMapActive, setIsMapActive] = useState(true);

//   const [filteredData, setFilteredData] = useState([]);

//   const [userid, setUserid] = useState("");
//   let i = 0;
//   async function fetchUserId() {
//     USERID = await AsyncStorage.getItem("key");

//     if (USERID !== null) {
//       setUserid(USERID);
//     }
//   }
//   fetchUserId();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const staffRes = await axios.get(`${subURL}/Staff`);

//         const filteredRes = staffRes.data.filter(
//           (item) => item.user_id.id == userid
//         );

//         const res = await axios.get(
//           `${subURL}/TransportreportDetailList/${filteredRes[0]?.busnumber}`
//         );

//         setFilteredData(res.data);

//         let test = 0;
//         const value = await AsyncStorage.getItem("key");
//         for (i = 0; i < res.data.length; i++) {
//           if (value == res.data[i].created_by) {
//             test = res.data[i].created_by;
//           } else {
//           }
//         }
//         if (test == value) {
//           SetIsSame(true);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, [userid]);

//   useEffect(() => {
//     async function permissionHandler() {

//       if (Platform.OS !== "web") {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           setErrorMsg("Permission to access location was denied");
//           return;
//         }   
//       }
//     }
//     permissionHandler();
//   }, []);

//   useEffect(() => {
//     (async () => {
      
//       let location = await Location.getCurrentPositionAsync({});
//       setLatitude(location.coords.latitude);
//       setLongitude(location.coords.longitude);
//       setLocation(location.coords);
//     })();
//   }, [latitude, longitude]);

//   const myRef = useRef(null);

//   useEffect(() => {
//     if (myRef.current && myRef.current.setNativeProps) {
//       const styleObj = {
//         borderRadius: 100,
//       };
//       myRef.current.setNativeProps({
//         style: styleObj,
//       });
//     }
//   }, [myRef]);

//   function mapViewPressedHandler() {
//     setIsMapActive(true);
//   }

//   function callBtnPressedHandler(mobile_number) {
//     Linking.openURL(`tel:${mobile_number}`);
//   }
//   return (
//     <>
//       <View
//         style={[
//           {
//             flex: 1,
//             flexDirection: "column",
//           },
//         ]}
//       >
//         {filteredData.length > 0 && (
//           <View style={{ flex: 0.36, backgroundColor: "#1E84A4" }}></View>
//         )}
//         <View style={{ flex: 0.4, backgroundColor: "white" }}>
//           {filteredData.length <= 0 ? (
//             <View
//               style={{
//                 alignItems: "center",

//                 marginTop: "15%",
//               }}
//             >
//               <Text style={styles.msgText}>No transport record found</Text>
//             </View>
//           ) : (
//             filteredData.map((data) => (
//               <View style={styles.cardStyle}>
//                 <View style={{ flex: 0.7 }}>
//                   <View style={styles.flexCol}>
//                     <View style={{ flex: 1, justifyContent: "center" }}>
//                       <NativeImage
//                         left={5}
//                         borderRadius={100}
//                         source={{
//                           uri: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACv0lEQVR4nO2Zz2sTURDHnxVFUcEKRal5E/E3xZs3RS+9iaJnQbGg/gX+wIMsZGYTRIoeirQgtN2ZbXARqaIgeLJVUNCLoD1pETxUtB68CGobea2N2qZtNrvte8V84XsIZMl8mJk3ebNK1VXX0lK2UNwCKCeAwouAcg1I2jXJJfC5tcWLViqn5XkNGQzaNMprICnNZo3yHnJyWLmoTX7UBMjP5wL41/wDkIuawiPKFUEhbATiV9VDTMsQ8YNdV26us82hALm7VoiykfsdaGr+mRjE2OdWayBAfD4ViEn32QNB7k8NBOWDPZAETV6hT8atzZj5ZkZsF8LGpZ8RklKTF621AqJRXqZYWl+ULQHKrfQywi/sgRBfTgtEo7A1kEwuOJZeRsKz1kCyvhxPLSMUnLQGokmeplda/MQeCPJQehmRNxZB5E6KzX7bGoi5EaaYkVPWQPZ2da0A4seJQVAGrN/lTQAaeSRBk49Yh5gSkPQkyEiPckXgy/6aM+LzAeWSNMr9+CD8SLkm7fU1A/GnGMftV3PnVy4KSJ7FaPIh5ap0jPuJ0yBAfCNGj7QrV5Vpj1abVWgVA7DXmdnxtzJ+sMds38ufUQ5qYtHIw5rk22+/08QBYLDvz/eCNvC5RdlWJh9s18QdE0vpyT1uR9brXj/vc160YaoMNcp3IOnM+uFutajyvAbzWgCQHwLJWIWy+WyCzObCQ5tz4Y6NV4M1xs353p0Tz5F0AvHozOd43MwVTXJURdHyBYvfrGoA5Rwgv038J3H+E20YUC6ku6UvlZYB8WlN8nGhAWA6kPlNlDMmhkQMpiSA5O5iA8DMsrtnYqn9KCUetA5B5d4byHrdq2KDAMl168FTwiGqsbit4olk32NQCLdWnw3kvANBl2axb2Vflb55sPqMVBpYzphHY5xWtoOVOV3T6VVXXf+xfgGvhBsEBNjG/AAAAABJRU5ErkJggg==`,
//                         }}
//                         alt="Student Image"
//                         size="md"
//                         ref={myRef}
//                         resizeMode="contain"
//                       />
//                     </View>
//                     <View style={{ flex: 0.3, left: 30, bottom: 7 }}></View>
//                   </View>
//                 </View>
//                 <View style={{ flex: 1 }}>
//                   <View style={styles.flexCol}>
//                     <View style={{ flex: 1 }}>
//                       <View style={styles.flexRow}>
//                         <View style={{ flex: 0.5, justifyContent: "center" }}>
//                           <Text style={styles.lableStyle}>Bus No:</Text>
//                         </View>
//                         <View style={{ flex: 1, justifyContent: "center" }}>
//                           <Text style={styles.textStyle}>{data.busnumber}</Text>
//                         </View>
//                       </View>
//                       <View style={styles.flexRow}>
//                         <View style={{ flex: 1.5, justifyContent: "center" }}>
//                           <Text style={styles.lableStyle}>Driver mob:</Text>
//                         </View>
//                         <View style={{ flex: 1.4, justifyContent: "center" }}>
//                           <Text style={styles.textStyle}>
//                             {data.emp_mobile}
//                           </Text>
//                         </View>
//                       </View>
//                       <View style={styles.flexRow}>
//                         <View style={{ flex: 1.3, justifyContent: "center" }}>
//                           <Text style={styles.lableStyle}>Vehicle No:</Text>
//                         </View>
//                         <View style={{ flex: 1.4, justifyContent: "center" }}>
//                           <Text style={styles.textStyle}>{data.vehicleno}</Text>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//                 <View style={{ flex: 0.3 }}>
//                   <View style={styles.flexCol}>
//                     <View
//                       style={{
//                         flex: 1,
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <IconButton
//                         colorScheme="lightBlue"
//                         onPress={() => callBtnPressedHandler(data.emp_mobile)}
//                         variant="solid"
//                         borderRadius="full"
//                         _icon={{
//                           as: Ionicons,
//                           name: "call",
//                         }}
//                       />
//                     </View>
//                     <View
//                       style={{
//                         flex: 1,
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <IconButton
//                         colorScheme="lightBlue"
//                         onPress={mapViewPressedHandler}
//                         variant="solid"
//                         borderRadius="full"
//                         _icon={{
//                           as: Ionicons,
//                           name: "location",
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             ))
//           )}
//         </View>
//         <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 40 }}>
//           {/* {isMapActive && (
//             <MapView
//               style={[styles.map]}
//               region={{
//                 latitude: latitude,
//                 longitude: longitude,
//                 latitudeDelta: 0.015,
//                 longitudeDelta: 0.0121,
//               }}
//             >
//               <Marker
//                 coordinate={{
//                   latitude: latitude ? latitude : 0,
//                   longitude: longitude ? longitude : 0,
//                 }}
//               />
//             </MapView>
//           )} */}
//           {isMapActive && (
//             <View
//               style={[
//                 {
//                   // Try setting `flexDirection` to `"row"`.
//                   flex: 1,
//                   flexDirection: "row",
//                   justifyContent: "center",
//                   marginTop: "5%",
//                 },
//               ]}
//             >
//               <View style={{ flex: 0.2, alignItems: "center" }}>
//                 <Entypo name="location" size={24} color="black" />
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.labelStyle}>
//                   Live location tracking coming soon...
//                 </Text>
//               </View>
//             </View>
//           )}
//         </View>
//         <View style={{ flex: 0.1 }}>
//           <TeachersHome />
//         </View>
//       </View>
//     </>
//   );
// };

// export default TeachersTransport;

// const deviceHieght = Dimensions.get("window").height;
// const deviceWidth = Dimensions.get("window").width;
// const styles = StyleSheet.create({
//   map: {
//     height: "100%",
//     bottom: "5%",
//     marginHorizontal: 13,
//   },
//   textStyle: {
//     fontSize: 16,
//     fontFamily: "HindRegular",
//   },

//   lableStyle: {
//     fontFamily: "HindMedium",
//     fontSize: 17,
//   },

//   msgText: {
//     fontSize: 18,
//     fontFamily: "HindSemiBold",
//     color: "#6B0000",
//   },
//   flexCol: {
//     flex: 1,
//     flexDirection: "column",
//   },
//   flexRow: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   cardStyle: {
//     flex: 1,
//     flexDirection: "row",
//     bottom: "16%",
//     marginHorizontal: 10,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 10,
//   },
// });
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Dimensions,
  Animated,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import { Image as NativeImage } from "native-base";
import BgButton from "../../../components/UI/BgButton";
import TeachersHome from "../BottomTab/TeachersHome";
import Input from "../../../components/UI/Input";

import { Card } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, Ionicons } from "@expo/vector-icons";
import SearchBar from "react-native-dynamic-search-bar";
import { useNavigation } from "@react-navigation/native";
import { Heading, IconButton, Spinner, Text as NativeText } from "native-base";
import { subURL } from "../../../components/utils/URL's";
import MapView from "react-native-maps";

export var ID;
var USERID;

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

  const [isMapActive, setIsMapActive] = useState(true);
  const [isPhoneActive, setIsPhoneActive] = useState(false);

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSame, SetIsSame] = useState(false);
  const [showInitialBtn, setShowInitialBtn] = useState(true);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [loading, setLoading] = useState(false);
  const [userid, setUserid] = useState("");
  let i = 0;
  async function fetchUserId() {
    USERID = await AsyncStorage.getItem("key");

    if (USERID !== null) {
      setUserid(USERID);
    }
  }
  fetchUserId();
  useEffect(() => {
    async function fetchData() {
      try {
        const staffRes = await axios.get(`${subURL}/Staff`);

        const filteredRes = staffRes.data.filter(
          (item) => item.user_id.id == userid
        );

        const res = await axios.get(
          `${subURL}/TransportreportDetailList/${filteredRes[0]?.busnumber}`
        );
        setData(res.data);

        setFilteredData(res.data);
        let test = 0;
        const value = await AsyncStorage.getItem("key");
        for (i = 0; i < res.data.length; i++) {
          if (value == res.data[i].created_by) {
            test = res.data[i].created_by;
          } else {
          }
        }
        if (test == value) {
          SetIsSame(true);
        }
      } catch (error) {
        console.log(error);
      }
      // setLoading(false);
    }
    fetchData();
  }, [userid]);

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

  const myRef = useRef(null);

  useEffect(() => {
    if (myRef.current && myRef.current.setNativeProps) {
      const styleObj = {
        //borderWidth: 3,
        borderRadius: 100,
        //borderColor: "#577AFE",
      };
      myRef.current.setNativeProps({
        style: styleObj,
      });
    }
  }, [myRef]);

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
            } catch (error) {
              console.log(error);
            }
          }
          storeData();
          Alert.alert("Saved Data", "Saved Data successfully", [
            {
              text: "Cancel",

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
    Alert.alert("Confirm Deletion", "You are about to delete this row!", [
      {
        text: "Cancel",

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
  function mapViewPressedHandler() {
    setIsMapActive(true);
  }

  function callBtnPressedHandler(mobile_number) {
    Linking.openURL(`tel:${mobile_number}`);
  }
  return (
    <>
      <View
        style={[
          {
            // Try setting `flexDirection` to `"row"`.
            flex: 1,
            flexDirection: "column",
          },
        ]}
      >
        {filteredData.length > 0 && (
          <View style={{ flex: 0.36, backgroundColor: "#1E84A4" }}></View>
        )}
        <View style={{ flex: 0.4, backgroundColor: "white" }}>
          {filteredData.length <= 0 ? (
            <View
              style={{
                alignItems: "center",
              
                marginTop: "15%",
              }}
            >
              <Text style={styles.msgText}>No transport record found</Text>
            </View>
          ) : (
            filteredData.map((data) => (
              <View
                style={[
                  {
                    // Try setting `flexDirection` to `"row"`.
                    flex: 1,
                    flexDirection: "row",
                    bottom: "16%",
                    marginHorizontal: 10,
                    backgroundColor: "#E0E0E0",
                    borderRadius: 10,
                  },
                ]}
              >
                <View style={{ flex: 0.7 }}>
                  <View
                    style={[
                      {
                        // Try setting `flexDirection` to `"row"`.
                        flex: 1,
                        flexDirection: "column",
                      },
                    ]}
                  >
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <NativeImage
                        //alignSelf="center"
                        left={5}
                        borderRadius={100}
                        source={{
                          uri: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACv0lEQVR4nO2Zz2sTURDHnxVFUcEKRal5E/E3xZs3RS+9iaJnQbGg/gX+wIMsZGYTRIoeirQgtN2ZbXARqaIgeLJVUNCLoD1pETxUtB68CGobea2N2qZtNrvte8V84XsIZMl8mJk3ebNK1VXX0lK2UNwCKCeAwouAcg1I2jXJJfC5tcWLViqn5XkNGQzaNMprICnNZo3yHnJyWLmoTX7UBMjP5wL41/wDkIuawiPKFUEhbATiV9VDTMsQ8YNdV26us82hALm7VoiykfsdaGr+mRjE2OdWayBAfD4ViEn32QNB7k8NBOWDPZAETV6hT8atzZj5ZkZsF8LGpZ8RklKTF621AqJRXqZYWl+ULQHKrfQywi/sgRBfTgtEo7A1kEwuOJZeRsKz1kCyvhxPLSMUnLQGokmeplda/MQeCPJQehmRNxZB5E6KzX7bGoi5EaaYkVPWQPZ2da0A4seJQVAGrN/lTQAaeSRBk49Yh5gSkPQkyEiPckXgy/6aM+LzAeWSNMr9+CD8SLkm7fU1A/GnGMftV3PnVy4KSJ7FaPIh5ap0jPuJ0yBAfCNGj7QrV5Vpj1abVWgVA7DXmdnxtzJ+sMds38ufUQ5qYtHIw5rk22+/08QBYLDvz/eCNvC5RdlWJh9s18QdE0vpyT1uR9brXj/vc160YaoMNcp3IOnM+uFutajyvAbzWgCQHwLJWIWy+WyCzObCQ5tz4Y6NV4M1xs353p0Tz5F0AvHozOd43MwVTXJURdHyBYvfrGoA5Rwgv038J3H+E20YUC6ku6UvlZYB8WlN8nGhAWA6kPlNlDMmhkQMpiSA5O5iA8DMsrtnYqn9KCUetA5B5d4byHrdq2KDAMl168FTwiGqsbit4olk32NQCLdWnw3kvANBl2axb2Vflb55sPqMVBpYzphHY5xWtoOVOV3T6VVXXf+xfgGvhBsEBNjG/AAAAABJRU5ErkJggg==`,
                        }}
                        alt="Student Image"
                        size="md"
                        ref={myRef}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{ flex: 0.3, left: 30, bottom: 7 }}>
                      {/* <Text style={styles.cardTextStyle}>{StudentName}</Text> */}
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View
                    style={[
                      {
                        // Try setting `flexDirection` to `"row"`.
                        flex: 1,
                        flexDirection: "column",
                      },
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <View
                        style={[
                          {
                            // Try setting `flexDirection` to `"row"`.
                            flex: 1,
                            flexDirection: "row",
                          },
                        ]}
                      >
                        <View style={{ flex: 0.5, justifyContent: "center" }}>
                          <Text style={styles.lableStyle}>Bus No:</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                          <Text style={styles.textStyle}>{data.busnumber}</Text>
                        </View>
                      </View>
                      <View
                        style={[
                          {
                            // Try setting `flexDirection` to `"row"`.
                            flex: 1,
                            flexDirection: "row",
                          },
                        ]}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.textStyle}>
                            Left From School At 2.00pm
                          </Text>
                        </View>
                        {/* <View style={{flex: 1}} >
                          <Text>{data.busnumber}</Text>
                        </View> */}
                      </View>
                      <View
                        style={[
                          {
                            // Try setting `flexDirection` to `"row"`.
                            flex: 1,
                            flexDirection: "row",
                            top: 10,
                          },
                        ]}
                      >
                        <View style={{ flex: 0.5 }}>
                          <Text style={styles.cardTextStyle}>Current:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.textStyle}>Udupi bus stop</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 0.3 }}>
                  <View
                    style={[
                      {
                        // Try setting `flexDirection` to `"row"`.
                        flex: 1,
                        flexDirection: "column",
                      },
                    ]}
                  >
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        colorScheme="lightBlue"
                        onPress={() => callBtnPressedHandler(data.emp_mobile)}
                        variant="solid"
                        borderRadius="full"
                        _icon={{
                          as: Ionicons,
                          name: "call",
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        colorScheme="lightBlue"
                        onPress={mapViewPressedHandler}
                        variant="solid"
                        borderRadius="full"
                        _icon={{
                          as: Ionicons,
                          name: "location",
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
        <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 40 }}>
          {isMapActive && (
            <View
              style={[
                {
                  // Try setting `flexDirection` to `"row"`.
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "5%",
                },
              ]}
            >
              <View style={{ flex: 0.2, alignItems: "center" }}>
                <Entypo name="location" size={24} color="black" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.labelStyle}>
                  Live location tracking coming soon...
                </Text>
              </View>
            </View>
          )}
          {/* {isMapActive && <MapView style={[styles.map]} />} */}
        </View>
        <View style={{ flex: 0.1 }}>
          <TeachersHome />
        </View>
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
  container: {
    flex: 5,
    backgroundColor: "white",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    //width: Dimensions.get("window").width,
    height: "100%",
    bottom: "5%",
    marginHorizontal: 13,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: "HindMedium",
  },
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
  },
  lableStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
  },
  iconStyle: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    //top: deviceWidth < 370 ? 20 : 25,
  },
  labelStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 18,
    color: "red",
  },
  itemStyle: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "#275932",
    top: 10,
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  locationView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardStyle: {
    flex: 0.5,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 5,
    top: deviceWidth < 370 ? 20 : 25,
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 5,
  },
  msgText: {
    fontSize: 18,
    fontFamily: "HindSemiBold",
    color: "#6B0000",
  },
});

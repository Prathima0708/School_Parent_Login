// import { View, StyleSheet, Text, Linking, Dimensions } from "react-native";
// import React, { useEffect, useRef, useState } from "react";

// import axios from "axios";
// import * as Location from "expo-location";

// import { Image as NativeImage } from "native-base";

// import TeachersHome from "../BottomTab/TeachersHome";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Entypo, Ionicons } from "@expo/vector-icons";

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

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Dimensions } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { subURL } from "../../../components/utils/URL's";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// const { width, height } = Dimensions.get("window");
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// var USERID;

// const GOOGLE_MAPS_API_KEY = "AIzaSyAQ4dDTdbmLfQ00RrrqSRR9PK89KCYGrIA";

// const TeachersTransport = () => {
//   const [startPlace, setStartPlace] = useState(null);
//   const [endPlace, setEndPlace] = useState(null);
//   const [userid, setUserid] = useState("");
//   async function fetchUserId() {
//     USERID = await AsyncStorage.getItem("key");

//     if (USERID !== null) {
//       setUserid(USERID);
//     }
//   }
//   fetchUserId();

//   useEffect(() => {
//     const fetchGeocodedLocations = async () => {
//       const staffRes = await axios.get(`${subURL}/Staff`);

//       const filteredRes = staffRes.data.filter(
//         (item) => item.user_id.id == userid
//       );
//       const apiUrl = `${subURL}/TransportreportDetailList/${filteredRes[0]?.busnumber}`;
//       const response = await fetch(apiUrl);

//       const data = await response.json();
//       console.log(data);
//       if (data && data.route_name && data.stop_name) {
//         setStartPlace(await fetchGeocodedLocation(data.route_name));
//         setEndPlace(await fetchGeocodedLocation(data.stop_name));
//       }
//     };

//     fetchGeocodedLocations();
//   }, [userid]);

//   const fetchGeocodedLocation = async (place) => {
//     const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//       place
//     )}&key=${GOOGLE_MAPS_API_KEY}`;
//     const response = await fetch(geocodingUrl);
//     const data = await response.json();
//     console.log("location is", data);
//     if (data.status === "OK") {
//       const location = data.results[0].geometry.location;

//       return {
//         latitude: location.lat,
//         longitude: location.lng,
//       };
//     } else {
//       console.warn(`Error fetching location for "${place}":`, data);
//       return null;
//     }
//   };
//   return (
//     <View style={styles.container}>
//       {startPlace && endPlace && (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: startPlace.latitude,
//             longitude: startPlace.longitude,
//             latitudeDelta: 0.09,
//             longitudeDelta: 0.035,
//           }}
//         >
//           <Marker
//             coordinate={{
//               latitude: startPlace.latitude,
//               longitude: startPlace.longitude,
//             }}
//             title={"Start Location"}
//             description={"This is the starting location"}
//           />
//           <Marker
//             coordinate={{
//               latitude: endPlace.latitude,
//               longitude: endPlace.longitude,
//             }}
//             title={"End Location"}
//             description={"This is the ending location"}
//           />
//         </MapView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default TeachersTransport;

// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Text } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";

// function TeachersTransport() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [subscription, setSubscription] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestBackgroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       let sub = await Location.watchPositionAsync(
//         { accuracy: Location.Accuracy.High, timeInterval: 1000 },
//         (location) => {
//           setLocation(location.coords);
//         }
//       );

//       setSubscription(sub);
//     })();

//     return () => {
//       if (subscription) {
//         subscription.remove();
//         setSubscription(null);
//       }
//     };
//   }, []);

//   let marker = null;
//   if (location) {
//     marker = <Marker coordinate={location} />;
//   }

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         region={{ ...location, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
//       >
//         {marker}
//       </MapView>
//       {errorMsg && <Text>{errorMsg}</Text>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default TeachersTransport;

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import TeachersHome from "../BottomTab/TeachersHome";
import { useNavigation } from "@react-navigation/native";

const TeachersTransport = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    pickUpCords: {
      latitude: 12.9141,
      longitude: 74.856,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropLocationCords: {
      latitude: 13.3409,
      longitude: 74.7421,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const mapRef = useRef();

  const { pickUpCords, dropLocationCords } = state;

  const navigateLocation = () => {
    navigation.navigate("chooseLocation", {
      getCordinates: fetchValues,
    });
  };

  const fetchValues = (data) => {
    console.log(data);
    // setState({
    //   pickUpCords: {
    //     latitude: data.pickUpCords.latitude,
    //     longitude: data.pickUpCords.longitude,
    //   },
    //   dropLocationCords: {
    //     latitude: data.destinationCords.latitude,
    //     longitude: data.destinationCords.longitude,
    //   },
    // });
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={pickUpCords}
          ref={mapRef}
        >
          <Marker
            coordinate={pickUpCords}
            image={require("../../../assets/images/Oval.png")}
          />
          <Marker
            coordinate={dropLocationCords}
            image={require("../../../assets/images/greenMarker.png")}
          />
          <MapViewDirections
            origin={pickUpCords}
            destination={dropLocationCords}
            apikey="AIzaSyAUSeU7kuqfNJ_vpxmO1rO9gEOkSGWEpgQ"
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onReady={(result) => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100,
                },
              });
            }}
          />
        </MapView>
      </View>
      <View style={styles.bottomCard}>
        <Text>Track your Child's live location</Text>
        <TouchableOpacity style={styles.inputStyle} onPress={navigateLocation}>
          <Text>Choose your location</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TeachersTransport;

const styles = StyleSheet.create({
  bottomCard: {
    backgroundColor: "white",
    width: "100%",
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inputStyle: {
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    marginTop: 16,
  },
});

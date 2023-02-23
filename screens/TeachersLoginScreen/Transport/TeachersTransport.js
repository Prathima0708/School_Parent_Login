import { View, StyleSheet, Text, Linking, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import * as Location from "expo-location";

import { Image as NativeImage } from "native-base";

import TeachersHome from "../BottomTab/TeachersHome";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import { IconButton } from "native-base";
import { subURL } from "../../../components/utils/URL's";
import MapView, { Marker } from "react-native-maps";

var USERID;

const TeachersTransport = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [isMapActive, setIsMapActive] = useState(true);

  const [filteredData, setFilteredData] = useState([]);

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
    }
    fetchData();
  }, [userid]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setLocation(location.coords);
    })();
  }, [latitude, longitude]);

  const myRef = useRef(null);

  useEffect(() => {
    if (myRef.current && myRef.current.setNativeProps) {
      const styleObj = {
        borderRadius: 100,
      };
      myRef.current.setNativeProps({
        style: styleObj,
      });
    }
  }, [myRef]);

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
              <View style={styles.cardStyle}>
                <View style={{ flex: 0.7 }}>
                  <View style={styles.flexCol}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <NativeImage
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
                    <View style={{ flex: 0.3, left: 30, bottom: 7 }}></View>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.flexCol}>
                    <View style={{ flex: 1 }}>
                      <View style={styles.flexRow}>
                        <View style={{ flex: 0.5, justifyContent: "center" }}>
                          <Text style={styles.lableStyle}>Bus No:</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                          <Text style={styles.textStyle}>{data.busnumber}</Text>
                        </View>
                      </View>
                      <View style={styles.flexRow}>
                        <View style={{ flex: 1.5, justifyContent: "center" }}>
                          <Text style={styles.lableStyle}>Driver mob:</Text>
                        </View>
                        <View style={{ flex: 1.4, justifyContent: "center" }}>
                          <Text style={styles.textStyle}>
                            {data.emp_mobile}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.flexRow}>
                        <View style={{ flex: 1.3, justifyContent: "center" }}>
                          <Text style={styles.lableStyle}>Vehicle No:</Text>
                        </View>
                        <View style={{ flex: 1.4, justifyContent: "center" }}>
                          <Text style={styles.textStyle}>{data.vehicleno}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 0.3 }}>
                  <View style={styles.flexCol}>
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
            <MapView
              style={[styles.map]}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              <Marker
                coordinate={{
                  latitude: latitude ? latitude : 0,
                  longitude: longitude ? longitude : 0,
                }}
              />
            </MapView>
          )}
        </View>
        <View style={{ flex: 0.1 }}>
          <TeachersHome />
        </View>
      </View>
    </>
  );
};

export default TeachersTransport;

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  map: {
    height: "100%",
    bottom: "5%",
    marginHorizontal: 13,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: "HindRegular",
  },

  lableStyle: {
    fontFamily: "HindMedium",
    fontSize: 17,
  },

  msgText: {
    fontSize: 18,
    fontFamily: "HindSemiBold",
    color: "#6B0000",
  },
  flexCol: {
    flex: 1,
    flexDirection: "column",
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
  },
  cardStyle: {
    flex: 1,
    flexDirection: "row",
    bottom: "16%",
    marginHorizontal: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
  },
});

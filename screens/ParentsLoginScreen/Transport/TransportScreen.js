import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import { DataTable } from "react-native-paper";
import Button from "../../../components/UI/Button";
import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import { Card } from "react-native-paper";
import ParentsHome from "../BottomTab/ParentsHome";
import { Divider, IconButton } from "native-base";
import {
  busNumber,
  StudentName,
  StudentPhoto,
} from "../../../components/StudentItem/StudentItem";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Image as NativeImage } from "native-base";
import { mainURL, subURL } from "../../../components/utils/URL's";
import { Linking } from "react-native";
const TransportScreen = () => {
  const [forTransportList, setForTransportList] = useState({
    color: "black",
    fontWeight: "bold",
  });

  const [showTable, setShowTable] = useState(true);
  const [data, setData] = useState([]);

  const [isMapActive, setIsMapActive] = useState(true);
  const [isPhoneActive, setIsPhoneActive] = useState(false);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${subURL}/TransportreportDetailList/${busNumber}`
        );

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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
        <View style={{ flex: 0.36, backgroundColor: "#1E84A4" }}></View>
        <View style={{ flex: 0.4, backgroundColor: "white" }}>
          {data &&
            data.map((data) => (
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
                          uri: `${mainURL}${StudentPhoto}`,
                        }}
                        alt="Student Image"
                        size="md"
                        ref={myRef}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{ flex: 0.3, left: 30, bottom: 7 }}>
                      <Text style={styles.cardTextStyle}>{StudentName}</Text>
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
                        <View style={{ flex: 0.6, justifyContent: "center" }}>
                          <Text style={styles.lableStyle}>Bus No :</Text>
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
                          <Text
                            style={[
                              styles.textStyle,
                              { fontFamily: "HindRegular" },
                            ]}
                          >
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
                        <View style={{ flex: 0.6 }}>
                          <Text style={styles.cardTextStyle}>Current:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.textStyle}>Udupi</Text>
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
            ))}
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
          <ParentsHome />
        </View>
      </View>

      {/* <MapView style={styles.map} />
      
      {data &&
        data.map((data) => (
          <>
            <View style={styles.itemStyle}>
              <View style={styles.locationView}>
                <Text style={styles.textStyle}>
                  {data.route_name.charAt(0).toUpperCase() +
                    data.route_name.slice(1)}
                </Text>
              </View>
              <View style={styles.iconStyle}>
                <AntDesign
                  name="right"
                  size={deviceWidth < 370 ? 20 : 18}
                  color="white"
                />
              </View>
              <View style={styles.locationView}>
                <Text style={styles.textStyle}>
                  {data.stop_name.charAt(0).toUpperCase() +
                    data.stop_name.slice(1)}
                </Text>
              </View>
            </View>
            <View style={styles.cardStyle}>
              <View style={{ flex: 1, alignItems: "flex-start", top: 10 }}>
                <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.cardTextStyle,
                        { color: "black", left: 20 },
                      ]}
                    >
                      Driver Name :
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: deviceWidth < 370 ? 1.5 : 2,
                    }}
                  >
                    <Text style={styles.cardTextStyleValue}>
                      {data.driver_name.charAt(0).toUpperCase() +
                        data.driver_name.slice(1)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 2.5, alignItems: "flex-start" }}>
                <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.cardTextStyle,
                        { color: "black", left: 20 },
                      ]}
                    >
                      Mobile number :
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: deviceWidth < 370 ? 1.4 : 1.5,
                    }}
                  >
                    <Text style={styles.cardTextStyleValue}>
                      {data.emp_mobile}
                    </Text>
                  </View>
                </View>
                <View style={[{ flex: 3 }, { flexDirection: "row" }]}>
                  <View style={{ flex: 1 }}>
                    <Divider
                      bg="#275932"
                      thickness={deviceWidth < 370 ? 1.4 : 1.7}
                      orientation="horizontal"
                    />
                    <View
                      style={[{ flex: 1 }, { flexDirection: "row", top: 10 }]}
                    >
                      <View
                        style={{ flex: 1, alignItems: "center", right: "80%" }}
                      >
                        <Text
                          style={[styles.cardTextStyle, { color: "black" }]}
                        >
                          Type
                        </Text>
                      </View>
                      <View
                        style={{ flex: 1, alignItems: "center", right: "50%" }}
                      >
                        <Text
                          style={[styles.cardTextStyle, { color: "black" }]}
                        >
                          Bus Number
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text
                          style={[styles.cardTextStyle, { color: "black" }]}
                        >
                          Vehicle Number
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[{ flex: 1 }, { flexDirection: "row", top: -8 }]}
                    >
                      <View style={{ flex: 1 }}>
                        <Divider
                          bg="#275932"
                          thickness={deviceWidth < 370 ? 1.4 : 1.7}
                          orientation="vertical"
                          style={{ left: "60%" }}
                        />
                        <Divider
                          bg="#275932"
                          thickness={deviceWidth < 370 ? 1.4 : 1.7}
                          orientation="vertical"
                          style={{ left: "60%" }}
                        />
                        <Divider
                          bg="#275932"
                          thickness={deviceWidth < 370 ? 1.4 : 1.7}
                          orientation="vertical"
                          style={{ left: "60%" }}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Divider
                          bg="#275932"
                          thickness={deviceWidth < 370 ? 1.4 : 1.7}
                          orientation="vertical"
                          style={{ left: "27%" }}
                        />
                        <Divider
                          bg="#275932"
                          thickness={deviceWidth < 370 ? 1.4 : 1.7}
                          orientation="vertical"
                          style={{ left: "27%" }}
                        />
                        <Divider
                          bg="#275932"
                          thickness={deviceWidth < 370 ? 1.4 : 1.7}
                          orientation="vertical"
                          style={{ left: "27%" }}
                        />
                      </View>
                    </View>
                    <View
                      style={[{ flex: 3 }, { flexDirection: "row", top: 10 }]}
                    >
                      <View
                        style={{ flex: 1, alignItems: "center", right: "30%" }}
                      >
                        <Text style={styles.cardTextStyleValue}>
                          {data.types}
                        </Text>
                      </View>
                      <View
                        style={{ flex: 1, alignItems: "center", right: "20%" }}
                      >
                        <Text style={styles.cardTextStyleValue}>
                          {data.busnumber}
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={styles.cardTextStyleValue}>
                          {data.vehicleno}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </>
        ))}
      <ParentsHome /> */}
    </>
  );
};

export default TransportScreen;

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

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
});

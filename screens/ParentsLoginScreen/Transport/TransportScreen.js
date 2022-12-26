import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { DataTable } from "react-native-paper";
import Button from "../../../components/UI/Button";
import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import { Card } from "react-native-paper";
import ParentsHome from "../BottomTab/ParentsHome";
import { Divider, Text } from "native-base";
import { busNumber } from "../../../components/StudentItem/StudentItem";
import { AntDesign } from "@expo/vector-icons";
import { subURL } from "../../../components/utils/URL's";
const TransportScreen = () => {
  // useEffect(()=>{
  //   async function getToken(){
  //     const value= await AsyncStorage.getItem('token')
  //     console.log(value)
  //   }
  //   getToken()
  //     },[]);

  const [forTransportList, setForTransportList] = useState({
    color: "black",
    fontWeight: "bold",
  });

  const [showTable, setShowTable] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${subURL}/TransportreportDetailList/${busNumber}`
        );
        console.log(res.data);

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
      // try {
      //   // const value = await AsyncStorage.getItem('token');
      // const value=  await AsyncStorage.getItem('token')
      // console.log(value)
      // } catch (error) {
      //   // Error retrieving data
      // }
    }
    fetchData();
  }, []);

  function transportList() {
    setForTransportList({ fontWeight: "bold", color: "black" });
    setForAddTransport({ color: "black" });
    setShowForm(false);
    setShowTable(true);
  }

  return (
    <>
      <MapView style={styles.map} />
      {/* <View style={[{flex:1}, {flexDirection: "row"}]}>
        <View style={{ flex: 1, backgroundColor: "red" }} >
          <Text>{data.route_name}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "darkorange" }} >
          
        </View>
        <View style={{ flex: 1, backgroundColor: "green" }} >
          <Text>{data.stop_name}</Text>
        </View>
      </View> */}
      {data &&
        data.map((data) => (
          <>
            <View style={styles.itemStyle}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  top: 15,
                  paddingLeft: 15,
                }}
              >
                <Text
                  fontSize={deviceWidth < 370 ? "xl" : "3xl"}
                  style={styles.textStyle}
                >
                  {data.route_name}
                </Text>
              </View>
              <View style={styles.iconStyle}>
                <AntDesign
                  name="right"
                  size={deviceWidth < 370 ? 20 : 25}
                  color="white"
                />
              </View>
              <View style={{ flex: 1, alignItems: "center", top: 15 }}>
                <Text
                  fontSize={deviceWidth < 370 ? "xl" : "3xl"}
                  style={styles.textStyle}
                >
                  {data.stop_name}
                </Text>
              </View>
            </View>
            <View style={styles.cardStyle}>
              <View style={{ flex: 1, alignItems: "flex-start", top: 10 }}>
                <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
                  <View style={{ flex: 1 }}>
                    <Text
                      fontSize={deviceWidth < 370 ? "md" : "2xl"}
                      style={[styles.textStyle, { color: "black", left: 20 }]}
                    >
                      Driver Name :
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: deviceWidth < 370 ? 1.5 : 1,
                    }}
                  >
                    <Text
                      fontSize={deviceWidth < 370 ? "md" : "2xl"}
                      style={[styles.textStyle, { color: "black", left: 1 }]}
                    >
                      {data.driver_name}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 2.5, alignItems: "flex-start" }}>
                <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
                  <View style={{ flex: 1 }}>
                    <Text
                      fontSize="sm"
                      style={[styles.textStyle, { color: "black", left: 20 }]}
                    >
                      Mobile number :
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: deviceWidth < 370 ? 1.4 : 1.7,
                    }}
                  >
                    <Text
                      fontSize="sm"
                      style={[styles.textStyle, { color: "black" }]}
                    >
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
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text
                          fontSize="sm"
                          style={[styles.textStyle, { color: "black" }]}
                        >
                          Type
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text
                          fontSize="sm"
                          style={[styles.textStyle, { color: "black" }]}
                        >
                          Bus Number
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text
                          fontSize="sm"
                          style={[styles.textStyle, { color: "black" }]}
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
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text
                          fontSize="sm"
                          style={[styles.textStyle, { color: "black" }]}
                        >
                          {data.types}
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text
                          fontSize="sm"
                          style={[styles.textStyle, { color: "black" }]}
                        >
                          {data.busnumber}
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text
                          fontSize="sm"
                          style={[styles.textStyle, { color: "black" }]}
                        >
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
      <ParentsHome />
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
    width: Dimensions.get("window").width,
    height: "40%",
  },
  textStyle: {
    color: "white",
    fontFamily: "HindSemiBold",
  },
  iconStyle: {
    flex: 1,
    alignItems: "center",
    top: deviceWidth < 370 ? 20 : 25,
  },
  itemStyle: {
    flex: 0.2,
    flexDirection: "row",
    backgroundColor: "#275932",
    // padding: 5,
    top: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    //paddingBottom:deviceWidth < 370 ? 20 : 1,
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
  // BtnContainer: {
  //   flexDirection: "row",
  //   width: 220,
  // },
  // container: {
  //   padding: 10,
  // },
  // type: {
  //   marginLeft: 10,
  // },
  // th: {
  //   padding: 5,
  //   marginRight: 13,
  //   //fontSize: 24,
  // },
  // tableHeader: {
  //   backgroundColor: "skyblue",

  //   height: 50,
  //   fontWeight: "bold",
  // },
  // tableTitle: {
  //   // padding: 5,
  //   margin: 7,
  //   fontFamily: "MonsterratBold",
  //   fontSize: deviceWidth < 370 ? 13 : 16,
  // },
  // tableCell: {
  //   width: 40,
  //   //  fontFamily: "Montserrat_600SemiBold",
  //   marginLeft: 35,
  // },

  // tableRow: {
  //   height: "9%",
  //   borderBottomColor: "black",
  //   borderBottomWidth: 2,
  // },
  // inputForm: {
  //   padding: 20,
  // },
  // inputStyle: {
  //   borderWidth: 1,
  //   borderColor: "grey",
  //   borderRadius: 5,
  // },
  // labels: {
  //   marginTop: 2,
  // },
  // btnSubmit: {
  //   marginTop: 5,
  // },
});

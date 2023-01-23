import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { DataTable } from "react-native-paper";
import Button from "../../../components/UI/Button";
import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import { Card } from "react-native-paper";
import ParentsHome from "../BottomTab/ParentsHome";
import { Divider } from "native-base";
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
    fontSize: 18,
    fontFamily: "HindSemiBold",
  },
  cardTextStyle: {
    color: "white",
    fontSize: 15,
    fontFamily: "HindSemiBold",
  },
  cardTextStyleValue: {
    color: "black",
    fontSize: 15,
    fontFamily: "HindRegular",
  },
  iconStyle: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    //top: deviceWidth < 370 ? 20 : 25,
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

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { selectedData } from "./MyClasses";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MYCLASS, MYSECTION } from "./DisplayClass";
import axios from "axios";
import { DataTable } from "react-native-paper";
import { subURL } from "../../../../components/utils/URL's";
import TeachersHome from "../../BottomTab/TeachersHome";
import { Text as NativeText } from "native-base";
import { TouchableHighlight } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";

export var STD_ID;

const StudentList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  console.log(MYCLASS, MYSECTION);

  useEffect(() => {
    async function login() {
      try {
        const res = await axios.get(`${subURL}/Student/`);
        //console.log(class_name, section);

        let filteredclass = res.data.filter((ele) => ele.class_name == MYCLASS);

        let filteredsection = res.data.filter(
          (ele) => ele.section == MYSECTION
        );

        const filteredList = filteredclass && filteredsection;

        let filteredc = filteredList.filter((ele) => ele.class_name == MYCLASS);

        // const id = filteredc.map((id) => id.reg_number);
        // console.log(id);

        // console.log(filteredc);
        // StudentList = filteredc;
        // console.log(StudentList);

        if (filteredc) {
          //console.log(studList);
          // setStudList(filteredc);
          setFilteredData(filteredc);
        }

        // if (filteredc.length == 0) {
        //   Alert.alert("No data found", "No data found for respective search");
        // }
      } catch (error) {
        console.log(error);
      }
    }
    login();
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

  const searchFilter = (text) => {
    console.log("search function");
    if (text) {
      const newData = filteredData.filter((item) => {
        const itemData = item.student_name
          ? item.student_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      console.log("else part");
      setFilteredData(filteredData);
      setSearchText(text);
    }
  };

  function pressHandler(id) {
    console.log(id);

    navigation.navigate("TeachersProfile", {
      studentid: id,
    });
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.title}>
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
        </View>
        <View style={styles.tableHeader}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.headerText}>Reg no</Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.headerText}>Student name</Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.headerText}>Class name</Text>
          </View>
        </View>

        <View
          style={[
            { flex: 1 },
            {
              flexDirection: "column",
              top: keyboardStatus == "Keyboard Hidden" ? "11.5%" : "18%",
              paddingHorizontal: 10,
              marginHorizontal: 10,
            },
          ]}
        >
          <View style={{ flex: 8, bottom: 10 }}>
            <ScrollView>
              {filteredData.length > 0 ? (
                <View style={styles.root}>
                  {filteredData &&
                    filteredData.map((filteredData, key) => (
                      <>
                        <TouchableHighlight
                          onPress={pressHandler.bind(this, filteredData.id)}
                          underlayColor="#E5E7E9"
                          style={{ cursor: "pointer" }}
                        >
                          <View style={styles.tableText}>
                            <View
                              style={{
                                flex: 1,
                                alignItems: "center",
                                paddingVertical: 20,
                              }}
                            >
                              <Text
                                style={[styles.headerText, { color: "black" }]}
                              >
                                {filteredData.reg_number}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: "center",
                                paddingVertical: 20,
                              }}
                            >
                              <Text
                                style={[styles.headerText, { color: "black" }]}
                              >
                                {filteredData.student_name}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: "center",
                                paddingVertical: 20,
                              }}
                            >
                              <Text
                                style={[styles.headerText, { color: "black" }]}
                              >
                                {filteredData.class_name} -{" "}
                                {filteredData.section}
                              </Text>
                            </View>
                          </View>
                        </TouchableHighlight>
                      </>
                    ))}
                </View>
              ) : (
                <View style={{ alignItems: "center", marginVertical: 10 }}>
                  <NativeText fontSize="xl" bold color="error.900">
                    No data found.
                  </NativeText>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
        {keyboardStatus == "Keyboard Hidden" && (
          <View style={{ flex: 0.4 }}>
            <TeachersHome />
          </View>
        )}
      </View>
    </>
  );
};

export default StudentList;

const styles = StyleSheet.create({
  title: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    top: "5%",
  },
  tableHeader: {
    flex: 0.2,
    flexDirection: "row",
    top: "17%",
    borderWidth: 1,
    marginHorizontal: 20,
    backgroundColor: "#1E84A4",
  },
  tableText: {
    flex: 1,
    flexDirection: "row",
    // paddingHorizontal:10,
    // marginHorizontal:10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  headerText: {
    fontFamily: "HindBold",
    fontSize: 16,
    color: "white",
  },
  th: {
    padding: 5,
    marginRight: 13,
    //fontSize: 24,
  },

  tableTitle: {
    // padding: 5,
    margin: 7,
    fontFamily: "HindMedium",
    fontSize: 20,
  },
  tableCell: {
    width: 110,

    marginLeft: 35,
  },

  tableMarks: {
    width: 10,

    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  searchBar: {
    //top: 10,
    backgroundColor: "#F0F3F4",
    marginTop: 10,
    marginBottom: 20,
  },
  root: {
    // backgroundColor: "#EBECFO",
    backgroundColor: "white",
    height: "100%",
  },
});

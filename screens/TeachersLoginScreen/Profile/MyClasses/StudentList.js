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

  

  useEffect(() => {
    async function login() {
      try {
        const res = await axios.get(`${subURL}/Student/`);
    

        let filteredclass = res.data.filter((ele) => ele.class_name == MYCLASS);

        let filteredsection = res.data.filter(
          (ele) => ele.section == MYSECTION
        );

        const filteredList = filteredclass && filteredsection;

        let filteredc = filteredList.filter((ele) => ele.class_name == MYCLASS);



        if (filteredc) {
          
          setFilteredData(filteredc);
        }

    
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
      
      setFilteredData(filteredData);
      setSearchText(text);
    }
  };

  function pressHandler(id) {
  

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
                                style={styles.headerTextValue}
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
                                style={styles.headerTextValue}
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
                                style={styles.headerTextValue}
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
                  <NativeText fontSize="lg" bold color="error.900">
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
  
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  headerText: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
    color: "white",
  },
  headerTextValue: {
    fontFamily: "HindMedium",
    fontSize: 17,
    color: "black",
  },

  searchBar: {
  
    backgroundColor: "#F0F3F4",
    marginTop: 10,
    marginBottom: 20,
  },
  root: {
  
    backgroundColor: "white",
    height: "100%",
  },
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Heading, Text as NativeText } from "native-base";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import { subURL } from "../../../../components/utils/URL's";
import TeachersHome from "../../BottomTab/TeachersHome";
import DisplayClass from "./DisplayClass";
import StudentList from "./StudentList";
import SearchBar from "react-native-dynamic-search-bar";
import { Keyboard } from "react-native";
import { Dimensions } from "react-native";
export var selectedData, length;
var USERID;

export var filteredCT = [],
  classData = [],
  mainData = [],
  classIds = [];
let i;
const MyClasses = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userID, setUserID] = useState("");
  const [classTeacherData, setClassTeacherData] = useState([]);
  const [selected, setSelected] = useState("");
  const [showClass, setShowClass] = useState(true);
  const [showStudList, setShowStudList] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  useEffect(() => {
    async function fetchStudentClass() {
      axios
        .get(`${subURL}/Studentclass/`)
        .then((response) => {
          let newArray = response.data.map((item) => {
            return {
              value: item.class_name + " - " + item.section,
            };
          });

          setData(response.data);
          setFilteredData(response.data);
          mainData = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchStudentClass();
  }, []);

  async function fetchUserId() {
    USERID = await AsyncStorage.getItem("key");

    if (USERID !== null) {
      setUserID(USERID);
    }
  }
  fetchUserId();

  async function fetchClassTeacher() {
    try {
      const res = await axios.get(`${subURL}/IsClassteacher/${userID}`);

      classData = res.data;
      setClassTeacherData(classTeacherData);
      let ids = [];

      for (let i = 0; i < mainData.length; i++) {
        ids.push(mainData[i].id);
      }

      for (let i = 0; i < classData.length; i++) {
        classIds.push(classData[i].id);
      }

      let result = mainData.filter((element) =>
        classData.some((ele) => element.id === ele.id)
      );

      filteredCT = result;

      try {
        await AsyncStorage.setItem("classteacher", JSON.stringify(result));
      } catch (error) {}
    } catch (error) {
      console.log(error);
    }
  }
  fetchClassTeacher();

  function renderClass(itemData) {
    return <DisplayClass {...itemData.item} />;
  }

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
      const newData = data.filter((item) => {
        const itemData = item.class_name
          ? item.class_name.toUpperCase()
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
      {showClass && (
        <>
          <View
            style={[
              { flex: 1 },
              {
                flexDirection: "column",
                backgroundColor: "white",
              },
            ]}
          >
            <View style={{ flex: 0.7, alignItems: "center" }}>
              <Text
                style={{
                  marginVertical: 15,
                  fontFamily: "HindBold",
                  fontSize: 17,
                }}
              >
                Class List
              </Text>
              <SearchBar
                style={styles.searchBar}
                textInputStyle={{
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
                placeholder="Search here.."
                onChangeText={(text) => searchFilter(text)}
                value={searchText}
              />
              {keyboardStatus == "Keyboard Hidden" && (
                <View
                  style={[
                    { flex: 1.1 },
                    {
                      flexDirection: "row",
                      marginVertical: 17,
                    },
                  ]}
                >
                  <View
                    style={{
                      flex: 0.3,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View style={styles.space} />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-start",
                      
                      ...Platform.select({
                        ios: {
                          top: "4%",
                        },
                        android: {
                          top: deviceHieght > 800 ? "2%" : "0%",
                        },
                      }),
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HindSemiBold",
                        fontSize: 15,
                        color: "black",
                      }}
                    >
                      Class teacher
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View style={{ flex: 2 }}>
              <FlatList
                data={filteredData}
                renderItem={renderClass}
                numColumns={2}
              />
            </View>
            {keyboardStatus == "Keyboard Hidden" && (
              <View style={{ flex: 0.3 }}>
                <TeachersHome />
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  space: {
    width: 20,
    height: 20,
    backgroundColor: "#DE9317",
    left: "20%",
  },

  searchBar: {
    backgroundColor: "#F0F3F4",
  },
});

export default MyClasses;

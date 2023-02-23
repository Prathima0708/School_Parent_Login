import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Dimensions,
  Animated,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";

import axios from "axios";
import { Keyboard } from "react-native";

import TeachersHome from "../BottomTab/TeachersHome";

import SearchBar from "react-native-dynamic-search-bar";

import SelectList from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";

import { subURL } from "../../../components/utils/URL's";

import { IconButton, Text as NativeText } from "native-base";
import BackButton from "../../../components/UI/BackButton";
import { useNavigation } from "@react-navigation/native";
export var ID;
export var StudentList = [];
var newArray, firstData, KEY, VALUE, CANCELKEY, CANCELVALUE;
const TeachersMarksheet = () => {
  const [defaultClass, setDefaultClass] = useState();

  const [showForm, setShowForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [showMarksheet, setShowMarksheet] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [filteredMarks, setFilteredMarks] = useState([]);

  const [selected, setSelected] = useState("");
  const [studData, setStudData] = useState([]);

  const [studList, setStudList] = useState([]);
  const [marksheetData, setMarksheetData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [showDefaultList, setShowDefaultList] = useState(true);
  const [showInitialBtn, setShowInitialBtn] = useState(true);

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  const [empty, setEmpty] = useState(false);
  const [cancelState, setIsCancelState] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    if (showForm) {
      navigation.setOptions({ headerShown: true });
    }
    if (showMarksheet) {
      navigation.setOptions({ headerShown: false });
    }
  }, [showMarksheet, showForm]);

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

  function showMarksheetList() {
    setShowDefaultList(false);
    setForMarkssheetForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    setForMarkssheetList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setShowBtn(false);
    setShowAddForm(false);
    setShowForm(false);
    setShowMarksheet(true);

    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Marksheet/`);

        setMarksheetData(res.data);
        setFilteredData(res.data);
        setFilteredMarks(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  useEffect(() => {
    axios
      .get(`${subURL}/Studentclass/`)
      .then((response) => {
        newArray = response.data.map((item) => {
          return {
            key: item.id,

            classname: item.class_name,
            section: item.section,
            value: item.class_name + " - " + item.section,
          };
        });
        newArray.sort(function (obj1, obj2) {
          return obj1.value.localeCompare(obj2.value);
        });

        firstData = newArray[0];
        KEY = firstData.key;
        VALUE = firstData.value;
        setStudData(newArray);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setDefaultClass(firstData);
  }, []);

  function viewStudentList() {
    setShowDefaultList(false);
    setShowForm(true);

    async function login() {
      let filteredlist = newArray.filter((ele) => ele.key == selected);

      let class_name = filteredlist[0].classname;
      let section = filteredlist[0].section;

      try {
        const res = await axios.get(`${subURL}/Student/`);

        let filteredclass = res.data.filter(
          (ele) => ele.class_name == class_name
        );

        let filteredsection = res.data.filter((ele) => ele.section == section);

        const filteredList = filteredclass && filteredsection;

        let filteredc = filteredList.filter(
          (ele) => ele.class_name == class_name
        );

        if (filteredc) {
          setStudList(filteredc);
          setFilteredData(filteredc);
        }
      } catch (error) {
        console.log(error);
      }
    }
    login();
  }
  function addForm(id) {
    setShowAddForm(true);

    const filteredDummuyData = studList.find((data) => data.id == id);

    StudentList = filteredDummuyData;

    const studentregno = StudentList.reg_number;

    async function getData() {
      try {
        const res = await axios.get(`${subURL}/MarksheetReg/${studentregno}`);

        let filteredlist = res.data.filter(
          (ele) => ele.Roll_no == StudentList.reg_number
        );

        setFilteredMarks(res.data);
        if (res.data.length === 0) {
          Alert.alert(
            "Data not found",
            `No marks added for the student ${StudentList.student_name}`,
            [{ text: "OK" }]
          );
        } else {
          setEmpty(false);
          setShowForm(false);
          setShowBtn(false);
          setIsEdit(false);
          setShowMarksheet(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }

  function backHandler() {
    setIsCancelState(true);

    let filteredlist = newArray.filter((ele) => ele.key == selected);

    CANCELKEY = filteredlist[0].key;
    CANCELVALUE = filteredlist[0].value;
    setShowInitialBtn(true);
    setShowBtn(true);
    setShowForm(true);
    setShowAddForm(false);
    setShowMarksheet(false);
    {
      isEdit && showMarksheetList(true);
    }
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = studList.filter((item) => {
        const itemData = item.student_name
          ? item.student_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);

      setSearchText(text);
    } else {
      setFilteredData(studList);

      setSearchText(text);
    }
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {showBtn && (
          <>
            <View
              style={{
                // width: 170,
                top: "9%",
                left: "6%",
                flexDirection: "row",
                // fontSize: 20,
                // marginTop: 13,
                // margin: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "HindSemiBold",
                  fontSize: 17,
                  top: "5%",
                  marginLeft: 10,
                }}
              >
                Select class
              </Text>
              <View style={styles.space} />
              <Text
                style={{ fontFamily: "HindSemiBold", fontSize: 15, top: "5%" }}
              >
                -
              </Text>
              <View style={styles.space} />

              {!cancelState && (
                <SelectList
                  defaultOption={{
                    key: String(KEY),
                    value: String(VALUE),
                  }}
                  setSelected={setSelected}
                  data={studData}
                  placeholder="Select class"
                  boxStyles={{ borderRadius: 10, top: "4%" }}
                  dropdownTextStyles={{
                    fontSize: 15,
                    fontFamily: "HindRegular",
                  }}
                  inputStyles={{ fontSize: 15, fontFamily: "HindRegular" }}
                  onSelect={viewStudentList}
                />
              )}
              {cancelState && (
                <SelectList
                  defaultOption={{
                    key: String(CANCELKEY),
                    value: String(CANCELVALUE),
                  }}
                  setSelected={setSelected}
                  data={studData}
                  placeholder="Select class"
                  boxStyles={{ borderRadius: 10, top: "4%" }}
                  dropdownTextStyles={{
                    fontSize: 15,
                    fontFamily: "HindRegular",
                  }}
                  inputStyles={{ fontSize: 15, fontFamily: "HindRegular" }}
                  onSelect={viewStudentList}
                />
              )}
            </View>
          </>
        )}

        {showForm && (
          <>
            <SearchBar
              style={styles.searchBar}
              textInputStyle={{ fontFamily: "HindRegular", fontSize: 18 }}
              placeholder="Search here..."
              onChangeText={(text) => searchFilter(text)}
              value={searchText}
            />
            <View style={styles.tableHeader}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.headerText}>Reg no</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.headerText}>Student name</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.headerText}>Class {"\n"} name</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.headerText}>Actions</Text>
              </View>
            </View>
            <View
              style={[
                { flex: 1 },
                {
                  flexDirection: "column",
                  top: keyboardStatus == "Keyboard Hidden" ? "11.5%" : "18%",
                  marginTop: "6%",
                  paddingHorizontal: 10,
                  marginHorizontal: 10,
                },
              ]}
            >
              <View style={{ flex: 8, bottom: 10 }}>
                {filteredData.length <= 0 ? (
                  <View style={{ alignItems: "center", top: "5%" }}>
                    <NativeText fontSize="lg" bold color="error.900">
                      No Data Found
                    </NativeText>
                  </View>
                ) : (
                  <ScrollView>
                    <View style={styles.root}>
                      {filteredData &&
                        filteredData.map((filteredData, key) => (
                          <>
                            <View style={styles.tableText}>
                              <View
                                style={{
                                  flex: 1,
                                  alignItems: "center",
                                  paddingVertical: 20,
                                }}
                              >
                                <Text style={styles.headerTextValue}>
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
                                <Text style={styles.headerTextValue}>
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
                                <Text style={styles.headerTextValue}>
                                  {filteredData.class_name} -{" "}
                                  {filteredData.section}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  alignItems: "center",
                                  paddingVertical: 20,
                                }}
                              >
                                <IconButton
                                  colorScheme="blue"
                                  onPress={() => addForm(filteredData.id)}
                                  variant="subtle"
                                  _icon={{
                                    as: Ionicons,
                                    name: "eye",
                                  }}
                                />
                              </View>
                            </View>
                          </>
                        ))}
                    </View>
                  </ScrollView>
                )}
              </View>
            </View>
            {keyboardStatus == "Keyboard Hidden" && (
              <View style={{ flex: 0.4 }}>
                <TeachersHome />
              </View>
            )}
          </>
        )}
        {showMarksheet && !empty && (
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
              <View style={{ flex: 1, top: "10%" }}>
                <BackButton onPress={backHandler} />
              </View>
              <View style={{ flex: 1.5 }}>
                <View style={{ flex: 0.4 }}>
                  <View
                    style={[
                      { flex: 1 },
                      {
                        flexDirection: "row",

                        marginTop: "10%",
                      },
                    ]}
                  >
                    <View
                      style={{
                        flex: 0.6,

                        marginLeft: "20%",
                      }}
                    >
                      <Text style={[styles.headingFont, { fontSize: 18 }]}>
                        Roll no:
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      {filteredMarks.map((data, key) => (
                        <Text
                          style={[
                            styles.headingFont,
                            { fontSize: 18, fontFamily: "HindRegular" },
                          ]}
                        >
                          {StudentList.reg_number}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
                <View style={{ flex: 0.2 }}>
                  <View
                    style={[
                      { flex: 1 },
                      {
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <View style={{ flex: 1, marginLeft: "20%" }}>
                      <Text
                        style={[
                          styles.headingFont,
                          { fontSize: 18, color: "black" },
                        ]}
                      >
                        Student name:
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      {filteredMarks.map((data, key) => (
                        <Text
                          style={[
                            styles.headingFont,
                            { fontSize: 18, fontFamily: "HindRegular" },
                          ]}
                        >
                          {" "}
                          {data.student_name}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.tableTopStyle]}>
                <>
                  <View style={[{ flexDirection: "row", bottom: "2%" }]}>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text
                        style={[
                          styles.headingFont,
                          { color: "white", fontSize: 16 },
                        ]}
                      >
                        Subject
                      </Text>
                    </View>
                    <View style={[styles.tableHead, { alignItems: "center" }]}>
                      <Text
                        style={[
                          styles.headingFont,
                          { color: "white", fontSize: 16 },
                        ]}
                      >
                        Obtained marks
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      { flex: 1 },
                      { flexDirection: "column", backgroundColor: "white" },
                    ]}
                  >
                    <View style={{ flex: 8, bottom: 10 }}>
                      <ScrollView>
                        <View style={[styles.flexrow]}>
                          <View style={[styles.rootMarkTable]}>
                            <>
                              <View
                                style={[
                                  styles.containerMarkTable,
                                  { flexDirection: "row" },
                                ]}
                              >
                                <View style={[styles.colStyle]}>
                                  <Text
                                    style={[
                                      styles.tableTitleMarksTable,
                                      { left: "100%" },
                                    ]}
                                  >
                                    MATHS
                                  </Text>
                                  <Text
                                    style={[
                                      styles.tableTitleMarksTable,
                                      { left: "100%" },
                                    ]}
                                  >
                                    ENG
                                  </Text>
                                  <Text
                                    style={[
                                      styles.tableTitleMarksTable,
                                      { left: "100%" },
                                    ]}
                                  >
                                    SCI
                                  </Text>
                                  <Text
                                    style={[
                                      styles.tableTitleMarksTable,
                                      { left: "100%" },
                                    ]}
                                  >
                                    SOC
                                  </Text>
                                  <Text
                                    style={[
                                      styles.tableTitleMarksTable,
                                      { left: "100%" },
                                    ]}
                                  >
                                    HINDI
                                  </Text>
                                  <Text
                                    style={[
                                      styles.tableTitleMarksTable,
                                      { left: "100%" },
                                    ]}
                                  >
                                    KAN
                                  </Text>
                                  <Text
                                    style={[
                                      styles.tableTitleMarksTable,
                                      { left: "100%" },
                                    ]}
                                  >
                                    COMP
                                  </Text>
                                </View>
                              </View>
                            </>
                          </View>
                          <View style={[styles.rootMarkTable]}>
                            {filteredMarks &&
                              filteredMarks.map((data) => (
                                <>
                                  <View
                                    style={[
                                      styles.containerMarkTable,
                                      { flexDirection: "row" },
                                    ]}
                                  >
                                    <View style={[styles.colStyle]}>
                                      <Text
                                        style={[
                                          styles.tableTitleMarksTable,
                                          { marginLeft: "60%" },
                                        ]}
                                      >
                                        {data.maths_obt_mark}
                                      </Text>
                                      <Text
                                        style={[
                                          styles.tableTitleMarksTable,
                                          { left: "60%" },
                                        ]}
                                      >
                                        {data.english_obt_mark}
                                      </Text>
                                      <Text
                                        style={[
                                          styles.tableTitleMarksTable,
                                          { left: "60%" },
                                        ]}
                                      >
                                        {data.science_obt_mark}
                                      </Text>
                                      <Text
                                        style={[
                                          styles.tableTitleMarksTable,
                                          { left: "60%" },
                                        ]}
                                      >
                                        {data.hindi_obt_mark}
                                      </Text>
                                      <Text
                                        style={[
                                          styles.tableTitleMarksTable,
                                          { left: "60%" },
                                        ]}
                                      >
                                        {data.social_obt_mark}
                                      </Text>
                                      <Text
                                        style={[
                                          styles.tableTitleMarksTable,
                                          { left: "60%" },
                                        ]}
                                      >
                                        {data.kannada_obt_mark}
                                      </Text>
                                      <Text
                                        style={[
                                          styles.tableTitleMarksTable,
                                          { left: "60%" },
                                        ]}
                                      >
                                        {data.computer_obt_mark}
                                      </Text>
                                    </View>
                                  </View>
                                </>
                              ))}
                          </View>
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </>
              </View>
              {keyboardStatus == "Keyboard Hidden" && (
                <View style={{ flex: 0.1 }}>
                  <TeachersHome />
                </View>
              )}
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default TeachersMarksheet;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  headingFont: {
    fontFamily: "HindSemiBold",
    fontSize: deviceWidth < 370 ? 14 : 16,
  },

  colStyle: {
    padding: deviceHieght < 600 ? "5%" : "3%",
  },

  container: {
    padding: 10,
    top: "15%",
  },
  tableTopStyle: {
    flex: 4,
    padding: 10,
    bottom: 35,
  },
  containerMarkTable: {
    borderWidth: 1,
  },

  home: {
    marginTop: 29,
  },

  root: {
    backgroundColor: "white",
  },
  tableHead: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "#3F96B8",
  },
  tableText: {
    flex: 1,
    flexDirection: "row",

    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },

  btnSubmit: {
    marginTop: 5,

    width: "50%",
    marginLeft: deviceWidth < 370 ? 170 : 180,
  },

  tableHeader: {
    flex: 0.2,
    flexDirection: "row",
    top: "25%",
    borderWidth: 1,
    marginHorizontal: 20,
    backgroundColor: "#1E84A4",
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
  tableTitle: {
    margin: 7,
    fontFamily: "HindMedium",
    fontSize: deviceWidth < 370 ? 16 : 20,
  },
  tableTitleMarksTable: {
    fontFamily: "HindMedium",
    fontSize: deviceWidth < 370 ? 16 : 16,
    marginVertical: 5,
  },

  rootMarkTable: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 1,
  },

  space: {
    width: 20,
    height: 20,
  },
  searchBar: {
    top: "20%",
    backgroundColor: "#F0F3F4",
  },

  flexrow: {
    flex: 1,
    flexDirection: "row",
  },
});

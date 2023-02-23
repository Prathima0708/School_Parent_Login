import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button as Btn,
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

  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, 100);

  const headermax = 100;
  const headermin = 10;

  const [showForm, setShowForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [showMarksheet, setShowMarksheet] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [filteredMarks, setFilteredMarks] = useState([]);
  const [searchMarks, setSearchMarks] = useState("");

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
            {/* <View
              style={{
                width: "50%",
                // bottom:'2%',
                marginLeft: 200,
                position: "absolute",
                // top: 160,
              }}
            >
              <Button onPress={viewStudentList}>View List</Button>
            </View> */}
          </>
        )}

        {/* {showDefaultList && (
          <>
            <SearchBar
              style={styles.searchBar}
              textInputStyle={{ fontFamily: "HindRegular", fontSize: 18 }}
              placeholder="Search here"
              onChangeText={(text) => searchFilter(text)}
              value={searchText}
            />
            <ScrollView horizontal={true}>
              <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> REG NUMBER</Text>
                  </View>
                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> STUDENT NAME</Text>
                  </View>
                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> CLASS NAME</Text>
                  </View>
                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> SECTION</Text>
                  </View>

                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> ACTION</Text>
                  </View>
                </DataTable.Header>

                <View style={styles.th}>
                  <Text style={styles.tableTitle}>
                    {" "}
                    Default student list goes here...
                  </Text>
                </View>

                {filteredData &&
                  filteredData.map((data, key) => (
                    <DataTable.Row style={styles.tableRow} key={key}>
                      <DataTable.Cell
                        textStyle={{
                          fontSize: 18,
                          fontFamily: "HindRegular",
                          marginLeft: 50,
                        }}
                      >
                        {data.reg_number}
                      </DataTable.Cell>
                      <DataTable.Cell
                        textStyle={{
                          fontSize: 18,
                          fontFamily: "HindRegular",
                          marginLeft: 80,
                        }}
                      >
                        {data.student_name}
                      </DataTable.Cell>
                      <DataTable.Cell
                        textStyle={{
                          fontSize: 18,
                          fontFamily: "HindRegular",
                          marginLeft: 90,
                        }}
                      >
                        {data.class_name}
                      </DataTable.Cell>
                      <DataTable.Cell
                        textStyle={{
                          fontSize: 18,
                          fontFamily: "HindRegular",
                          marginLeft: 70,
                        }}
                      >
                        {data.section}
                      </DataTable.Cell>

                      <DataTable.Cell
                        textStyle={{
                          fontSize: 18,
                          fontFamily: "HindRegular",
                          marginLeft: 70,
                        }}
                      >
                        <Ionicons
                          name="eye"
                          //size={deviceWidth < 370 ? 35 : 38}
                          color="black"
                          size={24}
                          onPress={() => addForm(data.id)}
                        />
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
              </DataTable>
            </ScrollView>
          </>
        )} */}

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
            {/* <ScrollView horizontal={true}>
              <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> REG NUMBER</Text>
                  </View>
                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> STUDENT NAME</Text>
                  </View>
                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> CLASS NAME</Text>
                  </View>
                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> SECTION</Text>
                  </View>

                  <View style={styles.th}>
                    <Text style={styles.tableTitle}> ACTION</Text>
                  </View>
                </DataTable.Header>

                {filteredData &&
                  filteredData.map((data, key) => (
                    <DataTable.Row style={styles.tableRow} key={key}>
                      <DataTable.Cell
                        textStyle={{
                          fontSize: deviceWidth < 370 ? 16 : 18,
                          fontFamily: "HindRegular",
                          marginLeft: 50,
                        }}
                      >
                        {data.reg_number}
                      </DataTable.Cell>
                      <DataTable.Cell
                        textStyle={{
                          fontSize: deviceWidth < 370 ? 16 : 18,
                          fontFamily: "HindRegular",
                          marginLeft: 80,
                        }}
                      >
                        {data.student_name}
                      </DataTable.Cell>
                      <DataTable.Cell
                        textStyle={{
                          fontSize: deviceWidth < 370 ? 16 : 18,
                          fontFamily: "HindRegular",
                          marginLeft: 90,
                        }}
                      >
                        {data.class_name}
                      </DataTable.Cell>
                      <DataTable.Cell
                        textStyle={{
                          fontSize: deviceWidth < 370 ? 16 : 18,
                          fontFamily: "HindRegular",
                          marginLeft: 70,
                        }}
                      >
                        {data.section}
                      </DataTable.Cell>

                      <DataTable.Cell
                        textStyle={{
                          fontSize: deviceWidth < 370 ? 16 : 18,
                          fontFamily: "HindRegular",
                          marginLeft: 70,
                        }}
                      >
                        <Ionicons
                          name="eye"
                          //size={deviceWidth < 370 ? 35 : 38}
                          color="black"
                          size={24}
                          onPress={() => addForm(data.id)}
                        />
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
              </DataTable>
            </ScrollView> */}
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
                        // marginHorizontal: 60,
                        // marginVertical: 10,
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
                        {/* {timeTable.length > 0 ? ( */}
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
                                    <View
                                      style={[
                                        styles.colStyle,
                                        // { left: "10%" },
                                      ]}
                                    >
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
    // fontFamily: "Hind-SemiBold",
    fontFamily: "HindSemiBold",
    fontSize: deviceWidth < 370 ? 14 : 16,
  },
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    // backgroundColor: "#FDFEFE",
  },
  colStyle: {
    padding: deviceHieght < 600 ? "5%" : "3%",
  },
  tableBtn: {
    marginLeft: -15,
  },
  tableMarksBtn: {
    marginLeft: 15,
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
    // padding: 10,
    borderWidth: 1,
  },
  containerMarkTableOBT: {
    // padding: 16,
    borderWidth: 1,
  },
  home: {
    marginTop: 29,
  },
  type: {
    left: 30,
  },
  root: {
    // backgroundColor: "#EBECFO",
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
    // paddingHorizontal:10,
    // marginHorizontal:10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  inputForm: {
    padding: 20,
    paddingTop: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    // backgroundColor: "white",
    // height: "100%",
  },
  errorBorderColor: {
    borderColor: "red",
  },
  btnSubmit: {
    marginTop: 5,
    //marginBottom: 30,
    width: "50%",
    marginLeft: deviceWidth < 370 ? 170 : 180,
  },
  btnSubmit1: {
    //marginTop: 30,
    //marginBottom: 30,
    width: "50%",
    marginLeft: deviceWidth < 370 ? 170 : 180,
  },
  btnCancel: {
    //marginTop: -110,

    width: "50%",
    position: "absolute",
    top: "75%",
  },
  th: {
    padding: 5,
    marginRight: 13,
    //fontSize: 24,
  },
  tableHeader: {
    flex: 0.2,
    flexDirection: "row",
    top: "25%",
    borderWidth: 1,
    marginHorizontal: 20,
    backgroundColor: "#1E84A4",
  },
  tableHeaderForMark: {
    flex: 0.1,
    flexDirection: "row",
    top: "10%",
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
    // padding: 5,
    margin: 7,
    fontFamily: "HindMedium",
    fontSize: deviceWidth < 370 ? 16 : 20,
  },
  tableTitleMarksTable: {
    fontFamily: "HindMedium",
    fontSize: deviceWidth < 370 ? 16 : 16,
    marginVertical: 5,
  },

  tableCell: {
    width: 110,

    marginLeft: 35,
  },
  rootMarkTable: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 1,
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
    top: "20%",
    backgroundColor: "#F0F3F4",
  },

  focusStyle: {
    borderColor: "blue",
  },
  // normal: {
  //   position: "absolute",
  //   top: 35,
  //   left: 50,
  // },
  // up: {
  //   position: "absolute",
  //   top: 10,
  //   left: 50,
  // },
  errorLabel: {
    color: "red",
    backgroundColor: "#F2F2F2",
    // backgroundColor: "#F4F6F7",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
  },
  normalLabel: {
    color: "grey",
    backgroundColor: "#F2F2F2",
    // backgroundColor: "#F4F6F7",
    paddingHorizontal: 7,
    fontSize: deviceWidth < 370 ? 13 : 17,
    fontFamily: "HindRegular",
  },

  normalRemark: {
    position: "absolute",
    top: 110,
    left: 50,
  },
  upRemark: {
    position: "absolute",
    top: 88,
    left: 50,
  },
  normalRemarkExtra: {
    position: "absolute",
    left: 50,
    top: 130,
  },
  upRemarkExtra: {
    position: "absolute",
    left: 50,
    top: 106,
  },
  normal: {
    position: "absolute",
    top: -7,
    left: 10,
  },
  up: {
    position: "absolute",
    top: -5,
    left: 15,
  },
  normalEng: {
    position: "absolute",
    top: 20,
    left: 10,
  },
  upEng: {
    position: "absolute",
    top: 1,
    left: 15,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  description: {
    fontSize: deviceWidth < 370 ? 18 : 20,
    fontFamily: "HindRegular",
    marginBottom: 4,
    fontWeight: "bold",
    // fontWeight: "bold",
  },
  textBase: {
    color: "white",
    // color: "#0D98BA",
    marginRight: 10,
  },
  studentItem: {
    width: "90%",

    marginVertical: 20,
    marginHorizontal: 20,
    //  backgroundColor: "#3e04c3",
    backgroundColor: "#02196E",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    borderRadius: 10,
  },
  flexrow: {
    flex: 1,
    flexDirection: "row",
  },
  textStyleStudInfo: {
    fontSize: deviceWidth < 370 ? 20 : 17,

    marginBottom: 4,
    // fontWeight: "bold",
    fontFamily: "HindMedium",
  },
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Heading,Text as NativeText } from "native-base";
import React, { useEffect, useState } from "react";
import {
  FlatList,
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
        .get("http://10.0.2.2:8000/school/Studentclass/")
        .then((response) => {
          let newArray = response.data.map((item) => {
            return {
              value: item.class_name + " - " + item.section,
            };
          });
          console.log(response.data);

          setData(response.data);
          mainData = response.data;
          // console.log(response.data[0].class_name);
          // console.log(response.data.section);
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
    console.log(userID);
  }
  fetchUserId();

  async function fetchClassTeacher() {
    try {
      const res = await axios.get(
        `http://10.0.2.2:8000/school/IsClassteacher/${userID}`
      );
      // console.log(res.data);
      classData = res.data;
      setClassTeacherData(classTeacherData);
      let ids = [];

      for (let i = 0; i < mainData.length; i++) {
        //console.log(mainData[i].id);
        ids.push(mainData[i].id);
      }
      //  console.log(ids);
      for (let i = 0; i < classData.length; i++) {
        classIds.push(classData[i].id);
      }
      // console.log(classIds);
      //  console.log(mainData);
      console.log("----------------------------------------------------------");
      //console.log(classData);

      // const result = mainData.filter((element) =>
      //   classData.filter((ele) => element.id == ele.id)
      // );
      let result = mainData.filter((element) =>
        classData.some((ele) => element.id === ele.id)
      );

      // console.log("result is", result.id);
      filteredCT = result;

      try {
        await AsyncStorage.setItem("classteacher", JSON.stringify(result));
      } catch (error) {
        // Error saving data
      }
      // console.log(filteredCT.length);

      //  var filteredClasses =[] ;
      //     for( i=0;i<result.length;i++){

      //       filteredClasses.push(result[i].class_name + "-"+ result[i].section)
      //     }
      //   filteredCT=filteredClasses
    } catch (error) {
      console.log(error);
    }
  }
  fetchClassTeacher();

  function pressHandler() {
    //setShowClass(false)
    //setShowStudList(true)
    navigation.navigate("StudentList", {
      //id
    });
  }

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
    console.log("search function");
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.class_name
          ? item.class_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearchText(text);
    } else {
      setData(data);
      setSearchText(text);
    }
  };

  return (
    <>
      {showClass && (
        <>
        <View style={[{flex:1}, {
          flexDirection: "column",backgroundColor:'white'
        }]}>
          <View style={{ flex: 0.7,alignItems:'center' }} >
            <Heading style={{marginVertical:15}}>Class List</Heading>
            <SearchBar
             // style={styles.searchBar}
              textInputStyle={{
                fontFamily: "HindRegular",
                fontSize: 18,
              }}
              placeholder="Search here"
             onChangeText={(text) => searchFilter(text)}
             value={searchText}
            />
            {keyboardStatus == "Keyboard Hidden" && 
            <View style={[{flex:1}, {
              flexDirection: "row",marginVertical:17
            }]}>
              <View style={{ flex: 0.2,alignItems:'center',justifyContent:'center' }} >
                <View style={styles.space}/>
              </View>
              <View style={{ flex: 1,alignItems:'flex-start' }} >
                <Text style={{fontFamily:"HindSemiBold",fontSize:15}}>Class teacher</Text>
              </View>
            </View>}
          </View>
          <View style={{ flex: 2}} >
            <FlatList data={data} renderItem={renderClass} numColumns={2} />
          </View>
          {keyboardStatus == "Keyboard Hidden" &&
          (<View style={{ flex: 0.3 }} >
            <TeachersHome />
          </View>)}
        </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "white",
  },
  labelInput: {
    color: "#673AB7",
    fontSize: 20,
  },
  formInput: {
    borderBottomWidth: 1.5,
    marginLeft: 20,
    borderColor: "#333",
  },
  input: {
    borderWidth: 0,
  },
  eventName: {
    fontFamily: "HindSemiBold",
    fontSize: 18,
    margin: 10,
    marginTop: 0,
  },
  home: {
    marginTop: 29,
  },
  root: {
    // backgroundColor: "#EBECFO",
    backgroundColor: "white",
    height: "100%",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
    backgroundColor: "white",
    height: "200%",
  },
  errorBorderColor: {
    borderColor: "red",
  },
  errorBorderColorDate: {
    borderBottomColor: "red",
  },

  space: {
    width: 20,
    height: 20,
    backgroundColor:'orange'
  },
  th: {
    padding: 5,

    //fontSize: 24,
  },
  tableHeader: {
    backgroundColor: "skyblue",

    height: 50,
    fontWeight: "bold",
  },
  tableTitle: {
    // padding: 5,
    margin: 7,
    fontFamily: "MonsterratBold",
    fontSize: 16,
  },
  flexStyleCol: {
    flex: 1,
    flexDirection: "column",
  },
  tableCell: {
    width: 50,
    //  fontFamily: "Montserrat_600SemiBold",
    left: 10,

    maxWidth: 200,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    whiteSpace: "pre-line",
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 20,
    // backgroundColor: "white",
    backgroundColor: "#F0F3F4",

    // height:deviceWidth < 370 ? "6%" : "6%",
  },
  errorLabel: {
    color: "red",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    //  fontSize: deviceWidth < 370 ? 13 : 15,
  },
  normalLabel: {
    // color: "#A7ADAD",
    color: "#AEB6BF",
    // backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    // bottom: 0,
    //fontSize: deviceWidth < 370 ? 13 : 16,
    letterSpacing: 0.5,
  },
  submitLabel: {
    color: "grey",
    color: "#AEB6BF",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    //  fontSize: deviceWidth < 370 ? 13 : 15,
  },
  btnSubmit1: {
    marginTop: 90,
    marginBottom: 30,
    marginLeft: 190,
    width: "50%",
  },
  cancel: {
    marginTop: -140,
    marginLeft: -15,
    width: "50%",
  },
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
    left: 35,
  },
  focusStyle: {
    borderColor: "blue",
  },
  test: {
    position: "absolute",
    // top: deviceWidth < 370 ? 2 : 10,
    //left: deviceWidth < 370 ? 40 : 50,
  },
  testSuccess: {
    position: "absolute",
    //  top: deviceWidth < 370 ? 28 : 32,
    left: 50,
  },
  descriptionUp: {
    position: "absolute",
    // top: deviceWidth < 370 ? 68 : 87,
    //left: deviceWidth < 370 ? 40 : 50,
  },
  descriptionDown: {
    position: "absolute",
    //top: deviceWidth < 370 ? 93 : 107,
    left: 50,
  },
  descriptionUpExtra: {
    position: "absolute",
    //   top: deviceWidth < 370 ? 90 : 115,
    // left: deviceWidth < 370 ? 40 : 50,
  },
  descriptionDownExtra: {
    position: "absolute",
    // top: deviceWidth < 370 ? 115 : 137,
    left: 50,
  },

  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default MyClasses;

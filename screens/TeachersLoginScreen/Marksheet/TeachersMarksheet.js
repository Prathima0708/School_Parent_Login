import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Button as Btn,
  Alert,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import { UserId } from "../../Login";
import BgButton from "../../../components/UI/BgButton";
import TeachersHome from "../BottomTab/TeachersHome";
import Input from "../../../components/UI/Input";
import VerticalLine from "../../../components/UI/VerticalLine";
import { FlatList } from "react-native";
import { DataTable } from "react-native-paper";
import SearchBar from "react-native-dynamic-search-bar";

import SelectList from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";
export var ID;
export var StudentList = [];
const TeachersMarksheet = () => {
  const [mathsMarks, setMathsMarks] = useState("");
  const [enteredMathsMarksTouched, setEnteredMathsMarksTouched] =
    useState(false);
  const enteredMathsMarksIsValid = mathsMarks.toString().trim() !== "";
  const mathsMarksInputIsInValid =
    !enteredMathsMarksIsValid && enteredMathsMarksTouched;

  const [engMarks, setEngMarks] = useState("");
  const [enteredEngMarksTouched, setEnteredEngMarksTouched] = useState(false);
  const enteredEngMarksIsValid = engMarks.trim() !== "";
  const engMarksInputIsInValid =
    !enteredEngMarksIsValid && enteredEngMarksTouched;

  const [sciMarks, setSciMarks] = useState("");
  const [enteredSciMarksTouched, setEnteredSciMarksTouched] = useState(false);
  const enteredSciMarksIsValid = sciMarks.trim() !== "";
  const sciMarksInputIsInValid =
    !enteredSciMarksIsValid && enteredSciMarksTouched;

  const [hindiMarks, setHindiMarks] = useState("");
  const [enteredHindiMarksTouched, setEnteredHindiMarksTouched] =
    useState(false);
  const enteredHindiMarksIsValid = hindiMarks.trim() !== "";
  const hindiMarksInputIsInValid =
    !enteredHindiMarksIsValid && enteredHindiMarksTouched;

  const [socMarks, setSocMarks] = useState("");
  const [enteredSocMarksTouched, setEnteredSocMarksTouched] = useState(false);
  const enteredSocMarksIsValid = socMarks.trim() !== "";
  const socMarksInputIsInValid =
    !enteredSocMarksIsValid && enteredSocMarksTouched;

  const [kanMarks, setKanMarks] = useState("");
  const [enteredKanMarksTouched, setEnteredKanMarksTouched] = useState(false);
  const enteredKanMarksIsValid = kanMarks.trim() !== "";
  const kanMarksInputIsInValid =
    !enteredKanMarksIsValid && enteredKanMarksTouched;

  const [compMarks, setCompMarks] = useState("");
  const [enteredCompMarksTouched, setEnteredCompMarksTouched] = useState(false);
  const enteredCompMarksIsValid = compMarks.trim() !== "";
  const compMarksInputIsInValid =
    !enteredCompMarksIsValid && enteredCompMarksTouched;

  const [overallperct, setEnteredOverallPerct] = useState("");
  const [enteredOverallPercentageTouched, setEnteredOverallPercentageTouched] =
    useState(false);
  const enteredOverallPercentageIsValid = overallperct.trim() !== "";
  const overallpercentageInputIsInValid =
    !enteredOverallPercentageIsValid && enteredOverallPercentageTouched;

  const [remark, setEnteredRemark] = useState("");
  const [enteredReamrkTouched, setEnteredReamrkTouched] = useState(false);
  // const enteredReamrkIsValid = remark.trim() !== "";
  // const remarkInputIsInValid = !enteredReamrkIsValid && enteredReamrkTouched;

  const [showForm, setShowForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [showMarksheet, setShowMarksheet] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [forMarkssheetList, setForMarkssheetList] = useState({
    backgroundColor: "#0C60F4",
    color: "white",
    borderRadius: 10,
  });
  const [forMarkssheetForm, setForMarkssheetForm] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 10,
  });

  const [selected, setSelected] = useState("");
  const [studData, setStudData] = useState([]);

  const [studList, setStudList] = useState([]);
  const [marksheetData, setMarksheetData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [showDefaultList, setShowDefaultList] = useState(true);
  const [showInitialBtn, setShowInitialBtn] = useState(true);

  function mathsMarksChangeHandler(enteredValue) {
    setMathsMarks(enteredValue);
  }
  function engMarksChangeHandler(enteredValue) {
    setEngMarks(enteredValue);
  }
  function sciMarksChangeHandler(enteredValue) {
    setSciMarks(enteredValue);
  }
  function hindiMarksChangeHandler(enteredValue) {
    setHindiMarks(enteredValue);
  }
  function socMarksChangeHandler(enteredValue) {
    setSocMarks(enteredValue);
  }
  function kanMarksChangeHandler(enteredValue) {
    setKanMarks(enteredValue);
  }
  function compMarksChangeHandler(enteredValue) {
    setCompMarks(enteredValue);
  }
  function percentageChangeHandler(enteredValue) {
    setEnteredOverallPerct(enteredValue);
  }
  function remarkChangeHandler(enteredValue) {
    setEnteredRemark(enteredValue);
  }

  function mathsMarksBlurHandler() {
    setEnteredMathsMarksTouched(true);
  }
  function engMarksBlurHandler() {
    setEnteredEngMarksTouched(true);
  }
  function sciMarksBlurHandler() {
    setEnteredSciMarksTouched(true);
  }
  function hindiMarksBlurHandler() {
    setEnteredHindiMarksTouched(true);
  }
  function socMarksBlurHandler() {
    setEnteredSocMarksTouched(true);
  }
  function kanMarksBlurHandler() {
    setEnteredKanMarksTouched(true);
  }
  function compMarksBlurHandler() {
    setEnteredCompMarksTouched(true);
  }
  function overallpercentageBlurHandler() {
    setEnteredOverallPercentageTouched(true);
  }
  function remarkBlurHandler() {
    setEnteredReamrkTouched(true);
  }
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get(`http://10.0.2.2:8000/school/Marksheet/`);
  //       setMarksheetData(res.data);
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  function updateHandler() {
    // console.log(UserId);
    console.log(ID);
    const FormData = {
      student_name: StudentList.student_name,
      class_name: StudentList.class_name,
      Roll_no: 0,
      student_reg_no: StudentList.reg_number,
      maths_max_marks: 0,
      maths_obt_mark: mathsMarks,
      maths_min_mark: 0,
      maths_tot_mark: 0,
      maths_percentg: 0,
      english_max_marks: 0,

      english_obt_mark: engMarks,
      english_min_mark: 0,
      english_tot_mark: 0,
      english_percentg: 0,
      science_max_mark: 0,

      science_obt_mark: sciMarks,
      science_min_mark: 0,
      science_tot_mark: 0,
      science_percentg: 0,
      hindi_max_mark: 0,

      hindi_obt_mark: hindiMarks,
      hindi_min_mark: 0,
      hindi_tot_mark: 0,
      hindi_percentg: 0,
      social_max_mark: 0,

      social_obt_mark: socMarks,
      social_min_mark: 0,
      social_tot_mark: 0,
      social_percentg: 0,
      kannada_max_mark: 0,

      kannada_obt_mark: kanMarks,

      kannada_min_mark: 0,
      kannada_tot_mark: 0,
      kannada_percentg: 0,
      computer_max_mark: 0,

      computer_obt_mark: 0,
      computer_min_mark: 0,
      computer_tot_mark: 0,
      computer_percentg: 0,
    };
    // console.log(FormData);
    async function updateData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const resLogin = await axios.put(
          `http://10.0.2.2:8000/school/Marksheet/${ID}/`,
          FormData,
          {
            headers: headers,
          }
        );
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        //   console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
    }
    updateData();
    Alert.alert("Successfully updated", "", [
      { text: "OK", onPress: () => fetchData },
    ]);

    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Marksheet/`);
        setMarksheetData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    setMathsMarks("");
    setEngMarks("");
    setSciMarks("");
    setSocMarks("");
    setKanMarks("");
    setHindiMarks("");
    setCompMarks("");
    setEnteredOverallPerct("");
    setEnteredRemark("");
    setShowAddForm(false);
    setShowMarksheet(true);
    setForMarkssheetList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForMarkssheetForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
  }

  function buttonPressedHandler() {
    //console.log(StudentList.student_name);
    // console.log(UserId);
    const FormData = {
      student_name: StudentList.student_name,
      class_name: StudentList.class_name,

      Roll_no: StudentList.reg_number,
      maths_max_marks: 0,
      maths_obt_mark: mathsMarks,
      maths_min_mark: 0,
      maths_tot_mark: 0,
      maths_percentg: 0,
      english_max_marks: 0,

      english_obt_mark: engMarks,
      english_min_mark: 0,
      english_tot_mark: 0,
      english_percentg: 0,
      science_max_mark: 0,

      science_obt_mark: sciMarks,
      science_min_mark: 0,
      science_tot_mark: 0,
      science_percentg: 0,
      hindi_max_mark: 0,

      hindi_obt_mark: hindiMarks,
      hindi_min_mark: 0,
      hindi_tot_mark: 0,
      hindi_percentg: 0,
      social_max_mark: 0,

      social_obt_mark: socMarks,
      social_min_mark: 0,
      social_tot_mark: 0,
      social_percentg: 0,
      kannada_max_mark: 0,

      kannada_obt_mark: kanMarks,

      kannada_min_mark: 0,
      kannada_tot_mark: 0,
      kannada_percentg: 0,
      computer_max_mark: 0,

      computer_obt_mark: 0,
      computer_min_mark: 0,
      computer_tot_mark: 0,
      computer_percentg: 0,
    };

    //console.log(FormData);

    setEnteredMathsMarksTouched(true);
    setEnteredSciMarksTouched(true);
    setEnteredEngMarksTouched(true);
    setEnteredHindiMarksTouched(true);
    setEnteredSocMarksTouched(true);
    setEnteredKanMarksTouched(true);
    // setEnteredCompMarksTouched(true);
    // setEnteredOverallPercentageTouched(true);
    // setEnteredReamrkTouched(true);

    const formIsValid =
      enteredMathsMarksIsValid &&
      engMarksInputIsInValid &&
      enteredSciMarksIsValid &&
      enteredHindiMarksIsValid &&
      enteredSocMarksIsValid &&
      enteredKanMarksIsValid;

    // if (formIsValid) {
    Alert.alert("Saved Data", "Saved Data successfully", [
      {
        text: "OK",
        onPress: () => {
          setShowForm(false);
          setShowAddForm(false);
          showMarksheetList();
        },
      },
    ]);
    // }

    if (!enteredMathsMarksIsValid) {
      return;
    }
    if (!enteredEngMarksIsValid) {
      return;
    }
    if (!enteredSciMarksIsValid) {
      return;
    }
    if (!enteredHindiMarksIsValid) {
      return;
    }
    if (!enteredSocMarksIsValid) {
      return;
    }
    if (!enteredKanMarksIsValid) {
      return;
    }

    async function storeData() {
      console.log(FormData);
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const resLogin = await axios.post(
          `http://10.0.2.2:8000/school/Marksheet/`,
          FormData,
          {
            headers: headers,
          }
        );
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        //   console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
    }
    storeData();

    setMathsMarks("");
    setEngMarks("");
    setSciMarks("");
    setSocMarks("");
    setKanMarks("");
    setHindiMarks("");
    setCompMarks("");
    setEnteredOverallPerct("");
    setEnteredRemark("");
    setEnteredMathsMarksTouched(false);
    setEnteredMathsMarksTouched(false);
    setEnteredEngMarksTouched(false);
    setEnteredSciMarksTouched(false);
    setEnteredSocMarksTouched(false);
    setEnteredHindiMarksTouched(false);
    setEnteredKanMarksTouched(false);
    setForMarkssheetList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForMarkssheetForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    // }
  }

  function showMarkssheetForm() {
    // setShowDefaultList(true);
    setShowAddForm(false);
    setShowForm(false);
    setForMarkssheetList({
      backgroundColor: "#0C60F4",
      color: "white",
      borderRadius: 10,
    });
    setForMarkssheetForm({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
    });
    setShowBtn(true);
    setShowMarksheet(false);
    setEnteredMathsMarksTouched(false);
    setEnteredMathsMarksTouched(false);
    setEnteredEngMarksTouched(false);
    setEnteredSciMarksTouched(false);
    setEnteredSocMarksTouched(false);
    setEnteredHindiMarksTouched(false);
    setEnteredKanMarksTouched(false);
    setIsEdit(false);
  }
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
        const res = await axios.get(`http://10.0.2.2:8000/school/Marksheet/`);
        // console.log(res.data);
        setMarksheetData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8000/school/Studentclass/")
      .then((response) => {
        let newArray = response.data.map((item) => {
          return {
            value: item.class_name + " - " + item.section,
          };
        });

        setStudData(newArray);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function viewStudentList() {
    setShowDefaultList(false);
    setShowForm(true);

    async function login() {
      let selectedData = selected.split(" - ");
      let class_name = selectedData[0];
      let section = selectedData[1];
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Student/`);
        //console.log(class_name, section);

        let filteredclass = res.data.filter(
          (ele) => ele.class_name == class_name
        );

        let filteredsection = res.data.filter((ele) => ele.section == section);

        const filteredList = filteredclass && filteredsection;

        let filteredc = filteredList.filter(
          (ele) => ele.class_name == class_name
        );

        // const id = filteredc.map((id) => id.reg_number);
        // console.log(id);

        // console.log(filteredc);
        // StudentList = filteredc;
        // console.log(StudentList);

        if (filteredc) {
          //console.log(studList);
          setStudList(filteredc);
          setFilteredData(filteredc);
        }

        if (filteredc.length == 0) {
          Alert.alert("No data found", "No data found for respective search");
        }
      } catch (error) {
        console.log(error);
      }
    }
    login();
  }
  function addForm(id) {
    console.log("i am pressed");
    const filteredDummuyData = studList.find((data) => data.id == id);
    // console.log(filteredDummuyData.student_name);
    StudentList = filteredDummuyData;
    //  console.log(StudentList.student_name);
    async function getData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Marksheet/`);

        let filteredlist = res.data.filter(
          (ele) => ele.Roll_no == StudentList.reg_number
        );
        // console.log(filteredlist);
        if (filteredlist.length > 0) {
          Alert.alert("reg number already exists", "please enter a new one", [
            {
              text: "OK",
              onPress: () => {
                setShowAddForm(false);
                showMarksheetList(true);
              },

              style: "cancel",
            },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();

    setShowAddForm(true);
    setShowForm(false);
    setShowBtn(false);
    setIsEdit(false);
    setEnteredMathsMarksTouched(false);
    setEnteredMathsMarksTouched(false);
    setEnteredEngMarksTouched(false);
    setEnteredSciMarksTouched(false);
    setEnteredSocMarksTouched(false);
    setEnteredHindiMarksTouched(false);
    setEnteredKanMarksTouched(false);
  }

  function cancelPressHandler() {
    setShowInitialBtn(true);
    setShowBtn(true);
    setShowForm(true);
    setShowAddForm(false);
    {
      isEdit && showMarksheetList(true);
    }
  }

  function editItem(id) {
    setShowInitialBtn(false);
    console.log(id);
    ID = id;
    const filteredDummuyData = marksheetData.find((data) => data.id == id);
    setMathsMarks(filteredDummuyData.maths_obt_mark);
    setEngMarks(filteredDummuyData.english_obt_mark);
    setSciMarks(filteredDummuyData.science_obt_mark);
    setHindiMarks(filteredDummuyData.hindi_obt_mark);
    setSocMarks(filteredDummuyData.social_obt_mark);
    setKanMarks(filteredDummuyData.kannada_obt_mark);
    setForMarkssheetList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForMarkssheetForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    setShowAddForm(true);
    setShowMarksheet(false);
    setIsEdit(true);
  }

  function deleteItem(id) {
    console.log(id);
    // const newFilteredData=data.filter((data)=>data.id != id);
    Alert.alert("Confirm Deletion", "You are about to delete this row!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes,delete",
        onPress: () => deleteData(),
      },
    ]);
    async function deleteData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        // const dataForm = FormData;
        const resLogin = await axios.delete(
          `http://10.0.2.2:8000/school/Marksheet/${id}/`,
          // FormData,
          {
            headers: headers,
          }
        );
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
      async function fetchData() {
        try {
          const res = await axios.get(`http://10.0.2.2:8000/school/Marksheet/`);
          // console.log(res.data);
          setMarksheetData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }

  const searchFilter = (text) => {
    console.log("search function");

    if (text) {
      const newData = studList.filter((item) => {
        const itemData = item.student_name
          ? item.student_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setStudList(newData);
      setSearchText(text);
    } else {
      setFilteredData(studList);
      setStudList(studList);
      setSearchText(text);
    }
  };

  return (
    <>
      {showInitialBtn && (
        <View style={styles.BtnContainer}>
          <BgButton onPress={showMarkssheetForm} style={forMarkssheetList}>
            Add Marksheet
          </BgButton>

          <BgButton onPress={showMarksheetList} style={forMarkssheetForm}>
            Show List
          </BgButton>
        </View>
      )}

      {showBtn && (
        <>
          <View style={{ width: 170, fontSize: 20, marginTop: 13, margin: 10 }}>
            <SelectList
              //  defaultOption={{ key: "1", value: "Second-A" }}
              setSelected={setSelected}
              data={studData}
              placeholder="Select class"
              boxStyles={{ borderRadius: 0 }}
              dropdownTextStyles={{ fontSize: 18, fontFamily: "HindRegular" }}
              inputStyles={{ fontSize: 20, fontFamily: "HindRegular" }}
            />
          </View>
          <View
            style={{
              width: "50%",
              marginTop: -93,
              marginLeft: 200,
              position: "absolute",
              top: 160,
            }}
          >
            <Button onPress={viewStudentList}>View List</Button>
          </View>
        </>
      )}

      {showDefaultList && (
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
                      <Btn title="Add" onPress={() => addForm(data.id)} />
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
            </DataTable>
          </ScrollView>
        </>
      )}

      {showForm && (
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
                      <Btn title="Add" onPress={() => addForm(data.id)} />
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
            </DataTable>
          </ScrollView>
        </>
      )}

      {showAddForm && (
        <>
          <View style={styles.inputForm}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Input
                  placeholder="Maths"
                  maxLength={3}
                  onChangeText={mathsMarksChangeHandler}
                  blur={mathsMarksBlurHandler}
                  value={mathsMarks.toString()}
                  onSubmitEditing={Keyboard.dismiss}
                  style={mathsMarksInputIsInValid && styles.errorBorderColor}
                />
                {mathsMarksInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                  >
                    Enter maths marks
                  </Text>
                )}
              </View>

              <View style={styles.space} />

              <View style={{ flex: 1 }}>
                <Input
                  placeholder="English"
                  maxLength={3}
                  onChangeText={engMarksChangeHandler}
                  blur={engMarksBlurHandler}
                  value={engMarks.toString()}
                  onSubmitEditing={Keyboard.dismiss}
                  style={engMarksInputIsInValid && styles.errorBorderColor}
                />
                {engMarksInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                  >
                    Enter eng marks
                  </Text>
                )}
              </View>

              <View style={{ flex: 1 }}>
                <Input
                  placeholder="Science"
                  maxLength={2}
                  onChangeText={sciMarksChangeHandler}
                  blur={sciMarksBlurHandler}
                  value={sciMarks.toString()}
                  onSubmitEditing={Keyboard.dismiss}
                  style={sciMarksInputIsInValid && styles.errorBorderColor}
                />
                {sciMarksInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                  >
                    Enter sci marks
                  </Text>
                )}
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Input
                  placeholder="Hindi"
                  maxLength={3}
                  onChangeText={hindiMarksChangeHandler}
                  blur={hindiMarksBlurHandler}
                  value={hindiMarks.toString()}
                  onSubmitEditing={Keyboard.dismiss}
                  style={hindiMarksInputIsInValid && styles.errorBorderColor}
                />
                {hindiMarksInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                  >
                    Enter hindi marks
                  </Text>
                )}
              </View>

              <View style={styles.space} />

              <View style={{ flex: 1 }}>
                <Input
                  placeholder="Social"
                  maxLength={3}
                  onChangeText={socMarksChangeHandler}
                  blur={socMarksBlurHandler}
                  value={socMarks.toString()}
                  onSubmitEditing={Keyboard.dismiss}
                  style={socMarksInputIsInValid && styles.errorBorderColor}
                  keyboardType="number-pad"
                />
                {socMarksInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                  >
                    Enter social marks
                  </Text>
                )}
              </View>

              <View style={{ flex: 1 }}>
                <Input
                  placeholder="Kannada"
                  maxLength={3}
                  onChangeText={kanMarksChangeHandler}
                  blur={kanMarksBlurHandler}
                  value={kanMarks.toString()}
                  onSubmitEditing={Keyboard.dismiss}
                  style={kanMarksInputIsInValid && styles.errorBorderColor}
                />
                {kanMarksInputIsInValid && (
                  <Text
                    style={{
                      color: "red",
                      left: 20,
                      fontFamily: "HindRegular",
                      fontSize: 18,
                    }}
                  >
                    Enter kannada marks
                  </Text>
                )}
              </View>
            </View>

            {/* <Input
              placeholder="Remark"
              onChangeText={remarkChangeHandler}
              blur={remarkBlurHandler}
              value={remark}
              onSubmitEditing={Keyboard.dismiss}
              style={remarkInputIsInValid && styles.errorBorderColor}
            />
            {remarkInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Enter remark
              </Text>
            )} */}
          </View>
          {isEdit && (
            <>
              <View style={styles.btnSubmit}>
                <Button onPress={updateHandler}>Update</Button>
              </View>
            </>
          )}
          {!isEdit && (
            <View style={styles.btnSubmit}>
              <Button onPress={buttonPressedHandler}>Add </Button>
            </View>
          )}
          <View style={styles.btnCancel}>
            <Button onPress={cancelPressHandler}> Cancel</Button>
          </View>
        </>
      )}

      {showMarksheet && (
        <ScrollView horizontal={true}>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>REG NO</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>NAME</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>MATHS</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>ENG</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>SCI</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>HIN</Text>
              </View>

              <View style={styles.th}>
                <Text style={styles.tableTitle}>SOC</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>KAN</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>COMP</Text>
              </View>
              <View style={styles.th}>
                <Text
                  style={{
                    margin: 7,
                    marginLeft: 50,
                    fontFamily: "MonsterratBold",
                    fontSize: 16,
                  }}
                >
                  ACTIONS
                </Text>
              </View>
            </DataTable.Header>

            {marksheetData &&
              marksheetData.map((data, key) => (
                <DataTable.Row style={styles.tableRow} key={key}>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                    }}
                  >
                    {data.Roll_no}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                      width: "60%",
                    }}
                  >
                    {data.student_name}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                      width: "60%",
                    }}
                  >
                    {data.maths_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                    }}
                  >
                    {data.english_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                    }}
                  >
                    {data.science_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                    }}
                  >
                    {data.hindi_obt_mark}
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                    }}
                  >
                    {data.social_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 40,
                    }}
                  >
                    {data.kannada_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 50,
                    }}
                  >
                    {data.computer_obt_mark}
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 100,
                    }}
                  >
                    <Ionicons
                      name="md-pencil-sharp"
                      size={24}
                      color="green"
                      onPress={() => editItem(data.id)}
                    />
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 10,
                    }}
                  >
                    <Ionicons
                      name="trash"
                      size={24}
                      color="red"
                      onPress={() => deleteItem(data.id)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      )}
    </>
  );
};

export default TeachersMarksheet;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",
    width: "50%",
  },
  tableBtn: {
    marginLeft: -15,
  },
  tableMarksBtn: {
    marginLeft: 15,
  },
  container: {
    padding: 10,
  },
  home: {
    marginTop: 29,
  },
  type: {
    left: 30,
  },
  root: {
    backgroundColor: "#EBECFO",
    // backgroundColor:'white'
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  errorBorderColor: {
    color: "black",
    borderBottomWidth: 1,
    borderColor: "red",
    padding: 10,
    margin: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
  },
  btnSubmit: {
    marginTop: 30,
    //marginBottom: 30,
    width: "50%",
    marginLeft: deviceWidth < 370 ? 170 : 180,
  },
  btnCancel: {
    marginTop: -110,
    marginLeft: 10,
    width: "50%",
  },
  th: {
    padding: 5,
    marginRight: 13,
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

    marginTop: 10,
    marginBottom: 20,
  },
});

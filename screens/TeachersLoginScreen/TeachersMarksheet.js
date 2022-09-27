// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import React, { useEffect } from "react";
// import { AntDesign } from "@expo/vector-icons";
// import { useState } from "react";
// import { useRef } from "react";

// import Button from "../../components/UI/Button";
// import axios from "axios";
// import { Keyboard } from "react-native";
// import BgButton from "../../components/UI/BgButton";
// import TeachersHome from "./TeachersHome";
// import Input from "../../components/UI/Input";
// const TeachersMarksheet = () => {
//   const [studentname, setEnteredStudentName] = useState("");
//   const [enteredStudentnameTouched, setEnteredStudentnameTouched] =
//     useState(false);
//   const enteredStudentnameIsValid = studentname.trim() !== "";
//   const studentnameInputIsInValid =
//     !enteredStudentnameIsValid && enteredStudentnameTouched;

//   const [overallperct, setEnteredOverallPerct] = useState("");
//   const [enteredOverallPercentageTouched, setEnteredOverallPercentageTouched] =
//     useState(false);
//   const enteredOverallPercentageIsValid = overallperct.trim() !== "";
//   const overallpercentageInputIsInValid =
//     !enteredOverallPercentageIsValid && enteredOverallPercentageTouched;

//   const [remark, setEnteredRemark] = useState("");
//   const [enteredReamrkTouched, setEnteredReamrkTouched] = useState(false);
//   const enteredReamrkIsValid = remark.trim() !== "";
//   const remarkInputIsInValid = !enteredReamrkIsValid && enteredReamrkTouched;

//   const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

//   useEffect(() => {
//     const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
//       setKeyboardStatus("Keyboard Shown");
//     });
//     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
//       setKeyboardStatus("Keyboard Hidden");
//     });

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   function studentNameChangeHandler(enteredValue) {
//     setEnteredStudentName(enteredValue);
//   }
//   function percentageChangeHandler(enteredValue) {
//     setEnteredOverallPerct(enteredValue);
//   }
//   function remarkChangeHandler(enteredValue) {
//     setEnteredRemark(enteredValue);
//   }

//   function buttonPressedHandler() {
//     // console.log(UserId);
//     const FormData = {
//       name: studentname,
//       value1: overallperct,
//       value2: remark,
//     };
//     console.log(FormData);

//     setEnteredStudentnameTouched(true);
//     setEnteredOverallPercentageTouched(true);
//     setEnteredReamrkTouched(true);

//     if (!enteredStudentnameIsValid) {
//       return;
//     }
//     if (!enteredOverallPercentageIsValid) {
//       return;
//     }
//     if (!enteredReamrkIsValid) {
//       return;
//     } else {
//       async function storeData() {
//         try {
//           let headers = {
//             "Content-Type": "application/json; charset=utf-8",
//           };

//           const resLogin = await axios.post(
//             `http://10.0.2.2:8000/school/AddmoreMarksheet_list/`,
//             FormData,
//             {
//               headers: headers,
//             }
//           );
//           // const token = resLogin.data.token;
//           // const userId = resLogin.data.user_id;
//           console.log(resLogin.data);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       storeData();
//       setEnteredStudentName("");
//       setEnteredOverallPerct("");
//       setEnteredRemark("");
//       setEnteredStudentnameTouched(false);
//       setEnteredOverallPercentageTouched(false);
//       setEnteredReamrkTouched(false);
//     }
//   }

//   function studentnameBlurHandler() {
//     setEnteredStudentnameTouched(true);
//   }
//   function overallpercentageBlurHandler() {
//     setEnteredOverallPercentageTouched(true);
//   }
//   function remarkBlurHandler() {
//     setEnteredReamrkTouched(true);
//   }

//   return (
//     <>
//       {/* <View style={styles.BtnContainer}>
//         <BgButton>Add Marksheet</BgButton>
//       </View> */}

//       <ScrollView style={{ backgroundColor: "white" }}>
//         <View style={styles.inputForm}>
//           <Input
//             placeholder="Student Name"
//             onChangeText={studentNameChangeHandler}
//             blur={studentnameBlurHandler}
//             value={studentname}
//             onSubmitEditing={Keyboard.dismiss}
//             style={studentnameInputIsInValid && styles.errorBorderColor}
//           />
//           {studentnameInputIsInValid && (
//             <Text style={{ color: "red", left: 20 }}>Enter student name</Text>
//           )}

//           <Input
//             placeholder="Overall Percentage"
//             onChangeText={percentageChangeHandler}
//             blur={overallpercentageBlurHandler}
//             value={overallperct}
//             onSubmitEditing={Keyboard.dismiss}
//             style={overallpercentageInputIsInValid && styles.errorBorderColor}
//           />
//           {overallpercentageInputIsInValid && (
//             <Text style={{ color: "red", left: 20 }}>
//               Enter overall percentage
//             </Text>
//           )}

//           <Input
//             placeholder="Remark"
//             onChangeText={remarkChangeHandler}
//             blur={remarkBlurHandler}
//             value={remark}
//             onSubmitEditing={Keyboard.dismiss}
//             style={remarkInputIsInValid && styles.errorBorderColor}
//           />
//           {remarkInputIsInValid && (
//             <Text style={{ color: "red", left: 20 }}>Enter remark</Text>
//           )}

//           <View style={styles.btnSubmit}>
//             <Button onPress={buttonPressedHandler}>Add Marksheet</Button>
//           </View>
//         </View>
//       </ScrollView>
//       {keyboardStatus == "Keyboard Hidden" && (
//         <View style={styles.home}>
//           <TeachersHome />
//         </View>
//       )}
//     </>
//   );
// };

// export default TeachersMarksheet;

// const styles = StyleSheet.create({
//   BtnContainer: {
//     fontSize: 24,
//   },
//   home: {
//     marginTop: 29,
//   },
//   root: {
//     backgroundColor: "#EBECFO",
//   },
//   inputForm: {
//     padding: 20,
//     paddingTop: 5,
//   },
//   errorBorderColor: {
//     color: "black",
//     borderBottomWidth: 1,
//     borderColor: "red",
//     padding: 10,
//     margin: 15,
//     paddingVertical: 5,
//     borderRadius: 5,
//     fontSize: 18,
//   },
//   btnSubmit: {
//     marginTop: 27,
//     marginBottom: 39,
//   },
// });

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Button as Btn,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import axios from "axios";
import { Keyboard } from "react-native";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
import TeachersHome from "./TeachersHome";
import Input from "../../components/UI/Input";
import VerticalLine from "../../components/UI/VerticalLine";
import { FlatList } from "react-native";
import { DataTable } from "react-native-paper";

import SelectList from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";
export var ID;
const TeachersMarksheet = () => {
  const [mathsMarks, setMathsMarks] = useState("");
  const [enteredMathsMarksTouched, setEnteredMathsMarksTouched] =
    useState(false);
  const enteredMathsMarksIsValid = mathsMarks;
  const mathsMarksInputIsInValid =
    !enteredMathsMarksIsValid && enteredMathsMarksTouched;

  const [engMarks, setEngMarks] = useState("");
  const [enteredEngMarksTouched, setEnteredEngMarksTouched] = useState(false);
  const enteredEngMarksIsValid = engMarks;
  const engMarksInputIsInValid =
    !enteredEngMarksIsValid && enteredEngMarksTouched;

  const [sciMarks, setSciMarks] = useState("");
  const [enteredSciMarksTouched, setEnteredSciMarksTouched] = useState(false);
  const enteredSciMarksIsValid = sciMarks;
  const sciMarksInputIsInValid =
    !enteredSciMarksIsValid && enteredSciMarksTouched;

  const [hindiMarks, setHindiMarks] = useState("");
  const [enteredHindiMarksTouched, setEnteredHindiMarksTouched] =
    useState(false);
  const enteredHindiMarksIsValid = hindiMarks;
  const hindiMarksInputIsInValid =
    !enteredHindiMarksIsValid && enteredHindiMarksTouched;

  const [socMarks, setSocMarks] = useState("");
  const [enteredSocMarksTouched, setEnteredSocMarksTouched] = useState(false);
  const enteredSocMarksIsValid = socMarks;
  const socMarksInputIsInValid =
    !enteredSocMarksIsValid && enteredSocMarksTouched;

  const [kanMarks, setKanMarks] = useState("");
  const [enteredKanMarksTouched, setEnteredKanMarksTouched] = useState(false);
  const enteredKanMarksIsValid = kanMarks;
  const kanMarksInputIsInValid =
    !enteredKanMarksIsValid && enteredKanMarksTouched;

  const [compMarks, setCompMarks] = useState("");
  const [enteredCompMarksTouched, setEnteredCompMarksTouched] = useState(false);
  const enteredCompMarksIsValid = compMarks;
  const compMarksInputIsInValid =
    !enteredCompMarksIsValid && enteredCompMarksTouched;

  const [overallperct, setEnteredOverallPerct] = useState("");
  const [enteredOverallPercentageTouched, setEnteredOverallPercentageTouched] =
    useState(false);
  const enteredOverallPercentageIsValid = overallperct;
  const overallpercentageInputIsInValid =
    !enteredOverallPercentageIsValid && enteredOverallPercentageTouched;

  const [remark, setEnteredRemark] = useState("");
  const [enteredReamrkTouched, setEnteredReamrkTouched] = useState(false);
  // const enteredReamrkIsValid = remark.trim() !== "";
  // const remarkInputIsInValid = !enteredReamrkIsValid && enteredReamrkTouched;

  const [showForm, setShowForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false); ///-----
  const [showBtn, setShowBtn] = useState(true);
  const [showMarksheet, setShowMarksheet] = useState(false);

  const [forMarkssheetList, setForMarkssheetList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forMarkssheetForm, setForMarkssheetForm] = useState({
    color: "black",
  });

  const [selected, setSelected] = useState("");
  const [studData, setStudData] = useState([]);

  const [studList, setStudList] = useState([]);
  const [marksheetData, setMarksheetData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
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
      maths_obt_mark: mathsMarks,
      english_obt_mark: engMarks,
      science_obt_mark: sciMarks,
      hindi_obt_mark: hindiMarks,
      social_obt_mark: socMarks,
      kannada_obt_mark: kanMarks,
      computer_obt_mark: compMarks,
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
        setData(res.data);
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
    setForMarkssheetList({ fontWeight: "bold", color: "black" });
    setForMarkssheetForm({ color: "black" });
    setForMarkssheetForm({ fontWeight: "bold", color: "black" });
    setForMarkssheetList({ color: "black" });
  }

  function buttonPressedHandler() {
    // console.log(UserId);
    const FormData = {
      maths_obt_mark: mathsMarks,
      english_obt_mark: engMarks,
      science_obt_mark: sciMarks,
      hindi_obt_mark: hindiMarks,
      social_obt_mark: socMarks,
      kannada_obt_mark: kanMarks,
      computer_obt_mark: compMarks,
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

    // if (!enteredMathsMarksIsValid) {
    //   return;
    // }
    // if (!enteredEngMarksIsValid) {
    //   return;
    // }
    // if (!enteredSciMarksIsValid) {
    //   return;
    // }
    // if (!enteredHindiMarksIsValid) {
    //   return;
    // }
    // if (!enteredSocMarksIsValid) {
    //   return;
    // }
    // if (!enteredKanMarksIsValid) {
    //   return;
    // }
    // if (!enteredCompMarksIsValid) {
    //   return;
    // }
    // if (!enteredOverallPercentageIsValid) {
    //   return;
    // }
    // if (!enteredReamrkIsValid) {
    //   return;
    // }
    // else {
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
    setForMarkssheetList({ fontWeight: "bold", color: "black" });
    setForMarkssheetForm({ color: "black" });
    setForMarkssheetForm({ fontWeight: "bold", color: "black" });
    setForMarkssheetList({ color: "black" });
    // }
  }

  function showMarkssheetForm() {
    setForMarkssheetList({ fontWeight: "bold", color: "black" });
    setForMarkssheetForm({ color: "black" });
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
    setForMarkssheetForm({ fontWeight: "bold", color: "black" });
    setForMarkssheetList({ color: "black" });
    setShowBtn(false);
    setShowAddForm(false);
    setShowForm(false);
    setShowMarksheet(true);

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
    setShowForm(true);
    async function login() {
      let selectedData = selected.split(" - ");
      let class_name = selectedData[0];
      let section = selectedData[1];
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Student/`);
        console.log(class_name, section);

        let filteredclass = res.data.filter(
          (ele) => ele.class_name == class_name
        );

        let filteredsection = res.data.filter((ele) => ele.section == section);

        const filteredList = filteredclass && filteredsection;

        let filteredc = filteredList.filter(
          (ele) => ele.class_name == class_name
        );

        console.log(filteredc);
        if (filteredc) {
          setStudList(filteredc);
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
  function addForm() {
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
    setShowBtn(true);
    setShowForm(true);
    setShowAddForm(false);
  }

  function editItem(id) {
    console.log(id);
    ID = id;
    const filteredDummuyData = marksheetData.find((data) => data.id == id);
    setMathsMarks(filteredDummuyData.maths_obt_mark);
    setEngMarks(filteredDummuyData.english_obt_mark);
    setSciMarks(filteredDummuyData.science_obt_mark);
    setHindiMarks(filteredDummuyData.hindi_obt_mark);
    setSocMarks(filteredDummuyData.social_obt_mark);
    setKanMarks(filteredDummuyData.kannada_obt_mark);
    setForMarkssheetList({ fontWeight: "bold", color: "black" });
    setForMarkssheetForm({ color: "black" });
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

  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton onPress={showMarkssheetForm} style={forMarkssheetList}>
          Add Marksheet
        </BgButton>
        <VerticalLine>|</VerticalLine>
        <BgButton onPress={showMarksheetList} style={forMarkssheetForm}>
          Show List
        </BgButton>
      </View>

      {showBtn && (
        <>
          <View style={{ width: 250, fontSize: 20, marginTop: 13, margin: 10 }}>
            <SelectList
              setSelected={setSelected}
              data={studData}
              placeholder="Select class"
              boxStyles={{ borderRadius: 0 }}
              dropdownTextStyles={{ fontSize: 18, fontFamily: "HindRegular" }}
              inputStyles={{ fontSize: 20, fontFamily: "HindRegular" }}
            />
          </View>
          <View style={{ width: "50%", margin: 30 }}>
            <Button onPress={viewStudentList}>View List</Button>
          </View>
        </>
      )}
      {showForm && (
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

            {studList &&
              studList.map((data, key) => (
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
                    <Btn title="Add" onPress={addForm} />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      )}

      {showAddForm && (
        <>
          <View style={styles.inputForm}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Input
                  placeholder="Maths"
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
                  onChangeText={socMarksChangeHandler}
                  blur={socMarksBlurHandler}
                  value={socMarks.toString()}
                  onSubmitEditing={Keyboard.dismiss}
                  style={socMarksInputIsInValid && styles.errorBorderColor}
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
            <View style={styles.btnSubmit}>
              <Button onPress={updateHandler}>Update</Button>
            </View>
          )}
          {!isEdit && (
            <View style={styles.btnSubmit}>
              <Button onPress={buttonPressedHandler}>Add Marksheet</Button>
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
                <Text style={styles.tableTitle}>MATHS</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>ENGLISH</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>SCIENCE</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>HINDI</Text>
              </View>

              <View style={styles.th}>
                <Text style={styles.tableTitle}>SOCIAL</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>KANNADA</Text>
              </View>
              <View style={styles.th}>
                <Text style={styles.tableTitle}>COMPUTER</Text>
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
                    {data.maths_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 50,
                    }}
                  >
                    {data.english_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 60,
                    }}
                  >
                    {data.science_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 60,
                    }}
                  >
                    {data.hindi_obt_mark}
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 60,
                    }}
                  >
                    {data.social_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 70,
                    }}
                  >
                    {data.kannada_obt_mark}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 18,
                      fontFamily: "HindRegular",
                      marginLeft: 90,
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

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",
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
    marginBottom: 30,
    width: "50%",
    marginLeft: 180,
  },
  btnCancel: {
    marginTop: -80,
    marginLeft: 10,
    width: "40%",
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
});

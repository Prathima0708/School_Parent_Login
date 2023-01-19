import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Button as Btn,
  Alert,
  Dimensions,
  Animated,
  ActivityIndicator,
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
import UnderlinedInput from "../../../components/UI/UnderlinedInput";
import { subURL } from "../../../components/utils/URL's";
import { style } from "@mui/system";
import { IconButton, Text as NativeText } from "native-base";
export var ID;
export var StudentList = [];
var newArray, firstData, KEY, VALUE, CANCELKEY, CANCELVALUE;
const TeachersMarksheet = () => {
  const [defaultClass, setDefaultClass] = useState();
  const [mathsLabel, setMathsLabel] = useState(true);
  const [engLabel, setEngLabel] = useState(true);
  const [sciLabel, setSciLabel] = useState(true);
  const [hindiLabel, setHindiLabel] = useState(true);
  const [socLabel, setSocLabel] = useState(true);
  const [kanLabel, setKanLabel] = useState(true);
  const [compLabel, setCompLabel] = useState(true);
  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, 100);

  const headermax = 100;
  const headermin = 10;

  const animateHeaderBackGround = scrollY.interpolate({
    inputRange: [0, headermax - headermin],
    outputRange: ["#F2F2F2", "#F2F2F2"],
    extrapolate: "clamp",
  });

  const animateHeaderHeight = diffClamp.interpolate({
    inputRange: [0, headermax - headermin],
    outputRange: [headermax, headermin],
    extrapolate: "clamp",
  });
  // const [mathsLabel, setMathsLabel] = useState(false);
  // const [engLabel, setEngLabel] = useState(false);
  // const [sciLabel, setSciLabel] = useState(false);
  // const [hindiLabel, setHindiLabel] = useState(false);
  // const [socLabel, setSocLabel] = useState(false);
  // const [kanLabel, setKanLabel] = useState(false);
  // const [compLabel, setCompLabel] = useState(false);

  const [isMathFocused, setIsMathFocused] = useState(false);
  const [isEngFocused, setIsEngFocused] = useState(false);
  const [isSciFocused, setIsSciFocused] = useState(false);
  const [isHindiFocused, setIsHindiFocused] = useState(false);
  const [isSocFocused, setIsSocFocused] = useState(false);
  const [isKanFocused, setIsKanFocused] = useState(false);
  const [isComFocused, setIsComFocused] = useState(false);

  const [mathsMarks, setMathsMarks] = useState("");
  const [enteredMathsMarksTouched, setEnteredMathsMarksTouched] =
    useState(false);
  const enteredMathsMarksIsValid = mathsMarks.toString().trim() !== "";
  const mathsMarksInputIsInValid =
    !enteredMathsMarksIsValid && enteredMathsMarksTouched;

  const [engMarks, setEngMarks] = useState("");
  const [enteredEngMarksTouched, setEnteredEngMarksTouched] = useState(false);
  const enteredEngMarksIsValid = engMarks.toString().trim() !== "";
  //const enteredEngMarksIsValid = engMarks.length >= 1 && engMarks.length <= 3;
  const engMarksInputIsInValid =
    !enteredEngMarksIsValid && enteredEngMarksTouched;

  const [sciMarks, setSciMarks] = useState("");
  const [enteredSciMarksTouched, setEnteredSciMarksTouched] = useState(false);
  const enteredSciMarksIsValid = sciMarks.toString().trim() !== "";
  const sciMarksInputIsInValid =
    !enteredSciMarksIsValid && enteredSciMarksTouched;

  const [hindiMarks, setHindiMarks] = useState("");
  const [enteredHindiMarksTouched, setEnteredHindiMarksTouched] =
    useState(false);
  const enteredHindiMarksIsValid = hindiMarks.toString().trim() !== "";
  const hindiMarksInputIsInValid =
    !enteredHindiMarksIsValid && enteredHindiMarksTouched;

  const [socMarks, setSocMarks] = useState("");
  const [enteredSocMarksTouched, setEnteredSocMarksTouched] = useState(false);
  const enteredSocMarksIsValid = socMarks.toString().trim() !== "";
  const socMarksInputIsInValid =
    !enteredSocMarksIsValid && enteredSocMarksTouched;

  const [kanMarks, setKanMarks] = useState("");
  const [enteredKanMarksTouched, setEnteredKanMarksTouched] = useState(false);
  const enteredKanMarksIsValid = kanMarks.toString().trim() !== "";
  const kanMarksInputIsInValid =
    !enteredKanMarksIsValid && enteredKanMarksTouched;

  const [compMarks, setCompMarks] = useState("");
  const [enteredCompMarksTouched, setEnteredCompMarksTouched] = useState(false);
  const enteredCompMarksIsValid = compMarks.toString().trim() !== "";
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

  const [filteredMarks, setFilteredMarks] = useState([]);
  const [searchMarks, setSearchMarks] = useState("");

  const [loading, setLoading] = useState(false);

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

  const [btn, setBtn] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

  const [empty, setEmpty] = useState(false);
  const [cancelState, setIsCancelState] = useState(false);

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
    setIsMathFocused(false);
  }
  function onFocusMathHandler() {
    setIsMathFocused(true);
    setEnteredMathsMarksTouched(false);
    setMathsLabel(true);
  }

  function engMarksBlurHandler() {
    setEnteredEngMarksTouched(true);
    setIsEngFocused(false);
  }
  function onFocusEngHandler() {
    setIsEngFocused(true);
    setEnteredEngMarksTouched(false);
    setEngLabel(true);
  }

  function sciMarksBlurHandler() {
    setEnteredSciMarksTouched(true);
    setIsSciFocused(false);
  }
  function onFocusSciHandler() {
    setIsSciFocused(true);
    setEnteredSciMarksTouched(false);
    setSciLabel(true);
  }

  function hindiMarksBlurHandler() {
    setEnteredHindiMarksTouched(true);
    setIsHindiFocused(false);
  }
  function onFocusHindiHandler() {
    setIsHindiFocused(true);
    setEnteredHindiMarksTouched(false);
    setHindiLabel(true);
  }

  function socMarksBlurHandler() {
    setEnteredSocMarksTouched(true);
    setIsSocFocused(false);
  }
  function onFocusSocHandler() {
    setIsSocFocused(true);
    setEnteredSocMarksTouched(false);
    setSocLabel(true);
  }

  function kanMarksBlurHandler() {
    setEnteredKanMarksTouched(true);
    setIsKanFocused(false);
  }
  function onFocusKanHandler() {
    setIsKanFocused(true);
    setEnteredKanMarksTouched(false);
    setKanLabel(true);
  }

  function compMarksBlurHandler() {
    setEnteredCompMarksTouched(true);
    setIsComFocused(false);
  }
  function onFocusComHandler() {
    setIsComFocused(true);
    setEnteredCompMarksTouched(false);
    setCompLabel(true);
  }

  function overallpercentageBlurHandler() {
    setEnteredOverallPercentageTouched(true);
  }
  function remarkBlurHandler() {
    setEnteredReamrkTouched(true);
  }

  function updateHandler() {
    setShowInitialBtn(true);

    setIsMathFocused(false);
    setIsEngFocused(false);
    setIsSciFocused(false);
    setIsHindiFocused(false);
    setIsSocFocused(false);
    setIsKanFocused(false);
    setIsComFocused(false);

    setMathsLabel(true);
    setEngLabel(true);
    setSciLabel(true);
    setHindiLabel(true);
    setSocLabel(true);
    setKanLabel(true);
    setCompLabel(true);

    console.log(ID);
    const FormData = {
      // student_name: StudentList.student_name,
      // class_name: StudentList.class_name,
      // Roll_no: StudentList.reg_number,
      //student_reg_no: StudentList.reg_number,
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

      computer_obt_mark: compMarks,
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
          `${subURL}/Marksheet/${ID}/`,
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

    if (
      !enteredMathsMarksIsValid ||
      !enteredEngMarksIsValid ||
      !enteredSciMarksIsValid ||
      !enteredHindiMarksIsValid ||
      !enteredSocMarksIsValid ||
      !enteredKanMarksIsValid ||
      !enteredCompMarksIsValid
    ) {
      Alert.alert("Please enter all fields");
    } else {
      Alert.alert("Successfully updated", "", [
        { text: "OK", onPress: () => showMarksheetList() },
      ]);

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
  }

  function buttonPressedHandler() {
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

      computer_obt_mark: compMarks,
      computer_min_mark: 0,
      computer_tot_mark: 0,
      computer_percentg: 0,
    };

    //console.log(FormData);

    // setEnteredOverallPercentageTouched(true);
    // setEnteredReamrkTouched(true);

    const formIsValid =
      enteredMathsMarksIsValid &&
      engMarksInputIsInValid &&
      enteredSciMarksIsValid &&
      enteredHindiMarksIsValid &&
      enteredSocMarksIsValid &&
      enteredKanMarksIsValid &&
      enteredCompMarksIsValid;

    // if (formIsValid) {

    //  }
    setEnteredMathsMarksTouched(true);
    setEnteredMathsMarksTouched(true);
    setEnteredEngMarksTouched(true);
    setEnteredSciMarksTouched(true);
    setEnteredSocMarksTouched(true);
    setEnteredHindiMarksTouched(true);
    setEnteredKanMarksTouched(true);
    setEnteredCompMarksTouched(true);

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
    if (!enteredCompMarksIsValid) {
      return;
    }

    async function storeData() {
      console.log(FormData);
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const resLogin = await axios.post(`${subURL}/Marksheet/`, FormData, {
          headers: headers,
        });
        // const token = resLogin.data.token;
        // const userId = resLogin.data.user_id;
        //   console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
    }
    storeData();

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
    setEnteredCompMarksTouched(false);
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
    setEnteredCompMarksTouched(false);
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
        const res = await axios.get(`${subURL}/Marksheet/`);
        // console.log(res.data);
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
        console.log(newArray[0]);

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
    console.log(defaultClass);
  }, []);

  function viewStudentList() {
    setShowDefaultList(false);
    setShowForm(true);

    async function login() {
      console.log(selected);
      console.log(newArray);
      let filteredlist = newArray.filter((ele) => ele.key == selected);
      console.log("filteredlist", filteredlist);
      // let selectedData = selected.split(" - ");
      // console.log(selectedData);
      let class_name = filteredlist[0].classname;
      let section = filteredlist[0].section;
      // let selectedData = selected.split(" - ");
      // let class_name = selectedData[0];
      // let section = selectedData[1];
      try {
        const res = await axios.get(`${subURL}/Student/`);
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

        // if (filteredc.length == 0) {
        //   Alert.alert("No data found", "No data found for respective search");
        // }
      } catch (error) {
        console.log(error);
      }
    }
    login();
  }
  function addForm(id) {
    console.log("i am pressed");
    setShowAddForm(true);

    const filteredDummuyData = studList.find((data) => data.id == id);
    // console.log(filteredDummuyData.student_name);
    StudentList = filteredDummuyData;
    // console.log(filteredDummuyData);
    const studentregno = StudentList.reg_number;
    console.log(StudentList.reg_number);
    async function getData() {
      try {
        const res = await axios.get(`${subURL}/MarksheetReg/${studentregno}`);

        let filteredlist = res.data.filter(
          (ele) => ele.Roll_no == StudentList.reg_number
        );
        console.log(res.data);
        setFilteredMarks(res.data);
        if (filteredlist.length === 0) {
          console.log("empty");
          // setEmpty(true);
          // setShowForm(true);
          // setShowBtn(true);
          // setIsEdit(true);
          // setShowMarksheet(false);
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

  function cancelPressHandler() {
    setIsCancelState(true);
    console.log("from cancel handler", selected);
    let filteredlist = newArray.filter((ele) => ele.key == selected);
    console.log(filteredlist[0].value);
    CANCELKEY = filteredlist[0].key;
    CANCELVALUE = filteredlist[0].value;
    setShowInitialBtn(true);
    setShowBtn(true);
    setShowForm(true);
    setShowAddForm(false);
    setMathsLabel(false);
    setEngLabel(false);
    setSciLabel(false);
    setHindiLabel(false);
    setSocLabel(false);
    setKanLabel(false);
    setCompLabel(false);
    setShowMarksheet(false);
    {
      isEdit && showMarksheetList(true);
    }
  }

  function editItem(id) {
    setShowInitialBtn(false);
    setMathsLabel(true);
    setEngLabel(true);
    setSciLabel(true);
    setSocLabel(true);
    setHindiLabel(true);
    setCompLabel(true);
    setKanLabel(true);
    console.log(id);
    ID = id;
    const filteredDummuyData = marksheetData.find((data) => data.id == id);
    setMathsMarks(filteredDummuyData.maths_obt_mark);
    setEngMarks(filteredDummuyData.english_obt_mark);
    setSciMarks(filteredDummuyData.science_obt_mark);
    setHindiMarks(filteredDummuyData.hindi_obt_mark);
    setSocMarks(filteredDummuyData.social_obt_mark);
    setKanMarks(filteredDummuyData.kannada_obt_mark);
    setCompMarks(filteredDummuyData.computer_obt_mark);
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
          `${subURL}/Marksheet/${id}/`,
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
          const res = await axios.get(`${subURL}/Marksheet/`);
          // console.log(res.data);
          setMarksheetData(res.data);
          setFilteredMarks(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
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
      // setStudList(newData);
      setSearchText(text);
    } else {
      setFilteredData(studList);
      //setStudList(studList);
      setSearchText(text);
    }
  };

  const search = (text) => {
    if (text) {
      const newData = marksheetData.filter((item) => {
        const itemData = item.student_name
          ? item.student_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredMarks(newData);

      setSearchMarks(text);
    } else {
      setFilteredMarks(marksheetData);
      setSearchMarks(text);
    }
  };

  return (
    <>
      {/* {showInitialBtn && (
        <Animated.View
          style={[
            {
              height: animateHeaderHeight,
              backgroundColor: animateHeaderBackGround,
            },
          ]}
        >
          <Text>View List</Text>
        </Animated.View>
      )} */}
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
                  fontSize: 15,
                  top: "5%",
                  marginLeft: 10,
                }}
              >
                Select class
              </Text>
              <View style={styles.space} />
              <Text style={{ fontFamily: "HindSemiBold", fontSize: 15, top: "5%" }}>
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
                  inputStyles={{ fontSize: 25, fontFamily: "HindRegular" }}
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
                    <NativeText fontSize="xl" bold color="error.900">
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
                                <Text
                                  style={[
                                    styles.headerText,
                                    { color: "black" },
                                  ]}
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
                                  style={[
                                    styles.headerText,
                                    { color: "black" },
                                  ]}
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
                                  style={[
                                    styles.headerText,
                                    { color: "black" },
                                  ]}
                                >
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
            {/* <View
              style={[
                { flex: 1 },
                { flexDirection: "column", alignItems: "center" },
              ]}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: "darkblue",
                  
                  // marginHorizontal: 20,
                }}
              >
                <Text
                  style={[styles.headingFont, { fontSize: 18, color: "white" }]}
                >
                  Roll no
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: "darkblue",
                  // marginHorizontal: 20,
                }}
              >
                <Text
                  style={[styles.headingFont, { fontSize: 18, color: "white" }]}
                >
                  Student name
                </Text>
              </View>
            </View> */}
            <View
              style={[
                { flex: 1 },
                {
                  flexDirection: "column",
                  backgroundColor: "darkblue",
                  marginHorizontal: 20,
                  marginVertical: 60,
                  bottom: "5%",
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={[
                    { flex: 1 },
                    {
                      flexDirection: "row",
                    },
                  ]}
                >
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 60,
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={[
                        styles.headingFont,
                        { fontSize: 18, color: "white" },
                      ]}
                    >
                      Roll no
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginVertical: 10 }}>
                    {filteredMarks.map((data, key) => (
                      <Text
                        style={[
                          styles.headingFont,
                          { fontSize: 18, color: "white" },
                        ]}
                      >
                        {StudentList.reg_number}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={[
                    { flex: 1 },
                    {
                      flexDirection: "row",
                    },
                  ]}
                >
                  <View style={{ flex: 1, marginHorizontal: 60 }}>
                    <Text
                      style={[
                        styles.headingFont,
                        { fontSize: 18, color: "white" },
                      ]}
                    >
                      Student name
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    {filteredMarks.map((data, key) => (
                      <Text
                        style={[
                          styles.headingFont,
                          { fontSize: 18, color: "white" },
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
            <View
              style={[
                { flex: 0.34 },
                {
                  flexDirection: "row",
                  marginHorizontal: 20,
                  bottom: "15%",
                },
              ]}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  backgroundColor: "#59b8dd",
                }}
              >
                <Text style={[styles.headingFont, { color: "white" }]}>
                  Subject
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  backgroundColor: "#59b8dd",
                }}
              >
                <Text style={[styles.headingFont, { color: "white" }]}>
                  Obtained marks
                </Text>
              </View>
            </View>
            <View
              style={[
                { flex: 2.3 },
                {
                  flexDirection: "row",
                  borderWidth: 1,
                  marginHorizontal: 20,
                  bottom: "15%",
                },
              ]}
            >
              <View
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  alignItems: "center",
                  paddingBottom: 10,
                }}
              >
                <View>
                  <Text style={styles.headingFont}>MATHS</Text>
                </View>
                <View>
                  <Text style={styles.headingFont}>ENG</Text>
                </View>
                <View>
                  <Text style={styles.headingFont}>SCI</Text>
                </View>
                <View>
                  <Text style={styles.headingFont}>HIN</Text>
                </View>
                <View>
                  <Text style={styles.headingFont}>SOC</Text>
                </View>
                <View>
                  <Text style={styles.headingFont}>KAN</Text>
                </View>
                <View>
                  <Text style={styles.headingFont}>COMP</Text>
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                {filteredMarks.map((data, key) => (
                  <>
                    <Text style={styles.headingFont}>
                      {data.maths_obt_mark}
                    </Text>
                    <Text style={styles.headingFont}>
                      {data.english_obt_mark}
                    </Text>
                    <Text style={styles.headingFont}>
                      {data.science_obt_mark}
                    </Text>
                    <Text style={styles.headingFont}>
                      {data.hindi_obt_mark}
                    </Text>
                    <Text style={styles.headingFont}>
                      {data.social_obt_mark}
                    </Text>
                    <Text style={styles.headingFont}>
                      {data.kannada_obt_mark}
                    </Text>
                    <Text style={styles.headingFont}>
                      {data.computer_obt_mark}
                    </Text>
                  </>
                ))}
              </View>
            </View>

            <View style={styles.btnCancel}>
              <Button onPress={cancelPressHandler}> Cancel</Button>
            </View>
            {keyboardStatus == "Keyboard Hidden" && (
              <View style={{ flex: 1 }}>
                <TeachersHome />
              </View>
            )}
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
    fontWeight: "bold",
    fontSize: deviceWidth < 370 ? 14 : 14,
    paddingVertical: 10,
  },
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    // backgroundColor: "#FDFEFE",
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
    flex: 0.3,
    flexDirection: "row",
    top: "25%",
    borderWidth: 1,
    marginHorizontal: 20,
    backgroundColor: "#1E84A4",
  },
  headerText: {
    fontFamily: "HindSemiBold",
    fontSize: 15,
    color: "white",
  },
  tableTitle: {
    // padding: 5,
    margin: 7,
    fontFamily: "HindMedium",
    fontSize: deviceWidth < 370 ? 16 : 20,
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
  textStyleStudInfo: {
    fontSize: deviceWidth < 370 ? 20 : 17,

    marginBottom: 4,
    // fontWeight: "bold",
    fontFamily: "HindMedium",
  },
});

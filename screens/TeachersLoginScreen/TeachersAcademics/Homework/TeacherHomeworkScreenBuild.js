import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Keyboard,
  Dimensions,
} from "react-native";
import { Button as NativeButton, Icon } from "native-base";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../../../components/UI/Button";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import SelectList from "react-native-dropdown-select-list";
import { Alert, Button as Btn, Image } from "react-native";
import moment from "moment";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import BgButton from "../../../../components/UI/BgButton";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import TeachersHome from "../../BottomTab/TeachersHome";
import Input from "../../../../components/UI/Input";

import { Card, DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "react-native-dynamic-search-bar";
export var ID;
const TeacherHomeworkScreenBuild = () => {
  const [subLabel, setSubLabel] = useState(false);
  const [remarkLabel, setRemarkLabel] = useState(false);
  const [homeworkLabel, setHomeworkLabel] = useState(false);
  const [btn, setBtn] = useState(false);
  const [subBtn, setSubBtn] = useState(false);
  const [isClassFocused, setIsClassFocused] = useState(false);
  const [isSubjectFocused, setIsSubjectFocused] = useState(false);
  const [isFromDateFocused, setIsFromDateFocused] = useState(false);
  const [isToDateFocused, setIsToDateFocused] = useState(false);
  const [isTRemarkFocused, setIsTRemarkFocused] = useState(false);
  const [isHomeworkFocused, setIsHomeworkFocused] = useState(false);

  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [forHomeworkList, setForHomeworkList] = useState({
    color: "white",
    backgroundColor: "#0C60F4",
    borderRadius: 10,
  });
  const [forHomeworkForm, setForHomeworkForm] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 10,
  });

  const [selected, setSelected] = useState("");
  const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
  const enteredSelcetdIsValid = selected.trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

  const [data, setData] = useState([]);
  const [selectedsection, setSelectedsection] = useState("");
  const [sectiondata, setSectionData] = useState([]);

  // const [formIsValid,setFormIsValid]=useState(false);

  const [subject, setEnteredSubject] = useState("");
  const [enteredSubjectTouched, setEnteredSubjectTouched] = useState(false);
  const enteredSubjectIsValid = subject.trim() !== "";
  const subjectInputIsInValid = !enteredSubjectIsValid && enteredSubjectTouched;

  const [classname, setEnteredClassName] = useState("");
  const [section, setEnteredSection] = useState("");
  const [test, setTest] = useState(false);

  const [remark, setEnteredRemark] = useState("");
  const [enteredRemarkTouched, setEnteredRemarkTouched] = useState(false);
  const enteredRemarkIsValid = remark.trim() !== "";
  const remarkInputIsInValid = !enteredRemarkIsValid && enteredRemarkTouched;

  const [hw, setHW] = useState("");
  const [enteredHomeWorkTouched, setEnteredHomeWorkTouched] = useState(false);
  const enteredHomeWorkIsValid = hw.trim() !== "";
  const homeworkInputIsInValid =
    !enteredHomeWorkIsValid && enteredHomeWorkTouched;

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText.trim() !== "";
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;

  const [toText, setToText] = useState("");
  const [enteredtoDateTouched, setEnteredtoDateTouched] = useState(false);
  const enteredtoDateIsValid = toText.trim() !== "";
  const toDateInputIsInValid = !enteredtoDateIsValid && enteredtoDateTouched;

  const [image, setImage] = useState("");
  const [enteredImageTouched, setEnteredImageTouched] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const enteredImageIsValid = image.trim() !== "";
  const imageInputIsInValid = !enteredImageIsValid && enteredImageTouched;

  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [cont, setCont] = useState("");
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [homeworkData, setHomeworkData] = useState([]);
  const [isSame, SetIsSame] = useState(false);
  const [showInitialBtn, setShowInitialBtn] = useState(true);

  let i = 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Homework/`);
        setHomeworkData(res.data);
        setFilteredData(res.data);
        let test = 0;
        const value = await AsyncStorage.getItem("key");
        for (i = 0; i < res.data.length; i++) {
          if (value == res.data[i].created_by) {
            test = res.data[i].created_by;
          } else {
            // console.log('false')
          }
        }
        if (test == value) {
          // console.log("is same")
          SetIsSame(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(!show);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [show]);

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

  useEffect(() => {
    async function imageHandler() {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission denied!");
        }
      }
    }
    imageHandler();
  }, []);

  function frmDateHandler(enteredValue) {
    setFromText(enteredValue);
  }
  function toDateHandler(enteredValue) {
    setToText(enteredValue);
  }

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const { status } = await MediaLibrary.requestPermissionsAsync();
    // if (status === "granted") {
    //   await MediaLibrary.saveToLibraryAsync(result.uri);

    //   console.log("Image successfully saved");
    // }
    console.log(result);

    // location = result.uri;
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  let imagePreView;

  if (image) {
    imagePreView = <Image style={styles.image} source={{ uri: image }} />;
  }

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

          setData(newArray);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchStudentClass();
  }, []);

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  const showToMode = (currentToMode) => {
    setToShow(true);

    setToMode(currentToMode);
  };

  function classNameHandler(enteredValue) {
    setEnteredClassName(enteredValue);
  }
  function sectionHandler(enteredValue) {
    setEnteredSection(enteredValue);
  }
  function subjectChangeHandler(enteredValue) {
    setEnteredSubject(enteredValue);
  }

  function remarkChangeHandler(enteredValue) {
    setEnteredRemark(enteredValue);
  }
  function hwChangeHandler(enteredValue) {
    setHW(enteredValue);
  }

  const fromDateChangeHandler = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate || fromDate;
    setFromShow(Platform.OS === "ios");
    setFromDate(currentFromDate);

    let tempFromDate = new Date(currentFromDate);
    let fDate =
      tempFromDate.getDate() +
      "/" +
      (tempFromDate.getMonth() + 1) +
      "/" +
      tempFromDate.getFullYear();

    if (event.type == "set") {
      setFromText(fDate);
    } else {
      //cancel button clicked
    }
    //console.log(fDate);
  };

  const toDateChangeHandler = (event, selectedToDate) => {
    const currentToDate = selectedToDate || toDate;
    setToShow(Platform.OS === "ios");
    setToDate(currentToDate);

    let tempToDate = new Date(currentToDate);
    let tDate =
      tempToDate.getDate() +
      "/" +
      (tempToDate.getMonth() + 1) +
      "/" +
      tempToDate.getFullYear();
    if (event.type == "set") {
      setToText(tDate);
    } else {
      //cancel button clicked
    }

    // console.log(fDate);
  };

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDERTERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuffcient Permissions",
        "You need to grant camera permission to use this app."
      );
      return false;
    }
    return true;
  }
  async function takeImageHanlder() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
  }

  function updateHandler() {
    var dateFromValidate = fromText;
    var isValid = moment(dateFromValidate, "D/M/YYYY", true).isValid();
    // if (!isValid) {
    //   Alert.alert(
    //     "Format Error",
    //     "It seems to be you entered wrong date format please follow D/M/YYYY format ",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]
    //   );
    // }

    var dateToValidate = toText;
    var isValid = moment(dateToValidate, "D/M/YYYY", true).isValid();
    // if (!isValid) {

    //   Alert.alert(
    //     "Format Error",
    //     "It seems to be you entered wrong date format please follow D/M/YYYY format",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]
    //   );
    // }
    //  else {
    let selectedData = selected.split(" - ");
    let class_name = selectedData[0];
    let section = selectedData[1];
    let uploaduri = image;
    // let filename = uploaduri.substring(uploaduri.lastIndexOf("/") + 1);
    const formdata = {
      class_name: class_name,
      section: section,
      subject: subject,
      homework_date: fromDate,
      remark: remark,
      homework_photo: "",
      homework: "",
      due_date: toDate,
      description: hw,
    };
    console.log(formdata);

    async function updateData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const resLogin = await axios.put(
          `http://10.0.2.2:8000/school/Homework/${ID}/`,
          formdata,
          {
            headers: headers,
          }
        );

        console.log(resLogin.data);
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
        const res = await axios.get(`http://10.0.2.2:8000/school/Homework/`);
        setHomeworkData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    setEnteredSubject("");
    setFromText("");
    setToText("");
    setPickedImage("");
    setEnteredRemark("");
    setHW("");
    setShowForm(false);
    setShowList(true);
    setForHomeworkList({
      backgroundColor: "#0C60F4",
      color: "white",
      borderRadius: 10,
    });
    setForHomeworkForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    // }
  }

  function buttonPressedHandler() {
    setBtn(true);
    setSubBtn(true);
    console.log(selected);
    console.log(fromText, toText);
    const test = image.substring(image.lastIndexOf("/") + 1);

    console.log(test);
    var dateFromValidate = fromText;
    var isValid = moment(dateFromValidate, "D/M/YYYY", true).isValid();
    // if (!isValid) {
    //   Alert.alert(
    //     "Format Error",
    //     "It seems to be you entered wrong date format please follow D/M/YYYY format ",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]
    //   );
    // }

    if (isValid) {
      Alert.alert("Data saved", "Data saved successfully", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setShowForm(false);
            showHomework();
          },
        },
      ]);
    }

    var dateToValidate = toText;
    var isValid = moment(dateToValidate, "D/M/YYYY", true).isValid();
    // if (!isValid) {
    //   Alert.alert(
    //     "Format Error",
    //     "It seems to be you entered wrong date format please follow D/M/YYYY format",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]
    //   );
    // }

    setEnteredSelectedTouched(true);
    setEnteredSubjectTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredRemarkTouched(true);
    setEnteredHomeWorkTouched(true);
    setEnteredImageTouched(true);

    if (!enteredSelcetdIsValid) {
      return;
    }
    if (!enteredSubjectIsValid) {
      return;
    }

    if (!enteredFromDateIsValid) {
      return;
    }

    if (!enteredtoDateIsValid) {
      return;
    }

    if (!enteredRemarkIsValid) {
      return;
    }

    if (!enteredHomeWorkIsValid) {
      return;
    }

    if (!enteredImageIsValid) {
      return;
    } else {
      let selectedData = selected.split(" - ");
      let class_name = selectedData[0];
      let section = selectedData[1];
      // let uploaduri = image;
      // let filename = uploaduri.substring(uploaduri.lastIndexOf("/") + 1);
      let uploadedImg = test;
      const formdata = {
        // from_time:fromText,
        // to_time:toText,
        class_name: class_name,
        section: section,
        subject: subject,
        homework_date: fromDate,
        due_date: toDate,
        // homework_photo: `/assets/images/${filename}`,
        // homework_photo:uploadedImg,
        remark: remark,
        description: hw,
      };
      console.log(formdata);

      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8;",
          };

          const resLogin = await axios.post(
            "http://10.0.2.2:8000/school/Homework/",
            formdata,
            {
              headers: headers,
            }
          );

          console.log(resLogin.data);
        } catch (error) {
          console.log(error);
        }
      }

      storeData();

      setEnteredSubject("");
      setFromText("");
      setToText("");
      setPickedImage("");
      setEnteredRemark("");
      setHW("");
      setEnteredSelectedTouched(false);
      setEnteredSelectedTouched(false);
      setEnteredSubjectTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredHomeWorkTouched(false);
      setEnteredRemarkTouched(false);
      setEnteredtoDateTouched(false);
      setEnteredImageTouched(false);
      setShowForm(false);
      setShowList(true);
      setForHomeworkList({
        backgroundColor: "#0C60F4",
        color: "white",
        borderRadius: 10,
      });
      setForHomeworkForm({
        color: "white",
        backgroundColor: "#1E8449",
        borderRadius: 10,
      });
    }
  }

  function subjectInputBlur() {
    setEnteredSubjectTouched(true);
    setIsSubjectFocused(false);
  }
  function onSubjectFocusHandler() {
    setIsSubjectFocused(true);
    setEnteredSubjectTouched(false);
    setSubLabel(true);
  }

  function dateFromHandler() {
    setEnteredFromDateTouched(true);
    setIsFromDateFocused(false);
  }
  function onFocusFromHandler() {
    setIsFromDateFocused(true);
    setEnteredFromDateTouched(false);
  }

  function dateToHandler() {
    setEnteredtoDateTouched(true);
    setIsToDateFocused(false);
  }
  function onFocusToHandler() {
    setEnteredtoDateTouched(false);
    setIsToDateFocused(true);
  }

  function remarkBlurHandler() {
    setEnteredRemarkTouched(true);
    setIsTRemarkFocused(false);
  }
  function onFocusRemarkHandler() {
    setEnteredRemarkTouched(false);
    setIsTRemarkFocused(true);
    setRemarkLabel(true);
  }

  function homeworkBlurHandler() {
    setEnteredHomeWorkTouched(true);
    setIsHomeworkFocused(false);
  }
  function onFocusHomeworkHandler() {
    setEnteredHomeWorkTouched(false);
    setIsHomeworkFocused(true);
    setHomeworkLabel(true);
  }

  function uploadImageBlurHandler() {
    setEnteredImageTouched(true);
  }
  function showHomeworkForm() {
    setEnteredSubject("");
    setFromText("");
    setToText("");
    setPickedImage("");
    setEnteredRemark("");
    setHW("");
    setForHomeworkList({
      backgroundColor: "#0C60F4",
      color: "white",
      borderRadius: 10,
    });
    setForHomeworkForm({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 10,
    });
    setShowForm(true);
    setShowList(false);
    setEnteredSelectedTouched(false);
    setEnteredSelectedTouched(false);
    setEnteredSubjectTouched(false);
    setEnteredFromDateTouched(false);
    setEnteredHomeWorkTouched(false);
    setEnteredRemarkTouched(false);
    setEnteredtoDateTouched(false);
    setEnteredImageTouched(false);
    setIsEdit(false);
  }
  function showHomework() {
    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Homework/`);
        setHomeworkData(res.data);
        setFilteredData(res.data);
        setForHomeworkForm({
          color: "white",
          backgroundColor: "#1E8449",
          borderRadius: 10,
        });
        setForHomeworkList({
          backgroundColor: "#F4F6F6",
          color: "black",
          borderRadius: 10,
        });
        setShowForm(false);
        setShowList(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  function editItem(id) {
    console.log(id);
    // setSubLabel(true);
    setRemarkLabel(true);
    setHomeworkLabel(true);
    setShowInitialBtn(false);
    let selectedData = selected.split(" - ");
    let class_name = selectedData[0];
    let section = selectedData[1];
    ID = id;

    const filteredDummuyData = homeworkData.find((data) => data.id == id);
    // console.log(filteredDummuyData);

    // setData(filteredDummuyData.selectedData[class_name]);
    // setEnteredSection(filteredDummuyData.section);
    //  setEnteredSubject(filteredDummuyData.subject);
    setFromText(moment(filteredDummuyData.homework_date).format("DD/MM/YYYY"));
    setFromText(moment(filteredDummuyData.due_date).format("DD/MM/YYYY"));
    // moment(filteredDummuyData.due_date).format('DD/MM/YYYY')
    setEnteredRemark(filteredDummuyData.remark);
    setHW(filteredDummuyData.homework);
    setImage(filteredDummuyData.homework_photo);
    setForHomeworkList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 10,
    });
    setForHomeworkForm({
      color: "white",
      backgroundColor: "#1E8449",
      borderRadius: 10,
    });
    setShowForm(true);
    setShowList(false);
    setIsEdit(true);
  }

  function deleteItem(id) {
    console.log("i am pressed");
    // console.log(id);
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
          `http://10.0.2.2:8000/school/Homework/${id}/`,
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
          const res = await axios.get(`http://10.0.2.2:8000/school/Homework/`);
          // console.log(res.data);
          setHomeworkData(res.data);
          setFilteredData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }

  function cancelHandler() {
    setShowInitialBtn(true);
    setShowList(true);
    setShowForm(false);
  }

  const searchFilter = (text) => {
    console.log("search function");
    if (text) {
      const newData = homeworkData.filter((item) => {
        const itemData = item.class_name
          ? item.class_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      setFilteredData(homeworkData);
      setSearchText(text);
    }
  };
  return (
    <>
      {showInitialBtn && (
        <View style={styles.BtnContainer}>
          <BgButton onPress={showHomeworkForm} style={forHomeworkList}>
            Add Homework
          </BgButton>

          <BgButton onPress={showHomework} style={forHomeworkForm}>
            Show Homework
          </BgButton>
        </View>
      )}
      {showForm && (
        <ScrollView style={styles.root}>
          <View style={styles.inputForm}>
            {!isEdit && (
              <View style={styles.selectStyle}>
                <SelectList
                  setSelected={setSelected}
                  data={data}
                  placeholder="Select class"
                  boxStyles={selectInputIsInValid && styles.errorSelectedColor}
                  // boxStyles={{ borderRadius: 0 }}
                  dropdownTextStyles={styles.dropText}
                  inputStyles={styles.dropText}
                />
                {selectInputIsInValid && (
                  <Text style={[styles.errorText]}>Enter class</Text>
                )}
              </View>
            )}
            <View>
              <View style={!subLabel ? styles.normal : styles.up}>
                <Text
                  onPress={onSubjectFocusHandler}
                  style={
                    subBtn
                      ? styles.normalLabel
                      : subjectInputIsInValid
                      ? styles.errorLabel
                      : styles.normalLabel
                  }
                >
                  Subject
                </Text>
              </View>
              <Input
                onChangeText={subjectChangeHandler}
                value={subject}
                onSubmitEditing={Keyboard.dismiss}
                blur={subjectInputBlur}
                onFocus={onSubjectFocusHandler}
                style={
                  isSubjectFocused
                    ? styles.focusStyle
                    : subjectInputIsInValid && styles.errorBorderColor
                }
              />
              {subjectInputIsInValid && (
                <Text style={styles.errorText}>Enter subject</Text>
              )}
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <View>
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: 23,
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showFromMode("date")}
                  />
                </View>
                <Input
                  value={fromText}
                  // value={
                  //   moment(fromText).format("DD/MM/YYYY") ||
                  //   moment(fromDate).format("DD/MM/YYYY")
                  // }
                  placeholder="DD/MM/YYYY"
                  onSubmitEditing={Keyboard.dismiss}
                  style={
                    isFromDateFocused
                      ? styles.focusStyle
                      : fromDateInputIsInValid && styles.errorBorderColor
                  }
                  blur={dateFromHandler}
                  onFocus={onFocusFromHandler}
                  onChangeText={frmDateHandler}
                  onPressIn={() => showFromMode("date")}
                />
                {fromDateInputIsInValid && (
                  <Text style={[styles.errorText]}>Enter from date</Text>
                )}
                {fromShow && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={fromDate}
                    mode={frommode}
                    is24Hour={true}
                    display="default"
                    onChange={fromDateChangeHandler}
                  />
                )}
              </View>
              <View style={styles.space} />
              <View style={{ flex: 1 }}>
                <View>
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: 23,
                    }}
                    name="calendar"
                    size={24}
                    color="black"
                    onPress={() => showToMode("date")}
                  />
                </View>
                <Input
                  value={toText}
                  // value={
                  //   moment(toText).format("DD/MM/YYYY") ||
                  //   moment(toDate).format("DD/MM/YYYY")
                  // }
                  placeholder="DD/MM/YYYY"
                  style={
                    isToDateFocused
                      ? styles.focusStyle
                      : toDateInputIsInValid && styles.errorBorderColor
                  }
                  blur={dateToHandler}
                  onFocus={onFocusToHandler}
                  onChangeText={toDateHandler}
                  onPressIn={() => showToMode("date")}
                />
                {toDateInputIsInValid && (
                  <Text style={[styles.errorText]}>Enter to date</Text>
                )}
                {toShow && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={toDate}
                    mode={tomode}
                    is24Hour={true}
                    display="default"
                    onChange={toDateChangeHandler}
                    onTouchEnd={dateToHandler}
                  />
                )}
              </View>
            </View>
            <View>
              <View
                style={!remarkLabel ? styles.normalRemark : styles.upRemark}
              >
                <Text
                  onPress={onSubjectFocusHandler}
                  style={
                    subBtn
                      ? styles.normalLabel
                      : remarkInputIsInValid
                      ? styles.errorLabel
                      : styles.normalLabel
                  }
                >
                  Remark
                </Text>
              </View>
              <Input
                onChangeText={remarkChangeHandler}
                blur={remarkBlurHandler}
                onFocus={onFocusRemarkHandler}
                value={remark}
                onSubmitEditing={Keyboard.dismiss}
                style={
                  isTRemarkFocused
                    ? styles.focusStyle
                    : remarkInputIsInValid && styles.errorBorderColor
                }
              />
              {remarkInputIsInValid && (
                <Text style={styles.errorText}>Enter remark</Text>
              )}
            </View>

            <View>
              <View
                style={
                  !homeworkLabel ? styles.normalHomework : styles.upHomework
                }
              >
                <Text
                  onPress={onFocusHomeworkHandler}
                  style={
                    subBtn
                      ? styles.normalLabel
                      : homeworkInputIsInValid
                      ? styles.errorLabel
                      : styles.normalLabel
                  }
                >
                  Homework
                </Text>
              </View>
              <Input
                onChangeText={hwChangeHandler}
                value={hw}
                onSubmitEditing={Keyboard.dismiss}
                blur={homeworkBlurHandler}
                onFocus={onFocusHomeworkHandler}
                style={
                  isHomeworkFocused
                    ? styles.focusStyle
                    : homeworkInputIsInValid && styles.errorBorderColor
                }
              />
              {homeworkInputIsInValid && (
                <Text style={styles.errorText}>Enter homework</Text>
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.uploadImgBtn}>
                <NativeButton
                  onPress={PickImage}
                  leftIcon={
                    <Icon as={Ionicons} name="cloud-upload-outline" size="md" />
                  }
                >
                  Upload Image
                </NativeButton>
                {!image && (
                  <Text
                    style={
                      imageInputIsInValid
                        ? styles.imageError
                        : styles.previewText
                    }
                  >
                    No image taken yet
                  </Text>
                )}
                {/* <Btn title="Upload Image" onPress={PickImage} /> */}
              </View>
            </View>
            <View
              // style={
              //   imageInputIsInValid ? styles.imageError : styles.imagePreView
              // }
              style={image ? styles.imagePreView : styles.noImage}
            >
              {imagePreView}
            </View>
            {imageInputIsInValid && (
              <Text
                style={{
                  color: "red",
                  left: 20,
                  fontFamily: "HindRegular",
                  fontSize: 18,
                }}
              >
                Please upload or take homework image
              </Text>
            )}

            {!isEdit && (
              <View style={styles.btnSubmit}>
                <Button onPress={buttonPressedHandler}>Add Homework</Button>
              </View>
            )}
            {isEdit && (
              <View style={styles.btnSubmit1}>
                <Button onPress={updateHandler}>Update</Button>
              </View>
            )}
            {isEdit && (
              <View style={styles.cancel}>
                <Button onPress={cancelHandler}>Cancel</Button>
              </View>
            )}
          </View>
        </ScrollView>
      )}
      <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
        <View style={{ flex: 8, bottom: 5 }}>
          <ScrollView>
            <SearchBar
              onSubmitEditing={Keyboard.dismiss}
              style={styles.searchBar}
              textInputStyle={{
                fontFamily: "HindRegular",
                fontSize: 18,
              }}
              placeholder="Search here"
              onChangeText={(text) => searchFilter(text)}
              value={searchText}
            />
            {showList &&
              filteredData &&
              filteredData.map((homeworkData, key) => (
                <>
                  <Card
                    style={{
                      marginVertical: 15,
                      marginHorizontal: 20,
                      elevation: 5,
                      borderRadius: 10,
                      paddingBottom: 30,
                    }}
                    key={key}
                  >
                    <Card.Content>
                      <Card.Title
                        title={homeworkData.class_name}
                        titleStyle={{
                          color: "purple",
                          fontFamily: "HindSemiBold",
                          fontSize: 20,
                          marginTop: -20,
                        }}
                      />

                      <View style={[{ flexDirection: "row" }]}>
                        <View style={{ flex: 2, marginLeft: 5, top: -10 }}>
                          <Ionicons
                            name="calendar"
                            size={25}
                            color="#D4AC0D"
                            style={{ position: "absolute", left: 5 }}
                          />
                          <Text style={styles.cardTextStyle}>Start Date</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                          <View style={{ flex: 2, top: -10 }}>
                            <Ionicons
                              name="calendar"
                              size={25}
                              color="#D4AC0D"
                              style={{ position: "absolute", left: 5 }}
                            />
                            <Text style={styles.cardTextStyle}>End Date</Text>
                          </View>
                        </View>
                      </View>

                      <View style={[{ flexDirection: "row" }]}>
                        <View style={{ flex: 2, left: 40, top: -5 }}>
                          <Text style={styles.textInfo}>
                            {moment(homeworkData.homework_date).format(
                              "DD/MM/YYYY"
                            )}
                          </Text>
                        </View>
                        <View style={{ flex: 2, left: 110, top: -5 }}>
                          <Text style={styles.textInfo}>
                            {moment(homeworkData.due_date).format("DD/MM/YYYY")}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 2,
                            left: deviceWidth < 370 ? 90 : 100,
                            bottom: -50,
                          }}
                        >
                          <Ionicons
                            name="md-pencil-sharp"
                            size={24}
                            color="green"
                            onPress={() => editItem(homeworkData.id)}
                          />
                        </View>
                        <View style={{ flex: 2, left: 50, bottom: -50 }}>
                          <Ionicons
                            name="trash"
                            size={24}
                            color="red"
                            onPress={() => deleteItem(homeworkData.id)}
                          />
                        </View>
                      </View>
                      <View style={[{ flexDirection: "row", flex: 1 }]}>
                        <View style={{ flex: 2, left: -15, top: 5 }}>
                          <Text style={styles.cardTextStyle}>Description:</Text>
                        </View>
                        <View
                          style={{
                            flex: 2,
                            left: deviceWidth < 370 ? -30 : -40,
                            top: 6,
                          }}
                        >
                          <Text style={styles.textInfo}>
                            {homeworkData.description}
                          </Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                </>
              ))}
          </ScrollView>
        </View>
        {keyboardStatus == "Keyboard Hidden" && (
          <View style={{ flex: 1 }}>
            <TeachersHome />
          </View>
        )}
      </View>
    </>
  );
};

export default TeacherHomeworkScreenBuild;

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
    fontSize: 24,
    width: "51%",
  },
  btnSubmit1: {
    // marginTop: 50,
    // marginBottom: 30,
    marginLeft: "50%",
    width: "50%",
  },
  cancel: {
    marginTop: -110,
    marginBottom: 50,
    marginLeft: -15,
    width: "50%",
  },
  container: {
    marginTop: 20,
  },
  home: {
    marginTop: 29,
  },
  root: {
    backgroundColor: "#EBECFO",
    marginTop: 10,
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  errorBorderColor: {
    borderColor: "red",
  },
  errorSelectedColor: {
    borderColor: "red",
  },
  selectStyle: {
    marginRight: deviceWidth < 370 ? "2%" : "5%",
    marginLeft: deviceWidth < 370 ? "2%" : "4%",
  },
  labels: {
    margin: 5,
    fontFamily: "Ubuntu",
    fontSize: deviceWidth < 370 ? 16 : 18,
    flex: 0.7,
    top: 10,
    // marginTop: 17,
  },

  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  btnSubmit: {
    width: "70%",
    marginTop: deviceWidth < 370 ? "3%" : "1%",
    marginBottom: 59,
    marginLeft: deviceWidth < 370 ? "35%" : "35%",
  },
  imagePreView: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "lightblue",
  },
  noImage: {
    //
  },
  imageError: {
    color: "red",
    position: "absolute",
    left: deviceWidth < 370 ? "120%" : "130%",
    top: "50%",
    fontSize: deviceWidth < 370 ? 14 : 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  space: {
    width: 15, // or whatever size you need
    // height: 15,
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
    fontFamily: "MonsterratBold",
    fontSize: 16,
  },
  tableCell: {
    width: 50,
    //  fontFamily: "Montserrat_600SemiBold",
    left: 5,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
    left: 35,
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 10,
  },
  dropText: {
    fontSize: deviceWidth < 370 ? 16 : 18,
    fontFamily: "HindRegular",
  },
  errorText: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: 16,
  },
  uploadImgBtn: {
    marginTop: 13,
    width: deviceWidth < 370 ? "50%" : "40%",
    padding: 10,
    fontFamily: "HindRegular",
    fontSize: 18,
    flexDirection: "row",
  },
  previewText: {
    position: "absolute",
    left: deviceWidth < 370 ? "120%" : "130%",
    top: "50%",
    fontSize: deviceWidth < 370 ? 14 : 16,
  },
  focusStyle: {
    borderColor: "blue",
  },
  textInfo: {
    fontSize: deviceWidth < 370 ? 14 : 16,
    fontFamily: "HindSemiBold",
    color: "grey",
  },
  normal: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
  },
  up: {
    top: deviceWidth < 370 ? 15 : 26,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth < 370 ? 57 : 64,
  },
  normalRemark: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upRemark: {
    top: deviceWidth < 370 ? 15 : 25,
    width: deviceWidth < 370 ? 57 : 65,
    left: deviceWidth < 370 ? 20 : 30,
  },
  normalHomework: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upHomework: {
    top: deviceWidth < 370 ? 15 : 24,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth < 370 ? 75 : 90,
  },
  errorLabel: {
    color: "red",
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
  },
  normalLabel: {
    color: "grey",
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
  },
  upWaring: {
    color: "red",
    left: 30,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 15 : 16,
    position: "absolute",
    top: 65,
  },
});

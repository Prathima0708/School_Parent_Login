import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Keyboard,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Button as NativeButton, Icon, IconButton } from "native-base";
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
import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
export var ID;
var FROMDATE, TODATE;

export var SubjectID;
let localUri, filename, match, type, base64;
let ImageResult;
var newArray, TOKEN, USERNAME;
var KEY,VALUE,SUBJECTVALUE,SUBJECTKEY;
const TeacherHomeworkScreenBuild = () => {
  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, 100);

  const headermax = 100;
  const headermin = 10;

  const animateHeaderBackGround = scrollY.interpolate({
    inputRange: [0, headermax - headermin],
    outputRange: ["white", "white"],
    extrapolate: "clamp",
  });

  const animateHeaderHeight = diffClamp.interpolate({
    inputRange: [0, headermax - headermin],
    outputRange: [headermax, headermin],
    extrapolate: "clamp",
  });

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
  const enteredSelcetdIsValid = selected.toString().trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

  const [data, setData] = useState([]);

  // const [formIsValid,setFormIsValid]=useState(false);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [enteredSelectedSubTouched, setEnteredSelectedSubTouched] =
    useState(false);
  const enteredSelcetdSubIsValid = selectedSubject.toString().trim() !== "";
  const selectSubInputIsInValid =
    !enteredSelcetdSubIsValid && enteredSelectedSubTouched;

  const [subjectData, setSubjectData] = useState([]);
  const [subjectDataEdit, setSubjectDataEdit] = useState([]);

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

  const [frmdate, setenteredfrmdate] = useState("");
  const [todate, setenteredtodate] = useState("");

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

  const [image, setImage] = useState(null);
  const [enteredImageTouched, setEnteredImageTouched] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const enteredImageIsValid = image !== "";
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

  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  const [image1, setImage1] = useState(null);

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

  async function fetchToken() {
    TOKEN = await AsyncStorage.getItem("token");

    if (TOKEN !== null) {
      setToken(TOKEN);
    }
  }
  fetchToken();

  async function fetchUser() {
    USERNAME = await AsyncStorage.getItem("UserName");
    // console.log("this is the username in calendar", USERNAME);
    if (USERNAME !== null) {
      setUser(USERNAME);
    }
  }
  fetchUser();

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      //  base64: true,
    });

    // const { status } = await MediaLibrary.requestPermissionsAsync();
    // if (status === "granted") {
    //   await MediaLibrary.saveToLibraryAsync(result.uri);

    //   console.log("Image successfully saved");
    // }
    console.log("------");
    console.log(result);

    // ImageResult = result;
    // const reader = new FileReader();

    // // ImageResult = File(result);
    // console.log(ImageResult)

    // location = result.uri;
    if (!result.canceled) {
      setImage(result.uri);
    }

    localUri = result.uri;
    filename = localUri.split("/").pop();
    // console.log("filename-", JSON.stringify(filename));

    match = /\.(\w+)$/.exec(filename);
    type = match ? `image/${match[1]}` : `image`;
    // console.log("type-", type);

    const base64 = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log(base64);

    // const fileReader = new FileReader();
    // fileReader.onload = (fileLoadedEvent) => {
    //   const base64Image = fileLoadedEvent.target.result;
    //   //  console.log(base64Image);
    // };
    // console.log(fileReader.readAsDataURL(result.uri));
    console.log(typeof result);
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
          newArray = response.data.map((item) => {
            return {
              key: item.id,

              value: item.class_name + " - " + item.section,
              classname: item.class_name,
              section: item.section,
              // SubjectID: item.id,
            };
          });

          console.log("studentclass", response.data);
          const details = newArray.sort(function (obj1, obj2) {
            return obj1.value.localeCompare(obj2.value);
          });
          console.log(details);
          //setSubjectData(newSubjects);
          setData(newArray);

          console.log(newArray);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchStudentClass();
  }, []);

  function fetchSubjects() {
    console.log(selected);
    console.log(selectedSubject)
    async function fetchSubjects() {
      axios
        .get(
          `http://10.0.2.2:8000/school/StudentclassSubjectDetail/${selected}`
        )
        .then((response) => {
          console.log("subjects", response.data);
          for (var i = 0; i < response.data.length; i++) {
            response.data[i] =
              response.data[i].charAt(0).toUpperCase() +
              response.data[i].substr(1);
          }
          console.log(response.data);
          //setSubjectData(newSubjects);
          setSubjectData(response.data);
        })

        .catch((e) => {
          console.log(e);
        });
    }
    fetchSubjects();
  }

  function fetchSubjectsEdit() {
   
    async function fetchSubjects() {
      console.log('key inside fetch subjects',KEY)
      axios
        .get(
          `http://10.0.2.2:8000/school/StudentclassSubjectDetail/${KEY}`
        )
        .then((response) => {
        //  console.log("subjects", response.data);
          for (var i = 0; i < response.data.length; i++) {
            response.data[i] =
              response.data[i].charAt(0).toUpperCase() +
              response.data[i].substr(1);
          }
          console.log(response.data);
          //setSubjectData(newSubjects);
          setSubjectDataEdit(response.data);
        })

        .catch((e) => {
          console.log(e);
        });
    }
    fetchSubjects();
  }

  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
    setFromDate;
  };

  const showToMode = (currentToMode) => {
    setToShow(true);

    setToMode(currentToMode);
  };

  const fromDateChangeHandler = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate;
    FROMDATE = selectedFromDate;

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
    const currentToDate = selectedToDate;
    TODATE = selectedToDate;
    console.log("to date inside function:", TODATE);
    setToShow(Platform.OS === "ios");
    setToDate(currentToDate);

    let tempToDate = new Date(currentToDate);
    console.log(tempToDate);
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
    TODATE = selectedToDate;
  };

  function frmDateHandler(enteredValue) {
    // setFromText(enteredValue);
    // setEnteredFromDate(enteredValue);
    setFromDate(enteredValue);
    setenteredfrmdate(enteredValue);
  }
  function toDateHandler(enteredValue) {
    // setToText(enteredValue);
    setToDate(enteredValue);
    setenteredtodate(enteredValue);
  }

  function remarkChangeHandler(enteredValue) {
    setEnteredRemark(enteredValue);
  }
  function hwChangeHandler(enteredValue) {
    setHW(enteredValue);
  }

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
    console.log('selected inside update',selected)
    let filteredlist = newArray.filter((ele) => ele.key == selected);
    console.log('filetred list inside update',filteredlist)
    console.log('inside update ',selectedSubject)
    let uploaduri = image;
    // let filename = uploaduri.substring(uploaduri.lastIndexOf("/") + 1);
    const formdata = {
       class_name: filteredlist[0].classname,
       section: filteredlist[0].section,
      subject: selectedSubject,
      homework_date: FROMDATE,
      remark: remark,
      //  homework_photo: "",
      //homework: "",
      due_date: TODATE,
      //    description: hw,
     
    };
    console.log(formdata);

    // if (
    //   !enteredSubjectIsValid ||
    //   !enteredFromDateIsValid ||
    //   !enteredtoDateIsValid ||
    //   !enteredRemarkIsValid ||
    //   !enteredHomeWorkIsValid
    // ) {
    //   Alert.alert("Please enter all fields");
    // } else {

    async function updateData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const resLogin = await axios.patch(
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
      {
        text: "OK",
        onPress: () => {},
      },
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

    setShowInitialBtn(true);
    //}

    // }
  }
  let postForm = new FormData();
  function buttonPressedHandler() {
    // console.log(selectedSubject);
    // console.log("selected value -", newArray);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setBtn(true);
    setSubBtn(true);

    // const test = image.substring(image.lastIndexOf("/") + 1);

    // console.log(test);
    var dateFromValidate = fromText;
    var isValid = moment(dateFromValidate, "D/M/YYYY", true).isValid();

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

    setEnteredSelectedTouched(true);
    setEnteredSelectedSubTouched(true);
    setEnteredSubjectTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredRemarkTouched(true);
    setEnteredHomeWorkTouched(true);
    setEnteredImageTouched(true);

    if (!enteredSelcetdIsValid) {
      return;
    }
    // if (!enteredSubjectIsValid) {
    //   return;
    // }

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

    // if (!enteredImageIsValid) {
    //   return;
    // }
    else {
      // console.log(newArray);
      // console.log("inside post req from date", FROMDATE);
      // console.log("inside post req to date", TODATE);
      let filteredlist = newArray.filter((ele) => ele.key == selected);
      // console.log(filteredlist);

      // const imageData = new FormData();
      // let photo = {
      //   uri: localUri,
      //   type: "image/*",
      // };
      // imageData.append("homework_photo", photo);
      // const image = imageData.append("homework_photo", filename);

      // console.log("salvo");
      // console.log(image);
      // let photo = {
      //   uri: localUri,
      //   type: "image/*",
      // };
      // console.log("photo");
      // console.log(photo);

      // postForm.append("class_name", filteredlist[0].classname);
      // postForm.append("section", filteredlist[0].section);
      // postForm.append("subject", selectedSubject);
      // postForm.append("homework_date", FROMDATE);
      // postForm.append("remark", remark);
      // postForm.append("homework_photo", photo);

      // postForm.append("homework", "empty");
      // postForm.append("due_date", TODATE);
      // postForm.append("description", hw);

      var formdata = {
        class_name: filteredlist[0].classname,
        section: filteredlist[0].section,
        subject: selectedSubject,
        homework_date: FROMDATE,
        remark: remark,
        // homework_photo:
        //  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC+klEQVRoge2ZT0hUURSHv3Pf02EsC9TEEgNBUCqKygmkaFVtIlrUoAbVqpZGtWhRC6HANoU7oTbRPwshahHUJoRALWsTUViLgizjWYkUmTjvnRaOMgwz4/ic0DfNBwNv7jn3/s6Pc+97bxgoUKDAf4HMXDS2OAdFaAO2AMsWryQAJkA/iMoTsayuZ7fK38w1QQAirU4ncOKfl+cPV1XO17oVF3p6xE2XZBpbnIMsXRMAloi2fywavZwpycS309JHaYu0OM3pwobpMxEMhEsbD39NeX4Ni3+w50N1aErOpApIpNVRgMHuSkmVkMh8cv3kZ5rTeOjrflFzH5iw1F03cGf1x8S4yVZgsXlxu+oB8BgIu8a6mBwPjBEAyzMngSmU5sghZ2diLFBGBu5WvEXoAkDppF1n6w+UEYAQxe3AN2BzZGj06Mz47GEPKJ8Hu1fVgGjgOpJEdVP0+xoI4NZKxrWphzwworgNkAdGEMmPjqB5srVg2og9822pv2sl0xT9FI7ZoV/A2q37vpQEtiP9PTUTgnwCjL3cqgusEQBPdAjAQxoCbcR4vANApD7QRpC4EfWCbUS86a0F0hD0l8YZfga6IwmU5ouRvHiyAwUjS49sjQyrEi0Oy4risKxA9ADw/h/V5Esrm9vvsB0LbervWfkjcbApOl4WsydfAdULKDpnWgYYybSyKieTFwaIj53yWXCutUaMot2ZFg+VyON0MS9mp435wbeWyC17eej32V+TJQjSCqxOzolNmqx/SywUH1ojoLfHxsbP2b3Xav8Ap+OfWba1Ok8Vdnga2wXcS7WKWLHd8cung92VO1PlZEMutNLetTzkJgAqHduODJcnx5ui42UGOuI5N+Zffm610rZy63EtMj9H+4BG4DNwyhjrEYDrunsMdKhQB/p82Ujl9t5eifk1kgutjHsyEnWqKOIhmvZfrRdFtre370aV49dErrTmPFzro1octkaPGZHDim6YniSvFe+6V1p59eUVmVpA/YumVaBAgYDyF2wAQNEGCgG3AAAAAElFTkSuQmCC",
        homework_photo: localUri,
        homework: "empty",
        due_date: TODATE,
        description: hw,
        // created_by: user,
      };
      // let newObj = Object.assign(formdata, {
      //   homework_photo: { localUri, filename },
      // });
      console.log(formdata);

      // let formData = new FormData();
      // formData.append("class_name", filteredlist[0].classname);
      // formData.append("section", filteredlist[0].section);
      // formData.append("subject", selectedSubject);
      // formData.append("homework_date", FROMDATE);
      // formData.append("remark", remark);
      //formData.append("homework_photo", localUri, filename);
      // // formData.append("homework_photo", filename);
      // formData.append("homework", "empty");
      // formData.append("due_date", TODATE);
      // formData.append("description", hw);

      //console.log(formData);

      async function storeData() {
        try {
          let headers = {
            Accept: "application/json",
            //"Content-Type": "application/json; charset=utf-8;",
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + `${token}`,
          };

          const resLogin = await axios.post(
            "http://10.0.2.2:8000/school/Homework/",
            formdata,
            {
              headers: headers,
            }
          );
          console.log("response", resLogin.data);
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
      setEnteredSelectedSubTouched(false);
      //setEnteredSelectedTouched(false);
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
    setEnteredSelectedSubTouched(false);
    //setEnteredSelectedTouched(false);
    setEnteredSubjectTouched(false);
    setEnteredFromDateTouched(false);
    setEnteredHomeWorkTouched(false);
    setEnteredRemarkTouched(false);
    setEnteredtoDateTouched(false);
    setEnteredImageTouched(false);
    setIsEdit(false);

    setSubLabel(false);
    setRemarkLabel(false);
    setHomeworkLabel(false);
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
    console.log("edit button clicked");
    ID = id;

    console.log(id);

    // setSubLabel(true);
    setRemarkLabel(true);
    setHomeworkLabel(true);
    setShowInitialBtn(false);
    // let selectedData = selected.split(" - ");
    // let class_name = selectedData[0];
    // let section = selectedData[1];

    const filteredDummuyData = homeworkData.find((data) => data.id == id);
 
  
     console.log(filteredDummuyData);


    // setData(filteredDummuyData.selectedData[class_name]);
    // setEnteredSection(filteredDummuyData.section);
    // setEnteredSubject(filteredDummuyData.subject);
    //console.log(filteredDummuyData.class_name + "-" + filteredDummuyData.section )
    VALUE=filteredDummuyData.class_name + " " + "-" + " " + filteredDummuyData.section
      //KEY=filteredDummuyData.id
   // console.log(VALUE)
      let filteredlistC = newArray.filter((ele) => ele.value == VALUE );
    KEY=filteredlistC[0].key
    // console.log(KEY)

    SUBJECTVALUE=filteredDummuyData.subject
  
    setFromText(moment(filteredDummuyData.homework_date).format("DD/MM/YYYY"));
    setToText(moment(filteredDummuyData.due_date).format("DD/MM/YYYY"));
    // moment(filteredDummuyData.due_date).format('DD/MM/YYYY')
    setEnteredRemark(filteredDummuyData.remark);
    setHW(filteredDummuyData.description);

    //setImage(filteredDummuyData.homework_photo);
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
        <Animated.View
          style={[
            {
              height: animateHeaderHeight,
              backgroundColor: animateHeaderBackGround,
            },
          ]}
        >
          <View style={styles.BtnContainer}>
            <BgButton onPress={showHomeworkForm} style={forHomeworkList}>
              Add New
            </BgButton>

            <BgButton onPress={showHomework} style={forHomeworkForm}>
              Show List
            </BgButton>
          </View>
        </Animated.View>
      )}
      {showForm && (
        <>
          <ScrollView style={styles.root}>
            <View style={styles.inputForm}>
              {!isEdit && (
                <View style={styles.selectStyle}>
                  <SelectList
                    setSelected={setSelected}
                    data={data}
                    save="key"
                    placeholder="Select class"
                    boxStyles={
                      selectInputIsInValid && styles.errorSelectedColor
                    }
                    dropdownTextStyles={styles.dropText}
                    inputStyles={styles.dropText}
                    onSelect={fetchSubjects}
                 
                  />
                  {selectInputIsInValid && (
                    <Text style={[styles.errorText, { top: 10 }]}>
                      Select class
                    </Text>
                  )}
                </View>
              )}


             {isEdit &&<View style={styles.selectStyle}>
                  <SelectList
                    setSelected={setSelected}
                    data={data}
                  save="key"
                    placeholder="Select class"
                    boxStyles={
                      selectInputIsInValid && styles.errorSelectedColor
                    }
                    dropdownTextStyles={styles.dropText}
                    inputStyles={styles.dropText}
                    onSelect={ fetchSubjects}
                    defaultOption={{
                      key: String(KEY),
                      value: String(VALUE),
                    }}
                  />
                  {selectInputIsInValid && (
                    <Text style={[styles.errorText, { top: 10 }]}>
                      Select class
                    </Text>
                  )}
                </View>}
            

              {!isEdit && (
                <View style={styles.selectStyleSub}>
                  <SelectList
                    setSelected={setSelectedSubject}
                    data={subjectData}
                    placeholder="Select subject"
                    boxStyles={
                      selectSubInputIsInValid && styles.errorSelectedColor
                    }
                    dropdownTextStyles={styles.dropText}
                    inputStyles={styles.dropText}
                  />
                  {selectInputIsInValid ? (
                    <Text style={[styles.errorText, { top: 10 }]}>
                      Please select class first
                    </Text>
                  ) : (
                    selectSubInputIsInValid &&
                    !selectInputIsInValid && (
                      <Text style={[styles.errorText, { top: 10 }]}>
                        Select subject
                      </Text>
                    )
                  )}
                </View>
              )}


              
{isEdit && (
                <View style={styles.selectStyleSub}>
                  <SelectList
                    setSelected={setSelectedSubject}
                    data={subjectData}
                    placeholder="Select subject"
                    boxStyles={
                      selectSubInputIsInValid && styles.errorSelectedColor
                    }
                    dropdownTextStyles={styles.dropText}
                    inputStyles={styles.dropText}
                    defaultOption={{
                      key: String(KEY),
                      value: String(SUBJECTVALUE),
                    }}
                    save='value'
                  />
                  {selectInputIsInValid ? (
                    <Text style={[styles.errorText, { top: 10 }]}>
                      Please select class first
                    </Text>
                  ) : (
                    selectSubInputIsInValid &&
                    !selectInputIsInValid && (
                      <Text style={[styles.errorText, { top: 10 }]}>
                        Select subject
                      </Text>
                    )
                  )}
                </View>
              )}

              {/* <View>
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
              </View> */}

              <View style={[{ flexDirection: "row", marginVertical: 10 }]}>
                <View style={{ flex: 1 }}>
                  <View>
                    <Ionicons
                      style={{
                        position: "absolute",
                        top: 22,
                      }}
                      name="calendar"
                      size={24}
                      color="black"
                      onPress={() => showFromMode("date")}
                    />
                  </View>
                  <UnderlinedInput
                    value={fromText || frmdate}
                    placeholder="   Start date"
                    onSubmitEditing={Keyboard.dismiss}
                    style={
                      isFromDateFocused
                        ? styles.focusStyle
                        : fromDateInputIsInValid && styles.errorBorderColorDate
                    }
                    //   blur={fromDateBlurHandler}
                    //  onFocus={onFocusFromHandler}
                    onChangeText={frmDateHandler}
                    onPressIn={() => showFromMode("date")}
                  />
                  {fromDateInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>Select from date</Text>
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
                        top: 22,
                      }}
                      name="calendar"
                      size={24}
                      color="black"
                      onPress={() => showToMode("date")}
                    />
                  </View>
                  <UnderlinedInput
                    // value={moment(toText).format('DD/MM/YYYY') || moment(toDate).format('DD/MM/YYYY')}
                    value={toText || todate}
                    // value={
                    //   moment(toText).format("DD/MM/YYYY") ||
                    //   moment(todate).format("DD/MM/YYYY")
                    // }
                    placeholder="   End date"
                    onSubmitEditing={Keyboard.dismiss}
                    style={
                      isToDateFocused
                        ? styles.focusStyle
                        : toDateInputIsInValid && styles.errorBorderColorDate
                    }
                    // blur={toDateBlurHandler}
                    //  onFocus={onFocusToHandler}
                    onChangeText={toDateHandler}
                    onPressIn={() => showToMode("date")}
                  />
                  {toDateInputIsInValid && (
                    <Text style={styles.commonErrorMsg}>Select to date</Text>
                  )}
                  {toShow && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={toDate}
                      mode={tomode}
                      is24Hour={true}
                      display="default"
                      onChange={toDateChangeHandler}
                      minimumDate={fromDate}
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
                      <Icon
                        as={Ionicons}
                        name="cloud-upload-outline"
                        size="md"
                      />
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
                <Text style={styles.errorText}>
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
          {keyboardStatus == "Keyboard Hidden" && (
            <View style={{ flex: 1 }}>
              <TeachersHome />
            </View>
          )}
        </>
      )}
      {showList && (
        <>
          <View style={{ backgroundColor: "white" }}>
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
          </View>
          <View
            style={[
              { flex: 1 },
              { flexDirection: "column", backgroundColor: "white" },
            ]}
          >
            <View style={{ flex: 8, bottom: 10 }}>
              <ScrollView
                scrollEventThrottle={25}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: false }
                )}
              >
                <View style={styles.root}>
                  {loading ? (
                    <ActivityIndicator
                      size={40}
                      visible={loading}
                      textContent={"Loading..."}
                      textStyle={styles.spinnerTextStyle}
                    />
                  ) : (
                    filteredData.map((homeworkData, key) => (
                      <>
                        <View>
                          <Card
                            style={{
                              marginVertical: 15,
                              marginHorizontal: 20,
                              elevation: 5,
                              borderRadius: 10,
                              paddingBottom: 20,
                            }}
                          >
                            <Card.Content>
                              <View
                                style={[
                                  { flex: 1 },
                                  {
                                    flexDirection: "row",
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
                                    <View style={{ flex: 0.2 }}>
                                      <Ionicons
                                        name="calendar"
                                        size={25}
                                        color="#D4AC0D"
                                        style={{}}
                                      />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                      <Text
                                        style={[
                                          styles.cardTextStyle,
                                          { left: 5 },
                                        ]}
                                      >
                                        Start Date
                                      </Text>
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
                                    <View style={{ flex: 0.3 }}>
                                      <Ionicons
                                        name="calendar"
                                        size={25}
                                        color="#D4AC0D"
                                        style={{}}
                                      />
                                    </View>
                                    <View
                                      style={{
                                        flex: 1,
                                        alignItems: "flex-start",
                                        left: "1%",
                                      }}
                                    >
                                      <Text
                                        style={[
                                          styles.cardTextStyle,
                                          { left: 5 },
                                        ]}
                                      >
                                        End Date
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </View>

                              <View
                                style={[
                                  { flex: 1 },
                                  {
                                    flexDirection: "row",
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
                                    <View style={{ flex: 0.3 }}></View>
                                    <View
                                      style={{
                                        flex: 1,
                                        alignItems: "flex-start",
                                        left: "1%",
                                      }}
                                    >
                                      <Text style={styles.textStyle}>
                                        {moment(
                                          homeworkData.homework_date
                                        ).format("DD/MM/YYYY")}
                                      </Text>
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
                                    <View style={{ flex: 0.3 }}>
                                      {/* <Ionicons
                                          name="calendar"
                                          size={25}
                                          color="#D4AC0D"
                                          style={{  }}
                                        /> */}
                                    </View>
                                    <View
                                      style={{
                                        flex: 1,
                                        alignItems: "flex-start",
                                        left: "1%",
                                      }}
                                    >
                                      <Text style={styles.textStyle}>
                                        {moment(homeworkData.due_date).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </View>

                              <View
                                style={[
                                  { flex: 1, top: "3%" },
                                  {
                                    flexDirection: "row",
                                  },
                                ]}
                              >
                                <View style={{ flex: 1 }}>
                                  <View
                                    style={[
                                      { flex: 1 },
                                      {
                                        flexDirection: "column",
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
                                        <View style={{ flex: 0.5 }}>
                                          <Text style={styles.cardTextStyle}>
                                            Subject:
                                          </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                          <Text style={styles.textStyle}>
                                            {homeworkData.subject}
                                          </Text>
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
                                        <View style={{ flex: 0.7 }}>
                                          <Text style={styles.cardTextStyle}>
                                            Classname:
                                          </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                          <Text style={styles.textStyle}>
                                            {homeworkData.class_name}{"-"}{homeworkData.section}
                                          </Text>
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
                                        <View style={{ flex: 0.7 }}>
                                          <Text style={styles.cardTextStyle}>
                                            Description:
                                          </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                          <Text style={styles.textStyle}>
                                            {homeworkData.remark}
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  </View>

                                  <View
                                    style={[
                                      { flex: 1, top: "4%", marginLeft: "70%" },
                                      {
                                        flexDirection: "row",
                                      },
                                    ]}
                                  >
                                    {homeworkData.created_by == USERNAME && (
                                      <View style={{ flex: 1, bottom: "1%" }}>
                                        <View
                                          style={[
                                            { flex: 1 },
                                            {
                                              flexDirection: "row",
                                            },
                                          ]}
                                        >
                                          <View style={{ flex: 0.4 }}>
                                            <IconButton
                                              colorScheme="success"
                                              onPress={() =>
                                                editItem(homeworkData.id)
                                              }
                                              variant="subtle"
                                              _icon={{
                                                as: Ionicons,
                                                name: "md-pencil-sharp",
                                              }}
                                            />
                                          </View>
                                          <View style={styles.space} />
                                          <View style={{ flex: 0.4 }}>
                                            <IconButton
                                              colorScheme="danger"
                                              onPress={() =>
                                                deleteItem(homeworkData.id)
                                              }
                                              variant="subtle"
                                              _icon={{
                                                as: Ionicons,
                                                name: "trash",
                                              }}
                                            />
                                          </View>
                                        </View>
                                      </View>
                                    )}
                                  </View>
                                </View>
                              </View>
                            </Card.Content>
                          </Card>
                        </View>
                      </>
                    ))
                  )}
                </View>
              </ScrollView>
            </View>
            {keyboardStatus == "Keyboard Hidden" && (
              <View style={{ flex: 1 }}>
                <TeachersHome />
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default TeacherHomeworkScreenBuild;

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",

    width: "100%",

    backgroundColor: "#FDFEFE",
  },
  btnSubmit1: {
    marginLeft: "50%",
    width: "50%",
  },
  cancel: {
    marginTop: -110,
    marginBottom: 50,
    marginLeft: -15,
    width: "50%",
  },

  root: {
    backgroundColor: "white",
    height: "100%",
    // marginTop: 10,
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
    backgroundColor: "white",
    height: "100%",
  },
  errorBorderColor: {
    borderColor: "red",
  },
  errorBorderColorDate: {
    borderBottomColor: "red",
  },
  errorSelectedColor: {
    borderColor: "red",
  },
  selectStyle: {
    marginRight: deviceWidth < 370 ? "2%" : "5%",
    marginLeft: deviceWidth < 370 ? "2%" : "4%",
  },
  selectStyleSub: {
    marginRight: deviceWidth < 370 ? "2%" : "5%",
    marginLeft: deviceWidth < 370 ? "2%" : "4%",
    marginTop: 20,
  },

  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  btnSubmit: {
    width: "70%",
    // marginTop: deviceWidth < 370 ? "3%" : "1%",
    bottom: "4%",
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

  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
    left: 35,
  },
  searchBar: {
    marginTop: 20,
    marginBottom: 20,

    backgroundColor: "#F0F3F4",
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
    width: deviceWidth > 400 ? 70 : 70,
  },
  normalRemark: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upRemark: {
    top: deviceHieght > 800 ? 30 : 25,
    width: deviceWidth > 400 ? 70 : 70,
    left: deviceWidth < 370 ? 20 : 30,
    height: deviceHieght > 800 ? 25 : 25,
  },
  normalHomework: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upHomework: {
    top: deviceWidth < 370 ? 15 : 24,
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 100 : 95,
  },
  errorLabel: {
    color: "red",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 15,
  },
  normalLabel: {
    color: "grey",
    backgroundColor: "#F2F2F2",
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: deviceWidth < 370 ? 13 : 16,
    letterSpacing: 0.5,
  },

  iconStyle: {
    position: "absolute",
    top: 23,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  textStyle: {
    fontSize: deviceWidth < 370 ? 14 : 16,
    fontFamily: "HindSemiBold",
    color: "grey",
  },
  commonErrorMsg: {
    color: "red",
    left: 20,
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 16 : 18,
    top: deviceHieght > 800 ? -3 : 1,
  },
});
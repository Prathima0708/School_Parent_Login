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
import { subURL } from "../../../../components/utils/URL's";
import * as FileSystem from "expo-file-system";

export var ID;
var FROMDATE, TODATE;

var SubjectID;
let localUri, match, type, path;
let ImageResult, filename;
var newArray, TOKEN, USERNAME;
var KEY, VALUE, SUBJECTVALUE, SUBJECTKEY;

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

  const [isSubjectFocused, setIsSubjectFocused] = useState(false);
  const [isFromDateFocused, setIsFromDateFocused] = useState(false);
  const [isToDateFocused, setIsToDateFocused] = useState(false);
  const [isTRemarkFocused, setIsTRemarkFocused] = useState(false);
  const [isHomeworkFocused, setIsHomeworkFocused] = useState(false);

  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [forHomeworkList, setForHomeworkList] = useState({
    color: "white",
    backgroundColor: "#1E84A4",
    borderRadius: 5,
  });
  const [forHomeworkForm, setForHomeworkForm] = useState({
    color: "black",
    backgroundColor: "#F4F6F6",
    borderRadius: 5,
  });

  const [selected, setSelected] = useState("");
  const [enteredSelectedTouched, setEnteredSelectedTouched] = useState(false);
  const enteredSelcetdIsValid = selected.toString().trim() !== "";
  const selectInputIsInValid = !enteredSelcetdIsValid && enteredSelectedTouched;

  const [data, setData] = useState([]);

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

  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [homeworkData, setHomeworkData] = useState([]);
  const [isSame, SetIsSame] = useState(false);
  const [showInitialBtn, setShowInitialBtn] = useState(true);

  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  const [selectedSearch, setSelectedSearch] = useState("");
  const [studData, setStudData] = useState([]);

  let i = 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Homework/`);
        setHomeworkData(res.data);
        setFilteredData(res.data);
        let test = 0;
        const value = await AsyncStorage.getItem("key");
        for (i = 0; i < res.data.length; i++) {
          if (value == res.data[i].created_by) {
            test = res.data[i].created_by;
          } else {
          }
        }
        if (test == value) {
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

    if (USERNAME !== null) {
      setUser(USERNAME);
    }
  }
  fetchUser();

  const imageToBlob = async (imageUri) => {
    const fileType = await FileSystem.getContentUriAsync(imageUri);
    const file = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const buffer = new Uint8Array(file.length);
    for (let i = 0; i < file.length; i++) {
      buffer[i] = file.charCodeAt(i);
    }
    const blob = new Blob([buffer], { type: fileType });

    return blob;
  };

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    const fileName = result.uri.split("/").pop();

    const blob = await imageToBlob(source.uri);
    const myFile = new File([blob], fileName, { type: result.type });

    // const { uri, base64 } = result;
    // const body = JSON.stringify({
    //   image: base64,
    // });
    // console.log(body);
    // const convertedImage = JSON.stringify({
    //   image: base64,
    // });
    // console.log(convertedImage);
    // ImageResult = result;
    // const reader = new FileReader();

    // // ImageResult = File(result);
    // console.log(ImageResult)

    location = result.uri;
    if (!result.cancelled) {
      setImage(myFile);
    }

    //RNFetchBlob.config({ fileCache: true });

    // const file = await FileSystem.readAsStringAsync(result.uri, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });
    // console.log(file);

    // try {
    //   filename = await ImageManipulator.manipulateAsync(file, [], {
    //     base64: true,
    //   });
    // } catch (error) {
    //   console.log("error::");
    //   console.error(error);
    // }
    //filename = image;

    // if (!result.cancelled) {
    //   let fileUri = result.uri;
    //   let fileInfo = await FileSystem.getInfoAsync(fileUri);

    //   console.log(fileInfo);
    // let fileName = fileInfo.name;
    // console.log(fileName);

    // let formData = new FormData();
    // formData.append("homework_photo", {
    //   uri: fileUri,
    //   name: fileName,
    //   type: "image/jpeg",
    // });
    // try {
    //   let response = await fetch(`${subURL}/Homework/`, {
    //     method: "POST",
    //     body: formData,
    //   });
    //   let responseJson = await response.json();
    //   console.log(responseJson);
    // } catch (error) {
    //   console.error(error);
    // }
    // }

    localUri = result.uri;
    filename = localUri.split("/").pop();
    path = FileSystem.documentDirectory + filename;
    console.log(path);

    match = /\.(\w+)$/.exec(filename);
    type = match ? `image/${match[1]}` : `image`;

    // const base64 = await FileSystem.readAsStringAsync(result.uri, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });
    // console.log(base64);

    // const fileReader = new FileReader();
    // fileReader.onload = (fileLoadedEvent) => {
    //   const base64Image = fileLoadedEvent.target.result;
    //   //  console.log(base64Image);
    // };
    // console.log(fileReader.readAsDataURL(result.uri));
    // console.log(typeof result);
  };
  let imagePreView;

  if (image) {
    // imagePreView = <Image style={styles.image} source={{ uri: image }} />;
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

          const details = newArray.sort(function (obj1, obj2) {
            return obj1.value.localeCompare(obj2.value);
          });

          //setSubjectData(newSubjects);
          setStudData(newArray);
          setData(newArray);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchStudentClass();
  }, []);

  function fetchSubjects() {
    async function fetchSubjects() {
      axios
        .get(`${subURL}/StudentclassSubjectDetail/${selected}`)
        .then((response) => {
          console.log("subjects", response.data);
          for (var i = 0; i < response.data.length; i++) {
            response.data[i] =
              response.data[i].charAt(0).toUpperCase() +
              response.data[i].substr(1);
          }

          setSubjectData(response.data);
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
    setFromDate(enteredValue);
    setenteredfrmdate(enteredValue);
  }
  function toDateHandler(enteredValue) {
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

  function updateHandler() {
    console.log("selected inside update", selected);
    let filteredlist = newArray.filter((ele) => ele.key == selected);
    console.log("filetred list inside update", filteredlist);
    console.log("inside update ", selectedSubject);
    let uploaduri = image;

    const formdata = {
      class_name: filteredlist[0].classname,
      section: filteredlist[0].section,

      subject:
        selected.toString() == selectedSubject ? SUBJECTVALUE : selectedSubject,
      homework_date: FROMDATE,
      remark: remark,

      due_date: TODATE,
    };
    console.log(formdata);

    if (
      !enteredFromDateIsValid ||
      !enteredtoDateIsValid ||
      !enteredRemarkIsValid ||
      !enteredHomeWorkIsValid
    ) {
      Alert.alert("Please enter all fields");
    } else {
      async function updateData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };

          const resLogin = await axios.patch(
            `${subURL}/Homework/${ID}/`,
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
    }
  }

  function buttonPressedHandler() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setBtn(true);
    setSubBtn(true);

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
    } else {
      let filteredlist = newArray.filter((ele) => ele.key == selected);

      var formdata = {
        class_name: filteredlist[0].classname,
        section: filteredlist[0].section,
        subject: selectedSubject,
        homework_date: FROMDATE,
        remark: remark,
        homework_photo: image,
        homework: "empty",
        due_date: TODATE,
        description: hw,
      };

      console.log(formdata);

      //   var formData = new FormData();
      //  console.log(FROMDATE)
      //   formData.append('class_name', filteredlist[0].classname);
      //   formData.append('section', filteredlist[0].section);
      //   // formData.append('startedYear', value.startedYear);
      //   formData.append('subject', selectedSubject);
      //   formData.append('homework_date', FROMDATE);
      //   formData.append('remark', remark);
      //   console.log(formData)
      //   formData.append('homework_photo',image,image.name);
      //   formData.append('homework', "");
      //   formData.append('due_date', TODATE);
      //   formData.append('description', hw);

      //  console.log(formData)
      // console.log(formData.homework_date)
      // console.log(formData._parts[7][1]);
      // console.log(formData.subject)
      async function storeData() {
        try {
          //  debugger
          // let headers = {
          //   //  Accept: "application/json",
          //   //"Content-Type": "application/json; charset=utf-8;",
          //   // "Content-Type": "multipart/form-data",
          //   Authorization: "Token " + `${token}`,
          // };
          let headers = new Headers({
            // 'Content-Type': 'application/json',
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + `${token}`,
          });
          // console.log(formData)
          const resLogin = await axios.post(`${subURL}/Homework/`, formdata, {
            headers: headers,
          });
          console.log("response", resLogin.data);
          debugger;
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

      setEnteredSubjectTouched(false);
      setEnteredFromDateTouched(false);
      setEnteredHomeWorkTouched(false);
      setEnteredRemarkTouched(false);
      setEnteredtoDateTouched(false);
      setEnteredImageTouched(false);
      setShowForm(false);
      setShowList(true);
      setForHomeworkList({
        backgroundColor: "#1E84A4",
        color: "white",
        borderRadius: 5,
      });
      setForHomeworkForm({
        color: "white",
        backgroundColor: "#1E84A4",
        borderRadius: 5,
      });
    }
  }

  function onSubjectFocusHandler() {
    setIsSubjectFocused(true);
    setEnteredSubjectTouched(false);
    setSubLabel(true);
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

  function showHomeworkForm() {
    setEnteredSubject("");
    setFromText("");
    setToText("");
    setPickedImage("");
    setEnteredRemark("");
    setHW("");
    setForHomeworkList({
      backgroundColor: "#1E84A4",
      color: "white",
      borderRadius: 5,
    });
    setForHomeworkForm({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 5,
    });
    setShowForm(true);
    setShowList(false);
    setEnteredSelectedTouched(false);
    setEnteredSelectedSubTouched(false);

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
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    setForHomeworkForm({
      color: "white",
      backgroundColor: "#1E84A4",
      borderRadius: 5,
    });
    setForHomeworkList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 5,
    });
    setShowForm(false);
    setShowList(true);
  }

  function editItem(id) {
    console.log("edit button clicked");
    ID = id;

    console.log(id);

    setRemarkLabel(true);
    setHomeworkLabel(true);
    setShowInitialBtn(false);

    const filteredDummuyData = homeworkData.find((data) => data.id == id);

    console.log(filteredDummuyData);

    VALUE =
      filteredDummuyData.class_name +
      " " +
      "-" +
      " " +
      filteredDummuyData.section;

    let filteredlistC = newArray.filter((ele) => ele.value == VALUE);
    KEY = filteredlistC[0].key;

    SUBJECTVALUE = filteredDummuyData.subject;

    setFromText(moment(filteredDummuyData.homework_date).format("DD/MM/YYYY"));
    setToText(moment(filteredDummuyData.due_date).format("DD/MM/YYYY"));

    setEnteredRemark(filteredDummuyData.remark);
    setHW(filteredDummuyData.description);

    setForHomeworkList({
      backgroundColor: "#F4F6F6",
      color: "black",
      borderRadius: 5,
    });
    setForHomeworkForm({
      color: "white",
      backgroundColor: "#1E84A4",
      borderRadius: 5,
    });
    setShowForm(true);
    setShowList(false);
    setIsEdit(true);
  }

  function deleteItem(id) {
    console.log("i am pressed");

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

        const resLogin = await axios.delete(
          `${subURL}/Homework/${id}/`,

          {
            headers: headers,
          }
        );

        console.log(resLogin.data);
      } catch (error) {
        console.log(error);
      }
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
    }
  }

  function cancelHandler() {
    setShowInitialBtn(true);
    setShowList(true);
    setShowForm(false);
  }

  function linkPressedHandler() {
    setShowForm(true);
    setShowList(false);

    setForHomeworkList({
      color: "white",
      backgroundColor: "#1E84A4",
      borderRadius: 5,
    });
    setForHomeworkForm({
      color: "black",
      backgroundColor: "#F4F6F6",
      borderRadius: 5,
    });
  }

  function searchHW() {
    async function login() {
      let filteredlist = newArray.filter((ele) => ele.key == selectedSearch);

      let class_name = filteredlist[0].classname;
      let section = filteredlist[0].section;
      try {
        const res = await axios.get(
          `${subURL}/HomeworkListByClass/${class_name}/${section}`
        );

        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    login();
  }

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
              {/* <Image
                // source={{ uri: `${filename}` }}
                source={{ uri: filename.uri }}
                style={{ width: 200, height: 200 }}
              /> */}
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
                    <Text style={[styles.errorText, { top: 10, left: 10 }]}>
                      Select class
                    </Text>
                  )}
                </View>
              )}

              {isEdit && (
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
                </View>
              )}

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
                    <Text style={[styles.errorText, { top: 10, left: 10 }]}>
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
                    save="value"
                  />
                  {selectInputIsInValid ? (
                    <Text style={[styles.errorText, { top: 10, left: 10 }]}>
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
                    backgroundColor="#1E84A4"
                    onPress={PickImage}
                    leftIcon={
                      <Icon
                        as={Ionicons}
                        name="cloud-upload-outline"
                        size="md"
                      />
                    }
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "HindSemiBold",
                        color: "white",
                      }}
                    >
                      Upload Image
                    </Text>
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
              {/* <View
                style={[
                  {
                    // Try setting `flexDirection` to `"row"`.
                    flex:1,
                    flexDirection: 'column',
                  },
                ]}>
                <View style={{flex: 1, backgroundColor: 'red'}}>
                  <Button onPress={updateHandler}>Update</Button>
                </View>
                <View style={{flex: 1, backgroundColor: 'darkorange'}}>

                </View>
              </View> */}

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
          {/* <View style={{ backgroundColor: "white" }}>
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
          </View> */}
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <View
              style={[
                {
                  //width: 170,
                  fontSize: 20,
                  backgroundColor: "white",
                  // marginTop: 13,
                  margin: 10,
                  left: 20,
                  marginTop: "4%",
                  flexDirection: "row",
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: "HindSemiBold",
                  fontSize: 17,
                  top: "3%",
                  marginLeft: 10,
                }}
              >
                Search by
              </Text>
              <View style={styles.space} />
              <View style={styles.space} />
              <Text
                style={{
                  fontFamily: "HindBold",
                  fontSize: 20,
                  top: "2%",
                  right: "3%",
                }}
              >
                -
              </Text>
              <View style={styles.space} />
              <SelectList
                //  defaultOption={{ key: "1", value: "Second-A" }}
                setSelected={setSelectedSearch}
                data={studData}
                save="key"
                placeholder="Select class"
                onSelect={searchHW}
                boxStyles={{ borderRadius: 10 }}
                dropdownTextStyles={{
                  fontSize: 15,
                  fontFamily: "HindRegular",
                }}
                inputStyles={{ fontSize: 15, fontFamily: "HindRegular" }}
                //dropdownStyles={{ width: "120%" }}
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
                  {filteredData.length <= 0 ? (
                    <View style={{ alignItems: "center", marginTop: "5%" }}>
                      <Text style={styles.msgText}>
                        No Homeworks found,
                        <Text
                          style={styles.linkText}
                          onPress={linkPressedHandler}
                        >
                          Start adding here
                        </Text>
                      </Text>
                    </View>
                  ) : (
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
                                            {moment(
                                              homeworkData.due_date
                                            ).format("DD/MM/YYYY")}
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
                                            <View style={{ flex: 0.7 }}>
                                              <Text
                                                style={styles.cardTextStyle}
                                              >
                                                Classname:
                                              </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                              <Text style={styles.textStyle}>
                                                {homeworkData.class_name}
                                                {"-"}
                                                {homeworkData.section}
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
                                            <View style={{ flex: 0.5 }}>
                                              <Text
                                                style={styles.cardTextStyle}
                                              >
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
                                              <Text
                                                style={styles.cardTextStyle}
                                              >
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
                                          {
                                            flex: 1,
                                            top: "4%",
                                            marginLeft: "70%",
                                          },
                                          {
                                            flexDirection: "row",
                                          },
                                        ]}
                                      >
                                        {homeworkData.created_by ==
                                          USERNAME && (
                                          <View
                                            style={{ flex: 1, bottom: "1%" }}
                                          >
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
                  )}
                </ScrollView>
              </View>
              {keyboardStatus == "Keyboard Hidden" && (
                <View style={{ flex: 1 }}>
                  <TeachersHome />
                </View>
              )}
            </View>
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
    marginTop: -105,
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
    marginTop: 10,
    marginBottom: 59,
    width: "70%",
    marginLeft: 130,
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
    fontSize: deviceWidth < 370 ? 16 : 15,
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
    fontSize: deviceWidth < 370 ? 16 : 16,
    top: deviceHieght > 800 ? -3 : 1,
  },
  linkText: {
    fontFamily: "HindSemiBold",
    color: "#02BFC4",
    fontSize: 18,
    textDecorationLine: "underline",
    textDecorationColor: "#02BFC4",
    cursor: "pointer",
  },
  msgText: {
    fontSize: 18,
    fontFamily: "HindSemiBold",
    color: "#6B0000",
  },
});

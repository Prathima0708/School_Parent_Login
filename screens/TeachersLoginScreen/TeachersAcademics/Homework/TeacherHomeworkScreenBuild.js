import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Keyboard,
  Dimensions,
  Animated,
  ActivityIndicator,
  Image,
} from "react-native";
import { Button as NativeButton, Icon, IconButton } from "native-base";
import React, { useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../../../components/UI/Button";

import axios from "axios";
import * as ImagePicker from "expo-image-picker";

import SelectList from "react-native-dropdown-select-list";
import { Alert } from "react-native";
import moment from "moment";

import { useCameraPermissions, PermissionStatus } from "expo-image-picker";

import BgButton from "../../../../components/UI/BgButton";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import TeachersHome from "../../BottomTab/TeachersHome";
import Input from "../../../../components/UI/Input";

import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import UnderlinedInput from "../../../../components/UI/UnderlinedInput";
import { mainURL, subURL } from "../../../../components/utils/URL's";
import * as FileSystem from "expo-file-system";
import Textarea from "../../../../components/UI/Textarea";

var ID;
var FROMDATE, TODATE;

let localUri, match, type, path;
let filename;
var newArray, TOKEN, USERNAME;
var KEY, VALUE, SUBJECTVALUE, SUBJECTKEY;
var FORMDATA;

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
  const [imageEditMode, setImageEditMode] = useState(null);

  const [enteredImageTouched, setEnteredImageTouched] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

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

  const [fileName, setFileName] = useState("");
  const [fileUri, setFileUri] = useState("");
  const [imageEdit, setImageEdit] = useState(false);

  const [newlyEditedImage, setNewlyEditedImage] = useState(false);
  const myRef = useRef(null);
  const [aspectRatio, setAspectRatio] = useState(null);

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
    if (myRef.current && myRef.current.setNativeProps) {
      const styleObj = {
        // borderWidth: 3,
        // borderColor: "black",
      };
      myRef.current.setNativeProps({
        style: styleObj,
      });
    }
  }, [myRef]);
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

  // const PickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   const source = { uri: result.uri };
  //   const fileName = result.uri.split("/").pop();

  //   const blob = await imageToBlob(source.uri);
  //   const myFile = new File([blob], fileName, { type: result.type });

  //   if (!result.cancelled) {
  //     setImage(myFile);
  //   }

  //   const localUri = result.uri;
  //   filename = localUri.split("/").pop();
  //   path = FileSystem.documentDirectory + filename;

  //   match = /\.(\w+)$/.exec(filename);
  //   type = match ? `image/${match[1]}` : `image`;
  // };

  // const PickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //     FORMDATA = new FormData();
  //     FORMDATA.append("homework_photo", {
  //       uri: result.uri,
  //       name: result.uri.split("/").pop(),
  //       type: "image/jpeg",
  //     });
  //   }
  // };

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //  aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setFileName(result.uri.split("/").pop());
      setFileUri(result.uri);
      setImageEditMode(result.uri);
      const { width, height } = await Image.getSize(result.uri);

      // Calculate the aspect ratio dynamically
      const imageAspectRatio = width / height;
      setAspectRatio(imageAspectRatio);
    }
  };

  const PickImageEdit = async () => {
    setNewlyEditedImage(true);
    setImageEdit(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setFileName(result.uri.split("/").pop());
      setFileUri(result.uri);
      //  setImageEditMode(result.uri);
      const { width, height } = await Image.getSize(result.uri);

      // Calculate the aspect ratio dynamically
      const imageAspectRatio = width / height;
      setAspectRatio(imageAspectRatio);
    }
  };

  let imagePreView;
  if (image) {
    imagePreView = (
      <Image
        style={styles.image}
        source={{
          uri: imageEdit ? `${mainURL}${image}` : image,
        }}
      />
    );
  }

  // if (imageEditMode) {
  //   editImagePreview = (
  //     <Image style={styles.image} source={{ uri: imageEditMode }} />
  //   );
  // } else if (image) {
  //   imagePreView = <Image style={styles.image} source={{ uri: image }} />;
  // } else {
  //   editImagePreview = null;
  //   imagePreView = null;
  // }

  useEffect(() => {
    async function fetchStudentClass() {
      axios
        .get(`${subURL}/Studentclass/`)
        .then((response) => {
          newArray = response.data.map((item) => {
            return {
              key: item.id,

              value: item.class_name + " - " + item.section,
              classname: item.class_name,
              section: item.section,
            };
          });

          const details = newArray.sort(function (obj1, obj2) {
            return obj1.value.localeCompare(obj2.value);
          });

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
    }
  };

  const toDateChangeHandler = (event, selectedToDate) => {
    const currentToDate = selectedToDate;
    TODATE = selectedToDate;

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
    }

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

  // function updateHandler() {
  //   let filteredlist = newArray.filter((ele) => ele.key == selected);
  //   console.log(selected, selected.toString());
  //   console.log(selectedSubject);

  //   console.log(SUBJECTVALUE);
  //   const formdata = {
  //     class_name: filteredlist[0]?.classname,
  //     section: filteredlist[0]?.section,

  //     subject:
  //       selected.toString() == selectedSubject ? SUBJECTVALUE : selectedSubject,

  //     homework_date: FROMDATE,
  //     remark: remark,

  //     due_date: TODATE,
  //   };

  //   if (
  //     !enteredSelcetdIsValid ||
  //     !enteredSelcetdSubIsValid ||
  //     !enteredFromDateIsValid ||
  //     !enteredtoDateIsValid ||
  //     !enteredHomeWorkIsValid ||
  //     !enteredRemarkIsValid
  //   ) {
  //     Alert.alert("Please enter all fields");
  //   } else {
  //     async function updateData() {
  //       try {
  //         let headers = {
  //           "Content-Type": "application/json; charset=utf-8",
  //         };

  //         await axios
  //           .patch(`${subURL}/Homework/${ID}/`, formdata, { headers: headers })
  //           .then((res) => {
  //             if (res.status === 200) {
  //               Alert.alert("Successfully updated", "", [
  //                 {
  //                   text: "OK",
  //                   onPress: () => fetchData(),
  //                 },
  //               ]);
  //               setLoading(true);
  //               setTimeout(() => {
  //                 setLoading(false);
  //               }, 2000);
  //             }
  //           });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }

  //     updateData();

  //     async function fetchData() {
  //       try {
  //         const res = await axios.get(`${subURL}/Homework/`);
  //         setHomeworkData(res.data);
  //         setFilteredData(res.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     fetchData();

  //     setEnteredSubject("");
  //     setFromText("");
  //     setToText("");
  //     setPickedImage("");
  //     setEnteredRemark("");
  //     setHW("");
  //     setShowForm(false);
  //     setShowList(true);

  //     setShowInitialBtn(true);
  //   }
  // }

  function updateHandler() {
    let filteredlist = newArray?.filter((ele) => ele.key == selected);

    const formdata = new FormData();
    formdata.append("class_name", filteredlist[0]?.classname);
    formdata.append("section", filteredlist[0]?.section);
    formdata.append(
      "subject",
      selected.toString() == selectedSubject ? SUBJECTVALUE : selectedSubject
    );
    if (!isNaN(Date.parse(FROMDATE))) {
      formdata.append("homework_date", new Date(FROMDATE).toISOString());
    }
    formdata.append("remark", "");
    if (image && fileName && fileUri) {
      formdata.append("homework_photo", {
        uri: fileUri,
        type: "image/jpeg",
        name: fileName,
      });
    } else {
      console.log("Image not selected or invalid file data.");
    }

    if (!isNaN(Date.parse(TODATE))) {
      formdata.append("due_date", new Date(TODATE).toISOString());
    }
    formdata.append("description", hw);

    if (
      !enteredSelcetdIsValid ||
      !enteredSelcetdSubIsValid ||
      !enteredFromDateIsValid ||
      !enteredtoDateIsValid ||
      !enteredHomeWorkIsValid 
    ) {
      Alert.alert("Please enter all fields");
    } else {
      async function updateData() {
        try {
          const headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          };
          console.log(formdata);

          await axios
            .patch(`${subURL}/Homework/${ID}/`, formdata, { headers: headers })
            .then((res) => {
              console.log("inside update fun");
            });
        } catch (error) {
          console.log(error);
        }
      }
      updateData();
      Alert.alert("Successfully updated", "", [
        {
          text: "OK",
          onPress: () => {
            showHomework();

            setShowInitialBtn(true);

            setShowList(true);
            setShowForm(false);
          },
        },
      ]);

      setEnteredSubject("");
      setFromText("");
      setToText("");
      setPickedImage("");
      setHW("");
      setShowForm(false);
      setShowList(true);

      setShowInitialBtn(true);
    }
  }

  async function buttonPressedHandler() {
    setEnteredSelectedTouched(true);
    setEnteredSelectedSubTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredHomeWorkTouched(true);

    let filteredlist = newArray?.filter((ele) => ele.key == selected);
    // const formData = new FormData();
    // formData.append("class_name", filteredlist[0]?.classname);
    // formData.append("section", filteredlist[0]?.section);
    // formData.append("subject", selectedSubject);
    // formData.append("homework_date", new Date(FROMDATE).toISOString());
    // formData.append("remark", remark);
    // formData.append("homework_photo", {
    //   uri: fileUri,
    //   type: "image/jpeg",
    //   name: fileName,
    // });
    // formData.append("homework", "");
    // formData.append("due_date", new Date(TODATE).toISOString());
    // formData.append("description", hw);

    // try {
    //   const response = await axios.post(`${subURL}/Homework/`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: "Token " + `${token}`,
    //     },
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }

    // var formData = {
    //   class_name: filteredlist[0]?.classname,
    //   section: filteredlist[0]?.section,
    //   subject: selectedSubject,
    //   homework_date: FROMDATE,
    //   remark: remark,
    //   homework_photo: file.name,
    //   homework: "",
    //   due_date: TODATE,
    //   description: hw,
    // };

    if (
      !enteredSelcetdIsValid ||
      !enteredSelcetdSubIsValid ||
      !enteredFromDateIsValid ||
      !enteredtoDateIsValid ||
      !enteredHomeWorkIsValid 
    ) {
      return;
    }

    async function storeData() {
      try {
        let headers = {
          "Content-Type": "multipart/form-data",

          Authorization: "Token " + `${token}`,
        };
        const formData = new FormData();
        formData.append("class_name", filteredlist[0]?.classname);
        formData.append("section", filteredlist[0]?.section);
        formData.append("subject", selectedSubject);
        formData.append("homework_date", new Date(FROMDATE).toISOString());
        formData.append("remark", "");
        if (image) {
          formData.append("homework_photo", {
            uri: fileUri,
            type: "image/jpeg",
            name: fileName,
          });
        }

        formData.append("homework", "");
        formData.append("due_date", new Date(TODATE).toISOString());
        formData.append("description", hw);

        await axios
          .post(`${subURL}/Homework/`, formData, {
            headers: headers,
          })
          .then((res) => {
            if (res.status === 201) {
              setShowForm(false);

              Alert.alert("Data Saved", "Homework added Successfully");
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 2000);
              showHomework();
              setShowList(true);
            } else {
              Alert.alert("Something went wrong", "Please try again later");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    storeData();
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
    setImage(null);

    setFileName(null);
    setFileUri(null);
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
    setEnteredFromDateTouched(false);
    setEnteredtoDateTouched(false);
    setEnteredHomeWorkTouched(false);
    setIsEdit(false);

    setSubLabel(false);
    setRemarkLabel(false);
    setHomeworkLabel(false);
  }
  function showHomework() {
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Homework/`);
        setHomeworkData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
    ID = id;
    setIsEdit(true);
    setHomeworkLabel(true);
    setImageEdit(true);
    setShowInitialBtn(false);

    const filteredDummuyData = homeworkData.find((data) => data.id == id);

    VALUE =
      filteredDummuyData.class_name +
      " " +
      "-" +
      " " +
      filteredDummuyData.section;

    let filteredlistC = newArray.filter((ele) => ele.value == VALUE);
    KEY = filteredlistC[0]?.key;

    SUBJECTVALUE = filteredDummuyData.subject;
    console.log(SUBJECTVALUE);

    setFromText(moment(filteredDummuyData.homework_date).format("DD/MM/YYYY"));
    setToText(moment(filteredDummuyData.due_date).format("DD/MM/YYYY"));
    setHW(filteredDummuyData.description);
    setImage(filteredDummuyData.homework_photo);

    //setImageEditMode(filteredDummuyData.homework_photo);

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
  }
  // let editImagePreview;

  // editImagePreview = (
  //   <Image
  //     style={styles.image}
  //     source={{ uri: `${mainURL}${imageEditMode}` }}
  //   />
  // );

  function deleteItem(id) {
    Alert.alert("Confirm Deletion", "Are you sure you want to delete ?", [
      {
        text: "Cancel",

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
      } catch (error) {
        console.log(error);
      }
      async function fetchData() {
        try {
          const res = await axios.get(`${subURL}/Homework/`);

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
    setEnteredSelectedTouched(false);
    setEnteredSelectedSubTouched(false);

    setEnteredSubjectTouched(false);
    setEnteredFromDateTouched(false);
    setEnteredHomeWorkTouched(false);
    setEnteredtoDateTouched(false);
    setEnteredImageTouched(false);
    setIsEdit(false);

    setSubLabel(false);
    setHomeworkLabel(false);
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
                    save="key"
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
                    value={toText || todate}
                    placeholder="   End date"
                    onSubmitEditing={Keyboard.dismiss}
                    style={
                      isToDateFocused
                        ? styles.focusStyle
                        : toDateInputIsInValid && styles.errorBorderColorDate
                    }
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
              {/* <View>
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
              </View> */}

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
                    Description
                  </Text>
                </View>
                <Textarea
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
                  <Text style={styles.errorText}>Enter Description</Text>
                )}
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={styles.uploadImgBtn}>
                  {!isEdit && (
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
                  )}
                  {isEdit && (
                    <NativeButton
                      backgroundColor="#1E84A4"
                      onPress={PickImageEdit}
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
                  )}

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
                </View>
              </View>

              {/* {!imageEdit && ( */}
              <View
                style={[
                  image ? styles.imagePreView : styles.noImage,
                  { aspectRatio: aspectRatio },
                ]}
              >
                {imagePreView}
              </View>
              {/* )} */}

              {/* {imageEdit && (
                <View
                  style={imageEditMode ? styles.imagePreView : styles.noImage}
                >
                  {editImagePreview}
                </View>
              )} */}

              {imageInputIsInValid && (
                <Text style={styles.errorText}>
                  Please upload or take homework image
                </Text>
              )}
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
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <View
              style={[
                {
                  fontSize: 20,
                  backgroundColor: "white",

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
                                                {homeworkData.description}
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
    //   justifyContent: "flex-start",
    //   alignItems: "flex-start",
      borderRadius: 8,
      left:'2%',
  },


  image: {
    width: "100%",
    height: "100%",
  },
  space: {
    width: 15,
  },

  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
    left: 35,
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
    zIndex: 100,
  },
  normalRemark: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 27,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upRemark: {
    top: deviceHieght > 800 ? 30 : 25,
    width: deviceWidth > 400 ? 80 : 70,
    left: deviceWidth < 370 ? 20 : 30,
    height: deviceHieght > 800 ? 25 : 25,
    zIndex: 100,
  },
  normalHomework: {
    position: "absolute",
    top: deviceWidth < 370 ? 23 : 35,
    left: deviceWidth < 370 ? 20 : 30,
  },
  upHomework: {
    top: deviceWidth < 370 ? 15 : 25,
    
    left: deviceWidth < 370 ? 20 : 30,
    width: deviceWidth > 400 ? 120 : 100,
    zIndex: 100,
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

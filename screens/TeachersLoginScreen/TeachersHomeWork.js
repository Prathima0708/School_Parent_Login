import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/UI/Button";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import SelectList from "react-native-dropdown-select-list";
import { Alert, Button as Btn, Image } from "react-native";
import { Keyboard } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { UserId } from "../Login";
import BgButton from "../../components/UI/BgButton";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import TeachersHome from "./TeachersHome";

const TeachersHomework = () => {
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);

  const [selectedsection, setSelectedsection] = useState("");
  const [sectiondata, setSectionData] = useState([]);

  const [classname, setEnteredClassName] = useState("");
  const [section, setEnteredSection] = useState("");
  const [subject, setEnteredSubject] = useState("");

  const [remark, setEnteredRemark] = useState();
  const [hw, setHW] = useState("");

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const [image, setImage] = useState();

  const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
      console.log(keyboardStatus)
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
      console.log(keyboardStatus)
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied!");
      }
    }
  }, []);

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
  let imagePreView = <Text>No image taken yet.</Text>;

  if (image) {
    imagePreView = <Image style={styles.image} source={{ uri: image }} />;
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

        setData(newArray);
      })
      .catch((e) => {
        console.log(e);
      });
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
    setFromText(fDate);
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
    setToText(tDate);
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

  function buttonPressedHandler() {
    console.log(selected);
    // console.log(selectedsection);
    // console.log(pickedImage);
    let selectedData = selected.split(" - ");
    let class_name = selectedData[0];
    let section = selectedData[1];
    let uploaduri = image;
    let filename = uploaduri.substring(uploaduri.lastIndexOf("/") + 1);
    const formdata = {
      class_name: class_name,
      section: section,
      subject: subject,
      homework_date: fromDate,
      due_date: toDate,
      homework_photo: `/assets/images/${filename}`,
      remark: remark,
      description: hw,
    };
    console.log(formdata);

    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
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
  }
  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add HomeWork</BgButton>
      </View> */}

      <ScrollView style={styles.root}>
        <View style={styles.inputForm}>
          <Text style={styles.labels}>CLASS NAME</Text>

          <View style={{ width: 350, fontSize: 18, marginTop: 3 }}>
            <SelectList
              setSelected={setSelected}
              data={data}
              placeholder="select class"
            />
          </View>

          <Text style={styles.labels}>SUBJECT</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={subjectChangeHandler}
            value={subject}
            onSubmitEditing={Keyboard.dismiss}
          />
            <View style={[{
              // Try setting `flexDirection` to `"row"`.
              flexDirection: "row"
             }]}>
              <View style={{ flex: 1 }} >
              <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,

              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "black",
              }}
            >
              HOMEWORK DATE: </Text>

            <Ionicons
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "right",
              }}
              name="calendar"
              size={24}
              color="black"
              onPress={() => showFromMode("date")}
            />
          </View>
          <TextInput style={styles.inputStyle} value={fromText} onSubmitEditing={Keyboard.dismiss} />

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
              <View style={{ flex: 1 }} >
              <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "black",
              }}
            >
              HOMEWORK DUE DATE:
            </Text>

            <Ionicons
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "right",
              }}
              name="calendar"
              size={24}
              color="black"
              onPress={() => showToMode("date")}
            />
          </View>
          <TextInput style={styles.inputStyle} value={toText} />
          {toShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={toDate}
              mode={tomode}
              is24Hour={true}
              display="default"
              onChange={toDateChangeHandler}
            />
          )}
      
              </View>
            </View>

          {/* </View> */}



          <Text style={styles.labels}>REMARK</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={remarkChangeHandler}
            value={remark}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.labels}>HOMEWORK</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={hwChangeHandler}
            value={hw}
            onSubmitEditing={Keyboard.dismiss}
          />
          {/* <View>
            <Text style={styles.labels}>UPLOAD IMAGE</Text>
            <View style={styles.imagePreView}>{imagePreView}</View>
            <Btn title="take image" onPress={takeImageHanlder} />
          </View> */}

          <Text style={styles.labels}>UPLOAD IMAGE</Text>
          <View style={styles.imagePreView}>{imagePreView}</View>
          <View style={{ marginTop: 13 }}>
            <Btn title="Upload Image" onPress={PickImage} />
            {/* {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )} */}
          </View>
          <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Homework</Button>
          </View>
        </View>
      </ScrollView>
      {keyboardStatus=='Keyboard Hidden' && <View>
        <TeachersHome />
      </View>}
    </>
  );
};

export default TeachersHomework;

const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
  },
  home: {
    marginTop: 29,
  },
  root: {
    backgroundColor: "#EBECFO",
  },
  inputForm: {
    padding: 20,
    paddingTop: 5,
  },
  inputStyle: {
    color: "black",
    borderWidth: 2,
    borderColor: "lightgrey",
    backgroundColor: "white",
    padding: 10,
    // paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
    //margin: 5,
  },
  labels: {
    margin: 5,
    fontFamily: "Ubuntu",
    fontSize: 18,
    // marginTop: 17,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  btnSubmit: {
    marginTop: 27,
    marginBottom: 59,
  },
  imagePreView: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});

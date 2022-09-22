import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/UI/Button";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import SelectList from "react-native-dropdown-select-list";
import { Alert, Button as Btn, Image } from "react-native";
import moment from 'moment';
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
import Input from "../../components/UI/Input";
import VerticalLine from "../../components/UI/VerticalLine";
import { DataTable } from "react-native-paper";

const TeachersHomework = () => {

  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [forHomeworkList, setForHomeworkList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forHomeworkForm, setForHomeworkForm] = useState({ color: "black" });

  const [selected, setSelected] = useState("");
  const [enteredSelectedTouched,setEnteredSelectedTouched]=useState(false)
  const enteredSelcetdIsValid=selected.trim()!=='';
  const selectInputIsInValid=!enteredSelcetdIsValid && enteredSelectedTouched;

  const [data, setData] = useState([]);
  const [selectedsection, setSelectedsection] = useState("");
  const [sectiondata, setSectionData] = useState([]);

  // const [formIsValid,setFormIsValid]=useState(false);

  const [subject, setEnteredSubject] = useState("");
  const [enteredSubjectTouched,setEnteredSubjectTouched]=useState(false)
  const enteredSubjectIsValid=subject.trim()!=='';
  const subjectInputIsInValid=!enteredSubjectIsValid && enteredSubjectTouched;

  const [classname, setEnteredClassName] = useState("");
  const [section, setEnteredSection] = useState("");
  const [test,setTest]=useState(false)

  const [remark, setEnteredRemark] = useState("");
  const [enteredRemarkTouched,setEnteredRemarkTouched]=useState(false)
  const enteredRemarkIsValid=remark.trim()!=='';
  const remarkInputIsInValid=!enteredRemarkIsValid && enteredRemarkTouched;

  const [hw, setHW] = useState("");
  const [enteredHomeWorkTouched,setEnteredHomeWorkTouched]=useState(false)
  const enteredHomeWorkIsValid=hw.trim()!=='';
  const homeworkInputIsInValid=!enteredHomeWorkIsValid && enteredHomeWorkTouched;

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [frommode, setFromMode] = useState("date");
  const [tomode, setToMode] = useState("date");

  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched,setEnteredFromDateTouched]=useState(false)
  const enteredFromDateIsValid=fromText.trim()!=='';
  const fromDateInputIsInValid=!enteredFromDateIsValid && enteredFromDateTouched;
 
  const [toText, setToText] = useState("");
  const [enteredtoDateTouched,setEnteredtoDateTouched]=useState(false)
  const enteredtoDateIsValid=toText.trim()!=='';
  const toDateInputIsInValid=!enteredtoDateIsValid && enteredtoDateTouched;

  const [image, setImage] = useState("");
  const [enteredImageTouched,setEnteredImageTouched]=useState(false)
  const enteredImageIsValid=image.trim()!=='';
  const imageInputIsInValid=!enteredImageIsValid && enteredImageTouched;

  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =useCameraPermissions();
  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [cont, setCont] = useState('');
  const [show, setShow] = useState(false);
  const [isEdit,setIsEdit]=useState(false);
  const [isDelete,setIsDelete]=useState(false);
  const [tranportData, setTranportData] = useState([]);
  // useEffect(()=>{
  //   if(enteredSubjectIsValid && enteredFromDateIsValid && enteredtoDateIsValid && enteredRemarkIsValid && enteredHomeWorkIsValid){
  //     setFormIsValid(true);
  //   }else{
  //     setFormIsValid(false);
  //   }
  // },[enteredSubjectIsValid,
  //   enteredFromDateIsValid,
  //   enteredtoDateIsValid,
  //   enteredRemarkIsValid,
  //   enteredHomeWorkIsValid])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/Homework/`
        );
        setTranportData(res.data);
        console.log(data)
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

  useEffect(async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied!");
      }
    }
  }, []);

  function frmDateHandler(enteredValue){
    setFromText(enteredValue);
  }
  function toDateHandler(enteredValue){
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

    if(event.type == "set") {
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
      if(event.type == "set") {
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

  function updateHandler(){
    var dateFromValidate = fromText;
    var isValid = moment(dateFromValidate, 'D/M/YYYY',true).isValid()
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format ",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }

    var dateToValidate = toText;
    var isValid = moment(dateToValidate, 'D/M/YYYY',true).isValid()
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }

    setEnteredSelectedTouched(true)
    setEnteredSubjectTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredRemarkTouched(true);
    setEnteredHomeWorkTouched(true);
    setEnteredImageTouched(true);

    if(!enteredSelcetdIsValid){
      return;
    }
    if (!enteredSubjectIsValid) {
      return;
    }

    if(!enteredFromDateIsValid){
      return;
    }

    if(!enteredtoDateIsValid){
      return;
    }

    if(!enteredRemarkIsValid){
      return;
    }

    if(!enteredHomeWorkIsValid){
      return;
    }

    if(!enteredImageIsValid){
      return;
    }

    else{
      let selectedData = selected.split(" - ");
      let class_name = selectedData[0];
      let section = selectedData[1];
      let uploaduri = image;
      // let filename = uploaduri.substring(uploaduri.lastIndexOf("/") + 1);
      const formdata = {
        // from_time:fromText,
        // to_time:toText,
        class_name: class_name,
        section: section,
        subject: subject,
        homework_date: fromDate,
        due_date: toDate,
        // homework_photo: `/assets/images/${filename}`,
        remark: remark,
        description: hw,
      };
      console.log(formdata);
  
      async function storeData() {
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
  
          const resLogin = await axios.put(
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
      setForHomeworkList({ fontWeight: "bold", color: "black" });
      setForHomeworkForm({ color: "black" });
      setForHomeworkForm({ fontWeight: "bold", color: "black" });
      setForHomeworkList({ color: "black" });
    }
    }
  
  function buttonPressedHandler() {
    console.log(selected);
    console.log(fromText , toText)

    var dateFromValidate = fromText;
    var isValid = moment(dateFromValidate, 'D/M/YYYY',true).isValid()
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format ",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }

    var dateToValidate = toText;
    var isValid = moment(dateToValidate, 'D/M/YYYY',true).isValid()
    if (!isValid) {
      Alert.alert(
        "Format Error",
        "It seems to be you entered wrong date format please follow D/M/YYYY format",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }

    setEnteredSelectedTouched(true)
    setEnteredSubjectTouched(true);
    setEnteredFromDateTouched(true);
    setEnteredtoDateTouched(true);
    setEnteredRemarkTouched(true);
    setEnteredHomeWorkTouched(true);
    setEnteredImageTouched(true);

    if(!enteredSelcetdIsValid){
      return;
    }
    if (!enteredSubjectIsValid) {
      return;
    }

    if(!enteredFromDateIsValid){
      return;
    }

    if(!enteredtoDateIsValid){
      return;
    }

    if(!enteredRemarkIsValid){
      return;
    }

    if(!enteredHomeWorkIsValid){
      return;
    }

    if(!enteredImageIsValid){
      return;
    }

    else{
      let selectedData = selected.split(" - ");
      let class_name = selectedData[0];
      let section = selectedData[1];
      let uploaduri = image;
      // let filename = uploaduri.substring(uploaduri.lastIndexOf("/") + 1);
      const formdata = {
        // from_time:fromText,
        // to_time:toText,
        class_name: class_name,
        section: section,
        subject: subject,
        homework_date: fromDate,
        due_date: toDate,
        // homework_photo: `/assets/images/${filename}`,
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
      setForHomeworkList({ fontWeight: "bold", color: "black" });
      setForHomeworkForm({ color: "black" });
      setForHomeworkForm({ fontWeight: "bold", color: "black" });
      setForHomeworkList({ color: "black" });
    }
    }

    function subjectInputBlur(){
      setEnteredSubjectTouched(true);
    }
    function dateFromHandler(){
      setEnteredFromDateTouched(true);
    }
    function dateToHandler(){
      setEnteredtoDateTouched(true);
    }
    function remarkBlurHandler(){
      setEnteredRemarkTouched(true);
    }
    function homeworkBlurHandler(){
      setEnteredHomeWorkTouched(true);
    }

    function showHomeworkForm() {
      setForHomeworkList({ fontWeight: "bold", color: "black" });
      setForHomeworkForm({ color: "black" });
      setShowForm(true);
      setShowList(false);
      
    }
    function showHomework() {
      setForHomeworkForm({ fontWeight: "bold", color: "black" });
      setForHomeworkList({ color: "black" });
      setShowForm(false);
      setShowList(true);
    }
    function editItem(id){
      const filteredDummuyData= tranportData.find((data)=> data.id==id);
      setSelected(filteredDummuyData.class_name);
      // setEnteredSection(filteredDummuyData.section);
      setEnteredSubject(filteredDummuyData.subject);
      setFromText(filteredDummuyData.homework_date);
      setToText(filteredDummuyData.due_date);
      setEnteredRemark(filteredDummuyData.remark);
      setHW(filteredDummuyData.homework);
      setImage(filteredDummuyData.homework_photo);
      setForHomeworkList({ fontWeight: "bold", color: "black" });
      setForHomeworkForm({ color: "black" });
       setShowForm(true);
       setShowList(false);
       setIsEdit(true);
     }

     function deleteItem(id){
      // console.log(id);
      // const newFilteredData=data.filter((data)=>data.id != id);
  
      async function storeData() {
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
      }
      storeData();
    }
  return (
    <>
      {/* <View style={styles.BtnContainer}>
        <BgButton>Add HomeWork</BgButton>
      </View> */}
      <View style={styles.BtnContainer}>
        <BgButton onPress={showHomeworkForm} style={forHomeworkList}>
          Add Homework
        </BgButton>
        <VerticalLine>|</VerticalLine>
        <BgButton onPress={showHomework} style={forHomeworkForm}>
          Show Homework
      </BgButton>
      </View>
      {showForm && (<ScrollView style={styles.root}>
        <View style={styles.inputForm}>
          <View style={{ width: 350, fontSize: 18, marginTop: 3 }}>
            <SelectList
              setSelected={setSelected}
              data={data}
              placeholder="Select class"
              boxStyles={selectInputIsInValid && styles.errorSelectedColor}
            />
          </View>

          <Input 
            onChangeText={subjectChangeHandler}
            value={subject}
            placeholder="Subject"
            onSubmitEditing={Keyboard.dismiss}
            blur={subjectInputBlur}
            style={subjectInputIsInValid && styles.errorBorderColor}
          />
          {subjectInputIsInValid && (
              <Text style={{ color: "red",left:20 }}>Enter subject</Text>
          )}

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <View>
                <Ionicons
                  style={{
                    position:'absolute',
                    top:23,
                  }}
                  name="calendar"
                  size={24}
                  color="black"
                  onPress={() => showFromMode("date")}
                />
              </View>
              <Input 
                value={fromText || fromDate}
                placeholder="DD/MM/YYYY"
                onSubmitEditing={Keyboard.dismiss}
                style={fromDateInputIsInValid && styles.errorBorderColor}
                blur={dateFromHandler}
                onChangeText={frmDateHandler}
              />
              {fromDateInputIsInValid && (
                <Text style={{ color: "red",left:20 }}>Enter from date</Text>
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
                    position:'absolute',
                    top:23,
                  }}
                  name="calendar"
                  size={24}
                  color="black"
                  onPress={() => showToMode("date")}
                />
                
              </View>
              <Input 
                value={toText || toDate} 
                placeholder="DD/MM/YYYY"
                style={toDateInputIsInValid && styles.errorBorderColor}
                blur={dateToHandler}
                onChangeText={toDateHandler}
              />
              {toDateInputIsInValid && (
                <Text style={{ color: "red",left:20 }}>Enter to date</Text>
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
          <Input 
            onChangeText={remarkChangeHandler}
            blur={remarkBlurHandler}
            value={remark}
            placeholder="Remark"
            onSubmitEditing={Keyboard.dismiss}
            style={remarkInputIsInValid && styles.errorBorderColor}
          />
          {remarkInputIsInValid && (
            <Text style={{ color: "red",left:20 }}>Enter remark</Text>
          )}
          <Input 
            onChangeText={hwChangeHandler}
            value={hw}
            placeholder="Homework"
            onSubmitEditing={Keyboard.dismiss}
            blur={homeworkBlurHandler}
            style={homeworkInputIsInValid && styles.errorBorderColor}
          />
          {homeworkInputIsInValid && (
              <Text style={{ color: "red",left:15 }}>Enter homework</Text>
            )}
          {/* <View>
            <Text style={styles.labels}>UPLOAD IMAGE</Text>
            <View style={styles.imagePreView}>{imagePreView}</View>
            <Btn title="take image" onPress={takeImageHanlder} />
          </View> */}

          <Text style={styles.labels}>Upload Image</Text>
          <View style={imageInputIsInValid ? styles.imageError : styles.imagePreView}>{imagePreView}</View>
          {imageInputIsInValid && (
              <Text style={{ color: "red",left:15 }}>Please upload or take homework image</Text>
            )}
          <View style={{ marginTop: 13 }}>
            <Btn title="Upload Image" onPress={PickImage} />
            {/* {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )} */}
          </View>
          {!isEdit && <View style={styles.btnSubmit}>
            <Button onPress={buttonPressedHandler}>Add Event</Button>
          </View>}
          {isEdit && <View style={styles.btnSubmit}>
            <Button onPress={ updateHandler}>Update</Button>
          </View>}
        </View>
      </ScrollView>)}
      {showList && 
        <ScrollView horizontal={true}>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> ID</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Class Name</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Section</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Subject</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Homework date</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Remark</Text>
            </View>

            <View style={styles.th}>
              <Text style={styles.tableTitle}> Homeworkphoto</Text>
            </View>

            <View style={styles.th}>
              <Text style={styles.tableTitle}> Homework</Text>
            </View>

            <View style={styles.th}>
              <Text style={styles.tableTitle}> Due date</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Description</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Update</Text>
            </View>
            <View style={styles.th}>
              <Text style={styles.tableTitle}> Delete</Text>
            </View>
          </DataTable.Header>

          {tranportData &&
            tranportData.map((tranportData, key) => (
              <DataTable.Row style={styles.tableRow}>
                <DataTable.Cell style={styles.tableCell}>
                  {tranportData.id}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {tranportData.class_name}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {tranportData.section}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {tranportData.subject}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {tranportData.homework_date}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {tranportData.remark}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {tranportData.homework_photo}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {tranportData.homework}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {tranportData.due_date}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  {tranportData.description}
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  <Btn title="Edit" onPress={()=> editItem(tranportData.id)} />
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>
                  <Btn title="Delete" onPress={()=> deleteItem(tranportData.id)} />
              </DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
      </ScrollView>
      }
      {showForm && keyboardStatus == "Keyboard Hidden" && (
        <View>
          <TeachersHome />
        </View>
      )}
    </>
  );
}

export default TeachersHomework;

const styles = StyleSheet.create({
  
  BtnContainer: {
    flexDirection: "row",
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
  errorBorderColor:{
    color: "black",
    borderBottomWidth: 1,
    borderColor: "red",
    padding: 10,
    margin: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
  },
  errorSelectedColor:{
    borderColor:'red'
  },
  labels: {
    margin: 5,
    fontFamily: "Ubuntu",
    fontSize: 18,
    flex:1,

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
    backgroundColor:'lightblue'
  },
  imageError:{
    borderWidth:1,
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor:'red',
    backgroundColor:'lightblue'
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
    width: 40,
    //  fontFamily: "Montserrat_600SemiBold",
    marginLeft: 35,
  },

  tableRow: {
    height: "9%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});

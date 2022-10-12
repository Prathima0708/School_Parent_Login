import { View, StyleSheet, TextInput, Text, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import BgButton from "../../../components/UI/BgButton";
import VerticalLine from "../../../components/UI/VerticalLine";
import ParentsHome from "../BottomTab/ParentsHome";
import { Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScrollView } from "react-native";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";
import Toast from "react-native-simple-toast";
function Noticeboard() {
  // const [forNoticeList, setForNoticeList] = useState({
  //   color: "black",
  //   fontWeight: "bold",
  // });
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [forNoticeList, setForNoticeList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forNoticeForm, setForNoticeForm] = useState({ color: "black" });
  const [creatorofnotice, setCreatorOfNotice] = useState("");
  const [enteredCreatorOfNoticeTouched, setEnteredCreatorOfNoticeTouched] =
    useState(false);
  const enteredCreatorOfNoticeIsValid = creatorofnotice.trim() !== "";
  const creatorofnoticeInputIsInValid =
    !enteredCreatorOfNoticeIsValid && enteredCreatorOfNoticeTouched;

  const [title, setTitle] = useState("");
  const [enteredTitleTouched, setEnteredTitleTouched] = useState(false);
  const enteredTitleIsValid = title.trim() !== "";
  const titleInputIsInValid = !enteredTitleIsValid && enteredTitleTouched;

  const [description, setDescription] = useState("");
  const [enteredDescriptionTouched, setEnteredDescriptionTouched] =
    useState(false);
  const enteredDescriptionIsValid = description.trim() !== "";
  const descriptionInputIsInValid =
    !enteredDescriptionIsValid && enteredDescriptionTouched;

  // const [forAddNotice, setForAddNotice] = useState({ color: "black" });
  // const [showForm, setShowForm] = useState(false);
  // const [showTable, setShowTable] = useState(true);
  const [fromShow, setFromShow] = useState(false);
  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());

  const [fromText, setFromText] = useState("");
  const [enteredFromDateTouched, setEnteredFromDateTouched] = useState(false);
  const enteredFromDateIsValid = fromText.trim() !== "";
  const fromDateInputIsInValid =
    !enteredFromDateIsValid && enteredFromDateTouched;

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

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

  function crtofnoticeChangeHandler(enteredValue) {
    setCreatorOfNotice(enteredValue);
  }
  function titleChangeHandler(enteredValue) {
    setTitle(enteredValue);
  }
  function descriptionChangeHandler(enteredValue) {
    setDescription(enteredValue);
  }
  function frmDateHandler(enteredValue) {
    setFromText(enteredValue);
  }
  const showFromMode = (currentFromMode) => {
    setFromShow(true);

    setFromMode(currentFromMode);
  };

  function NoticeList() {
    setForNoticeList({ fontWeight: "bold", color: "black" });
    setForAddNotice({ color: "black" });
    setShowForm(false);
    setShowTable(true);
  }
  function addNotice() {
    setForAddNotice({ fontWeight: "bold", color: "black" });
    setForNoticeList({ color: "black" });
    setShowForm(true);
    setShowTable(false);
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

  function buttonPressedHandler() {
    setEnteredCreatorOfNoticeTouched(true);
    setEnteredTitleTouched(true);
    setEnteredDescriptionTouched(true);
    setEnteredFromDateTouched(true);

    if (!enteredCreatorOfNoticeIsValid) {
      return;
    }
    if (!enteredTitleIsValid) {
      return;
    }
    if (!enteredDescriptionIsValid) {
      return;
    }
    if (!enteredFromDateIsValid) {
      return;
    } else {
      Toast.show("Successfully Notice Added", Toast.LONG, [
        "UIAlertController",
      ]);
      setEnteredCreatorOfNoticeTouched(false);
      setEnteredTitleTouched(false);
      setEnteredDescriptionTouched(false);
      setEnteredFromDateTouched(false);
      setShowForm(false);
      setShowList(true);
      setForNoticeList({ fontWeight: "bold", color: "black" });
      setForNoticeForm({ color: "black" });
      setForNoticeForm({ fontWeight: "bold", color: "black" });
      setForNoticeList({ color: "black" });
    }
  }
  function crtofnoticeInputBlur() {
    setEnteredCreatorOfNoticeTouched(true);
  }

  function titleInputBlur() {
    setEnteredTitleTouched(true);
  }

  function descriptionInputBlur() {
    setEnteredDescriptionTouched(true);
  }

  function datecreationInputBlur() {
    setEnteredFromDateTouched(true);
  }
  function showNoticeForm() {
    setForNoticeList({ fontWeight: "bold", color: "black" });
    setForNoticeForm({ color: "black" });
    setShowForm(true);
    setShowList(false);
  }
  function showNotice() {
    setForNoticeForm({ fontWeight: "bold", color: "black" });
    setForNoticeList({ color: "black" });
    setShowForm(false);
    setShowList(true);
  }
  return (
    <>
      <View style={styles.BtnContainer}>
        {/* <BgButton onPress={showNoticeForm} style={forNoticeList}>
        Add Notice
      </BgButton>
      <VerticalLine>|</VerticalLine>
      <BgButton onPress={showNotice} style={forNoticeForm}>
        Show Notice
    </BgButton> */}
      </View>
      {showForm && (
        <ScrollView>
          <View style={styles.root}>
            <Input
              onSubmitEditing={Keyboard.dismiss}
              placeholder="Creator of notice"
              onChangeText={crtofnoticeChangeHandler}
              blur={crtofnoticeInputBlur}
              style={creatorofnoticeInputIsInValid && styles.errorBorderColor}
            />
            {creatorofnoticeInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>
                Enter the creator name
              </Text>
            )}

            <Input
              onSubmitEditing={Keyboard.dismiss}
              placeholder="Title"
              onChangeText={titleChangeHandler}
              blur={titleInputBlur}
              style={titleInputIsInValid && styles.errorBorderColor}
            />
            {titleInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>Enter the title</Text>
            )}

            <Input
              onSubmitEditing={Keyboard.dismiss}
              placeholder="Description"
              onChangeText={descriptionChangeHandler}
              blur={descriptionInputBlur}
              style={descriptionInputIsInValid && styles.errorBorderColor}
            />
            {descriptionInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>
                Enter the description
              </Text>
            )}
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
            <Input
              value={fromText || fromDate}
              onSubmitEditing={Keyboard.dismiss}
              placeholder="Date of Creation"
              style={fromDateInputIsInValid && styles.errorBorderColor}
              blur={datecreationInputBlur}
              onChangeText={frmDateHandler}
            />
            {fromDateInputIsInValid && (
              <Text style={{ color: "red", left: 20 }}>
                Enter creation date
              </Text>
            )}
            <View style={styles.btnSubmit}>
              <Button onPress={buttonPressedHandler}>Add Notice</Button>
            </View>
          </View>
        </ScrollView>
      )}
      {showList && (
        <View>
          <Text>NoticeList</Text>
        </View>
      )}
      {showForm && keyboardStatus == "Keyboard Hidden" && (
        <View style={styles.home}>
          <ParentsHome />
        </View>
      )}
    </>
  );
}

export default Noticeboard;

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  BtnContainer: {
    fontSize: 24,
    flexDirection: "row",
  },
  root: {
    // backgroundColor: "skyblue",
    paddingLeft: 20,
    paddingRight: 20,
    // margin: 20,
    borderRadius: 15,
  },

  // labels: {
  //   fontSize: 18,
  //   color: "black",
  //   //  color: "#7d7d7d",
  //   marginTop: 10,
  //   marginBottom: 5,
  //   lineHeight: 25,

  //   marginBottom: 4,
  //   //fontFamily: "regular",
  // },

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
    top: deviceHieght < 600 ? "1%" : "2%",
    marginBottom: 30,
  },
});

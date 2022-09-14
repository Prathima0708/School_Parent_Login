import { View, StyleSheet, TextInput, Text } from "react-native";
import { useEffect, useState } from "react";
import BgButton from "../../../components/UI/BgButton";
import VerticalLine from "../../../components/UI/VerticalLine";
import ParentsHome from "../ParentsHome";
import { Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScrollView } from "react-native";
function Noticeboard() {
  const [forNoticeList, setForNoticeList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forAddNotice, setForAddNotice] = useState({ color: "black" });
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [fromShow, setFromShow] = useState(false);
  const [frommode, setFromMode] = useState("date");
  const [fromDate, setFromDate] = useState(new Date());
  const [fromText, setFromText] = useState("");

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
    setFromText(fDate);
    //console.log(fDate);
  };
  return (
    <>
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.labels}>Creator of notice</Text>
          <TextInput style={styles.inputStyle} onSubmitEditing={Keyboard.dismiss}/>
          <Text style={styles.labels}>Title</Text>
          <TextInput style={styles.inputStyle} onSubmitEditing={Keyboard.dismiss}/>
          <Text style={styles.labels}>Description</Text>
          <TextInput style={styles.inputStyle} onSubmitEditing={Keyboard.dismiss}/>
          <View
            style={{
              paddingVertical: 15,
            //  paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "black",
              }}
            >
              Date of creation:
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
          <TextInput style={styles.inputStyle} value={fromText} />
        </View>
      </ScrollView>
      {keyboardStatus=='Keyboard Hidden' && <View style={styles.home}>
        <ParentsHome />
      </View>}
    </>
  );
}

export default Noticeboard;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "skyblue",
    padding: 20,
    margin: 20,
    borderRadius: 15,
  },

  labels: {
    fontSize: 18,
    color: "black",
    //  color: "#7d7d7d",
    marginTop: 10,
    marginBottom: 5,
    lineHeight: 25,

    marginBottom: 4,
    //fontFamily: "regular",
  },
  inputStyle: {
    color: "black",
    // color: "white",
    borderWidth: 2,

    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    fontSize: 18,
  },
});

import { View, StyleSheet, TextInput, Text } from "react-native";
import { useState } from "react";
import BgButton from "../../../components/UI/BgButton";
import VerticalLine from "../../../components/UI/VerticalLine";
function Noticeboard() {
  const [forNoticeList, setForNoticeList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forAddNotice, setForAddNotice] = useState({ color: "black" });
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);

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

  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton onPress={NoticeList} style={forNoticeList}>
          List
        </BgButton>
        <VerticalLine>|</VerticalLine>
        <BgButton onPress={addNotice} style={forAddNotice}>
          Add Notice
        </BgButton>
      </View>
      {showForm && (
        <View>
          <Text style={styles.labels}>Creator of notice</Text>
          <Text style={styles.inputStyle}></Text>
          <Text style={styles.labels}>Title</Text>
          <Text style={styles.inputStyle}></Text>
          <Text style={styles.labels}>Description</Text>
          <Text style={styles.inputStyle}></Text>
          <Text style={styles.labels}>Date of creation</Text>
          <Text style={styles.inputStyle}></Text>
        </View>
      )}
      {showTable && (
        <View>
          <Text style={styles.labels}>Creator of notice</Text>
          <TextInput style={styles.inputStyle} />
          <Text style={styles.labels}>Title</Text>
          <TextInput style={styles.inputStyle} />
          <Text style={styles.labels}>Description</Text>
          <TextInput style={styles.inputStyle} />
          <Text style={styles.labels}>Date of creation</Text>
          <TextInput style={styles.inputStyle} />
        </View>
      )}
    </>
  );
}

export default Noticeboard;

const styles = StyleSheet.create({
  labels: {
    fontSize: 18,
    color: "#7d7d7d",
    marginTop: 10,
    marginBottom: 5,
    lineHeight: 25,
    color: "white",
    marginBottom: 4,
    //fontFamily: "regular",
  },
  inputStyle: {
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    fontSize: 18,
  },
});

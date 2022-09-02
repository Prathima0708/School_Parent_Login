import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import VerticalLine from "../../../components/UI/VerticalLine";
import { DataTable } from "react-native-paper";
import Button from "../../../components/UI/Button";
import axios from "axios";
import BgButton from "../../../components/UI/BgButton";
import { UserId } from "../../Login";
const LeaveScreen = () => {
  const [regno, setEnteredRegno] = useState("");
  const [leaveType, setEnteredLeaveType] = useState("");
  const [leaveFrom, setEnteredLeaveFrom] = useState("");
  const [leaveTo, setEnteredLeaveTo] = useState("");
  const [leaveReason, setEnteredLeaveReason] = useState();

  const [forTransportList, setForTransportList] = useState({
    color: "black",
    fontWeight: "bold",
  });
  const [forAddTransport, setForAddTransport] = useState({ color: "black" });
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://10.0.2.2:8000/school/Leave/");
        console.log(res.data);

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function regnoChangeHandler(enteredValue) {
    setEnteredRegno(enteredValue);
  }
  function leaveTypeChangeHandler(enteredValue) {
    setEnteredLeaveType(enteredValue);
  }
  function leaveFromChangeHandler(enteredValue) {
    setEnteredLeaveFrom(enteredValue);
  }
  function leaveToChangeHandler(enteredValue) {
    setEnteredLeaveTo(enteredValue);
  }
  function leaveReasonChangeHandler(enteredValue) {
    setEnteredLeaveReason(enteredValue);
  }

  function transportList() {
    setForTransportList({ fontWeight: "bold", color: "black" });
    setForAddTransport({ color: "black" });
    setShowForm(false);
    setShowTable(true);
  }
  function addTransport() {
    setForAddTransport({ fontWeight: "bold", color: "black" });
    setForTransportList({ color: "black" });
    setShowForm(true);
    setShowTable(false);
  }

  function buttonPressedHandler() {
    setShowTable(true);
    setShowForm(false);
    setForTransportList({ fontWeight: "bold", color: "black" });
    setForAddTransport({ color: "black" });
    console.log(UserId);
    const FormData = {
      regno,
      leaveType,
      leaveFrom,
      leaveTo,
      leaveReason,
    };
    console.log(FormData);
    async function storeData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const dataForm = FormData;
        const resLogin = await axios.post(
          `http://10.0.2.2:8000/school/Leave/`,
          dataForm,
          {
            headers: headers,
          }
        );
        const token = resLogin.data.token;
        const userId = resLogin.data.user_id;
        console.log(token);
        // Token = token;
        // UserId = userId;
      } catch (error) {
        console.log(error);
      }
    }
    storeData();
  }
  return (
    <>
      <View style={styles.BtnContainer}>
        <BgButton onPress={transportList} style={forTransportList}>
          Leave List
        </BgButton>
        <VerticalLine>|</VerticalLine>
        <BgButton onPress={addTransport} style={forAddTransport}>
          Apply Leave
        </BgButton>
      </View>
      {showTable && (
        <ScrollView horizontal={true}>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={styles.tableTitle}>ID</DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>
                STUDENT REG NO
              </DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>
                LEAVE TYPE
              </DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>
                LEAVE FROM
              </DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>
                LEAVE TO
              </DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>
                LEAVE REASON
              </DataTable.Title>
              <DataTable.Title style={styles.tableTitle}>
                LEAVE STATUS
              </DataTable.Title>
            </DataTable.Header>
            {data &&
              data.map((data, key) => (
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.id}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.user_num}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.leave_type}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.leave_form}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.leave_to}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.leave_reason}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>
                    {data.leave_status}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      )}
      {showForm && (
        <ScrollView>
          <View style={styles.inputForm}>
            <Text style={styles.labels}>STUDENT REG NO</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.inputStyle}
              onChangeText={regnoChangeHandler}
              value={regno}
            />
            <Text style={styles.labels}>LEAVE TYPE</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={leaveTypeChangeHandler}
              value={leaveType}
            />
            <Text style={styles.labels}>LEAVE FROM</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={leaveFromChangeHandler}
              value={leaveFrom}
            />
            <Text style={styles.labels}>LEAVE TO</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={leaveToChangeHandler}
              value={leaveTo}
            />
            <Text style={styles.labels}>LEAVE REASON</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={leaveReasonChangeHandler}
              value={leaveReason}
            />

            <View style={styles.btnSubmit}>
              <Button onPress={buttonPressedHandler}>Apply Leave</Button>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default LeaveScreen;

const styles = StyleSheet.create({
  BtnContainer: {
    flexDirection: "row",
  },
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "skyblue",
    height: 60,
  },
  tableTitle: {
    padding: 5,
    margin: 5,
  },
  tableCell: {
    padding: 2,
    margin: 9,
  },
  tableRow: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  inputForm: {
    padding: 20,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  labels: {
    marginTop: 2,
  },
  btnSubmit: {
    marginTop: 5,
  },
});

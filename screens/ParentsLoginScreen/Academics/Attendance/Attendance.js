import axios from "axios";
import moment from "moment";
import {
  Modal,
  Text as NativeText,
  Button as NativeButton,
} from "native-base";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { studentId } from "../../../../components/StudentItem/StudentItem";
import { subURL } from "../../../../components/utils/URL's";
import ParentsHome from "../../BottomTab/ParentsHome";

function Attendance() {
  const [data, setData] = useState([]);
  const [customDatesStyles, setCustomDatesStyles] = useState([]);
  const [attendance_status, setAttendance_Status] = useState([]);

  const [placement, setPlacement] = useState(undefined);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState({ present: 0, absent: 0, holiday: 0 });

  let today = moment();
  let formatedTodayDate = moment(today).format("YYYY-MM");

  useEffect(() => {
    const request_model = {
      student_id: studentId,
      yearMonth: formatedTodayDate,
    };
    async function fetchData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const res = await axios.post(
          `${subURL}/AttendanceDetailByStudentIDMonthYear/`,
          request_model,
          {
            headers: headers,
          }
        );

        setData(res.data);

        setCustomDatesStyles(
          res.data.map((d) => ({
            date: d.attendance_date,
            style: {
              backgroundColor:
                d.attendance_status === "present"
                  ? "green"
                  : d.attendance_status === "absent"
                  ? "red"
                  : "#D4AC0D",
            },
            textStyle: {
              color: d.attendance_status === "present" ? "white" : "white",
            },
            containerStyle: [],
          }))
        );
        setAttendance_Status(
          res.data.map((d) => ({ att_status: d.attendance_status }))
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (attendance_status.length > 0) {
      setCount(
        attendance_status.reduce(
          (acc, curr) => {
            acc[curr.att_status] = (acc[curr.att_status] || 0) + 1;

            return acc;
          },
          { present: 0, absent: 0, holiday: 0 }
        )
      );
    } else {
      setCount({ present: 0, absent: 0, holiday: 0 });
    }
  }, [attendance_status]);

  function monthChangeHandler(month) {
    const request_model = {
      student_id: studentId,
      yearMonth: moment(month).format("YYYY-MM"),
    };

    async function fetchData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const res = await axios.post(
          `${subURL}/AttendanceDetailByStudentIDMonthYear/`,
          request_model,
          {
            headers: headers,
          }
        );

        setCustomDatesStyles(
          res.data.map((d) => ({
            date: d.attendance_date,
            style: {
              backgroundColor:
                d.attendance_status === "present"
                  ? "green"
                  : d.attendance_status === "absent"
                  ? "red"
                  : "#D4AC0D",
            },
            textStyle: {
              color: d.attendance_status === "present" ? "white" : "white",
            },
            containerStyle: [],
          }))
        );

        setAttendance_Status(
          res.data.map((d) => ({ att_status: d.attendance_status }))
        );
        if (attendance_status.length > 0) {
          setCount(
            attendance_status.reduce(
              (acc, curr) => {
                acc[curr.att_status] = (acc[curr.att_status] || 0) + 1;
                return acc;
              },
              { present: 0, absent: 0, holiday: 0 }
            )
          );
        } else {
          setCount({ present: 0, absent: 0, holiday: 0 });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  function handlePress(day) {
    let allHavePropertiesWithValues = data.some(
      (obj) =>
        obj.attendance_date === moment(day).format("YYYY-MM-DD") &&
        obj.attendance_status === "holiday"
    );

    let filteredList = data.find(
      (obj) =>
        obj.attendance_date === moment(day).format("YYYY-MM-DD") &&
        obj.attendance_status === "holiday"
    );
    if (filteredList === undefined) {
      return;
    } else {
      setDescription(filteredList.description);
    }

    if (allHavePropertiesWithValues) {
      setOpen(true);
      setPlacement(placement);
    } else {
      setOpen(false);
    }
  }

  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "column",
          backgroundColor: "white",
        },
      ]}
    >
      <View style={{ flex: 1.2 }}>
        <CalendarPicker
          onMonthChange={(month) => monthChangeHandler(month)}
          customDatesStyles={customDatesStyles}
          enableDateChange={true}
          onDateChange={(day) => handlePress(day)}
          textStyle={{ fontFamily: "HindRegular" }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <View
          style={[
            {
              flex: 1,
              flexDirection: "column",
              marginTop: "15%",
              marginLeft: "10%",
            },
          ]}
        >
          <View style={{ flex: 0.3 }}>
            <View
              style={styles.commonViewStyle}>
              <View style={{ flex: 0.1 }}>
                <View style={styles.presentDot} />
              </View>
              <View style={{ flex: 1 }}>
                {count && (
                  <Text style={styles.textStyle}>
                    Present: {count.present} Days
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={{ flex: 0.3 }}>
            <View
              style={styles.commonViewStyle}>
              <View style={{ flex: 0.1 }}>
                <View style={styles.absentDot} />
              </View>
              <View style={{ flex: 1 }}>
                {count && (
                  <Text style={styles.textStyle}>
                    Absent: {count.absent} Days
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={styles.commonViewStyle}>
              <View style={{ flex: 0.1 }}>
                <View style={styles.holidayDot} />
              </View>
              <View style={{ flex: 1 }}>
                {count && (
                  <Text style={styles.textStyle}>
                    Holiday: {count.holiday} Days
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 0.1 }}>
        <ParentsHome />
      </View>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        safeAreaTop={true}
        size="full"
      >
        <Modal.Content maxWidth="90%" minHeight="5%">
          <Modal.Header
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            Holiday Description
          </Modal.Header>
          <Modal.Body>
            <Text>{description}</Text>
          </Modal.Body>
          <Modal.Footer>
            <NativeButton.Group space={2}>
              <NativeButton
                onPress={() => {
                  setOpen(false);
                }}
              >
                Close
              </NativeButton>
            </NativeButton.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}

export default Attendance;

const styles = StyleSheet.create({
  presentDot: {
    width: 20,
    height: 20,
    backgroundColor: "green",
  },
  absentDot: {
    width: 20,
    height: 20,
    backgroundColor: "red",
  },
  holidayDot: {
    width: 20,
    height: 20,
    backgroundColor: "#D4AC0D",
  },
  textStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
  },
  commonViewStyle:{
    flex: 1,
    flexDirection: "row",
  }
});

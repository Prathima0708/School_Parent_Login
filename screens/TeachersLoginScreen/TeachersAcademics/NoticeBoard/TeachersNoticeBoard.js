import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { useEffect, useState } from "react";

import { Box, FlatList, ScrollView, Text as NativeText } from "native-base";
import axios from "axios";
import NoticeBoard from "./NoticeBoard";
import TeachersHome from "../../BottomTab/TeachersHome";
import { subURL } from "../../../../components/utils/URL's";
import AsyncStorage from "@react-native-async-storage/async-storage";
var arr = [];
var Group;

const TeachersNoticeBoard = () => {
  const [data, setData] = useState([]);
  const [group, setGroup] = useState("");
  useEffect(() => {
    async function getGroup() {
      Group = await AsyncStorage.getItem("datagroup");

      setGroup(Group);
    }
    getGroup();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const res = await axios.get(`${subURL}/CalendarListByIsnotified/True`, {
          headers: headers,
        });

        const filtredRes = res.data.filter((event) =>
          event.viewOnly.includes(Group)
        );

        const today = new Date();
        const currentWeekStart = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay()
        );
        const currentWeekEnd = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + (6 - today.getDay())
        );

        // const filteredData = filtredRes.filter((item) => {
        //   const itemDate = new Date(item.startdate);
        //   return itemDate >= currentWeekStart && itemDate <= currentWeekEnd;
        // });
        const filteredData = filtredRes.filter((item) => {
          const itemDate = new Date(item.startdate);
          return (
            (itemDate >= currentWeekStart && itemDate <= currentWeekEnd) ||
            itemDate.toDateString() === today.toDateString()
          );
        });

        console.log("filtered data",filteredData)

        arr = filteredData;

        function dateComparison(a, b) {
          const date1 = new Date(a.modifiedDate);
          const date2 = new Date(b.modifiedDate);

          return date2 - date1;
        }

        arr.sort(dateComparison);
        setData(arr);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function renderNotice(itemData) {
    return <NoticeBoard {...itemData.item} />;
  }
  return (
    <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
      <View style={styles.headingView}>
        <Text bold style={styles.textStyle}>
          Notifications
        </Text>
      </View>
      <View style={{ flex: 2, backgroundColor: "white" }}>
        <ScrollView>
          {data.length <= 0 ? (
            <View style={{ alignItems: "center", marginTop: "5%" }}>
              <Text style={styles.msgText}>No new notifications found</Text>
            </View>
          ) : (
            <Box>
              <FlatList data={data} padding={2} renderItem={renderNotice} />
            </Box>
          )}
        </ScrollView>
      </View>
      <View style={{ flex: 0.2, backgroundColor: "white" }}>
        <TeachersHome />
      </View>
    </View>
  );
};

export default TeachersNoticeBoard;

const styles = StyleSheet.create({
  headingView: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 20,
  },
  textStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 20,
    color: "black",
    marginTop: "2%",

    borderRadius: 10,
  },
  msgText: {
    fontSize: 18,
    fontFamily: "HindSemiBold",
    color: "#6B0000",
  },
});

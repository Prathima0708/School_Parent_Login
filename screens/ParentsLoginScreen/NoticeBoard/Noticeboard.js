import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  FlatList,
  Heading,
  ScrollView,
  Text as NativeText,
} from "native-base";
import axios from "axios";
import NoticeBoardList from "./NoticeBoardList";
import ParentsHome from "../BottomTab/ParentsHome";
import { subURL } from "../../../components/utils/URL's";
import AsyncStorage from "@react-native-async-storage/async-storage";
export var arr = [];
var Group;
const NoticeBoard = () => {
  const [data, setData] = useState([]);
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

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

        const filteredData = filtredRes.filter((item) => {
          const itemDate = new Date(item.startdate);
          return itemDate >= currentWeekStart && itemDate <= currentWeekEnd;
        });

        // const filteredData = filtredRes.filter(
        //   (item) =>
        //     new Date(item.startdate) >= today ||
        //     new Date(item.startdate).toDateString() === today.toDateString()
        // );

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
    return <NoticeBoardList {...itemData.item} />;
  }
  return (
    <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
      <View style={{ flex: 2, backgroundColor: "white" }}>
        <ScrollView>
          {data.length <= 0 ? (
            <View
              style={{
                alignItems: "center",

                marginTop: "15%",
              }}
            >
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
        <ParentsHome />
      </View>
    </View>
  );
};

export default NoticeBoard;

const styles = StyleSheet.create({
  msgText: {
    fontSize: 18,
    fontFamily: "HindSemiBold",
    color: "#6B0000",
  },
});

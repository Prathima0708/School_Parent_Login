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
import NoticeBoard from "./NoticeBoard";
import TeachersHome from "../../BottomTab/TeachersHome";
import { subURL } from "../../../../components/utils/URL's";
export var arr = [];
var sortedArr = [];
const TeachersNoticeBoard = () => {
  const [data, setData] = useState([]);
  // const [sortedArr, setSortedArr] = useState([]);
  // const [sortedData, setSortedData] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    async function fetchData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          // Authorization: "Token " + `${Token}`,
        };

        // const res = await axios.get("http://10.0.2.2:8000/school/users/", {
        const res = await axios.get(`${subURL}/Calendar/`, {
          headers: headers,
        });
        console.log(res.data);
        arr = res.data;
        // for (let i = 0; i < res.data.length; i++) {
        //   arr.push(res.data[i].startdate);

        //   console.log("before sorting");
        //   console.log(arr);
        // }

        console.log("before sorting");
        console.log(arr);
        function dateComparison(a, b) {
          const date1 = new Date(a.startdate);
          const date2 = new Date(b.startdate);

          return date2 - date1;
        }

        arr.sort(dateComparison);

        console.log("after sorting");
        // console.log(arr.slice(0, 3));
        const today = new Date();
        const filteredData = res.data.filter(
          (item) => new Date(item.startdate) >= today
        );
        setData(filteredData);
        // setData(res.data.slice(0, 10));
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
          Upcoming Events
        </Text>
      </View>
      <View style={{ flex: 2, backgroundColor: "white" }}>
        <ScrollView>
          {data.length <= 0 ? (
            <View style={{ alignItems: "center", marginTop: "5%" }}>
              <Text style={styles.msgText}>No upcoming events found</Text>
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
    flex: 0.4,
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 20,
  },
  textStyle: {
    fontFamily: "HindBold",
    fontSize: 18,
    color: "black",
    marginTop: "2%",
   backgroundColor: "#DEE4FF",
    padding: 10,
    borderRadius: 10,
  },
  msgText: {
    fontSize: 18,
    fontFamily: "HindSemiBold",
    color: "#6B0000",
  },
});

import { View, Text } from "react-native";
import React from "react";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, FlatList, Heading, ScrollView } from "native-base";
import axios from "axios";
import NoticeBoard from "./NoticeBoard";
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
        const res = await axios.get("http://10.0.2.2:8000/school/Calendar/", {
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
        console.log(arr.slice(0, 3));

        setData(res.data.slice(0, 10));
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
    <ScrollView>
      <Box>
        <Heading fontSize="xl" p="4" pb="3">
          Upcoming Events
        </Heading>
        <FlatList data={data} renderItem={renderNotice} />
      </Box>
    </ScrollView>
  );
};

export default TeachersNoticeBoard;

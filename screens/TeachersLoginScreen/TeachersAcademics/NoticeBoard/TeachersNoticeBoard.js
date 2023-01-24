import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, FlatList, ScrollView, Text as NativeText } from "native-base";
import axios from "axios";
import NoticeBoard from "./NoticeBoard";
import TeachersHome from "../../BottomTab/TeachersHome";
import { subURL } from "../../../../components/utils/URL's";
export var arr = [];

const TeachersNoticeBoard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const res = await axios.get(`${subURL}/Calendar/`, {
          headers: headers,
        });
        console.log(res.data);
        arr = res.data;

        function dateComparison(a, b) {
          const date1 = new Date(a.startdate);
          const date2 = new Date(b.startdate);

          return date2 - date1;
        }

        arr.sort(dateComparison);

        const today = new Date();
        const filteredData = res.data.filter(
          (item) => new Date(item.startdate) >= today
        );
        setData(filteredData);
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

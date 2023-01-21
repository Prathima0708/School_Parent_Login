import { StyleSheet, View } from "react-native";
export var selectedUserId, selectedUserName;
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Box,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import moment from "moment";

const NoticeBoardList = ({ startdate, titlee, description }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.listStyle]}>
      <View style={{ flex: 3 }}>
        <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
          <View
            style={[{ flex: 1, borderTopLeftRadius: 10 }, styles.colorPadding]}
          >
            <Text style={styles.titleStyle}>{titlee}</Text>
          </View>
          <View style={[{ flex: 1 }, styles.colorPadding]}>
            <Text style={[styles.titleStyle,{fontFamily:'HindRegular'}]}>{description}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.dateViewStyle]}>
        <Text style={[styles.titleStyle]}>
          {moment(startdate).format("DD/MM/YYYY")}
        </Text>
      </View>
    </View>
  );
};

export default NoticeBoardList;

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
  },
  titleStyle: {
    fontSize: 16,
    fontFamily: "HindSemiBold",
  },
  
  colorPadding: {
    backgroundColor: "#DEE4FF",
    padding: 15,
  },
  dateViewStyle: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 15,
    backgroundColor: "#DEE4FF",
    borderBottomRightRadius: 10,
  },
});

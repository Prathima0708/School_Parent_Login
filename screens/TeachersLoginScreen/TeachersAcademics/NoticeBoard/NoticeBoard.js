import { Button, StyleSheet, View } from "react-native";
export var selectedUserId, selectedUserName;
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import moment from "moment";
import * as Notifications from "expo-notifications";
import { subURL } from "../../../../components/utils/URL's";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const NoticeBoard = ({ startdate, titlee, description }) => {
  // function sendPushNotificationHanlder() {

  //   fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       to: "ExponentPushToken[q2ACFXBCfAH3ymkH9DRlxW]",
  //       title: titlee,
  //       body: "description",

  //     }),
  //   });
  // }

  async function sendPushNotificationHanlder() {
    // Fetch the list of device tokens from the backend
    const response = await fetch(`${subURL}/Notification/`);
    const tokens = await response.json();

    // Loop through the array of tokens and send a notification to each one
    tokens.forEach(async (token) => {
      console.log("token", token.notification_token);
      // Send the notification to the current token
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: token.notification_token,
          title: titlee,
          body: description,
        }),
      });
    });
  }

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
            <Text style={styles.descStyle}>{description}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.dateViewStyle]}>
        <Text style={[styles.descStyle, { fontWeight: "bold" }]}>
          {moment(startdate).format("DD/MM/YYYY")}
        </Text>
      </View>
      <View>
        <Button title="Notify" onPress={sendPushNotificationHanlder} />
      </View>
    </View>
  );
};

export default NoticeBoard;

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  titleStyle: {
    fontSize: 17,

    fontFamily: "HindSemiBold",
  },
  descStyle: {
    fontFamily: "HindRegular",
    fontSize: 16,
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

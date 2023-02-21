import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
      // console.log(Group);
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
        console.log(filtredRes);
        // arr = res.data;

        // function dateComparison(a, b) {
        //   const date1 = new Date(a.startdate);
        //   const date2 = new Date(b.startdate);

        //   return date2 - date1;
        // }

        // arr.sort(dateComparison);

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
        // const filteredData = filtredRes.filter(
        //   (item) =>
        //     new Date(item.startdate) >= today ||
        //     new Date(item.startdate).toDateString() === today.toDateString()
        // );
        const filteredData = filtredRes.filter((item) => {
          const itemDate = new Date(item.startdate);
          return itemDate >= currentWeekStart && itemDate <= currentWeekEnd;
        });

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

// import { StatusBar } from "expo-status-bar";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   Button,
//   Alert,
//   Platform,
// } from "react-native";
// import MapView from "react-native-maps";
// import * as Notifications from "expo-notifications";
// import { useEffect, useState } from "react";

// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     return {
//       shouldPlaySound: false,
//       shouldSetBadge: false,
//       shouldShowAlert: true,
//     };
//   },
// });

// export default function TeachersNoticeBoard() {
//   const [pushTkn, setPushTkn] = useState();
//   useEffect(() => {
//     async function configurePushNotifications() {
//       const { status } = await Notifications.getPermissionsAsync();
//       let finalStatus = status;

//       if (finalStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }

//       if (finalStatus !== "granted") {
//         Alert.alert(
//           "permission required",
//           "Push notifications need the appropriate permissions."
//         );
//         return;
//       }

//       const pushTokenData = await Notifications.getExpoPushTokenAsync().then(
//         (pushToken) => {
//           console.log(pushToken);
//           setPushTkn(pushToken);

//           if (Platform.OS === "android") {
//             Notifications.setNotificationChannelAsync("default", {
//               name: "default",
//               importance: Notifications.AndroidImportance.DEFAULT,
//             });
//           }
//         }
//       );
//     }

//     configurePushNotifications();
//   }, []);

//   useEffect(() => {
//     const subscription1 = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         console.log("Notification received");
//         // console.log("token",notification)
//       }
//     );

//     const subscription2 = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         console.log("Notification response received");
//         //console.log(response)
//       }
//     );
//     return () => {
//       subscription1.remove();
//       subscription2.remove();
//     };
//   }, []);

//   function scheduleNotificationsHanlder() {
//     Notifications.scheduleNotificationAsync({
//       content: {
//         title: "My first local notification",
//         body: "This is the body of the notification.",
//         data: {
//           userName: "Max",
//         },
//       },
//       trigger: {
//         seconds: 5,
//       },
//     });
//   }

//   function sendPushNotificationHanlder() {
//     fetch("https://exp.host/--/api/v2/push/send", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         to: "ExponentPushToken[q2ACFXBCfAH3ymkH9DRlxW]",
//         title: "Test--sent from a device",
//         body: "This is a test",
//       }),
//     });
//   }

//   return (
//     <View style={styles.container}>
//       <Button
//         title="Schedule Notification"
//         onPress={scheduleNotificationsHanlder}
//       />
//       <Button title="Send Notification" onPress={sendPushNotificationHanlder} />
//       <View style={styles.container}>
//         {/* <MapView style={styles.map} /> */}
//       </View>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     top: 100,
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

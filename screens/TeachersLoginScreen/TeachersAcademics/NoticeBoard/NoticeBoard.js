import { Button, StyleSheet, View } from "react-native";
export var selectedUserId, selectedUserName;
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import moment from "moment";
import * as Notifications from "expo-notifications";
import { subURL } from "../../../../components/utils/URL's";
import axios from "axios";

const NoticeBoard = ({ startdate, titlee, description, viewOnly }) => {
  const [checkGroup, setCheckGroup] = useState(false);
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
    console.log(viewOnly);
    // const response = await fetch(`${subURL}/Notification/`);

    // const tokens = await response.json();
    const response = await axios.get(`${subURL}/Notification/`);
    //  const tokens = response.data;

    //tokens.forEach((id) => console.log(id.user_id.groups[0].name));
    //  const filteredData = viewOnly === token.user_id.groups[0].name;
    const filteredData = response.data.filter(
      (item) => item.user_id.groups[0].name === viewOnly
    );
    const tokens = filteredData;
    console.log(tokens);
    //  console.log(filteredData[0].user_id.groups[0].name);

    // Loop through the array of tokens and send a notification to each one
    // tokens.forEach(async (token) => {
    //   //  console.log("token", token.notification_token);
    //   // Send the notification to the current token
    //   await fetch("https://exp.host/--/api/v2/push/send", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },

    //     body: JSON.stringify({
    //       to: token.notification_token,

    //       title: titlee,
    //       body: description,
    //     }),
    //   });
    // });

    tokens.forEach(async (token) => {
      // Send the notification to the current token

      //  console.log(filteredData);
      await axios.post(
        "https://exp.host/--/api/v2/push/send",
        {
          to: token.notification_token,
          title: titlee,
          body: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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


// <View
// style={[
//   {
//     // Try setting `flexDirection` to `"row"`.
//     flex:1,
//     flexDirection: 'column',
//   },
// ]}>
// <View style={{flex: 1, backgroundColor: 'red'}} >
//   <View
//     style={[
//       {
//         // Try setting `flexDirection` to `"row"`.
//         flex:1,
//         flexDirection: 'row',
//       },
//     ]}>
//     <View style={{flex: 1, backgroundColor: 'red'}} >
//       <Text style={styles.titleStyle}>{titlee}</Text>
//     </View>
//     <View style={{flex: 1, backgroundColor: 'darkorange'}} >
//       <Text style={[styles.descStyle, { fontWeight: "bold" }]}>
//         {moment(startdate).format("DD/MM/YYYY")}
//       </Text>
//     </View>
//   </View>
// </View>
// <View style={{flex: 1, backgroundColor: 'darkorange'}} >
//   <View
//       style={[
//         {
//           // Try setting `flexDirection` to `"row"`.
//           flex:1,
//           flexDirection: 'row',
//         },
//       ]}>
//       <View style={{flex: 1, backgroundColor: 'red'}} >
//         <Text style={styles.descStyle}>{description}</Text>
//       </View>
//       <View style={{flex: 1, backgroundColor: 'darkorange'}} >
//         <IconButton
//           colorScheme="lightBlue"
//           onPress={sendPushNotificationHanlder} 
//           variant="solid"
//           borderRadius='full'
//           _icon={{
//             as: Ionicons,
//             name: "call",}}/>
//       </View>
//     </View>
//   </View>
// </View>
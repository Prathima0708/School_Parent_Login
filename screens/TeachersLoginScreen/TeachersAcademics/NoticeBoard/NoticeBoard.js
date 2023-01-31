import { Button, StyleSheet, View } from "react-native";
export var selectedUserId, selectedUserName;
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text,Button as NativeButton,Icon } from "native-base";
import moment from "moment";
import * as Notifications from "expo-notifications";
import { subURL } from "../../../../components/utils/URL's";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

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
    <>
      <View
    style={[
      {
        // Try setting `flexDirection` to `"row"`.
        flex:1,
        flexDirection: 'column',
      },
    ]}>
    <View style={{flex: 1, backgroundColor: 'red'}} >
      <View
        style={[
          {
            // Try setting `flexDirection` to `"row"`.
            flex:1,
            flexDirection: 'row',
          },
        ]}>
        <View style={{flex: 1, backgroundColor: 'red'}} >
          <Text style={styles.titleStyle}>{titlee}</Text>
        </View>
        <View style={{flex: 1, backgroundColor: 'darkorange'}} >
          <Text style={[styles.descStyle, { fontWeight: "bold" }]}>
            {moment(startdate).format("DD/MM/YYYY")}
          </Text>
        </View>
      </View>
    </View>
    <View style={{flex: 1, backgroundColor: 'darkorange'}} >
      <View
          style={[
            {
              // Try setting `flexDirection` to `"row"`.
              flex:1,
              flexDirection: 'row',
            },
          ]}>
          <View style={{flex: 1, backgroundColor: 'red'}} >
            <Text style={styles.descStyle}>{description}</Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'darkorange'}} >
            <NativeButton 
              size='md'
              onPress={sendPushNotificationHanlder}        
              style={{backgroundColor:'#002D62',borderRadius:7}}
              rightIcon={<Icon as={Ionicons} name="notifications" size="md" />}
              ><Text 
                fontSize='18' 
                color='white' 
                fontFamily='HindBold'
                top='0.5'
                left='1'
                >Notify</Text>
            </NativeButton>
            {/* <IconButton
              colorScheme="lightBlue"
              onPress={sendPushNotificationHanlder} 
              variant="solid"
              borderRadius='full'
              _icon={{
                as: Ionicons,
                name: "call",}}/> */}
          </View>
        </View>
      </View>
    </View>
    <View style={styles.space}/>
    </>
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
  space: {
    width: 20,
    height: 20,
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
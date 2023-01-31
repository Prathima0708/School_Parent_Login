// import { Button, StyleSheet, View } from "react-native";
// export var selectedUserId, selectedUserName;
// import React, { useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { Text,Button as NativeButton,Icon } from "native-base";
// import moment from "moment";
// import * as Notifications from "expo-notifications";
// import { subURL } from "../../../../components/utils/URL's";
// import axios from "axios";
// import { Ionicons } from "@expo/vector-icons";

// const NoticeBoard = ({ startdate, titlee, description, viewOnly }) => {
//   const navigation = useNavigation();
//   const [checkGroup, setCheckGroup] = useState(false);

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
//         // navigation.navigate("TeachersTimetable");
//         //console.log(response)
//       }
//     );
//     return () => {
//       subscription1.remove();
//       subscription2.remove();
//     };
//   }, []);
//   // function sendPushNotificationHanlder() {

//   //   fetch("https://exp.host/--/api/v2/push/send", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({
//   //       to: "ExponentPushToken[q2ACFXBCfAH3ymkH9DRlxW]",
//   //       title: titlee,
//   //       body: "description",

//   //     }),
//   //   });
//   // }

//   async function sendPushNotificationHanlder() {
//     // Fetch the list of device tokens from the backend
//     console.log(viewOnly);
//     // const response = await fetch(`${subURL}/Notification/`);

//     // const tokens = await response.json();
//     const response = await axios.get(`${subURL}/Notification/`);
//     //  const tokens = response.data;

//     //tokens.forEach((id) => console.log(id.user_id.groups[0].name));
//     //  const filteredData = viewOnly === token.user_id.groups[0].name;
//     const filteredData = response.data.filter(
//       (item) => item.user_id.groups[0].name === viewOnly
//     );
//     const tokens = filteredData;
//     console.log(tokens);
//     //  console.log(filteredData[0].user_id.groups[0].name);

//     // Loop through the array of tokens and send a notification to each one
//     // tokens.forEach(async (token) => {
//     //   //  console.log("token", token.notification_token);
//     //   // Send the notification to the current token
//     //   await fetch("https://exp.host/--/api/v2/push/send", {
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },

//     //     body: JSON.stringify({
//     //       to: token.notification_token,

//     //       title: titlee,
//     //       body: description,
//     //     }),
//     //   });
//     // });

//     tokens.forEach(async (token) => {
//       // Send the notification to the current token

//       //  console.log(filteredData);
//       await axios.post(
//         "https://exp.host/--/api/v2/push/send",
//         {
//           to: token.notification_token,
//           title: titlee,
//           body: description,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     });
//   }

//   return (
//     <>
//       <View
//     style={[
//       {
//         // Try setting `flexDirection` to `"row"`.
//         flex:1,
//         flexDirection: 'column',
//       },
//     ]}>
//     <View style={{flex: 1, backgroundColor: 'red'}} >
//       <View
//         style={[
//           {
//             // Try setting `flexDirection` to `"row"`.
//             flex:1,
//             flexDirection: 'row',
//           },
//         ]}>
//         <View style={{flex: 1, backgroundColor: 'red'}} >
//           <Text style={styles.titleStyle}>{titlee}</Text>
//         </View>
//         <View style={{flex: 1, backgroundColor: 'darkorange'}} >
//           <Text style={[styles.descStyle, { fontWeight: "bold" }]}>
//             {moment(startdate).format("DD/MM/YYYY")}
//           </Text>
//         </View>
//       </View>
//     </View>
//     <View style={{flex: 1, backgroundColor: 'darkorange'}} >
//       <View
//           style={[
//             {
//               // Try setting `flexDirection` to `"row"`.
//               flex:1,
//               flexDirection: 'row',
//             },
//           ]}>
//           <View style={{flex: 1, backgroundColor: 'red'}} >
//             <Text style={styles.descStyle}>{description}</Text>
//           </View>
//           <View style={{flex: 1, backgroundColor: 'darkorange'}} >
//             <NativeButton
//               size='md'
//               onPress={sendPushNotificationHanlder}
//               style={{backgroundColor:'#002D62',borderRadius:7}}
//               rightIcon={<Icon as={Ionicons} name="notifications" size="md" />}
//               ><Text
//                 fontSize='18'
//                 color='white'
//                 fontFamily='HindBold'
//                 top='0.5'
//                 left='1'
//                 >Notify</Text>
//             </NativeButton>
//             {/* <IconButton
//               colorScheme="lightBlue"
//               onPress={sendPushNotificationHanlder}
//               variant="solid"
//               borderRadius='full'
//               _icon={{
//                 as: Ionicons,
//                 name: "call",}}/> */}
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default NoticeBoard;

// const styles = StyleSheet.create({
//   listStyle: {
//     flex: 1,
//     flexDirection: "row",
//     padding: 10,
//   },
//   titleStyle: {
//     fontSize: 17,

//     fontFamily: "HindSemiBold",
//   },
//   space: {
//     width: 20,
//     height: 20,
//   },
//   descStyle: {
//     fontFamily: "HindRegular",
//     fontSize: 16,
//   },
//   colorPadding: {
//     backgroundColor: "#DEE4FF",
//     padding: 15,
//   },
//   dateViewStyle: {
//     flex: 1,
//     paddingTop: 15,
//     paddingRight: 15,
//     backgroundColor: "#DEE4FF",
//     borderBottomRightRadius: 10,
//   },
// });

import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
export var selectedUserId, selectedUserName;
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Box,
  HStack,
  Modal,
  Pressable,
  Spacer,
  Text,
  VStack,
  Button as NativeButton
} from "native-base";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoticeBoard = ({ startdate, titlee, description,modifiedDate,enddate }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");

  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);

  async function fetchUser() {
    USERNAME = await AsyncStorage.getItem("UserName");
    console.log("this is the username from aysnc", USERNAME);
    if (USERNAME !== null) {
      setUser(USERNAME);
    }
  }

  fetchUser();


  function pressHandler(){
    console.log("Pressed")
    setOpen(true);
      setPlacement(placement);
  }
  return (
    // <Pressable onPress={pressHandler}>
    //   <View style={[styles.listStyle]}>
    //   <View style={{ flex: 3 }}>
    //     <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
    //       <View
    //         style={[{ flex: 1, borderTopLeftRadius: 10 }, styles.colorPadding]}
    //       >
    //         <Text style={styles.titleStyle}>{titlee}</Text>
    //       </View>
    //       <View style={[{ flex: 1 }, styles.colorPadding]}>
    //         <Text style={styles.descStyle}>{description}</Text>
    //       </View>
    //     </View>
    //   </View>
    //   <View style={[styles.dateViewStyle]}>
    //     <Text style={[styles.descStyle, { fontWeight: "bold" }]}>
    //       {moment(startdate).format("DD/MM/YYYY")}
    //     </Text>
    //   </View>
    // </View>
    // </Pressable>

    <>
      <Pressable onPress={pressHandler}>
      <Box
        borderBottomWidth="1"
        _dark={{
          borderColor: "muted.50",
        }}
        borderColor="muted.800"
        pl={["3", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <HStack space={[2, 3]} justifyContent="space-between">
          <Avatar
            size="48px"
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
            }}
          />
          <VStack>
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              fontFamily="HindSemiBold"
              fontSize={16}
            >
               {user.charAt(0).toUpperCase() + user.slice(1)}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              {titlee}
            </Text>
          </VStack>
          <Spacer />
          <Text
            fontSize="xs"
            _dark={{
              color: "warmGray.50",
            }}
            color="coolGray.800"
            alignSelf="flex-start"
          >
           { moment(modifiedDate).format('LT')}
          </Text>
        </HStack>
      </Box>
    </Pressable>
    <Modal
              isOpen={open}
              onClose={() => setOpen(false)}
              safeAreaTop={true}
              size="full"
            >
              <Modal.Content maxWidth="90%" minHeight="5%">
                {/* <Modal.Header
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  Events
                </Modal.Header> */}

                <Modal.Body>
                      <ScrollView>
                        <View
                          style={[
                            {
                              // Try setting `flexDirection` to `"row"`.
                              flex: 1,
                              flexDirection: "column",
                              //borderBottomWidth: filteredlist.length>1 ? 1 : 0,
                              borderBottomColor: "grey",
                            },
                          ]}
                        >
                          <View style={{ flex: 1 }}>
                            <View
                              style={[
                                {
                                  // Try setting `flexDirection` to `"row"`.
                                  flex: 1,
                                  flexDirection: "row",
                                  marginVertical:10
                                },
                              ]}
                            >
                              <View style={{ flex: 0.2 }}>
                                <Text style={styles.cardTextStyle}>Title :</Text>
                              </View>
                              <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>
                                  {titlee}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={{ flex: 1 }}>
                            <View
                              style={[
                                {
                                  // Try setting `flexDirection` to `"row"`.
                                  flex: 1,
                                  flexDirection: "row",
                                },
                              ]}
                            >
                              <View style={{ flex: 1 }}>
                                <View
                                  style={[
                                    {
                                      // Try setting `flexDirection` to `"row"`.
                                      flex: 1,
                                      flexDirection: "row",
                                    },
                                  ]}
                                >
                                  <View style={{ flex: 0.55 }}>
                                    <Text style={styles.cardTextStyle}>
                                      From :
                                    </Text>
                                  </View>
                                  <View style={{ flex: 1.1 }}>
                                    <Text style={[styles.textStyle,{left:5}]}>
                                      {moment(startdate).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{ flex: 1 }}>
                                <View
                                  style={[
                                    {
                                      // Try setting `flexDirection` to `"row"`.
                                      flex: 1,
                                      flexDirection: "row",
                                    },
                                  ]}
                                >
                                  <View style={{ flex: 0.3 }}>
                                    <Text style={styles.cardTextStyle}>To :</Text>
                                  </View>
                                  <View style={{ flex: 1 }}>
                                    <Text style={styles.textStyle}>
                                      {moment(enddate).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View style={{ flex: 1,marginVertical:10 }}>
                            <View
                              style={[
                                {
                                  // Try setting `flexDirection` to `"row"`.
                                  flex: 1,
                                  flexDirection: "row",
                                },
                              ]}
                            >
                              <View style={{ flex: 0.5 }}>
                                <Text style={styles.cardTextStyle}>
                                  Description :
                                </Text>
                              </View>
                              <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>
                                  {description}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        {/* <View style={styles.space} /> */}
                      </ScrollView>
                </Modal.Body>

                <Modal.Footer>
                  <NativeButton.Group space={2}>
                    <NativeButton
                      onPress={() => {
                        setOpen(false);
                      }}
                    >
                      Close
                    </NativeButton>
                  </NativeButton.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
    </>
  );
};

export default NoticeBoard;
const deviceWidth = Dimensions.get("window").width;
const deviceHieght = Dimensions.get("window").height;
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
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
    //left: 35,
  },
  textStyle: {
    fontSize: deviceWidth < 370 ? 14 : 16,
    fontFamily: "HindSemiBold",
    color: "grey",
  },
});

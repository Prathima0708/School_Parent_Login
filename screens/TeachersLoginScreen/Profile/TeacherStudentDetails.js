import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";
import { Teacher, TeacherEmail } from "../../Login";
import {
  Avatar as NativeAvatar,
  Text as NativeText,
  Divider,
} from "native-base";
import TeachersHome from "../BottomTab/TeachersHome";
const TeacherStudentDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(true);
  const navigation = useNavigation();
  async function logoutHandler() {
    try {
      const value = await AsyncStorage.removeItem("token");
      if (value == null) {
        Alert.alert("Confirm Logout", "Are you Sure you want to logout?", [
          {
            text: "Cancel",

            style: "cancel",
            onPress: () => console.log("Data not removed"),
          },
          {
            text: "Yes",
            onPress: () => {
              navigation.navigate("Login"), console.log("Data removed");
            },
          },
        ]);
      } else {
        console.log("Data not removed");
      }

      // if (value == null) {
      //   console.log("Token is removed"+value)
      //   //  AsyncStorage.removeItem("token");
      //   //  console.log(value)
      //   //  navigation.navigate("Login");
      // }
    } catch (error) {
      console.log(error);
    }
  }

  function editItem() {
    setShowForm(true);
    setShowList(false);
  }
  return (
    <>
      <View
        style={[
          { flex: 1 },
          { flexDirection: "column", backgroundColor: "white" },
        ]}
      >
        <View style={{ flex: 2 }}>
          <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
            <View style={{ flex: 1, backgroundColor: "#00008b" }}>
              <NativeAvatar
                bg="purple.600"
                alignSelf="center"
                size="xl"
                top="15%"
                source={{ uri: "https://www.w3schools.com/css/img_lights.jpg" }}
              ></NativeAvatar>
            </View>
            <View style={{ flex: 1, backgroundColor: "#00008b" }}>
              <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <NativeText fontSize="16" style={{ color: "white" }}>
                    img_lights
                  </NativeText>
                </View>
              </View>
              <View style={[{ flex: 4 }, { flexDirection: "row" }]}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <NativeText style={{ color: "white" }}>12</NativeText>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cardStyle}>
          <View style={{ flex: 1.3 }}>
            <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
              <View style={{ flex: 1 }}>
                <NativeText fontWeight="bold">Father Name:</NativeText>
              </View>
              <View style={{ flex: 1.6 }}>
                <NativeText>ABC</NativeText>
              </View>
            </View>
          </View>
          <View style={{ flex: 1.3 }}>
            <View style={[{ flex: 1 }, { flexDirection: "row", bottom: "4%" }]}>
              <View style={{ flex: 1 }}>
                <NativeText fontWeight="bold">Mother Name:</NativeText>
              </View>
              <View style={{ flex: 1.6 }}>
                <NativeText>XYZ</NativeText>
              </View>
            </View>
          </View>
          <View style={{ flex: 1.3 }}>
            <View style={[{ flex: 1 }, { flexDirection: "row", bottom: "8%" }]}>
              <View style={{ flex: 1 }}>
                <NativeText fontWeight="bold">Date of birth:</NativeText>
              </View>
              <View style={{ flex: 1.6 }}>
                <NativeText>20/10/1999</NativeText>
              </View>
            </View>
          </View>
          <View style={{ flex: 1.3 }}>
            <View
              style={[{ flex: 1 }, { flexDirection: "row", bottom: "12%" }]}
            >
              <View style={{ flex: 1 }}>
                <NativeText fontWeight="bold">Admission Year:</NativeText>
              </View>
              <View style={{ flex: 1.6 }}>
                <NativeText>10/10/2005</NativeText>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.5 }}>
            <View
              style={[{ flex: 1 }, { flexDirection: "row", bottom: "16%" }]}
            >
              <View style={{ flex: 1 }}>
                <NativeText fontWeight="bold"> Standard:</NativeText>
              </View>
              <View style={{ flex: 1.6 }}>
                <NativeText>Second-C</NativeText>
              </View>
            </View>
          </View>
          <Divider bg="#275932" thickness="3" orientation="horizontal" />
          <View style={[{ flex: 2 }, { flexDirection: "row" }]}>
            <View style={{ flex: 1, alignItems: "center", marginVertical: 25 }}>
              <Feather name="phone" size={24} color="black" />
            </View>
            <View style={{ flex: 0.1 }}>
              <Divider bg="#275932" thickness="3" orientation="vertical" />
            </View>
            <View style={{ flex: 1.9 }}>
              <View
                style={[
                  { flex: 1 },
                  {
                    flexDirection: "column",
                    marginHorizontal: 10,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <NativeText fontWeight="bold">Contact</NativeText>
                </View>
                <View style={{ flex: 1 }}>
                  <NativeText fontWeight="bold">Mobile number</NativeText>
                </View>
                <View style={{ flex: 1 }}>
                  <NativeText fontWeight="bold">Email</NativeText>
                </View>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <View
                style={[
                  { flex: 1 },
                  {
                    flexDirection: "column",
                  },
                ]}
              >
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}>
                  <NativeText>8917272712</NativeText>
                </View>
                <View style={{ flex: 1 }}>
                  <NativeText>user@gmail.com</NativeText>
                </View>
              </View>
            </View>
          </View>
          <Divider bg="#275932" thickness="3" orientation="horizontal" />
          <View style={[{ flex: 2 }, { flexDirection: "row" }]}>
            <View
              style={{
                flex: 1.9,
                alignItems: "center",
                marginVertical: 25,
                marginHorizontal: 1,
                left: "6%",
              }}
            >
              <Ionicons name="location-outline" size={24} color="black" />
            </View>
            <View style={{ flex: 1 }}>
              <Divider
                bg="#275932"
                thickness="3"
                orientation="vertical"
                style={{ left: "60%" }}
              />
            </View>
            <View style={{ flex: 10 }}>
              <View
                style={[
                  { flex: 1 },
                  {
                    flexDirection: "column",
                    top: "15%",
                    marginHorizontal: 10,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <NativeText fontWeight="bold">Address</NativeText>
                </View>
                <View style={{ flex: 2 }}>
                  <NativeText>127,Mountain View</NativeText>
                </View>
              </View>
            </View>
          </View>
          <Divider bg="#275932" thickness="3" orientation="horizontal" />
        </View>
        <View style={{ flex: 0.2 }}>
          <TeachersHome />
        </View>
      </View>
    </>
    // <SafeAreaView style={{flex:1}}>
    //   <View style={styles.userInfoSection}>
    //     <View style={{ flexDirection: "row", marginTop: 15 }}>
    //       <Avatar.Image
    //         source={{
    //           uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
    //         }}
    //         size={80}
    //       />
    //       <View style={{ marginLeft: 20 }}>
    //         <Title
    //           style={[
    //             styles.title,
    //             {
    //               marginTop: 15,
    //               marginBottom: 5,
    //             },
    //           ]}
    //         >
    //           {Teacher}
    //         </Title>
    //         <Caption style={styles.caption}>{TeacherEmail}</Caption>
    //       </View>
    //     </View>
    //   </View>

    //   {showList && (
    //     <View style={styles.userInfoSection}>
    //       <View style={styles.row}>
    //         <Ionicons name="location-sharp" size={20} color="black" />
    //         <Text
    //           style={{
    //             color: "#777777",
    //             marginLeft: 20,
    //             fontFamily: "HindRegular",
    //             fontSize: 18,
    //           }}
    //         >
    //           Kolkata, India
    //         </Text>
    //       </View>
    //       <View style={styles.row}>
    //         <Ionicons name="call-sharp" size={20} color="black" />
    //         <Text
    //           style={{
    //             color: "#777777",
    //             marginLeft: 20,
    //             fontFamily: "HindRegular",
    //             fontSize: 18,
    //           }}
    //         >
    //           +91-900000009
    //         </Text>
    //       </View>
    //       <View style={styles.row}>
    //         <Ionicons name="mail-sharp" size={20} color="black" />
    //         <Text
    //           style={{
    //             color: "#777777",
    //             marginLeft: 20,
    //             fontFamily: "HindRegular",
    //             fontSize: 18,
    //           }}
    //         >
    //           {TeacherEmail}
    //         </Text>
    //       </View>
    //     </View>
    //   )}

    //   {/* <View style={styles.infoBoxWrapper}>
    //     <View
    //       style={[
    //         styles.infoBox,
    //         {
    //           borderRightColor: "#dddddd",
    //           borderRightWidth: 1,
    //         },
    //       ]}
    //     >
    //       <Title>₹140.50</Title>
    //       <Caption>Wallet</Caption>
    //     </View>
    //     <View style={styles.infoBox}>
    //       <Title>12</Title>
    //       <Caption>Orders</Caption>
    //     </View>
    //   </View> */}

    //   {showList && (
    //     <View style={styles.menuWrapper}>
    //       <TouchableRipple onPress={editItem}>
    //         <View style={styles.menuItem}>
    //           <Ionicons name="pencil-sharp" size={25} color="#FF6347" />
    //           <Text style={styles.menuItemText}>Edit profile</Text>
    //         </View>
    //       </TouchableRipple>
    //       <TouchableRipple onPress={() => {}}>
    //         <View style={styles.menuItem}>
    //           <Ionicons name="settings-sharp" size={25} color="#FF6347" />
    //           <Text style={styles.menuItemText}>Settings</Text>
    //         </View>
    //       </TouchableRipple>
    //       <TouchableRipple onPress={() => {}}>
    //         <View style={styles.menuItem}>
    //           <Ionicons name="arrow-redo-sharp" size={25} color="#FF6347" />
    //           <Text style={styles.menuItemText}>Tell Your Friends</Text>
    //         </View>
    //       </TouchableRipple>
    //       <TouchableRipple onPress={() => {}}>
    //         <View style={styles.menuItem}>
    //           <Ionicons
    //             name="ios-person-circle-sharp"
    //             size={25}
    //             color="#FF6347"
    //           />
    //           <Text style={styles.menuItemText}>Support</Text>
    //         </View>
    //       </TouchableRipple>
    //       <TouchableRipple onPress={logoutHandler}>
    //         <View style={styles.menuItem}>
    //           <Ionicons name="log-out-sharp" size={25} color="#FF6347" />
    //           <Text style={styles.menuItemText}>Logout</Text>
    //         </View>
    //       </TouchableRipple>
    //     </View>
    //   )}
    //   {showForm && (
    //     <View style={styles.inputForm}>
    //       <Input placeholder="First name" />
    //       <Input placeholder="Last name" />
    //       <Input placeholder="E-mail" />
    //       <View style={styles.btnSubmit}>
    //         <Button>Update</Button>
    //       </View>
    //     </View>
    //   )}
    // </SafeAreaView>
  );
};

export default TeacherStudentDetails;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  cardStyle: {
    flex: 3.4,
    backgroundColor: "white",
    bottom: "7%",
    marginHorizontal: 10,
    elevation: 5,
    borderRadius: 10,
    padding: 15,
  },
  // container: {
  //   flex: 1,
  //   fontFamily: "HindRegular",
  //   backgroundColor: "white",
  // },
  // btnSubmit: {
  //   marginTop: 30,
  //   //marginBottom: 30,
  //   width: "50%",
  //   marginLeft: deviceWidth < 370 ? 170 : 180,
  // },
  // userInfoSection: {
  //   paddingHorizontal: 30,
  //   marginBottom: 25,
  //   fontFamily: "HindRegular",
  // },
  // title: {
  //   fontSize: 24,
  //   fontFamily: "HindRegular",
  //   fontWeight: "bold",
  // },
  // caption: {
  //   fontSize: 18,
  //   padding: 10,
  //   paddingLeft: 0,
  //   //lineHeight: 14,
  //   fontFamily: "HindRegular",
  // },
  // row: {
  //   flexDirection: "row",
  //   marginBottom: 10,
  //   fontFamily: "HindRegular",
  //   fontSize: 18,
  // },
  // infoBoxWrapper: {
  //   borderBottomColor: "#dddddd",
  //   borderBottomWidth: 1,
  //   borderTopColor: "#dddddd",
  //   borderTopWidth: 1,
  //   flexDirection: "row",
  //   height: 100,
  // },
  // infoBox: {
  //   width: "50%",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // menuWrapper: {
  //   marginTop: 10,
  // },
  // menuItem: {
  //   flexDirection: "row",
  //   paddingVertical: 15,
  //   paddingHorizontal: 30,
  // },
  // menuItemText: {
  //   color: "#5D6D7E",
  //   marginLeft: 18,
  //   fontFamily: "HindRegular",
  //   fontSize: 20,
  //   lineHeight: 26,
  // },
  // inputForm: {
  //   padding: 20,
  //   paddingTop: 5,
  // },
});

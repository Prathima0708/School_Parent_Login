// import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
// import React, { useEffect, useState } from "react";
// import { motherName } from "../StudentItem/StudentItem";
// import axios from "axios";
// import { studentList, Token } from "../../screens/Login";
// import { useNavigation } from "@react-navigation/native";
// import ChatList from "./ChatList";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  Avatar,
  Box,
  FlatList,
  Heading,
  HStack,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { Token } from "../../screens/Login";
import { chatURL, mainURL } from "../utils/URL's";

import ChatList from "./ChatList";
export var SELECTEDUSER, USERNAME, TOKEN;

// const Chat = () => {
//   const [users, setUsers] = useState([]);
//   const navigation = useNavigation();
//   useEffect(() => {
//     async function getAllUsers() {
//       try {
//         let headers = {
//           "Content-Type": "application/json; charset=utf-8",
//           Authorization: "Token " + `${Token}`,
//         };

//         // const res = await axios.get("http://10.0.2.2:8000/school/users/", {
//         const users = await axios.get("http://10.0.2.2:8000/chat/list/", {
//           headers: headers,
//         });
//         //  console.log(users.data);
//         setUsers(users.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getAllUsers();
//   }, []);

//   function renderChatList(itemData) {
//     return <ChatList {...itemData.item} />;
//   }
//   return (
//     <>
//       <Text style={styles.description}>List of teachers:</Text>
//       <View style={[styles.root, styles.description]}>
//         <View>
//           <FlatList data={users} renderItem={renderChatList} />
//         </View>
//       </View>
//     </>
//   );
// };

// export default Chat;

// const styles = StyleSheet.create({
//   root: {
//     marginTop: 25,
//   },
//   description: {
//     fontSize: 20,

//     fontWeight: "bold",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const navigation = useNavigation();
  async function fetchToken() {
    TOKEN = await AsyncStorage.getItem("token");
    // console.log("this is the token in chat", TOKEN);
    if (TOKEN !== null) {
      setToken(TOKEN);
    }
  }
  fetchToken();

  useEffect(() => {
    async function getAllUsers() {
      //   console.log("this is the token in chat", token);
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Token " + `${token}`,
        };

        // const res = await axios.get("http://10.0.2.2:8000/school/users/", {
        const users = await axios.get(`${chatURL}/list/`, {
          headers: headers,
        });
        // async function fetchUser() {
        //   USERNAME = await AsyncStorage.getItem("UserName");
        //   console.log(
        //     "this is the username from aysnc in chat screen",
        //     USERNAME
        //   );
        //   if (USERNAME !== null) {
        //     setUser(USERNAME);
        //   }
        // }
        // fetchUser();
        // console.log(users.data[0].username);
        // async function fetchUser() {
        //   USERNAME = await AsyncStorage.getItem("UserName");
        //   console.log("this is the username from chat", USERNAME);
        // }
        // fetchUser();
        // if (USERNAME !== null) {
        // }
        setUsers(users.data);
        // console.log(users.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsers();
  }, [token]);

  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
      avatarUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujitha Mathur",
      timeStamp: "11:11 PM",
      recentText: "Cheer up, there!",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Anci Barroco",
      timeStamp: "6:22 PM",
      recentText: "Good Day!",
      avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Aniket Kumar",
      timeStamp: "8:56 PM",
      recentText: "All the best",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "I will call today.",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
  ];

  function renderChatList(itemData) {
    return <ChatList {...itemData.item} />;
  }
  return (
    <ScrollView>
      <Box>
        <Heading fontSize="xl" p="4" pb="3">
          Inbox
        </Heading>
        <FlatList data={users} renderItem={renderChatList} />
      </Box>
    </ScrollView>
  );
};
export default Chat;

// import * as WebSocket from 'expo-websockets';

// const chatUrl = 'ws://YOUR_BACKEND_SERVER_URL';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     WebSocket.connect(chatUrl).then((socket) => {
//       socket.onMessage((message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       });

//       socket.onClose((reason) => {
//         console.log('Socket closed', reason);
//       });
//     });
//   }, []);

//   const sendMessage = (text) => {
//     WebSocket.send(text);
//   };

//   // Render the chat UI, allowing the user to view and send messages
//   // ...
// };

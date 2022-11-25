import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Token, UserId } from "../../screens/Login";
import axios from "axios";
import { selectedUserId } from "./ChatList";
import { GiftedChat } from "react-native-gifted-chat";
import { useRef } from "react";
import { useCallback } from "react";
import { SELECTEDUSER } from "./Chat";
import ChatHeader from "./ChatUI/ChatHeader";

export var chatUuid;
const SingleUser = () => {
  const [user, setUser] = useState([]);
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState();
  const [recieverId, setRecieverId] = useState();
  const [name, setName] = useState();
  const ws = useRef(null);
  useEffect(() => {
    async function getUsers() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Token " + `${Token}`,
        };
        const users = await axios.get(
          `http://10.0.2.2:8000/chat/createchatroom/${selectedUserId}`,

          {
            headers: headers,
          }
        );

        const chatuid = users.data.chatUuid;
        console.log(chatuid);
        chatUuid = chatuid;
        const getChat = await axios.get(
          `http://10.0.2.2:8000/chat/getchatroom/${chatuid}`,
          {
            headers: headers,
          }
        );

        setChat(getChat.data.chatroom_data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  // useEffect(() => {
  //   console.log("Initial socket connection");
  //   ws.current = new WebSocket(
  //     `ws://10.0.2.2:8000/ws/socket-server/ + ${chatUuid}`
  //   );
  //   ws.current.onopen = () => {
  //     console.log("connection establish open");
  //   };
  //   ws.current.onclose = () => {
  //     console.log("conection establish closed");
  //   };
  //   return () => {
  //     ws.current.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: recieverId,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: senderId,
  //         name: name,
  //       },
  //     },
  //   ]);
  // }, []);

  // useEffect(() => {
  //   ws.current.onmessage = (e) => {
  //     const response = JSON.parse(e.data);
  //     console.log("onmessage=>", JSON.stringify(response));
  //     var sentMessages = {
  //       _id: response.recieverId,
  //       text: response.message,
  //       createdAt: new Date(response.createdAt * 1000),
  //       user: {
  //         _id: response.senderId,
  //         name: name,
  //       },
  //     };
  //     setMessages((previousMessages) =>
  //       GiftedChat.append(previousMessages, sentMessages)
  //     );
  //   };
  // }, []);

  // const onSend = useCallback((messages = []) => {
  //   let obj = {
  //     senderId: senderId,
  //     recieverId: recieverId,
  //     message: messages[0].text,
  //     action: message,
  //   };
  //   ws.current.send(JSON.stringify(obj));
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  // }, []);
  return (
    <View>
      <Text>Logged in UserID :{chat.user1}</Text>
      <Text>Selected teacher ID:{chat.user2}</Text>
      {/* <GiftedChat messages={chat} onSend={(messages) => onSend(messages)} /> */}
      {/* <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: senderId,
        }}
      /> */}
    </View>
  );
};

export default SingleUser;

// import { View, Text } from "react-native";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { GiftedChat } from "react-native-gifted-chat";

// const SingleUser = ({ chatUuid }) => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [messages, setMessages] = useState([]);
//   const [senderId, setSenderId] = useState();
//   const [recieverId, setRecieverId] = useState();
//   const [name, setName] = useState();
//   const ws = useRef(null);
//   useEffect(() => {
//     console.log("Initial socket connection");
//     ws.current = new WebSocket(
//       `ws://http://10.0.2.2:8000/ws/socket-server/` + chatUuid + `/`
//     );
//     ws.current.onopen = () => {
//       console.log("connection establish open");
//     };
//     ws.current.onclose = () => {
//       console.log("conection establish closed");
//     };
//     return () => {
//       ws.current.close();
//     };
//   }, []);
//   useEffect(() => {
//     setMessages([
//       {
//         _id: recieverId,
//         text: "Hello developer",
//         createdAt: new Date(),
//         user: {
//           _id: senderId,
//           name: name,
//         },
//       },
//     ]);
//   }, []);

//   useEffect(() => {
//     ws.current.onmessage = (e) => {
//       const response = JSON.parse(e.data);
//       console.log("onmessage=>", JSON.stringify(response));
//       var sentMessages = {
//         _id: response.recieverId,
//         text: response.message,
//         createdAt: new Date(response.createdAt * 1000),
//         user: {
//           _id: response.senderId,
//           name: name,
//         },
//       };
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, sentMessages)
//       );
//     };
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     let obj = {
//       senderId: senderId,
//       recieverId: recieverId,
//       message: messages[0].text,
//       action: message,
//     };
//     ws.current.send(JSON.stringify(obj));
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messages)
//     );
//   }, []);
//   return (
//     <View>
//       <Text>SingleUser</Text>
//       <GiftedChat
//         messages={messages}
//         onSend={(messages) => onSend(messages)}
//         user={{
//           _id: senderId,
//         }}
//       />
//     </View>
//   );
// };

// export default SingleUser;

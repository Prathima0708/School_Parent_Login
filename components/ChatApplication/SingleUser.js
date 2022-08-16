import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Token, UserId } from "../../screens/Login";
import axios from "axios";
import { selectedUserId } from "./ChatList";
import { GiftedChat } from "react-native-gifted-chat";
import { useRef } from "react";
import { useCallback } from "react";
const SingleUser = ({ messages_data }) => {
  const [user, setUser] = useState([]);
  const [chat, setChat] = useState([]);
  const ws = useRef(null);
  useEffect(() => {
    async function getUsers() {
      //  console.log(Token);
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
        const getChat = await axios.get(
          `http://10.0.2.2:8000/chat/getchatroom/${chatuid}`,
          {
            headers: headers,
          }
        );
        // const user = getChat.data.chatroom_data.user1;
        setChat(getChat.data.chatroom_data);

        var ws = new WebSocket(
          `ws://10.0.2.2:8000/ws/socket-server/ + ${chatuid} `
        );
        ws.current.onopen = () => {
          console.log("Connection established open");
        };
        ws.current.onclose = () => {
          console.log("Connection established closed");
        };
        return () => {
          ws.current.onclose();
        };
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  // useEffect(() => {
  //   sentMessages([
  //     {
  //       _id: getChat.data.chatroom_data.user2,
  //       text: "Hello",
  //       createdAt: new Date(),
  //       user: {
  //         _id: getChat.data.user1,
  //       },
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    ws.current.onmessage = (e) => {
      const response = JSON.parse(e.data);
      console.log("onmessage=>", JSON.stringify(response));
      var sentMessages = {
        _id: response.getChat.data.user2,
        text: response.message,
        createdAt: new Date(response.createdAt * 1000),
        user: {
          _id: response.getChat.data.user1,
        },
      };
      setChat((prevMessages) => GiftedChat.append(prevMessages, sentMessages));
    };
  }, []);
  const onSend = useCallback((messages = []) => {
    let obj = {
      senderId: getChat.data.user1,
      recieverId: getChat.data.user2,
      message: messages[0].text,
      action: message,
    };
    ws.current.send(JSON.stringify(obj));
    setChat((prevMessages) => GiftedChat.append(prevMessages, messages));
  });
  return (
    <View>
      <Text>{chat.user1}</Text>
      <Text>{chat.user2}</Text>
      <GiftedChat messages={chat} onSend={(messages) => onSend(messages)} />
    </View>
  );
};

export default SingleUser;

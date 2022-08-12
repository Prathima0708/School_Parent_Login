import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Token, UserId } from "../../screens/Login";
import axios from "axios";
import { selectedUserId } from "./ChatList";

const SingleUser = () => {
  const [user, setUser] = useState([]);
  const [chat, setChat] = useState([]);
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
        console.log(getChat.data.chatroom_data.chatUuid);
        setChat(getChat.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);
  return (
    <View>
      <Text>{selectedUserId}</Text>
    </View>
  );
};

export default SingleUser;

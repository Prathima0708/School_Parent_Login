import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { motherName } from "../StudentItem/StudentItem";
import axios from "axios";
import { studentList, Token } from "../../screens/Login";
import { useNavigation } from "@react-navigation/native";
import ChatList from "./ChatList";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    async function getAllUsers() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Token " + `${Token}`,
        };

        // const res = await axios.get("http://10.0.2.2:8000/school/users/", {
        const users = await axios.get("http://10.0.2.2:8000/chat/list/", {
          headers: headers,
        });
        // console.log(users);
        setUsers(users.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsers();
  }, []);

  function renderChatList(itemData) {
    return <ChatList {...itemData.item} />;
  }
  return (
    <>
      <Text style={styles.description}>List of teachers:</Text>
      <View style={[styles.root, styles.description]}>
        <View>
          <FlatList data={users} renderItem={renderChatList} />
        </View>
      </View>
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  root: {
    marginTop: 25,
  },
  description: {
    fontSize: 20,

    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
});

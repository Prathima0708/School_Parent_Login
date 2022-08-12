// @refresh reset
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
import "firebase/firestore";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const firebaseConfig = {
  apiKey: "AIzaSyChfZiVM3UdGJ6bXguSXY-_CCSwI9I7z6k",
  authDomain: "chat-application-5dc01.firebaseapp.com",
  projectId: "chat-application-5dc01",
  storageBucket: "chat-application-5dc01.appspot.com",
  messagingSenderId: "1003535528675",
  appId: "1:1003535528675:web:29649d4860d831e7e30bd6",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
const db = firebase.firestore();
const chatsRef = db.collection("chats");

export default function ChatScreen() {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    readUser();
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messageFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messageFirestore);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
    },
    [messages]
  );

  async function readUser() {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }
  async function handlePress() {
    const _id = Math.random().toString(36).substring(7);
    const user = { _id, name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }
  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m)); //sending data
    await Promise.all(writes);
  }
  if (!user) {
    return (
      <View style={styles.conatiner}>
        <TextInput
          style={styles.input}
          placeholder="enter your name"
          value={name}
          onChangeText={setName}
        />
        <Button onPress={handlePress} title="enter chat" />
      </View>
    );
  }
  return <GiftedChat messages={messages} user={user} onSend={handleSend} />;
}
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    padding: 15,
    borderColor: "gray",
    marginBottom: 20,
  },
});

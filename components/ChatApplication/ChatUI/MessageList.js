import { View, Text, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import Message from "./Message";

const MessageList = () => {
  const [messages, setMessages] = useState([
    {
      user: 0,
      time: "12:00",
      content: "Hey",
    },
    {
      user: 1,
      time: "12:05",
      content: "What's up",
    },
    {
      user: 0,
      time: "12:07",
      content: "How is it going",
    },
    {
      user: 1,
      time: "12:10",
      content: "How is it going",
    },
    {
      user: 0,
      time: "12:07",
      content: "How is it going",
    },
    {
      user: 0,
      time: "12:07",
      content: "How is it going",
    },
    {
      user: 1,
      time: "12:07",
      content: "How is it going",
    },
    {
      user: 0,
      time: "12:07",
      content: "How is it going",
    },
    {
      user: 1,
      time: "12:07",
      content: "How is it going",
    },
  ]);
  const user = useRef(0);
  const scrollView = useRef();
  return (
    <ScrollView
      style={{ backgroundColor: "white", height: "75%" }}
      ref={(ref) => (scrollView.current = ref)}
      onContentSizeChange={() => {
        scrollView.current.scrollToEnd({ animated: true });
      }}
    >
      {messages.map((message, index) => (
        <Message
          key={index}
          time={message.time}
          isLeft={message.user !== user.current}
          message={message.content}
        />
      ))}
    </ScrollView>
  );
};

export default MessageList;

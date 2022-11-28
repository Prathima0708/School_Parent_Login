import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.input}>
          <TouchableOpacity style={styles.emojiIcon}>
            <Ionicons name="md-sad" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            placeholder="Type something..."
            multiline
            style={styles.textinput}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity style={styles.iconRight}>
            <Ionicons name="md-attach" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconRight}>
            <Ionicons name="md-camera-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name={message ? "send" : "mic"} size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "white",
  },
  innerContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  input: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textinput: {
    backgroundColor: "transparent",
    paddingLeft: 20,
    color: "black",
    flex: 3,
    fontSize: 15,
    height: 50,
    alignSelf: "center",
  },
  iconRight: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#fff",
  },
  emojiIcon: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  sendButton: {
    backgroundColor: "#121B5A",
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

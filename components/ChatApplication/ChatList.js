import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
export var selectedUserId;
const ChatList = ({ username, id }) => {
  const navigation = useNavigation();
  function navigateHandler() {
    console.log(id);
    selectedUserId = id;
    navigation.navigate("SingleUser");
  }
  return (
    <Pressable onPress={navigateHandler.bind(this, id)}>
      <View style={styles.ChatItem}>
        <View style={styles.ChatItem}>
          <Text style={[styles.textBase, styles.description]}>{username}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  ChatItem: {
    width: "95%",
    marginLeft: 5,
    overflow: "hidden",
    padding: 5,
    marginVertical: 8,
    backgroundColor: "#9eecff",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 16,
  },
  textBase: {
    color: "black",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
});

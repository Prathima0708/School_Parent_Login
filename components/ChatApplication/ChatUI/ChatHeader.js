import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ChatHeader = ({ username, bio, picture, onlineStatus, onPress }) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.backButton}>
        <Ionicons name="caret-back-sharp" size={24} color="white" />
      </TouchableOpacity> */}
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profile}>
          <Image style={styles.image} source={{ uri: picture }} />
          <View style={styles.status}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.online}>{onlineStatus}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#121B5A",
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  profileOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 30,
  },
  username: {
    color: "white",
    fontSize: 24,
    fontFamily: "HindMedium",
  },
  online: {
    color: "white",
    fontSize: 15,
    fontFamily: "HindRegular",
  },
  status: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  backButton: {
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  profile: {
    flexDirection: "row",
    flex: 4,
    alignItems: "center",
  },
});

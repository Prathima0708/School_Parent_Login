import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TeachersLoginScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.rootContainer}>
        <Text style={styles.title}>Welcome</Text>

        <Pressable
          style={styles.btnContainer}
          onPress={() => navigation.navigate("Chat")}
        >
          <Ionicons name="chatbubble" size={28} color="black" />
          <Text style={styles.btnText}>Chat</Text>
        </Pressable>
      </View>
    </>
  );
};

export default TeachersLoginScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,

    borderRadius: 20,
    backgroundColor: "#368dff",
    marginTop: -39,
    marginLeft: 250,
  },

  btnText: {
    fontSize: 18,
    color: "black",
    marginLeft: 3,
    marginTop: 2,
  },
});

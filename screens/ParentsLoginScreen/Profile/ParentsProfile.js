import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import {
  className,
  Section,
  StudentName,
  StudentPhoto,
  StudentRegNo,
} from "../../../components/StudentItem/StudentItem";
import { Box, Center, Pressable } from "native-base";

const ParentsProfile = () => {
  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
        },
      ]}
    >
      <View style={{ flex: 3 }}>
        <View
          style={[
            styles.container,
            {
              // Try setting `flexDirection` to `"row"`.
              flexDirection: "row",
            },
          ]}
        >
          <View style={{ flex: 3 }}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `http://10.0.2.2:8000${StudentPhoto}`,
                }}
                style={styles.image}
                width="100px"
              />
            </View>
          </View>
          <View style={{ flex: 5 }}>
            <View style={{ padding: 15, paddingTop: 0 }}>
              <Text
                style={{ fontFamily: "HindMedium", fontSize: 15, margin: 5 }}
              >
                Name :{StudentName}
              </Text>
              <Text
                style={{ fontFamily: "HindMedium", fontSize: 15, margin: 5 }}
              >
                Class : {className} {"-"} {Section}
              </Text>
              <Text
                style={{ fontFamily: "HindMedium", fontSize: 15, margin: 5 }}
              >
                Roll No : {StudentRegNo}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 9, backgroundColor: "darkorange" }}></View>
    </View>
  );
};

export default ParentsProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    backgroundColor: "white",

    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 90,
    width: 110,
  },
});

import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

const ImageSlider = () => {
  return (
    <View style={styles.container}>
      <Swiper
        loop
        autoplay
        dot={
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              margin: 5,
              backgroundColor: "blue",
            }}
          ></View>
        }
        activeDot={
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              margin: 5,
              backgroundColor: "red",
            }}
          ></View>
        }
      >
        <Image
          source={require("../../assets/a1.jpg")}
          style={styles.image}
          resizeMode="center"
        />
        <Image
          source={require("../../assets/a1.jpg")}
          style={styles.image}
          resizeMode="center"
        />
        <Image
          source={require("../../assets/a1.jpg")}
          style={styles.image}
          resizeMode="center"
        />
      </Swiper>
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    flex: 20,
    // backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 150,
  },
  image: {
   // flex: 1,
    width: 500,
    height: 500,

    justifyContent: "center",
    alignItems: "center",
  },
});

import { Center, Skeleton, VStack } from "native-base";
import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";

const { width } = Dimensions.get("window");
const DATA = [
  {
    // coverImageUri: 'http://10.0.2.2:8000/images/Screenshot_2020-09-20_131431_NZm4cPN.png',
    coverImageUri:
      "https://kinaraeducation.in/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-18-at-10.19.00-AM.jpeg",
    // cornerLabelColor: '#FFD300',
    // cornerLabelText: 'GOTY',
  },
  {
    coverImageUri:
      "https://kinaraeducation.in/wp-content/uploads/2023/01/New-Year-celebration-8.jpeg",
    // cornerLabelColor: '#0080ff',
    // cornerLabelText: 'NEW',
  },
  {
    coverImageUri:
      "https://kinaraeducation.in/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-18-at-10.19.03-AM.jpeg",
    // cornerLabelColor: '#2ECC40',
    // cornerLabelText: '-75%',
  },
  {
    coverImageUri:
      "https://kinaraeducation.in/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-17-at-10.23.05.jpeg",
    // cornerLabelColor: '#2ECC40',
    // cornerLabelText: '-20%',
  },
  {
    coverImageUri: "http://kinaraeducation.in/wp-content/uploads/2021/10/1.jpg",
    // cornerLabelColor: '#2ECC40',
    // cornerLabelText: '-20%',
  },
];

const ImageSlider = () => {
  const [loading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 4000);
  const renderItem = (data) => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image
          style={styles.card}
          source={{ uri: data.coverImageUri }}
        />

        <View
          style={[
            styles.cornerLabel,
            { backgroundColor: data.cornerLabelColor },
          ]}
        >
          <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && (
        <Center w="100%">
          <VStack
            w="90%"
            maxW="400"
            borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
              borderColor: "coolGray.500",
            }}
            _light={{
              borderColor: "coolGray.200",
            }}
          >
            <Skeleton h="40" />
          </VStack>
        </Center>
      )}
      {!loading && (
        <Carousel
          pagination={PaginationLight}
          renderItem={renderItem}
          data={DATA}
          loop
          autoplay
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: "hidden",
  },
  card: {
    width: width * 0.9,
    height: width * 0.5,
  },
  cornerLabel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default ImageSlider;

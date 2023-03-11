import { Center, Skeleton, VStack } from "native-base";
import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";

const { width } = Dimensions.get("window");
const image1 = require("../../assets/images/Newyear.jpeg");
const image2 = require("../../assets/images/sportsday.jpeg");
const image3 = require("../../assets/images/childrensday.jpeg");
const image4 = require("../../assets/images/independance.jpeg");
const image5 = require("../../assets/images/sportsannual.jpeg");
const DATA = [
  {
    coverImageUri: image1,
    // coverImageUri:
    //   "https://kinaraeducation.in/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-18-at-10.19.00-AM.jpeg",
     cornerLabelColor: '#000B3C',
    imageText: 'New Year Celebration',
  },
  {
    coverImageUri: image2,
    // coverImageUri:
    //   "https://kinaraeducation.in/wp-content/uploads/2023/01/New-Year-celebration-8.jpeg",
     cornerLabelColor: '#7E7405',
    imageText: 'Sports Day',
  },
  {
    coverImageUri: image3,
    // coverImageUri:
    //   "https://kinaraeducation.in/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-18-at-10.19.03-AM.jpeg",
    cornerLabelColor: '#670164',
    imageText: "Children\'s Day"
  },
  {
    coverImageUri: image4,
    // coverImageUri:
    //   "https://kinaraeducation.in/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-17-at-10.23.05.jpeg",
    cornerLabelColor: '#C85C08',
    imageText: 'Independence Day',
  },
  {
    coverImageUri: image5,
    //coverImageUri: "http://kinaraeducation.in/wp-content/uploads/2021/10/1.jpg",
    cornerLabelColor: '#C80531',
    imageText: 'Annual Sports Day',
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
          source={data.coverImageUri}
          // source={{ uri: data.coverImageUri }}
          //  onLoad={() => setIsLoading(false)}
        />

        <View
          style={[
            styles.cornerLabel,
            { backgroundColor: data.cornerLabelColor },
          ]}
        >
          <Text style={styles.cornerLabelText}>{data.imageText}</Text>
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
    height: width * 0.57,
  },
  cornerLabel: {
    position: "absolute",
    bottom: 0,
    right: 0,
 
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 15,
 color:'#FDFEFE',
borderColor:'white',
borderWidth:1,
borderTopLeftRadius:5,
    fontWeight: "500",
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily:'HindSemiBold'
  },
});

export default ImageSlider;

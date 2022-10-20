import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  LogBox,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { className } from "../../../../components/StudentItem/StudentItem";
import ParentsHome from "../../BottomTab/ParentsHome";
import { ScrollView } from "react-native";

const HomeworkScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8000/school/HomeworkByClass/${className}/`
        );
        //  console.log(res.data);
        setIsLoading(false);
        var Homeworkdata = [];
        Homeworkdata.push(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    LogBox.ignoreLogs([
      "Warning: Async Storage has been extracted from react-native core",
    ]);
  }, []);

  return (
    <>
      <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
        <View style={{ flex: 8, bottom: 10 }}>
          <ScrollView>
            <View style={styles.root}>
              <FlatList
                data={data}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.card}>
                      <View style={styles.imgContainer}></View>
                      <View>
                        <View style={styles.bio}>
                          <Text style={styles.homewrk}>
                            <Text style={{ fontFamily: "HindSemiBold" }}>
                              Remark :
                            </Text>{" "}
                            {item.homework}
                          </Text>
                          <Text style={styles.homewrk}>
                            <Text style={{ fontFamily: "HindSemiBold" }}>
                              Subject :
                            </Text>{" "}
                            {item.subject}
                          </Text>
                        </View>

                        <View style={styles.main}>
                          <Image
                            style={styles.img}
                            resizeMode="cover"
                            source={{
                              uri: `http://10.0.2.2:8000${item.homework_photo}`,
                            }}
                          />
                          <View
                            style={{
                              marginLeft: -140,
                            }}
                          >
                            <Text style={styles.remark}>{item.remark}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <ParentsHome />
        </View>
      </View>
      {/* <ScrollView>
        <View style={styles.root}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <View style={styles.imgContainer}></View>
                  <View>
                    <View style={styles.bio}>
                      <Text style={styles.homewrk}>
                        Remark : {item.homework}
                      </Text>
                      <Text style={styles.homewrk}>
                        Subject: {item.subject}
                      </Text>
                    </View>

                    <View style={styles.main}>
                      <Image
                        style={styles.img}
                        resizeMode="cover"
                        source={{
                          uri: `http://10.0.2.2:8000${item.homework_photo}`,
                        }}
                      />
                      <View
                        style={{
                          marginLeft: -140,
                        }}
                      >
                        <Text style={styles.remark}>{item.remark}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView> */}

      {/* <View>
        <ParentsHome />
      </View> */}
    </>
  );
};

export default HomeworkScreen;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    width: deviceWidth < 370 ? "100%" : "100%",
    borderRadius: 25,
    //marginVertical: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  home: {
    marginTop: 620,
  },
  img: {
    height: 150,
    width: 200,
  },
  homewrk: {
    fontFamily: "HindRegular",

    padding: 5,
    color: "black",
    fontSize: deviceWidth < 370 ? 16 : 20,
  },
  main: {
    width: "100%",
    padding: 15,
    // backgroundColor: "#b696d7",
    backgroundColor: "lightgrey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    padding: 10,
  },
  bio: {
    width: "100%",
    //display: "flex",
    //flexDirection: "row",
    // alignItems: "center",
    //  justifyContent: "space-between",
    backgroundColor: "grey",
    //  paddingVertical: 10,
  },
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  remark: {
    fontSize: deviceWidth < 370 ? 16 : 20,
    fontFamily: "HindRegular",
    marginTop: 10,
  },
});

// import React, { useEffect, useState } from "react";
// import {
//   NativeBaseProvider,
//   Box,
//   AspectRatio,
//   Center,
//   Stack,
//   Heading,
//   Text,
//   HStack,
//   Image,
//   ScrollView,
//   FlatList,
// } from "native-base";
// import axios from "axios";
// import { className } from "../../../../components/StudentItem/StudentItem";
// import ParentsHome from "../../BottomTab/ParentsHome";

// export default function HomeworkScreen() {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await axios.get(
//           `http://10.0.2.2:8000/school/HomeworkByClass/${className}/`
//         );
//         //  console.log(res.data);
//         setIsLoading(false);
//         var Homeworkdata = [];
//         Homeworkdata.push(res.data);
//         setData(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, []);
//   // useEffect(() => {
//   //   LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
//   //   LogBox.ignoreLogs([
//   //     "Warning: Async Storage has been extracted from react-native core",
//   //   ]);
//   // }, []);

//   return (
//     <NativeBaseProvider>
//       <ScrollView>
//         <FlatList
//           data={data}
//           renderItem={({ item }) => {
//             return (
//               <Box alignItems="center">
//                 <Box
//                   maxW="80"
//                   rounded="lg"
//                   margin={5}
//                   Bottom={5}
//                   flex={8}
//                   overflow="hidden"
//                   borderColor="coolGray.200"
//                   borderWidth="1"
//                   _dark={{
//                     borderColor: "coolGray.800",
//                     backgroundColor: "gray.700",
//                   }}
//                   _web={{
//                     shadow: 2,
//                     borderWidth: 0,
//                   }}
//                   _light={{
//                     backgroundColor: "gray.50",
//                   }}
//                 >
//                   <Box>
//                     <AspectRatio w="100%" ratio={16 / 9}>
//                       <Image
//                         source={{
//                           uri: `http://10.0.2.2:8000${item.homework_photo}`,
//                         }}
//                         alt="image"
//                         resizeMode="cover"
//                       />
//                     </AspectRatio>
//                     {/* <Center
//                       bg="violet.500"
//                       _dark={{
//                         bg: "violet.400",
//                       }}
//                       _text={{
//                         color: "warmGray.50",
//                         fontWeight: "700",
//                         fontSize: "xs",
//                       }}
//                       position="absolute"
//                       bottom="0"
//                       px="3"
//                       py="1.5"
//                     >
//                       PHOTOS
//                     </Center> */}
//                   </Box>
//                   <Stack p="4" space={3}>
//                     <Stack space={2}>
//                       <Heading size="md" ml="-1">
//                         Remark : {item.homework}
//                       </Heading>
//                     </Stack>
//                     <Text fontWeight="400">
//                       Description : {item.description}
//                     </Text>
//                     <HStack
//                       alignItems="center"
//                       space={4}
//                       justifyContent="space-between"
//                     ></HStack>
//                   </Stack>
//                 </Box>
//               </Box>
//             );
//           }}
//         />
//       </ScrollView>
//       <ParentsHome />
//     </NativeBaseProvider>
//   );
// }

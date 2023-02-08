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
import {
  className,
  Section,
} from "../../../../components/StudentItem/StudentItem";
import ParentsHome from "../../BottomTab/ParentsHome";
import { ScrollView } from "react-native";
import {
  Modal,
  Button as NativeButton,
  IconButton,
  Text as NativeText,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import moment from "moment";
import { mainURL, subURL } from "../../../../components/utils/URL's";

const HomeworkScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [saveImg, setSaveImg] = useState(``);

  const openModal = (placement, id, img) => {
    setOpen(true);
    setSaveImg(img);
    setPlacement(placement);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${subURL}/HomeworkListByClass/${className}/${Section}`
        );
       
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
      <View
        style={[
          { flex: 1 },
          { flexDirection: "column", backgroundColor: "white" },
        ]}
      >
        <View style={{ flex: 8, bottom: 10 }}>
          <ScrollView>
            <View style={styles.root}>
              {data.length > 0 ? (
                <FlatList
                  data={data}
                  style={{ width: "95%" }}
                  renderItem={({ item }) => {
                    return (
                      <Card style={styles.cardStyle}>
                        <Card.Content style={styles.cardContentStyle}>
                          <View
                            style={[
                              { flex: 1 },
                              { flexDirection: "row" },
                              styles.subDesign,
                            ]}
                          >
                            <View style={{ flex: 2,marginLeft:'5%' }}>
                              <Text style={styles.labelStyle}>Subject</Text>
                            </View>
                            <View style={{ flex: 5 ,alignItems:'flex-end',marginRight:'16%'}}>
                              <Text style={styles.textStyle}>
                                {item.subject}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[
                              { flex: 1 },
                              { flexDirection: "row", marginVertical: 10 },
                            ]}
                          >
                            <View
                              style={{
                                flex: 1,
                                alignItems: "center",
                                right: "20%",
                              }}
                            >
                              <Text
                                style={[styles.textStyle, { color: "black" }]}
                              >
                                {moment(item.homework_date).format(
                                  "DD/MM/YYYY"
                                )}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 0.2,
                                alignItems: "center",
                                top: "1%",
                              }}
                            >
                              <Text
                                style={[
                                  {
                                    fontFamily: "HindSemiBold",
                                    color: "black",
                                    fontSize: 18,
                                  },
                                ]}
                              >
                                to
                              </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center" }}>
                              <Text
                                style={[styles.textStyle, { color: "black" }]}
                              >
                                {moment(item.due_date).format("DD/MM/YYYY")}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[
                              { flex: 1 },
                              { flexDirection: "row", marginHorizontal: 15 },
                            ]}
                          >
                            <View style={{ flex: 1 }}>
                              <Text
                                style={[styles.textStyle, { color: "black" }]}
                              >
                                Remark :
                              </Text>
                            </View>
                            <View style={{ flex: 2.6 }}>
                              <Text style={[styles.cardText]}>
                                {item.remark}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[
                              { flex: 1 },
                              { flexDirection: "row", marginVertical: 10 },
                            ]}
                          >
                            <View style={{ flex: 2 }}>
                              <Text
                                style={[styles.textStyle, { color: "black" }]}
                              >
                                Description :
                              </Text>
                            </View>
                            <View style={{ flex: 2.5, left: -40 }}>
                              <Text style={[styles.cardText]}>
                                {item.description}
                              </Text>
                            </View>
                          </View>
                          {/* <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
                            <View style={{ flex: 6 }}>
                             
                            </View>
                            <View style={{ flex: 1, right: "75%" }}>
                              <IconButton
                                colorScheme="blue"
                                onPress={() =>
                                  openModal(
                                    "center",
                                    item.id,
                                    item.homework_photo
                                  )
                                }
                                variant="subtle"
                                _icon={{
                                  as: Ionicons,
                                  name: "eye",
                                }}
                              />
                            </View>
                          </View> */}
                        </Card.Content>
                      </Card>
                    );
                  }}
                />
              ) : (
                <View style={{ alignItems: "center", marginVertical: 10 }}>
                  <Text style={styles.errText}>
                    No Assigned homework found.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          safeAreaTop={true}
          size="full"
        >
          <Modal.Content maxWidth="90%" minHeight="5%">
            <Modal.Header
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              Homework
            </Modal.Header>
            <Modal.Body>
              <Image
                style={styles.img}
                resizeMode="cover"
                source={{
                  uri: `${mainURL}${saveImg}`,
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <NativeButton.Group space={2}>
                <NativeButton
                  onPress={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </NativeButton>
              </NativeButton.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
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
    minHeight: 260,
    width: 330,
  },
  homewrk: {
    fontFamily: "HindRegular",
    marginHorizontal: 10,
    // padding: 5,
    color: "black",
    fontSize: deviceWidth < 370 ? 16 : 20,
  },
  main: {
    width: "100%",
    padding: 15,
    // backgroundColor: "#b696d7",
    backgroundColor: "lightgrey",
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  imgContainer: {
    padding: 10,
  },
  bio: {
    // width: "100%",
    //display: "flex",
    //flexDirection: "row",
    // alignItems: "center",
    //  justifyContent: "space-between",
    backgroundColor: "purple",
    //  paddingVertical: 10,
  },
  root: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  remark: {
    fontSize: deviceWidth < 370 ? 16 : 20,
    fontFamily: "HindRegular",
    marginTop: 10,
  },
  // new design
  cardStyle: {
    marginVertical: 15,
    marginHorizontal: 20,
    elevation: 5,
    // borderRadius: 10,
    top: 10,
    // paddingBottom: 20,
  },
  cardContentStyle: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  subDesign: {
    backgroundColor: "darkblue",
    padding: 5,
    // borderTopLeftRadius: 10,
    //  borderTopRightRadius: 10,
  },
  labelStyle: {
    color: "white",
    fontFamily: "HindSemiBold",
    fontSize: 18,
    textAlign: "center",
    top: "5%",
  },
  textStyle: {
    color: "white",
    fontFamily: "HindSemiBold",
    fontSize: 18,
    textAlign: "center",
    top: "5%",
  },
  cardText: {
    color: "black",
    fontSize: 18,
    fontFamily: "HindRegular",
    left: "10%",
    top: "10%",
  },
  errText: {
    fontFamily: "HindSemiBold",
    fontSize: 18,
    color: "#6B0202",
  },
});


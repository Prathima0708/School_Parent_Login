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
        var Homeworkdata = [];
        Homeworkdata.push(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
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
                            <View style={{ flex: 2, marginLeft: "5%" }}>
                              <Text style={styles.labelStyle}>Subject</Text>
                            </View>
                            <View
                              style={{
                                flex: 5,
                                alignItems: "flex-end",
                                marginRight: "16%",
                              }}
                            >
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
                          <View style={[{ flex: 1 }, { flexDirection: "row" }]}>
                            <View style={{ flex: 6 }}></View>
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
                          </View>
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
    </>
  );
};

export default HomeworkScreen;
const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  img: {
    minHeight: 260,
    width: 330,
  },
  root: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  cardStyle: {
    marginVertical: 15,
    marginHorizontal: 20,
    elevation: 5,
    top: 10,
  },
  cardContentStyle: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  subDesign: {
    backgroundColor: "darkblue",
    padding: 5,
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

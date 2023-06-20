import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  LogBox,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Notifications } from "expo";
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
  Center,
  VStack,
  Skeleton,
  HStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import moment from "moment";
import { mainURL, subURL } from "../../../../components/utils/URL's";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import Toast from "react-native-toast-message";

const HomeworkScreen = () => {
  const [data, setData] = useState([]);
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [saveImg, setSaveImg] = useState(``);

  const [onlyImg, setOnlyImg] = useState();
  const [saveUri, setSaveUri] = useState(``);

  const [loading, setLoading] = useState(false);
  const ref = useRef();

  const openModal = (placement, id, img) => {
    setOnlyImg(img?.split("/images/")[1]);
    setSaveUri(mainURL.concat(img));
    setOpen(true);
    setSaveImg(img);
    setPlacement(placement);
  };

  useEffect(() => {
   
    async function fetchData() {
      setLoading(true)
      try {
       
        const res = await axios.get(
          `${subURL}/HomeworkListByClass/${className}/${Section}`
        );
        var Homeworkdata = [];
        Homeworkdata.push(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  downloadFile = async () => {
    setOpen(false);
    const uri = saveUri;
    let fileUri = FileSystem.documentDirectory + onlyImg;
    console.log(fileUri);
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        const downloadResumable = FileSystem.createDownloadResumable(
          uri,
          fileUri
        );
        const { uri: localUri } = await downloadResumable.downloadAsync();
        saveFile(localUri);
      } else {
        throw new Error("Camera roll permission not granted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

    if (status !== "granted") {
      console.error("Permission to access media library denied");
      return;
    }
    const options = {
      album: "",
      permissionText:
        "Please allow this app to save the file to your media library.",
    };
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri, options);
      const albumExists = await MediaLibrary.getAlbumAsync("Download");
      if (albumExists) {
        await MediaLibrary.addAssetsToAlbumAsync(
          [asset],
          albumExists.id,
          false
        );
      } else {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      }
      ToastAndroid.show("File downloaded!", ToastAndroid.SHORT);
      Toast.show({
        type: "info",
        text1: "File Downloaded",
        visibilityTime: 2000,
      });
      console.log("File saved to camera roll");
    } catch (error) {
      console.error(error);
    }
  };

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
              {data.length <=0 && <View style={{ alignItems: "center", marginVertical: 10 }}>
                  <Text style={styles.errText}>
                    No Assigned homework found.
                  </Text>
                </View>}
              {data.length > 0 && (
               
                loading ? (
                  <HStack
                  space={8}
                  justifyContent="center"
                  alignItems="center"
                >
                    <ActivityIndicator
                size={40}
                visible={loading}
                textContent={"Loading..."}
                //textStyle={styles.spinnerTextStyle}
              />
              </HStack>
                ) 
              :
             
            
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
                              {
                                flexDirection: "row",
                                marginHorizontal: 15,
                                marginVertical: 10,
                              },
                            ]}
                          >
                            <View style={{ flex: 2.9 }}>
                              <Text
                                style={[styles.textStyle, { color: "black" }]}
                              >
                                Homework date :
                              </Text>
                            </View>
                            <View style={{ flex: 2.6 }}>
                              <Text style={[styles.cardText]}>
                                {moment(item.homework_date).format(
                                  "DD/MM/YYYY"
                                )}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[
                              { flex: 1 },
                              { flexDirection: "row", marginHorizontal: 15 },
                            ]}
                          >
                            <View style={{ flex: 1.2 }}>
                              <Text
                                style={[styles.textStyle, { color: "black" }]}
                              >
                                Due date:
                              </Text>
                            </View>
                            <View style={{ flex: 2.6 }}>
                              <Text style={[styles.cardText]}>
                                {moment(item.due_date).format("DD/MM/YYYY")}
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
              Homework Image
            </Modal.Header>
            <Modal.Body>
            {saveImg ? (
              loading ?<ActivityIndicator
              size={40}
              visible={loading}
              textContent={"Loading..."}
             
            />:
              <Image
                style={styles.img}
                resizeMode="cover"
                source={{
                  uri: `${mainURL}${saveImg}`,
                }}
              />
            ) :<Text>No image uploaded</Text>}
            </Modal.Body>
            <Modal.Footer>
              <NativeButton.Group space={2}>
              {saveImg ? <NativeButton onPress={downloadFile}>Download</NativeButton>: <NativeButton onPress={()=>setOpen(false)}>Okay</NativeButton>}
              </NativeButton.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Toast ref={(ref) => Toast.setRef(ref)} />
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
    backgroundColor: "#1E84A4",
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

import { ScrollView, StyleSheet, View } from "react-native";
export var selectedUserId, selectedUserName;
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Box,
  HStack,
  Modal,
  Pressable,
  Spacer,
  Text,
  VStack,
  Button as NativeButton,
} from "native-base";
import moment from "moment";
import { Dimensions } from "react-native";

const NoticeBoardList = ({
  startdate,
  enddate,
  titlee,
  description,
  created_by,
  modifiedDate,
}) => {
  const navigation = useNavigation();

  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);

  function pressHandler() {
    setOpen(true);
    setPlacement(placement);
  }

  return (
    <>
      <Pressable onPress={pressHandler}>
        <Box
          borderBottomWidth="1"
          _dark={{
            borderColor: "muted.50",
          }}
          borderColor="muted.800"
          pl={["3", "4"]}
          pr={["5", "5"]}
          py="2"
        >
          <HStack space={[2, 3]} justifyContent="space-between">
            <Avatar
              size="48px"
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
              }}
            />
            <VStack>
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                fontFamily="HindSemiBold"
                fontSize={16}
              >
                {created_by.charAt(0).toUpperCase() + created_by.slice(1)}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {titlee}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              alignSelf="flex-start"
            >
              {moment(modifiedDate).format("LT")}
            </Text>
          </HStack>
        </Box>
      </Pressable>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        safeAreaTop={true}
        size="full"
      >
        <Modal.Content maxWidth="90%" minHeight="5%">
          <Modal.Body>
            <ScrollView>
              <View
                style={[
                  {
                    flex: 1,
                    flexDirection: "column",
                    borderBottomColor: "grey",
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <View
                    style={[
                      {
                        flex: 1,
                        flexDirection: "row",
                        marginVertical: 10,
                      },
                    ]}
                  >
                    <View style={{ flex: 0.2 }}>
                      <Text style={styles.cardTextStyle}>Title :</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.textStyle}>{titlee}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View
                    style={[
                      {
                        flex: 1,
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <View
                        style={[
                          {
                            flex: 1,
                            flexDirection: "row",
                          },
                        ]}
                      >
                        <View style={{ flex: 0.55 }}>
                          <Text style={styles.cardTextStyle}>From :</Text>
                        </View>
                        <View style={{ flex: 1.1 }}>
                          <Text style={[styles.textStyle, { left: 5 }]}>
                            {moment(startdate).format("DD/MM/YYYY")}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View
                        style={[
                          {
                            flex: 1,
                            flexDirection: "row",
                          },
                        ]}
                      >
                        <View style={{ flex: 0.3 }}>
                          <Text style={styles.cardTextStyle}>To :</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.textStyle}>
                            {moment(enddate).format("DD/MM/YYYY")}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1, marginVertical: 10 }}>
                  <View
                    style={[
                      {
                        flex: 1,
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <View style={{ flex: 0.5 }}>
                      <Text style={styles.cardTextStyle}>Description :</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.textStyle}>{description}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
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
    </>
  );
};

export default NoticeBoardList;
const deviceWidth = Dimensions.get("window").width;
const deviceHieght = Dimensions.get("window").height;

const styles = StyleSheet.create({
  cardTextStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 16,
  },
  textStyle: {
    fontSize: deviceWidth < 370 ? 14 : 16,
    fontFamily: "HindSemiBold",
    color: "grey",
  },
});

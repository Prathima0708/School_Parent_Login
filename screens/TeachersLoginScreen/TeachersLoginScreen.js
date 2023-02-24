import { StyleSheet, FlatList, View, Dimensions, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TEACHERS } from "../../components/utils/TeachersDashboard";
import { useLayoutEffect } from "react";
import IconButton from "../../components/UI/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import TeachersCategoryGridTile from "../../components/StudentItem/TeachersCategoryGridTile";
import axios from "axios";
import { subURL } from "../../components/utils/URL's";
import { Image as NativeImage } from "native-base";
import TeachersHome from "./BottomTab/TeachersHome";

var USERNAME, USERID;

const TeachersLoginScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");

  const [showLogoutAlert, setShowLogoutAlert] = useState(true);
  const myRef = useRef(null);

  useEffect(() => {
    const beforeRemoveHandler = async (e) => {
      const action = e.data.action;

      e.preventDefault();

      if (showLogoutAlert) {
        setShowLogoutAlert(false);
        Alert.alert("Logout", "Are you sure you want to logout?", [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              setShowLogoutAlert(true);
            },
          },
          {
            text: "Yes",
            onPress: async () => {
              try {
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("datagroup");
                navigation.dispatch(action);
              } catch (error) {
                console.log(error);
              }
            },
            style: "destructive",
          },
        ]);
      } else {
        (async () => {
          try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("datagroup");
            navigation.dispatch(action);
          } catch (error) {
            console.log(error);
          }
        })();
      }
    };

  const removeListener = navigation.addListener(
      "beforeRemove",
      beforeRemoveHandler
    );

    return () => {
      removeListener();
    };
  }, [navigation, showLogoutAlert]);

  const logoutHandler = () => {
    if (showLogoutAlert) {
      setShowLogoutAlert(false);
      Alert.alert("Logout", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            setShowLogoutAlert(true);
          },
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("datagroup");
              navigation.navigate("LadingScreen", { headerShown: false });
            } catch (error) {
              console.log(error);
            }
          },
          style: "destructive",
        },
      ]);
    } else {
      (async () => {
        try {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("datagroup");
          navigation.navigate("Login", { headerShown: false });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  useEffect(() => {
    if (myRef.current && myRef.current.setNativeProps) {
      const styleObj = {
        borderWidth: 3,
        borderRadius: 100,
        borderColor: "#1E84A4",
      };
      myRef.current.setNativeProps({
        style: styleObj,
      });
    }
  }, [myRef]);

  async function fetchUser() {
    USERNAME = await AsyncStorage.getItem("UserName");

    if (USERNAME !== null) {
      setUser(USERNAME);
    }
  }
  fetchUser();

  async function fetchUserId() {
    USERID = await AsyncStorage.getItem("key");

    if (USERID !== null) {
      setUserId(USERID);
    }
  }
  fetchUserId();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/IsClassteacher/${userId}`);

        let newArray = res.data.map((item) => {
          return {
            value: item.class_name + " - " + item.section,
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={logoutHandler}
            icon="power"
            size={25}
          />
        );
      },
    });
  }, []);

  function renderCategoryItem(itemData) {
    function pressHandler() {
      if (itemData.item.id === "c1") {
        navigation.navigate("TeachersTransport");
      }
      if (itemData.item.id === "c2") {
        navigation.navigate("TeachersCalendar");
      }
      if (itemData.item.id === "c3") {
        navigation.navigate("TeachersNoticeBoard");
      }
      if (itemData.item.id === "c4") {
        navigation.navigate("TeachersAcademics");
      }
      if (itemData.item.id === "c5") {
        navigation.navigate("MyClasses");
      }
      if (itemData.item.id === "c6") {
        navigation.navigate("TeachersLeave", {
          stdId: itemData.item.id,
        });
      }
    }

    return (
      <View style={styles.rootContainer1}>
        <TeachersCategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          icon={itemData.item.icon}
          onPress={pressHandler}
          txtclr={itemData.item.txtclr}
          subTitle={itemData.item.subTitle}
        />
      </View>
    );
  }

  return (
    <>
      <View
        style={[
          { flex: 1 },
          {
            flexDirection: "column",
            backgroundColor: "white",
          },
        ]}
      >
        <View style={{ flex: 0.9 }}>
          <View style={styles.studentItem}>
            <View
              style={{
                padding: 10,
                borderRadius: 100,
              }}
            >
              <NativeImage
                source={{
                  uri: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACv0lEQVR4nO2Zz2sTURDHnxVFUcEKRal5E/E3xZs3RS+9iaJnQbGg/gX+wIMsZGYTRIoeirQgtN2ZbXARqaIgeLJVUNCLoD1pETxUtB68CGobea2N2qZtNrvte8V84XsIZMl8mJk3ebNK1VXX0lK2UNwCKCeAwouAcg1I2jXJJfC5tcWLViqn5XkNGQzaNMprICnNZo3yHnJyWLmoTX7UBMjP5wL41/wDkIuawiPKFUEhbATiV9VDTMsQ8YNdV26us82hALm7VoiykfsdaGr+mRjE2OdWayBAfD4ViEn32QNB7k8NBOWDPZAETV6hT8atzZj5ZkZsF8LGpZ8RklKTF621AqJRXqZYWl+ULQHKrfQywi/sgRBfTgtEo7A1kEwuOJZeRsKz1kCyvhxPLSMUnLQGokmeplda/MQeCPJQehmRNxZB5E6KzX7bGoi5EaaYkVPWQPZ2da0A4seJQVAGrN/lTQAaeSRBk49Yh5gSkPQkyEiPckXgy/6aM+LzAeWSNMr9+CD8SLkm7fU1A/GnGMftV3PnVy4KSJ7FaPIh5ap0jPuJ0yBAfCNGj7QrV5Vpj1abVWgVA7DXmdnxtzJ+sMds38ufUQ5qYtHIw5rk22+/08QBYLDvz/eCNvC5RdlWJh9s18QdE0vpyT1uR9brXj/vc160YaoMNcp3IOnM+uFutajyvAbzWgCQHwLJWIWy+WyCzObCQ5tz4Y6NV4M1xs353p0Tz5F0AvHozOd43MwVTXJURdHyBYvfrGoA5Rwgv038J3H+E20YUC6ku6UvlZYB8WlN8nGhAWA6kPlNlDMmhkQMpiSA5O5iA8DMsrtnYqn9KCUetA5B5d4byHrdq2KDAMl168FTwiGqsbit4olk32NQCLdWnw3kvANBl2axb2Vflb55sPqMVBpYzphHY5xWtoOVOV3T6VVXXf+xfgGvhBsEBNjG/AAAAABJRU5ErkJggg==`,
                }}
                alt="Student Image"
                size="lg"
                resizeMode="contain"
                ref={myRef}
              />
            </View>
            <Text style={[styles.textBase, styles.description]}>
              {user.charAt(0).toUpperCase() + user.slice(1)}
            </Text>
          </View>
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          <FlatList
            data={TEACHERS}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <TeachersHome />
        </View>
      </View>
    </>
  );
};

export default TeachersLoginScreen;

const deviceHieght = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    paddingLeft: "5%",
    paddingRight: "5%",
  },

  rootContainer1: {
    top: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  leftStyle: {
    ...Platform.select({
      ios: {
        marginRight: "2%",
      },
      android: {},
    }),
  },
  title: {
    fontSize: deviceWidth < 370 ? 16 : 18,
    fontFamily: "HindRegular",
  },
  heading: {
    textAlign: "center",
    marginTop: "4%",
    fontWeight: "bold",
    color: "gray",
    fontFamily: "HindRegular",
    fontSize: deviceWidth < 370 ? 16 : 20,
  },
  studentItem: {
    width: "80%",
    marginHorizontal: "10%",
    bottom: deviceHieght < 600 ? "2%" : "2%",
    alignItems: "center",
    marginTop: deviceHieght < 600 ? "2%" : "5%",
    justifyContent: "space-between",
  },
  textBase: {
    color: "#0D98BA",
    fontFamily: "HindRegular",
  },
  description: {
    fontSize: deviceWidth < 370 ? 18 : 20,
    fontFamily: "HindRegular",
    marginBottom: "2%",
    fontWeight: "bold",
  },

  image: {
    height: 70,
    width: 70,
  },
});

import { Alert, FlatList, StyleSheet, View } from "react-native";
import { CATEGORIES } from "../../components/utils/DummyData";
import IconButton from "../../components/UI/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLayoutEffect } from "react";
import ParentCateogryGridTile from "../../components/StudentItem/ParentCateogryGridTile";
import ParentsHome from "./BottomTab/ParentsHome";

function StudentCategories({ navigation }) {

  async function logoutHandler() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",

        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            const value = await AsyncStorage.removeItem("token");

            if (value == null) {
              navigation.navigate("Login");
            } else {
            }
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  }

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
      if (itemData.item.id === "c5") {
        navigation.navigate("ParentsProfile", {
          stdId: itemData.item.id,
        });
      } else if (itemData.item.id === "c1") {
        navigation.navigate("Transport", {
          stdId: itemData.item.id,
        });
      } else if (itemData.item.id === "c2") {
        navigation.navigate("Calender", {
          stdId: itemData.item.id,
        });
      } else if (itemData.item.id === "c3") {
        navigation.navigate("NoticeBoard", {
          stdId: itemData.item.id,
        });
      } else if (itemData.item.id === "c4") {
        navigation.navigate("Academics", {
          stdId: itemData.item.id,
        });
      } else if (itemData.item.id === "c6") {
        navigation.navigate("Leave", {
          stdId: itemData.item.id,
        });
      }
    }
    return (
      <View style={styles.rootContainer}>
        <ParentCateogryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          icon={itemData.item.icon}
          onPress={pressHandler}
          txtclr={itemData.item.txtclr}
        />
      </View>
    );
  }
  return (
    <View style={[{ flex: 1, flexDirection: "column" }]}>
      <View style={{ flex: 2, backgroundColor: "white", alignItems: "center" }}>
        <FlatList
          style={styles.test}
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          numColumns={2}
        />
      </View>
      <View style={{ flex: 0.1 }}>
        <ParentsHome />
      </View>
    </View>
  );
}
export default StudentCategories;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: "3%",
  },
});

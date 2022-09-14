import { FlatList, StyleSheet, View } from "react-native";
import CategoryGridTile from "../../components/StudentItem/CategoryGridTile";
import { CATEGORIES } from "../../components/utils/DummyData";
import IconButton from "../../components/UI/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import ParentCateogryGridTile from "../../components/StudentItem/ParentCateogryGridTile";

function StudentCategories({ navigation }) {
  async function logoutHandler() {
    try {
      // const value = await AsyncStorage.getItem('token');
      const value = await AsyncStorage.removeItem("token");
      if (value == null) {
        console.log("Data removed");
        navigation.navigate("Login");
      } else {
        console.log("Data not removed");
      }

      // if (value == null) {
      //   console.log("Token is removed"+value)
      //   //  AsyncStorage.removeItem("token");
      //   //  console.log(value)
      //   //  navigation.navigate("Login");
      // }
    } catch (error) {
      // Error retrieving data
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          // <LogoutButton onPress={LogoutBtnPressHandler}>Test</LogoutButton>
          <IconButton
            onPress={logoutHandler}
            icon="log-out-outline"
            size={30}
          />
        );
      },
    });
  }, []);
  function renderCategoryItem(itemData) {
    function pressHandler() {
      if (itemData.item.id === "c5") {
        // navigation.navigate("Leave", {
        //   stdId: itemData.item.id,
        // });
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
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <FlatList
        style={styles.test}
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </View>
  );
}
export default StudentCategories;

const styles = StyleSheet.create({
  // root: {
  //   width: "50%",
  //   display: "flex",
  // },
  rootContainer: {
    //backgroundColor: "white",
    flex: 1,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    //padding: 32,
  },
  test: {
    top: 25,
  },
});

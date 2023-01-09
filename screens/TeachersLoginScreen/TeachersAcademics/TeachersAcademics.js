import { FlatList, StyleSheet, Text, View } from "react-native";
import CategoryGridTile from "../../../components/StudentItem/CategoryGridTile";

import { TEACHERSACADEMICS } from "../../../components/utils/TeachAcademics";
import TeachersHome from "../BottomTab/TeachersHome";

function TeachersAcademics({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      if (itemData.item.id === "c1") {
        navigation.navigate("TeachersHomework", {
          stdId: itemData.item.id,
        });
      }
      if (itemData.item.id === "c2") {
        navigation.navigate("TeachersTimetable", {
          stdId: itemData.item.id,
        });
      }
      if (itemData.item.id === "c3") {
        navigation.navigate("TeachersAttendance", {
          stdId: itemData.item.id,
        });
      }

      if (itemData.item.id === "c4") {
        navigation.navigate("TeachersMarksheet", {
          stdId: itemData.item.id,
        });
      }
      if (itemData.item.id === "c5") {
        navigation.navigate("TeachersLeave", {
          stdId: itemData.item.id,
        });
      }
    }
    return (
    
      <View style={styles.rootContainer}>
        <CategoryGridTile
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
    <>
      <View style={{ backgroundColor: "white", height: "94.5%" }}>
        <FlatList
          style={styles.test}
          data={TEACHERSACADEMICS}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          // horizontal={true}
          numColumns={2}
         
        />
      </View>
      <TeachersHome />
    </>
  );
}
export default TeachersAcademics;

const styles = StyleSheet.create({
  root: {
    // backgroundColor: "white",
    //marginVertical:40,
    //marginTop:10,
     flex:1,
    marginHorizontal: 5,
    marginVertical: 5,
    // width: 180,
    left: 25,
  },
  test: {
  //  top: 25,
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  rootContainer: {
 //   flex: 1,
    top: 3,
    justifyContent: "center",
    alignItems: "center",
    //padding: 32,
  },
});

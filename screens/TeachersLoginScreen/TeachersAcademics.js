import { FlatList, StyleSheet, Text, View } from "react-native";
import CategoryGridTile from "../../components/StudentItem/CategoryGridTile";

import { TEACHERSACADEMICS } from "../../components/utils/TeachAcademics";

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
        navigation.navigate("Attendance", {
          stdId: itemData.item.id,
        });
      }
    }
    return (
      <View style={styles.root}>
        <CategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          icon={itemData.item.icon}
          onPress={pressHandler}
        />
      </View>
    );
  }
  return (
    <FlatList
      data={TEACHERSACADEMICS}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      //    numColumns={2}
    />
  );
}
export default TeachersAcademics;

const styles = StyleSheet.create({
  root: {
    // marginHorizontal: 50,
    width: "70%",
    // flexDirection: "row",

    flex: 1,
    flexDirection: "row",

    // justifyContent: "center",
    // alignItems: "center",
  },
});

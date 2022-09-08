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

      if (itemData.item.id === "c6") {
        navigation.navigate("TeachersNoticeBoard", {
          stdId: itemData.item.id,
        });
      }
    }
    return (
      //     <ZigzagView
      //   backgroundColor="#CCC"
      //   surfaceColor="#FFF"
      //   style={{}}

      // >
      <View style={styles.root}>
        <CategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          icon={itemData.item.icon}
          onPress={pressHandler}
        />
      </View>
      // </ZigzagView>
    );
  }
  return (
    <FlatList
      style={styles.test}
      data={TEACHERSACADEMICS}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      // horizontal={true}
      numColumns={2}
    />
  );
}
export default TeachersAcademics;

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  test: {
    // textAlign: "center",
    top: 120,
    left: 15,
    width:400,
  },
});

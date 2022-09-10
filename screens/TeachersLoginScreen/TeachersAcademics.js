import { FlatList, StyleSheet, Text, View } from "react-native";
import CategoryGridTile from "../../components/StudentItem/CategoryGridTile";

import { TEACHERSACADEMICS } from "../../components/utils/TeachAcademics";
import TeachersHome from "./TeachersHome";

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
          txtclr={itemData.item.txtclr}
        />
      </View>
      // </ZigzagView>
    );
  }
  return (
    <>
      <FlatList
        style={styles.test}
        data={TEACHERSACADEMICS}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        // horizontal={true}
        numColumns={2}
      />
      <TeachersHome />
    </>
  );
}
export default TeachersAcademics;

const styles = StyleSheet.create({
  root: {
    //marginVertical:40,
    //marginTop:10,
    // flex:1,
    marginHorizontal: 5,
    marginVertical: 5,
    // width: 180,
    left:25
  },
  test: {
    top: 25,
  },
});

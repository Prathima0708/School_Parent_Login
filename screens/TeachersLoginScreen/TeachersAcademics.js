import { FlatList, StyleSheet, Text, View } from "react-native";
import CategoryGridTile from "../../components/StudentItem/CategoryGridTile";
<<<<<<< HEAD
import TeachersHome from "./TeachersHome";
=======
import ZigzagView from "react-native-zigzag-view"
>>>>>>> ca80fe1714fa2a8ce73c25761c0c36cb1a8b0111
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
<<<<<<< HEAD
    <>
      <FlatList
        data={TEACHERSACADEMICS}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        // horizontal={true}
        numColumns={2}
        // contentContainerStyle={{ margin: 12 }}
      />
    </>
=======
    <FlatList style={styles.test}
      data={TEACHERSACADEMICS}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      // horizontal={true}
      numColumns={2}
    />
>>>>>>> ca80fe1714fa2a8ce73c25761c0c36cb1a8b0111
  );
}
export default TeachersAcademics;

const styles = StyleSheet.create({
  root: {
<<<<<<< HEAD
    height: 150,
    width: 150,
    marginTop: 20,
    flex: 1,
    //justifyContent: "center",
=======
    // flex: 1,
    justifyContent: "center",
>>>>>>> ca80fe1714fa2a8ce73c25761c0c36cb1a8b0111
    alignItems: "center",
  },
  test: {
    // textAlign: "center",
    top:120,
    left:15,
    
  },
});

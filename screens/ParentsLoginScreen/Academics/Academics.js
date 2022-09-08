import { FlatList, StyleSheet, View } from "react-native";
import CategoryGridTile from "../../../components/StudentItem/CategoryGridTile";
import { ACADEMICS } from "../../../components/utils/Academics";

function Academics({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      if (itemData.item.id === "c1") {
        navigation.navigate("Homework", {
          stdId: itemData.item.id,
        });
      }
      if (itemData.item.id === "c2") {
        navigation.navigate("TimeTable", {
          stdId: itemData.item.id,
        });
      }
      if (itemData.item.id === "c3") {
        navigation.navigate("Attendance", {
          stdId: itemData.item.id,
        });
      }
      if (itemData.item.id === "c4") {
        navigation.navigate("ReportCard", {
          stdId: itemData.item.id,
        });
      }
      if (itemData.item.id === "c5") {
        navigation.navigate("Leave", {
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
    <FlatList style={styles.test}
      data={ACADEMICS}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}
export default Academics;

const styles = StyleSheet.create({
  root: {
    width: "50%",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //padding: 32,
  },
  test: {
    // textAlign: "center",
    top:20,
  },
});

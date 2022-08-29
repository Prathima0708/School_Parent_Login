import { FlatList, StyleSheet } from "react-native";
import CategoryGridTile from "../../components/StudentItem/CategoryGridTile";
import { CATEGORIES } from "../../components/utils/DummyData";

function StudentCategories({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      if (itemData.item.id === "c5") {
        navigation.navigate("Leave", {
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
      }
    }
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        icon={itemData.item.icon}
        onPress={pressHandler}
      />
    );
  }
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}
export default StudentCategories;

const styles = StyleSheet.create({
  profile: {},
});

import { FlatList } from "react-native";
import CategoryGridTile from "../components/StudentItem/CategoryGridTile";
import { CATEGORIES } from "../components/utils/DummyData";

function StudentCategories({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      // if (itemData.item.id === "c1") {
      navigation.navigate("StudentsOverview", {
        stdId: itemData.item.id,
      });
      // }
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

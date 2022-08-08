import { FlatList } from "react-native";
import CategoryGridTile from "../components/StudentItem/CategoryGridTile";
import { CATEGORIES } from "../components/utils/DummyData";

function StudentCategories({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("StudentsOverview");
    }
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        //  image={itemData.item.image}
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

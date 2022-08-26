import { FlatList } from "react-native";
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
      data={ACADEMICS}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}
export default Academics;

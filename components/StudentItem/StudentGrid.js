import { StyleSheet, View } from "react-native";
import SingleGrid from "./SingleGrid";

function StudentGrid() {
  return (
    <View style={styles.menuContainer}>
      <SingleGrid />
      <SingleGrid />
    </View>
  );
}

export default StudentGrid;

const styles = StyleSheet.create({
  menuContainer: {
    height: "40%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

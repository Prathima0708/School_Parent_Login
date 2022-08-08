import { Image, StyleSheet, View } from "react-native";

function SingleGrid({ itemImage }) {
  return (
    <View style={styles.menuItem}>
      <Image source={itemImage} style={styles.image} />
    </View>
  );
}
export default SingleGrid;

const styles = StyleSheet.create({
  menuItem: {
    width: "33.333333%",
    height: "50%",
    padding: 20,
    backgroundColor: "#ccc",
    borderColor: "#000",
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
    borderColor: "white",
    borderWidth: 3,
  },
});

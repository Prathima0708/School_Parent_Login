import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function CategoryGridTile({ title, color, icon, onPress }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [styles.buttton, pressed && styles.pressed]}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, , { backgroundColor: color }]}>
          {/* <View>
            <Image source={image} style={styles.image} />
          </View> */}
          {/* <Ionicons icon={icon} size={24} color="black" style={styles.icon} /> */}
          <Image source={{ uri: icon }} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}
export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    backgroundColor: "white",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  icon: {
    height: "50%",
    width: "50%",
    // borderColor: "black",
    borderWidth: 3,
  },
  pressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttton: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

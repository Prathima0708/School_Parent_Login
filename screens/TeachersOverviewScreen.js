import { StyleSheet, Text, View } from "react-native";
import { className, studentId } from "../components/StudentItem/StudentItem";

function TeachersOverviewScreen() {
  return (
    <View style={styles.container}>
      <Text>Teachers Overview Screen</Text>
    </View>
  );
}
export default TeachersOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

import { StyleSheet, Text, View } from "react-native";
import { className, studentId } from "../components/StudentItem/StudentItem";
import TransportScreen from "./TransportScreen";

function TeachersOverviewScreen() {
  return (
    <View style={styles.container}>
      {/* <Text>Teachers Overview Screen</Text> */}
      <TransportScreen />
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

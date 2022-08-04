import { StyleSheet, Text, View } from "react-native";

function StudentItem({ student_name, class_name, father_name }) {
  return (
    <View style={styles.studentItem}>
      <View style={styles.studentItem}>
        <Text style={[styles.textBase, styles.description]}>
          <Text>Student Name:</Text>
          {student_name}
        </Text>
        <Text style={[styles.textBase, styles.description]}>
          <Text>Class:</Text>
          {class_name}
        </Text>
      </View>
      {/* <View style={styles.amountContainer}>
        <Text style={styles.amount}>{father_name}</Text>
      </View> */}
    </View>
  );
}
export default StudentItem;

const styles = StyleSheet.create({
  studentItem: {
    width: "100%",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#3e04c3",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: "#39324a",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: "#e4d9fd",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  imageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  image: {
    color: "#3e04c3",
    fontWeight: "bold",
  },
});

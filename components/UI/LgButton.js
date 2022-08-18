import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { TouchableOpacity } from "react-native";

function LgButton({ children, onPress }) {
  const [selected, setSelected] = useState(false);
  return (
    <Pressable 
      style={({ pressed }) => [styles.button, pressed && styles.pressed ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  //   <View style={{ width: "30%", alignItems: "center", marginTop: 20 }}>
  //   <TouchableOpacity
  //     onPress={() => setSelected(selected)}
  //     style={{ backgroundColor: selected ? "red" : "transparent" }}
  //   >
  //     <View>
  //       <Text style={styles.buttonText}>{children}</Text>
  //     </View>
  //   </TouchableOpacity>
  // </View>
  );
}

export default LgButton;

const styles = StyleSheet.create({
  button: {
    // borderRadius: 6,
    borderTopLeftRadius:6,
    borderTopRightRadius:6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor:Colors.primary800,
    // elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width:'45%',
    // marginTop:10,
    borderTopWidth:2,
    borderRightWidth:2,
    borderLeftWidth:2
  },
  pressed: {
    opacity: 0.7,
    backgroundColor:'black'
  },
  buttonText: {
    textAlign: "center",
    color:'white',
    fontSize: 16,
    fontWeight: "bold",
  },
});

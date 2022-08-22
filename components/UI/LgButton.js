import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { TouchableOpacity } from "react-native";

function LgButton({ children, onPress }) {

  const [color,setColor]=useState([]);
  const [showLine,setShowLine]=useState(true);
  function btnPressedIn(){
    var select=children;
    setColor(select);

    switch (color[0]) {
      case "Parents":
        console.log("p")
        break;
      case "Teachers":
        console.log("t")
        break;
      default:
        console.log("nothing sleected")
        break;
    }
  }

  return (
    <Pressable
    style={[styles.button,showLine]}
      onPress={onPress} onPressIn={btnPressedIn}
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
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    // elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "49%",
    borderColor:'#4169E1',
    // marginTop:10,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
  },
  testColor:{
    backgroundColor:'blue'
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

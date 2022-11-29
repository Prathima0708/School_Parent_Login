// import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
// import React, { useState } from "react";
// import { studentId, StudentRegNo } from "./StudentProfile";
// import { Ionicons } from "@expo/vector-icons";
// import Input from "../../../components/UI/Input";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import UnderlinedInput from "../../../components/UI/UnderlinedInput";
// import Button from "../../../components/UI/Button";

// const StudentDetails = () => {
//   const route = useRoute();
//   const navigation = useNavigation();

//   const [regno, setregno] = useState(route.params.stdreg.toString());
//   const [name, setName] = useState(route.params.stdname);
//   const [classname, setClassName] = useState(
//     route.params.stdclass + "-" + route.params.stdsection
//   );

//   function regNoChangeHandler(enteredValue) {
//     setregno(enteredValue);
//   }
//   function nameChangeHandler(enteredValue) {
//     setName(enteredValue);
//   }
//   function classChangeHandler(enteredValue) {
//     setClassName(enteredValue);
//   }
//   function cancelHandler() {
//     navigation.navigate("ParentsProfile");
//   }
//   return (
//     // <View>
//     //   <View style={styles.menuItem}>
//     //     <Text style={styles.menuItemText}>Edit Student Information</Text>
//     //   </View>
//     //   <Input value={regno} onChangeText={regNoChangeHandler} />
//     //   <Input value={name} onChangeText={nameChangeHandler} />
//     //   <Input value={classname} onChangeText={classChangeHandler} />
//     //   <View style={styles.btnSubmit}>
//     //     <Button onPress={cancelHandler}>Cancel</Button>
//     //     <Button>Update</Button>
//     //   </View>
//     // </View>

//     <View
//       style={[
//         styles.container,
//         {
//           flexDirection: "column",
//         },
//       ]}
//     >
//       <View style={{ flex: 0.5 }}>
//         <Text style={styles.menuItemText}> Student Information</Text>
//       </View>

//       <View style={{ flex: 5 }}>
//         <View
//           style={[
//             styles.container1,
//             {
//               flexDirection: "row",
//             },
//           ]}
//         >
//           <View style={{ flex: 5 }}>
//             <View style={styles.heading}>
//               <Text style={styles.headingText}>Name</Text>
//             </View>
//             <View style={styles.heading}>
//               <Text style={styles.headingText}>Reg No</Text>
//             </View>
//           </View>
//           <View style={{ flex: 5 }}>
//             <View style={styles.heading}>
//               <Text style={styles.headingText}>{name}</Text>
//             </View>
//             <View style={styles.heading}>
//               <Text style={styles.headingText}>{regno}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default StudentDetails;
// const deviceWidth = Dimensions.get("window").width;

// const styles = StyleSheet.create({
//   menuItem: {
//     flexDirection: "row",
//     paddingVertical: 15,
//     //paddingHorizontal: 30,
//   },
//   menuItemText: {
//     marginLeft: 18,
//     fontFamily: "HindSemiBold",
//     fontSize: 20,
//     lineHeight: 26,
//   },
//   btnSubmit: {
//     flexDirection: "row",
//     marginTop: 30,

//     width: "55%",
//     marginLeft: deviceWidth < 370 ? 170 : 10,
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   container1: {
//     flex: 2,
//     // padding: 10,
//   },
//   heading: {
//     padding: 20,
//   },
//   headingText: {
//     fontFamily: "HindMedium",
//     fontSize: 18,
//     color: "gray",
//     borderBottomColor: "black",
//     borderBottomWidth: 1,
//   },
// });

import { View, Text } from "react-native";
import React from "react";

const StudentDetails = () => {
  return (
    <View>
      <Text>StudentDetails</Text>
    </View>
  );
};

export default StudentDetails;

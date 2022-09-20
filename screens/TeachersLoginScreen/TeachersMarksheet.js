// import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from "react-native";
// import React, { useEffect } from "react";
// import { AntDesign } from "@expo/vector-icons";
// import { useState } from "react";
// import { useRef } from "react";

// import Button from "../../components/UI/Button";
// import axios from "axios";
// import { Keyboard } from "react-native";
// import BgButton from "../../components/UI/BgButton";
// import TeachersHome from "./TeachersHome";
// import Input from "../../components/UI/Input";
// const TeachersMarksheet = () => {
//   const [studentname, setEnteredStudentName] = useState("");
//   const [enteredStudentnameTouched,setEnteredStudentnameTouched]=useState(false)
//   const enteredStudentnameIsValid=studentname.trim()!=='';
//   const studentnameInputIsInValid=!enteredStudentnameIsValid && enteredStudentnameTouched;

//   const [overallperct, setEnteredOverallPerct] = useState("");
//   const [enteredOverallPercentageTouched,setEnteredOverallPercentageTouched]=useState(false)
//   const enteredOverallPercentageIsValid=overallperct.trim()!=='';
//   const overallpercentageInputIsInValid=!enteredOverallPercentageIsValid && enteredOverallPercentageTouched;

//   const [remark, setEnteredRemark] = useState("");
//   const [enteredReamrkTouched,setEnteredReamrkTouched]=useState(false)
//   const enteredReamrkIsValid=remark.trim()!=='';
//   const remarkInputIsInValid=!enteredReamrkIsValid && enteredReamrkTouched;

//   const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");

//   useEffect(() => {
//     const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
//       setKeyboardStatus("Keyboard Shown");
//     });
//     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
//       setKeyboardStatus("Keyboard Hidden");
//     });

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   function studentNameChangeHandler(enteredValue) {
//     setEnteredStudentName(enteredValue);
//   }
//   function percentageChangeHandler(enteredValue) {
//     setEnteredOverallPerct(enteredValue);
//   }
//   function remarkChangeHandler(enteredValue) {
//     setEnteredRemark(enteredValue);
//   }

//   function buttonPressedHandler() {
//     // console.log(UserId);
//     const FormData = {
//       name: studentname,
//       value1: overallperct,
//       value2: remark,
//     };
//     console.log(FormData);

//     setEnteredStudentnameTouched(true);
//     setEnteredOverallPercentageTouched(true);
//     setEnteredReamrkTouched(true);

//     if(!enteredStudentnameIsValid){
//       return;
//     }
//     if(!enteredOverallPercentageIsValid){
//       return;
//     }
//     if(!enteredReamrkIsValid){
//       return;
//     }
//     else{
//       async function storeData() {
//         try {
//           let headers = {
//             "Content-Type": "application/json; charset=utf-8",
//           };

//           const resLogin = await axios.post(
//             `http://10.0.2.2:8000/school/AddmoreMarksheet_list/`,
//             FormData,
//             {
//               headers: headers,
//             }
//           );
//           // const token = resLogin.data.token;
//           // const userId = resLogin.data.user_id;
//           console.log(resLogin.data);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       storeData();
//       setEnteredStudentName("");
//       setEnteredOverallPerct("");
//       setEnteredRemark("");
//       setEnteredStudentnameTouched(false);
//       setEnteredOverallPercentageTouched(false);
//       setEnteredReamrkTouched(false);
//     }
//   }

//   function studentnameBlurHandler(){
//     setEnteredStudentnameTouched(true);
//   }
//   function overallpercentageBlurHandler(){
//     setEnteredOverallPercentageTouched(true);
//   }
//   function remarkBlurHandler(){
//     setEnteredReamrkTouched(true);
//   }

//   return (
//     <>
//       {/* <View style={styles.BtnContainer}>
//         <BgButton>Add Marksheet</BgButton>
//       </View> */}

//       <ScrollView>
//         <View style={styles.inputForm}>
//           <Input
//             placeholder="Student Name"
//             onChangeText={studentNameChangeHandler}
//             blur={studentnameBlurHandler}
//             value={studentname}
//             onSubmitEditing={Keyboard.dismiss}
//             style={studentnameInputIsInValid && styles.errorBorderColor}
//           />
//           {studentnameInputIsInValid && (
//               <Text style={{ color: "red",left:20 }}>Enter student name</Text>
//           )}

//           <Input
//              placeholder="Overall Percentage"
//              onChangeText={percentageChangeHandler}
//              blur={overallpercentageBlurHandler}
//              value={overallperct}
//              onSubmitEditing={Keyboard.dismiss}
//              style={overallpercentageInputIsInValid && styles.errorBorderColor}
//           />
//           {overallpercentageInputIsInValid && (
//               <Text style={{ color: "red",left:20 }}>Enter overall percentage</Text>
//           )}

//           <Input
//             placeholder="Remark"
//             onChangeText={remarkChangeHandler}
//             blur={remarkBlurHandler}
//             value={remark}
//             onSubmitEditing={Keyboard.dismiss}
//             style={remarkInputIsInValid && styles.errorBorderColor}
//           />
//           {remarkInputIsInValid && (
//               <Text style={{ color: "red",left:20 }}>Enter remark</Text>
//             )}

//           <View style={styles.btnSubmit}>
//             <Button onPress={buttonPressedHandler}>Add Marksheet</Button>
//           </View>
//         </View>
//       </ScrollView>
//       {keyboardStatus == "Keyboard Hidden" && (
//         <View style={styles.home}>
//           <TeachersHome />
//         </View>
//       )}
//     </>
//   )}

// export default TeachersMarksheet;

// const styles = StyleSheet.create({
//   BtnContainer: {
//     fontSize: 24,
//   },
//   home: {
//     marginTop: 29,
//   },
//   root: {
//     backgroundColor: "#EBECFO",
//   },
//   inputForm: {
//     padding: 20,
//     paddingTop: 5,
//   },
//   errorBorderColor:{
//     color: "black",
//     borderBottomWidth: 1,
//     borderColor: "red",
//     padding: 10,
//     margin: 15,
//     paddingVertical: 5,
//     borderRadius: 5,
//     fontSize: 18,
//   },
//   btnSubmit: {
//     marginTop: 27,
//     marginBottom: 39,
//   },
// });

// import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
// import React, { useRef, useState } from "react";
// import { AntDesign } from "@expo/vector-icons";

// const TeachersMarksheet = () => {
//   const [textValue, setTextValue] = useState("");

//   const [numInputs, setNumInputs] = useState(1);

//   const refInputs = useRef([textValue]);

//   const inputs = [];
//   for (let i = 0; i < numInputs; i++) {
//     inputs.push(
//       <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
//         <Text>{i + 1}.</Text>
//         <TextInput
//           onChangeText={(value) => setInputValue(i, value)}
//           value={refInputs.current[i]}
//           placeholder="placeholder"
//         />
//         <TextInput
//           onChangeText={(value) => setInputValue(i, value)}
//           value={refInputs.current[i]}
//           placeholder="tue"
//         />
//         {/* To remove the input */}
//         <Pressable onPress={() => removeInput(i)} style={{ marginLeft: 5 }}>
//           <AntDesign name="minuscircleo" size={20} color="red" />
//         </Pressable>
//       </View>
//     );
//   }

//   const setInputValue = (index, value) => {
//     // first, we are storing input value to refInputs array to track them
//     const inputs = refInputs.current;
//     inputs[index] = value;
//     // we are also setting the text value to the input field onChangeText
//     setTextValue(value);
//   };

//   const addInput = () => {
//     // add a new element in our refInputs array
//     refInputs.current.push("");
//     // increase the number of inputs
//     setNumInputs((value) => value + 1);
//   };

//   const removeInput = (i) => {
//     // remove from the array by index value
//     refInputs.current.splice(i, 1)[0];
//     // decrease the number of inputs
//     setNumInputs((value) => value - 1);
//   };
//   return (
//     <View>
//       <ScrollView>
//         {inputs}
//         <Pressable onPress={addInput}>
//           <Text style={{ color: "white", fontWeight: "bold" }}>
//             + Add a new input
//           </Text>
//         </Pressable>
//         <View style={{ marginTop: 25 }}>
//           <Text>You have answered:</Text>
//           {refInputs.current.map((value, i) => {
//             return <Text key={i}>{`${i + 1} - ${value}`}</Text>;
//           })}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default TeachersMarksheet;

// import { View, Text, TextInput, Button } from "react-native";
// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";

// const TeachersMarksheet = () => {
//   const [inputFields, setInputFields] = useState([
//     { id: uuidv4(), firstName: "", lastName: "" },
//   ]);

//   const handleSubmit = () => {
//     //   e.preventDefault();
//     console.log("InputFields", inputFields);
//   };

//   const handleChangeInput = (value, i) => {
//     const newInputFields = [...inputFields];
//     newInputFields[i] = value;

//     setInputFields(newInputFields);
//   };

//   // const handleChangeInput = (name, value) => {
//   //   setInputFields({
//   //     ...inputFields,
//   //     [name]: value,
//   //   });
//   // };

//   // const inputHandler = (text, key) => {
//   //   const _inputs = [...inputs];
//   //   _inputs[key].value = text;
//   //   _inputs[key].key = key;
//   //   setInputs(_inputs);
//   // };

//   const handleAddFields = () => {
//     setInputFields([
//       ...inputFields,
//       { id: uuidv4(), firstName: "", lastName: "" },
//     ]);
//   };
//   const handleRemoveFields = (id) => {
//     const values = [...inputFields];
//     values.splice(
//       values.findIndex((value) => value.id === id),
//       1
//     );
//     setInputFields(values);
//   };
//   return (
//     <View>
//       {inputFields.map((inputField) => (
//         <View key={inputField.id}>
//           <TextInput
//             value={inputField.firstName}
//             onChangeText={(event) => handleChangeInput(inputField.id, event)}
//           />
//           {/* <TextInput
//             value={inputField.lastName}
//             onChangeText={(event) => handleChangeInput(inputField.id, event)}
//           /> */}
//           <TextInput
//             value={inputField.lastName}
//             onChangeText={(event) => handleChangeInput(inputField.id, event)}
//           />
//           <Button
//             title="Remove"
//             // disabled={inputFields.length === 1}
//             onPress={() => handleRemoveFields(inputField.id)}
//           />

//           <Button title="Add" onPress={handleAddFields} />
//         </View>
//       ))}
//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default TeachersMarksheet;

import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { useState } from "react";

const TeachersMarksheet = () => {
  const [formFields, setFormfileds] = useState([{ monday: "", tuesday: "" }]);
  const handleFormChange = (text, index) => {
    // console.log(index, text);
    let data = [...formFields];
    data[index].monday = monday;
    data[index].tuesday = tuesday;
  };
  return (
    <>
      <View>
        {formFields.map((form, index) => {
          return (
            <View key={index}>
              <TextInput
                placeholder="Monday"
                onChangeText={(text) => handleFormChange(text, index)}
                value={form.monday}
              />
              <TextInput
                value={form.tuesday}
                placeholder="Tuesday"
                onChangeText={(text) => handleFormChange(text, index)}
              />
            </View>
          );
        })}

        <Button title="add more" />
        <Button title="submit" />
      </View>
    </>
  );
};

export default TeachersMarksheet;

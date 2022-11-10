import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Input from "../../../components/UI/Input";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../../components/UI/Button";

const EditCalendar = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  console.log("this is from edit calendar", route.params.id);

  function updateHandler() {
    navigation.navigate("TeachersCalendar", {});
  }
  function cancelHandler() {}
  return (
    <View>
      <Input value={route.params.title} />
      <Input value={route.params.desc} />
      <Input value={route.params.fromtext} />
      <Input value={route.params.totext} />

      <View style={styles.btnSubmit1}>
        <Button onPress={updateHandler}>Update</Button>
      </View>

      <View style={styles.cancel}>
        <Button onPress={cancelHandler}>Cancel</Button>
      </View>
    </View>
  );
};

export default EditCalendar;

const styles = StyleSheet.create({
  btnSubmit1: {
    marginTop: 90,
    marginBottom: 30,
    marginLeft: 190,
    width: "50%",
  },
  cancel: {
    marginTop: -140,
    marginLeft: -15,
    width: "50%",
  },
});

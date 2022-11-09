import { View, Text } from "react-native";
import React, { useState } from "react";
import Input from "../../../components/UI/Input";
import { useRoute } from "@react-navigation/native";

const EditTransport = () => {
  const route = useRoute();
  const [vehicleno, setEnteredVehicleNo] = useState("");

  const [type, setEnteredType] = useState("");

  const [drivername, setEnteredDriverName] = useState("");

  const [mobile, setEnteredMobile] = useState("");

  const [routename, setEnteredRouteName] = useState("");

  const [stopname, setEnteredStopName] = useState("");

  const [busNumber, setEnteredBusNumber] = useState(route.params.busno);

  return (
    <View>
      <Input value={busNumber} />
    </View>
  );
};

export default EditTransport;

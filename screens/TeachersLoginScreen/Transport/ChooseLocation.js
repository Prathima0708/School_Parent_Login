import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import AddressPickup from "./AddressPickup";
import CustomBtn from "../../../components/UI/CustomBtn";
import { useNavigation } from "@react-navigation/native";

const ChooseLocation = (props) => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    pickupCords: {},
    destinationCords: {},
  });
  const { pickupCords, destinationCords } = state;

  const onDonePresshandler = () => {
    // props.route.params.getCordinates({
    //   pickupCords,
    //   destinationCords,
    // });
    navigation.goBack();
  };

  const fetchAddressCords = (lat, lng) => {
    console.log("latitude", lat);
    console.log("longitude", lng);
    setState({
      ...state,
      pickupCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  const fetchDestinationCords = (lat, lng) => {
    console.log("latitude", lat);
    console.log("longitude", lng);
    setState({
      ...state,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  console.log("pickupCords", pickupCords);
  console.log("destination cords", destinationCords);
  console.log("props", props);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: "white", flex: 1, padding: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <AddressPickup
          placeholdertext="Enter Pickup Location"
          fetchAddress={fetchAddressCords}
        />
        <View style={{ marginBottom: 16 }} />
        <AddressPickup
          placeholdertext="Enter Destination Location"
          fetchAddress={fetchDestinationCords}
        />
        <CustomBtn
          btnText="Done"
          btnStyle={{ marginTop: 24 }}
          onPress={onDonePresshandler}
        />
      </ScrollView>
    </View>
  );
};

export default ChooseLocation;

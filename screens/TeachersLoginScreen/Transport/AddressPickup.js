import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const AddressPickup = ({ placeholdertext, fetchAddress }) => {
  const onPressAddressHandler = (data, details) => {
    console.log("details", details);

    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    fetchAddress(lat, lng);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <GooglePlacesAutocomplete
        placeholder={placeholdertext}
        onPress={onPressAddressHandler}
        fetchDetails={true}
        query={{
          key: "AIzaSyAUSeU7kuqfNJ_vpxmO1rO9gEOkSGWEpgQ",
          language: "en",
        }}
        styles={{
          textInputContainer: styles.containerStyle,
          textInput: styles.textInputstyle,
        }}
      />
    </View>
  );
};

export default AddressPickup;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
  },
  textInputstyle: {
    height: 48,
    color: "black",
    fontSize: 16,
    backgroundColor: "#F3F3F3",
  },
});

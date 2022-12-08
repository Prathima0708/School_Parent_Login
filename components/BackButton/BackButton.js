import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text as NativeText } from "native-base";

function BackButton({children,onPress}){

    return(
        <View style={[{flex:1}, {flexDirection: "row",left:'3%'}]}>
            <View style={{ flex: 0.1 }} >
                <Ionicons
                  name="chevron-back"
                  size={25}
                  color="black"
                  onPress={onPress}
                />
            </View>
            <View style={{ flex: 1 }} >
                <NativeText bold fontSize={16}>Back</NativeText>
            </View>
        </View>
    )
}

export default BackButton;
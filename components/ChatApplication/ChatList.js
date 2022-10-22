// import { View, Text, StyleSheet, Pressable } from "react-native";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// export var selectedUserId;
// const ChatList = ({ username, id }) => {
//   const navigation = useNavigation();
//   function navigateHandler() {
//     console.log(id);
//     selectedUserId = id;
//     navigation.navigate("SingleUser");
//   }
//   return (
//     <Pressable onPress={navigateHandler.bind(this, id)}>
//       <View style={styles.ChatItem}>
//         <View style={styles.ChatItem}>
//           <Text style={[styles.textBase, styles.description]}>{username}</Text>
//         </View>
//       </View>
//     </Pressable>
//   );
// };

// export default ChatList;

// const styles = StyleSheet.create({
//   ChatItem: {
//     width: "95%",
//     marginLeft: 5,
//     overflow: "hidden",
//     padding: 5,
//     marginVertical: 8,
//     backgroundColor: "#9eecff",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     borderRadius: 16,
//   },
//   textBase: {
//     color: "black",
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 4,
//     fontWeight: "bold",
//   },
// });

import { View } from "react-native";
export var selectedUserId;
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Box,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";

const ChatList = ({ username, id }) => {
  const navigation = useNavigation();
  function navigateHandler() {
    console.log(id);
    selectedUserId = id;
    navigation.navigate("SingleUser");
  }
  return (
    <Pressable onPress={navigateHandler.bind(this, id)}>
      <Box
        borderBottomWidth="1"
        _dark={{
          borderColor: "muted.50",
        }}
        borderColor="muted.800"
        pl={["3", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <HStack space={[2, 3]} justifyContent="space-between">
          <Avatar
            size="48px"
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
            }}
          />
          <VStack>
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              fontFamily="HindSemiBold"
              fontSize={16}
            >
              {username}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Recent message
              {/* {item.recentText} */}
            </Text>
          </VStack>
          <Spacer />
          <Text
            fontSize="xs"
            _dark={{
              color: "warmGray.50",
            }}
            color="coolGray.800"
            alignSelf="flex-start"
          >
            {/* {item.timeStamp} */} 12:00
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default ChatList;

import { View } from "react-native";
export var selectedUserId, selectedUserName;
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
import moment from "moment";

const NoticeBoard = ({ startdate, titlee, description }) => {
  const navigation = useNavigation();

  return (
    <Pressable>
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
          <VStack>
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              fontFamily="HindSemiBold"
              fontSize={16}
            >
              {titlee}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              {description}
              {/* {item.recentText} */}
            </Text>
          </VStack>
          <Spacer />
          <Text
            fontSize="sm"
            _dark={{
              color: "warmGray.50",
            }}
            color="coolGray.800"
            alignSelf="flex-start"
            fontFamily="HindSemiBold"
          >
            {moment(startdate).format("DD/MM/YYYY")}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default NoticeBoard;

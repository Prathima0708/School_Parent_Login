// import { View, Text, TouchableOpacity } from "react-native";
// import React, { useEffect, useState } from "react";
// import { Agenda } from "react-native-calendars";
// import { Avatar, Card } from "react-native-paper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ParentsHome from "../ParentsHome";
// import * as AddCalendarEvent from 'react-native-add-calendar-event';
// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split("T")[0];
// };

// const CalenderScreen = () => {
//   const eventConfig = {
//     // title,
//     // and other options
//   };

//   AddCalendarEvent.presentEventCreatingDialog(eventConfig)
//   const [items, setItems] = useState({});
//   useEffect(() => {
//     async function getToken() {
//       const value = await AsyncStorage.getItem("token");
//       console.log(value);
//     }
//     getToken();
//   }, []);
//   const loadItems = (day) => {
//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = timeToString(time);
//         if (!items[strTime]) {
//           items[strTime] = [];
//           const numItems = Math.floor(Math.random() * 3 + 1);
//           for (let j = 0; j < numItems; j++) {
//             items[strTime].push({
//               name: "Item for " + strTime + " #" + j,
//               height: Math.max(50, Math.floor(Math.random() * 150)),
//             });
//           }
//         }
//       }
//       const newItems = {};
//       Object.keys(items).forEach((key) => {
//         newItems[key] = items[key];
//       });
//       setItems(newItems);
//     }, 1000);
//   };
//   const renderItem = (item) => {
//     return (
//       <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
//         <Card>
//           <Card.Content>
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Text>{item.name}</Text>
//               {/* <Avatar.Text label="J" /> */}
//             </View>
//           </Card.Content>
//         </Card>
//       </TouchableOpacity>
//     );
//   };
//   return (
//     <View style={{ flex: 1 }}>
//       <Agenda
//         items={items}
//         loadItemsForMonth={loadItems}
//        selected={"2022-08-18"}
//         renderItem={renderItem}
//       />
//       <ParentsHome />
//     </View>
//   );
// };

// export default CalenderScreen;

// .then((eventInfo: { calendarItemIdentifier: string, eventIdentifier: string }) => {
//   // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
//   // These are two different identifiers on iOS.
//   // On Android, where they are both equal and represent the event id, also strings.
//   // when { action: 'CANCELED' } is returned, the dialog was dismissed
//   console.warn(JSON.stringify(eventInfo));
// })
// .catch((error: string) => {
//   // handle error such as when user rejected permissions
//   console.warn(error);
// });

import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Avatar, Card } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { StyleSheet, View, Text, Alert, Platform } from "react-native";
import { FlatList } from "react-native";
import { ScrollView } from "react-native";
import VerticalLine from "../../../components/UI/VerticalLine";
import { Progress } from "native-base";
import ParentsHome from "../../ParentsLoginScreen/BottomTab/ParentsHome";
import { subURL } from "../../../components/utils/URL's";
export var fromDateVar = [],
  toDateVar = [],
  fromatedDate = [];
export var filteredDataVar = [];
const CalenderScreen = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [eventDisplay, setEventDisplay] = useState(false);
  const [dataIsPresent, setDataIsPresent] = useState(true);
  const [color, setColor] = useState("");
  let dates = {};
  let i;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${subURL}/Calendar/`);
        setCalendarData(res.data);
        for (i = 0; i < res.data.length; i++) {
          fromDateVar[i] = moment(res.data[i].startdate).format("YYYY-MM-DD");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [calendarData]);

  useEffect(() => {
    if (dataIsPresent) {
      filteredDataVar = [];
    }
  }, []);

  for (i = 0; i < calendarData.length; i++) {
    toDateVar[i] = moment(calendarData[i].enddate).format("YYYY-MM-DD");
  }

  // for(i=0;i<calendarData.length;i++){
  //   console.log(fromDateVar[i]+','+toDateVar[i]);
  // }

  fromDateVar.forEach((val) => {
    dates[val] = {
      selected: true,
      selectedColor: "#00B8AC",
    };
  });
  // fromDateVar.map((item) => {
  //   dates[item] = {
  //     marked: true,
  //     selectedColor: 'red',
  //     color: 'red',
  //   };
  // });

  function showEvent(day) {
    const filteredData = calendarData.filter(
      (data) => moment(data.startdate).format("YYYY-MM-DD") == day.dateString
    );
    console.log(filteredData.length);
    filteredDataVar = filteredData;
    // if (filteredData.length>0) {
    //   setDataIsPresent(true);

    // }else{
    //  // setDataIsPresent(false)
    //   Alert.alert("Data not found!", "No events are found for this date", [
    //     {
    //       text: "OK",
    //       onPress: () => {
    //         return;
    //       },
    //     },
    //   ]);
    // }
  }

  function leftPressHandler() {
    console.log("1");
  }
  function subtractMonth() {
    console.log("left");
  }
  return (
    <>
      <View
        style={[
          { flex: 1 },
          {
            flexDirection: "column",
          },
        ]}
      >
        <View style={{ flex: 2.3 }}>
          <Calendar
            markedDates={dates}
            style={{
              elevation: 5,
              shadowColor: "black",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              shadowOpacity: 0.75,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 8,
              overflow: Platform.OS === "android" ? "hidden" : "visible",
              marginLeft: 10,
              marginRight: 10,
            }}
            // markingType={'period'}
            onDayPress={(day) => {
              showEvent(day);
            }}
            theme={{
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
        </View>
        <View style={{ flex: 2, marginTop: "2%" }}>
          <ScrollView>
            <View
              style={[
                { flex: 1 },
                {
                  flexDirection: "column",
                },
              ]}
            >
              {filteredDataVar.length <= 0 ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    top: "30%",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HindBold",
                      fontSize: 20,
                      color: "#6B0202",
                    }}
                  >
                    No Data found
                  </Text>
                </View>
              ) : (
                filteredDataVar.map((data, key) => (
                  <>
                    <View
                      style={[
                        { flex: 1 },
                        {
                          flexDirection: "row",
                          top: 10,
                          borderWidth: 1,
                          borderRadius: 10,
                          padding: 10,
                          marginHorizontal: 10,
                        },
                      ]}
                    >
                      <View style={{ flex: 0.7 }}>
                        <View
                          style={[
                            styles.container,
                            { flexDirection: "column", borderRightWidth: 1 },
                          ]}
                        >
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: "#00B8AC",
                              alignItems: "center",
                              marginHorizontal: 10,
                              borderRadius: 10,
                              width: "70%",
                            }}
                          >
                            {/* <Text style={{fontSize:20,fontFamily: "HindBold",color:'white'}}>
                    {moment(data.startdate).format("MMM")}
                  </Text>
                  <Text style={{fontSize:20,fontFamily: "HindBold",color:'white'}}>
                    {moment(data.startdate).format("D")}
                  </Text>
                  <Text style={{fontSize:20,fontFamily: "HindBold",color:'white'}}>
                    {moment(data.startdate).format("YYYY")}
                  </Text> */}
                            <Text
                              style={{
                                fontSize: 20,
                                fontFamily: "HindBold",
                                color: "white",
                              }}
                            >
                              {moment(data.startdate).format("DD/MM/YYYY")}
                            </Text>
                          </View>
                          <View style={{ flex: 2, top: 3, left: "30%" }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: "HindBold",
                                color: "black",
                              }}
                            >
                              To
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 3,
                              backgroundColor: "#00B8AC",
                              alignItems: "center",
                              marginHorizontal: 10,
                              borderRadius: 10,
                              width: "70%",
                            }}
                          >
                            {/* <Text style={{fontSize:20,fontFamily: "HindBold",color:'white'}}>
                    {moment(data.enddate).format("MMM")}
                  </Text>
                  <Text style={{fontSize:20,fontFamily: "HindBold",color:'white'}}>
                    {moment(data.enddate).format("D")}
                  </Text>
                  <Text style={{fontSize:20,fontFamily: "HindBold",color:'white'}}>
                    {moment(data.enddate).format("YYYY")}
                  </Text> */}
                            <Text
                              style={{
                                fontSize: 20,
                                fontFamily: "HindBold",
                                color: "white",
                              }}
                            >
                              {moment(data.enddate).format("DD/MM/YYYY")}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ flex: 1, left: "10%" }}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: "black",
                            fontFamily: "HindBold",
                          }}
                        >
                          {data.description}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.space} />
                  </>
                ))
              )}
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 0.3, backgroundColor: "green" }}>
          <ParentsHome />
        </View>
      </View>
    </>
  );
};

export default CalenderScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#DEE4FF",
    padding: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardStyle: {
    top: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#EFFFFD",
    // borderRadius: 20,
    // marginBottom: 15,

    // backgroundColor: "#0080FF",
    // elevation: 5,
    // shadowColor: "black",

    // shadowOpacity: 0.75,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 8,
    // overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  cardView: {
    flexDirection: "row",
  },
  space: {
    width: 20,
    height: 20,
  },
  textStyle: {
    fontFamily: "HindRegular",
    fontSize: 20,
    color: "black",
  },
  commonDesign: {
    flexDirection: "row",
    top: 10,
    backgroundColor: "#DEF6FF",
    marginHorizontal: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  upDesign: {
    borderTopWidth: 1,
    marginHorizontal: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  downDesign: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  fontStyle: {
    fontFamily: "HindSemiBold",
    fontSize: 18,
  },
});

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
export var fromDateVar=[],toDateVar=[],fromatedDate=[];
export var filteredDataVar;
const CalenderScreen = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [eventDisplay, setEventDisplay] = useState(false);
  const [dataIsPresent, setDataIsPresent] = useState(false);
  const [color, setColor] = useState("");
  let dates = {};
  let i;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/school/Calendar/`);
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

  for(i=0;i<calendarData.length;i++){
    toDateVar[i]=moment(calendarData[i].enddate).format("YYYY-MM-DD");
  }

  // for(i=0;i<calendarData.length;i++){
  //   console.log(fromDateVar[i]+','+toDateVar[i]);
  // }

  fromDateVar.forEach((val) => {
    dates[val] = {
      selected:true,
    };
  });

  function showEvent(day) {
    setEventDisplay(true);
    const filteredData = calendarData.filter((data) =>moment(data.startdate).format("YYYY-MM-DD") == day.dateString);
    if(filteredData){
      setDataIsPresent(true);
      filteredDataVar = filteredData;
    } else {
      setDataIsPresent(false);
      Alert.alert("Data not found!", "No events are found for this date", [
        {
          text: "OK",
          onPress: () => {
            return;
          },
        },
      ]);
    }
  }

  function testHandler(){
    console.log('yes')
  }
return (
  <>
    <Calendar
      markedDates={dates}
      style={{
        elevation: 5,
      shadowColor: "black",
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
      shadowOpacity: 0.75,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      overflow: Platform.OS === "android" ? "hidden" : "visible",
      }}
      // markingType={'period'}
      onDayPress={day => {showEvent(day)}}
      theme={{
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
      }}      
    />
    <ScrollView>
    {filteredDataVar &&
      filteredDataVar.map((data, key) => (
        <>
          <View style={styles.space} />
          <Card style={styles.cardStyle} key={data.id}>
            <Card.Content>
              <View style={styles.cardView}>
                {/* <View style={{flex:1}}>
                  <Text style={[styles.textStyle,{fontWeight:'bold'}]}>Description</Text>
                  <Text style={styles.textStyle}>{data.description}</Text>
                </View>
                <View style={{flex:1,left:30}}>
                  <Text style={[styles.textStyle,{fontWeight:'bold'}]}>Event end date</Text>
                  <Text style={[styles.textStyle]}>{ moment(data.enddate).format("DD-MM-YYYY")}</Text>
                </View> */}
                  <View style={[{ flexDirection: "row",flex:1 }]}>
                  <View style={{ flex: 2}} >
                    <Text style={[styles.textStyle,{fontWeight:'bold'}]}>Description</Text>
                    <Text style={styles.textStyle}>{data.description}</Text>
                  </View>
                  <View style={{ flex: 2 }} >
                    <Text style={[styles.textStyle,{fontWeight:'bold',left:10}]}>Event end date</Text>
                    <Text style={[styles.textStyle,{left:10}]}>{ moment(data.enddate).format("DD-MM-YYYY")}</Text>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        </>
    ))}
    </ScrollView>
  </>
  );
};

export default CalenderScreen;

const styles = StyleSheet.create({
  cardStyle: {
    top: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor:'#0080FF',
    elevation: 5,
    shadowColor: "black",

    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
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
    fontSize:20,
    color:'white'
  }
})
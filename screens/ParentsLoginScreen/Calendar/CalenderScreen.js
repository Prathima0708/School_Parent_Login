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


import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import ParentsHome from "../../ParentsLoginScreen/BottomTab/ParentsHome";
import { subURL } from "../../../components/utils/URL's";
import axios from "axios";
import moment from "moment";

const CalenderScreen = () => {

  const [data,setData]=useState([]);
  const [customDatesStyles,setCustomDatesStyles]=useState([]);
  const [showEvent,setShowEvent]=useState([]);

  const [noEvent,setNoEvent]=useState(false);

  useEffect(()=>{
    async function fetchData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const res = await axios.get(`${subURL}/Calendar/`,
        {
          headers: headers,
        });  
        setData(res.data);
        setCustomDatesStyles(
          res.data.map(d => (
            {
              date: d.startdate, 
              style: {backgroundColor: '#00B8AC' }, 
              textStyle:{color: 'white'}, 
              containerStyle:[]
            })));
        } catch (error) {
          console.log(error);
        }
      }
    fetchData();
  },[]);

  function handlePress(day){
    const filteredData = data.
    filter((data) => 
      moment(data.startdate).format("YYYY-MM-DD") == moment(day).format("YYYY-MM-DD")
    );

    setShowEvent(filteredData);

  }

  return (
    <>
      <View
        style={[
          {
            // Try setting `flexDirection` to `"row"`.
            flex:1,
            flexDirection: 'column',
            backgroundColor:'white'
          },
        ]}>
        <View style={{flex: 1.2}} >
          <CalendarPicker
            onDateChange={(day)=>handlePress(day)}
            customDatesStyles={customDatesStyles}
            selectedDayStyle={{}}
            textStyle={{fontFamily:"HindRegular"}}
          />
           
        </View>
        
        <View
          style={[
            { flex: 1 },
            { flexDirection: "column", backgroundColor: "white"}]}>
          <View style={{ flex: 8, bottom: 40 }}>
          <ScrollView>
          
            <View
              style={[
                { flex: 1 },
                {
                  flexDirection: "column",
                  paddingHorizontal:10
                },
              ]}
            >
              {showEvent.length <= 0 ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop:'9%'
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HindSemiBold",
                      fontSize: 18,
                      color: "#6B0202",
                    }}
                  >
                    No Events found
                  </Text>
                </View>
              ) : (
                showEvent.map((data, key) => (
                  <>
                    
                    <View
                      style={[
                        { flex: 1 },
                        {
                          flexDirection: "row",
                          borderWidth: 1,
                          borderRadius: 10,
                          padding: 10,
                          marginTop:'10%'
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
                              //width: "71%",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: "HindSemiBold",
                                color: "white",
                              }}
                            >
                              {moment(data.startdate).format("DD/MM/YYYY")}
                            </Text>
                          </View>
                          <View style={{ flex: 2,alignItems:'center' }}>
                            <Text
                              style={{
                                fontSize: 17,
                                fontFamily: "HindSemiBold",
                                color: "black",
                              }}
                            >
                              to
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 3,
                              backgroundColor: "#00B8AC",
                              alignItems: "center",
                              marginHorizontal: 10,
                              borderRadius: 10,
                              //width: "70%",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 17,
                                fontFamily: "HindSemiBold",
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
                            fontSize: 17,
                            color: "black",
                            fontFamily: "HindMedium",
                          }}
                        >
                          {data.description}
                        </Text>
                      </View>
                    </View>
                    
                  </>
                ))
              )}
            </View>
          </ScrollView>
          </View>
        </View>
        <View style={{flex: 0.1}} >
          <ParentsHome />
        </View>
      </View>
    </>
  );
};

export default CalenderScreen;

const styles = StyleSheet.create({
  listView:{
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
    backgroundColor:'red'
  }
});

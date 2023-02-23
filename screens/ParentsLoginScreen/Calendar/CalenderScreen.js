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

  function changeMonthHandler(){
    setShowEvent([])
  }

  return (
    <>
      <View
        style={[
          {
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
            onMonthChange={changeMonthHandler}
          />
           
        </View>
        
        <View
        style={[
          { flex: 1 },
          { flexDirection: "column" }]}>
          <View style={{ flex: 8, bottom: 20,marginHorizontal:10 }}>
            <ScrollView>
              <View style={styles.root}>
                {showEvent.length > 0 ? (
                  showEvent.map((data,key)=>(
                    <View
                      style={[styles.container]}>
                      <View style={{ flex: 0.7 }}>
                        <View
                          style={[
                            { flexDirection: "column", borderRightWidth: 1 },
                          ]}
                        >
                          <View
                            style={[
                              {flex: 1},
                              styles.commonStyle
                            ]}
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
                            style={[
                              {flex: 3},
                              styles.commonStyle
                            ]}
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
                  ))
                ) : (
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
                ) }
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
  root: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  container:{
      flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop:'5%',
        paddingBottom:'2%'
  },
  commonStyle:{
    backgroundColor: "#00B8AC",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
  }
});
